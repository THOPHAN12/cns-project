import { useState, useEffect } from "react";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

export default function AdminPageViews() {
  const [views, setViews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const apiUrl = getApiBaseUrl();
        const base = apiUrl || "";
        const [viewsRes, totalRes] = await Promise.all([
          fetch(`${base}/api/analytics/pageviews`, { headers: getApiHeaders() }),
          fetch(`${base}/api/analytics/pageviews/total`, { headers: getApiHeaders() }),
        ]);
        if (viewsRes.ok) {
          const ct = viewsRes.headers.get("content-type") || "";
          const data = ct.includes("application/json") ? await viewsRes.json() : [];
          setViews(Array.isArray(data) ? data : []);
        }
        if (totalRes.ok) {
          const ct = totalRes.headers.get("content-type") || "";
          const data = ct.includes("application/json") ? await totalRes.json() : {};
          setTotal(data.total ?? 0);
        }
      } catch (e) {
        console.error(e);
        setError("Không kết nối được API.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải thống kê truy cập...</p>;
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#3e3226] mb-4">Thống kê truy cập</h2>
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  const records = Array.isArray(views) ? views : [];

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Thống kê lượt truy cập trang web</h2>
      <div className="bg-[#f5f3f0] rounded-lg p-4 mb-6">
        <p className="text-sm text-[#A59588]">Tổng lượt xem trang</p>
        <p className="text-3xl font-semibold text-[#3e3226]">{total.toLocaleString("vi-VN")}</p>
      </div>
      {records.length === 0 ? (
        <p className="text-[#A59588]">Chưa có dữ liệu truy cập.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                <th className="py-3 pr-4">#</th>
                <th className="py-3 pr-4">Thời gian</th>
                <th className="py-3 pr-4">Trang</th>
                <th className="py-3">Người truy cập</th>
              </tr>
            </thead>
            <tbody>
              {records.map((v, idx) => (
                <tr key={v.id || idx} className="border-b border-[#e8e4df]">
                  <td className="py-3 pr-4 text-[#A59588]">{idx + 1}</td>
                  <td className="py-3 pr-4 text-[#5C4A3D]">{v.viewedAt || "—"}</td>
                  <td className="py-3 pr-4 font-mono text-[#3e3226]">{v.path || "/"}</td>
                  <td className="py-3 font-medium text-[#3e3226]">{v.userName || "Khách"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
