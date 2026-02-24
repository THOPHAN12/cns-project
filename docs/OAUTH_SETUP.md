# Hướng dẫn cấu hình đăng nhập Google & Facebook

## 1. Google

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**
4. Chọn **Web application**
5. Thêm **Authorized JavaScript origins**:
   - `http://localhost:5173` (dev)
   - `https://yourdomain.com` (prod)
6. Copy **Client ID**

**Cấu hình:**
- **Frontend** (.env): `VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com`
- **Backend** (.env): `oauth.google.client-id=xxx.apps.googleusercontent.com`

---

## 2. Facebook

1. Vào [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới → chọn **Consumer**
3. Vào **Facebook Login** → **Settings**
4. Thêm **Valid OAuth Redirect URIs**: `http://localhost:5173`, `https://yourdomain.com`
5. Lấy **App ID** và **App Secret** từ **Settings** → **Basic**

**Cấu hình:**
- **Frontend** (.env): `VITE_FACEBOOK_APP_ID=your_app_id`
- **Backend** (.env):
  - `oauth.facebook.app-id=your_app_id`
  - `oauth.facebook.app-secret=your_app_secret`

---

## Chạy thử

1. Copy `.env.example` thành `.env` ở cả frontend và backend
2. Điền các giá trị Client ID / App ID / App Secret
3. Khởi động backend và frontend
4. Mở trang đăng nhập và thử các nút đăng nhập
