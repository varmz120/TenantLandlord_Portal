import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const mockUser = {
  _id: 'test_user',
  password: '2222',
  // ... any other user properties you need
};

export const MockAuthProvider = ({ children, user = mockUser }) => {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
