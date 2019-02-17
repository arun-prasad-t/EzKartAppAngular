import { ShoppingCart } from 'src/app/models/shopping-cart';
export class ShoppingData{
public shoppingCart: ShoppingCart;
public loggedInUser = "Guest"
constructor(){
    this.shoppingCart = new ShoppingCart();
}
}