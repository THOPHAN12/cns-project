import Cookies from "js-cookie";

/**
 * Base URL của backend API.
 * Production: "" = Vercel proxy /api, /auth tới Render (hoặc set VITE_API_BASE_URL = Ngrok nếu dùng).
 * Development: localhost:8080.
 */
export function getApiBaseUrl() {
    const raw = import.meta.env.VITE_API_BASE_URL;
    const custom = raw && String(raw).trim();
    if (custom) return custom.replace(/\/$/, "");
    // Production: dùng relative URL để Vercel rewrite /api, /auth tới backend (Ngrok)
    if (import.meta.env.PROD) return "";
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

/** Warm-up backend. Gọi khi load trang login/checkout. */
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

/** Ghi nhận lượt truy cập trang (page view). Gọi khi user vào mỗi trang. Gửi userId nếu đã đăng nhập. */
export function trackPageView(path) {
    if (!path) return;
    const base = getApiBaseUrl();
    const url = base ? `${base}/api/analytics/pageview` : "/api/analytics/pageview";
    const userId = Cookies.get("id") || null;
    const body = userId ? { path, userId } : { path };
    fetch(url, {
        method: "POST",
        headers: getApiHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
        credentials: "omit",
    }).catch(() => {});
}
