import React from "react";
import Navbar from "../Navbar";
import { IoSearch } from "react-icons/io5";
import { CiCircleChevDown } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";

import img_4965 from "../../assets/mock_product/IMG_4965.JPG"

export default function ProductDetail() {
    const sizes = ["S", "M", "L", "XL"];
    const stock = 6;
    const [quantity, setQuantity] = React.useState(2);
    const [selectedSize, setSelectedSize] = React.useState("M");

    const [showNotification, setShowNotification] = useState(false);
    console.log(showNotification);

    // Hàm xử lý sự kiện
    const handleAddToCart = () => {
        // Hiện thông báo
        setShowNotification(true);

        // Tự động ẩn sau 3 giây (3000ms)
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div>
            <Navbar />
            {/* --- PHẦN THÊM MỚI 2: Giao diện Popup thông báo --- */}
            {/* Chúng ta dùng fixed để nó nổi lên trên cùng màn hình bất kể cuộn trang đi đâu */}
            {showNotification && (
                <div className="fixed top-24 right-5 z-50 transition animate-bounce">
                    <div className="bg-[#3a2415] text-white px-6 py-4 rounded shadow-lg flex items-center gap-3 border border-[#e5d8ce]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-bold">Thành công!</h4>
                            <p className="text-sm text-gray-200">Đã thêm sản phẩm vào giỏ hàng.</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Top filter/search bar */}
            {/* <div className="flex flex-row justify-between bg-[#f3eae5] px-30 py-10 text-2xl">
                <div className="flex flex-row gap-2 items-center">
                    <p className="font-semibold">PHÂN LOẠI</p>
                    <IoSearch />
                    <input type="search" className="border-b-2"></input>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <p>Filter</p>
                    <CiCircleChevDown />
                </div>
            </div> */}

            {/* Breadcrumb */}
            <div className="text-base text-[#7c6f63] flex items-center gap-2 px-30 py-10">
                <Link to={"/product"} className="hover:underline">Sản Phẩm</Link>
                <span className="mx-1">/</span>
                <span className="font-bold text-2xl text-black">Chi Tiết Sản Phẩm</span>
            </div>

            {/* Main content */}
            <div className="flex flex-row gap-12 px-30 py-10">
                {/* Product image */}
                <div className="shrink-0 w-120 flex flex-col items-center">
                    <img src={img_4965} alt="Product image" className="rounded-lg object-cover border border-[#e5d8ce] w-200 h-full" />
                    <button className="mt-4 text-2xl text-[#bdbdbd] hover:text-[#e5d8ce] bg-white rounded-full p-2 border border-[#e5d8ce] w-10 h-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5l-6 6-3-3" />
                        </svg>
                    </button>
                </div>

                {/* Product details */}
                <div className="flex-1 max-w-xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-semibold mb-2">Soft Wrap Long Sleeve</h1>
                        <button className="text-2xl text-[#bdbdbd] hover:text-[#e5d8ce] bg-white rounded-full p-2 border border-[#e5d8ce] w-10 h-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5l-6 6-3-3" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-2xl font-light mb-2">515,000<span className="text-base font-normal ml-1">VNĐ</span></p>
                    <div className="border-b border-[#e5d8ce] my-4"></div>

                    {/* Size selection */}
                    <div className="mb-4">
                        <h2 className="text-base font-medium mb-2">Size</h2>
                        <div className="flex flex-row gap-3 mb-2">
                            {sizes.map(val => (
                                <button
                                    key={val}
                                    onClick={() => setSelectedSize(val)}
                                    className={`w-10 h-10 border rounded text-lg font-medium flex items-center justify-center transition-all duration-150 ${selectedSize === val ? 'bg-[#f3eae5] border-[#7c6f63] text-[#7c6f63]' : 'bg-white border-[#bdbdbd] text-[#7c6f63] hover:bg-[#f3eae5]'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#f3eae5] border border-[#bdbdbd] inline-block"></span>
                            <span className="text-[#7c6f63] text-xs">Chỉ còn <span className="text-[#d7263d] font-semibold">{stock}</span> sản phẩm trong kho!</span>
                        </div>
                    </div>

                    {/* Quantity selection */}
                    <div className="mb-6">
                        <h2 className="text-base font-medium mb-2">Số Lượng</h2>
                        <div className="flex flex-row items-center gap-2">
                            <button
                                className="w-8 h-8 border border-[#bdbdbd] rounded flex items-center justify-center text-lg font-bold text-[#7c6f63] bg-white hover:bg-[#f3eae5]"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >-</button>
                            <span className="w-8 text-center text-lg font-medium">{quantity}</span>
                            <button
                                className="w-8 h-8 border border-[#bdbdbd] rounded flex items-center justify-center text-lg font-bold text-[#7c6f63] bg-white hover:bg-[#f3eae5]"
                                onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                            >+</button>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-row gap-4 mb-4">
                        <button className="flex-1 py-3 hover:scale-120 transition hover:cursor-pointer bg-[#f3eae5] border border-[#e5d8ce] text-[#7c6f63] font-medium rounded hover:bg-[#e5d8ce] transition"
                            onClick={() => {
                                handleAddToCart();
                            }}>Thêm Vào Giỏ Hàng</button>
                        <button className="flex-1 py-3 bg-[#f3eae5] border border-[#e5d8ce] text-[#7c6f63] font-medium rounded hover:bg-[#e5d8ce] transition">Thêm Vào Danh Sách Yêu Thích</button>
                    </div>
                    <button className="w-full py-3 bg-[#3a2415] text-white font-semibold rounded text-lg hover:bg-[#5a3a1a] transition">Mua Ngay</button>
                </div>
            </div>
        </div>
    );
}