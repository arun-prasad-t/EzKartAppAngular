import { Product } from './../models/product';
import { ShoppingData } from './../components/data';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartServices{
    
    constructor(private shoppingData:ShoppingData){

    }

    addToCart(product:Product){
        let shoppingCartItem = this.shoppingData.shoppingCart.items.find(x=> x.product.$key == product.$key);
        if(shoppingCartItem){
          shoppingCartItem.quantity = shoppingCartItem.quantity+1;
        }
        else{
          shoppingCartItem = <ShoppingCartItem>{
            product : product,
            quantity:1
          }
          this.shoppingData.shoppingCart.items.push(shoppingCartItem);
        }
        this.updateLocalCart();   
      }
    
      removeFromCart(product:Product){
        let shoppingCartItem = this.shoppingData.shoppingCart.items.find(x=> x.product.$key == product.$key);    
        if(shoppingCartItem.quantity == 1){
          this.shoppingData.shoppingCart.items = this.shoppingData.shoppingCart.items.filter(x=> x.product.$key != product.$key); 
          let itemIndex = this.shoppingData.shoppingCart.items.indexOf(shoppingCartItem);     
          this.shoppingData.shoppingCart.items.splice(itemIndex,1);
        }
        else{
          shoppingCartItem.quantity -=1;
        }
        this.updateLocalCart();
      }

      getCart(){
        let localCart = localStorage.getItem('cart');
        if(localCart){
          let cartObj = JSON.parse(localCart);          
          this.shoppingData.shoppingCart = <ShoppingCart>{
            items : cartObj.items,
            email : cartObj.email
          };
        }
        if(this.shoppingData.shoppingCart){
            return  this.shoppingData.shoppingCart;
        }  
        return null;      
      }

      updateLocalCart(){
        localStorage.setItem('cart',JSON.stringify(this.shoppingData.shoppingCart));
      }

      clearCart(){
        this.shoppingData.shoppingCart = new ShoppingCart();
        localStorage.removeItem('cart');
      }
}