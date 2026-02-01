import { useState } from "react";
import Navbar from "../../Navbar"; // Ensure this path is correct based on your folder structure
import profile from "../../../assets/profile.jpg"
import product1 from "../../../assets/product1.png"
import product2 from "../../../assets/product2.png"

export default function SuccessPage() {
  // State to control which tab is active: 'profile' | 'history' | 'wishlist'
  const [activeTab, setActiveTab] = useState("profile");

  // --- SUB-COMPONENT: Profile View (Your original code) ---
  const ProfileView = () => (
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
            <span className="w-32 flex-shrink-0">E-mail:</span>
            <div className="flex-1 border-b border-[#D8CFC6] h-6">elanorbb@gmail.com</div>
          </div>
          <div className="flex items-center">
            <span className="w-32 flex-shrink-0">Số điện thoại:</span>
            <div className="flex-1 border-b border-[#D8CFC6] h-6">0937080900</div>
          </div>
          <div className="flex items-center">
            <span className="w-44 flex-shrink-0">Giới thiệu bản thân:</span>
            <input className="flex-1 p-4 border-b border-[#D8CFC6] h-6" />
          </div>
        </div>
      </div>

      {/* Right Avatar Section */}
      <div className="flex flex-col items-center justify-center w-48">
        <div className="w-40 h-40 bg-[#C5B5A9] rounded-2xl flex items-center justify-center mb-4 shadow-inner">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-[#4a3b32] opacity-80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg> */}
          <img src={profile} alt="Profile image" className="w-full h-full rounded-2xl border-5"/>
        </div>
        <button className="bg-[#463325] text-white px-6 py-1.5 rounded-md hover:bg-[#5e4533] transition-colors text-sm font-medium">
          Đổi ảnh
        </button>
      </div>
    </div>
  );

  // --- SUB-COMPONENT: History View (New Design) ---
  const HistoryView = () => (
    <div className="flex-1 space-y-8">
      {/* Product 1 */}
      <div className="flex gap-6 pb-6 border-b border-[#D8CFC6]">
        {/* Image Placeholder - Replace src with actual image */}
        <div className="w-32 h-40 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
             <img 
               src={product1}
               alt="Dress" 
               className="w-full h-full object-cover" 
             />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-medium">Butterline Tennis Dress</h3>
              <p className="text-sm font-semibold mt-1">1,000,000vnd</p>
            </div>
          </div>

          {/* Size Selector */}
          <div className="pt-2">
            <p className="text-xs mb-1 font-medium">Size</p>
            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    <span className="w-8 h-8 border border-[#4a3b32] flex items-center justify-center text-xs text-gray-400">S</span>
                    <span className="w-8 h-8 bg-[#C5B5A9] border border-[#4a3b32] flex items-center justify-center text-xs font-bold">M</span>
                    <span className="w-8 h-8 border border-[#4a3b32] flex items-center justify-center text-xs text-gray-400 decoration-slice">L</span>
                    <span className="w-8 h-8 border border-[#4a3b32] flex items-center justify-center text-xs text-gray-400">XL</span>
                </div>
                <span className="text-xs text-red-700 font-medium">Chỉ còn 3 sản phẩm trong kho!</span>
            </div>
          </div>

          {/* Color & Quantity */}
          <div className="pt-2 space-y-2">
             <div className="w-5 h-5 rounded-full bg-[#EFE8A8] border border-gray-300"></div> {/* Yellow dot */}
             
             <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Số lượng</span>
                <div className="flex items-center border border-[#4a3b32] h-7">
                    <button className="px-2 hover:bg-gray-200">-</button>
                    <span className="px-2 text-sm">1</span>
                    <button className="px-2 hover:bg-gray-200">+</button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Product 2 */}
      <div className="flex gap-6 pb-6 border-b border-[#D8CFC6]">
        {/* Image Placeholder */}
        <div className="w-32 h-40 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
             <img 
               src={product2}
               alt="Top" 
               className="w-full h-full object-cover" 
             />
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-xl font-medium">Baby Top</h3>
            <p className="text-sm font-semibold mt-1">1,000,000vnd</p>
          </div>

          {/* Size Selector */}
          <div className="pt-2">
            <p className="text-xs mb-1 font-medium">Size</p>
            <div className="flex gap-2">
                <span className="w-8 h-8 border border-[#4a3b32] flex items-center justify-center text-xs text-gray-400">S</span>
                <span className="w-8 h-8 bg-[#C5B5A9] border border-[#4a3b32] flex items-center justify-center text-xs font-bold">M</span>
                <span className="w-8 h-8 border border-[#4a3b32] flex items-center justify-center text-xs text-gray-400">L</span>
            </div>
          </div>

           {/* Color & Quantity */}
           <div className="pt-2 space-y-2">
             <div className="w-5 h-5 rounded-full bg-white border border-gray-300"></div> {/* White dot */}
             
             <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Số lượng</span>
                <div className="flex items-center border border-[#4a3b32] h-7">
                    <button className="px-2 hover:bg-gray-200">-</button>
                    <span className="px-2 text-sm">1</span>
                    <button className="px-2 hover:bg-gray-200">+</button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Total */}
      <div className="flex justify-end items-end pt-4">
        <span className="text-xl font-medium mr-4">Tổng tiền:</span>
        <span className="text-3xl font-semibold">2,000,000vnd</span>
      </div>
    </div>
  );

  const WishlishView = () => {
    return (<>
      <div className="text-4xl text-center font-bold flex justify-center">
        Bạn chưa thêm bất cứ sản phẩm nào vào <br></br>danh sách yêu thích!
      </div>
    </>)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex justify-center items-start p-10 font-sans text-[#4a3b32]">
        
        {/* Main Container */}
        <div className="flex w-full max-w-6xl gap-16">
          
          {/* LEFT COLUMN: Switches based on activeTab */}
          <div className="flex-1">
             {activeTab === 'profile' && <ProfileView />}
             {activeTab === 'history' && <HistoryView />}
             {activeTab === 'wishlist' && <WishlishView />}
          </div>

          {/* RIGHT COLUMN: Sidebar Menu */}
          <div className="w-64 pt-2 flex-shrink-0">
            <ul className="text-[#4a3b32] space-y-2">

              {/* Profile Tab */}
              <li 
                className={`py-2 pl-2 cursor-pointer ${activeTab === 'profile' ? 'bg-[#F5EFE9] font-medium' : 'border-b border-gray-200 hover:bg-gray-50'}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}
              >
                <a href="#">Profile</a>
              </li>

              {/* History Tab */}
              <li 
                className={`py-2 pl-2 cursor-pointer ${activeTab === 'history' ? 'bg-[#F5EFE9] font-medium' : 'border-b border-gray-200 hover:bg-gray-50'}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('history'); }}
              >
                <a href="#">Lịch sử mua hàng</a>
              </li>

              {/* Wishlist Tab */}
              <li 
                className={`py-2 pl-2 cursor-pointer ${activeTab === 'wishlist' ? 'bg-[#F5EFE9] font-medium' : 'border-b border-gray-200 hover:bg-gray-50'}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('wishlist'); }}
              >
                <a href="#">Danh sách yêu thích</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}