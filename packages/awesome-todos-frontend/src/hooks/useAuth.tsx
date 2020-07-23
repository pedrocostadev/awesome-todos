import React, { useState } from 'react';
import { User } from 'awesome-todos-types';
import awesomeTodosApiClient from '../services/awesomeTodosApiClient';

interface LoginData {
  userName: string;
  password: string;
}

interface AuthContext {
  isAuthenticated: boolean;
  user?: User;
  login(loginData: LoginData): Promise<void>;
  logout(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = React.createContext<any>(undefined);
AuthContext.displayName = 'AuthContext';

const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const logout = (): void => setUser(undefined);
  // TODO: how to verify set cookie token in client???
  const login = async (loginData: LoginData): Promise<void> => {
    const user = await awesomeTodosApiClient.user.signIn(loginData);
    setUser(user);
  };

  const isAuthenticated = user !== undefined;

  return <AuthContext.Provider value={{ user, logout, login, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export default useAuth;
