@echo off
REM Chay backend o may tinh ca nhan - dung H2 database (khong can PostgreSQL)
cd /d "%~dp0backend"
echo Dang khoi dong backend voi H2 database...
echo.
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local
pause
