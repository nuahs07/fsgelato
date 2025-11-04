package com.gabriel.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
public class Purchase {

    private String customerName;
    private String customerEmail;
    private String customerPhone;

    private String deliveryAddress;
    private String deliveryCity;
    private String deliveryNotes;
    private String pickupTime;

    private String deliveryOption;
    private String paymentMethod;
    private BigDecimal totalAmount;

    private Set<PurchaseItem> items;
}


