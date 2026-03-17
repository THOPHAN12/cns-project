import React, { useEffect, useState, useRef } from "react";
import profile from "../../../../assets/profile.jpg";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../../../utils/api";

const PROFILE_IMAGE_KEY = "cns_profile_image";

export default function ProfileView() {
    const userId = Cookies.get("id");
    const token = Cookies.get("token");
    const [userData, setUserData] = useState({ fullName: "", email: "", phoneNumber: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(() => {
        try {
            const saved = userId ? localStorage.getItem(`${PROFILE_IMAGE_KEY}_${userId}`) : null;
            return saved || null;
        } catch {
            return null;
        }
    });
    const fileInputRef = useRef(null);
    useEffect(() => {
        if (!userId || !token) {
            setLoading(false);
            return;
        }
        const apiUrl = getApiBaseUrl();
        const fetchUser = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/user?userId=${encodeURIComponent(userId)}`, {
                    method: "GET",
                    headers: getApiHeaders({ "Authorization": `Bearer ${token}` })
                });
                if (!res.ok) {
                    setError(res.status === 404 ? "Không tìm thấy thông tin." : "Lỗi tải dữ liệu.");
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setUserData({
                    fullName: data.fullName ?? "",
                    email: data.email ?? "",
                    phoneNumber: data.phoneNumber ?? ""
                });
            } catch (e) {
                setError("Không kết nối được máy chủ.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId, token]);

    useEffect(() => {
        if (!userId) return;
        try {
            const saved = localStorage.getItem(`${PROFILE_IMAGE_KEY}_${userId}`);
            if (saved) setProfileImageUrl(saved);
        } catch {}
    }, [userId]);

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            setProfileImageUrl(dataUrl);
            if (userId) {
                try {
                    localStorage.setItem(`${PROFILE_IMAGE_KEY}_${userId}`, dataUrl);
                } catch {}
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    if (loading) {
        return (
            <div className="flex-1 bg-[#F5EFE9] p-12 rounded-sm flex items-center justify-center">
                <p className="text-[#463325]">Đang tải thông tin...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex-1 bg-[#F5EFE9] p-12 rounded-sm flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-[#F5EFE9] p-12 rounded-sm relative flex justify-between">
        {/* Left Info Section */}
        <div className="flex-1 pr-10">
            <div className="flex items-end mb-10">
            <h1 className="text-5xl font-semibold tracking-wide mr-4">
                Xin chào, {userData.fullName || "bạn"}
            </h1>
            <div className="flex-1 border-b border-[#D8CFC6] mb-2"></div>
            </div>

            <div className="space-y-8 text-lg">
            <div className="flex items-center">
                <span className="w-32 shrink-0">E-mail:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6">{userData.email}</div>
            </div>
            <div className="flex items-center">
                <span className="w-32 shrink-0">Số điện thoại:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6">{userData.phoneNumber}</div>
            </div>
            </div>
        </div>

        {/* Right Avatar Section */}
        <div className="flex flex-col items-center justify-center w-48">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Chọn ảnh đại diện"
            />
            <div className="w-40 h-40 bg-[#C5B5A9] rounded-2xl flex items-center justify-center mb-4 shadow-inner overflow-hidden">
            <img
                src={profileImageUrl || profile}
                alt="Profile"
                className="w-full h-full rounded-2xl object-cover"
            />
            </div>
            <button
                type="button"
                onClick={handleChooseImage}
                className="bg-[#463325] text-white px-6 py-1.5 rounded-md hover:bg-[#5e4533] transition-colors text-sm font-medium"
            >
            Đổi ảnh
            </button>
        </div>
        </div>
    );
}