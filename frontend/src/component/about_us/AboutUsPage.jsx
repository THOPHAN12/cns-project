import Navbar from "../Navbar";
import image1 from "../../assets/about-us-img/image1.jpg";
import image2 from "../../assets/about-us-img/2.png";
import image4 from "../../assets/about-us-img/4.png";

export default function AboutUsPage() {
    return (
    <div>
        <Navbar />
    <div className="w-full font-sans text-white bg-[#A59588]">
      {/* 1. HERO SECTION */}
      <section className="w-full h-[40vh] md:h-[500px]">
        {/* Placeholder cho ảnh bìa (Business Cards) */}
        <div className="w-full h-full bg-gray-800 relative overflow-hidden">
          <img 
            src={image1} 
            alt="CNS Hero Background" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </section>

      {/* 2. CÂU CHUYỆN THƯƠNG HIỆU SECTION */}
      <section className="flex flex-col md:flex-row w-full">
        {/* Cột nội dung (Trái) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8 text-white">
            Câu chuyện thương hiệu
          </h2>
          
          <div className="bg-[#5C4A3D] p-6 md:p-10 text-sm md:text-base leading-relaxed text-gray-200 shadow-xl">
            <p className="mb-4">
              Được ấp ủ từ cuối năm 2025 từ những cô nàng và chàng trai yêu thích vẻ đẹp "aesthetic" theo đuổi cuộc sống <strong className="text-white">đơn giản nhưng không đơn điệu</strong>, Cleannie Studio (CNS) ra đời với khát vọng xây dựng một đế chế <strong className="text-white">của sự tối giản - thanh lịch - hiện đại.</strong>
            </p>
            <p className="mb-4">
              CNS là kết quả của một nhận thức giản dị: <strong className="text-white">Bạn không cần phải phô trương để trở nên nổi bật.</strong> Trong một thế giới đầy ắp phụ kiện lấp lánh, son phấn dày cộm và những outfit cầu kỳ, <strong className="text-white">chúng tôi chọn tin vào sức mạnh của sự tối giản.</strong>
            </p>
            <p className="mb-4">
              Chính vì niềm tin đó, mỗi thiết kế của CNS đều được nghiên cứu kỹ lưỡng về form dáng, chất liệu và độ ứng dụng, giúp người mặc dễ dàng chuyển đổi giữa tập luyện, di chuyển và sinh hoạt thường nhật mà vẫn giữ trọn tinh thần clean, tinh tế.
            </p>
            <p className="mb-4">
              CNS muốn chứng minh rằng vẻ đẹp thực sự nằm ở sự tinh gọn: <strong className="text-white">Ít hơn nhưng chất lượng hơn, thoải mái hơn, và chân thực hơn.</strong> Không còn phải thay đổi trang phục giữa ngày, không còn lo lắng về việc phối đồ sao cho thu hút sự chú ý, <strong className="text-white">bạn chỉ cần mặc và tự tin bước đi.</strong>
            </p>
            <p>
              Lấy cảm hứng từ nhịp sống hiện đại và vẻ đẹp tối giản vượt thời gian, CNS chọn bảng màu trung tính, những đường nét thanh thoát và cảm giác chạm mềm mại – những yếu tố <strong className="text-white">tạo nên một tủ đồ linh hoạt, bền vững và mang dấu ấn cá nhân.</strong>
            </p>
          </div>
        </div>

        {/* Cột hình ảnh (Phải) */}
        <div className="w-full md:w-1/2 min-h-[400px]">
          <img 
            src={image2}
            alt="Woman with cap" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. PHÁT TRIỂN BỀN VỮNG SECTION */}
      <section className="flex flex-col-reverse md:flex-row w-full">
        {/* Cột hình ảnh (Trái) */}
        <div className="w-full md:w-1/2 min-h-[400px]">
          <img 
            src={image4}
            alt="Man in beige shirt" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cột nội dung (Phải) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8 text-white md:pl-0">
            Phát triển bền vững
          </h2>
          
          <div className="bg-[#5C4A3D] p-6 md:p-10 text-sm md:text-base leading-relaxed text-gray-200 shadow-xl">
            <p className="mb-4">
              Tại CNS, <strong className="text-white">chúng tôi tin rằng phong cách "clean" không chỉ nằm ở thiết kế tối giản, mà còn ở cách sản phẩm được tạo ra và tác động của nó đến môi trường và cộng đồng xung quanh.</strong> Khi lựa chọn một món đồ, hy vọng rằng bạn không chỉ tìm kiếm vẻ ngoài chỉn chu, mà còn mong muốn cảm giác an tâm - rằng lựa chọn của mình là đúng đắn và có trách nhiệm.
            </p>
            <p className="mb-4">
              Vì vậy, <strong className="text-white">CNS theo đuổi con đường phát triển bền vững một cách nghiêm túc và thực tế.</strong> Không phô trương, không làm hình ảnh, mà tập trung tạo ra những sản phẩm mang giá trị sử dụng lâu dài cho người mặc. Chúng tôi bắt đầu từ những nền tảng cơ bản nhất: <strong className="text-white">lựa chọn chất liệu thân thiện với môi trường, cotton an toàn cho da, hạn chế tối đa hóa chất độc hại trong quá trình xử lý.</strong> Điều này không chỉ mang lại cảm giác thoải mái khi mặc, mà còn góp phần giảm tác động tiêu cực đến môi trường.
            </p>
            <p className="mb-4">
              Về trách nhiệm xã hội, <strong className="text-white">CNS không dừng lại ở cam kết. Chúng tôi triển khai các chương trình thu nhận trang phục cũ để tái chế và tái sử dụng, đi kèm những ưu đãi thiết thực dành cho khách hàng.</strong> Những hoạt động này góp phần giảm lượng rác thải dệt may và tạo thêm cơ hội việc làm cho các cộng đồng sản xuất nhỏ trong nước. Chúng tôi học hỏi từ các mô hình phát triển bền vững phù hợp với bối cảnh Việt Nam và áp dụng một cách chọn lọc, để giá trị "xanh" không chỉ nằm trên khẩu hiệu, mà hiện diện trong từng bước vận hành.
            </p>
            <p>
              Khi bạn lựa chọn CNS, đó không chỉ là sự gọn gàng về hình thức, mà còn là cảm giác nhẹ nhõm từ bên trong - biết rằng bạn đang theo đuổi một phong cách sống tối giản, có trách nhiệm và bền vững hơn mỗi ngày.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
    );
}