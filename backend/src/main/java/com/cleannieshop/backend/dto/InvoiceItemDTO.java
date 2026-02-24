package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class InvoiceItemDTO {
    private String productId;
    private String productName;
    private String imageSrc;
    private double price;
    private int quantity;
}
