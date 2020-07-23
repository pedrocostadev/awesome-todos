import React, { useState } from 'react';
import ToastMessage from '../components/toastMessage/ToastMessage';

const THREE_SECONDS = 3000;

interface ToastMessageContext {
  showErrorMessage(message: string): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToastMessageProviderContext = React.createContext<any>(undefined);
ToastMessageProviderContext.displayName = 'ToastMessageContext';

export const ToastMessageProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const showErrorMessage = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(undefined), THREE_SECONDS);
  };

  return (
    <ToastMessageProviderContext.Provider value={{ showErrorMessage }}>
      <ToastMessage show={errorMessage !== undefined} message={errorMessage as string} />
      {children}
    </ToastMessageProviderContext.Provider>
  );
};

export const useToastMessage = (): ToastMessageContext => {
  const context = React.useContext(ToastMessageProviderContext);
  if (context === undefined) {
    throw new Error(`useToastMessage must be used within a ToastMessageContextProvider`);
  }
  return context;
};
