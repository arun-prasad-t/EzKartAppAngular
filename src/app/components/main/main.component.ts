import { UserLoginService } from 'src/app/services/userLogin.services';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    title = 'EzKart Application';
    loginUrl = '/app-login';
    registerUrl = '/app-register';
    productsUrl = '/app-products';
    isLoggedIn: boolean = false;
    
  constructor(private router: Router,
    private userLoginService:UserLoginService) {
      this.isLoggedIn = this.userLoginService.isLoggedIn();
     }

  ngOnInit() {
  }

  onLoginClick() {
    this.router.navigate([this.loginUrl]);
  }

  onRegisterClick() {
    this.router.navigate([this.registerUrl]);
  }

  onLogoutClick(){
    this.userLoginService.logout();
    window.location.reload();
  }

  onGuestClick(){
    this.router.navigateByUrl(this.productsUrl)
  }
}

