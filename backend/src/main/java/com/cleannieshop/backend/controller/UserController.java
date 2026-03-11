package com.cleannieshop.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

@RestController
@RequestMapping("auth")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private OAuthService oAuthService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("register")
    @Tag(name = "Register", description = "Đăng ký tài khoản mới")
    public ResponseEntity<?> register(@RequestBody UserRegisterDTO dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = userService.saveUser(dto);
        if (user != null) return ResponseEntity.ok(user);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("message", "Tên tài khoản đã tồn tại"));
    }

    @PostMapping("login")
    @Tag(name = "Login", description = "Đăng nhập")
    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginDTO dto) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        if (auth.isAuthenticated()) {
            UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
            UserLoginResponseDTO res = new UserLoginResponseDTO();
            res.setToken(userService.generateToken(dto.getUsername()));
            res.setUserId(principal.getUser().getUserId());
            res.setRole(principal.getUser().getRole() != null ? principal.getUser().getRole() : "USER");
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("google")
    @Tag(name = "Google OAuth", description = "Đăng nhập Google")
    public ResponseEntity<UserLoginResponseDTO> google(@RequestBody OAuthLoginRequestDTO dto) {
        if (dto == null || dto.getCredential() == null || dto.getCredential().isBlank())
            return ResponseEntity.badRequest().build();
        try {
            return ResponseEntity.ok(oAuthService.loginWithGoogle(dto.getCredential()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("facebook")
    @Tag(name = "Facebook OAuth", description = "Đăng nhập Facebook")
    public ResponseEntity<UserLoginResponseDTO> facebook(@RequestBody OAuthLoginRequestDTO dto) {
        if (dto == null || dto.getAccessToken() == null || dto.getAccessToken().isBlank())
            return ResponseEntity.badRequest().build();
        try {
            return ResponseEntity.ok(oAuthService.loginWithFacebook(dto.getAccessToken()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
