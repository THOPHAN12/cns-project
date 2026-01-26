import Navbar from "../Navbar";
import { IoSearch } from "react-icons/io5";
import { CiCircleChevDown } from "react-icons/ci";
import ProductItem from "./ProductItem";
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
    { imageSrc: img_3_1, productName: "T-shirt", price: 500000 },
    { imageSrc: img_4_2, productName: "Sweatshirt", price: 520000 },
    { imageSrc: img_3_3, productName: "Hoodie", price: 540000 },
    { imageSrc: img_22_3, productName: "Jacket", price: 560000 },
    { imageSrc: img_21_2, productName: "Shorts", price: 480000 },
    { imageSrc: img_20_3, productName: "Pants", price: 530000 },
    { imageSrc: img_20_2, productName: "Leggings", price: 510000 },
    { imageSrc: img_20_1, productName: "Tank Top", price: 470000 },
    { imageSrc: img_4_3, productName: "Crop Top", price: 495000 },
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
    return (<div id="product-page">
        <Navbar />
        <div id="product-page-body" className="bg-[#f3eae5] px-30 py-10 text-2xl">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <p className="font-semibold">PHÂN LOẠI</p>
                    <IoSearch />
                    <input type="search" className="border-b-2"></input>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <p>Filter</p>
                    <CiCircleChevDown />
                </div>
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
    </div>)
}