package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.AddToCartDTO;
import com.cleannieshop.backend.dto.DeleteFromCartDTO;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.service.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    @Tag(name = "Get All Products", description = "Trả về tất cả các sản phẩm từ db")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) List<String> filter) {
        // return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
        if (filter == null) {
            return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
        }
        return new ResponseEntity<>(productService.getProductsByFilter(filter), HttpStatus.OK);
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
    
    @PutMapping("{id}")
    @Tag(name = "Add Product To Cart", description = "Thêm sản phẩm vào giỏ hàng")
    public ResponseEntity<String> addToCart(@PathVariable String id, @RequestBody AddToCartDTO addToCartDTO) {
        //TODO: process PUT request
        if (addToCartDTO.getQuantity() <= 0 || addToCartDTO.getSize() == "") {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (productService.addToCart(id, addToCartDTO)) {
            return new ResponseEntity<>("Added successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("The process is not done successfully", HttpStatus.NOT_ACCEPTABLE);
    }
    
    @DeleteMapping("{id}")
    @Tag(name = "Delete Product From Cart", description = "Xóa sản phẩm từ giỏ hàng")
    public ResponseEntity<String> removeFromCart(@PathVariable String id, @RequestBody DeleteFromCartDTO deleteFromCartDTO) {
        //TODO: process PUT request
        if (productService.deleteFromCart(id, deleteFromCartDTO)) {
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("The process is not done successfully", HttpStatus.NOT_ACCEPTABLE);
    }
}
