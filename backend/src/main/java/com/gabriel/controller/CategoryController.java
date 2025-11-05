package com.gabriel.controller;

import com.gabriel.model.ProductCategory;
import com.gabriel.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class CategoryController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getCategories() {
        try {
            List<ProductCategory> categories = productService.listProductCategories();
            log.info("Retrieved {} categories", categories.size());
            return ResponseEntity.ok(categories);
        } catch (Exception ex) {
            log.error("Failed to retrieve categories: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
