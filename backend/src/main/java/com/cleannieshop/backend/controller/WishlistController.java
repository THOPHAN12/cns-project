package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.ProductDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.WishlistService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProductFromWishlist(@RequestParam String userId) {
        return new ResponseEntity<>(wishlistService.getProductFromWishlist(userId), HttpStatus.OK);
    }

    @PutMapping("product/{productId}")
    public ResponseEntity<String> addProductToWishlist(@PathVariable String productId, @RequestBody String userId) {
        if (userId.charAt(0) == '"') {
            userId = userId.substring(1, userId.length() - 1);
        }
        //TODO: process PUT request
        wishlistService.addProductToWishlist(productId, userId);

        return new ResponseEntity<>("Added to wishlist successfully", HttpStatus.OK);
    }
    
    @DeleteMapping("product/{productId}")
    public ResponseEntity<String> deleteProductFromWishlist(@PathVariable String productId, @RequestBody String userId) {
        //TODO: process PUT request
        if (userId.charAt(0) == '"') {
            userId = userId.substring(1, userId.length() - 1);
        }
        wishlistService.deleteProductFromWishlist(productId, userId);

        return new ResponseEntity<>("Delete from wishlist successfully", HttpStatus.OK);
    }
}
