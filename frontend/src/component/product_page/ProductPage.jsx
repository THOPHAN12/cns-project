import Navbar from "../Navbar";
import { IoSearch } from "react-icons/io5";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";

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
import imgTep009 from "../../assets/mock_product/Tệp_009.jpg";

import Button from "../Button";
import Footer from "../Footer";
import VideoPopUp from "../VideoPopUp";

// export const mockProducts = [
//     { id: 4, imageSrc: img4965, productName: "Sport Set - Butter Cream", price: "620000" },
//     { id: 5, imageSrc: img4966, productName: "Sport Set - Pastel Pink", price: "620000" },
//     { id: 6, imageSrc: img4967, productName: "Active Shorts - White", price: "350000" },
//     { id: 7, imageSrc: img4970, productName: "Yoga Set - Midnight Black", price: "750000" },
//     { id: 8, imageSrc: img4974, productName: "Gym Set - Espresso Brown", price: "750000" },
//     { id: 9, imageSrc: img4975, productName: "Croptop - Chocolate", price: "320000" },
//     { id: 10, imageSrc: imgTep003, productName: "Casual Shorts - Soft Pink", price: "290000" },
//     { id: 11, imageSrc: imgTep004, productName: "Basic Leggings - Black", price: "450000" },
//     { id: 12, imageSrc: imgTep006, productName: "Lounge Set - White", price: "550000" },
//     { id: 13, imageSrc: imgTep007, productName: "Collection Group Shot", price: "1200000" }, 
//     { id: 14, imageSrc: imgTep008, productName: "Camisole Top - Black", price: "250000" },
//     { id: 15, imageSrc: imgTep009, productName: "Brown Active Set", price: "1000000" },
// ];

export default function ProductPage() {
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isOpenTypeSel, setisOpenTypeSel] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);

    let products = [];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products');
        
                if (!response.ok) {
                    throw new Error('Không thể kết nối tới server');
                }
                
                const data = await response.json();
                setProductData(data.map(e => {
                    console.log(typeof(e.imageData))
                    return {
                        id: e.id,
                        imageSrc: `data:image/jpeg;base64,${e.imageData}`,
                        // imageSrc: URL.createObjectURL(new Blob(e.imageData, {type: "application/zip"})),
                        productName: e.productName,
                        price: e.price
                    }
                }));
            } catch (error) {
                console.log("Error fetching data ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [])

    
    
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

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="p-50 text-center">
                    <p className="text-4xl font-bold">Loading ...</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div id="product-page">
            <Navbar />
            <div id="product-page-body" className="px-10 py-30 text-2xl">
                
                {/* Header Section */}
                <div className="flex flex-row justify-between mb-5">
                    <div className="flex flex-row gap-15 items-center justify-center px-10">
                        <p className="text-lg text-center">PHÂN LOẠI</p>
                        <button onClick={() => setisOpenTypeSel(!isOpenTypeSel)}>
                            <CiCircleChevDown className={`transform transition-transform duration-300 ${isOpenTypeSel ? "rotate-180" : ""}`} />
                        </button>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <p className="text-lg">BỘ LỌC</p>
                        <button onClick={() => setIsOpenFilter(!isOpenFilter)}>
                            <CiCircleChevDown className={`transform transition-transform duration-300 ${isOpenFilter ? "rotate-180" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Main Content with Sliding Sidebars */}
                <div className="flex flex-row w-full text-lg items-start">
                    
                    {/* LEFT SIDEBAR */}
                    <div className={`
                        flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden
                        ${isOpenTypeSel ? "w-75 opacity-100 mr-5" : "w-0 opacity-0 mr-0"}
                    `}>
                        <div className="w-75"> {/* Wrapper to hold fixed width content */}
                            {options.map((option, idx) => (
                                <div key={idx} className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center">
                                    {option}
                                    <CiCircleChevDown />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE PRODUCT GRID (Flex-1 ensures it fills space, Justify-Center centers the grid) */}
                    <div className="flex-1 flex justify-center">
                        <div className="grid grid-cols-3 gap-4">
                            {productData.map((product, idx) => (
                                <ProductItem
                                    key={idx}
                                    id={product.id}
                                    source={product.imageSrc}
                                    alterText={product.productName}
                                    productName={product.productName}
                                    price={product.price.toLocaleString("vi-VN") + " VNĐ"}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className={`
                        flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden
                        ${isOpenFilter ? "w-75 opacity-100 ml-5" : "w-0 opacity-0 ml-0"}
                    `}>
                        <div className="w-75">
                            {optionFilter.map((option, idx) => (
                                <div key={idx} className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center">
                                    {option}
                                    <CiCircleChevDown />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <VideoPopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp}/>
            <Footer />
        </div>
    )
}