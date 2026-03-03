import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";

/**
 * Dữ liệu mẫu cho blog. Sau này có thể thay bằng API hoặc CMS.
 * Mỗi item: image (url ảnh), title, date, slug (đường dẫn bài viết).
 */
/**
 * Slug = blog/YYYY-MM-DD-chu-de-bai-viet (ghép ngày với chủ đề từ tiêu đề)
 */
const BLOG_PLACEHOLDER = [
  { id: 1, slug: "/blog/clean-girl-la-gi-huong-dan-xay-dung-phong-cach-clean-girl-tu-a-z-68cbd811fe6ca949df9db5b", title: "Clean Girl là gì? Hướng dẫn xây dựng phong cách clean girl từ A–Z", date: "25 tháng 2 2026", image: "/blog/2026/02/25/cover.png" },
  { id: 2, slug: "/blog/6-tips-giat-giu-chuan-chinh-cach-cham-soc-quan-ao-giup-do-luon-ben-dep-nhu-moi-53c14049d463b06370f31b", title: "6 Tips Giặt Giũ Chuẩn Chỉnh: Cách chăm sóc quần áo giúp đồ luôn bền đẹp như mới", date: "26 tháng 2 2026", image: "/blog/2026/02/26/cover.png" },
  { id: 3, slug: "/blog/cach-phoi-do-clean-girl-giup-ton-dang-va-trong-cao-hon-bi-quyet-xay-dung-outfit-toi-gian-nhung-van-sang-trong-811931f030384980689708", title: "Cách phối đồ clean girl giúp tôn dáng và trông cao hơn: Bí quyết xây dựng outfit tối giản nhưng vẫn sang trọng", date: "27 tháng 3 2026", image: "/blog/2026/02/27/cover.png" },
  { id: 4, slug: "/blog/5-item-khong-the-thieu-de-xay-dung-tu-do-clean-girl-hoan-hao-nen-tang-cua-phong-cach-toi-gian-tinh-te-va-sang-trong-5102b435290562806028a4", title: "5 item không thể thiếu để xây dựng tủ đồ clean girl hoàn hảo: Nền tảng của phong cách tối giản, tinh tế và sang trọng", date: "28 tháng 3 2026", image: "/blog/2026/02/28/cover.png" },
  { id: 5, slug: "/blog/vi-sao-phong-cach-clean-girl-dang-tro-thanh-xu-huong-thoi-trang-2026-635e9772f163b06370f31b", title: "Vì sao phong cách clean girl đang trở thành xu hướng thời trang 2026?", date: "2 tháng 3 2026", image: "/blog/2026/03/02/cover.png" },
  { id: 6, slug: "/blog/top-ao-clean-girl-giup-nang-thanh-lich-va-sang-trong-lua-chon-nen-tang-cho-tu-do-toi-gian-hien-dai-52618338210562806028a4", title: "Top áo clean girl giúp nàng thanh lịch và sang trọng: Lựa chọn nền tảng cho tủ đồ tối giản hiện đại", date: "4 tháng 3 2026", image: "/blog/2026/03/04/cover.png" },
  { id: 7, slug: "/blog/vay-clean-girl-lua-chon-hoan-hao-cho-ve-dep-nu-tinh-toi-gian-va-sang-trong-52618338210562806028a4", title: "Váy clean girl – Lựa chọn hoàn hảo cho vẻ đẹp nữ tính tối giản và sang trọng", date: "6 tháng 3 2026", image: "/blog/2026/03/06/cover.png" },
  { id: 8, slug: "/blog/cach-xay-dung-phong-cach-toi-gian-nu-nhung-van-sang-trong-tu-duy-nen-tang-cua-thoi-trang-hien-dai-52618338210562806028a4", title: "Cách xây dựng phong cách tối giản nữ nhưng vẫn sang trọng: Tư duy nền tảng của thời trang hiện đại", date: "8 tháng 3 2026", image: "/blog/2026/03/08/cover.png" },
];

export default function BlogPage() {
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen font-sans bg-[#f5f3f0] text-[#3e3226] pt-24 md:pt-28">
        {/* Hero / Banner */}
        <section className="w-full bg-[#A59588] text-white px-6 md:px-12 py-3 md:py-4">
          <p className="text-base md:text-lg opacity-95 text-center max-w-3xl mx-auto">
            Khám phá những cập nhật mới nhất về sản phẩm, phong cách và câu chuyện từ cộng đồng CNS.
          </p>
        </section>

        {/* Tiêu đề section bài viết */}
        <section className="container mx-auto px-6 md:px-12 py-10 md:py-14 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-light text-[#3e3226] mb-2">
            Blog CNS
          </h1>
          <p className="text-[#5C4A3D] text-lg opacity-90">
            Chia sẻ và học hỏi kinh nghiệm từ cộng đồng
          </p>

          {/* Grid thẻ bài viết */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10">
            {BLOG_PLACEHOLDER.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={post.slug} className="block group">
                  {/* Khung ảnh – thay bằng ảnh thật qua post.image */}
                  <div className="aspect-[4/3] bg-[#e8e4df] flex items-center justify-center overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt=""
                        className="blog-img-sharp w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-[#A59588] text-sm font-medium px-4 text-center">
                        Ảnh bài viết – thêm URL vào dữ liệu
                      </span>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-[#3e3226] line-clamp-3 group-hover:text-[#5C4A3D] transition-colors">
                      {post.title}
                    </h2>
                    <time className="block mt-3 text-sm text-[#A59588]" dateTime={post.date}>
                      {post.date}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
