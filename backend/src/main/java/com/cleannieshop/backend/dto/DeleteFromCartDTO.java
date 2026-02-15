package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class DeleteFromCartDTO {
    private String cartId;
    private int quantity;
}
