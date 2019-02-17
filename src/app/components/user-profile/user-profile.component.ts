import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/userLogin.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name:string;
  id:string;  
  email:string;
  address:string;
  phone:string;

  loginUrl = '/app-login';
  constructor(private UserLoginService:UserLoginService,
    private router:Router) {
    if(!this.UserLoginService.isLoggedIn()){
      this.router.navigateByUrl(this.loginUrl);
    }
    else{
      this.getProfile();      
    }
   }

  ngOnInit() {
  }

  getProfile(){
    let userDetails = this.UserLoginService.getUser();
    this.name = userDetails.name;
    this.email = userDetails.email;
    this.id = userDetails._id;
    this.address = userDetails.address;
    this.phone = userDetails.phone;
  }


}
