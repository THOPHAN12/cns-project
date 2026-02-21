package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.ProductDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import com.cleannieshop.backend.repository.ProductRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.repository.WishlistRepository;

import jakarta.transaction.Transactional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public List<ProductDTO> getProductFromWishlist(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        
        // Xử lý an toàn nếu user không tồn tại hoặc chưa có wishlist
        if (user == null || user.getWishlist() == null || user.getWishlist().getProducts() == null) {
            return new ArrayList<>();
        }

        // Lấy danh sách Product Entity
        List<Product> products = user.getWishlist().getProducts();

        // Chuyển đổi sang DTO ngay TRONG transaction
        return products.stream().map(product -> {
            // Việc gọi .getImageData() ở đây cực kỳ quan trọng
            // Nó buộc Postgres phải đọc LOB stream khi kết nối vẫn đang mở
            byte[] imageBytes = product.getImageData();

            return new ProductDTO(
                product.getId(),
                product.getProductName(),
                product.getPrice(),
                product.getSizes(),
                product.getStockQuantity(),
                product.getCategories(),
                imageBytes
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void addProductToWishlist(String productId, String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Wishlist wishlist = user.getWishlist();
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null)
            throw new Error("Cannot find product with id = " + productId);
        if (wishlist.getProducts().size() <= 0) {
            wishlist.setProducts(new ArrayList<>(Arrays.asList(product)));
        } else {
            if (wishlist.getProducts().contains(product)) {
                throw new Error("Product Exists");
            }
            wishlist.getProducts().add(product);
        }
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void deleteProductFromWishlist(String productId, String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Wishlist wishlist = user.getWishlist();
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null)
            return;
        wishlist.getProducts().remove(product);
        wishlistRepository.save(wishlist);
    }
}
