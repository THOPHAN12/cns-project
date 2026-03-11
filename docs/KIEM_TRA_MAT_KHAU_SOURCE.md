# Kiểm tra mật khẩu / thông tin nhạy cảm trong source

Đã quét toàn bộ repo và lịch sử git. Kết quả:

---

## 1. File `.env` – đã được bảo vệ

- **Frontend:** `.env` nằm trong **`.gitignore`** → không bị commit.
- **Backend:** `.env` nằm trong **`.gitignore`** → không bị commit.
- **Lịch sử git:** Trước đây từng có commit chứa `frontend/.env`, sau đó đã **xóa file** và **thêm .env vào gitignore**. Nội dung file .env cũ đã commit chỉ có:
  - `VITE_API_BASE_URL=https://cns-backend-8v53.onrender.com`
  - `VITE_API_TIMEOUT=5000`
  → **Không có mật khẩu hay API key** trong đó.
- **backend/.env** chưa từng bị commit.

---

## 2. Chỗ trong code có nhắc đến mật khẩu / giá trị mặc định

| Vị trí | Nội dung | Đánh giá |
|--------|----------|-----------|
| `backend/src/main/resources/application.properties` | `spring.datasource.password=${DB_PASSWORD:0000}` và comment `# spring.datasource.password=0000` | **Default cho dev** – mật khẩu thật nên để trong `.env`. Giá trị `0000` là fallback khi không set biến môi trường. |
| `backend/src/main/java/.../config/UserSeedConfig.java` | `DEFAULT_PASSWORD = "0000"` cho tài khoản admin seed | **Mật khẩu mặc định tài khoản admin** – chỉ dùng khi seed lần đầu. Nếu deploy production nên đổi hoặc tắt seed. |
| `backend/.env.example` | `DB_PASSWORD=0000`, placeholder OAuth | **File mẫu** – không chứa secret thật, dùng để hướng dẫn tạo `.env`. |
| `docs/*.md`, `SUA_LOI_POSTGRES.md` | Hướng dẫn đặt password postgres `0000`, lệnh ALTER USER | **Tài liệu** – không phải secret thật. |

→ **Không có mật khẩu thật (PostgreSQL, OAuth, SMTP…) được ghi thẳng vào source.** Chỉ có giá trị mặc định cho môi trường dev (0000).

---

## 3. OAuth / API

- **application.properties:** Chỉ có **comment** dạng `# oauth.google.client-id=...`, **oauth.facebook.app-secret=...** – không có giá trị thật.
- **Backend** đọc OAuth từ biến môi trường (`.env`), không hardcode trong code.
- **Frontend .env.example** và **frontend/.env** (local): Chỉ placeholder `your-google-client-id...`, `your-facebook-app-id` hoặc giá trị do bạn điền – **không có app-secret** (secret chỉ để ở backend).

---

## 4. Token / JWT

- Frontend chỉ dùng `Cookies.get('token')` – **không có token hoặc secret nào hardcode** trong code.

---

## 5. Chative (chat)

- **index.html** có **channel ID** Chative: `sbdd832c0-715c-42c6-878c-5b3e5de6c9ac`. Đây là ID kênh dùng phía client, thường công khai; nếu muốn kín hơn có thể chuyển sang biến môi trường khi build.

---

## Kết luận

- **Không có mật khẩu thật (DB, email, OAuth secret…) nằm trong source** hoặc trong lịch sử git.
- Chỉ có **giá trị mặc định cho dev** (ví dụ `0000` cho DB và tài khoản admin seed) và **file mẫu** (.env.example).
- Lập trình viên trước đã **xóa `frontend/.env` khỏi repo** và **thêm .env vào .gitignore** – đúng cách.
- **Khuyến nghị:** Giữ nguyên quy ước: mật khẩu và secret chỉ đặt trong `.env` (không commit); production nên đổi mật khẩu admin seed hoặc tắt seed tài khoản mặc định.
