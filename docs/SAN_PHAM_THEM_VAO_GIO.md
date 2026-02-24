# Sản phẩm có trên hệ thống – Thêm vào giỏ hàng được

## Kết luận

**Chỉ các sản phẩm có ID trùng với backend (đã seed) mới thêm vào giỏ hàng được.**

---

## 1. Sản phẩm **có trên hệ thống** – thêm giỏ **được** (22 sản phẩm)

Backend seed (`ProductService.seedProductsIfMissing`) và frontend `REAL_PRODUCTS` dùng chung các ID sau:

| ID       | Tên sản phẩm |
|----------|----------------|
| **Thời trang Nữ** | |
| `p-nu-1`  | Black Top |
| `p-nu-2`  | Blush Lift Bra |
| `p-nu-3`  | Butter Set |
| `p-nu-4`  | Cemly Set |
| `p-nu-5`  | Contour Fit Short |
| `p-nu-6`  | Core High-Waist Legging |
| `p-nu-7`  | Dual Tone Sculpt Bra |
| `p-nu-8`  | Emily Top |
| `p-nu-9`  | Second Top |
| `p-nu-10` | Soft Form Short |
| `p-nu-11` | Vanilla Sculpt Set |
| **Thời trang Nam** | |
| `p-nam-1`  | Campaign - Thời trang nam |
| `p-nam-2`  | Classic Zip Hoodie |
| `p-nam-3`  | Essential Ribbed Tank Top – 3 Pack |
| `p-nam-4`  | Essential Long Sleeve T-Shirt |
| `p-nam-5`  | Essential Short Sleeve T-Shirt |
| `p-nam-6`  | Fleece Jogger Sweatpants |
| `p-nam-7`  | Lightweight Zip-Up Hoodie Set |
| `p-nam-8`  | Lightweight Zip-Up Hoodie Set (Variant) |
| `p-nam-9`  | Relaxed Fit Cotton T-Shirt |
| `p-nam-10` | Relaxed Fit Lounge T-Shirt & Shorts Set |
| `p-nam-11` | Slim Fit Cotton Tank Top |

**Trên web:** Vào **Sản phẩm** → không chọn bộ sưu tập Valentine (hoặc chọn Nữ/Nam) → danh sách hiển thị chính là 22 sản phẩm trên → vào chi tiết → chọn size → **Thêm Vào Giỏ Hàng** sẽ thành công (sau khi đã gọi seed nếu mới chạy lần đầu).

---

## 2. Sản phẩm **chưa có trên backend** – thêm giỏ **sẽ lỗi**

- **Bộ sưu tập Valentine** (`VALENTINE_PRODUCTS`): id dạng `val-blush-1`, `val-kiss-1`, `val-crush-1`, `val-luv-1`, `val-sweet-1`, …
- Backend **không** seed các id này → API thêm giỏ trả 404/406 → không thêm vào giỏ được.

---

## 3. Cách đảm bảo thêm giỏ hoạt động

1. **Chạy backend** và gọi **seed** (một lần):  
   `GET http://localhost:8080/api/seed/products`  
   (hoặc mở URL này trong trình duyệt khi backend đang chạy.)
2. Chỉ thử thêm giỏ với sản phẩm thuộc **Thời trang Nữ / Thời trang Nam** (22 sản phẩm trong bảng trên).
