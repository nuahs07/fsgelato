// src/src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Import if needed globally
import { provideRouter } from '@angular/router'; // Import if using routing

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'; // Assuming routes are exported from app-routing.module.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient if used
    provideRouter(routes) // Provide router configuration
    // Add other global providers here if necessary
  ]
})
  .catch((err: any) => console.error(err)); // Added type ': any' here too