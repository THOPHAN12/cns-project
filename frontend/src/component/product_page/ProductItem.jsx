import { useState } from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER_IMG = "https://via.placeholder.com/300x400?text=Sản+phẩm";

export default function ProductItem({ id, source, alterText, productName, price, isSelected, onSelectChange }) {
    const [imgError, setImgError] = useState(false);
    const [showLightbox, setShowLightbox] = useState(false);
    const src = source && !imgError ? (source.startsWith("http") ? source : encodeURI(source)) : PLACEHOLDER_IMG;

    const content = (
        <>
            {/* Checkbox tích chọn - chỉ click checkbox mới chọn/bỏ chọn */}
            {onSelectChange != null && (
                <div
                    className="absolute top-1.5 left-1.5 z-10 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelectChange?.(id);
                    }}
                >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/90 border border-gray-300 shadow-md hover:bg-white transition">
                        {isSelected ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3a2415]">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <span className="w-3 h-3 rounded border border-gray-400" />
                        )}
                    </div>
                </div>
            )}
            <div
                className="aspect-[3/4] bg-gray-100 overflow-hidden cursor-zoom-in"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowLightbox(true);
                }}
            >
                <img
                    src={src}
                    alt={alterText || productName || "Sản phẩm"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImgError(true)}
                />
            </div>

            {/* Lightbox ảnh phóng to */}
            {showLightbox && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setShowLightbox(false)}
                >
                    <button
                        onClick={() => setShowLightbox(false)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 transition"
                        aria-label="Đóng"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={src}
                        alt={alterText || productName || "Sản phẩm"}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <Link to={`/product-detail/${id}`} className="block p-2.5 hover:bg-gray-50/50 transition">
                <p className="font-semibold text-sm text-gray-800 line-clamp-2 mb-0.5">{productName}</p>
                <p className="text-[#5e4b43] text-sm font-medium">{price}</p>
                <span className="text-xs text-[#7c6f63] hover:underline mt-0.5 inline-block">Xem chi tiết</span>
            </Link>
        </>
    );

    return (
        <div
            className={`relative block group bg-white rounded-lg overflow-hidden border transition-all duration-300 ${
                isSelected ? "border-[#3a2415] ring-2 ring-[#3a2415]/30" : "border-gray-100 hover:shadow-lg hover:border-gray-200"
            }`}
        >
            {content}
        </div>
    );
}