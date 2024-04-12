import { Component, OnDestroy, OnInit } from '@angular/core';
import { Flight } from '../../Admin/Models/Flight.model';
import { FlightsService } from '../../Services/flights.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  flist: Flight[] = [];
  filteredFlights: Flight[] = [];
  from_city: string = '';
  to_city: string = '';
  departure: Date = new Date;
  flightSearchForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private flightlistservice: FlightsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    this.flightSearchForm = this.formBuilder.group({
      from_city: [''],
      to_city: [''],
      departure: ['']
    });
  }

  loadFlights() {
    this.subscriptions.push(
      this.flightlistservice.getAllFlights()
        .subscribe({
          next: (response) => {
            this.flist = response;
            this.filteredFlights = response;
          },
          error: (error) => {
            console.error('Error loading flights:', error);
          }
        })
    );
  }

  search() {
    const { from_city, to_city,departure } = this.flightSearchForm.value;
    this.subscriptions.push(
      this.flightlistservice.searchFlights(from_city, to_city,departure)
        .subscribe({
          next: (response:any) => {
            this.filteredFlights = response;
          },
          error: (error:any) => {
            console.error('Error searching flights:', error);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
