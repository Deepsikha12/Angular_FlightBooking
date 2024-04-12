import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingDetails } from '../User/Models/BookingDetails.model';
import { environment } from 'src/environments/environment';
import { BookingHistory } from '../User/Models/BookingHistory.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addBooking(model :BookingDetails):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/UserDetails/BookingDetails`, model)
  }

  getBookingId(email:string):Observable<BookingHistory[]>{
    return this.http.get<BookingHistory[]>(`${environment.apiBaseUrl}/api/UserDetails/GetBookingDetail?email=${email}`)
  }

  deleteBooking(aeroId:string,passengerId:number):Observable<BookingHistory>{
    return this.http.delete<BookingHistory>(`${environment.apiBaseUrl}/api/UserDetails/BookingCancel?aeroId=${aeroId}&passengerId=${passengerId}`)
  }

  checkInFlight(aeroId:string,passengerId:number,email:string):Observable<BookingHistory>{
    return this.http.get<BookingHistory>(`${environment.apiBaseUrl}/api/UserDetails/CheckInFlightDetails?aeroId=${aeroId}&passengerId=${passengerId}&userEmail=${email}`)
  }
}
