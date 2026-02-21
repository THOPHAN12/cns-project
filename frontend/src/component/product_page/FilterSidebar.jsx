import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

// Props thay đổi: nhận vào selectedFilter (string) và onToggle (function)
const FilterSidebar = ({ isOpen, options, selectedFilter, onToggle }) => {

    return (
        <div
            className={`
                flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden
                ${isOpen ? "w-75 opacity-100 ml-5" : "w-0 opacity-0 ml-0"}
            `}
        >
            <div className="w-75">
                {options.map((option, idx) => {
                    // Kiểm tra xem option này có phải là cái đang chọn không
                    const isSelected = selectedFilter === option;

                    return (
                        <div
                            key={idx}
                            onClick={() => onToggle(option)}
                            className="flex flex-row border-b-2 border-gray-400 py-5 justify-between items-center cursor-pointer select-none hover:bg-gray-50"
                        >
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