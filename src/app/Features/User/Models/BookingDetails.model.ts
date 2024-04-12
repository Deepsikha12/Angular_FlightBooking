import { PassengerDetails } from "./PassengerDetails.model";

export interface BookingDetails
{
  email:string;
  aeroId: string;
  from_city: string;
  to_city: string;
  fare: number;
  departure:Date;
  passenger :PassengerDetails;
}
