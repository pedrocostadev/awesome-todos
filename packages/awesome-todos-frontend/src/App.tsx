import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'awesome-todos-theme/src/index.css';
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import AppProviders from './components/appProvider/AppProvider';

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
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </div>
  </AppProviders>
);

export default App;
