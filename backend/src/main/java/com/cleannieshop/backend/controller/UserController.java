package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.UserLoginDTO;
import com.cleannieshop.backend.dto.UserLoginResponseDTO;
import com.cleannieshop.backend.dto.UserRegisterDTO;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.UserPrincipal;
import com.cleannieshop.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("auth")
@CrossOrigin("http://localhost:5173/")
public class UserController {
    @Autowired
    private UserService userService;
    private BCryptPasswordEncoder bEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private AuthenticationManager authenticationManager;
    


    @PostMapping("register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDTO userDTO) {
        //TODO: process POST request
        userDTO.setPassword(bEncoder.encode(userDTO.getPassword()));
        User newCreatedUser = userService.saveUser(userDTO);
        if (newCreatedUser != null) {
            return new ResponseEntity<>(newCreatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping("login")
    public ResponseEntity<UserLoginResponseDTO> loginUser(@RequestBody UserLoginDTO user) {
        //TODO: process POST request
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        // return authentication.isAuthenticated() ? 
        // new ResponseEntity<>(userService.generateToken(user.getUsername()), HttpStatus.ACCEPTED)
        // : new ResponseEntity<>("Login Failed", HttpStatus.OK);
        if (authentication.isAuthenticated()) {
            UserLoginResponseDTO responseDTO = new UserLoginResponseDTO();
            responseDTO.setToken(userService.generateToken(user.getUsername()));
            
            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

            responseDTO.setUserId(principal.getUser().getUserId());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }    
    
}
