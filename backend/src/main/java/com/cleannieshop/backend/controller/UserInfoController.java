package com.cleannieshop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.UserCartDTO;
import com.cleannieshop.backend.dto.UserResponseDTO;
import com.cleannieshop.backend.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/user")
@CrossOrigin("http://localhost:5173")
public class UserInfoController {
    @Autowired
    private UserService userService;

    @GetMapping
    @Tag(name = "Get User Data Information", description = "Lấy data từ người dùng với userId")
    public ResponseEntity<UserResponseDTO> getUserInfo(@RequestParam String userId) {
        UserResponseDTO response = userService.getUserInfo(userId);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("cart")
    @Tag(name = "Get User's Cart Id", description = "Lấy mã giỏ hàng của user với userId")
    public ResponseEntity<UserCartDTO> getCartId(@RequestParam String userId) {
        UserCartDTO response = userService.getUserCartInfo(userId);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
