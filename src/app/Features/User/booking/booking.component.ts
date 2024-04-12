import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightsService } from '../../Services/flights.service';
import { UserService } from '../../Services/user.service';
import { AuthService } from 'src/app/Core/Components/Service/auth.service';
import { User } from 'src/app/Core/Components/Modles/User.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {
  id: string = '';
  paramsSubscription?: Subscription;
  UpdateSubscription?: Subscription;
  bookingDetails?: any; // Change this type according to your BookingDetails model
  bookForm: FormGroup;
  bookingSuccessful: boolean = false;
  user?:User

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService,
    private bookingservice: UserService,
    private fb: FormBuilder,
    private loginService :AuthService
  ) {
    this.bookForm = this.fb.group({
      email:['',Validators.required],
      aeroId: ['', Validators.required],
      from_city: ['', Validators.required],
      to_city: ['', Validators.required],
      fare: ['', Validators.required],
      departure:['', Validators.required],
      passengerName: ['', Validators.required],
      passengerGender: ['', Validators.required],
      passengerAge: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('aeroId') || '';

        if (this.id) {
          this.flightService.getFlightById(this.id).subscribe({
            next: (response: any) => {
              this.bookingDetails = response;
              this.populateForm();
            }
          });
        }
      }
    });

    this.loginService.user().subscribe({
      next:(response)=>{
        this.user=response
        console.log(this.user)
      }
    });

   this.user= this.loginService.getUser();
  }

  populateForm(): void {
    if (this.bookingDetails) {
      this.bookForm.patchValue({
        aeroId: this.bookingDetails.aeroId,
        from_city: this.bookingDetails.from_city,
        to_city: this.bookingDetails.to_city,
        fare: this.bookingDetails.fare,
        departure:this.bookingDetails.departure
      });
    }
  }

  Addpassengers(): void {
    const formData = this.bookForm.value;
    const userEmail = this.loginService.getUser()?.email;
    console.log(userEmail)

    if (!userEmail) {
      console.error('User email not available');
      return;
    }

    console.log('formdata',formData)
    const bookingWithPassenger = {
      email:userEmail,
      aeroId: formData.aeroId,
      from_city: formData.from_city,
      to_city: formData.to_city,
      fare: formData.fare,
      departure:formData.departure,
      passenger: {
        name: formData.passengerName,
        gender: formData.passengerGender,
        age: formData.passengerAge
      }
    };

    this.bookingservice.addBooking(bookingWithPassenger).subscribe({
      next: (response: any) => {
        console.log('Booking with passenger added successfully');
        this.bookingSuccessful = true; // Set bookingSuccessful to true after successful booking
      },
      error: (error: any) => {
        console.error('Error adding booking with passenger:', error);
        // Handle error message or any error-specific actions
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.UpdateSubscription?.unsubscribe();
  }
}


