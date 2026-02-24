import ProductItem from "./ProductItem";

const ProductList = ({ products, fetchError, selectedIds = [], onSelectToggle, onAddSelectedToCart }) => {
    if (fetchError) {
        return (
            <div className="flex-1 flex justify-center items-center py-20 px-6">
                <div className="text-center max-w-md">
                    <p className="text-red-500 font-medium mb-2">Lỗi tải sản phẩm</p>
                    <p className="text-gray-600 text-sm">{fetchError}</p>
                </div>
            </div>
        );
    }
    if (!products || products.length === 0) {
        return (
            <div className="flex-1 flex justify-center items-center py-20 px-6">
                <p className="text-gray-500">Chưa có sản phẩm nào. Hãy thêm sản phẩm vào database hoặc thử bỏ bộ lọc.</p>
            </div>
        );
    }

    const selectedCount = selectedIds.length;

    return (
        <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product, idx) => (
                    <ProductItem
                        key={product.id || idx}
                        id={product.id}
                        source={product.imageSrc}
                        alterText={product.productName}
                        productName={product.productName}
                        price={(product.price ?? 0).toLocaleString("vi-VN") + " VNĐ"}
                        isSelected={selectedIds.includes(product.id)}
                        onSelectChange={(id) => onSelectToggle?.(id, product)}
                    />
                ))}
            </div>

            {/* Nút thêm đã chọn vào giỏ - hiện khi có sản phẩm được chọn */}
            {selectedCount > 0 && onAddSelectedToCart && (
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <p className="text-gray-600 text-sm">Đã chọn <span className="font-semibold text-[#3a2415]">{selectedCount}</span> sản phẩm</p>
                    <button
                        onClick={onAddSelectedToCart}
                        className="px-6 py-3 bg-[#3a2415] text-white font-semibold rounded-lg hover:bg-[#5a3a1a] transition shadow-md"
                    >
                        Thêm {selectedCount} sản phẩm vào giỏ hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;