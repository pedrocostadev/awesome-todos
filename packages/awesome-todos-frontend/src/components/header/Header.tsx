import React from 'react';

import './Header.css';
import Link from '../link/Link';

const Header: React.FC = () => (
  <header className="header-container">
    <img className="logo" src="./logo.png" alt="awesome-todos logo" />
    <Link to="/" className="header-app-name" label="Awesome Todos App" />
  </header>
);

export default Header;
