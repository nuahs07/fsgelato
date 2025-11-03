import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule for [(ngModel)]

// Define the possible statuses
type OrderStatus = 'Pending' | 'Preparing' | 'Delivering' | 'Completed' | 'Cancelled';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass], // <-- Add FormsModule and NgClass
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  orderId: string = '';
  isLoading = false;
  orderStatus: OrderStatus | null = null;
  statusMessage = '';
  errorMessage = '';
  foundOrderId = '';

  // Mock data for demonstration
  private mockOrders: { [key: string]: { status: OrderStatus, message: string } } = {
    '12345': { status: 'Preparing', message: 'Your gelato is being freshly scooped and packed!' },
    '67890': { status: 'Delivering', message: 'Out for delivery! It should arrive soon.' },
    '11111': { status: 'Completed', message: 'Your order was delivered. Enjoy!' },
    '22222': { status: 'Pending', message: 'Your order is confirmed and waiting to be prepared.' },
    '33333': { status: 'Cancelled', message: 'This order has been cancelled.' }
  };

  trackOrder(): void {
    this.isLoading = true;
    this.orderStatus = null;
    this.errorMessage = '';
    this.foundOrderId = this.orderId;

    // Simulate API call delay
    setTimeout(() => {
      const mockOrder = this.mockOrders[this.orderId];
      if (mockOrder) {
        this.orderStatus = mockOrder.status;
        this.statusMessage = mockOrder.message;
      } else {
        this.errorMessage = 'Order not found. Please check the ID and try again.';
      }
      this.isLoading = false;
      this.orderId = ''; // Clear input after search
    }, 1200);
  }
}