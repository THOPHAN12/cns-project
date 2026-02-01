import React from 'react';
// Import các icon từ react-icons
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { FaTruck, FaFire } from "react-icons/fa";
import Navbar from '../Navbar';
import Footer from '../Footer';

// --- 1. Tạo Component Navbar & Footer tạm (Để đảm bảo code chạy được ngay) ---
// Sau này bạn có thể move 2 cái này ra file riêng nếu muốn


// --- 2. Dữ liệu ---
const initialCartItems = [
  {
    id: 1,
    name: 'Pi Pizza Oven',
    image: 'https://via.placeholder.com/150?text=Pizza+Oven', 
    price: 469.99,
    quantity: 1,
    fuelSource: 'Wood Only',
    estimatedShip: 'June 6th',
    isFree: false,
  },
  {
    id: 2,
    name: 'Grill Ultimate Bundle',
    image: 'https://via.placeholder.com/150?text=Grill+Bundle',
    price: 549.99,
    quantity: 1,
    protectionPlan: true,
    isFree: false,
  },
  {
    id: 3,
    name: 'Starters (4 pack)',
    brand: 'Solo Stove',
    image: 'https://via.placeholder.com/150?text=Starters',
    price: 14.23414,
    quantity: 1,
    isFree: false,
  },
  {
    id: 4,
    name: 'Charcoal Grill Pack',
    brand: 'Solo Stove',
    image: 'https://via.placeholder.com/150?text=Charcoal',
    price: 0.00,
    quantity: 1,
    isFree: false,
  }
];

// --- 3. Component con: CartItem ---
const CartItem = ({ item }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-8 border-b border-gray-200 items-start text-gray-800">
      
      {/* Cột 1: Ảnh & Thông tin */}
      <div className="col-span-12 md:col-span-6 flex gap-6">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
        </div>
        <div className="flex flex-col gap-1">
            {item.brand && <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.brand}</span>}
            <h3 className="font-bold text-lg leading-tight text-gray-900">{item.name}</h3>
            
            {item.estimatedShip && (
                <p className="text-sm font-semibold text-orange-600">
                    (Estimated Ship Date: {item.estimatedShip})
                </p>
            )}
            
            {item.fuelSource && (
                <p className="text-sm text-gray-500 mt-1">Fuel Source: {item.fuelSource}</p>
            )}

            {item.estimatedShip && (
                 <button className="text-sm text-gray-400 underline text-left w-fit hover:text-gray-600 transition-colors">Change</button>
            )}
            
            {item.protectionPlan && (
                <button className="mt-3 text-[11px] border border-orange-200 text-gray-700 bg-orange-50 px-2 py-1 rounded w-fit hover:bg-orange-100 transition-colors">
                    Add accident protection for $29.99
                </button>
            )}
        </div>
      </div>

      {/* Cột 2: Giá */}
      <div className="col-span-4 md:col-span-2 md:text-center mt-4 md:mt-0 font-medium text-gray-700">
         <span className="md:hidden font-bold mr-2 text-black">Price:</span>
         ${item.price.toFixed(2)}
      </div>

      {/* Cột 3: Số lượng */}
      <div className="col-span-4 md:col-span-2 flex justify-center mt-4 md:mt-0">
        {item.isFree ? (
             <div className="w-24 border-b border-black text-center pb-1 text-gray-400 select-none">1</div>
        ) : (
            <div className="flex items-center border border-black rounded px-3 py-1.5 gap-4">
                <button className="hover:opacity-60 transition-opacity">
                    <FiMinus size={14} />
                </button>
                <span className="w-4 text-center font-semibold select-none">{item.quantity}</span>
                <button className="hover:opacity-60 transition-opacity">
                    <FiPlus size={14} />
                </button>
            </div>
        )}
      </div>

      {/* Cột 4: Tổng tiền */}
      <div className="col-span-4 md:col-span-2 flex justify-end items-start gap-3 mt-4 md:mt-0">
        <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
        {!item.isFree && (
            <button className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 ml-2 transition-colors">
                <FiX size={14} />
            </button>
        )}
      </div>
    </div>
  );
};

// --- 4. Component Chính ---
export default function CartPage() {
    const subtotal = 1019.98;
    const tax = 102.00;
    const grandTotal = 1121.98;

    return (
        // QUAN TRỌNG: Thay thẻ Fragment <> bằng div có class flex để Footer luôn nằm dưới cùng
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 lg:px-8 max-w-6xl">
                {/* Tiêu đề trang */}
                <h1 className="text-3xl font-bold text-center mb-12 mt-4 text-gray-900">
                    Your Cart ({initialCartItems.length} items)
                </h1>

                {/* Tiêu đề bảng */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 font-bold text-sm text-gray-900">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Danh sách Item */}
                <div className="mb-8">
                    {initialCartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Phần Tổng kết đơn hàng */}
                <div className="flex flex-col items-end w-full pb-10">
                    <div className="w-full md:w-1/2 lg:w-1/3 space-y-4">
                        <div className="flex justify-between items-center text-gray-700">
                            <span className="font-semibold">Subtotal:</span>
                            <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-gray-700 pb-4 border-b border-gray-100">
                            <span className="font-semibold">Sales Tax:</span>
                            <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="flex justify-end pb-2 border-b border-gray-100">
                            <button className="text-sm underline text-gray-500 hover:text-gray-900 transition-colors">Add Coupon</button>
                        </div>

                        <div className="flex justify-between items-center text-2xl pt-2 text-gray-900">
                            <span className="font-normal">Grand total:</span>
                            <span className="font-normal">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
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
            </main>

            <Footer />
        </div>
    );
}