import React from 'react';

import { AuthProvider } from '../../hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { ToastMessageProvider } from '../../hooks/useToastMessage';

interface Props {
  children: React.ReactElement;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastMessageProvider>{children}</ToastMessageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default AppProviders;
