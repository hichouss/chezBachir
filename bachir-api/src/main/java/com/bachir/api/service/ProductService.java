package com.bachir.api.service;

import com.bachir.api.dto.ProductDto;
import com.bachir.api.entity.Category;
import com.bachir.api.entity.Product;
import com.bachir.api.repository.CategoryRepository;
import com.bachir.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductDto> findAll() {
        return productRepository.findAll().stream().map(this::toDto).toList();
    }

    public List<ProductDto> findAllAvailable() {
        return productRepository.findByAvailableTrue().stream().map(this::toDto).toList();
    }

    public List<ProductDto> findByCategory(Long categoryId) {
        return productRepository.findByCategoryIdAndAvailableTrue(categoryId).stream().map(this::toDto).toList();
    }

    public List<ProductDto> findPromotions() {
        return productRepository.findByIsPromotionTrueAndAvailableTrue().stream().map(this::toDto).toList();
    }

    public List<ProductDto> search(String keyword) {
        return productRepository.searchByKeyword(keyword).stream().map(this::toDto).toList();
    }

    public ProductDto findById(Long id) {
        return toDto(findEntityById(id));
    }

    @Transactional
    public ProductDto create(ProductDto dto) {
        Product product = new Product();
        applyDto(product, dto);
        return toDto(productRepository.save(product));
    }

    @Transactional
    public ProductDto update(Long id, ProductDto dto) {
        Product product = findEntityById(id);
        applyDto(product, dto);
        return toDto(productRepository.save(product));
    }

    @Transactional
    public void delete(Long id) {
        productRepository.delete(findEntityById(id));
    }

    private void applyDto(Product product, ProductDto dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setUnit(dto.getUnit() != null ? dto.getUnit() : "kg");
        product.setImageUrl(dto.getImageUrl());
        product.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        product.setIsPromotion(dto.getIsPromotion() != null ? dto.getIsPromotion() : false);
        product.setOriginalPrice(dto.getOriginalPrice());
        if (dto.getCategoryId() != null) {
            Category cat = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new NoSuchElementException("Catégorie introuvable : " + dto.getCategoryId()));
            product.setCategory(cat);
        }
    }

    private Product findEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Produit introuvable : " + id));
    }

    ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setUnit(p.getUnit());
        dto.setImageUrl(p.getImageUrl());
        dto.setAvailable(p.getAvailable());
        dto.setIsPromotion(p.getIsPromotion());
        dto.setOriginalPrice(p.getOriginalPrice());
        dto.setCategoryId(p.getCategory().getId());
        dto.setCategoryName(p.getCategory().getName());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }
}
