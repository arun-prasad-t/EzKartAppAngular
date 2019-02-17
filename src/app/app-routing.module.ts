import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from '../app/components/login/login.component';
import {MainComponent} from '../app/components/main/main.component';
import {RegisterComponent} from '../app/components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
    { path: 'app-login', component: LoginComponent },
    { path: 'app-main', component: MainComponent},
    { path: '', redirectTo: '/app-main', pathMatch: 'full'},
    { path: 'app-register', component: RegisterComponent},
    { path: 'app-products', component: ProductsComponent},
    { path: 'app-shopping-cart', component:ShoppingCartComponent},
    { path: 'app-user-profile' , component: UserProfileComponent},
    { path: 'app-view-orders' , component: ViewOrdersComponent},
    { path: 'app-place-order', component: PlaceOrderComponent}

];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
