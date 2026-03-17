import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar({ activeTab, setActiveTab }) {
    const isAdmin = Cookies.get("role") === "ADMIN";
    const tabs = [
        { id: "profile", label: "Profile" },
        { id: "history", label: "Lịch sử mua hàng" },
        { id: "wishlist", label: "Danh sách yêu thích" },
    ];

    return (
        <div className="w-64 pt-2 shrink-0">
        <ul className="text-[#4a3b32] space-y-2">
            {isAdmin && (
                <li className="py-2 pl-2 border-b border-gray-200">
                    <Link to="/admin" className="text-[#463325] font-medium hover:underline">📊 Quản trị</Link>
                </li>
            )}
            {tabs.map((tab) => (
            <li
                key={tab.id}
                className={`py-2 pl-2 cursor-pointer ${
                activeTab === tab.id
                    ? "bg-[#F5EFE9] font-medium"
                    : "border-b border-gray-200 hover:bg-gray-50"
                }`}
                onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
                }}
            >
                <a href="#">{tab.label}</a>
            </li>
            ))}
        </ul>
        </div>
    );
}