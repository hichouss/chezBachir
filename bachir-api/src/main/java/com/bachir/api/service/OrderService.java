package com.bachir.api.service;

import com.bachir.api.dto.OrderDto;
import com.bachir.api.dto.OrderRequest;
import com.bachir.api.entity.Order;
import com.bachir.api.entity.OrderItem;
import com.bachir.api.entity.Product;
import com.bachir.api.repository.OrderRepository;
import com.bachir.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<OrderDto> findAll() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(this::toDto).toList();
    }

    public List<OrderDto> findByStatus(String status) {
        Order.Status s = Order.Status.valueOf(status.toUpperCase());
        return orderRepository.findByStatus(s).stream().map(this::toDto).toList();
    }

    public OrderDto findById(Long id) {
        return toDto(findEntityById(id));
    }

    @Transactional
    public OrderDto create(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setNotes(request.getNotes());

        BigDecimal total = BigDecimal.ZERO;
        for (var itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new NoSuchElementException("Produit introuvable : " + itemReq.getProductId()));
            if (!product.getAvailable()) {
                throw new IllegalStateException("Le produit n'est pas disponible : " + product.getName());
            }
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(product.getPrice());
            item.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
            order.getItems().add(item);
            total = total.add(item.getSubtotal());
        }
        order.setTotalAmount(total);
        return toDto(orderRepository.save(order));
    }

    @Transactional
    public OrderDto updateStatus(Long id, String status) {
        Order order = findEntityById(id);
        order.setStatus(Order.Status.valueOf(status.toUpperCase()));
        return toDto(orderRepository.save(order));
    }

    @Transactional
    public void delete(Long id) {
        orderRepository.delete(findEntityById(id));
    }

    private Order findEntityById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Commande introuvable : " + id));
    }

    private OrderDto toDto(Order o) {
        OrderDto dto = new OrderDto();
        dto.setId(o.getId());
        dto.setCustomerName(o.getCustomerName());
        dto.setCustomerPhone(o.getCustomerPhone());
        dto.setCustomerEmail(o.getCustomerEmail());
        dto.setNotes(o.getNotes());
        dto.setStatus(o.getStatus().name());
        dto.setTotalAmount(o.getTotalAmount());
        dto.setCreatedAt(o.getCreatedAt());
        dto.setUpdatedAt(o.getUpdatedAt());
        dto.setItems(o.getItems().stream().map(item -> {
            OrderDto.OrderItemDto i = new OrderDto.OrderItemDto();
            i.setId(item.getId());
            i.setProductId(item.getProduct().getId());
            i.setProductName(item.getProduct().getName());
            i.setQuantity(item.getQuantity());
            i.setUnitPrice(item.getUnitPrice());
            i.setSubtotal(item.getSubtotal());
            return i;
        }).toList());
        return dto;
    }
}
