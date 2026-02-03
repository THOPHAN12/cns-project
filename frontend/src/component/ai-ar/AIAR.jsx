import React from 'react';
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AIAR() {
    const [gender, setGender] = useState(null);

  // Component ô nhập liệu (giữ nguyên)
  const InputField = ({ label, suffix, subtext }) => (
    <div className="mb-6 group">
      <div className="flex items-center justify-between">
        <label className="text-gray-700 font-medium text-sm whitespace-nowrap mr-4 min-w-[80px]">
          {label}
        </label>
        <div className="flex-grow relative">
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none px-1 py-1 text-right text-gray-800 transition-colors"
          />
          {suffix && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
      {/* Subtext hiển thị dưới dòng kẻ nếu có (như phần Dài Quần) */}
      {subtext && (
        <p className="text-[10px] text-gray-400 mt-1 text-right">{subtext}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow mt-20 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-3 tracking-wide">
            Thông số cơ thể
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-light">
            Tính năng này giúp bạn hình dung một cách trực quan nhất nhưng không hoàn toàn giống với đời thực
          </p>
        </div>

        {/* Main Content Wrapper */}
        <div className="border border-gray-200 rounded-xl p-4 md:p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* === CỘT TRÁI (THÔNG TIN CƠ BẢN) === */}
            <div className="lg:col-span-4 flex flex-col">
              {/* Tiêu đề nằm ngoài khối xám */}
              <h3 className="text-gray-600 uppercase text-sm font-bold tracking-wider mb-4 pl-4 md:pl-8">
                Thông tin cơ bản
              </h3>
              
              {/* Khối xám chỉ chứa input */}
              <div className="bg-gray-100/60 rounded-3xl p-8 h-full">
                <div className="space-y-6">
                  {/* Gender Select */}
                  <div className="flex items-center justify-between mb-6">
                    <label className="text-gray-700 font-medium text-sm">Giới Tính</label>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      
                      {/* Nút Nam */}
                      <button
                        onClick={() => setGender('male')}
                        className={`px-3 py-1 rounded-md transition-all duration-200 ${
                          gender === 'male'
                            ? 'bg-[#8B4513] text-white font-bold shadow-md' // Selected: Nền nâu, chữ trắng, đậm
                            : 'text-gray-500 hover:text-black hover:bg-gray-200' // Default
                        }`}
                      >
                        Nam
                      </button>
                      
                      <span className="text-gray-400">/</span>

                      {/* Nút Nữ */}
                      <button
                        onClick={() => setGender('female')}
                        className={`px-3 py-1 rounded-md transition-all duration-200 ${
                          gender === 'female'
                            ? 'bg-[#8B4513] text-white font-bold shadow-md' 
                            : 'text-gray-500 hover:text-black hover:bg-gray-200'
                        }`}
                      >
                        Nữ
                      </button>
                      
                    </div>
                  </div>
                  {/* === KẾT THÚC PHẦN CHỈNH SỬA === */}

                  <InputField label="Chiều Cao (Cm)" />
                  <InputField label="Cân Nặng (Kg)" />
                </div>
              </div>
            </div>

            {/* === CỘT PHẢI (SỐ ĐO) === */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Hàng tiêu đề nằm ngoài khối xám */}
              {/* Sử dụng grid giống hệt bên trong để căn thẳng hàng */}
              <div className="hidden md:grid grid-cols-2 gap-x-12 px-8 mb-4">
                <h3 className="text-gray-600 uppercase text-sm font-bold tracking-wider">
                  Phần thân trên
                </h3>
                <h3 className="text-gray-600 uppercase text-sm font-bold tracking-wider">
                  Phần thân dưới
                </h3>
              </div>

              {/* Khối xám lớn chứa cả 2 phần */}
              <div className="bg-gray-100/60 rounded-3xl p-8 h-full relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  {/* Cột Thân Trên */}
                  <div>
                    {/* Mobile Header (chỉ hiện trên mobile) */}
                    <h3 className="md:hidden text-gray-600 uppercase text-sm font-bold tracking-wider mb-4">
                      Phần thân trên
                    </h3>
                    <div className="space-y-2">
                      <InputField label="Vòng Ngực" />
                      <InputField label="Rộng Vai" />
                      <InputField label="Dài Tay" />
                    </div>
                  </div>

                  {/* Cột Thân Dưới */}
                  <div>
                    {/* Mobile Header (chỉ hiện trên mobile) */}
                    <h3 className="md:hidden text-gray-600 uppercase text-sm font-bold tracking-wider mb-4 mt-4">
                      Phần thân dưới
                    </h3>
                    <div className="space-y-2">
                      <InputField label="Vòng Eo" />
                      <InputField label="Vòng Mông" />
                      <InputField label="Dài Quần" subtext="Từ eo đến mắt cá" />
                      <InputField label="Vòng Đùi" />
                    </div>
                  </div>
                </div>

                {/* Nút bấm */}
                <div className="mt-12 flex justify-end">
                  <Link to={"/ar-ai/try-on"} className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-900 font-bold uppercase py-4 px-12 rounded-full transition-all duration-300 shadow-sm text-sm tracking-wide">
                    Thử đồ ảo ngay!
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}