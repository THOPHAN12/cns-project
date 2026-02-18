import { useState } from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

const FilterSidebar = ({ isOpen, options }) => {
    // State lưu trữ các bộ lọc đang được chọn
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleToggle = (option) => {
        if (selectedFilters.includes(option)) {
            // Nếu đã chọn -> Bỏ chọn
            setSelectedFilters(selectedFilters.filter((item) => item !== option));
        } else {
            // Nếu chưa chọn -> Thêm vào
            setSelectedFilters([...selectedFilters, option]);
        }
    };

    return (
        <div
            className={`
                shrink-0 transition-all duration-500 ease-in-out overflow-hidden
                ${isOpen ? "w-75 opacity-100 ml-5" : "w-0 opacity-0 ml-0"}
            `}
        >
            <div className="w-75">
                {options.map((option, idx) => {
                    const isSelected = selectedFilters.includes(option);
                    
                    return (
                        <div
                            key={idx}
                            onClick={() => handleToggle(option)}
                            className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center cursor-pointer select-none hover:bg-gray-50"
                        >
                            {/* Đổi màu chữ nếu được chọn để nổi bật hơn */}
                            <span className={isSelected ? "font-bold text-black" : "text-gray-700"}>
                                {option}
                            </span>

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

export default FilterSidebar;