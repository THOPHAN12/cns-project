package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class AddToCartDTO {
    private String cartId;
    private int quantity;
    private String size;
}
