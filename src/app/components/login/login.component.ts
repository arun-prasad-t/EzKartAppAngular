import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { UserLogin } from './../../models/userLogin';
import { UserLoginService } from './../../services/userLogin.services';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';



@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userEmail;
  public userPass;

  productsUrl = '/app-products';
  registerUrl = '/app-register';

  constructor(private userLoginService:UserLoginService,
    private AppComponent:AppComponent,
    private router:Router){
      if(this.userLoginService.isLoggedIn()){
        this.router.navigateByUrl(this.productsUrl);
      }
    }
  

  ngOnInit() {
  }


  public async onLogin(){
    if(this.userEmail && this.userPass){
      let loginData:UserLogin ={
        email :this.userEmail,
        password: this.userPass
      }
      await this.userLoginService.loginUser(loginData).subscribe(userData =>{
        let userJson = userData.json();
        if(userJson){
          localStorage.setItem('user',JSON.stringify(userJson));
          this.AppComponent.isLoggedIn = this.userLoginService.isLoggedIn();
          this.router.navigateByUrl(this.productsUrl);
          window.location.reload();                    
        }
        else{
          alert("Login Failed Please try again");
        }
      });      
    }
  }
}
