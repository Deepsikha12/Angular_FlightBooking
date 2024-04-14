import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/Core/Components/Modles/SignUp.modles';
import { UserService } from '../../Services/user.service';
import { UserUpdate } from '../Models/updateUser.model';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit, OnDestroy {

  email: string |null=null;
  paramsSubscription?:Subscription;
  private updateUsers?: Subscription;
  userdetails?:UserDetails;

  isPasswordValid: boolean = true;
  isAgeValid: boolean = true; // Track the validity of the age field


  constructor(
    private route:ActivatedRoute,
    private update :UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.paramsSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.email =params.get('email');
        console.log(this.email);

        if(this.email){
          this.update.getuserbyemail(this.email)
          .subscribe({
            next:(response) =>{
              this.userdetails = response;
              console.log(response)
            }
          });
        }
      }
    });
  }

  OnUpdate(form: NgForm) {
    if (form.invalid || !this.isAgeValid || !this.isPasswordValid) {
      // Form is invalid, do nothing
      return;
    }

    const updateUserDetails :UserUpdate = {
      age :this.userdetails?.age ?? 0,
      password :this.userdetails?.password ?? '',
    };

    if(this.email){
      this.updateUsers =this.update.updateuser(this.email,updateUserDetails)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('Flight Booking');
        }
      });
    }
  }

  OnDelete():void{
    if(this.email){
      this.update.deleteuser(this.email)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('Flight Booking');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateUsers?.unsubscribe();
  }

}
