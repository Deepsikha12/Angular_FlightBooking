import { Component } from '@angular/core';
import { Login } from '../../Modles/Login-request.model';
import { AuthService } from '../../Service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: Login;
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private authservice: AuthService,
    private cookieservice: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
      role: ''
    };
  }

  ngOnInit() {
    // Initialize form controls with validation
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  OnLogin(): void {
    if (this.loginForm.invalid) {
      // If form is invalid, return and show validation errors
      return;
    }

    this.authservice.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        // If login is successful, set authorization cookie and user
        this.cookieservice.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.authservice.serUser({
          email: response.user.email,
          password: response.user.password,
          role: response.user.role
        });
        // Redirect to home page
        this.router.navigateByUrl('Flight Booking');
      },
      error: (err) => {
        // If login fails, display error message
        if (err.error && err.error.errors) {
          // Extract and display validation errors from the response
          const validationErrors = Object.values(err.error.errors).join(', ');
          this.loginError = `Login failed: ${validationErrors}`;
        } else {
          // If no specific validation errors are provided, display a generic error message
          this.loginError = 'Invalid Email Or Password or Role';
        }
        console.error(err);
      }
    });
  }
}
