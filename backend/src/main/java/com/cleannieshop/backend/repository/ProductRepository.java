package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
    
}
