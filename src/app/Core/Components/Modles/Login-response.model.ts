import { User } from "./User.model";

export interface LoginResponse {
  token :string;
  user:User
}
