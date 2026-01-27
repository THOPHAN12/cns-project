import Navbar from "../Navbar";
import image1 from "../../assets/image-whats-new-1.png"
import image2 from "../../assets/image-whats-new-2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import React from 'react';
import computerImage from "../../assets/computer-whats-new.png"
import sweatshirt1 from "../../assets/sweatshirt-full.png"
import sweatshirt2 from "../../assets/sweatshirt2.png"

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
            <div className="bg-[#f3eae5] px-30">
                <div className=" px-30 py-5 text-center">
                    <h1 className="text-6xl mb-2">Tính năng mới</h1>
                    <p className="text-lg">Giới thiệu những tính năng và bộ sưu tập mới nhất của chúng tôi</p>
                </div>
                <div className="flex flex-row">
                <div className="flex flex-col gap-3 w-1/2">
                    <div className="p-5 bg-white rounded-lg w-fit">
                        <h1 className="text-lg font-bold">Tops</h1>
                        <div className="border-b-2 w-full"></div>
                        <div className="flex flex-row gap-2 my-2">
                            <img src={image1} className="rounded-xl w-40 h-40"/>
                            <img src={image2} className="rounded-xl w-40 h-40"/>
                        </div>
                    </div>
                    <div className="p-5 bg-white rounded-lg w-fit">
                        <h1 className="text-lg font-bold">Bottoms</h1>
                        <div className="border-b-2 w-full"></div>
                        <div className="flex flex-row gap-2 my-2">
                                <img src={image3} className="rounded-xl w-40 h-40"/>
                                <img src={image4} className="rounded-xl w-40 h-40"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 ">
      
                    {/* --- ELEMENT 1: Thử đồ bằng AR --- */}
                <div className="bg-white w-full max-w-6xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden">
                    {/* Nội dung bên trái */}
                    <div className="p-6 w-3/4 rounded-lg flex flex-col justify-center">
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-2">
                        AI Body Scan
                    </h2>
                    {/* <p className="text-gray-500 mb-6 text-lg">
                        Xem trước trang phục của chúng tôi trên người bạn
                    </p> */}

                    {/* <ul className="space-y-3 mb-4">
                        <ListItem text="Xem bản thân trong nhiều trang phục khác nhau" />
                        <ListItem text="Thử trước khi mua" />
                        <ListItem text="Nâng cao trải nghiệm mua sắm" />
                    </ul> */}
                    <p className="text-gray-500 mb-6 text-lg">Cùng CNS cá nhân hóa trải nghiệm mặc
Bằng những thao tác cơ bản để quét dáng người, hệ thống AI của CNS phân tích tỷ lệ cơ thể và đề xuất thiết kế phù hợp. Mỗi lựa chọn đều dựa trên bạn, chỉ dành cho bạn, không phải tiêu chuẩn chung.</p>

                    <div>
                        <ActionButton text="Khám phá ngay" />
                    </div>
                    </div>

                    {/* Hình ảnh bên phải */}
                    <div className="w-full md:w-7/12 bg-gray-100 relative">
                    {/* Placeholder cho hình Laptop/Phone */}
                    <div className="w-full h-full min-h-75 flex items-center justify-center bg-gray-50">
                        <img 
                        src={computerImage}
                        alt="AR Try on Mockup" 
                        className=""
                        />
                        {/* Lưu ý: Bạn hãy thay src ở trên bằng ảnh chụp màn hình laptop/phone thực tế của bạn */}
                    </div>
                    </div>
                </div>

                {/* --- ELEMENT 2: Thêu tên theo yêu cầu --- */}
                <div className="bg-white w-full max-w-6xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden">
                    {/* Nội dung bên trái */}
                    <div className="p-6 rounded-lg flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                        Thêu tên theo yêu cầu
                    </h2>
                    <p className="text-gray-500 mb-6 text-lg">
                        Cá nhân hóa trang phục của bạn
                    </p>

                    <ul className="space-y-3 mb-4">
                        <ListItem text="Thêm tên hoặc chữ cái cá nhân" />
                        <ListItem text="Thêu chất lượng cao" />
                        <ListItem text="Thể hiện cá tính riêng của bạn" />
                    </ul>

                    <div>
                        <ActionButton text="Khám phá ngay" />
                    </div>
                    </div>

                    {/* Hình ảnh bên phải (2 ảnh) */}
                    <div className="w-full md:w-7/12 p-2 md:p-6 bg-white">
                    <div className="grid grid-cols-2 gap-2 h-full">
                        {/* Ảnh 1: Áo Sweatshirt toàn cảnh */}
                        <div className="aspect-4/3 md:aspect-auto overflow-hidden rounded-sm">
                        <img 
                            src={sweatshirt1}
                            alt="Sweatshirt full" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        </div>
                        {/* Ảnh 2: Cận cảnh thêu */}
                        <div className="aspect-4/3 md:aspect-auto overflow-hidden rounded-sm">
                        <img 
                            src={sweatshirt2} 
                            alt="Embroidery detail" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                </div>
            </div>
            
        </div>
    )
}