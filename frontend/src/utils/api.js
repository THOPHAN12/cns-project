/**
 * Base URL của backend API.
 * Production: dùng "" (relative) vì Vercel proxy /api và /auth tới backend Render.
 * Development: dùng localhost:8080.
 */
const PRODUCTION_API = "https://cns-backend-8v53.onrender.com";

export function getApiBaseUrl() {
    const raw = import.meta.env.VITE_API_BASE_URL;
    const custom = raw && String(raw).trim();
    if (custom) return custom.replace(/\/$/, "");
    const isProd = import.meta.env.PROD;
    if (isProd) return ""; // relative -> vercel proxy tới Render
    return "http://localhost:8080";
}

/** URL cho đăng ký */
export function getAuthRegisterUrl() {
    const base = getApiBaseUrl();
    return base ? base + "/auth/register" : "/auth/register";
}

/** URL cho đăng nhập */
export function getAuthLoginUrl() {
    const base = getApiBaseUrl();
    return base ? base + "/auth/login" : "/auth/login";
}

/** Header gửi kèm request. Thêm ngrok-skip-browser-warning khi gọi Ngrok. */
export function getApiHeaders(extra = {}) {
    const raw = import.meta.env.VITE_API_BASE_URL;
    const isNgrok = raw && /ngrok/i.test(raw);
    if (isNgrok) return { "ngrok-skip-browser-warning": "1", ...extra };
    return { ...extra };
}

/** Warm-up backend (Render free tier cold start ~50s). Gọi khi load trang login/checkout. */
export function warmUpBackend() {
    const base = getApiBaseUrl();
    const url = base ? `${base}/api/products` : "/api/products";
    fetch(url, { method: "GET", headers: getApiHeaders() }).catch(() => {});
}

/** Ghi nhận một lượt click/xem bài blog theo slug. Không chặn UI nếu lỗi. */
export function trackBlogClick(slug) {
    if (!slug) return;
    const base = getApiBaseUrl();
    const url = base ? `${base}/api/blog/click` : "/api/blog/click";
    fetch(url, {
        method: "POST",
        headers: getApiHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ slug }),
    }).catch(() => {});
}
