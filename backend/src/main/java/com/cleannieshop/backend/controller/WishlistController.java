package com.cleannieshop.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.ProductDTO;
import com.cleannieshop.backend.service.WishlistService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/wishlist")
@Tag(name = "Wishlist", description = "Danh sách yêu thích")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> get(@RequestParam String userId) {
        return ResponseEntity.ok(wishlistService.getProductFromWishlist(userId));
    }

    @PutMapping("product/{productId}")
    public ResponseEntity<String> add(@PathVariable String productId, @RequestBody String userId) {
        if (userId != null && userId.length() >= 2 && userId.charAt(0) == '"')
            userId = userId.substring(1, userId.length() - 1);
        try {
            wishlistService.addProductToWishlist(productId, userId);
            return ResponseEntity.ok("Added to wishlist successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("product/{productId}")
    public ResponseEntity<String> remove(@PathVariable String productId, @RequestBody String userId) {
        if (userId != null && userId.length() >= 2 && userId.charAt(0) == '"')
            userId = userId.substring(1, userId.length() - 1);
        wishlistService.deleteProductFromWishlist(productId, userId);
        return ResponseEntity.ok("Deleted from wishlist successfully");
    }
}
