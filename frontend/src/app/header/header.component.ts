import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { CartService } from '../service/cart.service'; // Correct path
import { Observable, map } from 'rxjs'; // Import Observable and map operator

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import RouterModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartService = inject(CartService);
  cartItemCount$: Observable<number> | undefined;

  // Mock menu items for now, replace with MenuService later if needed
  menus = [
    { name: 'Home', routerPath: '' },
    { name: 'Flavors', routerPath: '/product' }, // Link to product catalog
    // { name: 'About', routerPath: '/about' }, // Add later if needed
    { name: 'Contact', routerPath: '/contact' }
  ];

  ngOnInit(): void {
    // Get the total item count observable from the cart service
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }
}