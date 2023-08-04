import { UserData } from "../esc-backend/src/client";

export interface IUserLogin {
  id: string | null;
  password: string | null;
}

export interface IAuthContextType {
  user: UserData | null;
  temp_details: IUserLogin | null;
  login: (user: UserData) => void;
  logout: () => Promise<void>;
  tempLogin: (tempdetails: IUserLogin) => void;
}
