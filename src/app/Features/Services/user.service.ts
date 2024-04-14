import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingDetails } from '../User/Models/BookingDetails.model';
import { environment } from 'src/environments/environment';
import { BookingHistory } from '../User/Models/BookingHistory.model';
import { UserDetails } from 'src/app/Core/Components/Modles/SignUp.modles';
import { UserUpdate } from '../User/Models/updateUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addBooking(model :BookingDetails):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/UserDetails/BookingDetails?addAuth=true`, model);
  }

  getBookingId(email:string):Observable<BookingHistory[]>{
    return this.http.get<BookingHistory[]>(`${environment.apiBaseUrl}/api/UserDetails/GetBookingDetail?email=${email}&addAuth=true`);
  }

  deleteBooking(aeroId:string,passengerId:number):Observable<BookingHistory>{
    return this.http.delete<BookingHistory>(`${environment.apiBaseUrl}/api/UserDetails/BookingCancel?aeroId=${aeroId}&passengerId=${passengerId}&addAuth=true`);
  }

  checkInFlight(aeroId:string,passengerId:number,email:string):Observable<BookingHistory>{
    return this.http.get<BookingHistory>(`${environment.apiBaseUrl}/api/UserDetails/CheckInFlightDetails?aeroId=${aeroId}&passengerId=${passengerId}&userEmail=${email}&addAuth=true`);
  }

  getuserbyemail(email:string):Observable<UserDetails>{
    return this.http.get<UserDetails>(`${environment.apiBaseUrl}/api/UserDetails/GetUserDetail?email=${email}&addAuth=true`);
  }

  updateuser(email:string,userupdate:UserUpdate):Observable<UserDetails>{
    return this.http.put<UserDetails>(`${environment.apiBaseUrl}/api/UserDetails/UpdateSignup?email=${email}&addAuth=true`,userupdate);
  }

  deleteuser(email:string):Observable<UserDetails>{
    return this.http.delete<UserDetails>(`${environment.apiBaseUrl}/api/UserDetails/DeleteSignup?email=${email}&addAuth=true`);
  }
}
