export interface IUser {
  id: string | null;
  password: string | null;
  email: string | null;
  typ: number | null;
  notifications?: [] | null;
}

export interface IUserLogin {
  id: string | null;
  password: string | null;
}

export interface IAuthContextType {
  user: IUser | null;
  temp_details: IUserLogin | null;
  login: (user: IUser) => void;
  logout: () => void;
  tempLogin: (tempdetails: IUserLogin) => void;
}
