import React, { useState, useEffect, useRef, useCallback } from "react";

const VN_ADDRESS_API = "https://provinces.open-api.vn/api";

/** Bỏ dấu tiếng Việt để tìm kiếm */
const removeDiacritics = (str) => {
    if (!str || typeof str !== "string") return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

/** Kiểm tra text có chứa search không (bỏ dấu) */
const matchSearch = (text, search) => {
    if (!search || !search.trim()) return true;
    const t = removeDiacritics(text);
    const s = removeDiacritics(search);
    return t.includes(s);
};

/** Dropdown tìm kiếm - chọn Tỉnh / Quận / Phường */
function SearchableSelect({ label, placeholder, options, value, onChange, onOpen, loading, disabled }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    const filtered = options.filter((o) => matchSearch(o.name, search));
    const displayValue = options.find((o) => o.code === value)?.name || value || "";

    const handleSelect = (opt) => {
        onChange(opt);
        setSearch("");
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div
                onClick={() => !disabled && (setOpen(!open), onOpen?.())}
                className={`mt-1 flex items-center justify-between w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-left cursor-pointer focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none min-h-[42px] ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
                <span className={value ? "text-gray-900" : "text-gray-500"}>
                    {loading ? "Đang tải..." : displayValue || placeholder}
                </span>
                <svg className={`w-4 h-4 text-gray-500 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {open && (
                <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-48 overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Gõ để tìm..."
                            className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                            autoFocus
                        />
                    </div>
                    <ul className="overflow-y-auto max-h-36">
                        {filtered.length === 0 ? (
                            <li className="px-3 py-2 text-sm text-gray-500">Không tìm thấy</li>
                        ) : (
                            filtered.map((opt) => (
                                <li
                                    key={opt.code}
                                    onClick={() => handleSelect(opt)}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-red-50 ${value === opt.code ? "bg-red-50 text-red-800 font-medium" : "text-gray-700"}`}
                                >
                                    {opt.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function AddressSelector({ value = "", onChange, className = "" }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [street, setStreet] = useState("");
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [loadingProvinces, setLoadingProvinces] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);
    const [apiError, setApiError] = useState(false);

    const buildFullAddress = useCallback((s, w, d, p) => {
        const parts = [s, w?.name, d?.name, p?.name].filter(Boolean);
        return parts.join(", ");
    }, []);

    const notifyChange = useCallback(
        (s, w, d, p) => {
            const addr = buildFullAddress(s, w, d, p);
            onChange?.(addr);
        },
        [buildFullAddress, onChange]
    );

    useEffect(() => {
        fetch(`${VN_ADDRESS_API}/?depth=1`)
            .then((r) => r.json())
            .then((data) => {
                setProvinces(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Lỗi tải danh sách tỉnh thành:", err);
                setApiError(true);
            })
            .finally(() => setLoadingProvinces(false));
    }, []);

    useEffect(() => {
        if (!province) {
            setDistricts([]);
            setDistrict(null);
            setWards([]);
            setWard(null);
            return;
        }
        setLoadingDistricts(true);
        setDistrict(null);
        setWard(null);
        setWards([]);
        fetch(`${VN_ADDRESS_API}/p/${province.code}?depth=2`)
            .then((r) => r.json())
            .then((data) => {
                setDistricts(data?.districts || []);
            })
            .catch((err) => console.error("Lỗi tải quận/huyện:", err))
            .finally(() => setLoadingDistricts(false));
    }, [province?.code]);

    useEffect(() => {
        if (!district) {
            setWards([]);
            setWard(null);
            return;
        }
        setLoadingWards(true);
        setWard(null);
        fetch(`${VN_ADDRESS_API}/d/${district.code}?depth=2`)
            .then((r) => r.json())
            .then((data) => {
                setWards(data?.wards || []);
            })
            .catch((err) => console.error("Lỗi tải phường/xã:", err))
            .finally(() => setLoadingWards(false));
    }, [district?.code]);

    useEffect(() => {
        notifyChange(street, ward, district, province);
    }, [street, ward, district, province, notifyChange]);

    // Chỉ lấy địa chỉ từ parent lúc mount (vd. từ user đã lưu), không sync ngược khi mình vừa build address
    const initRef = useRef(false);
    useEffect(() => {
        if (initRef.current) return;
        initRef.current = true;
        if (value && typeof value === "string" && value.trim()) {
            setStreet(value.trim());
        }
    }, []);

    const handleProvinceChange = (p) => {
        setProvince(p);
    };

    if (apiError) {
        return (
            <div className={className}>
                <input
                    id="address-fallback"
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="VD: 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                />
            </div>
        );
    }
    const handleDistrictChange = (d) => {
        setDistrict(d);
    };
    const handleWardChange = (w) => {
        setWard(w);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <SearchableSelect
                label="Tỉnh / Thành phố"
                placeholder="Chọn tỉnh thành"
                options={provinces}
                value={province?.code}
                onChange={handleProvinceChange}
                loading={loadingProvinces}
            />
            <SearchableSelect
                label="Quận / Huyện"
                placeholder="Chọn quận huyện"
                options={districts}
                value={district?.code}
                onChange={handleDistrictChange}
                onOpen={() => {}}
                loading={loadingDistricts}
                disabled={!province}
            />
            <SearchableSelect
                label="Phường / Xã"
                placeholder="Chọn phường xã"
                options={wards}
                value={ward?.code}
                onChange={handleWardChange}
                loading={loadingWards}
                disabled={!district}
            />
            <div>
                <label htmlFor="address-street" className="block text-sm font-medium text-gray-700 mb-1">
                    Số nhà, tên đường
                </label>
                <input
                    id="address-street"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="VD: 123 Đường Lê Lợi"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                />
            </div>
        </div>
    );
}
