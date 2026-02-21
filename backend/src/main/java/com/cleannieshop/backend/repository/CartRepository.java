package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

}
