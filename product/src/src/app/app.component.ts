// In src/src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- Import RouterModule
import { HeaderComponent } from './header/header.component'; // <-- Import HeaderComponent
import { FooterComponent } from './footer/footer.component'; // <-- Import FooterComponent

@Component({
  selector: 'app-root',
  standalone: true, // <-- Make sure this is true
  imports: [
    HeaderComponent,   // <-- Add HeaderComponent
    RouterModule,    // <-- Add RouterModule
    FooterComponent    // <-- Add FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product';
}