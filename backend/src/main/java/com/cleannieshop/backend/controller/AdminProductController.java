package com.cleannieshop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.ProductDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/admin/products")
@Tag(name = "Admin Products", description = "Quản lý sản phẩm (ADMIN)")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO dto) {
        if (dto == null || dto.getId() == null || dto.getId().isBlank() || dto.getProductName() == null || dto.getProductName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (productService.getProductById(dto.getId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Product p = productService.createProduct(dto);
        return p != null ? ResponseEntity.status(HttpStatus.CREATED).body(p) : ResponseEntity.badRequest().build();
    }

    @PatchMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody ProductDTO dto) {
        if (dto == null) return ResponseEntity.badRequest().build();
        Product p = productService.updateProduct(id, dto);
        return p != null ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        return productService.deleteProduct(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
