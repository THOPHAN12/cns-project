package com.cleannieshop.backend.dto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartProductDTO {
    private String id;
    private String name;
    @Lob
    private byte[] image;
    private double price;
    private int quantity;
}
