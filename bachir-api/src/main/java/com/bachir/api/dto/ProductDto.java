package com.bachir.api.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String unit;
    private String imageUrl;
    private Boolean available;
    private Boolean isPromotion;
    private BigDecimal originalPrice;
    private Long categoryId;
    private String categoryName;
    private LocalDateTime createdAt;
}
