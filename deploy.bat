@echo off
echo Deploying CNS Shop to https://cleannieshop.com/
cd /d "%~dp0"
echo.
echo Buoc 1: Build frontend...
cd frontend
call npm run build
if errorlevel 1 (
    echo Build that bai!
    pause
    exit /b 1
)
cd ..
echo.
echo Buoc 2: Deploy len Vercel...
call npx vercel --prod
echo.
pause
