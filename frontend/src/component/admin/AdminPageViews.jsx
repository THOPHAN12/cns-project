import { useState, useEffect } from "react";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

/** Chuyển viewedAt thành chuỗi hiển thị. Hỗ trợ dd/MM/yyyy HH:mm hoặc ISO. */
function formatViewedAt(val) {
  if (!val || typeof val !== "string") return "—";
  const s = val.trim();
  if (!s) return "—";
  if (/^\d{2}\/\d{2}\/\d{4}/.test(s)) return s;
  try {
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
      const pad = (n) => String(n).padStart(2, "0");
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
  } catch (_) {}
  return s || "—";
}

/** Mở rộng dữ liệu cũ (gộp theo path) thành từng record riêng. Định dạng mới (có viewedAt) giữ nguyên. */
function expandAggregatedRecords(list) {
  const out = [];
  for (const item of list) {
    const count = typeof item.viewCount === "number" && item.viewCount > 0 ? item.viewCount : 1;
    const hasDetail = item.viewedAt != null && String(item.viewedAt).trim() !== "";
    if (hasDetail) {
      out.push({
        id: item.id,
        path: item.path,
        viewedAt: formatViewedAt(item.viewedAt),
        userName: item.userName ?? "Khách",
      });
    } else {
      for (let i = 0; i < count; i++) {
        out.push({
          id: (item.id || item.path) + "-" + i,
          path: item.path,
          viewedAt: "—",
          userName: "Khách",
        });
      }
    }
  }
  return out;
}

export default function AdminPageViews() {
  const [views, setViews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FETCH_TIMEOUT_MS = 15000;
    const MAX_DISPLAY_RECORDS = 2000;

    const fetchWithTimeout = (url, opts = {}) => {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
      return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(t));
    };

    const fetchData = async () => {
      setError(null);
      try {
        const apiUrl = getApiBaseUrl();
        const base = apiUrl || "";
        const headers = getApiHeaders();
        const [viewsRes, totalRes] = await Promise.all([
          fetchWithTimeout(`${base}/api/analytics/pageviews`, { headers }),
          fetchWithTimeout(`${base}/api/analytics/pageviews/total`, { headers }),
        ]);
        let totalVal = 0;
        if (totalRes.ok) {
          const ct = totalRes.headers.get("content-type") || "";
          const data = ct.includes("application/json") ? await totalRes.json() : {};
          totalVal = Number(data.total) || 0;
        }
        if (viewsRes.ok) {
          const ct = viewsRes.headers.get("content-type") || "";
          const data = ct.includes("application/json") ? await viewsRes.json() : [];
          const list = Array.isArray(data) ? data : [];
          const expanded = expandAggregatedRecords(list).slice(0, MAX_DISPLAY_RECORDS);
          setViews(expanded);
          setTotal(totalVal > 0 ? totalVal : (expanded.length > 0 ? expanded.length : 0));
        } else {
          setTotal(totalVal);
        }
      } catch (e) {
        if (e?.name === "AbortError") {
          setError("Tải quá lâu. Kiểm tra kết nối hoặc thử lại.");
        } else {
          console.error(e);
          setError("Không kết nối được API.");
        }
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
  const maxDisplay = 2000;
  const isTruncated = total > maxDisplay && records.length >= maxDisplay;

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
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
          {isTruncated && (
            <p className="text-sm text-[#A59588] mb-2">Hiển thị tối đa {maxDisplay} bản ghi gần nhất.</p>
          )}
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
                  <td className="py-3 pr-4 text-[#5C4A3D]">{formatViewedAt(v.viewedAt)}</td>
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
