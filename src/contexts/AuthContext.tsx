import React, { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IUser, IAuthContextType } from '../interfaces/Auth';

// TODO: Replace with calling UserService client functions here
export const AuthContext = createContext<IAuthContextType>({
  user: null,
  login: (user: IUser) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const { setItem, getItem, removeItem } = useLocalStorage();
  //const user_update = useRef(getItem('user'));

  useEffect(() => {
    const user_update = getItem('user');
    if (user_update && user !== null) {
      setUser(JSON.parse(user_update));
    }
  }, [user, getItem]);

  const login = (user: IUser) => {
    setUser({
      ...user,
      id: user?.id,
      email: user?.email,
      userType: user?.userType,
      authToken: user?.authToken,
    });
    setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
