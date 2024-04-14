import { Component, OnDestroy } from '@angular/core';
import { UserDetails } from '../Modles/SignUp.modles';
import { SignupLoginService } from '../Service/signup-login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {

  model: UserDetails = {
    id: 0,
    email: '',
    age: 0,
    password: '',
    role: '',
  };

  signUpSuccess: boolean = false;
  isPasswordValid: boolean = true;
  isAgeValid: boolean = true; // Track the validity of the age field
  private addUsers?: Subscription;

  constructor(
    private signUp: SignupLoginService,
    private router: Router
  ) {}

  OnSignUp(form: NgForm) {
    if (form.invalid || !this.isAgeValid || !this.isPasswordValid) {
      // Form is invalid, do nothing
      return;
    }

    this.addUsers = this.signUp.addUser(this.model)
      .subscribe({
        next: (response) => {
          console.log('Successfully Signed Up');
          this.router.navigateByUrl('Flight Booking')
        }
      });
  }

  ngOnDestroy(): void {
    this.addUsers?.unsubscribe();
  }

  validateAge() {
    this.isAgeValid = this.model.age !== 0;
  }

  validatePassword() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{4,})$/;
    this.isPasswordValid = passwordPattern.test(this.model.password);
  }

}
