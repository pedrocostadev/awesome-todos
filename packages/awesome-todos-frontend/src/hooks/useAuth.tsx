import React from 'react';

import awesomeTodosApiClient from '../services/awesomeTodosApiClient';

interface LoginData {
  userName: string;
  password: string;
}

interface AuthContext {
  login(loginData: LoginData): Promise<void>;
}

const login = async (loginData: LoginData): Promise<void> => {
  await awesomeTodosApiClient.user.signIn(loginData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = React.createContext<AuthContext>({ login });
AuthContext.displayName = 'AuthContext';

const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
);

export default useAuth;
