/**
 * Base URL của backend API.
 * Production: dùng "" (relative) vì Vercel proxy /api và /auth tới backend Render.
 * Development: dùng localhost:8080.
 */
const PRODUCTION_API = "https://cns-backend-8v53.onrender.com";

export function getApiBaseUrl() {
    const isProd = import.meta.env.PROD;
    const raw = import.meta.env.VITE_API_BASE_URL;
    // Prod: dùng "" để gọi relative URL (qua Vercel proxy). Nếu có VITE_API_BASE_URL thì dùng trực tiếp backend.
    if (isProd) {
        const custom = raw && String(raw).trim();
        if (custom) return custom.replace(/\/$/, "");
        return ""; // relative -> qua vercel.json proxy tới Render
    }
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
