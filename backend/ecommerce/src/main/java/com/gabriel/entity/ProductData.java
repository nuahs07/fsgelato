package com.gabriel.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class ProductData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // This relationship is good, keep it.
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    // --- FIX: Renamed 'unit_price' to 'price' to match frontend model ---
    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    // --- NEW: Added to match frontend model ---
    @Column(name = "is_seasonal")
    private boolean isSeasonal;

    // --- NEW: Added to match frontend model ---
    @Column(name = "is_dairy_free")
    private boolean isDairyFree;

    // --- Removed SKU as it's not in the frontend model ---
    // @Column(name = "sku")
    // private String sku;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
}