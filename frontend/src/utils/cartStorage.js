/** Giỏ hàng local (localStorage) - dùng cho sản phẩm đã tích chọn khi backend không có */

const CART_KEY = "cns_local_cart";

export const CART_UPDATED_EVENT = "cns-cart-updated";

/** Gửi sự kiện để Navbar/CartPage cập nhật số lượng */
export const dispatchCartUpdated = () => {
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

/** Format item cho CartItem: { id, name, imageSrc, price, quantity, isLocal } */
export const getLocalCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const setLocalCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

/** Tổng số lượng sản phẩm trong giỏ local */
export const getLocalCartCount = () => {
  return getLocalCart().reduce((sum, item) => sum + (item.quantity || 1), 0);
};

/** Thêm sản phẩm vào giỏ local. product: { id, productName, imageSrc, price }. Khi tích chọn, luôn giữ số lượng = 1 (không cộng thêm). */
export const addToLocalCart = (product) => {
  const items = getLocalCart();
  const existing = items.find((x) => x.id === product.id);
  if (existing) {
    existing.quantity = 1;
  } else {
    items.push({
      id: product.id,
      name: product.productName || product.name || "Sản phẩm",
      imageSrc: product.imageSrc || "",
      price: Number(product.price) || 0,
      quantity: 1,
      isLocal: true,
    });
  }
  setLocalCart(items);
  dispatchCartUpdated();
};

/** Xóa sản phẩm khỏi giỏ local */
export const removeFromLocalCart = (id) => {
  const items = getLocalCart().filter((x) => x.id !== id);
  setLocalCart(items);
  dispatchCartUpdated();
};

/** Cập nhật số lượng. Nếu quantity <= 0 thì xóa */
export const updateLocalCartQuantity = (id, quantity) => {
  if (quantity <= 0) {
    removeFromLocalCart(id);
    return;
  }
  const items = getLocalCart();
  const item = items.find((x) => x.id === id);
  if (item) {
    item.quantity = quantity;
    setLocalCart(items);
    dispatchCartUpdated();
  }
};
