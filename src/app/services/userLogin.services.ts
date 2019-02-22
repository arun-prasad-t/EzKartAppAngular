import { Http,RequestOptions,Headers,Response } from '@angular/http';
import { UserProfile } from './../models/userProfile';
import { ShoppingData } from './../components/data';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../models/userLogin';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserLoginService {

    public loginUrl = '/api/userLogin/login';
    public registerUrl = '/api/userLogin/register';
    public updateUrl = '/api/userLogin/update';
    public checkUrl = '/api/userLogin/check';
    public loggedIn:boolean = false;

    constructor(private httpClient:HttpClient,
        public http:Http,
        private shoppingData:ShoppingData) { }

    public loginUser(loginData:UserLogin){
        let jsonData = JSON.stringify(loginData);
        let userDetails;
        //let headers:HttpHeaders = this.httpClient
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.loginUrl, jsonData, requestOption);                                                
    }

    public getUser(){
        let userDetails = localStorage.getItem('user');
        if(userDetails){
            let localUserObj = JSON.parse(userDetails);            
            //let userObj = JSON.parse(localUserObj._body);
            if(localUserObj){
                this.shoppingData.loggedInUser = localUserObj.name; 
                return localUserObj;
            }
            else{
                this.shoppingData.loggedInUser = "Guest";
                return null;
            }
        }
        else{
            this.shoppingData.loggedInUser = "Guest";
            return null;
        }
    }
    
    public isLoggedIn(){
        this.getUser();
        if(this.shoppingData.loggedInUser == "Guest"){
            this.loggedIn = false;
            return false;
        }
        else{
            this.loggedIn = true;
            return true;
        }
    }

    public logout(){
        if(this.isLoggedIn()){
            localStorage.removeItem('user');
            this.isLoggedIn();                        
        }
    }

    public register(userData){
        let jsonData = JSON.stringify(userData);
        let userDetails;
        //let headers:HttpHeaders = this.httpClient
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.registerUrl, jsonData, requestOption);
    }

    public updateUser(userData){
        let jsonData = JSON.stringify(userData);
        let userDetails;
        //let headers:HttpHeaders = this.httpClient
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.updateUrl, jsonData, requestOption); 
    }

    public checkEmail(userData){
        let jsonData = JSON.stringify(userData);
        let userDetails;
        //let headers:HttpHeaders = this.httpClient
        let header:Headers = new Headers({
            'X-Request-With' : 'XMLHttpRequest',
            'X-Page-Url' : window.location.href,
            'Content-Type' : 'application/json'
        });                
        let requestOption:RequestOptions = new RequestOptions({headers:header});                        
        return this.http.post(this.checkUrl, jsonData, requestOption); 
    }

}