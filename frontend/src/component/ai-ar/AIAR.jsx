import Footer from "../Footer";
import Navbar from "../Navbar";

export default function AIAR() {
  // Component con để tái sử dụng cho các ô nhập liệu
  const InputField = ({ label, suffix }) => (
    <div className="flex items-center justify-between mb-6 group">
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
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow mt-12 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-3 tracking-wide">
            Thông số cơ thể
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-light">
            Tính năng này giúp bạn hình dung một cách trực quan nhất nhưng không hoàn toàn giống với đời thực
          </p>
        </div>

        {/* Main Content Box */}
        <div className="border border-gray-200 rounded-xl p-4 md:p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Basic Info */}
            <div className="lg:col-span-4 bg-gray-100/60 rounded-3xl p-8 h-full">
              <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-wider mb-8 text-center lg:text-left">
                Thông tin cơ bản
              </h3>
              
              <div className="space-y-6">
                {/* Gender Select */}
                <div className="flex items-center justify-between mb-6">
                  <label className="text-gray-700 font-medium text-sm">Giới Tính</label>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
                    <span className="cursor-pointer hover:text-black transition-colors">Nam</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-black transition-colors">Nữ</span>
                  </div>
                </div>

                <InputField label="Chiều Cao (Cm)" />
                <InputField label="Cân Nặng (Kg)" />
              </div>
            </div>

            {/* Right Column: Measurements */}
            <div className="lg:col-span-8 bg-gray-100/60 rounded-3xl p-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Upper Body */}
                <div>
                  <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-wider mb-8 text-center md:text-left">
                    Phần thân trên
                  </h3>
                  <div className="space-y-2">
                    <InputField label="Vòng Ngực" />
                    <InputField label="Rộng Vai" />
                    <InputField label="Dài Tay" />
                  </div>
                </div>

                {/* Lower Body */}
                <div>
                  <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-wider mb-8 text-center md:text-left">
                    Phần thân dưới
                  </h3>
                  <div className="space-y-2">
                    <InputField label="Vòng Eo" />
                    <InputField label="Vòng Mông" />
                    <div className="mb-6">
                       <InputField label="Dài Quần" />
                       <p className="text-[10px] text-gray-400 -mt-4 pl-[96px]">Từ eo đến mắt cá</p>
                    </div>
                    <InputField label="Vòng Đùi" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-12 flex justify-end">
                <button className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-900 font-bold uppercase py-4 px-12 rounded-full transition-all duration-300 shadow-sm text-sm tracking-wide">
                  Thử đồ ảo ngay!
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}