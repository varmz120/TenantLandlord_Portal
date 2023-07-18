export interface IUser {
  id: string | null;
  email: string | null;
  userType: number | null;
  authToken?: string | null;
}

export interface IAuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}
