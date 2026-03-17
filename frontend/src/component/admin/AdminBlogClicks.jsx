import { useState, useEffect } from "react";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

export default function AdminBlogClicks() {
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const base = getApiBaseUrl() || "";
        const res = await fetch(`${base}/api/blog/clicks`, { headers: getApiHeaders() });
        if (res.ok) {
          const data = await res.json();
          setClicks(Array.isArray(data) ? data : []);
        } else {
          setError("Lỗi 401: Gợi ý: Chạy backend local + Ngrok để thống kê blog.");
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
    return <p className="text-[#5C4A3D]">Đang tải thống kê blog...</p>;
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#3e3226] mb-4">Thống kê blog</h2>
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  const list = Array.isArray(clicks) ? clicks : [];
  const totalClicks = list.reduce((sum, c) => sum + (c.clickCount || 0), 0);

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Thống kê lượt click bài blog</h2>
      <div className="bg-[#f5f3f0] rounded-lg p-4 mb-6">
        <p className="text-sm text-[#A59588]">Tổng lượt click</p>
        <p className="text-3xl font-semibold text-[#3e3226]">{totalClicks.toLocaleString("vi-VN")}</p>
      </div>
      {list.length === 0 ? (
        <p className="text-[#A59588]">Chưa có dữ liệu.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#5C4A3D]">
            <thead>
              <tr className="border-b border-[#e8e4df]">
                <th className="py-2 pr-4">Slug</th>
                <th className="py-2">Lượt click</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id || c.slug} className="border-b border-[#e8e4df]">
                  <td className="py-2 pr-4 font-mono">{c.slug || "—"}</td>
                  <td className="py-2">{c.clickCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
