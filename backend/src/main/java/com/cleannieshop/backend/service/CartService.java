package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.dto.CartProductDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.CartRepository;

@Service
public class CartService {
    @Autowired
    private CartHasProductRepository cartHasProductRepository;
    @Autowired
    private CartRepository cartRepository;

    @Transactional(readOnly = true)
    public List<CartProductDTO> getAllProducts(String cartId) {
        if (cartId == null || cartId.isBlank()) return new ArrayList<>();
        Cart cart = cartRepository.findById(cartId).orElse(null);
        if (cart == null) return new ArrayList<>();
        List<CartHasProduct> items = cartHasProductRepository.findByCart(cart);
        List<CartProductDTO> res = new ArrayList<>();
        for (CartHasProduct chp : items) {
            Product p = chp.getProduct();
            CartProductDTO dto = new CartProductDTO();
            dto.setId(p.getId());
            dto.setImageSrc(p.getImageSrc());
            dto.setName(p.getProductName());
            dto.setPrice(p.getPrice());
            dto.setQuantity(chp.getQuantity());
            dto.setSizes(chp.getSizes());
            res.add(dto);
        }
        return res;
    }
}
