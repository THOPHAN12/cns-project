package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.OAuthLoginRequestDTO;
import com.cleannieshop.backend.dto.UserLoginDTO;
import com.cleannieshop.backend.dto.UserLoginResponseDTO;
import com.cleannieshop.backend.dto.UserRegisterDTO;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.UserPrincipal;
import com.cleannieshop.backend.service.OAuthService;
import com.cleannieshop.backend.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

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



@RestController
@RequestMapping("auth")
@CrossOrigin("http://localhost:5173/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private OAuthService oAuthService;
    private BCryptPasswordEncoder bEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private AuthenticationManager authenticationManager;
    


    @PostMapping("register")
    @Tag(name = "Register New Account", description = "Đăng ký tài khoản mới")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterDTO userDTO) {
        userDTO.setPassword(bEncoder.encode(userDTO.getPassword()));
        User newCreatedUser = userService.saveUser(userDTO);
        if (newCreatedUser != null) {
            return new ResponseEntity<>(newCreatedUser, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(java.util.Map.of("message", "Tên tài khoản đã tồn tại"));
    }

    @PostMapping("login")
    @Tag(name = "Log In User", description = "Đăng nhập bằng tài khoản đã có")
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

    @PostMapping("google")
    @Tag(name = "Login with Google", description = "Đăng nhập bằng Google")
    public ResponseEntity<UserLoginResponseDTO> loginWithGoogle(@RequestBody OAuthLoginRequestDTO dto) {
        if (dto == null || dto.getCredential() == null || dto.getCredential().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            UserLoginResponseDTO res = oAuthService.loginWithGoogle(dto.getCredential());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("facebook")
    @Tag(name = "Login with Facebook", description = "Đăng nhập bằng Facebook")
    public ResponseEntity<UserLoginResponseDTO> loginWithFacebook(@RequestBody OAuthLoginRequestDTO dto) {
        if (dto == null || dto.getAccessToken() == null || dto.getAccessToken().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            UserLoginResponseDTO res = oAuthService.loginWithFacebook(dto.getAccessToken());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
