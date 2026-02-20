package com.cleannieshop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.UserResponseDTO;
import com.cleannieshop.backend.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/user")
@CrossOrigin("http://localhost:5173")
public class UserInfoController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<UserResponseDTO> getMethodName(@RequestParam String userId) {
        UserResponseDTO response = userService.getUserInfo(userId);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
