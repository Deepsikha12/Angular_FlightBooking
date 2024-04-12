import { PassengerDetails } from "./PassengerDetails.model";

export interface BookingHistory {
  email:string;
  aeroId: string;
  from_city: string;
  to_city: string;
  departure: Date;
  passengerId:number;
  passenger:PassengerDetails;
}
