import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Keep for later
import { CartService } from '../service/cart.service'; // Correct path
import { GelatoFlavor } from '../model/gelato-flavor.model'; // Correct path
import { CartItem } from '../model/cart-item.model'; // Correct path

type FlavorFilter = 'All' | 'Dairy-Free' | 'Seasonal' | 'Sorbet';

@Component({
  selector: 'app-product-category', // Changed selector back
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit { // Changed class name back
  allFlavors: GelatoFlavor[] = [];
  filteredFlavors: GelatoFlavor[] = [];
  activeFilter: FlavorFilter = 'All';
  isLoading = false; // Set to false initially for mock data
  error: string | null = null;

  // Keep HttpClient and CartService injected
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private apiUrl = 'http://localhost:8080/api/flavors'; // Keep for later

  ngOnInit(): void {
    // Use mock data for now
    this.loadMockData();
    this.applyFilter();
  }

  loadMockData(): void {
    this.isLoading = true;
    // Sample data matching the GelatoFlavor interface
    this.allFlavors = [
      { id: 1, name: "Classic Vanilla Bean", description: "Rich Madagascan vanilla.", price: 150, imageUrl: "assets/products/vanilla.jpg", category: "Dairy", isSeasonal: false, isDairyFree: false },
      { id: 2, name: "Belgian Chocolate", description: "Deep dark chocolate.", price: 160, imageUrl: "assets/products/chocolate.jpg", category: "Dairy", isSeasonal: false, isDairyFree: false },
      { id: 3, name: "Strawberry Swirl", description: "Creamy base with strawberry ribbons.", price: 155, imageUrl: "assets/products/strawberry.jpg", category: "Dairy", isSeasonal: false, isDairyFree: false },
      { id: 4, name: "Mango Tango Sorbet", description: "Refreshing tropical mango.", price: 140, imageUrl: "assets/products/mango.jpg", category: "Sorbet", isSeasonal: false, isDairyFree: true },
      { id: 5, name: "Mint Choc Chip", description: "Cool mint with dark chocolate flakes.", price: 155, imageUrl: "assets/products/mintchip.jpg", category: "Dairy", isSeasonal: false, isDairyFree: false },
      { id: 6, name: "Pumpkin Spice Delight", description: "Autumn favorite with warm spices.", price: 165, imageUrl: "assets/products/pumpkin.jpg", category: "Dairy", isSeasonal: true, isDairyFree: false },
       { id: 7, name: "Vegan Pistachio", description: "Creamy pistachio, dairy-free.", price: 170, imageUrl: "assets/products/pistachio_vegan.jpg", category: "Vegan", isSeasonal: false, isDairyFree: true },
    ];
     // Simulate loading delay (optional)
     setTimeout(() => {
        this.isLoading = false;
        this.applyFilter();
     }, 500);
  }

  // fetchFlavors method remains for later API integration
  fetchFlavors(): void {
    this.isLoading = true;
    this.error = null;
    this.http.get<GelatoFlavor[]>(this.apiUrl).subscribe({ /* ... keep as before ... */ });
  }

  applyFilter(): void {
     // Keep filtering logic as before
     switch (this.activeFilter) {
      case 'Dairy-Free':
        this.filteredFlavors = this.allFlavors.filter(f => f.isDairyFree);
        break;
      case 'Seasonal':
        this.filteredFlavors = this.allFlavors.filter(f => f.isSeasonal);
        break;
      case 'Sorbet':
        this.filteredFlavors = this.allFlavors.filter(f => f.category?.toLowerCase() === 'sorbet');
        break;
      case 'All':
      default:
        this.filteredFlavors = [...this.allFlavors]; // Use spread to create new array instance
        break;
    }
  }

  setFilter(filter: FlavorFilter): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  addToCart(flavor: GelatoFlavor): void {
    const itemToAdd = {
      id: flavor.id,
      name: flavor.name,
      price: flavor.price,
      imageUrl: flavor.imageUrl
    };
    this.cartService.addItem(itemToAdd);
    console.log(`${flavor.name} added to cart.`);
     // Add visual feedback later (e.g., toast message)
  }
}