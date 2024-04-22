import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightsService } from '../../Services/flights.service';
import { Flight } from '../Models/Flight.model';
import { UpdateFlight } from '../Models/Update-flight.model';

@Component({
  selector: 'app-edit-flights',
  templateUrl: './edit-flights.component.html',
  styleUrls: ['./edit-flights.component.css']
})
export class EditFlightsComponent implements OnInit,OnDestroy{

  aeroId :string |null =null;
  paramsSubscription?:Subscription;
  updateSubscruption?:Subscription;
  flight?:Flight;
  currentDate: Date = new Date(); // Get the current date

  constructor(private route:ActivatedRoute,
    private flightservice:FlightsService,
    private router:Router){

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next:(params)=>{
        this.aeroId=params.get('aeroId');

        if(this.aeroId){
          //get the data from the API with this aeroId
          this.flightservice.getFlightById(this.aeroId)
          .subscribe({
            next:(response)=>{
              this.flight=response;
            }
          });
        }
      }
    });
  }

  OnEdit(): void {
    const updateflight: UpdateFlight = {
      aeroName: this.flight?.aeroName ?? '',
      from_city: this.flight?.from_city ?? '',
      to_city: this.flight?.to_city ?? '',
      departure: this.flight?.departure ?? new Date(), // Assuming departure is always a Date
      arrival: this.flight?.arrival ?? new Date(),     // Assuming arrival is always a Date
      fare: this.flight?.fare ?? 0,
      seatingCapacity: this.flight?.seatingCapacity ?? 0 // Assuming seatingCapacity is a number
    };

    //pass this object to the service
    if(this.aeroId)
    {
    this.updateSubscruption=this.flightservice.updateflight(this.aeroId,updateflight)
    .subscribe({
      next:(response)=>{
        this.router.navigateByUrl('Management');
      }
    });
    }
  }

  OnDelete():void{
    if(this.aeroId)
    {
    this.flightservice.deleteflight(this.aeroId)
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.router.navigateByUrl('Management');
      }
    })
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    // Format the date and time as YYYY-MM-DDTHH:MM (required by datetime-local input)
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubscruption?.unsubscribe();
  }
}
