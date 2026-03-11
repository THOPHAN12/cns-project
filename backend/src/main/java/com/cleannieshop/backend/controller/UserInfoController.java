package com.cleannieshop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.UserCartDTO;
import com.cleannieshop.backend.dto.UserResponseDTO;
import com.cleannieshop.backend.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/user")
public class UserInfoController {
    @Autowired
    private UserService userService;

    @GetMapping
    @Tag(name = "User", description = "Thông tin user")
    public ResponseEntity<UserResponseDTO> getInfo(@RequestParam String userId) {
        UserResponseDTO dto = userService.getUserInfo(userId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("cart")
    @Tag(name = "User", description = "Cart ID của user")
    public ResponseEntity<UserCartDTO> getCartId(@RequestParam String userId) {
        UserCartDTO dto = userService.getUserCartInfo(userId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
