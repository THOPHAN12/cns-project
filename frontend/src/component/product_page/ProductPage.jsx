import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import VideoPopUp from "../VideoPopUp";
import { CiCircleChevDown } from "react-icons/ci";

// Import các component con vừa tách
import CategorySidebar from "./CategorySidebar"; 
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";

export default function ProductPage() {
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State quản lý đóng mở sidebar
    const [isOpenTypeSel, setisOpenTypeSel] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);

    // Dữ liệu tĩnh cho sidebar
    const categoryOptions = ["Nữ", "Nam", "Trang phục màu sáng", "Trang phục màu tối"];
    const filterOptions = ["Giá từ thấp tới cao", "Giá từ cao tới thấp", "Độ bán chạy"];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products');
                if (!response.ok) throw new Error('Không thể kết nối tới server');
                
                const data = await response.json();
                
                // Logic xử lý ảnh giữ nguyên như cũ
                setProductData(data.map(e => ({
                    id: e.id,
                    imageSrc: `data:image/jpeg;base64,${e.imageData}`,
                    productName: e.productName,
                    price: e.price
                })));
            } catch (error) {
                console.log("Error fetching data ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="h-screen flex items-center justify-center">
                    <p className="text-4xl font-bold">Loading ...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div id="product-page">
            <Navbar />
            
            <div id="product-page-body" className="px-10 py-30 text-2xl">
                
                {/* --- HEADER CONTROL (Nút bấm mở Sidebar) --- */}
                <div className="flex flex-row justify-between mb-5 select-none">
                    {/* Nút mở Phân Loại */}
                    <div className="flex flex-row gap-15 items-center justify-center px-10 cursor-pointer" 
                         onClick={() => setisOpenTypeSel(!isOpenTypeSel)}>
                        <p className="text-lg text-center font-semibold">PHÂN LOẠI</p>
                        <CiCircleChevDown className={`transform transition-transform duration-300 text-3xl ${isOpenTypeSel ? "rotate-180" : ""}`} />
                    </div>

                    {/* Nút mở Bộ Lọc */}
                    <div className="flex flex-row gap-3 items-center cursor-pointer" 
                         onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        <p className="text-lg font-semibold">BỘ LỌC</p>
                        <CiCircleChevDown className={`transform transition-transform duration-300 text-3xl ${isOpenFilter ? "rotate-180" : ""}`} />
                    </div>
                </div>

                {/* --- MAIN CONTENT LAYOUT --- */}
                <div className="flex flex-row w-full text-lg items-start">
                    
                    {/* 1. Sidebar Trái (Category) - Đã xử lý logic check/uncheck bên trong component này */}
                    <CategorySidebar 
                        isOpen={isOpenTypeSel} 
                        options={categoryOptions} 
                    />

                    {/* 2. Danh sách sản phẩm */}
                    <ProductList products={productData} />

                    {/* 3. Sidebar Phải (Filter) */}
                    <FilterSidebar 
                        isOpen={isOpenFilter} 
                        options={filterOptions} 
                    />

                </div>
            </div>

            <VideoPopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />
            <Footer />
        </div>
    );
}