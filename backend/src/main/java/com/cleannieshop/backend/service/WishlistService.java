package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.dto.ProductDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import com.cleannieshop.backend.repository.ProductRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductFromWishlist(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getWishlist() == null || user.getWishlist().getProducts() == null) {
            return new ArrayList<>();
        }
        return user.getWishlist().getProducts().stream().map(p -> new ProductDTO(
                p.getId(), p.getProductName(), p.getPrice(), p.getSizes(),
                p.getStockQuantity(), p.getCategories(), p.getImageSrc())).toList();
    }

    @Transactional
    public void addProductToWishlist(String productId, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Wishlist wishlist = user.getWishlist();
        if (wishlist == null) {
            wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist = wishlistRepository.save(wishlist);
            user.setWishlist(wishlist);
            userRepository.save(user);
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found: " + productId));
        if (wishlist.getProducts() == null || wishlist.getProducts().isEmpty()) {
            wishlist.setProducts(new ArrayList<>(Arrays.asList(product)));
        } else {
            if (wishlist.getProducts().contains(product)) throw new RuntimeException("Product already in wishlist");
            wishlist.getProducts().add(product);
        }
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void deleteProductFromWishlist(String productId, String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getWishlist() == null) return;
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return;
        Wishlist wishlist = user.getWishlist();
        wishlist.getProducts().remove(product);
        wishlistRepository.save(wishlist);
    }
}
