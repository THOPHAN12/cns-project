import React from "react";
import profile from "../../../assets/profile.jpg"; // Chỉnh sửa lại path nếu cần

export default function ProfileView() {
    return (
        <div className="flex-1 bg-[#F5EFE9] p-12 rounded-sm relative flex justify-between">
        {/* Left Info Section */}
        <div className="flex-1 pr-10">
            <div className="flex items-end mb-10">
            <h1 className="text-5xl font-semibold tracking-wide mr-4">
                Xin chào, Elanor
            </h1>
            <div className="flex-1 border-b border-[#D8CFC6] mb-2"></div>
            </div>

            <div className="space-y-8 text-lg">
            <div className="flex items-center">
                <span className="w-32 shrink-0">E-mail:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6">elanorbb@gmail.com</div>
            </div>
            <div className="flex items-center">
                <span className="w-32 shrink-0">Số điện thoại:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6">0937080900</div>
            </div>
            <div className="flex items-center">
                <span className="w-44 shrink-0">Giới thiệu bản thân:</span>
                <input className="flex-1 p-4 border-b border-[#D8CFC6] h-6 bg-transparent outline-none" />
            </div>
            </div>
        </div>

        {/* Right Avatar Section */}
        <div className="flex flex-col items-center justify-center w-48">
            <div className="w-40 h-40 bg-[#C5B5A9] rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <img
                src={profile}
                alt="Profile"
                className="w-full h-full rounded-2xl border-5 object-cover"
            />
            </div>
            <button className="bg-[#463325] text-white px-6 py-1.5 rounded-md hover:bg-[#5e4533] transition-colors text-sm font-medium">
            Đổi ảnh
            </button>
        </div>
        </div>
    );
}