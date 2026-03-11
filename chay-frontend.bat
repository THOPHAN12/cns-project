@echo off
chcp 65001 >nul
echo Đang chạy Frontend CNS Shop...
echo.
cd /d "%~dp0frontend"
call npm run dev
pause
