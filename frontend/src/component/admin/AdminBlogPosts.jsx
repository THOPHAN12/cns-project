import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getApiBaseUrl, getApiHeaders } from "../../utils/api";

const resolveUploadsUrl = (base, url) => {
  if (!url) return url;
  const s = String(url).trim();
  if (!s) return s;
  if (s.startsWith("/uploads/")) return `${base || ""}${s}`;
  return s;
};

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("vi-VN");
};

export default function AdminBlogPosts() {
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preview, setPreview] = useState(false);
  const editorRef = useRef(null);
  const coverFileRef = useRef(null);
  const inlineFileRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    imageUrl: "",
    publishDate: new Date().toISOString().slice(0, 10),
    bodyHtml: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Ngăn xếp: bài tạo mới nhất ở trên.
  // Lưu ý: Hook phải được gọi ở mọi render (không đặt sau các `return` điều kiện).
  const sortedPosts = useMemo(() => {
    const arr = Array.isArray(posts) ? [...posts] : [];
    arr.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    return arr;
  }, [posts]);

  const fetchPosts = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/admin/blog/posts`, {
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } else {
        if (res.status === 401 || res.status === 403) {
          setError(
            `Không tải được danh sách bài (HTTP ${res.status}). ` +
              `Thường do token hết hạn hoặc backend production chưa cập nhật API mới. ` +
              `Hãy đăng nhập lại; nếu vẫn lỗi, chạy backend mới (local + ngrok) hoặc deploy backend mới lên host.`
          );
        } else {
          setError(`Không tải được danh sách bài (HTTP ${res.status}).`);
        }
      }
    } catch (e) {
      console.error(e);
      setError("Không kết nối được API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setShowAdvanced(false);
    setPreview(false);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      imageUrl: "",
      publishDate: new Date().toISOString().slice(0, 10),
      bodyHtml: "",
    });
    setOpenModal(true);
  };

  const openEdit = (p) => {
    setMode("edit");
    setEditingId(p.id);
    setShowAdvanced(false);
    setPreview(false);
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      excerpt: p.excerpt || "",
      imageUrl: p.imageUrl || "",
      publishDate: p.publishDate ? p.publishDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
      bodyHtml: p.bodyHtml || "",
    });
    setOpenModal(true);
  };

  useEffect(() => {
    if (!openModal) return;
    if (editorRef.current) {
      editorRef.current.innerHTML = form.bodyHtml || "";
    }
  }, [openModal, editingId]); // eslint-disable-line react-hooks/exhaustive-deps

  const readEditorHtml = () => {
    const el = editorRef.current;
    return el ? (el.innerHTML || "").trim() : (form.bodyHtml || "").trim();
  };

  const exec = (cmd, value = null) => {
    try {
      editorRef.current?.focus();
      document.execCommand(cmd, false, value);
      setForm((f) => ({ ...f, bodyHtml: readEditorHtml() }));
    } catch (e) {
      console.error(e);
    }
  };

  const insertLink = () => {
    const url = window.prompt("Nhập link (https://...)", "https://");
    if (!url) return;
    exec("createLink", url);
  };

  const insertImage = () => {
    const url = window.prompt("Nhập URL ảnh (https://... hoặc /blog/...)", "");
    if (!url) return;
    exec("insertImage", url);
  };

  const uploadImage = async ({ file, publishDate, slug }) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      return null;
    }
    const base = getApiBaseUrl() || "";
    const fd = new FormData();
    fd.append("file", file);
    if (publishDate) fd.append("publishDate", publishDate);
    if (slug) fd.append("slug", slug);
    // Fallback: some tunnels strip Authorization on multipart uploads.
    // Send token inside form-data so backend can verify ADMIN.
    fd.append("token", token);
    setUploading(true);
    try {
      const res = await fetch(`${base}/api/admin/blog/upload-image`, {
        method: "POST",
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}`, "X-Authorization": `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) {
        setError(`Upload ảnh thất bại (HTTP ${res.status}).`);
        return null;
      }
      const data = await res.json();
      return resolveUploadsUrl(base, data?.url) || null;
    } catch (e) {
      console.error(e);
      setError("Không upload được ảnh. Kiểm tra backend/ngrok.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onPickCover = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const url = await uploadImage({ file, publishDate: form.publishDate, slug: form.slug });
    if (url) setForm((f) => ({ ...f, imageUrl: url }));
    e.target.value = "";
  };

  const onPickInline = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const url = await uploadImage({ file, publishDate: form.publishDate, slug: form.slug });
    if (url) {
      exec("insertImage", url);
    }
    e.target.value = "";
  };

  const savePost = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    if (!form.title || !form.title.trim()) {
      setError("Vui lòng nhập tiêu đề.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const base = getApiBaseUrl() || "";
      const bodyHtml = readEditorHtml();
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || undefined,
        excerpt: form.excerpt.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        publishDate: form.publishDate || new Date().toISOString().slice(0, 10),
        bodyHtml: bodyHtml || undefined,
      };
      const url =
        mode === "create"
          ? `${base}/api/admin/blog/posts`
          : `${base}/api/admin/blog/posts/${editingId}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: {
          ...getApiHeaders(),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError(`Lỗi ${res.status} khi lưu bài.`);
        return;
      }
      setOpenModal(false);
      await fetchPosts();
    } catch (e) {
      console.error(e);
      setError("Không lưu được bài. Kiểm tra backend.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id) => {
    const token = Cookies.get("token");
    if (!token) return;
    if (!window.confirm("Xóa bài viết này?")) return;
    try {
      const base = getApiBaseUrl() || "";
      const res = await fetch(`${base}/api/admin/blog/posts/${id}`, {
        method: "DELETE",
        headers: { ...getApiHeaders(), Authorization: `Bearer ${token}` },
      });
      if (res.ok || res.status === 204) await fetchPosts();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <p className="text-[#5C4A3D]">Đang tải bài blog...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-[#3e3226]">Đăng bài blog</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 text-sm bg-[#5C4A3D] text-white rounded-lg hover:bg-[#3e3226]"
          >
            + Thêm bài
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded-lg">
          <p>{error}</p>
          {(String(error).includes("401") || String(error).includes("403") || String(error).includes("đăng nhập")) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => nav("/login", { replace: true, state: { from: "/admin" } })}
                className="px-3 py-2 text-xs bg-[#463325] text-white rounded-lg hover:bg-[#3e3226]"
              >
                Đăng nhập lại
              </button>
              <button
                type="button"
                onClick={() => fetchPosts()}
                className="px-3 py-2 text-xs border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0]"
              >
                Thử lại
              </button>
            </div>
          )}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-[#A59588]">Chưa có bài nào. Bấm &quot;Thêm bài&quot; để đăng bài mới.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e4df] text-left text-[#5C4A3D]">
                <th className="py-3 pr-4">Tiêu đề</th>
                <th className="py-3 pr-4">Slug</th>
                <th className="py-3 pr-4">Ngày đăng</th>
                <th className="py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((p) => (
                <tr key={p.id} className="border-b border-[#e8e4df]">
                  <td className="py-3 pr-4 font-medium text-[#3e3226] line-clamp-2">{p.title}</td>
                  <td className="py-3 pr-4 text-[#A59588] font-mono text-xs">{p.slug || "—"}</td>
                  <td className="py-3 pr-4">{formatDate(p.publishDate)}</td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="text-[#5C4A3D] hover:text-[#3e3226] mr-3"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePost(p.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center px-4 py-8 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#3e3226]">
                {mode === "create" ? "Thêm bài blog" : "Sửa bài blog"}
              </h3>
              <button type="button" onClick={() => setOpenModal(false)} className="text-[#A59588] hover:text-[#3e3226]">
                Đóng
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-[#5C4A3D]">
                Tiêu đề *
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="Tiêu đề bài viết"
                />
              </label>
              <label className="block text-sm text-[#5C4A3D]">
                Mô tả ngắn (excerpt)
                <input
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="Tóm tắt hiển thị trên thẻ"
                />
              </label>
              <label className="block text-sm text-[#5C4A3D]">
                Ảnh đại diện (URL)
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                  placeholder="/uploads/blog/2026/03/11/xxx.png"
                />
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={coverFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickCover}
                />
                <button
                  type="button"
                  onClick={() => coverFileRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-2 text-xs bg-white border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#faf9f7] disabled:opacity-60"
                >
                  {uploading ? "Đang upload..." : "Chọn ảnh từ máy tính"}
                </button>
                {form.imageUrl ? (
                  <a
                    href={form.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#A59588] hover:text-[#3e3226]"
                  >
                    Xem ảnh
                  </a>
                ) : (
                  <span className="text-xs text-[#A59588]">
                    Ảnh sẽ tự lưu vào thư mục theo ngày đăng
                  </span>
                )}
              </div>
              <label className="block text-sm text-[#5C4A3D]">
                Ngày đăng
                <input
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => setForm((f) => ({ ...f, publishDate: e.target.value }))}
                  className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm"
                />
              </label>
              <div className="block text-sm text-[#5C4A3D]">
                <div className="flex items-center justify-between gap-3">
                  <span>Nội dung bài viết</span>
                  <button
                    type="button"
                    onClick={() => setPreview((v) => !v)}
                    className="px-3 py-1.5 text-xs border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0]"
                  >
                    {preview ? "Soạn thảo" : "Xem trước"}
                  </button>
                </div>

                {!preview ? (
                  <>
                    <div className="mt-2 flex flex-wrap gap-2 border border-[#e8e4df] rounded-lg p-2 bg-[#f5f3f0]">
                      <button type="button" onClick={() => exec("bold")} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">Đậm</button>
                      <button type="button" onClick={() => exec("italic")} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">Nghiêng</button>
                      <button type="button" onClick={() => exec("underline")} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">Gạch chân</button>
                      <span className="w-px bg-[#e8e4df] mx-1" />
                      <button type="button" onClick={() => exec("insertUnorderedList")} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">• Danh sách</button>
                      <button type="button" onClick={() => exec("insertOrderedList")} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">1. Danh sách</button>
                      <span className="w-px bg-[#e8e4df] mx-1" />
                      <button type="button" onClick={insertLink} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">Chèn link</button>
                      <button type="button" onClick={insertImage} className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7]">Dán URL ảnh</button>
                      <input
                        ref={inlineFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onPickInline}
                      />
                      <button
                        type="button"
                        onClick={() => inlineFileRef.current?.click()}
                        disabled={uploading}
                        className="px-2 py-1 text-xs bg-white border border-[#e8e4df] rounded hover:bg-[#faf9f7] disabled:opacity-60"
                      >
                        {uploading ? "Upload..." : "Chọn ảnh (tự upload)"}
                      </button>
                    </div>

                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={() => setForm((f) => ({ ...f, bodyHtml: readEditorHtml() }))}
                      className="mt-2 w-full border border-[#e8e4df] rounded px-3 py-2 text-base leading-relaxed min-h-[260px] bg-white text-[#3e3226]"
                    />
                    <p className="mt-2 text-xs text-[#A59588]">
                      Bạn chỉ cần gõ như Word. Hệ thống sẽ tự lưu định dạng.
                    </p>
                  </>
                ) : (
                  <div className="mt-2 border border-[#e8e4df] rounded px-3 py-3 bg-white">
                    <div
                      className="prose prose-[#5C4A3D] max-w-none text-[#5C4A3D] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: readEditorHtml() }}
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdvanced((v) => !v)}
                  className="text-xs text-[#A59588] hover:text-[#3e3226]"
                >
                  {showAdvanced ? "Ẩn nâng cao" : "Hiện nâng cao (slug/URL)"}
                </button>
              </div>

              {showAdvanced && (
                <label className="block text-sm text-[#5C4A3D]">
                  Slug (URL, để trống sẽ tự tạo)
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    className="mt-1 w-full border border-[#e8e4df] rounded px-3 py-2 text-sm font-mono"
                    placeholder="chu-de-bai-viet"
                  />
                </label>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-sm border border-[#e8e4df] rounded-lg text-[#5C4A3D] hover:bg-[#f5f3f0]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={savePost}
                disabled={saving}
                className="px-4 py-2 text-sm bg-[#463325] text-white rounded-lg hover:bg-[#3e3226] disabled:opacity-60"
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
