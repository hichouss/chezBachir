package com.bachir.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "store_info")
@Data
@NoArgsConstructor
public class StoreInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String address;

    private String phone;

    private String email;

    private String mapUrl;

    @Column(columnDefinition = "TEXT")
    private String openingHours;

    private String facebookUrl;

    private String instagramUrl;
}
