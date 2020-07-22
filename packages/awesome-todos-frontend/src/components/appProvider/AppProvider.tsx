import React from 'react';

import { AuthProvider } from '../../hooks/auth/useAuth';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};
export default AppProviders;
