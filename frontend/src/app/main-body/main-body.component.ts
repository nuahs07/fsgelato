import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [CommonModule, RouterLink], // Import RouterLink
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent {
  // You could add properties here later, e.g., for featured products
}