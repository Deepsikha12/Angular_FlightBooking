import { Injectable } from '@angular/core';
import { AddFlight } from '../Admin/Models/Add-flights.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../Admin/Models/Flight.model';
import { environment } from 'src/environments/environment';
import { UpdateFlight } from '../Admin/Models/Update-flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http:HttpClient) { }

  addflight(model:AddFlight):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Admin/AddFlightDetails?addAuth=true`,model);
  }

  getAllFlights():Observable<Flight[]>{
    return this.http.get<Flight[]>(`${environment.apiBaseUrl}/api/Admin/GetFlightDetails`);
  }

  getFlightById(aeroId:string):Observable<Flight>{
    return this.http.get<Flight>(`${environment.apiBaseUrl}/api/Admin/GetFlightDetail?aeroId=${aeroId}&addAuth=true`);
  }

  updateflight(aeroId:string , updateflight:UpdateFlight):Observable<Flight>{
    return this.http.put<Flight>(`${environment.apiBaseUrl}/api/Admin/UpdateFlightDetails?aeroId=${aeroId}&addAuth=true`,updateflight)
  }

  deleteflight(aeroId:string):Observable<Flight>{
    return this.http.delete<Flight>(`${environment.apiBaseUrl}/api/Admin/DeleteFlightDetails?aeroId=${aeroId}&addAuth=true`)
  }

  searchFlights(from_city: string, to_city: string,departure:Date): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.apiBaseUrl}/api/Search/SearchFlight?from_city=${from_city}&to_city=${to_city}&departure=${departure}`);
  }
}
