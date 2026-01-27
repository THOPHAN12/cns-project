import Navbar from "../../Navbar";

export default function SuccessPage() {
    return (<>
        <Navbar />
        <div className="min-h-screen bg-white flex justify-center items-start p-10 font-sans text-[#4a3b32]">
      
      {/* Container chính: Chia làm 2 cột (Nội dung chính và Sidebar) */}
      <div className="flex w-full max-w-6xl gap-8">
        
        {/* Cột 1: Thẻ thông tin chính (Màu nền be) */}
        <div className="flex-1 bg-[#F5EFE9] p-12 rounded-sm relative flex justify-between">
          
          {/* Phần thông tin bên trái */}
          <div className="flex-1 pr-10">
            {/* Tiêu đề Xin chào */}
            <div className="flex items-end mb-10">
              <h1 className="text-5xl font-semibold tracking-wide mr-4">Xin chào,</h1>
              <div className="flex-1 border-b border-[#D8CFC6] mb-2"></div>
            </div>

            {/* Các trường thông tin */}
            <div className="space-y-8 text-lg">
              {/* Email */}
              <div className="flex items-center">
                <span className="w-32 flex-shrink-0">E-mail:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6"></div>
              </div>

              {/* Số điện thoại */}
              <div className="flex items-center">
                <span className="w-32 flex-shrink-0">Số điện thoại:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6"></div>
              </div>

              {/* Giới thiệu bản thân */}
              <div className="flex items-center">
                <span className="w-44 flex-shrink-0">Giới thiệu bản thân:</span>
                <div className="flex-1 border-b border-[#D8CFC6] h-6"></div>
              </div>
            </div>
          </div>

          {/* Phần Avatar bên phải của thẻ */}
          <div className="flex flex-col items-center justify-center w-48">
            {/* Khung ảnh đại diện */}
            <div className="w-40 h-40 bg-[#C5B5A9] rounded-2xl flex items-center justify-center mb-4 shadow-inner">
               {/* Icon User mô phỏng */}
              <svg 
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
              </svg>
            </div>
            
            {/* Nút Đổi ảnh */}
            <button className="bg-[#463325] text-white px-6 py-1.5 rounded-md hover:bg-[#5e4533] transition-colors text-sm font-medium">
              Đổi ảnh
            </button>
          </div>
        </div>

        {/* Cột 2: Sidebar menu bên phải */}
        <div className="w-64 pt-2">
          <ul className="text-[#4a3b32] space-y-2">
            <li className="pb-2 border-b border-gray-200">
              <a href="#" className="hover:text-black">Đăng nhập</a>
            </li>
            <li className="py-2 bg-[#F5EFE9] pl-2 font-medium"> {/* Mục đang chọn - Profile */}
              <a href="#">Profile</a>
            </li>
            <li className="py-2 border-b border-gray-200">
              <a href="#" className="hover:text-black">Lịch sử mua hàng</a>
            </li>
            <li className="py-2 border-b border-gray-200">
              <a href="#" className="hover:text-black">Danh sách yêu thích</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
    </>)
}