import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Core/Components/navbar/navbar.component';
import { FlightListComponent } from './Features/Admin/flight-list/flight-list.component';
import { AddFlightsComponent } from './Features/Admin/add-flights/add-flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EditFlightsComponent } from './Features/Admin/edit-flights/edit-flights.component';
import { SignUpComponent } from './Core/Components/sign-up/sign-up.component';
import { LoginComponent } from './Core/Components/Auth/login/login.component';
import { AuthinterceptorInterceptor } from './Core/Interceptor/authinterceptor.interceptor';
import { FirstPageComponent } from './Features/Common-Features/first-page/first-page.component';
import { SearchComponent } from './Features/Common-Features/search/search.component';
import { BookingComponent } from './Features/User/booking/booking.component';
import { HistoryBookingComponent } from './Features/User/history-booking/history-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlightListComponent,
    AddFlightsComponent,
    EditFlightsComponent,
    SignUpComponent,
    LoginComponent,
    FirstPageComponent,
    SearchComponent,
    BookingComponent,
    HistoryBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthinterceptorInterceptor,
    multi :true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
