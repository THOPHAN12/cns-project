package com.cleannieshop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;

public interface CartHasProductRepository extends JpaRepository<CartHasProduct, CartHasProductKey> {
    @Query("SELECT chp FROM CartHasProduct chp JOIN FETCH chp.product WHERE chp.cart = :cart")
    List<CartHasProduct> findByCart(@Param("cart") Cart cart);
}
