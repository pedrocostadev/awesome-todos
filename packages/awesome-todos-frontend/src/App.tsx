import React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/header/Header';

import 'awesome-todos-theme/src/index.css';

const App: React.FC = () => (
  <div>
    <Header />
    <Dashboard />
  </div>
);

export default App;
