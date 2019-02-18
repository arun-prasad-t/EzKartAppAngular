import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { AgGridModule } from 'ag-grid-angular';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import {MatListModule} from '@angular/material/list'
import { ShoppingCartServices } from './services/shopping-cart.services';
import { ShoppingData } from './components/data';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserLoginService } from './services/userLogin.services';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { OrderService } from './services/orders.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    FooterComponent,
    ProductsComponent,  
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartComponent,
    UserProfileComponent,    
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    MatListModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ShoppingCartServices,
    ShoppingData,
    UserLoginService,
    HttpClient,
    OrderService,
    ProductsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
