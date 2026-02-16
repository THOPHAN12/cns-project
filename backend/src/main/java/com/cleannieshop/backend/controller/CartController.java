package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.CartProductDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.CartService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    @Autowired
    private CartService cartService;


    @GetMapping("{id}")
    @Tag(name = "Get all product of a cart", description = "Trả về danh sách tất cả các sản phẩm trong giỏ hàng có id={id}")
    public ResponseEntity<List<CartProductDTO>> getCart(@PathVariable String id) {
        return new ResponseEntity<>(cartService.getAllProducts(id), HttpStatus.OK);
    }
    
}
