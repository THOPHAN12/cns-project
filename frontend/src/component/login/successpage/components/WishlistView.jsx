import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const WishlistView = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState("");

  const userId = Cookies.get("id");

  const handleAddToCart = async (productId) => {
        if (!Cookies.get("token")) {
            setShowLoginModal(true);
            return;
        }

        const userId = Cookies.get("id");
        let currentCartId = null;
        try {
            const cartRes = await fetch(`${apiUrl}/api/user/cart?userId=${userId}`, {
                headers: { "Authorization" : `Bearer ${Cookies.get("token")}` }
            });
            if (cartRes.ok) {
                const cartData = await cartRes.json();
                currentCartId = cartData.cartId;
            } else {
                alert("Thất bại! Lỗi lấy thông tin giỏ hàng.");
                return; 
            }
        } catch (err) {
            alert("Lỗi! Không thể kết nối đến server.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${Cookies.get("token")}`  
                },
                body: JSON.stringify({
                    "cartId": currentCartId,
                    "quantity": quantity,
                    "size": selectedSize,
                })
            });
            if (!response.ok) {
                alert("Thất bại! Thêm sản phẩm vào giỏ hàng thất bại.");
            } else {
                alert("Thành công! Đã thêm sản phẩm vào giỏ hàng.");
            }
        } catch (err) {
            alert("Lỗi! Lỗi thêm vào giỏ hàng.");
        }
    };

  // Gọi API lấy danh sách Wishlist
  const fetchWishlist = async () => {
    if (!userId) {
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/wishlist?userId=${userId}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      });

      if (!response.ok) throw new Error('Lỗi khi tải danh sách yêu thích');

      const data = await response.json();
      console.log(data);
      setWishlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Gọi API xóa sản phẩm khỏi Wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/wishlist/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Cookies.get("token")}`
        },
        // Gửi userId trực tiếp dưới dạng chuỗi JSON
        body: JSON.stringify(userId) 
      });

      if (!response.ok) throw new Error('Không thể xóa sản phẩm');

      // Cập nhật lại state sau khi xóa thành công
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích.');
    }
  };

  // Hàm định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Danh sách yêu thích</h1>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">{error}</div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Danh sách yêu thích của bạn đang trống.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {wishlist.map((product) => (
            <div key={product.id} className="relative flex flex-row py-6 border-b border-gray-100 group">
              
              {/* Vùng hình ảnh (Nền xám nhạt như thiết kế mẫu) */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[#f8f8f8] flex-shrink-0 flex items-center justify-center rounded-sm overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.productName}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Vùng thông tin sản phẩm */}
              <div className="ml-6 flex flex-col justify-center flex-1">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                  {product.productName}
                </h3>
                
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </p>

                {/* Chấm tròn thay màu & Thông tin Size */}
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                  <span className="text-sm text-gray-400">
                    {product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'FreeSize'}
                  </span>
                </div>

                {/* Nút Thêm vào giỏ (Thiết kế viền mỏng giống mẫu) */}
                <button 
                  disabled={product.stockQuantity === 0}
                  className="w-max border border-gray-600 text-gray-800 bg-transparent px-5 py-1.5 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => handleAddToCart(product.id)}
                >
                  {product.stockQuantity > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
                </button>
              </div>

              {/* Nút Xóa (Dấu X tinh tế ở góc phải) */}
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-6 right-0 text-gray-300 hover:text-red-500 transition-colors p-1"
                title="Xóa khỏi yêu thích"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;