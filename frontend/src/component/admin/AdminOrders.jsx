import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

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
  const [seeding, setSeeding] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchOrders = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/invoice`, {
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
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
      if (res.ok && data?.added > 0) await fetchOrders();
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const updateStatus = async (invoiceId, status) => {
    const token = Cookies.get("token");
    if (!token) return;
    setUpdating(invoiceId);
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/invoice/${invoiceId}/status`, {
        method: "PATCH",
        headers: {
          ...getApiHeaders(),
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

  const closeDetails = () => setSelected(null);

  const printOrder = (order) => {
    if (!order) return;
    const items = Array.isArray(order.items) ? order.items : [];
    const escapeHtml = (s) =>
      String(s ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const rows = items
      .map((it) => {
        const name = escapeHtml(it.productName || "—");
        const size = escapeHtml(it.size || (Array.isArray(it.sizes) ? it.sizes?.[0] : "—"));
        const qty = Number(it.quantity ?? 0) || 0;
        const price = Number(it.price ?? 0) || 0;
        const lineTotal = qty * price;
        return `
          <tr>
            <td>${name}</td>
            <td style="text-align:center">${size}</td>
            <td style="text-align:right">${qty}</td>
            <td style="text-align:right">${new Intl.NumberFormat("vi-VN").format(price)}</td>
            <td style="text-align:right">${new Intl.NumberFormat("vi-VN").format(lineTotal)}</td>
          </tr>
        `;
      })
      .join("");

    const subtotal = items.reduce((sum, it) => {
      const qty = Number(it?.quantity ?? 0) || 0;
      const price = Number(it?.price ?? 0) || 0;
      return sum + qty * price;
    }, 0);

    const totalPay = Number(order.totalPrice ?? 0) || 0;

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Đơn hàng ${escapeHtml(order.invoiceId)}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; color:#222; margin:24px; }
          h1 { font-size:18px; margin:0 0 8px; }
          .muted { color:#666; font-size:12px; }
          .grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin:16px 0; }
          .box { border:1px solid #ddd; border-radius:8px; padding:12px; }
          .label { font-size:12px; color:#666; margin-bottom:4px; }
          .value { font-size:13px; font-weight:600; }
          table { width:100%; border-collapse:collapse; margin-top:12px; }
          th, td { border-bottom:1px solid #eee; padding:8px 6px; font-size:13px; vertical-align:top; }
          th { text-align:left; background:#fafafa; }
          .total { display:flex; justify-content:flex-end; gap:12px; margin-top:12px; font-size:14px; }
          .total b { font-size:16px; }
          @media print {
            body { margin: 0; }
            .box { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div style="display:flex; justify-content:space-between; gap:16px; align-items:flex-start;">
          <div>
            <h1 style="margin-bottom:4px;">CNS / Cleanie Studio</h1>
            <div class="muted">Website: cleannieshop.com</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:16px; font-weight:700;">HÓA ĐƠN BÁN HÀNG</div>
            <div class="muted">Ngày in: ${escapeHtml(new Date().toLocaleString("vi-VN"))}</div>
          </div>
        </div>

        <div class="muted" style="margin-top:10px;">
          Mã đơn: <b>${escapeHtml(order.invoiceId)}</b>
          • Ngày đặt: ${escapeHtml(formatDate(order.dateCreated))}
          • Trạng thái: <b>${escapeHtml(STATUS_LABELS[order.status] || order.status || "—")}</b>
        </div>

        <div class="grid">
          <div class="box">
            <div class="label">Khách hàng</div>
            <div class="value">${escapeHtml(order.customerFullName || "—")}</div>
            <div class="label" style="margin-top:8px">SĐT</div>
            <div class="value">${escapeHtml(order.phoneNumber || "—")}</div>
            <div class="label" style="margin-top:8px">Email</div>
            <div class="value">${escapeHtml(order.email || "—")}</div>
          </div>
          <div class="box">
            <div class="label">Địa chỉ nhận hàng</div>
            <div class="value">${escapeHtml(order.address || "—")}</div>
            <div class="label" style="margin-top:8px">Phương thức thanh toán</div>
            <div class="value">${escapeHtml(order.payMethodOption || "—")}</div>
            <div class="label" style="margin-top:8px">Tổng tiền</div>
            <div class="value">${escapeHtml(formatCurrency(order.totalPrice || 0))}</div>
          </div>
        </div>

        <div class="box">
          <div class="label">Sản phẩm</div>
          ${
            items.length > 0
              ? `<table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th style="text-align:center">Size</th>
                      <th style="text-align:right">SL</th>
                      <th style="text-align:right">Giá</th>
                      <th style="text-align:right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>`
              : `<div class="muted" style="margin-top:8px">Không có danh sách sản phẩm.</div>`
          }
          <div style="margin-top:10px; display:flex; justify-content:flex-end;">
            <div style="min-width:320px;">
              <div class="total"><span>Tạm tính:</span> <b>${escapeHtml(formatCurrency(subtotal))}</b></div>
              <div class="total"><span>Giảm giá:</span> <b>${escapeHtml(formatCurrency(0))}</b></div>
              <div class="total"><span>Phí ship:</span> <b>${escapeHtml(formatCurrency(Math.max(0, totalPay - subtotal)))}</b></div>
              <div class="total"><span>Tổng thanh toán:</span> <b>${escapeHtml(formatCurrency(totalPay))}</b></div>
            </div>
          </div>
        </div>

        <div class="muted" style="margin-top:14px;">
          Cảm ơn bạn đã mua hàng tại CNS. Vui lòng kiểm tra hàng trước khi thanh toán (nếu COD).
        </div>

      </body>
      </html>
    `;

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) {
      handleNotSupported("Trình duyệt đang chặn popup. Hãy cho phép popups để in đơn.");
      return;
    }
    try {
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();
      // Đợi DOM render xong rồi mới in (tránh màn trắng)
      window.setTimeout(() => {
        try {
          w.focus();
          w.print();
        } catch (e) {
          // ignore
        }
      }, 300);
    } catch (e) {
      console.error(e);
      handleNotSupported("Không mở được trang in. Hãy thử lại hoặc đổi trình duyệt.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <div className="flex items-center gap-4">
          <p className="text-[#A59588]">Chưa có đơn hàng nào.</p>
          <button
            type="button"
            onClick={seedInvoices}
            disabled={seeding}
            className="px-3 py-1.5 text-sm bg-[#5C4A3D] text-white rounded hover:bg-[#3e3226] disabled:opacity-60"
          >
            {seeding ? "Đang thêm..." : "Thêm đơn mẫu"}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                <th className="py-3 pr-4">Ngày</th>
                <th className="py-3 pr-4">Khách hàng</th>
                <th className="py-3 pr-4">Tổng tiền</th>
                <th className="py-3 pr-4">Trạng thái</th>
                <th className="py-3 pr-4">Chi tiết</th>
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
                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => setSelected(o)}
                      className="text-[#5C4A3D] hover:text-[#3e3226] underline"
                    >
                      Xem
                    </button>
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

      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDetails();
          }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#3e3226]">Chi tiết đơn hàng</h3>
                <p className="text-sm text-[#A59588]">Mã: {selected.invoiceId}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => printOrder(selected)}
                  className="px-3 py-1.5 text-sm border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0]"
                >
                  In đơn
                </button>
                <button
                  type="button"
                  onClick={closeDetails}
                  className="text-[#A59588] hover:text-[#3e3226]"
                >
                  Đóng
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <div className="text-[#A59588]">Khách hàng</div>
                <div className="text-[#3e3226] font-medium">{selected.customerFullName || "—"}</div>
              </div>
              <div>
                <div className="text-[#A59588]">SĐT</div>
                <div className="text-[#3e3226] font-medium">{selected.phoneNumber || "—"}</div>
              </div>
              <div>
                <div className="text-[#A59588]">Ngày đặt</div>
                <div className="text-[#3e3226] font-medium">{formatDate(selected.dateCreated)}</div>
              </div>
              <div>
                <div className="text-[#A59588]">Tổng tiền</div>
                <div className="text-[#3e3226] font-medium">{formatCurrency(selected.totalPrice || 0)}</div>
              </div>
            </div>

            <div className="border border-[#e8e4df] rounded-lg overflow-hidden">
              <div className="bg-[#f5f3f0] px-4 py-2 text-sm text-[#5C4A3D] font-medium">Sản phẩm đã đặt</div>
              {Array.isArray(selected.items) && selected.items.length > 0 ? (
                <div className="max-h-[360px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                        <th className="py-2 px-4">Sản phẩm</th>
                        <th className="py-2 px-4">Size</th>
                        <th className="py-2 px-4">SL</th>
                        <th className="py-2 px-4">Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.items.map((it, idx) => (
                        <tr key={`${it.productId || "p"}-${idx}`} className="border-b border-[#f0ede9]">
                          <td className="py-2 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.imageSrc || "https://via.placeholder.com/48?text=SP"}
                                alt=""
                                className="w-10 h-10 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/48?text=SP";
                                }}
                              />
                              <div>
                                <div className="text-[#3e3226]">{it.productName || "—"}</div>
                                <div className="text-xs text-[#A59588]">{it.productId || ""}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4">{it.size || (Array.isArray(it.sizes) ? it.sizes?.[0] : "—")}</td>
                          <td className="py-2 px-4">{it.quantity ?? "—"}</td>
                          <td className="py-2 px-4">{formatCurrency(it.price || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-4 py-4 text-sm text-[#A59588]">Đơn này chưa có danh sách sản phẩm (có thể là đơn mẫu/seed).</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
