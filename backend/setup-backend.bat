@echo off
chcp 65001 >nul
echo ========================================
echo   SETUP BACKEND CNS SHOP (LOCAL)
echo ========================================
echo.

cd /d "%~dp0"

REM Kiểm tra file .env
if not exist .env (
    echo [1/3] Tao file .env tu .env.example...
    copy .env.example .env >nul
    echo     Da tao file .env. Kiem tra DB_PASSWORD trong .env neu ket noi DB loi.
    echo.
) else (
    echo [1/3] File .env da ton tai.
    echo.
)

REM Tạo database cns_db nếu chưa có (bỏ qua nếu psql không có hoặc lỗi)
echo [2/3] Database cns_db - neu chua co, tao bang pgAdmin hoac psql:
echo        psql -U postgres -c "CREATE DATABASE cns_db;"
echo..

echo [3/3] Chay backend Spring Boot...
echo.
call mvnw.cmd spring-boot:run

pause
