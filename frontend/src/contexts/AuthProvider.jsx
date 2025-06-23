import React from 'react';
import { AuthContextProvider } from './AuthContext';

export function AuthProvider({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}