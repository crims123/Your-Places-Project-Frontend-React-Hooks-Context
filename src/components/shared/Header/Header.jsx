import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {isOpen && (
        <nav className="main-navigation__drawer-nav">
          <SideDrawer isOpen={isOpen} />
        </nav>
      )}

      <header className="main-header">
        <button onClick={handleOpenMenu} className="main-navigation__menu-btn">
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
