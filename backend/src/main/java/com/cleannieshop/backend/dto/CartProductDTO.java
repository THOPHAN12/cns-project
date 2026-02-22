package com.cleannieshop.backend.dto;

import java.util.List;

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
    private String imageSrc;
    private double price;
    private int quantity;
    private List<String> sizes;
}
