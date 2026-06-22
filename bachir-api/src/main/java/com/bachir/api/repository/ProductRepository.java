package com.bachir.api.repository;

import com.bachir.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIdAndAvailableTrue(Long categoryId);
    List<Product> findByAvailableTrue();
    List<Product> findByIsPromotionTrueAndAvailableTrue();

    @Query("SELECT p FROM Product p WHERE p.available = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Product> searchByKeyword(String keyword);

    @Query("SELECT p.name, COUNT(oi) as orderCount FROM OrderItem oi JOIN oi.product p " +
           "GROUP BY p.name ORDER BY orderCount DESC")
    List<Object[]> findTopSoldProducts();
}
