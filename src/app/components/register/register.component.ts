import { UserLoginService } from 'src/app/services/userLogin.services';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/userProfile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  productsUrl = '/app-products';
  loginUrl = '/app-login';
  name:string;
  pass:string;
  cpass :string;
  email:string;
  address:string;
  phone:string;


  constructor(private router:Router,
    private userLoginService:UserLoginService) {
      if(this.userLoginService.isLoggedIn()){
        this.router.navigateByUrl(this.productsUrl);
      }
     }

  ngOnInit() {
  }

  registerUser(){
    if(this.name.length>0&& this.address.length>0 && this.email.length>0 && this.pass.length>0 && this.cpass.length>0
      && this.phone.length>0){
        if(this.pass === this.cpass){
          let userData = <UserProfile>{
            name:this.name,
            password: this.pass,
            phone:this.phone,
            address: this.address,
            email:this.email
          }
          this.userLoginService.register(userData).subscribe(data=>{
              if(data){
                alert("registration Successful please login");
                this.router.navigateByUrl(this.loginUrl);
              }
              else{
                alert("Registraion failed Please try again");
                this.pass= '';
                this.cpass = '';
              }
          });
        }
        else{
          alert("Passwords didn't match, pease fix it");
          this.pass= '';
          this.cpass = '';
        }
      }
      else{
        alert("Please fix all fields and continue registration");
      }
  }

}
