import { Component } from '@angular/core';
import { Login } from '../../Modles/Login-request.model';
import { AuthService } from '../../Service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model:Login;

  constructor(private authservice:AuthService,
    private cookieservice:CookieService,
    private router:Router){
    this.model={
      email:'',
      password:'',
      role:''
    }
  }

  OnLogin():void{
    this.authservice.login(this.model)
    .subscribe({
      next:(response)=>{
        console.log(response);
        //set Autheration Cookie
        this.cookieservice.set('Authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');

        //Set User
        this.authservice.serUser({
          email:response.user.email,
          password:response.user.password,
          role:response.user.role
        })
        //Redirect to home page
        this.router.navigateByUrl('/');
      }
    });
  }

}
