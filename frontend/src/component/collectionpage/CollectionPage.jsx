import Navbar from "../Navbar";
import collectionImage from "../../assets/8.png"
import title from "../../assets/collection/chũ.png"

export default function CollectionPage() {
    return (
        <div>
            <Navbar />
            <div className="bg-[#babcbc] flex flex-row justify-center items-center">
                <div className="text-white text-center py-5 w-1/2 px-12">
                    <p className="text-xl font-light font-stretch-extra-expanded">Một giai đoạn mới của phong cách</p>
                    <img src={title} alt="TỐI GIẢN" className="relative left-25" />
                    <p>The Clean Era Collection đánh dấu cách CNS quay về những giá trị cốt lõi: form dáng vừa vặn, chất liệu dễ chịu và thiết kế đủ tinh tế để tôn lên đường nét tự nhiên. Mỗi món đồ được tạo ra để đồng hành cùng bạn trong mọi nhịp sống - từ công việc, vận động đến những khoảng nghỉ riêng tư - theo cách giản lược nhưng có chủ đích.</p>
                </div>
                <div className="w-1/2">
                    <img src={collectionImage} alt="Collection image" className=" overflow-hidden" />
                </div>
            </div>
        </div>
    )
}