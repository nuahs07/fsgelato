import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../model/cart-item.model'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Use BehaviorSubject to store cart items and notify subscribers
  // Initialize with an empty array
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Public observable for components to subscribe to
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Optional: Load initial cart state from localStorage if needed
    // const storedCart = localStorage.getItem('frost_swirl_cart');
    // if (storedCart) {
    //   this.cartItemsSubject.next(JSON.parse(storedCart));
    // }
  }

  // Helper to get the current value of the cart array
  get currentCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Add an item (gelato flavor) to the cart
  addItem(itemToAdd: { id: number; name: string; price: number; imageUrl?: string }): void {
    const currentItems = this.currentCartItems;
    const existingItemIndex = currentItems.findIndex(item => item.productId === itemToAdd.id);

    if (existingItemIndex > -1) {
      // Item already exists, increment quantity
      currentItems[existingItemIndex].quantity++;
    } else {
      // Add as a new item
      currentItems.push({
        productId: itemToAdd.id,
        name: itemToAdd.name,
        price: itemToAdd.price,
        quantity: 1, // Start with quantity 1
        imageUrl: itemToAdd.imageUrl
      });
    }
    // Emit the updated cart array (create a new array reference)
    this.cartItemsSubject.next([...currentItems]);
    this.saveCart(); // Optional: Save to localStorage
  }

  // Remove an item completely from the cart
  removeItem(productId: number): void {
    const currentItems = this.currentCartItems.filter(item => item.productId !== productId);
    this.cartItemsSubject.next(currentItems);
    this.saveCart(); // Optional: Save to localStorage
  }

  // Update the quantity of a specific item
  updateQuantity(productId: number, newQuantity: number): void {
    const currentItems = this.currentCartItems;
    const itemIndex = currentItems.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      if (newQuantity > 0) {
        currentItems[itemIndex].quantity = newQuantity;
      } else {
        // If quantity is 0 or less, remove the item
        currentItems.splice(itemIndex, 1);
      }
      this.cartItemsSubject.next([...currentItems]);
      this.saveCart(); // Optional: Save to localStorage
    }
  }

  // Calculate the total price of all items in the cart
  getTotalPrice(): number {
    return this.currentCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get the total number of items (sum of quantities) in the cart
  getTotalItemCount(): number {
    return this.currentCartItems.reduce((total, item) => total + item.quantity, 0);
  }


  // Clear all items from the cart
  clearCart(): void {
    this.cartItemsSubject.next([]); // Emit an empty array
    this.saveCart(); // Optional: Save to localStorage
  }

  // Optional: Method to save cart to localStorage
  private saveCart(): void {
    // localStorage.setItem('frost_swirl_cart', JSON.stringify(this.currentCartItems));
  }
}