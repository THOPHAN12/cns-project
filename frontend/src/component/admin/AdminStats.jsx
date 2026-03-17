import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

const formatCurrency = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function AdminStats() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      setError(null);
      try {
        const base = getApiBaseUrl() || "";
        const res = await fetch(`${base}/api/invoice`, {
          headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setInvoices(Array.isArray(data) ? data : []);
        } else {
          setError(res.status === 401 ? "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại." : `Lỗi ${res.status}`);
        }
      } catch (e) {
        console.error(e);
        setError("Không kết nối được API. Kiểm tra Backend + Ngrok, VITE_API_BASE_URL.");
      } finally {
        setLoading(false);
      }
    };

  const seedInvoices = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    setSeeding(true);
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/invoice/seed`, {
        method: "POST",
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.added > 0) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải...</p>;
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#3e3226] mb-4">Thống kê</h2>
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  const totalRevenue = invoices
    .filter((i) => i.status !== "CANCELLED")
    .reduce((sum, i) => sum + (i.totalPrice || 0), 0);
  const pendingCount = invoices.filter((i) => i.status === "PENDING").length;
  const confirmedCount = invoices.filter((i) => i.status === "CONFIRMED").length;
  const shippingCount = invoices.filter((i) => i.status === "SHIPPING").length;
  const deliveredCount = invoices.filter((i) => i.status === "DELIVERED").length;
  const cancelledCount = invoices.filter((i) => i.status === "CANCELLED").length;

  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("vi-VN");
  };

  const STATUS_LABELS = {
    PENDING: "Chờ xử lý",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang giao",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã hủy",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Thống kê đơn hàng</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Tổng doanh thu</p>
          <p className="text-lg font-semibold text-[#3e3226]">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Chờ xử lý</p>
          <p className="text-lg font-semibold text-[#3e3226]">{pendingCount}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Đã xác nhận</p>
          <p className="text-lg font-semibold text-[#3e3226]">{confirmedCount}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Đang giao</p>
          <p className="text-lg font-semibold text-[#3e3226]">{shippingCount}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Đã giao</p>
          <p className="text-lg font-semibold text-[#3e3226]">{deliveredCount}</p>
        </div>
      </div>
      <p className="text-sm text-[#A59588] mb-6 flex items-center gap-4">
        Tổng số đơn hàng: <strong className="text-[#3e3226]">{invoices.length}</strong>
        {cancelledCount > 0 && (
          <span className="ml-4">Đã hủy: <strong className="text-[#3e3226]">{cancelledCount}</strong></span>
        )}
        {invoices.length === 0 && (
          <button
            type="button"
            onClick={seedInvoices}
            disabled={seeding}
            className="px-3 py-1.5 text-sm bg-[#5C4A3D] text-white rounded hover:bg-[#3e3226] disabled:opacity-60"
          >
            {seeding ? "Đang thêm..." : "Thêm đơn mẫu"}
          </button>
        )}
      </p>

      {invoices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-medium text-[#3e3226] mb-3">Danh sách đơn hàng gần đây</h3>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-[#e8e4df] rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-[#f5f3f0] sticky top-0">
                <tr className="text-left text-[#5C4A3D]">
                  <th className="py-2 px-3">Ngày</th>
                  <th className="py-2 px-3">Khách hàng</th>
                  <th className="py-2 px-3">SĐT</th>
                  <th className="py-2 px-3">Tổng tiền</th>
                  <th className="py-2 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((o) => (
                  <tr key={o.invoiceId} className="border-t border-[#e8e4df]">
                    <td className="py-2 px-3">{formatDate(o.dateCreated)}</td>
                    <td className="py-2 px-3">{o.customerFullName || "—"}</td>
                    <td className="py-2 px-3">{o.phoneNumber || "—"}</td>
                    <td className="py-2 px-3">{formatCurrency(o.totalPrice || 0)}</td>
                    <td className="py-2 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                        o.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                        o.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                        o.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {STATUS_LABELS[o.status] || o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
