package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.CartProductDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {
    @Autowired
    private CartHasProductRepository cartHasProductRepository;
    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public List<CartProductDTO> getAllProducts(String id) {
        // TODO Auto-generated method stub
        Cart cart = cartRepository.findById(id).orElse(null);
        if (cart == null) {
            return null;
        }
        List<CartHasProduct> cartHasProducts = cartHasProductRepository.findByCart(cart);
        List<CartProductDTO> res = new ArrayList<>();
        for (CartHasProduct cartHasProduct : cartHasProducts) {
            Product product = cartHasProduct.getProduct();
            CartProductDTO e = new CartProductDTO();
            e.setId(product.getId());
            e.setImage(product.getImageData());
            e.setName(product.getProductName());
            e.setPrice(product.getPrice());
            e.setQuantity(cartHasProduct.getQuantity());
            e.setSizes(cartHasProduct.getSizes());
            res.add(e);
        }
        return res;
    }
    
}
