package com.cleannieshop.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.service.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/seed")
@CrossOrigin(origins = "http://localhost:5173")
public class SeedController {

    @Autowired
    private ProductService productService;

    @GetMapping("products")
    @Tag(name = "Seed Products", description = "Thêm 22 sản phẩm HÌNH ẢNH SẢN PHẨM vào DB nếu chưa có.")
    public ResponseEntity<Map<String, Object>> seedProducts() {
        try {
            int added = productService.seedProductsIfMissing();
            return ResponseEntity.ok(Map.of(
                "message", added > 0 ? "Đã thêm " + added + " sản phẩm vào hệ thống." : "Tất cả sản phẩm đã có sẵn.",
                "added", added
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Lỗi khi thêm sản phẩm: " + e.getMessage(),
                "added", 0
            ));
        }
    }
}
