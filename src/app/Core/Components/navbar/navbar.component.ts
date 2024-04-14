import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { User } from '../Modles/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?:User;

  constructor(private authservice:AuthService,
    private router:Router){

  }
  ngOnInit(): void {
    this.authservice.user()
    .subscribe({
      next:(response)=>{
        this.user=response;
      },
      error: (error) => {
        // Handle error if necessary
        console.error('Error fetching user data:', error);
      }
    });

    this.user=this.authservice.getUser();
  }

  onLogout():void{
    this.authservice.logout();
    this.router.navigateByUrl('Flight Booking');
  }
}
