import { ShoppingData } from './../data';
import { ShoppingCartServices } from './../../services/shopping-cart.services';
import { Product } from './../../models/product';
import { Component, OnInit, Input} from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;

  constructor(private shoppingCartServices:ShoppingCartServices,
    private shoppingData:ShoppingData) { }

  ngOnInit() {
  }

  addToCart(){
    this.shoppingCartServices.addToCart(this.product);
  }

  removeFromCart(){
    this.shoppingCartServices.removeFromCart(this.product);
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
