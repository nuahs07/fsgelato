package com.gabriel.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", precision = 19, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_seasonal", nullable = false)
    private boolean isSeasonal;

    @Column(name = "is_dairy_free", nullable = false)
    private boolean isDairyFree;

    @Column(name = "units_in_stock")
    private Integer unitsInStock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
}


