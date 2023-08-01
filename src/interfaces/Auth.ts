export interface IUser {
  id: string | null;
  email: string | null;
  typ: number | null;
  notifications?: [] | null;
}

export interface IAuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}
