import Navbar from "../Navbar";
import collectionImage from "../../assets/8.png"
import title from "../../assets/collection/chũ.png";
import img1 from "../../assets/collection/1.png"
import img2 from "../../assets/collection/2.png"
import img3 from "../../assets/collection/3.png"
import { useState } from "react";
import Footer from "../Footer";

export default function CollectionPage() {
    const [display, setDisplay] = useState(false);
    return (
        <div>
            <Navbar />
            {display && (<div className="bg-[#babcbc] flex flex-row justify-center items-center">
                <div className="text-white text-center py-5 w-1/2 px-12">
                    <p className="text-xl font-light font-stretch-extra-expanded">Một giai đoạn mới của phong cách</p>
                    <img src={title} alt="TỐI GIẢN" className="relative left-25" />
                    <p>The Clean Era Collection đánh dấu cách CNS quay về những giá trị cốt lõi: form dáng vừa vặn, chất liệu dễ chịu và thiết kế đủ tinh tế để tôn lên đường nét tự nhiên. Mỗi món đồ được tạo ra để đồng hành cùng bạn trong mọi nhịp sống - từ công việc, vận động đến những khoảng nghỉ riêng tư - theo cách giản lược nhưng có chủ đích.</p>
                </div>
                <div className="w-1/2">
                    <img src={collectionImage} alt="Collection image" className=" overflow-hidden" />
                </div>
            </div>)}

            {!display && (<div className="w-full h-screen min-h-[600px] font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    
                    {/* --- Cột Trái (Left Column) --- */}
                    <div className="flex flex-col h-full w-full">
                    
                    {/* Section 1: Top Left - The Clean Era Collection */}
                    <div onClick={() => {
                        setDisplay(!display);
                    }} className="relative h-1/2 w-full overflow-hidden group">
                        {/* Hình ảnh nền (Thay URL ảnh thật của bạn vào đây) */}
                        <img 
                        src={img1}
                        alt="Black Sweatshirt" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay làm tối nhẹ để chữ nổi bật (tùy chọn) */}
                        <div className="absolute inset-0 bg-black/10"></div>
                        
                        {/* Nội dung text */}
                        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
                        <h2 className="text-amber-950 text-2xl md:text-3xl font-medium drop-shadow-md">
                            The Clean Era Collection
                        </h2>
                        </div>
                    </div>

                    {/* Section 2: Bottom Left - Các sản phẩm mới */}
                    <div className="relative h-1/2 w-full overflow-hidden group">
                        <img 
                        src={img2}
                        alt="Beige Top" 
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <h2 className="text-amber-950 relative bottom-25 text-2xl md:text-3xl font-medium drop-shadow-md">
                            Các sản phẩm mới
                        </h2>
                        </div>
                    </div>
                    </div>

                    {/* --- Cột Phải (Right Column) --- */}
                    <div className="relative h-full w-full overflow-hidden group">
                    <img 
                        src={img3}
                        alt="Grey Hoodie" 
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient nhẹ ở dưới để làm nổi bật text trắng */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Nội dung căn giữa phía dưới */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end md:pb-32">
                        <h2 className="text-amber-950 text-3xl md:text-4xl font-medium mb-6 drop-shadow-md text-center">
                        Các sản phẩm <br></br> bán chạy
                        </h2>
                        <button className="bg-gray-800/90 hover:bg-black text-white px-8 py-2.5 rounded-full backdrop-blur-sm transition-colors duration-300 text-sm md:text-base font-medium">
                        Mua ngay
                        </button>
                    </div>
                    </div>

                </div>
                </div>) }
                <Footer />
        </div>
    )
}