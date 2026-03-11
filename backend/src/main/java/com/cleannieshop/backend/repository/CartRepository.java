package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {
}
