# Hướng dẫn deploy web CNS Shop (Frontend)

Backend đã chạy tại: **https://cns-backend-8v53.onrender.com**

## Cách 1: Deploy bằng Vercel (nhanh, miễn phí)

1. **Đẩy code lên GitHub** (nếu chưa có):
   - Tạo repo trên https://github.com/new
   - Trong thư mục `D:\APP\cns-project`, chạy:
     ```bash
     git init
     git add .
     git commit -m "CNS Shop"
     git remote add origin https://github.com/TEN_USER/TEN_REPO.git
     git push -u origin main
     ```

2. **Deploy trên Vercel:**
   - Vào https://vercel.com → Đăng nhập (dùng GitHub).
   - Chọn **Add New** → **Project** → Import repo GitHub của bạn.
   - **Root Directory:** chọn `frontend` (hoặc điền `frontend`).
   - **Build Command:** `npm run build` (mặc định).
   - **Output Directory:** `dist` (mặc định).
   - **Environment Variables:** thêm (nếu cần):
     - `VITE_API_BASE_URL` = `https://cns-backend-8v53.onrender.com`
   - Bấm **Deploy**. Sau vài phút bạn sẽ có link dạng `https://ten-project.vercel.app`.

3. **Cấu hình CORS (Backend):**  
   Trên Render (hoặc server backend), thêm domain Vercel của bạn vào CORS (ví dụ `https://ten-project.vercel.app`).

---

## Cách 2: Deploy bằng Netlify

1. Đẩy code lên GitHub (giống bước 1 ở trên).

2. Vào https://app.netlify.com → **Add new site** → **Import an existing project** → chọn GitHub và repo.

3. Cấu hình:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

4. Thêm biến môi trường (Site settings → Environment variables):
   - `VITE_API_BASE_URL` = `https://cns-backend-8v53.onrender.com`

5. Deploy. Netlify sẽ cho link dạng `https://ten-site.netlify.app`.

---

## Cách 3: Deploy thủ công (chỉ upload thư mục `dist`)

1. Đã build sẵn: thư mục `frontend/dist` chứa file tĩnh.

2. Upload toàn bộ nội dung trong `dist` lên bất kỳ hosting tĩnh nào:
   - **GitHub Pages**
   - **Firebase Hosting**
   - **Cloudflare Pages**
   - Hoặc hosting có hỗ trợ static (cPanel, etc.)

3. **Lưu ý:** Nếu dùng subpath (ví dụ `https://user.github.io/cns-shop/`), cần set `VITE_BASE_PATH=/cns-shop/` khi build và cấu hình base trong `vite.config.js`.

---

## Kiểm tra sau khi deploy

- Mở link Vercel/Netlify → trang chủ, Sản phẩm, Bộ sưu tập, Đăng nhập hoạt động bình thường.
- Nếu gọi API bị chặn: kiểm tra CORS trên backend (thêm domain frontend vào allowed origins).
