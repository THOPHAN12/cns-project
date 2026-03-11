import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "../../utils/api";

const formatCurrency = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function AdminStats() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/invoice`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setInvoices(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải...</p>;
  }

  const totalRevenue = invoices
    .filter((i) => i.status !== "CANCELLED")
    .reduce((sum, i) => sum + (i.totalPrice || 0), 0);
  const pendingCount = invoices.filter((i) => i.status === "PENDING").length;
  const deliveredCount = invoices.filter((i) => i.status === "DELIVERED").length;

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Thống kê</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Tổng doanh thu</p>
          <p className="text-xl font-semibold text-[#3e3226]">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Đơn chờ xử lý</p>
          <p className="text-xl font-semibold text-[#3e3226]">{pendingCount}</p>
        </div>
        <div className="bg-[#f5f3f0] rounded-lg p-4">
          <p className="text-sm text-[#A59588]">Đơn đã giao</p>
          <p className="text-xl font-semibold text-[#3e3226]">{deliveredCount}</p>
        </div>
      </div>
      <p className="text-sm text-[#A59588]">
        Tổng số đơn hàng: <strong className="text-[#3e3226]">{invoices.length}</strong>
      </p>
    </div>
  );
}
