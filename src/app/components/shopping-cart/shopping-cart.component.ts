import { Router } from '@angular/router';
import { ShoppingCartServices } from './../../services/shopping-cart.services';
import { OrderService } from './../../services/orders.service';
import { UserLoginService } from 'src/app/services/userLogin.services';
import { ShoppingData } from './../data';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartGrid } from 'src/app/models/shopping-grid-model';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  columnDefs = [
    {headerName: 'Product Name', field: 'name' },
    {headerName: 'Quantity', field: 'quantity' },
    {headerName: 'Price', field: 'price'},
    {headerName: 'TotalPrice', field: 'totalPrice'}
  ];

  rowData=[];
  totalAmount = 0;
  gridAPi:GridApi;
  productsUrl = '/app-products';
  loginUrl = '/app-login';

  constructor(private shoppingData:ShoppingData,
    private userLoginService:UserLoginService,
    private orderService:OrderService,
    private shoppingCartServices:ShoppingCartServices,
    private router:Router) {    
  }

  ngOnInit() {
    this.initRowData();
    this.calculateTotalPrice();
  }

  initRowData(){
    if(this.shoppingData.shoppingCart && this.shoppingData.shoppingCart.items.length>0){
      let cartItems = this.shoppingData.shoppingCart.items;
      for(let i=0;i<cartItems.length;i++){
        let row = <ShoppingCartGrid>{
          name : cartItems[i].product.title,
          price: cartItems[i].product.price,
          quantity: cartItems[i].quantity,
          totalPrice: cartItems[i].quantity* cartItems[i].product.price          
        };
        this.rowData.push(row);
      }
    }
  }

  calculateTotalPrice(){
    if(this.rowData && this.rowData.length>0){
      this.totalAmount = 0;
      for(let i =0; i<this.rowData.length;i++){
        this.totalAmount += this.rowData[i].totalPrice;
      }
    }
  }

  onGridReady(params){
    this.gridAPi = params.api;
    this.gridAPi.sizeColumnsToFit();
  }

  async placeOrder(){
    if(this.userLoginService.isLoggedIn()){
      await this.orderService.placeOrder(this.rowData,this.totalAmount).subscribe(order =>{
        if(order){
          this.shoppingCartServices.clearCart();
          alert("Order Placed continue Shopping....");
          this.router.navigateByUrl(this.productsUrl);
        }
      });
    }
    else{
      this.router.navigateByUrl(this.loginUrl);
    }
  }
  
}
