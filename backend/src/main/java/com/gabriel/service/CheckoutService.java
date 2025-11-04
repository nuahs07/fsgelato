package com.gabriel.service;

import com.gabriel.dto.Purchase;
import com.gabriel.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}


