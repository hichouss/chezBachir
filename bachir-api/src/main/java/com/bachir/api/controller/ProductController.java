package com.bachir.api.controller;

import com.bachir.api.dto.ProductDto;
import com.bachir.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDto> getAvailable() {
        return productService.findAllAvailable();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProductDto> getAll() {
        return productService.findAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductDto> getByCategory(@PathVariable Long categoryId) {
        return productService.findByCategory(categoryId);
    }

    @GetMapping("/promotions")
    public List<ProductDto> getPromotions() {
        return productService.findPromotions();
    }

    @GetMapping("/search")
    public List<ProductDto> search(@RequestParam String keyword) {
        return productService.search(keyword);
    }

    @GetMapping("/{id}")
    public ProductDto getById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ProductDto create(@RequestBody ProductDto dto) {
        return productService.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ProductDto update(@PathVariable Long id, @RequestBody ProductDto dto) {
        return productService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
