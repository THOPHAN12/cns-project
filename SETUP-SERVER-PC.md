# Chạy Backend trên máy tính cũ – kết nối với website

Hướng dẫn chạy backend CNS Shop trên máy cũ, để website **cleannieshop.com** sử dụng API từ máy bạn.

---

## Tổng quan

```
Máy cũ (Backend)                    Internet
     │                                   │
     │  Cloudflare Tunnel                │
     │  api.cleannieshop.com ───────────►│ cleannieshop.com (Vercel)
     │                                   │     │
     │  Backend :8080                    │     │ proxy /api, /auth
     │  H2 hoặc PostgreSQL               │     ▼
     └──────────────────────────────────┴─► Người dùng
```

---

## Bước 1: Chạy Backend trên máy cũ

### Yêu cầu
- Java 21
- Kết nối mạng ổn định

### Thực hiện

1. Copy thư mục `cns-project` sang máy cũ.
2. Cài Java 21 (nếu chưa có).
3. Chạy backend:
   ```bash
   cd backend
   mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local
   ```
   Hoặc double-click `run-backend-local.bat`.

4. Kiểm tra: mở trình duyệt → http://localhost:8080/swagger-ui.html  
   Nếu mở được là backend đã chạy.

---

## Bước 2: Expose backend ra Internet (Cloudflare Tunnel)

Để frontend (cleannieshop.com) gọi được backend trên máy cũ, cần tạo URL public qua Cloudflare Tunnel.

### 2.1. Cài đặt Cloudflare Tunnel

1. Vào https://dash.cloudflare.com/ → đăng nhập.
2. Thêm domain **cleannieshop.com** vào Cloudflare (hoặc đã có sẵn).
3. Tải **cloudflared**: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
   - Windows: tải `cloudflared-windows-amd64.exe`, đổi tên thành `cloudflared.exe`.

### 2.2. Đăng nhập Cloudflare

```bash
cloudflared.exe tunnel login
```

Mở link trong trình duyệt, chọn domain **cleannieshop.com** để xác nhận.

### 2.3. Tạo Tunnel

```bash
cloudflared.exe tunnel create cns-backend
```

Lưu đường dẫn file credentials (ví dụ `C:\Users\...\.cloudflared\xxx.json`).

### 2.4. Tạo file cấu hình

Tạo file `config.yml` (ví dụ tại `C:\cloudflared\config.yml`):

```yaml
tunnel: <TUNNEL_ID>
credentials-file: C:\Users\<USER>\.cloudflared\<TUNNEL_ID>.json

ingress:
  - hostname: api.cleannieshop.com
    service: http://localhost:8080
  - service: http_status:404
```

Thay `<TUNNEL_ID>` bằng ID tunnel (sau lệnh `tunnel create`), và sửa đường dẫn `credentials-file` cho đúng.

### 2.5. Chạy Tunnel

```bash
cloudflared.exe tunnel run cns-backend
```

Hoặc cài dưới dạng service để tự chạy khi khởi động máy:

```bash
cloudflared.exe service install
```

### 2.6. DNS cho api.cleannieshop.com

1. Cloudflare Dashboard → Domain → **DNS** → **Records**
2. Thêm record:
   - Type: **CNAME**
   - Name: `api`
   - Target: `<TUNNEL_ID>.cfargotunnel.com`
   - Proxy: Bật (mây cam)

Sau vài phút, truy cập: https://api.cleannieshop.com/swagger-ui.html  
Nếu mở được là tunnel và DNS đã đúng.

---

## Bước 3: Cấu hình website (Vercel)

File `vercel.json` đã được cấu hình proxy tới `https://api.cleannieshop.com`:

```json
"rewrites": [
  { "source": "/api/:path*", "destination": "https://api.cleannieshop.com/api/:path*" },
  { "source": "/auth/:path*", "destination": "https://api.cleannieshop.com/auth/:path*" },
  ...
]
```

Sau khi tunnel chạy ổn định, push code lên Git để Vercel deploy lại. Website cleannieshop.com sẽ gọi API qua api.cleannieshop.com.

---

## Bước 4: Chạy cùng lúc (máy cũ)

Trên máy cũ cần luôn chạy 2 thứ:

1. **Backend**
   ```bash
   cd backend
   mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local
   ```

2. **Cloudflare Tunnel**
   ```bash
   cloudflared.exe tunnel run cns-backend
   ```

Có thể dùng 2 cửa sổ terminal, hoặc cài thành Windows Service cho tunnel.

---

## Lưu ý

- Máy cũ cần bật 24/7 và mạng ổn định.
- Dữ liệu lưu trong `backend/data/` (H2). Nên backup thường xuyên.
- Nếu dùng domain khác (không phải api.cleannieshop.com), sửa `vercel.json` và CORS trong `SecurityConfig.java` cho đúng domain mới.
