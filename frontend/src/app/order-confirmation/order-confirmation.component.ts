import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for query params

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderTrackingNumber: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get tracking number from query params
    this.route.queryParams.subscribe(params => {
      this.orderTrackingNumber = params['trackingNumber'] || 
        Math.floor(100000 + Math.random() * 900000).toString();
    });
  }
}