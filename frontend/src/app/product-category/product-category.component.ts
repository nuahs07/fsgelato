import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Import CurrencyPipe
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../service/cart.service'; // Assuming CartService exists
import { GelatoFlavor } from '../model/gelato-flavor.model'; // Define interface in a separate file

// Define available filter options
type FlavorFilter = 'All' | 'Dairy-Free' | 'Seasonal' | 'Sorbet'; // Extend as needed

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Add CurrencyPipe
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  allFlavors: GelatoFlavor[] = [];
  filteredFlavors: GelatoFlavor[] = [];
  activeFilter: FlavorFilter = 'All';
  isLoading = true;
  error: string | null = null;

  private http = inject(HttpClient);
  private cartService = inject(CartService);
  // Use environment variable for API URL
  private apiUrl = 'http://localhost:8080/api/flavors'; // Replace with env var

  ngOnInit(): void {
    this.fetchFlavors();
  }

  fetchFlavors(): void {
    this.isLoading = true;
    this.error = null;
    this.http.get<GelatoFlavor[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.allFlavors = data;
        this.applyFilter(); // Apply default 'All' filter
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching flavors:', err);
        this.error = 'Could not load flavors. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    switch (this.activeFilter) {
      case 'Dairy-Free':
        this.filteredFlavors = this.allFlavors.filter(f => f.isDairyFree);
        break;
      case 'Seasonal':
        this.filteredFlavors = this.allFlavors.filter(f => f.isSeasonal);
        break;
      case 'Sorbet': // Example: Assuming category field exists
        this.filteredFlavors = this.allFlavors.filter(f => f.category?.toLowerCase() === 'sorbet');
        break;
      case 'All':
      default:
        this.filteredFlavors = this.allFlavors;
        break;
    }
  }

  setFilter(filter: FlavorFilter): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  addToCart(flavor: GelatoFlavor): void {
    // Convert GelatoFlavor to the format expected by CartService
    const itemToAdd = {
      id: flavor.id,
      name: flavor.name,
      price: flavor.price,
      imageUrl: flavor.imageUrl
    };
    this.cartService.addItem(itemToAdd);
    // Optional: Add user feedback (e.g., toast message)
    console.log(`${flavor.name} added to cart.`);
  }
}

// Define GelatoFlavor interface (e.g., in src/app/models/gelato-flavor.model.ts)
// export interface GelatoFlavor {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category?: string; // e.g., 'Dairy', 'Sorbet'
//   isSeasonal: boolean;
//   isDairyFree: boolean;
//   // Add other relevant fields like allergens, ingredients if needed
// }