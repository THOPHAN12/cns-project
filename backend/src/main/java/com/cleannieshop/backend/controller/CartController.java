package com.cleannieshop.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.CartProductDTO;
import com.cleannieshop.backend.service.CartService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("{id}")
    @Tag(name = "Cart", description = "Lấy giỏ hàng")
    public ResponseEntity<List<CartProductDTO>> getCart(@PathVariable String id) {
        return ResponseEntity.ok(cartService.getAllProducts(id));
    }
}
