import { ProductsComponent } from './components/products/products.component';
import { Router } from '@angular/router';
import { ShoppingData } from './components/data';
import { UserLoginService } from './services/userLogin.services';
import { ShoppingCartServices } from './services/shopping-cart.services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EzKart Application';
  loginUrl = '/app-login';
  productsUrl = '/app-products';
  profileUrl = '/app-user-profile';
  ordersUrl = '/app-view-orders';
  cartUrl = '/app-shopping-cart';
  searchText='';

  isLoggedIn: boolean = this.userLoginService.loggedIn;

  constructor(private shoppingCartServices:ShoppingCartServices,
    private userLoginService:UserLoginService,
    private ShoppingData:ShoppingData,
    private router:Router,
    private productsComponent:ProductsComponent){
    this.shoppingCartServices.getCart(); 
    this.isLoggedIn = this.userLoginService.isLoggedIn();   
  }

  public homeClick() {
      console.log('Hello');
  }

  public getUserName(){
    let userDetails = this.userLoginService.getUser();    
    return this.ShoppingData.loggedInUser;
  }

  public onLogoutClick(){
    this.userLoginService.logout();
    this.isLoggedIn = this.userLoginService.isLoggedIn();
    window.location.reload();    
  }

  public openCart(){
    this.router.navigateByUrl(this.cartUrl);
  }

  public searchProduct(){
    if(this.searchText && this.searchText.length>0){
        this.productsComponent.productList = this.productsComponent.productList.filter(x=>x.title.includes(this.searchText));
        this.router.navigateByUrl(this.productsUrl);
    }
  }

  public onLoginClick(){
    this.router.navigateByUrl(this.loginUrl);
  }

}
