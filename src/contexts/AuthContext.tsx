import React, { createContext, useEffect } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import { IUser, IAuthContextType, IUserLogin } from '../interfaces/Auth';

// TODO: Replace with calling UserService client functions here
export const AuthContext = createContext<IAuthContextType>({
  user: null,
  temp_details: null,
  login: (user: IUser) => {},
  logout: () => {},
  tempLogin: (temp_details: IUserLogin) => {}
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const user_update = localStorage.getItem('user');
  const temp_details_update = localStorage.getItem('temp_details');
  const [user, setUser] = React.useState<IUser | null>(JSON.parse(user_update!) || null);
  const [temp_details, setTempDetails] = React.useState<IUserLogin | null>(null);

  // Persist login session even if reload/refresh page or navigate manually with URL routes
  useEffect(() => {
    setUser(JSON.parse(user_update!));
    setTempDetails(JSON.parse(temp_details_update!))
  }, [user_update, temp_details_update]); 

  const login = (user_details: IUser) => {
    console.log('login was passed: ', user_details);
    console.log('user type passedwas: ', user_details?.typ);
    setUser({
      ...user,
      id: user_details?.id,
      password: user_details?.password,
      email: user_details?.email,
      typ: user_details?.typ,
    });
    console.log('user auth:', user?.typ);
    localStorage.setItem('user', JSON.stringify(user_details));
  };

  const logout = () => {
    console.log('logout');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('temp_details');
  };

  const tempLogin = (temp_details : IUserLogin) => {
    setTempDetails({
      ...temp_details,
      id: temp_details?.id,
      password: temp_details?.password,
    });
    localStorage.setItem('temp_details', JSON.stringify(temp_details));
  }

  return <AuthContext.Provider value={{ user, temp_details, login, logout, tempLogin}}>{children}</AuthContext.Provider>;
};
