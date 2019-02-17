import { UserLoginService } from 'src/app/services/userLogin.services';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { OrderModel } from '../models/orderModel';

@Injectable()
export class OrderService {

    saveOrdersUrl = '/api/orders/save';
    getOrdersUrl = '/api/orders/getOrders';

    constructor(private http:Http,
        private userLoginService:UserLoginService){

    }

    public placeOrder(cart,totalPrice){
        let orderDetails = this.buildOrderString(cart,totalPrice);
        let jsonData = JSON.stringify(orderDetails);
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.saveOrdersUrl, jsonData, requestOption);
    }

    buildOrderString(cart,totalPrice){
        let products='';
        for(let i=0;i<cart.length;i++){
            products = products + cart[i].name+'-'+cart[i].quantity+'-'+cart[i].price+'-'+cart[i].totalPrice+'\n';
        }
        let user = this.userLoginService.getUser();
        let userEmail = user.email;
        let address = user.address

        let orderDetail = <OrderModel>{
            email:userEmail,
            productDetails:products,
            totalPrice:totalPrice,
            address: address,
            phone: user.phone,
            status: "Order Placed"
        }

        return orderDetail;
    }

    public getOrder(){
        let email = this.userLoginService.getUser().email;        
        let jsonData = JSON.stringify({'email':email});
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.getOrdersUrl, jsonData, requestOption);
    }
}