# Hướng dẫn setup Backend trên máy tính

## Yêu cầu

- **Java 21**
- **PostgreSQL** (đã cài và đang chạy)
- **Maven** (có sẵn qua mvnw)

## Các bước

### 1. Cài PostgreSQL (nếu chưa có)

- Tải: https://www.postgresql.org/download/windows/
- Khi cài, ghi nhớ mật khẩu user **postgres**

### 2. Tạo database `cns_db`

Mở **pgAdmin** hoặc **Command Prompt**:

```powershell
cd "C:\Program Files\PostgreSQL\17\bin"   # Đổi 17 nếu dùng bản khác
.\psql -U postgres -c "CREATE DATABASE cns_db;"
```

### 3. Cấu hình mật khẩu

- Mở file `.env` trong thư mục backend
- Sửa `DB_PASSWORD=` thành mật khẩu postgres của bạn  
  (hoặc đổi mật khẩu postgres sang `CnsDev2026` theo SUA_LOI_POSTGRES.md)

### 4. Chạy backend

**Cách 1 – Script setup (tự tạo .env và cns_db nếu thiếu):**
```
Double-click: setup-backend.bat
```

**Cách 2 – Chạy trực tiếp:**
```
Double-click: chay-backend.bat
```

Hoặc trong terminal:
```powershell
cd D:\APP\cns-project\backend
.\mvnw.cmd spring-boot:run
```

### 5. Kiểm tra

- Backend chạy tại: **http://localhost:8080**
- Swagger API: **http://localhost:8080/swagger-ui.html**
- Tài khoản mặc định: **admin** / **CnsDev2026**
