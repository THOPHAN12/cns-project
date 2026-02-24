# Hướng Dẫn Chạy Dự Án CNS Project

## 📋 Yêu Cầu Hệ Thống

### 1. Phần Mềm Cần Cài Đặt:

- **Node.js** (phiên bản ≥ 18) - [Download tại đây](https://nodejs.org/)
- **Java JDK 21** - [Download tại đây](https://www.oracle.com/java/technologies/downloads/#java21)
- **PostgreSQL** - [Download tại đây](https://www.postgresql.org/download/)
- **Maven** (tùy chọn - dự án đã có `mvnw` wrapper)

### 2. Kiểm Tra Cài Đặt:

```powershell
# Kiểm tra Node.js
node --version

# Kiểm tra npm
npm --version

# Kiểm tra Java
java --version

# Kiểm tra PostgreSQL
psql --version
```

---

## 🗄️ Bước 1: Cấu Hình Database PostgreSQL

### 1.1. Tạo Database:

1. Mở **pgAdmin** hoặc **psql**
2. Tạo database mới:
   ```sql
   CREATE DATABASE cns_db;
   ```

### 1.2. Ghi Nhớ Thông Tin:
- **Database name**: `cns_db` (hoặc tên bạn đặt)
- **Username**: `postgres` (hoặc username của bạn)
- **Password**: Password PostgreSQL của bạn
- **Port**: `5432` (mặc định)

---

## ⚙️ Bước 2: Cấu Hình Backend

### 2.1. Tạo File `.env` trong thư mục `backend`:

Tạo file `D:\APP\cns-project\backend\.env` với nội dung:

```properties
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/cns_db
DB_USERNAME=postgres
DB_PASSWORD=0000

# SMTP Configuration (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

**Lưu ý:**
- Thay `cns_db`, `postgres`, `0000` bằng thông tin database thực tế của bạn
- Đối với Gmail, bạn cần tạo **App Password**:
  1. Vào Google Account → Security
  2. Bật 2-Step Verification
  3. Tạo App Password và dùng password đó (không dùng password Gmail thông thường)

### 2.2. Chạy Backend:

Mở **PowerShell** hoặc **Command Prompt**:

```powershell
# Di chuyển vào thư mục backend
cd D:\APP\cns-project\backend

# Chạy backend (lần đầu sẽ tải dependencies, mất vài phút)
.\mvnw.cmd spring-boot:run
```

**Kết quả mong đợi:**
- Backend sẽ chạy tại: `http://localhost:8080`
- Bạn sẽ thấy log: `Started BackendApplication in X.XXX seconds`
- Database sẽ tự động tạo tables (do `spring.jpa.hibernate.ddl-auto=update`)

---

## 🎨 Bước 3: Cấu Hình Frontend

### 3.1. Tạo File `.env` trong thư mục `frontend`:

Tạo file `D:\APP\cns-project\frontend\.env` với nội dung:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3.2. Cài Đặt Dependencies và Chạy Frontend:

Mở **PowerShell mới** (giữ backend đang chạy):

```powershell
# Di chuyển vào thư mục frontend
cd D:\APP\cns-project\frontend

# Cài đặt dependencies (chỉ cần chạy lần đầu)
npm install

# Chạy frontend
npm run dev
```

**Kết quả mong đợi:**
- Frontend sẽ chạy tại: `http://localhost:5173`
- Browser sẽ tự động mở hoặc bạn mở thủ công

---

## 🚀 Bước 4: Kiểm Tra Dự Án

### 4.1. Kiểm Tra Backend:

- Mở browser: `http://localhost:8080`
- Kiểm tra Swagger API docs: `http://localhost:8080/swagger-ui.html` (nếu có)

### 4.2. Kiểm Tra Frontend:

- Mở browser: `http://localhost:5173`
- Bạn sẽ thấy trang chủ của CNS Studio

---

## 📝 Tóm Tắt Lệnh Chạy

### Terminal 1 - Backend:
```powershell
cd D:\APP\cns-project\backend
.\mvnw.cmd spring-boot:run
```

### Terminal 2 - Frontend:
```powershell
cd D:\APP\cns-project\frontend
npm install  # Chỉ lần đầu
npm run dev
```

---

## ⚠️ Xử Lý Lỗi Thường Gặp

### Lỗi: "Cannot connect to database"
- ✅ Kiểm tra PostgreSQL đang chạy
- ✅ Kiểm tra thông tin trong file `.env` đúng chưa
- ✅ Kiểm tra database `cns_db` đã được tạo chưa

### Lỗi: "Port 8080 already in use"
- ✅ Đóng ứng dụng khác đang dùng port 8080
- ✅ Hoặc đổi port trong `application.properties`:
  ```properties
  server.port=8081
  ```

### Lỗi: "Port 5173 already in use"
- ✅ Đóng ứng dụng khác đang dùng port 5173
- ✅ Hoặc Vite sẽ tự động tìm port khác

### Lỗi: "npm install failed"
- ✅ Xóa `node_modules` và `package-lock.json`, chạy lại `npm install`
- ✅ Kiểm tra Node.js version ≥ 18

### Lỗi: "Java version not found"
- ✅ Cài đặt Java JDK 21
- ✅ Set JAVA_HOME environment variable

---

## 🔧 Các Lệnh Hữu Ích

### Backend:
```powershell
# Build project
.\mvnw.cmd clean package

# Chạy tests
.\mvnw.cmd test

# Xem dependencies
.\mvnw.cmd dependency:tree
```

### Frontend:
```powershell
# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📚 Cấu Trúc Dự Án

```
cns-project/
├── backend/              # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   ├── .env             # Cần tạo file này
│   └── mvnw.cmd
│
└── frontend/            # React + Vite Frontend
    ├── src/
    ├── public/
    ├── package.json
    ├── .env             # Cần tạo file này
    └── vite.config.js
```

---

## ✅ Checklist Trước Khi Chạy

- [ ] Đã cài Node.js (≥ 18)
- [ ] Đã cài Java JDK 21
- [ ] Đã cài PostgreSQL và đang chạy
- [ ] Đã tạo database `cns_db`
- [ ] Đã tạo file `backend/.env` với thông tin database
- [ ] Đã tạo file `frontend/.env` với API URL
- [ ] Đã cấu hình SMTP (nếu cần gửi email)

---

## 🎯 Bước Tiếp Theo

Sau khi chạy thành công:
1. Kiểm tra trang sản phẩm: `http://localhost:5173/product`
2. Kiểm tra đăng nhập/đăng ký: `http://localhost:5173/login`
3. Thêm sản phẩm vào database để test hiển thị

**Chúc bạn thành công! 🎉**
