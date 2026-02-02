import Navbar from "../Navbar";
import { IoSearch } from "react-icons/io5";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import ProductItem from "./ProductItem";
import { useState } from "react";
// Import all images from mock_products folder

import imgCampaign from "../../assets/mock_product/Campaign.jpg";
import imgClassicZipHoodie from "../../assets/mock_product/Classic Zip Hoodie.jpg";
import imgEssentialRibbed from "../../assets/mock_product/Essential Ribbed Tank Top – 3 Pack.jpg";
import img4965 from "../../assets/mock_product/IMG_4965.JPG";
import img4966 from "../../assets/mock_product/IMG_4966.JPG";
import img4967 from "../../assets/mock_product/IMG_4967.JPG";
import img4970 from "../../assets/mock_product/IMG_4970.jpg";
import img4974 from "../../assets/mock_product/IMG_4974.JPG";
import img4975 from "../../assets/mock_product/IMG_4975.JPG";
import imgTep003 from "../../assets/mock_product/Tệp_003.png";
import imgTep004 from "../../assets/mock_product/Tệp_004.png";
import imgTep006 from "../../assets/mock_product/Tệp_006.png";
import imgTep007 from "../../assets/mock_product/Tệp_007.png";
import imgTep008 from "../../assets/mock_product/Tệp_008.png";

import Button from "../Button";
import Footer from "../Footer";
import VideoPopUp from "../VideoPopUp";

export const mockProducts = [
    { id: 1, imageSrc: imgCampaign, productName: "Summer Campaign Collection", price: "0" }, // Dùng làm banner?
    { id: 2, imageSrc: imgClassicZipHoodie, productName: "Classic Zip Hoodie Grey", price: "850000" },
    { id: 3, imageSrc: imgEssentialRibbed, productName: "Essential Ribbed Tank Top (3 Pack)", price: "560000" },
    { id: 4, imageSrc: img4965, productName: "Sport Set - Butter Cream", price: "620000" },
    { id: 5, imageSrc: img4966, productName: "Sport Set - Pastel Pink", price: "620000" },
    { id: 6, imageSrc: img4967, productName: "Active Shorts - White", price: "350000" },
    { id: 7, imageSrc: img4970, productName: "Yoga Set - Midnight Black", price: "750000" },
    { id: 8, imageSrc: img4974, productName: "Gym Set - Espresso Brown", price: "750000" },
    { id: 9, imageSrc: img4975, productName: "Croptop - Chocolate", price: "320000" },
    { id: 10, imageSrc: imgTep003, productName: "Casual Shorts - Soft Pink", price: "290000" },
    { id: 11, imageSrc: imgTep004, productName: "Basic Leggings - Black", price: "450000" },
    { id: 12, imageSrc: imgTep006, productName: "Lounge Set - White", price: "550000" },
    { id: 13, imageSrc: imgTep007, productName: "Collection Group Shot", price: "0" }, 
    { id: 14, imageSrc: imgTep008, productName: "Camisole Top - Black", price: "250000" },
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
        <div id="product-page-body" className=" px-10 py-30 text-2xl">
            {/* <h1 className="text-5xl font-bold text-amber-900 text-center">Sản phẩm</h1> */}
            {/* <p className="text-center mt-2">Chất liệu và kiểu dáng độc quyền</p> */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-15 items-center justify-center px-10">
                    <p className="text-lg text-center">PHÂN LOẠI</p>
                    <div className="flex flex-row gap-3 items-center">
                        <IoSearch />
                        <input className="border-b-2" />
                    </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <p className="text-lg">FILTER</p>
                    <CiCircleChevDown />
                </div>
            </div>
            <div className="relative w-full p-4"> 
            </div>
            <div className="flex flex-row gap-5 text-lg">
                <div className="w-100">
                    {options.map((option) => (<div className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center">
                        {option}
                        <CiCircleChevDown />
                    </div>))}
                </div>
                <div className="grid grid-cols-3 gap-4">
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
        </div>
        <VideoPopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp}/>
        <Footer />
    </div>)
}