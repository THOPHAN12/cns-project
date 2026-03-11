# Cách 1 – Dùng PostgreSQL cho Backend CNS Shop

## Bước 1: Cài PostgreSQL

- **Đã chạy:** `winget install PostgreSQL.PostgreSQL.17` (có thể đang mở cửa sổ cài đặt).
- Nếu có **wizard** hiện ra:
  - Chọn thư mục cài đặt (mặc định được).
  - **Password cho user `postgres`:** đặt là **`CnsDev2026`** (để trùng với `backend\.env.example`).
  - Port: **5432** (mặc định).
  - Hoàn tất cài đặt.

Nếu chưa cài, mở PowerShell (Run as Administrator) và chạy:

```powershell
winget install PostgreSQL.PostgreSQL.17 --accept-package-agreements --accept-source-agreements
```

Sau khi cài xong, **khởi động lại terminal** (hoặc mở terminal mới) để dùng lệnh `psql`.

### Khởi động dịch vụ PostgreSQL (nếu chưa chạy)

- **Cách 1:** Nhấn **Win + R** → gõ **`services.msc`** → Enter → tìm service **"postgresql-x64-17"** (hoặc tên tương tự) → chuột phải → **Start**.
- **Cách 2:** Mở PowerShell **Run as Administrator** và chạy:
  ```powershell
  Start-Service -Name "postgresql-x64-17"
  ```
  (Nếu tên service khác, xem trong `services.msc`.)

---

## Bước 2: Tạo database `cns_db`

1. Mở **Command Prompt** hoặc **PowerShell** (không cần Admin).

2. Vào thư mục bin của PostgreSQL (đường dẫn thường giống bên dưới, có thể khác phiên bản):

```powershell
cd "C:\Program Files\PostgreSQL\17\bin"
```

(Nếu cài PostgreSQL 18 thì đổi `17` thành `18`.)

3. Kết nối với user `postgres` (sẽ hỏi mật khẩu – nhập **CnsDev2026** nếu bạn đặt như trên):

```powershell
.\psql -U postgres
```

4. Trong `psql`, chạy lần lượt:

```sql
CREATE DATABASE cns_db;
\q
```

5. Thoát `psql` bằng `\q`.

---

## Bước 3: Cấu hình Backend

- Nếu dùng đúng user `postgres`, password `CnsDev2026`, database `cns_db`, port `5432` thì **không cần** tạo file `.env` (backend đã có default trong `application.properties`).
- Nếu bạn đặt password khác cho `postgres`:
  - Copy `backend\.env.example` thành `backend\.env`.
  - Sửa trong `backend\.env`:

```
DB_URL=jdbc:postgresql://localhost:5432/cns_db
DB_USERNAME=postgres
DB_PASSWORD=<mật_khẩu_bạn_đặt>
```

---

## Bước 4: Chạy Backend

Trong terminal (PowerShell):

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot"
cd D:\APP\cns-project\backend
.\mvnw.cmd spring-boot:run
```

Đợi đến khi thấy dòng dạng: **Started BackendApplication in ...**

- Backend chạy tại: **http://localhost:8080**
- Swagger: **http://localhost:8080/swagger-ui.html**

---

## Bước 5: Chạy Frontend

Mở terminal mới:

```powershell
cd D:\APP\cns-project\frontend
npm run dev
```

Mở trình duyệt: **http://localhost:5173/**

---

## Tóm tắt

| Bước | Việc cần làm |
|------|----------------|
| 1 | Cài PostgreSQL 17 (winget), đặt password `postgres` = **CnsDev2026**, port **5432** |
| 2 | Tạo database **cns_db** bằng `psql` (hoặc pgAdmin) |
| 3 | (Tùy chọn) Tạo/sửa `backend\.env` nếu password khác CnsDev2026 |
| 4 | Chạy backend: `.\mvnw.cmd spring-boot:run` trong thư mục `backend` |
| 5 | Chạy frontend: `npm run dev` trong thư mục `frontend` |

**Tài khoản mặc định (tự tạo khi lần đầu chạy backend):** username = **admin**, password = **CnsDev2026**. Dùng để đăng nhập trên web.

Nếu cài PostgreSQL ở ổ/ thư mục khác, chỉ cần sửa đường dẫn trong Bước 2 (ví dụ `C:\PostgreSQL\17\bin`).
