import { Injectable } from '@angular/core';
import { Login } from '../Modles/Login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../Modles/Login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Modles/User.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http:HttpClient,
    private cookieservice:CookieService) { }

  login(request:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Login/Login`,{
      email:request.email,
      password:request.password,
      role:request.role,
    });
  }

  serUser(user:User):void{

    this.$user.next(user);
    localStorage.setItem('useremail',user.email);
    localStorage.setItem('password',user.password);
    localStorage.setItem('userrole',user.role);
  }

  user():Observable<User |undefined>{
    return this.$user.asObservable();
  }

  getUser(): User|undefined{
    const email = localStorage.getItem('useremail');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('userrole');

    if(email && password && role){
      const user: User ={
        email :email,
        password:password,
        role:role
      };
      return user;
    }
    return undefined;
  }

  logout():void{
    localStorage.clear();
    this.cookieservice.delete('Authorization','/');
    this.$user.next(undefined);
  }
}
