import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

const formatCurrency = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const parseCsvList = (s) =>
  String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
    productName: "",
    price: 0,
    stockQuantity: 0,
    imageSrc: "",
    sizes: "S, M, L",
    categories: "Nữ",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const base = getApiBaseUrl() || "";
        // Ưu tiên gọi admin endpoint (đồng bộ quyền + cùng nguồn dữ liệu)
        const token = Cookies.get("token");
        const adminUrl = `${base}/api/admin/products`;
        const publicUrl = `${base}/api/products`;
        const adminHeaders = token ? { ...getApiHeaders(), Authorization: `Bearer ${token}` } : getApiHeaders();
        const publicHeaders = getApiHeaders();
        if (!base && import.meta.env.PROD) {
          setError("Chưa cấu hình VITE_API_BASE_URL cho production. Hãy trỏ frontend tới backend của bạn.");
          setProducts([]);
          return;
        }
        // 1) Try admin list (requires ADMIN)
        if (token) {
          const resAdmin = await fetch(adminUrl, { headers: adminHeaders });
          if (resAdmin.ok) {
            const data = await resAdmin.json();
            setProducts(Array.isArray(data) ? data : []);
            return;
          }
          // Nếu admin endpoint bị 401/403 thì fallback public list để vẫn hiển thị sản phẩm
          if (resAdmin.status === 401 || resAdmin.status === 403) {
            const resPublic = await fetch(publicUrl, { headers: publicHeaders });
            if (resPublic.ok) {
              const data = await resPublic.json();
              setProducts(Array.isArray(data) ? data : []);
              setNotice("Đang hiển thị danh sách public vì API admin bị 401/403. Hãy đăng nhập lại Admin hoặc deploy backend mới.");
              window.setTimeout(() => setNotice(null), 4000);
              return;
            }
            setError(`Không tải được danh sách sản phẩm (HTTP ${resPublic.status}).`);
            return;
          }
          setError(`Không tải được danh sách sản phẩm (HTTP ${resAdmin.status}).`);
          return;
        }

        // 2) No token → public list
        const resPublic = await fetch(publicUrl, { headers: publicHeaders });
        if (resPublic.ok) {
          const data = await resPublic.json();
          setProducts(Array.isArray(data) ? data : []);
        } else {
          setError(`Không tải được danh sách sản phẩm (HTTP ${resPublic.status}).`);
        }
      } catch (e) {
        console.error(e);
        setError("Không tải được danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải sản phẩm...</p>;
  }

  const handleNotSupported = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3500);
  };

  const openCreate = () => {
    setMode("create");
    setForm({
      id: "",
      productName: "",
      price: 0,
      stockQuantity: 0,
      imageSrc: "",
      sizes: "S, M, L",
      categories: "Nữ",
    });
    setOpenModal(true);
  };

  const openEdit = (p) => {
    setMode("edit");
    setForm({
      id: p?.id || "",
      productName: p?.productName || "",
      price: Number(p?.price ?? 0),
      stockQuantity: Number(p?.stockQuantity ?? 0),
      imageSrc: p?.imageSrc || "",
      sizes: Array.isArray(p?.sizes) ? p.sizes.join(", ") : "S, M, L",
      categories: Array.isArray(p?.categories) ? p.categories.join(", ") : "Nữ",
    });
    setOpenModal(true);
  };

  const fetchAdminList = async () => {
    const token = Cookies.get("token");
    if (!token) {
      handleNotSupported("Bạn cần đăng nhập Admin để quản trị sản phẩm.");
      return;
    }
    const base = getApiBaseUrl() || "";
    if (!base && import.meta.env.PROD) throw new Error("Missing VITE_API_BASE_URL");
    const res = await fetch(`${base}/api/admin/products`, {
      headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  const seedProducts = async () => {
    const base = getApiBaseUrl() || "";
    if (!base && import.meta.env.PROD) {
      handleNotSupported("Chưa cấu hình VITE_API_BASE_URL nên không seed được.");
      return;
    }
    setSeeding(true);
    setError(null);
    try {
      const res = await fetch(`${base}/api/seed/products`, { headers: getApiHeaders() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(`Seed sản phẩm thất bại (HTTP ${res.status}).`);
        return;
      }
      if (data?.added === 0) {
        setNotice("Sản phẩm đã có sẵn trong hệ thống.");
        window.setTimeout(() => setNotice(null), 2500);
      } else {
        setNotice(`Đã thêm ${data?.added ?? "một số"} sản phẩm.`);
        window.setTimeout(() => setNotice(null), 2500);
      }
      // Reload list
      const token = Cookies.get("token");
      if (token) await fetchAdminList();
      else {
        const res2 = await fetch(`${base}/api/products`, { headers: getApiHeaders() });
        if (res2.ok) setProducts(await res2.json());
      }
    } catch (e) {
      console.error(e);
      setError("Không seed được sản phẩm. Kiểm tra backend + CORS.");
    } finally {
      setSeeding(false);
    }
  };

  const saveProduct = async () => {
    const token = Cookies.get("token");
    if (!token) {
      handleNotSupported("Bạn cần đăng nhập Admin để quản trị sản phẩm.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const base = getApiBaseUrl() || "";
      const payload = {
        id: form.id.trim(),
        productName: form.productName.trim(),
        price: Number(form.price) || 0,
        stockQuantity: Number(form.stockQuantity) || 0,
        imageSrc: form.imageSrc.trim(),
        sizes: parseCsvList(form.sizes),
        categories: parseCsvList(form.categories),
      };
      if (!payload.id || !payload.productName) {
        setError("Vui lòng nhập Mã sản phẩm và Tên sản phẩm.");
        return;
      }

      const url =
        mode === "create"
          ? `${base}/api/admin/products`
          : `${base}/api/admin/products/${encodeURIComponent(payload.id)}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          ...getApiHeaders(),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = res.status === 409 ? "Mã sản phẩm đã tồn tại." : `Lỗi ${res.status} khi lưu sản phẩm.`;
        setError(msg);
        return;
      }

      setOpenModal(false);
      await fetchAdminList();
    } catch (e) {
      console.error(e);
      setError("Không lưu được sản phẩm. Kiểm tra backend + quyền Admin.");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      handleNotSupported("Bạn cần đăng nhập Admin để quản trị sản phẩm.");
      return;
    }
    const ok = window.confirm(`Xóa sản phẩm "${id}"?`);
    if (!ok) return;
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/admin/products/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
      });
      if (!res.ok && res.status !== 204) {
        handleNotSupported(`Xóa thất bại (HTTP ${res.status}).`);
        return;
      }
      await fetchAdminList();
    } catch (e) {
      console.error(e);
      handleNotSupported("Không xóa được sản phẩm. Kiểm tra backend.");
    }
  };

  const getStockStatus = (p) => {
    const qty = p?.stockQuantity ?? 0;
    return qty > 0
      ? { label: "Còn hàng", className: "bg-green-100 text-green-800" }
      : { label: "Hết hàng", className: "bg-red-100 text-red-800" };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#3e3226]">Danh sách sản phẩm</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={seedProducts}
            disabled={seeding}
            className="px-4 py-2 text-sm border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0] disabled:opacity-60"
          >
            {seeding ? "Đang nạp..." : "Nạp sản phẩm"}
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 text-sm bg-[#5C4A3D] text-white rounded-lg hover:bg-[#3e3226]"
          >
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      {notice && <p className="mb-4 text-sm text-[#3e3226] bg-[#f5f3f0] border border-[#e8e4df] p-3 rounded-lg">{notice}</p>}
      {error && <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded-lg">{error}</p>}

      {products.length === 0 ? (
        <p className="text-[#A59588]">Chưa có sản phẩm nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                <th className="py-3 pr-4">Ảnh</th>
                <th className="py-3 pr-4">Tên</th>
                <th className="py-3 pr-4">Giá</th>
                <th className="py-3 pr-4">Tồn kho</th>
                <th className="py-3 pr-4">Trạng thái</th>
                <th className="py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id || p.productId} className="border-b border-[#e8e4df]">
                  <td className="py-3 pr-4">
                    <img
                      src={p.imageSrc || "https://via.placeholder.com/48?text=SP"}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48?text=SP";
                      }}
                    />
                  </td>
                  <td className="py-3 pr-4">{p.productName || p.name || "-"}</td>
                  <td className="py-3 pr-4">{formatCurrency(p.price || 0)}</td>
                  <td className="py-3 pr-4">{p.stockQuantity ?? "-"}</td>
                  <td className="py-3 pr-4">
                    {(() => {
                      const st = getStockStatus(p);
                      return <span className={`inline-block px-2 py-0.5 rounded text-xs ${st.className}`}>{st.label}</span>;
                    })()}
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="text-[#5C4A3D] hover:text-[#3e3226]"
                    >
                      Sửa
                    </button>
                    <span className="mx-2 text-[#d4c5bc]">|</span>
                    <button
                      type="button"
                      onClick={() => deleteProduct(p?.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm text-[#A59588]">
        Tổng: <strong className="text-[#3e3226]">{products.length}</strong> sản phẩm.
      </p>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#3e3226]">
                {mode === "create" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
              </h3>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-[#A59588] hover:text-[#3e3226]"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm text-[#5C4A3D]">
                Mã sản phẩm
                <input
                  value={form.id}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                  disabled={mode === "edit"}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="vd: p-nu-12"
                />
              </label>
              <label className="text-sm text-[#5C4A3D]">
                Tên sản phẩm
                <input
                  value={form.productName}
                  onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="vd: New Top"
                />
              </label>
              <label className="text-sm text-[#5C4A3D]">
                Giá
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  min="0"
                />
              </label>
              <label className="text-sm text-[#5C4A3D]">
                Tồn kho
                <input
                  type="number"
                  value={form.stockQuantity}
                  onChange={(e) => setForm((f) => ({ ...f, stockQuantity: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  min="0"
                />
              </label>
              <label className="text-sm text-[#5C4A3D] sm:col-span-2">
                Ảnh (URL hoặc path)
                <input
                  value={form.imageSrc}
                  onChange={(e) => setForm((f) => ({ ...f, imageSrc: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="/images/products/..."
                />
              </label>
              <label className="text-sm text-[#5C4A3D]">
                Size (phân tách dấu phẩy)
                <input
                  value={form.sizes}
                  onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="S, M, L"
                />
              </label>
              <label className="text-sm text-[#5C4A3D]">
                Danh mục (phân tách dấu phẩy)
                <input
                  value={form.categories}
                  onChange={(e) => setForm((f) => ({ ...f, categories: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="Nữ"
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-sm border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={saveProduct}
                disabled={saving}
                className="px-4 py-2 text-sm bg-[#463325] text-white rounded-lg hover:bg-[#3e3226] disabled:opacity-60"
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
