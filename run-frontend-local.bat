@echo off
REM Chay frontend ket noi backend local (localhost:8080)
cd /d "%~dp0frontend"
echo Dang khoi dong frontend...
echo Mo trinh duyet: http://localhost:5173
echo.
npm run dev
pause
