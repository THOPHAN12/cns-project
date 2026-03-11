package com.cleannieshop.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class InvoiceItemDTO {
    private String productId;
    private String productName;
    private String imageSrc;
    private double price;
    private int quantity;
    private List<String> sizes;
    /** Size hiển thị: lấy từ sizes đã chọn hoặc fallback từ product */
    private String size;
}
