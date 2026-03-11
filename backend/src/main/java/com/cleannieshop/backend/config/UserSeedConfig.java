package com.cleannieshop.backend.config;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.repository.WishlistRepository;

@Configuration
public class UserSeedConfig {
    private static final Logger log = LoggerFactory.getLogger(UserSeedConfig.class);
    private static final String DEFAULT_USERNAME = "admin";
    private static final String DEFAULT_PASSWORD = "CnsDev2026";

    @Bean
    CommandLineRunner seedDefaultUser(UserRepository userRepo, CartRepository cartRepo,
            WishlistRepository wishlistRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.findByUsername(DEFAULT_USERNAME).isPresent()) return;
            User user = new User();
            user.setUsername(DEFAULT_USERNAME);
            user.setPassword(encoder.encode(DEFAULT_PASSWORD));
            user.setFullName("Admin CNS");
            user.setEmail("admin@cns.local");
            user.setPhoneNumber("");
            user.setRole("ADMIN");
            user = userRepo.save(user);
            Cart cart = new Cart();
            cart.setDateCreated(new Date());
            cart.setUser(user);
            cart = cartRepo.save(cart);
            user.setCart(cart);
            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist = wishlistRepo.save(wishlist);
            user.setWishlist(wishlist);
            userRepo.save(user);
            log.info("User seed: đã tạo tài khoản admin username={}, password={}", DEFAULT_USERNAME, DEFAULT_PASSWORD);
        };
    }
}
