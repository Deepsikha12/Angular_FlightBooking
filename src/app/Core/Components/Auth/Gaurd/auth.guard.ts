import { Token } from '@angular/compiler';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Service/auth.service';
import jwtDecode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

// check for the token
let token = cookieService.get('Authorization');

if(token && user){
  token = token.replace('Bearer', '');
  const decodedtoken : any=jwtDecode(token);

  //Check for token Expiration
  const Expiration = decodedtoken.exp * 1000;
  const currentTime = new Date().getTime();

  if(Expiration < currentTime){
    authService.logout();
  return router.createUrlTree(['Login'],{queryParams : {returnUrl : state.url }})
  }
  else{

    //token is still valild

    if(user.role.includes('Admin')){
      return true;
    }
    else {
      alert ('Unauthorized');
      return false;
    }
  }
}
else{
  //LogOut
  authService.logout();
  return router.createUrlTree(['Login'],{queryParams : {returnUrl : state.url }})
}
};
