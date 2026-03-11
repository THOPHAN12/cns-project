# Hướng dẫn chạy CNS Shop trên máy tính cá nhân (không dùng dịch vụ cloud)

Chạy Backend + Frontend hoàn toàn local, dùng H2 database (không cần cài PostgreSQL).

---

## Yêu cầu

- **Java 21** – [Tải OpenJDK 21](https://adoptium.net/) hoặc [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- **Node.js 18+** – [Tải Node.js](https://nodejs.org/)
- **Maven** – Đã có sẵn trong project (Maven Wrapper `mvnw`)

---

## Bước 1: Cài đặt phụ thuộc Frontend

Mở terminal trong thư mục `frontend` và chạy:

```bash
cd frontend
npm install
```

---

## Bước 2: Chạy Backend (H2 database)

Backend sẽ dùng **H2** – cơ sở dữ liệu file, không cần cài thêm gì.

### Cách 1: Dùng script (Windows)

Double-click file:

```
run-backend-local.bat
```

### Cách 2: Chạy bằng lệnh

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

(Trên Windows dùng `mvnw.cmd` thay cho `mvnw`)

Khi thấy dòng `Started BackendApplication` là backend đã chạy thành công.

- **API:** http://localhost:8080  
- **Swagger:** http://localhost:8080/swagger-ui.html  
- **H2 Console:** http://localhost:8080/h2-console  
  - JDBC URL: `jdbc:h2:file:./data/cns_db`  
  - Username: `sa`  
  - Password: *(để trống)*  

---

## Bước 3: Chạy Frontend

Mở thêm một terminal mới:

### Cách 1: Dùng script (Windows)

Double-click:

```
run-frontend-local.bat
```

### Cách 2: Chạy bằng lệnh

```bash
cd frontend
npm run dev
```

Frontend: **http://localhost:5173**

---

## Đăng nhập Admin

Tài khoản admin được tạo tự động lần đầu chạy backend:

| Trường    | Giá trị     |
|----------|-------------|
| Username | `admin`     |
| Password | `CnsDev2026` |

---

## Cấu trúc khi chạy local

```
Backend (port 8080)  ←→  H2 Database (file: backend/data/cns_db.mv.db)
     ↑
     │  API calls
     │
Frontend (port 5173)  ←→  http://localhost:8080
```

Frontend (ở chế độ dev) đã được cấu hình để gọi `http://localhost:8080`.

---

## Thư mục dữ liệu H2

Dữ liệu H2 nằm trong thư mục `backend/data/`. Muốn reset DB, xóa thư mục này rồi khởi động lại backend (sẽ tạo lại DB và chạy seed).

---

## Lưu ý

- **Email:** Chức năng gửi email có thể không hoạt động nếu chưa cấu hình SMTP trong `.env`.
- **OAuth (Google/Facebook):** Cần cấu hình riêng trong `.env` để đăng nhập bằng mạng xã hội.
- **CORS:** Backend cho phép `localhost:5173` và `localhost:5174`, không cần chỉnh thêm khi chạy local.

---

## Dùng PostgreSQL thay vì H2 (tùy chọn)

Nếu muốn dùng PostgreSQL trên máy local:

1. Cài PostgreSQL, tạo database `cns_db`
2. Tạo file `backend/.env`:

   ```properties
   DB_URL=jdbc:postgresql://localhost:5432/cns_db
   DB_USERNAME=postgres
   DB_PASSWORD=mat_khau_cua_ban
   ```

3. Chạy backend **không** dùng profile `local`:

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
