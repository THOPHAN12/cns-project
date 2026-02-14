package com.cleannieshop.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartHasProductRepository cartHasProductRepository;

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
        // cart.addProductToCart(product);
        // cartRepository.save(cart);
        CartHasProductKey key = new CartHasProductKey(cartId, id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            cartHasProduct = new CartHasProduct(key, product, cart, 1);
        } else {
            cartHasProduct.setQuantity(cartHasProduct.getQuantity() + 1);
        }
        cartHasProductRepository.save(cartHasProduct);
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
        CartHasProductKey key = new CartHasProductKey(cartId, id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            return false;
        } else {
            if (cartHasProduct.getQuantity() > 1){
                cartHasProduct.setQuantity(cartHasProduct.getQuantity() - 1);
                cartHasProductRepository.save(cartHasProduct);
            }
            cartHasProductRepository.deleteById(key);
            return true;
        }
    }
}
