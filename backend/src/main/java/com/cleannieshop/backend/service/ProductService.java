package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.AddToCartDTO;
import com.cleannieshop.backend.dto.DeleteFromCartDTO;
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

    public List<Product> getProductsByFilter(List<String> filterStrings) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> result = allProducts.stream()
        .filter(e -> e.getCategories().containsAll(filterStrings))
        .toList();
        return result;
    }

    public Product getProductById(String id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    public boolean addToCart(String id, AddToCartDTO addToCartDTO) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(addToCartDTO.getCartId()).orElse(null);
        if (cart == null) {
            return false;
        }
        // cart.addProductToCart(product);
        // cartRepository.save(cart);
        CartHasProductKey key = new CartHasProductKey(addToCartDTO.getCartId(), id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            cartHasProduct = new CartHasProduct(key, product, cart, addToCartDTO.getQuantity(), Arrays.asList(addToCartDTO.getSize()));
        } else {
            cartHasProduct.setQuantity(cartHasProduct.getQuantity() + addToCartDTO.getQuantity());
            for (int i=0; i<addToCartDTO.getQuantity(); i++) {
                cartHasProduct.getSizes().add(addToCartDTO.getSize());
            }
        }
        cartHasProductRepository.save(cartHasProduct);
        // product.setStockQuantity(product.getStockQuantity() - 1);
        // productRepository.save(product);
        return true;
    }


    @Transactional
    public boolean deleteFromCart(String id, DeleteFromCartDTO deleteFromCartDTO) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(deleteFromCartDTO.getCartId()).orElse(null);
        if (cart == null) {
            return false;
        }
        CartHasProductKey key = new CartHasProductKey(deleteFromCartDTO.getCartId(), id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            return false;
        } else {
            if (cartHasProduct.getQuantity() > 1){
                int remainingQuantity = cartHasProduct.getQuantity() - deleteFromCartDTO.getQuantity();
                if (remainingQuantity >= 1) {
                    cartHasProduct.setQuantity(remainingQuantity);
                    cartHasProductRepository.save(cartHasProduct);
                } else {
                    cartHasProductRepository.deleteById(key);
                }                
                
            }
            else 
                cartHasProductRepository.deleteById(key);
            // product.setStockQuantity(product.getStockQuantity() + 1);
            // productRepository.save(product);
            return true;
        }
    }
}
