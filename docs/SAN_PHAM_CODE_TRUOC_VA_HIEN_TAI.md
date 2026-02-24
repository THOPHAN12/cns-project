# So sánh: Sản phẩm trong code trước đó vs code hiện tại

## Code trước đó (trước khi chỉnh – dùng 2 nguồn sản phẩm)

Trang **Sản phẩm** (`ProductPage.jsx`) có **2 danh sách**:

### 1. REAL_PRODUCTS (22 sản phẩm – có trên backend, thêm giỏ được)

- **Thời trang Nữ:** `p-nu-1` … `p-nu-11`  
  (Black Top, Blush Lift Bra, Butter Set, Cemly Set, Contour Fit Short, Core High-Waist Legging, Dual Tone Sculpt Bra, Emily Top, Second Top, Soft Form Short, Vanilla Sculpt Set)
- **Thời trang Nam:** `p-nam-1` … `p-nam-11`  
  (Campaign, Classic Zip Hoodie, Essential Ribbed Tank Top – 3 Pack, Essential Long/Short Sleeve T-Shirt, Fleece Jogger Sweatpants, Lightweight Zip-Up Hoodie Set x2, Relaxed Fit Cotton T-Shirt, Relaxed Fit Lounge Set, Slim Fit Cotton Tank Top)

**Khi nào dùng:** Vào `/product` (không có `?collection=valentine`) hoặc chọn filter Nữ/Nam → hiển thị **REAL_PRODUCTS**.

---

### 2. VALENTINE_PRODUCTS (22 sản phẩm – không có trên backend, thêm giỏ lỗi)

- **Blush Top:** `val-blush-1`, `val-blush-2`, `val-blush-3`
- **Kiss Set:** `val-kiss-1` … `val-kiss-6`
- **Crush Bottom:** `val-crush-1` … `val-crush-4`
- **Luv Top:** `val-luv-1` … `val-luv-4`
- **Sweet Bottom:** `val-sweet-1`, `val-sweet-2`, `val-sweet-3`

**Khi nào dùng:** Vào `/product?collection=valentine` (hoặc từ nút "Khám phá ngay" trên trang Bộ sưu tập) → hiển thị **VALENTINE_PRODUCTS**. Các sản phẩm này **không** có trong backend → thêm giỏ báo lỗi "không có trên hệ thống".

---

### Cách chọn danh sách trong code cũ

- `collectionParam = searchParams.get("collection")`
- Nếu `collectionParam === "valentine"` → `setProductData(VALENTINE_PRODUCTS)`
- Ngược lại → `setProductData(REAL_PRODUCTS)`

---

## Code hiện tại (sau khi chỉnh – chỉ 1 nguồn)

Trang **Sản phẩm** chỉ còn **1 danh sách**:

### PRODUCTS (22 sản phẩm – trùng backend, thêm giỏ được)

Đây chính là danh sách **REAL_PRODUCTS** cũ, đổi tên thành **PRODUCTS**:

- **Thời trang Nữ:** `p-nu-1` … `p-nu-11` (cùng id, tên, giá, ảnh như trước)
- **Thời trang Nam:** `p-nam-1` … `p-nam-11` (cùng id, tên, giá, ảnh như trước)

**Đã bỏ:** toàn bộ **VALENTINE_PRODUCTS** và biến `collectionParam`; không còn `/product?collection=valentine`. Nút "Khám phá ngay" (CollectionPage) giờ dẫn đến `/product` (danh sách 22 sản phẩm trên).

---

## Tóm tắt

|         | Code trước đó              | Code hiện tại        |
|---------|----------------------------|------------------------|
| Nguồn   | REAL_PRODUCTS + VALENTINE_PRODUCTS | Chỉ PRODUCTS (tương đương REAL_PRODUCTS cũ) |
| Số loại | 2 (Thời trang + Valentine) | 1 (chỉ Thời trang)   |
| Thêm giỏ | Chỉ 22 sản phẩm Thời trang (p-nu-*, p-nam-*) | Cả 22 sản phẩm đều thêm giỏ được |
| Valentine | Có, nhưng thêm giỏ lỗi   | Đã bỏ khỏi trang Sản phẩm |

**Kết luận:** Code trước đó dùng **cả** 22 sản phẩm Thời trang (p-nu-1…p-nam-11) **và** 22 sản phẩm Valentine (val-blush-1, val-kiss-1, …). Code hiện tại chỉ dùng **22 sản phẩm Thời trang** (PRODUCTS), trùng với backend nên thêm giỏ hoạt động bình thường.
