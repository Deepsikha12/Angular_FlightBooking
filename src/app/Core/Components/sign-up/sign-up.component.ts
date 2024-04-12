import { Component, OnDestroy } from '@angular/core';
import { UserDetails } from '../Modles/SignUp.modles';
import { SignupLoginService } from '../Service/signup-login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {

  model:UserDetails;
  private addUsers?:Subscription;

  constructor(private signUp:SignupLoginService,
    private router:Router){
    this.model={
      id: 0,
      email: '',
      age: 0,
      password: '',
      role: '',
    };
  }


  OnSignUp(){
    this.addUsers=this.signUp.addUser(this.model)
    .subscribe({
      next:(response)=>{
        this.router.navigateByUrl('Home');
        console.log('Successfully Signed Up');
      }
    })
  }
  ngOnDestroy(): void {
    this.addUsers?.unsubscribe();
  }
}
