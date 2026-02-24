package com.cleannieshop.backend.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.UserLoginResponseDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.repository.WishlistRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OAuthService {

    private static final String PROVIDER_GOOGLE = "GOOGLE";
    private static final String PROVIDER_FACEBOOK = "FACEBOOK";

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserService userService;

    @Value("${oauth.google.client-id:}")
    private String googleClientId;

    @Value("${oauth.facebook.app-id:}")
    private String facebookAppId;

    @Value("${oauth.facebook.app-secret:}")
    private String facebookAppSecret;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    /**
     * Xác thực Google ID token và trả về UserLoginResponseDTO (token + userId).
     */
    public UserLoginResponseDTO loginWithGoogle(String credential) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new RuntimeException("Google OAuth chưa được cấu hình. Thêm oauth.google.client-id vào .env");
        }
        try {
            com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier verifier =
                new com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier.Builder(
                    new com.google.api.client.http.javanet.NetHttpTransport(),
                    new com.google.api.client.json.gson.GsonFactory())
                    .setAudience(java.util.Collections.singletonList(googleClientId))
                    .build();
            com.google.api.client.googleapis.auth.oauth2.GoogleIdToken idToken = verifier.verify(credential);
            if (idToken == null) throw new RuntimeException("Token không hợp lệ");
            com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload payload = idToken.getPayload();

            String providerId = payload.getSubject();
            String email = payload.getEmail();
            String name = payload.get("name") != null ? (String) payload.get("name") : null;
            if (name == null) name = email != null ? email.split("@")[0] : "User";

            User user = findOrCreateOAuthUser(PROVIDER_GOOGLE, providerId, email, name);
            UserLoginResponseDTO res = new UserLoginResponseDTO();
            res.setToken(userService.generateToken(user.getUsername()));
            res.setUserId(user.getUserId());
            return res;
        } catch (Exception e) {
            throw new RuntimeException("Xác thực Google thất bại: " + e.getMessage());
        }
    }

    /**
     * Xác thực Facebook access token và trả về UserLoginResponseDTO (token + userId).
     */
    public UserLoginResponseDTO loginWithFacebook(String accessToken) {
        if (facebookAppId == null || facebookAppId.isBlank() || facebookAppSecret == null || facebookAppSecret.isBlank()) {
            throw new RuntimeException("Facebook OAuth chưa được cấu hình. Thêm oauth.facebook.app-id và oauth.facebook.app-secret vào .env");
        }
        try {
            // Verify token and get user info
            String url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken;
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException("Token Facebook không hợp lệ");
            }

            JsonNode node = objectMapper.readTree(response.body());
            String providerId = node.get("id").asText();
            String name = node.has("name") ? node.get("name").asText() : "User";
            String email = node.has("email") && !node.get("email").isNull() ? node.get("email").asText() : null;

            User user = findOrCreateOAuthUser(PROVIDER_FACEBOOK, providerId, email, name);
            UserLoginResponseDTO res = new UserLoginResponseDTO();
            res.setToken(userService.generateToken(user.getUsername()));
            res.setUserId(user.getUserId());
            return res;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Xác thực Facebook thất bại: " + e.getMessage());
        }
    }

    private User findOrCreateOAuthUser(String provider, String providerId, String email, String fullName) {
        var existing = userRepository.findByAuthProviderAndAuthProviderId(provider, providerId);
        if (existing.isPresent()) {
            return existing.get();
        }

        String username = provider.toLowerCase() + "_" + providerId;
        if (userRepository.findByUsername(username).isPresent()) {
            return userRepository.findByUsername(username).orElseThrow();
        }

        User user = new User();
        user.setUsername(username);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setRole("USER");
        user.setAuthProvider(provider);
        user.setAuthProviderId(providerId);
        user.setPassword(passwordEncoder.encode("oauth-" + provider.toLowerCase() + "-" + providerId));

        user = userRepository.save(user);

        Cart cart = new Cart();
        cart.setDateCreated(new Date());
        cart.setUser(user);
        cart = cartRepository.save(cart);

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist = wishlistRepository.save(wishlist);

        return user;
    }
}
