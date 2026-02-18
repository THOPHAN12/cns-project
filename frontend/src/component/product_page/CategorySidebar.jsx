import { useState } from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

const CategorySidebar = ({ isOpen, options }) => {
    // State lưu danh sách các mục đã chọn
    const [selectedItems, setSelectedItems] = useState([]);

    const handleToggle = (item) => {
        if (selectedItems.includes(item)) {
            // Nếu đã có -> Xóa khỏi mảng (Uncheck)
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            // Nếu chưa có -> Thêm vào mảng (Check)
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <div
            className={`shrink-0 transition-all duration-500 ease-in-out overflow-hidden 
            ${isOpen ? "w-75 opacity-100 mr-5" : "w-0 opacity-0 mr-0"}`}
        >
            <div className="w-75">
                {options.map((option, idx) => {
                    const isSelected = selectedItems.includes(option);
                    return (
                        <div
                            key={idx}
                            // Thêm cursor-pointer và sự kiện click vào cả dòng để dễ bấm
                            className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center cursor-pointer select-none"
                            onClick={() => handleToggle(option)}
                        >
                            <span className={isSelected ? "font-bold text-black" : "text-gray-700"}>
                                {option}
                            </span>
                            
                            {/* Hiển thị icon dựa trên trạng thái */}
                            <div className="text-2xl">
                                {isSelected ? (
                                    <MdCheckCircle className="text-black" /> 
                                ) : (
                                    <MdCheckCircleOutline className="text-gray-500" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySidebar;