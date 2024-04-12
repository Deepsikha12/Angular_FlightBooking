import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../Services/flights.service';
import { Flight } from '../Models/Flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit{

  flight?:Flight[];

  constructor(private flightservice:FlightsService){

  }

  ngOnInit(): void {
    this.flightservice.getAllFlights()
    .subscribe({
      next:(response)=>{
        this.flight=response;
      }
    });
  }
}
