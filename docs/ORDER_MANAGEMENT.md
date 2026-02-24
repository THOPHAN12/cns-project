# Quản lý đơn hàng (Order Management)

## Luồng khi khách đặt hàng thành công

1. **Frontend** (CheckoutPage) gọi `POST /api/invoice` với:
   - `userId` (từ Cookie)
   - `customerFullName`, `email`, `phoneNumber`, `address`
   - `payMethodOption` (COD | BANK_TRANSFER)
   - `cartId`, `totalPrice`

2. **Backend** (InvoiceService.createInvoice):
   - Tạo bản ghi **Invoice** (trạng thái mặc định: **PENDING**)
   - Liên kết với **User** nếu có userId
   - Tạo **InvoiceHasProduct** cho từng sản phẩm trong giỏ
   - **Giảm tồn kho** (Product.stockQuantity)
   - **Xóa sản phẩm khỏi giỏ hàng**

---

## Trạng thái đơn hàng (Order Status)

| Status      | Ý nghĩa                    |
|-------------|----------------------------|
| PENDING     | Chờ xác nhận               |
| CONFIRMED   | Đã xác nhận                |
| SHIPPING    | Đang giao hàng             |
| DELIVERED   | Đã giao hàng               |
| CANCELLED   | Đã hủy                     |

---

## API Quản lý

### 1. Lấy tất cả đơn hàng (Admin)
```
GET /api/invoice
```
Trả về danh sách đơn hàng, sắp xếp theo ngày tạo (mới nhất trước).

### 2. Chi tiết đơn hàng
```
GET /api/invoice/{invoiceId}
```

### 3. Cập nhật trạng thái
```
PATCH /api/invoice/{invoiceId}/status
Content-Type: application/json
Body: { "status": "CONFIRMED" }
```
Các giá trị: `CONFIRMED`, `SHIPPING`, `DELIVERED`, `CANCELLED`

### 4. Lịch sử đơn hàng của user
```
GET /api/invoice/user/{userId}
```

---

## Database

- **Invoice**: `invoice_id`, `customer_full_name`, `email`, `phone_number`, `address`, `pay_method_option`, `date_created`, `total_price`, `status`, `user_id`
- **InvoiceHasProduct**: `invoice_id`, `product_id`, `quantity`, `sizes`

Với `spring.jpa.hibernate.ddl-auto=update`, cột `status` sẽ được thêm tự động khi chạy backend.
