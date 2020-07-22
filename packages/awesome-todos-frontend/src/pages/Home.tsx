import React from 'react';

import Dashboard from '../components/dashboard/Dashboard';
import Header from '../components/header/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
};

export default Home;
