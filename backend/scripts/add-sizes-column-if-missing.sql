-- Chạy script này nếu bảng invoice_has_product chưa có cột sizes
-- PostgreSQL
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'invoice_has_product' AND column_name = 'sizes'
  ) THEN
    ALTER TABLE invoice_has_product ADD COLUMN sizes text DEFAULT '[]';
  END IF;
END $$;

-- Cập nhật các dòng đã có: nếu sizes rỗng hoặc null thì dùng size mặc định
UPDATE invoice_has_product 
SET sizes = '["M"]' 
WHERE sizes IS NULL OR TRIM(sizes) = '' OR sizes = '[]';
