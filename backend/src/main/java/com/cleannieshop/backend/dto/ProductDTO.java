package com.cleannieshop.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String id;
    private String productName;
    private double price;
    private List<String> sizes;
    private long stockQuantity;
    private List<String> categories;
    private String imageSrc; 
}