import Navbar from "../Navbar";
import { IoSearch } from "react-icons/io5";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import ProductItem from "./ProductItem";
import { useState } from "react";
// Import all images from mock_products folder


import img_3_1 from "../../assets/mock_product/3.1.png";
import img_4_2 from "../../assets/mock_product/4.2.png";
import img_3_3 from "../../assets/mock_product/3.3.png";
import img_22_3 from "../../assets/mock_product/22.3.png";
import img_21_2 from "../../assets/mock_product/21.2.png";
import img_20_3 from "../../assets/mock_product/20.3.png";
import img_20_2 from "../../assets/mock_product/20.2.png";
import img_20_1 from "../../assets/mock_product/20.1.png";
import img_4_3 from "../../assets/mock_product/4.3.png";
import img_2_3 from "../../assets/mock_product/2.3.png";
import img_5_1 from "../../assets/mock_product/5.1.png";
import img_2_2 from "../../assets/mock_product/2.2.png";
import img_19_3 from "../../assets/mock_product/19.3.png";
import img_19_1 from "../../assets/mock_product/19.1.png";
import img_18_3 from "../../assets/mock_product/18.3.png";
import img_18_1 from "../../assets/mock_product/18.1.png";
import img_17_3 from "../../assets/mock_product/17.3.png";
import img_17_2 from "../../assets/mock_product/17.2.png";
import img_5_2 from "../../assets/mock_product/5.2.png";
import img_17_1 from "../../assets/mock_product/17.1.png";
import blush_court_set from "../../assets/mock_product/Blush Court Set.png";
import Button from "../Button";
import Footer from "../Footer";
import VideoPopUp from "../VideoPopUp";

const mockProductImages = [
    img_3_1,
    img_4_2,
    img_3_3,
    img_22_3,
    img_21_2,
    img_20_3,
    img_20_2,
    img_20_1,
    img_4_3,
    img_2_3,
    img_5_1,
    img_2_2,
    img_19_3,
    img_19_1,
    img_18_3,
    img_18_1,
    img_17_3,
    img_17_2,
    img_5_2,
    img_17_1,
];

const mockProducts = [
    { imageSrc: img_3_1, productName: "Sweater", price: 500000 },
    { imageSrc: img_4_2, productName: "Sweatshirt", price: 520000 },
    { imageSrc: img_3_3, productName: "Quần Biker", price: 540000 },
    { imageSrc: img_22_3, productName: "Quần Shorts trắng", price: 560000 },
    { imageSrc: img_21_2, productName: "Áo khoác vải", price: 480000 },
    { imageSrc: img_20_3, productName: "Quần dài", price: 530000 },
    { imageSrc: img_20_2, productName: "Leggings", price: 510000 },
    { imageSrc: img_20_1, productName: "Tank Top", price: 470000 },
    { imageSrc: img_4_3, productName: "Quần Short đen", price: 495000 },
    { imageSrc: img_2_3, productName: "Sports Bra", price: 505000 },
    { imageSrc: img_5_1, productName: "Long Sleeve", price: 515000 },
    { imageSrc: img_2_2, productName: "Pullover", price: 525000 },
    { imageSrc: img_19_3, productName: "Zip Hoodie", price: 535000 },
    { imageSrc: img_19_1, productName: "Windbreaker", price: 545000 },
    { imageSrc: img_18_3, productName: "Joggers", price: 555000 },
    { imageSrc: img_18_1, productName: "Sweatpants", price: 565000 },
    { imageSrc: img_17_3, productName: "Vest", price: 575000 },
    { imageSrc: img_17_2, productName: "Cardigan", price: 585000 },
    { imageSrc: img_5_2, productName: "Denim Jacket", price: 595000 },
    { imageSrc: img_17_1, productName: "Polo Shirt", price: 605000 },
    { imageSrc: blush_court_set, productName: "Polo Blush", price: 123849 },
];

export default function ProductPage() {
    const [isOpenTypeSel, setisOpenTypeSel] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    console.log(isOpenPopUp);
    const options = [
        "Nữ",
        "Nam",
        "Trang phục màu sáng",
        "Trang phục màu tối"
    ];
    const optionFilter = [
        "Giá từ thấp tới cao",
        "Giá từ cao tới thấp",
        "Độ bán chạy"
    ]
    return (<div id="product-page">
        <Navbar />
        <div id="product-page-body" className="bg-[#f3eae5] px-30 py-10 text-2xl">
            <div className="relative w-full p-4"> 
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <p className="font-semibold text-black">Phân loại</p>
                    
                    {/* Dùng text thay cho Icon để test */}
                    <button 
                        onClick={() => setisOpenTypeSel(!isOpenTypeSel)}
                        className=""
                    >
                        {isOpenTypeSel ? <CiCircleChevUp /> : <CiCircleChevDown />}
                    </button>

                    <span className="text-gray-500"><IoSearch /></span>
                    <input type="search" className="border-b border-black" placeholder="Tìm kiếm theo tên..." />
                </div>
                <button className="bg-gray-700 text-white px-5 py-2 rounded-lg text-2xl"
                         onClick={() => {
                    setIsOpenPopUp(true);
                }}>
                    Thử AR Try-on
                </button>
                <div className="flex flex-row gap-2 items-center">
                    <div>Bộ lọc</div>
                    <button onClick={() => {
                        setIsOpenFilter(!isOpenFilter);
                    }}>{isOpenFilter ? <CiCircleChevUp /> : <CiCircleChevDown />}</button>
                </div>
                
            </div>

            {/* Modal dropdown */}
            {isOpenTypeSel && (
                <div className="absolute top-12 left-0 w-64 bg-white shadow-xl border border-gray-300 z-50">
                    {options.map((opt, i) => (
                        <div key={i} className="p-2 hover:bg-gray-200 border-b cursor-pointer text-black">
                            {opt}
                        </div>
                    ))}
                </div>
            )}

            {isOpenFilter && (
                <div className="absolute top-12 left-250 w-64 bg-white shadow-xl border border-gray-300 z-50">
                    {optionFilter.map((opt, i) => (
                        <div key={i} className="p-2 hover:bg-gray-200 border-b cursor-pointer text-black">
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
                {mockProducts.map((product, idx) => (
                    <ProductItem
                        key={idx}
                        source={product.imageSrc}
                        alterText={product.productName}
                        productName={product.productName}
                        price={product.price.toLocaleString("vi-VN") + " VNĐ"}
                    />
                ))}
            </div>
        </div>
        <VideoPopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp}/>
        <Footer />
    </div>)
}