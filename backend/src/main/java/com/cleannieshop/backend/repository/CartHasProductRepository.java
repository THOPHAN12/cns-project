package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import java.util.List;


@Repository
public interface CartHasProductRepository extends JpaRepository<CartHasProduct, CartHasProductKey> {
    public List<CartHasProduct> findByCart(Cart cart);
}
