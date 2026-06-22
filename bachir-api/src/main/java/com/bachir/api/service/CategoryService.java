package com.bachir.api.service;

import com.bachir.api.dto.CategoryDto;
import com.bachir.api.entity.Category;
import com.bachir.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream().map(this::toDto).toList();
    }

    public List<CategoryDto> findAllActive() {
        return categoryRepository.findByActiveTrueOrderByDisplayOrderAsc().stream().map(this::toDto).toList();
    }

    public CategoryDto findById(Long id) {
        return toDto(findEntityById(id));
    }

    @Transactional
    public CategoryDto create(CategoryDto dto) {
        if (categoryRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà");
        }
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        category.setActive(dto.getActive() != null ? dto.getActive() : true);
        return toDto(categoryRepository.save(category));
    }

    @Transactional
    public CategoryDto update(Long id, CategoryDto dto) {
        Category category = findEntityById(id);
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : category.getDisplayOrder());
        category.setActive(dto.getActive() != null ? dto.getActive() : category.getActive());
        return toDto(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        categoryRepository.delete(findEntityById(id));
    }

    private Category findEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Catégorie introuvable : " + id));
    }

    private CategoryDto toDto(Category c) {
        CategoryDto dto = new CategoryDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setDescription(c.getDescription());
        dto.setImageUrl(c.getImageUrl());
        dto.setDisplayOrder(c.getDisplayOrder());
        dto.setActive(c.getActive());
        dto.setProductCount(c.getProducts().size());
        return dto;
    }
}
