import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './Features/Admin/flight-list/flight-list.component';
import { AddFlightsComponent } from './Features/Admin/add-flights/add-flights.component';
import { EditFlightsComponent } from './Features/Admin/edit-flights/edit-flights.component';
import { SignUpComponent } from './Core/Components/sign-up/sign-up.component';
import { LoginComponent } from './Core/Components/Auth/login/login.component';
import { authGuard } from './Core/Components/Auth/Gaurd/auth.guard';
import { FirstPageComponent } from './Features/Common-Features/first-page/first-page.component';
import { SearchComponent } from './Features/Common-Features/search/search.component';
import { BookingComponent } from './Features/User/booking/booking.component';
import { HistoryBookingComponent } from './Features/User/history-booking/history-booking.component';

const routes: Routes = [
  {
    path:'Flight Booking',
    component:FirstPageComponent
  },
  {
    path:'Sign Up',
    component:SignUpComponent
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'Search',
    component:SearchComponent
  },
  {
    path:'History/:email',
    component:HistoryBookingComponent
  },
  {
    path:'Search/Book Ticket/:aeroId',
    component:BookingComponent
  },
  {
    path:'Management',
    component:FlightListComponent,
    canActivate:[authGuard]
  },
  {
    path:'Management/Add Flights',
    component:AddFlightsComponent,
    canActivate:[authGuard]
  },
  {
    path:'Management/Edit/:aeroId',
    component:EditFlightsComponent,
    canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
