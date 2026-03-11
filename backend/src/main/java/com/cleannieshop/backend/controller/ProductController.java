package com.cleannieshop.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.AddToCartDTO;
import com.cleannieshop.backend.dto.DeleteFromCartDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    @Tag(name = "Products", description = "Danh sách sản phẩm")
    public ResponseEntity<List<Product>> getAll(@RequestParam(required = false) List<String> filter) {
        if (filter == null) return ResponseEntity.ok(productService.getProducts());
        return ResponseEntity.ok(productService.getProductsByFilter(filter));
    }

    @GetMapping("{id}")
    @Tag(name = "Products", description = "Chi tiết sản phẩm")
    public ResponseEntity<Product> getById(@PathVariable String id) {
        Product p = productService.getProductById(id);
        return p != null ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
    }

    @PutMapping("{id}")
    @Tag(name = "Cart", description = "Thêm vào giỏ")
    public ResponseEntity<String> addToCart(@PathVariable String id, @RequestBody AddToCartDTO dto) {
        if (id == null || id.isBlank() || dto == null || dto.getQuantity() <= 0
                || dto.getSize() == null || dto.getSize().trim().isEmpty()
                || dto.getCartId() == null || dto.getCartId().trim().isEmpty())
            return ResponseEntity.badRequest().build();
        return productService.addToCart(id, dto)
                ? ResponseEntity.ok("Added successfully")
                : ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed");
    }

    @DeleteMapping("{id}")
    @Tag(name = "Cart", description = "Xóa khỏi giỏ")
    public ResponseEntity<String> removeFromCart(@PathVariable String id, @RequestBody DeleteFromCartDTO dto) {
        return productService.deleteFromCart(id, dto)
                ? ResponseEntity.ok("Deleted successfully")
                : ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed");
    }
}
