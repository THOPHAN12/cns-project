package com.cleannieshop.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    private String id;
    private String productName;
    private double price;
    private List<String> sizes;
    private long stockQuantity;
    @Lob
    private byte[] imageData;
    
    @OneToMany(mappedBy = "product")
    @JsonBackReference
    private List<CartHasProduct> cartHasProducts;
}
