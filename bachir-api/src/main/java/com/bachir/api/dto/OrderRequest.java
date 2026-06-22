package com.bachir.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotBlank
    private String customerName;

    @NotBlank
    private String customerPhone;

    private String customerEmail;

    private String notes;

    @Valid
    @NotEmpty
    private List<OrderItemRequest> items;
}
