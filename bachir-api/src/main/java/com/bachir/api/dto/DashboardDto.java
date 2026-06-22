package com.bachir.api.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DashboardDto {
    private long totalOrders;
    private long pendingOrders;
    private long preparingOrders;
    private long readyOrders;
    private long todayOrders;
    private double totalRevenue;
    private long totalProducts;
    private long totalCategories;
    private List<Map<String, Object>> topProducts;
}
