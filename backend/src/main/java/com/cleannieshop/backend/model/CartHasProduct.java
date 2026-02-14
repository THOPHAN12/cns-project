package com.cleannieshop.backend.model;

import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "cart-has-product")
@AllArgsConstructor
@NoArgsConstructor
public class CartHasProduct {
    @EmbeddedId
    private CartHasProductKey cartHasProductKey;

    @ManyToOne
    @MapsId("productId")
    @JsonBackReference
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne
    @MapsId("cartId")
    @JsonBackReference
    @JoinColumn(name = "cart_id")
    private Cart cart;

    private int quantity;
}
