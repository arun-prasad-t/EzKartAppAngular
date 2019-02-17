import { ShoppingCartServices } from './../../services/shopping-cart.services';
import { ShoppingData } from './../data';
import { ShoppingCartItem } from './../../models/shopping-cart-item';
import { ShoppingCart } from './../../models/shopping-cart';
import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;


  constructor(private shoppingCartServices:ShoppingCartServices,
    private shoppingData:ShoppingData) { 
      
    }

  ngOnInit() {
    this.shoppingCartServices.getCart();
  }

  public addtoCart(){
    this.shoppingCartServices.addToCart(this.product);
  }

  getQuantity(product:Product){
    if(this.shoppingData.shoppingCart && this.shoppingData.shoppingCart.items.length>0){
      let item = this.shoppingData.shoppingCart.items.find(x=> x.product.$key == product.$key);
      if(item){
        return item.quantity;
      }
    }
    return 0;
  }

}
