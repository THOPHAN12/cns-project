# Cấu hình cleannieshop.com với Ngrok (không dùng Render)

Backend chạy qua Docker + Ngrok. `vercel.json` đã cấu hình proxy `/api`, `/auth` tới URL Ngrok.

## Khi URL Ngrok thay đổi (sau mỗi lần restart)

1. Chạy: `docker compose --profile ngrok up -d`
2. Mở **http://localhost:4040/api/tunnels** → copy `public_url`
3. Sửa `vercel.json`: thay URL cũ bằng URL mới trong 2 dòng `destination`
4. Push lên GitHub → Vercel tự deploy
