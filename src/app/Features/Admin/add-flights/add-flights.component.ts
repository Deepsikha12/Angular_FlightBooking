import { Component, OnDestroy } from '@angular/core';
import { AddFlight } from '../Models/Add-flights.model';
import { FlightsService } from '../../Services/flights.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnDestroy{

  model:AddFlight;
  private addflightsubscription?:Subscription;

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

  OnSave(){
    this.addflightsubscription=this.flightService.addflight(this.model)
    .subscribe({
      next:(response)=>{
        this.router.navigateByUrl('Management');
        console.log('Flights Added Successfully');
      }
    });
  }

  ngOnDestroy(): void {
    this.addflightsubscription?.unsubscribe();
  }

}
