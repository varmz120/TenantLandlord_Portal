import React, { createContext, useEffect } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import { IUser, IAuthContextType } from '../interfaces/Auth';

// TODO: Replace with calling UserService client functions here
export const AuthContext = createContext<IAuthContextType>({
  user: null,
  login: (user: IUser) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const user_update = localStorage.getItem('user');
  const [user, setUser] = React.useState<IUser | null>(JSON.parse(user_update!) || null);

  // Persist login session even if reload/refresh page or navigate manually with URL routes
  useEffect(() => {
    setUser(JSON.parse(user_update!));
  }, [user_update]); //localStorage.getItem('user')

  const login = (user_details: IUser) => {
    setUser({
      ...user,
      id: user_details?.id,
      email: user_details?.email,
      userType: user_details?.userType,
      authToken: user_details?.authToken,
    });
    localStorage.setItem('user', JSON.stringify(user_details));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
