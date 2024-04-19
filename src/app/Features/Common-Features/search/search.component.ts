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
  minDepartureDate?: Date;
  searched: boolean = false;
  errorMessage: string = ''; // Add errorMessage property

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
    }, { validator: this.validateSourceDestination });
    this.minDepartureDate = new Date();
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
    const { from_city, to_city, departure } = this.flightSearchForm.value;
    this.subscriptions.push(
      this.flightlistservice.searchFlights(from_city, to_city, departure)
        .subscribe({
          next: (response: any) => {
            if (typeof response === 'string') {
              // Handle string response (message)
              this.filteredFlights = []; // Clear existing flights
              this.errorMessage = response; // Display message
              this.searched = true;
            } else {
              // Handle array response (flights)
              this.filteredFlights = response;
              this.searched = true;
            }
          },
          error: (error: any) => {
            if (error.status === 404) {
              // Handle 404 error (no flights available)
              this.filteredFlights = []; // Clear existing flights
              this.errorMessage = 'No flights available for the selected criteria.'; // Display message
              this.searched = true;
            } else {
              console.error('Error searching flights:', error);
            }
          }
        })
    );
  }


  validateSourceDestination(formGroup: FormGroup) {
    const source = formGroup.get('from_city')?.value;
    const destination = formGroup.get('to_city')?.value;
    if (source === destination) {
      formGroup.get('to_city')?.setErrors({ sameAsSource: true });
    } else {
      formGroup.get('to_city')?.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
