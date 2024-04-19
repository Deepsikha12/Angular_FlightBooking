import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { BookingHistory } from '../Models/BookingHistory.model';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit, OnDestroy {

  email: string | null = null;
  cancellationStatus = '';
  paramsSubscription?: Subscription;
  booking: BookingHistory[] = [];
  checkinSuccess = false;
  popupVisible = false;
  popupMessage = '';
  confirmationPopupVisible = false;
  cancellationAeroId = '';
  cancellationPassengerId = 0;
  checkinPopupVisible = false;

  constructor(private route: ActivatedRoute,
              private bookingService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.email = params.get('email');
      if (this.email) {
        this.getBookingDetails();
      }
    });
  }

  getBookingDetails(): void {
    this.bookingService.getBookingId(this.email!)
      .subscribe({
        next: response => {
          this.booking = response;
        },
        error: error => {
          console.error('Error fetching booking details:', error);
        }
      });
  }

  checkIn(aeroId: string, passengerId: number, email: string): void {
    this.bookingService.checkInFlight(aeroId, passengerId, email)
      .subscribe({
        next: () => {
          this.checkinPopupVisible = true;
          this.checkinSuccess = true; // Set checkinSuccess to true after successful check-in
        },
        error: error => {
          console.error('Check-in error:', error);
        }
      });
  }


  closeCheckinPopup(): void {
    this.checkinPopupVisible = false;
  }

  cancelBookingConfirmation(aeroId: string, passengerId: number): void {
    this.confirmationPopupVisible = true;
    this.cancellationAeroId = aeroId;
    this.cancellationPassengerId = passengerId;
  }

  cancelBooking(): void {
    this.bookingService.deleteBooking(this.cancellationAeroId, this.cancellationPassengerId)
      .subscribe({
        next: () => {
          this.cancellationStatus = 'Cancellation successful';
          this.refreshBookingDetails();
          this.confirmationPopupVisible = false;
          // Set a timer to hide the cancellation status message after 5 seconds
          setTimeout(() => {
            this.cancellationStatus = '';
          }, 5000);
        },
        error: error => {
          console.error('Cancellation error:', error);
          this.cancellationStatus = 'Cancellation failed';
          this.confirmationPopupVisible = false;
          // Set a timer to hide the cancellation status message after 5 seconds
          setTimeout(() => {
            this.cancellationStatus = '';
          }, 5000);
        }
      });
  }


  showPopup(message: string): void {
    this.popupMessage = message;
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
    this.checkinSuccess = true;
  }

  refreshBookingDetails(): void {
    if (this.email) {
      this.getBookingDetails();
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
