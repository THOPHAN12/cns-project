package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("support-email")
    public ResponseEntity<Boolean> postMethodName(@RequestBody String email) {
        //TODO: process POST request
        return new ResponseEntity<>(emailService.sendEmailTo(email), HttpStatus.CREATED);
        
    }
    
}   
