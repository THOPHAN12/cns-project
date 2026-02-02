import React, { useState, useMemo } from 'react';
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import Navbar from '../Navbar';
import Footer from '../Footer';
import { mockProducts } from '../product_page/ProductPage';

// --- 1. Chọn lọc dữ liệu ban đầu ---
// Chỉ lấy 3 sản phẩm có ID cụ thể (ví dụ: 2, 4, 7) để hiển thị trong giỏ
const selectedIds = [2, 4, 7]; 

const initialData = mockProducts
    .filter(product => selectedIds.includes(product.id)) // Lọc lấy 3 sản phẩm này
    .map(product => ({
        id: product.id,
        name: product.productName,
        image: product.imageSrc,
        price: Number(product.price),
        quantity: 1, // Mặc định số lượng ban đầu là 1
        brand: 'CNS Studio',
        estimatedShip: 'June 6th',
    }));

// --- 2. Component CartItem (Nhận thêm các hàm xử lý sự kiện từ cha) ---
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-8 border-b border-gray-200 items-start text-gray-800 animate-fadeIn">
      
      {/* Cột 1: Ảnh & Thông tin */}
      <div className="col-span-12 md:col-span-6 flex gap-6">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> 
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.brand}</span>
            <h3 className="font-bold text-lg leading-tight text-gray-900">{item.name}</h3>
            
            <p className="text-sm font-semibold text-orange-600">
                (Estimated Ship Date: {item.estimatedShip})
            </p>
        </div>
      </div>

      {/* Cột 2: Giá */}
      <div className="col-span-4 md:col-span-2 md:text-center mt-4 md:mt-0 font-medium text-gray-700">
         <span className="md:hidden font-bold mr-2 text-black">Price:</span>
         {item.price.toLocaleString('vi-VN')} đ
      </div>

      {/* Cột 3: Số lượng (Đã gắn sự kiện onClick) */}
      <div className="col-span-4 md:col-span-2 flex justify-center mt-4 md:mt-0">
            <div className="flex items-center border border-black rounded px-3 py-1.5 gap-4">
                <button 
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1} // Mờ nút đi nếu số lượng là 1
                    className={`transition-opacity ${item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-60'}`}
                >
                    <FiMinus size={14} />
                </button>
                
                <span className="w-4 text-center font-semibold select-none">{item.quantity}</span>
                
                <button 
                    onClick={() => onIncrease(item.id)}
                    className="hover:opacity-60 transition-opacity"
                >
                    <FiPlus size={14} />
                </button>
            </div>
      </div>

      {/* Cột 4: Tổng tiền & Nút Xóa */}
      <div className="col-span-4 md:col-span-2 flex justify-end items-start gap-3 mt-4 md:mt-0">
        <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
        
        <button 
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 ml-2 transition-colors"
            title="Remove item"
        >
            <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

// --- 3. Component Chính ---
export default function CartPage() {
    // Sử dụng State để quản lý danh sách sản phẩm
    const [cartItems, setCartItems] = useState(initialData);

    // Logic Tăng số lượng
    const handleIncrease = (id) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Logic Giảm số lượng (Không giảm dưới 1)
    const handleDecrease = (id) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === id && item.quantity > 1 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            )
        );
    };

    // Logic Xóa sản phẩm
    const handleRemove = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Tự động tính lại tổng tiền khi cartItems thay đổi
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const grandTotal = subtotal; // Ở đây chưa tính thuế/ship

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 lg:px-8 max-w-6xl">
                <h1 className="text-3xl font-bold text-center mb-12 mt-4 text-gray-900">
                    Your Cart ({cartItems.length} items)
                </h1>

                {/* Nếu giỏ hàng trống thì hiện thông báo */}
                {cartItems.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">Your cart is currently empty.</p>
                        <button className="mt-4 text-black underline hover:text-gray-600">Continue Shopping</button>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 font-bold text-sm text-gray-900">
                            <div className="col-span-6">Item</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        <div className="mb-8">
                            {cartItems.map((item) => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-end w-full pb-10">
                            <div className="w-full md:w-1/2 lg:w-1/3 space-y-4">
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span>{subtotal.toLocaleString('vi-VN')} đ</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-2xl pt-2 text-gray-900 border-t border-gray-100 mt-2">
                                    <span className="font-normal">Grand total:</span>
                                    <span className="font-normal">{grandTotal.toLocaleString('vi-VN')} đ</span>
                                </div>

                                <div className="pt-6">
                                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-900">
                                        <span className="font-bold">Congrats, you're eligible for Free Shipping</span>
                                        <FaTruck size={16} className="text-gray-800" />
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-full"></div>
                                    </div>
                                </div>

                                <button className="w-full bg-black text-white font-bold py-4 px-6 mt-6 hover:bg-gray-800 transition-colors uppercase text-sm tracking-widest rounded-sm">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}