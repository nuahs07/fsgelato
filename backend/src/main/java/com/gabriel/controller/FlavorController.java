package com.gabriel.controller;

import com.gabriel.dto.GelatoFlavorDTO;
import com.gabriel.entity.Product;
import com.gabriel.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/flavors")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class FlavorController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<GelatoFlavorDTO>> getAllFlavors() {
        try {
            List<Product> products = productRepository.findAll();
            List<GelatoFlavorDTO> flavors = products.stream()
                    .map(product -> {
                        GelatoFlavorDTO dto = new GelatoFlavorDTO();
                        dto.setId(product.getId());
                        dto.setName(product.getName());
                        dto.setDescription(product.getDescription());
                        dto.setPrice(product.getPrice() != null ? product.getPrice().doubleValue() : 0.0);
                        dto.setImageUrl(product.getImageUrl());
                        dto.setCategory(product.getCategory() != null ? product.getCategory().getCategoryName() : null);
                        dto.setIsSeasonal(product.isSeasonal());
                        dto.setIsDairyFree(product.isDairyFree());
                        return dto;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(flavors);
        } catch (Exception ex) {
            log.error("Failed to retrieve flavors: {}", ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}

