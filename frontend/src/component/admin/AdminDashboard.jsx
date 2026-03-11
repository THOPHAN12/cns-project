import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import AdminOrders from "./AdminOrders";
import AdminStats from "./AdminStats";
import AdminProducts from "./AdminProducts";
const TABS = [
  { id: "stats", label: "Thống kê", icon: "📊" },
  { id: "orders", label: "Đơn hàng", icon: "📦" },
  { id: "products", label: "Sản phẩm", icon: "👗" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stats");
  const nav = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token) {
      nav("/login", { replace: true });
      return;
    }
    if (role !== "ADMIN") {
      nav("/profile", { replace: true });
    }
  }, [nav]);

  const renderContent = () => {
    switch (activeTab) {
      case "stats": return <AdminStats />;
      case "orders": return <AdminOrders />;
      case "products": return <AdminProducts />;
      default: return <AdminStats />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f3f0] pt-24 md:pt-28">
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#3e3226]">Quản trị CNS</h1>
            <Link to="/" className="text-sm text-[#A59588] hover:text-[#3e3226]">← Về trang chủ</Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-48 shrink-0">
              <nav className="bg-white rounded-lg shadow-sm p-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === t.id
                        ? "bg-[#463325] text-white"
                        : "text-[#5C4A3D] hover:bg-[#e8e4df]"
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <main className="flex-1 bg-white rounded-lg shadow-sm p-6 min-h-[400px]">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
