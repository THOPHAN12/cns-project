package com.cleannieshop.backend.model;

import java.util.List;

import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @JsonManagedReference
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne
    @MapsId("cartId")
    @JsonManagedReference
    @JoinColumn(name = "cart_id")
    private Cart cart;

    private int quantity;
    private List<String> sizes;
}
