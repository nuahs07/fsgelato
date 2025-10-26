// src/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Keep this if needed by non-standalone parts or if bootstrapping AppModule

import { AppRoutingModule } from './app-routing.module';

// Import standalone components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { GalleryComponent } from './gallery/gallery.component';
import { XboxComponent } from './xbox/xbox.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    // Remove ALL standalone components from here
  ],
  imports: [
    BrowserModule, // Keep standard modules
    AppRoutingModule,
    HttpClientModule,

    // Add ALL standalone components here
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainBodyComponent,
    MainHeaderComponent,
    GalleryComponent,
    XboxComponent,
    ProductCategoryComponent,
    ShoppingCartComponent,
    ProductOrderComponent,
    CustomerServiceComponent,
    CompanyHomeComponent,
    ContactUsComponent
  ],
  providers: [],
  // If AppComponent is standalone, you might not bootstrap AppModule anymore
  // bootstrap: [AppComponent] // Remove this line if switching to bootstrapApplication
})
export class AppModule { }