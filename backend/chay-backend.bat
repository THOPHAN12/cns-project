@echo off
chcp 65001 >nul
echo Đang chạy Backend CNS Shop...
echo.
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
pause
