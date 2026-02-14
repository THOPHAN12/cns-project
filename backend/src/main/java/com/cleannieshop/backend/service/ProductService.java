package com.cleannieshop.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    public boolean addToCart(String id, String cartId) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            return false;
        }
        cart.addProductToCart(product);
        cartRepository.save(cart);
        return true;
    }


    @Transactional
    public boolean deleteFromCart(String id, String cartId) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            return false;
        }
        cart.removeProductFromCart(product);
        cartRepository.save(cart);
        return true;
    }
}
