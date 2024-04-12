import { Injectable } from '@angular/core';
import { UserDetails } from '../Modles/SignUp.modles';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupLoginService {

  constructor(private http:HttpClient) { }

  addUser(model:UserDetails):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/UserDetails/AddSignup`, model)
  }
}
