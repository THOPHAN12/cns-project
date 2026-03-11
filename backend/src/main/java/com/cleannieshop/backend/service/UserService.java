package com.cleannieshop.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.UserCartDTO;
import com.cleannieshop.backend.dto.UserRegisterDTO;
import com.cleannieshop.backend.dto.UserResponseDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.repository.WishlistRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private WishlistRepository wishlistRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public User saveUser(UserRegisterDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) return null;
        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setFullName(userDTO.getFullName());
        newUser.setRole("USER");
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(userDTO.getPassword());
        newUser.setPhoneNumber(userDTO.getPhoneNumber());
        newUser = userRepository.save(newUser);
        Cart newCart = new Cart();
        newCart.setDateCreated(new Date());
        newCart.setUser(newUser);
        newCart = cartRepository.save(newCart);
        newUser.setCart(newCart);
        Wishlist newWishlist = new Wishlist();
        newWishlist.setUser(newUser);
        newWishlist = wishlistRepository.save(newWishlist);
        newUser.setWishlist(newWishlist);
        return newUser;
    }

    public String generateToken(String username) {
        Map<String, Object> map = new HashMap<>();
        return Jwts.builder().claims(map).subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(secretKey).compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> fn) {
        Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
        return fn.apply(claims);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public UserResponseDTO getUserInfo(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        UserResponseDTO dto = new UserResponseDTO();
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole() != null ? user.getRole() : "USER");
        return dto;
    }

    public UserCartDTO getUserCartInfo(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getCart() == null) return null;
        UserCartDTO dto = new UserCartDTO();
        dto.setCartId(user.getCart().getCartId());
        return dto;
    }
}
