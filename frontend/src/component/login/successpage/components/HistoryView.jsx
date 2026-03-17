import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../../../utils/api";
const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

/** Hiển thị 1 đơn hàng */
function InvoiceCard({ invoice }) {
    const items = invoice.items || [];
    const imgSrc = (src) =>
        src && (src.startsWith("http") ? src : encodeURI(src || ""));

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <span className="font-semibold text-gray-900">Mã đơn: </span>
                    <span className="text-red-800 font-medium">{invoice.invoiceId}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">
                        {invoice.dateCreated
                            ? new Date(invoice.dateCreated).toLocaleDateString("vi-VN")
                            : "-"}
                    </span>
                    <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                            invoice.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                        }`}
                    >
                        {invoice.status === "PENDING" && "Chờ xử lý"}
                        {invoice.status === "CONFIRMED" && "Đã xác nhận"}
                        {invoice.status === "SHIPPING" && "Đang giao"}
                        {invoice.status === "DELIVERED" && "Đã giao"}
                        {invoice.status === "CANCELLED" && "Đã hủy"}
                        {!["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"].includes(invoice.status) && (invoice.status || "-")}
                    </span>
                </div>
            </div>
            <div className="p-4 space-y-4">
                {items.map((item, idx) => {
                    const rawSize = item.size ?? (Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes[0] : null);
                    const sizeStr = (rawSize != null && String(rawSize).trim() !== "")
                        ? String(rawSize).trim()
                        : "-";
                    return (
                        <div key={item.productId || idx} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                            <div className="w-24 h-28 bg-gray-100 rounded overflow-hidden shrink-0">
                                <img
                                    src={imgSrc(item.imageSrc) || "https://via.placeholder.com/96x112?text=SP"}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/96x112?text=SP"; }}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.productName || "Sản phẩm"}</p>
                                <p className="text-gray-600 mt-1">{formatCurrency(item.price || 0)}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Size: {sizeStr} · Số lượng: {item.quantity || 1}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-right font-semibold text-gray-900">
                    Tổng đơn: <span className="text-red-800">{formatCurrency(invoice.totalPrice || 0)}</span>
                </p>
            </div>
        </div>
    );
}

export default function HistoryView() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = Cookies.get("id");
    const token = Cookies.get("token");

    useEffect(() => {
        if (!userId || !token) {
            setLoading(false);
            setError("Vui lòng đăng nhập để xem lịch sử mua hàng.");
            return;
        }

        const apiUrl = getApiBaseUrl();
        const fetchHistory = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/invoice/user/${encodeURIComponent(userId)}`, {
                    headers: getApiHeaders({ Authorization: `Bearer ${token}` }),
                });
                if (!res.ok) {
                    if (res.status === 401) {
                        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                    } else {
                        setError("Không thể tải lịch sử mua hàng.");
                    }
                    setInvoices([]);
                    return;
                }
                const contentType = res.headers.get("content-type") || "";
                if (!contentType.includes("application/json")) {
                    setError("Không thể kết nối đến server.");
                    setInvoices([]);
                    return;
                }
                const data = await res.json();
                setInvoices(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Lỗi tải lịch sử mua hàng:", err);
                setError("Không thể kết nối đến server.");
                setInvoices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [userId, token]);

    if (loading) {
        return (
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử mua hàng</h2>
                <p className="text-gray-500">Đang tải...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử mua hàng</h2>
                <p className="text-amber-700 bg-amber-50 p-4 rounded-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử mua hàng</h2>
            {invoices.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="space-y-2">
                    {invoices.map((inv) => (
                        <InvoiceCard key={inv.invoiceId} invoice={inv} />
                    ))}
                </div>
            )}
        </div>
    );
}
