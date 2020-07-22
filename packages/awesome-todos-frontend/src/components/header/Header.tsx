import React from 'react';
import './Header.css';

const Header: React.FC = () => (
  <header className="header-container">
    <img className="logo" src="./logo.png" alt="awesome-todos logo" />
    <span className="header-app-name">Awesome Todos App</span>
  </header>
);

export default Header;
