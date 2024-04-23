import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddFlight } from '../Models/Add-flights.model';
import { FlightsService } from '../../Services/flights.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnDestroy{

  model:AddFlight;
  private addflightsubscription?:Subscription;
  aeroIdPattern = /^[A-Z]{3}\d{3}$/; // Pattern for AeroId validation
  submitted = false; // Variable to track form submission

  constructor(private flightService:FlightsService,
    private router:Router){
    this.model={
      aeroId:'',
      aeroName:'',
      from_city: '',
      to_city: '',
      departure: new Date,
      arrival: new Date,
      fare: 0,
      seatingCapacity: 0,
    };
  }

  getCurrentDateTime(): string {
    const now = new Date();
    // Format the date and time as YYYY-MM-DDTHH:MM (required by datetime-local input)
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }
    // Function to reset form
    resetForm(form: NgForm) {
      form.resetForm();
      this.submitted = false;
    }

    // Function to check AeroId validity
    isAeroIdValid() {
      return this.aeroIdPattern.test(this.model.aeroId);
    }


    OnSave(form: NgForm){
      if (this.model.from_city === this.model.to_city) {
        // Set custom errors for source and destination being the same
        form.controls['from_city'].setErrors({ 'sameAsDestination': true });
        form.controls['to_city'].setErrors({ 'sameAsSource': true });
        return; // Exit the function early if validation fails
      }

      this.addflightsubscription=this.flightService.addflight(this.model)
        .subscribe({
          next:(response)=>{
            // Display alert box
            alert('Flight details have been successfully added!');
            // Redirect to the management page
            this.router.navigateByUrl('Management');
            console.log('Flights Added Successfully');
          }
        });
    }



  ngOnDestroy(): void {
    this.addflightsubscription?.unsubscribe();
  }

}
