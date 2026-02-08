package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    @Tag(name = "Get All Products", description = "Trả về tất cả các sản phẩm từ db")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @Tag(name = "Get Product By Id", description = "Trả về sản phẩm với id={id}")
    public ResponseEntity<Product> getMethodName(@PathVariable String id) {
        Product returnProduct = productService.getProductById(id);
        if (returnProduct != null) {
            return new ResponseEntity<>(returnProduct, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
}
