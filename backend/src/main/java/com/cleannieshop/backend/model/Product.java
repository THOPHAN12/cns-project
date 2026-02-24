package com.cleannieshop.backend.model;

import java.util.List;

import com.cleannieshop.backend.config.StringListConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> sizes;
    private long stockQuantity;
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> categories;
    private String imageSrc;
    
    @OneToMany(mappedBy = "product")
    @JsonBackReference
    private List<CartHasProduct> cartHasProducts;

    @OneToMany(mappedBy = "product")
    @JsonBackReference
    private List<InvoiceHasProduct> invoiceHasProducts;

    @ManyToMany(mappedBy = "products")
    @JsonBackReference
    private List<Wishlist> wishlists;
}
