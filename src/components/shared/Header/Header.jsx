import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import './Header.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const { setIsAuth, setToken, setUserId } = useContext(AuthContext);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (
      userData &&
      userData.token &&
      userData.userId &&
      new Date(userData.expiration) > new Date()
    ) {
      setIsAuth(true);
      setToken(userData.token);
      setUserId(userData.userId);
    } else {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
