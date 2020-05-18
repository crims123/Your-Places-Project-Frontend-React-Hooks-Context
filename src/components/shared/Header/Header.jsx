import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <React.Fragment>
      <header className="main-header">
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
