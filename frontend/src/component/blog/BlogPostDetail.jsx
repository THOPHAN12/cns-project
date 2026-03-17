import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { trackBlogClick, getApiBaseUrl, getApiHeaders } from "../../utils/api";

const resolveUploadsHtml = (base, html) => {
  if (!html) return html;
  const b = base || "";
  return String(html).replaceAll('src="/uploads/', `src="${b}/uploads/`);
};

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [apiPost, setApiPost] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    if (slug) trackBlogClick(slug);
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setApiLoaded(true);
      return;
    }
    const base = getApiBaseUrl() || "";
    if (!base) {
      setApiLoaded(true);
      return;
    }
    fetch(`${base}/api/blog/posts/${encodeURIComponent(slug)}`, { headers: getApiHeaders() })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setApiPost(data || null);
      })
      .catch(() => setApiPost(null))
      .finally(() => setApiLoaded(true));
  }, [slug]);

  if (!apiLoaded) {
    return (
      <div>
        <Navbar />
        <div className="w-full min-h-screen bg-[#f5f3f0] pt-24 md:pt-28 flex items-center justify-center">
          <p className="text-[#5C4A3D]">Đang tải bài viết...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!apiPost) return <Navigate to="/blog" replace />;

  const title = apiPost.title ?? "";
  const dateStr = apiPost.publishDate
    ? new Date(apiPost.publishDate).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const base = getApiBaseUrl() || "";
  const excerpt = apiPost.excerpt ? String(apiPost.excerpt).trim() : "";
  const bodyContent = apiPost.bodyHtml != null ? (
    <div
      className="prose prose-[#5C4A3D] max-w-none text-[#5C4A3D] leading-relaxed space-y-6 prose-img:mx-auto prose-img:block"
      dangerouslySetInnerHTML={{ __html: resolveUploadsHtml(base, apiPost.bodyHtml) }}
    />
  ) : null;

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen font-sans bg-[#f5f3f0] text-[#3e3226] pt-24 md:pt-28">
        <article className="container mx-auto px-6 md:px-12 py-10 md:py-14 max-w-3xl">
          <Link to="/blog" className="text-[#A59588] hover:text-[#5C4A3D] text-sm mb-6 inline-block">← Quay lại Blog</Link>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#3e3226] mb-2">{title}</h1>
          <p className="text-[#A59588] text-sm mb-6">{dateStr}</p>
          {excerpt ? (
            <p className="text-lg text-[#5C4A3D]/90 italic border-l-4 border-[#A59588] pl-6 py-2 -mt-2 mb-6">
              {excerpt}
            </p>
          ) : null}
          {bodyContent}
        </article>
      </div>
      <Footer />
    </div>
  );
}
