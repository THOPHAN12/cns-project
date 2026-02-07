package com.cleannieshop.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id).orElse(null);
    }
}
