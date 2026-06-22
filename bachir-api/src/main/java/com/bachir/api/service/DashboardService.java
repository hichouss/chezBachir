package com.bachir.api.service;

import com.bachir.api.dto.DashboardDto;
import com.bachir.api.entity.Order;
import com.bachir.api.repository.CategoryRepository;
import com.bachir.api.repository.OrderRepository;
import com.bachir.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DashboardDto getStats() {
        DashboardDto dto = new DashboardDto();
        dto.setTotalOrders(orderRepository.count());
        dto.setPendingOrders(orderRepository.countByStatus(Order.Status.PENDING));
        dto.setPreparingOrders(orderRepository.countByStatus(Order.Status.PREPARING));
        dto.setReadyOrders(orderRepository.countByStatus(Order.Status.READY));
        dto.setTodayOrders(orderRepository.countOrdersSince(LocalDateTime.now().toLocalDate().atStartOfDay()));
        Double revenue = orderRepository.sumTotalRevenue();
        dto.setTotalRevenue(revenue != null ? revenue : 0.0);
        dto.setTotalProducts(productRepository.count());
        dto.setTotalCategories(categoryRepository.count());

        List<Object[]> topSold = productRepository.findTopSoldProducts();
        List<Map<String, Object>> topProducts = new ArrayList<>();
        for (int i = 0; i < Math.min(5, topSold.size()); i++) {
            Object[] row = topSold.get(i);
            topProducts.add(Map.of("name", row[0], "count", row[1]));
        }
        dto.setTopProducts(topProducts);
        return dto;
    }
}
