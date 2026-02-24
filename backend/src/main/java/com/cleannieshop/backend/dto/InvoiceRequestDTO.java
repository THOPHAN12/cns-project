package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class InvoiceRequestDTO {
    private String userId;
    private String customerFullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String payMethodOption;
    private String cartId;
    private double totalPrice;
}
