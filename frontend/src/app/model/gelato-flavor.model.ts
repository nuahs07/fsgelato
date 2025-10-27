// src/app/models/gelato-flavor.model.ts

export interface GelatoFlavor {
  id: number;          // Unique identifier from the backend
  name: string;        // Name of the flavor (e.g., "Strawberry Swirl")
  description: string; // Description (e.g., "Creamy vanilla with strawberry ribbons")
  price: number;       // Price per unit (e.g., scoop, pint)
  imageUrl: string;    // URL or path to the product image
  category?: string;   // Optional: General category (e.g., 'Dairy', 'Sorbet', 'Vegan')
  isSeasonal: boolean; // Flag for seasonal items
  isDairyFree: boolean;// Flag for dairy-free items
  // Add other relevant fields if your backend provides them:
  // allergens?: string[];
  // ingredients?: string;
  // stockLevel?: number; // Might be useful, but often handled just before checkout
}