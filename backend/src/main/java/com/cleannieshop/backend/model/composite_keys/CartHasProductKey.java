package com.cleannieshop.backend.model.composite_keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartHasProductKey implements Serializable {
    @Column(name = "cart_id")
    private String cartId;
    @Column(name = "product_id")
    private String productId;
}
