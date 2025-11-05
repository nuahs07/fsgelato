package com.gabriel.serviceimpl;

import com.gabriel.dto.Purchase;
import com.gabriel.dto.PurchaseItem;
import com.gabriel.dto.PurchaseResponse;
import com.gabriel.entity.Customer;
import com.gabriel.entity.Order;
import com.gabriel.entity.OrderItem;
import com.gabriel.entity.Product;
import com.gabriel.repository.CustomerRepository;
import com.gabriel.repository.OrderRepository;
import com.gabriel.repository.ProductRepository;
import com.gabriel.service.CheckoutService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository,
                               OrderRepository orderRepository,
                               ProductRepository productRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = new Order();
        String tracking = UUID.randomUUID().toString();
        order.setOrderTrackingNumber(tracking);
        order.setStatus("NEW");

        order.setDeliveryOption(purchase.getDeliveryOption());
        order.setPaymentMethod(purchase.getPaymentMethod());
        order.setDeliveryAddress(purchase.getDeliveryAddress());
        order.setDeliveryCity(purchase.getDeliveryCity());
        order.setDeliveryNotes(purchase.getDeliveryNotes());
        order.setPickupTime(purchase.getPickupTime());

        BigDecimal total = purchase.getTotalAmount() == null ? BigDecimal.ZERO : purchase.getTotalAmount();
        order.setTotalPrice(total);

        int totalQty = 0;
        if (purchase.getItems() != null) {
            for (PurchaseItem pi : purchase.getItems()) {
                OrderItem oi = new OrderItem();
                oi.setProductId(pi.getProductId());

                int qty = pi.getQuantity();
                oi.setQuantity(qty);
                totalQty += qty;

                BigDecimal unitPrice = BigDecimal.ZERO;
                if (pi.getProductId() != null) {
                    Optional<Product> p = productRepository.findById(pi.getProductId());
                    if (p.isPresent()) {
                        Product product = p.get();
                        unitPrice = product.getPrice();
                        if (product.getUnitsInStock() != null) {
                            int left = Math.max(0, product.getUnitsInStock() - qty);
                            product.setUnitsInStock(left);
                            productRepository.save(product);
                        }
                    }
                }
                oi.setUnitPrice(unitPrice);
                oi.setOrder(order);
                order.getOrderItems().add(oi);
            }
        }

        order.setTotalQuantity(totalQty);

        Customer customer = customerRepository.findByEmail(purchase.getCustomerEmail())
                .orElseGet(Customer::new);
        customer.setName(purchase.getCustomerName());
        customer.setEmail(purchase.getCustomerEmail());
        customer.setPhone(purchase.getCustomerPhone());

        order.setCustomer(customer);

        customerRepository.save(customer);
        orderRepository.save(order);

        return new PurchaseResponse(tracking);
    }
}


