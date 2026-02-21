package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Product> getProductFromWishlist(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user.getWishlist().getProducts();
    }

    public void addProductToWishlist(String productId, String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Wishlist wishlist = user.getWishlist();
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null)
            return;
        if (wishlist.getProducts().size() <= 0) {
            wishlist.setProducts(new ArrayList<>(Arrays.asList(product)));
        } else {
            wishlist.getProducts().add(product);
        }
        wishlistRepository.save(wishlist);
    }
}
