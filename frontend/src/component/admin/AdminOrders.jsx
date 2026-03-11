import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "../../utils/api";

const STATUS_LABELS = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const STATUS_OPTIONS = ["CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"];

const formatCurrency = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  return date.toLocaleDateString("vi-VN");
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/invoice`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (invoiceId, status) => {
    const token = Cookies.get("token");
    if (!token) return;
    setUpdating(invoiceId);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/invoice/${invoiceId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải đơn hàng...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <p className="text-[#A59588]">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                <th className="py-3 pr-4">Ngày</th>
                <th className="py-3 pr-4">Khách hàng</th>
                <th className="py-3 pr-4">Tổng tiền</th>
                <th className="py-3 pr-4">Trạng thái</th>
                <th className="py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.invoiceId} className="border-b border-[#e8e4df]">
                  <td className="py-3 pr-4">{formatDate(o.dateCreated)}</td>
                  <td className="py-3 pr-4">
                    <div>{o.customerFullName}</div>
                    <div className="text-xs text-[#A59588]">{o.phoneNumber}</div>
                  </td>
                  <td className="py-3 pr-4">{formatCurrency(o.totalPrice)}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        o.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : o.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : o.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {o.status === "PENDING" || o.status === "CONFIRMED" || o.status === "SHIPPING" ? (
                      <select
                        value=""
                        onChange={(e) => updateStatus(o.invoiceId, e.target.value)}
                        disabled={updating === o.invoiceId}
                        className="border border-[#d4c5bc] rounded px-2 py-1 text-sm"
                      >
                        <option value="">Cập nhật...</option>
                        {STATUS_OPTIONS.filter((s) => s !== o.status).map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-[#A59588]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
