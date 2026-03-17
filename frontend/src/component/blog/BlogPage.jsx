import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

const resolveUploadsUrl = (base, url) => {
  if (!url) return url;
  const s = String(url).trim();
  if (!s) return s;
  if (s.startsWith("/uploads/")) return `${base || ""}${s}`;
  return s;
};

const today = () => new Date().toISOString().slice(0, 10);
const isPublished = (publishDate) => publishDate && String(publishDate).slice(0, 10) <= today();

/** Chuẩn hóa item từ API thành format thẻ bài viết (slug không có prefix /blog/) */
function toCardItem(p, base) {
  const slug = p.slug && p.slug.startsWith("/blog/") ? p.slug.replace(/^\/blog\/?/, "") : (p.slug || "");
  const dateStr = p.publishDate ? new Date(p.publishDate).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" }) : "";
  return {
    id: p.id,
    slug: `/blog/${slug}`,
    title: p.title,
    date: dateStr,
    publishDate: p.publishDate ? String(p.publishDate).slice(0, 10) : "",
    createdAt: p.createdAt,
    image: resolveUploadsUrl(base, p.imageUrl || ""),
  };
}

export default function BlogPage() {
  const [apiPosts, setApiPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const base = getApiBaseUrl() || "";
    if (!base) {
      setLoaded(true);
      return;
    }
    fetch(`${base}/api/blog/posts`, { headers: getApiHeaders() })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setApiPosts(Array.isArray(data) ? data.map((p) => toCardItem(p, base)) : []);
      })
      .catch(() => setApiPosts([]))
      .finally(() => setLoaded(true));
  }, []);

  const toTime = (d) => {
    if (!d) return 0;
    const t = new Date(String(d)).getTime();
    return Number.isFinite(t) ? t : 0;
  };
  const posts = [...apiPosts].filter((p) => isPublished(p.publishDate));
  posts.sort((a, b) => {
    const byPublish = toTime(b.publishDate) - toTime(a.publishDate);
    if (byPublish !== 0) return byPublish;
    return toTime(b.createdAt) - toTime(a.createdAt);
  });
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
            {posts.length === 0 && (
              <p className="text-[#5C4A3D] col-span-full py-8">Chưa có bài nào. Đăng bài từ trang Admin → Đăng bài blog.</p>
            )}
            {posts.map((post) => (
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
