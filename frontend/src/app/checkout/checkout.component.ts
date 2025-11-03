import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { CartItem } from '../model/cart-item.model';
// Import ReactiveFormsModule for building forms
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Keep for later, though not used in mock

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule], // Add ReactiveFormsModule
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  fb = inject(FormBuilder); // Inject FormBuilder
  http = inject(HttpClient); // Inject HttpClient

  cartItems: CartItem[] = [];
  orderTotal = 0;
  deliveryOption: 'delivery' | 'pickup' = 'delivery';
  paymentMethod: string = '';
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  // Define the checkout form structure
  checkoutForm: FormGroup = this.fb.group({
    // Customer Details
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', [Validators.required, Validators.pattern('^09[0-9]{9}$')]], // Example PH phone pattern

    // Delivery Details (conditionally required)
    deliveryAddress: [''],
    deliveryCity: [''],
    deliveryNotes: [''],

    // Pickup Details (less info needed)
    pickupTime: [''], // Example, might be a select dropdown
  });

  ngOnInit(): void {
    this.cartItems = this.cartService.currentCartItems;
    this.orderTotal = this.cartService.getTotalPrice();

    if (this.cartItems.length === 0) {
      // Don't navigate if cart is empty, user might just be refreshing
      // Let the template handle showing an empty cart message
      // this.router.navigate(['/product']); // Changed from /catalog
      // return;
    }

    // Set conditional validators based on delivery option
    this.updateValidators(this.deliveryOption);
  }

  selectDeliveryOption(option: 'delivery' | 'pickup'): void {
    this.deliveryOption = option;
    this.updateValidators(option);
  }

  // Update form validators based on delivery/pickup choice
  updateValidators(option: 'delivery' | 'pickup'): void {
    const addressControl = this.checkoutForm.get('deliveryAddress');
    const cityControl = this.checkoutForm.get('deliveryCity');
    const pickupTimeControl = this.checkoutForm.get('pickupTime');

    if (option === 'delivery') {
      addressControl?.setValidators([Validators.required, Validators.minLength(10)]);
      cityControl?.setValidators([Validators.required]);
      pickupTimeControl?.clearValidators();
    } else { // Pickup
      addressControl?.clearValidators();
      cityControl?.clearValidators();
      pickupTimeControl?.setValidators([Validators.required]); // Example: require pickup time
    }
    addressControl?.updateValueAndValidity();
    cityControl?.updateValueAndValidity();
    pickupTimeControl?.updateValueAndValidity();
  }

  selectPaymentMethod(method: string): void {
      this.paymentMethod = method;
      console.log('Payment method selected:', method);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      console.error("Form is invalid");
      this.checkoutForm.markAllAsTouched(); // Show validation errors
      return;
    }
    if (!this.paymentMethod) {
      this.submitError = 'Please select a payment method.';
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    this.submitSuccess = false;

    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
      totalAmount: this.orderTotal,
      deliveryOption: this.deliveryOption,
      paymentMethod: this.paymentMethod,
    };

    console.log('Simulating order submission with:', orderData);

    // --- THIS IS THE FIX ---
    // We replace the real http.post with a simulated success
    // to keep the frontend flow working without a backend.
    
    // 1. Simulate network delay
    setTimeout(() => {
        console.log('Order simulation successful!');
        
        // 2. Set success flags
        this.isSubmitting = false;
        this.submitSuccess = true;
        
        // 3. Clear the cart (from CartService)
        this.cartService.clearCart();
        
        // 4. Reset the form
        this.checkoutForm.reset();
        
        // 5. Navigate to the confirmation page
        this.router.navigate(['/order-confirmation']);

    }, 1500); // Simulate a 1.5 second delay

    /* // This is the backend code we will use LATER:
    this.http.post('/api/orders', orderData)
      .subscribe({
          next: (response) => {
              console.log('Order successful:', response);
              this.isSubmitting = false;
              this.submitSuccess = true;
              this.cartService.clearCart();
              this.router.navigate(['/order-confirmation']);
          },
          error: (err) => {
              console.error('Order failed:', err);
              this.isSubmitting = false;
              this.submitError = 'Could not place order. Please check your details or try again later.';
          }
      });
    */
   // TODO: Implement actual payment gateway logic here
    // This often involves:
    // 1. Getting a payment token from Stripe/PayPal on the frontend.
    // 2. Sending the token + orderData to the backend.
    // 3. Backend processes payment with the token.
    // 4. Backend confirms success/failure back to frontend.
  }

  // Helper getters for template validation
  get customerName() { return this.checkoutForm.get('customerName'); }
  get customerEmail() { return this.checkoutForm.get('customerEmail'); }
  get customerPhone() { return this.checkoutForm.get('customerPhone'); }
  get deliveryAddress() { return this.checkoutForm.get('deliveryAddress'); }
  get deliveryCity() { return this.checkoutForm.get('deliveryCity'); }
  get pickupTime() { return this.checkoutForm.get('pickupTime'); }

}