package com.cleannieshop.backend.service;

import java.security.Key;
// import java.security.Key;
// import java.security.NoSuchAlgorithmException;
// import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.UserRegisterDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;

    private SecretKey secretKey;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private SecretKey generateSecretKey() {
        secretKey = Jwts.SIG.HS256.key().build();
        return secretKey;
    }

    public User saveUser(UserRegisterDTO userDTO) {
        if (userRepository.findById(userDTO.getUsername()).isPresent()) {
            return null;
        }
        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setFullName(userDTO.getFullName());
        newUser.setRole("USER");
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(userDTO.getPassword());
        Cart newCart = new Cart();
        newCart.setDateCreated(new Date());
        newCart = cartRepository.save(newCart);
        newUser.setCartId(newCart);
        return userRepository.save(newUser);
    }

    public String generateToken(String username) {
        // TODO Auto-generated method stub
        Map<String, Object> map = new HashMap<>();

        return Jwts.builder()
                .claims(map)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*30))
                .signWith(generateSecretKey())
                .compact();

    }

    public String extractUsername(String token) {
        // TODO Auto-generated method stub
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolvers) {
        final Claims claims = Jwts.parser()
                                .verifyWith(secretKey)
                                .build()
                                .parseSignedClaims(token).getPayload();
        return claimResolvers.apply(claims);
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        // TODO Auto-generated method stub
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        // TODO Auto-generated method stub
        return extractClaim(token, Claims::getExpiration).before(new Date()); // get expiration claim from the token
    }


}
