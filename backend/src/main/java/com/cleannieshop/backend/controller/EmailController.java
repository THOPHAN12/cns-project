package com.cleannieshop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.service.EmailService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("support-email")
    @Tag(name = "Support", description = "Gửi email hỗ trợ")
    public ResponseEntity<Boolean> sendEmail(@RequestBody String email) {
        if (email != null && email.length() >= 2 && email.startsWith("\""))
            email = email.substring(1, email.length() - 1);
        return new ResponseEntity<>(emailService.sendEmailTo(email), HttpStatus.CREATED);
    }
}
