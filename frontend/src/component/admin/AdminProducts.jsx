import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "../../utils/api";

const formatCurrency = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải sản phẩm...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#3e3226] mb-6">Danh sách sản phẩm</h2>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm text-[#A59588]">
        Tổng: <strong className="text-[#3e3226]">{products.length}</strong> sản phẩm. (Chỉ xem, chỉnh sửa qua database.)
      </p>
    </div>
  );
}
