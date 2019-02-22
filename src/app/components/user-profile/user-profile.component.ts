import { AppComponent } from './../../app.component';
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
  userDetails;

  loginUrl = '/app-login';
  constructor(private userLoginService:UserLoginService,
    private router:Router) {
    if(!this.userLoginService.isLoggedIn()){
      this.router.navigateByUrl(this.loginUrl);
    }
    else{
      this.getProfile();      
    }
   }

  ngOnInit() {
  }

  getProfile(){
    this.userDetails = this.userLoginService.getUser();
    this.name = this.userDetails.name;
    this.email = this.userDetails.email;
    this.id = this.userDetails._id;
    this.address = this.userDetails.address;
    this.phone = this.userDetails.phone;
  }

  updateUser(){
    let updateData = {'_id': this.id,'phone': this.phone,'address':this.address };
    this.userLoginService.updateUser(updateData).subscribe(data =>{
      let jsonData = data.json();
      if(jsonData){
        alert("Profile Updated successfully please login again....");
        this.userLoginService.logout();
        window.location.reload();  
      }
      else{
        alert("Profile Updation failed please try again....");
      }
    });
  }

}
