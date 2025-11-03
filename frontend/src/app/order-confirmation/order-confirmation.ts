import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  mockOrderId: string = '';

  ngOnInit(): void {
    // Generate a mock order ID for demonstration
    this.mockOrderId = Math.floor(100000 + Math.random() * 900000).toString();
  }
}