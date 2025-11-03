import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CompanyHomeComponent } from './company-home/company-home.component'; // Keep if used
import { ProductOrderComponent } from './product-order/product-order.component'; // Keep if used
import { CustomerServiceComponent } from './customer-service/customer-service.component'; // Keep if used
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutComponent } from './checkout/checkout.component'; // Import checkout

// --- Import new components ---
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';


export const routes: Routes = [ // Ensure 'export' is present
  {path:'',component:MainBodyComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'product',component:ProductCategoryComponent},
  {path:'order',component:ProductOrderComponent},
  {path:'customer',component:CustomerServiceComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'checkout', component: CheckoutComponent}, // Add checkout route

  // --- Add new routes ---
  {path:'order-confirmation', component: OrderConfirmationComponent},
  {path:'track-order', component: OrderTrackingComponent},

  // Add other routes here (e.g., /about, /faq)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }