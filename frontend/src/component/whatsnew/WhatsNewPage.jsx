import Navbar from "../Navbar";
import whatsNewImage from "../../assets/whats-new/image-whats-new-1.png"
import Footer from "../Footer";
import Button from "../Button";

const ListItem = ({ text }) => (
  <li className="flex items-center space-x-2 text-gray-700 font-medium">
    <span className="w-1.5 h-1.5 bg-[#5e4b43] rounded-full shrink-0"></span>
    <span>{text}</span>
  </li>
);

const ActionButton = ({ text }) => (
  <button className="mt-6 px-6 py-2.5 bg-[#A88B7D] hover:bg-[#967a6d] text-white font-medium rounded transition-colors duration-200">
    {text}
  </button>
);

export default function WhatsNewPage() {
    return (
        <div className="">
            <Navbar />
            <div className="p-30">
              <h1 className="text-6xl text-center font-bold">TÍNH NĂNG MỚI</h1>
              <p className="text-lg text-center">Thêu Tên Theo Yêu Cầu - Mỗi Sản Phẩm Đều Có Dấu Ấn Riêng</p>
              <div className="flex flex-row gap-10 mt-20">
                <div className="w-1/2">
                  <h2 className="text-lg">THÊU TÊN THEO YÊU CẦU</h2>
                  <div className="h-4/5"></div>
                  <div className="flex justify-end"><button className="cta-button text-[#3e3226] px-5 py-2 hover:scale-120 hover:cursor-pointer transition-all rounded-lg text-2xl">Khám phá ngay</button></div>
                </div>
                <img src={whatsNewImage} alt="Whats new image" className="shadow-amber-700"/>
              </div>
              
            </div>
            <Footer />
        </div>
    )
}