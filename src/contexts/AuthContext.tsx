import React, { createContext, useContext, useEffect } from 'react';
import { client } from '../client';
import { UserData } from '../esc-backend/src/client';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import { IAuthContextType, IUserLogin } from '../interfaces/Auth';

// TODO: Replace with calling UserService client functions here
export const AuthContext = createContext<IAuthContextType>({
  user: null,
  temp_details: null,
  login: (UserData) => {},
  logout: async () => {},
  tempLogin: (IUserLogin) => {}
});

// IDK
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const user_update = localStorage.getItem('user');
  const temp_details_update = localStorage.getItem('temp_details');
  const [user, setUser] = React.useState<UserData | null>(JSON.parse(user_update!) || null);
  const [temp_details, setTempDetails] = React.useState<IUserLogin | null>(null);

  // Persist login session even if reload/refresh page or navigate manually with URL routes
  useEffect(() => {
    setUser(JSON.parse(user_update!));
    setTempDetails(JSON.parse(temp_details_update!))
  }, [user_update, temp_details_update]); 

  const login = (user_details: UserData) => {
    console.log('login was passed: ', user_details);
    console.log('user type passedwas: ', user_details?.typ);
    setUser(user_details);
  };

  const logout = async () => {
    console.log('LOGOUT');
    await client.authentication.removeAccessToken();
    console.log('logout');
    setUser(null);
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
