import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...otherProps }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/signIn" />;
  }

  return <Route {...otherProps}>{children}</Route>;
};

export default PrivateRoute;
