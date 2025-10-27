import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router'; // Import RouterLink
import { CartService } from '../service/cart.service'; // Correct path
import { CartItem } from '../model/cart-item.model'; // Correct path
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink], // Add RouterLink
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartService = inject(CartService);
  cartItems$: Observable<CartItem[]> | undefined; // Use async pipe in template
  totalPrice = 0;

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$; // Assign the observable
    // Subscribe to calculate total price whenever cart changes
    this.cartService.cartItems$.subscribe(items => {
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  updateQuantity(item: CartItem, quantityChange: number): void {
    const newQuantity = item.quantity + quantityChange;
    if (newQuantity >= 1) {
      this.cartService.updateQuantity(item.productId, newQuantity);
    } else {
      // Optionally ask for confirmation before removing if quantity becomes 0
      this.cartService.removeItem(item.productId);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
     // Optional: Add confirmation dialog
     this.cartService.clearCart();
  }
}