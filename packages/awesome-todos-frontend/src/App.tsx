import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'awesome-todos-theme/src/index.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import AppProviders from './components/appProvider/AppProvider';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const App: React.FC = () => (
  <AppProviders>
    <div>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="*">
          <Home />
        </PrivateRoute>
      </Switch>
    </div>
  </AppProviders>
);

export default App;
