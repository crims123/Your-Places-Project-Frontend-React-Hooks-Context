import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const handleLogOut = () => {
    setIsAuth(false);
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>

      {isAuth && (
        <React.Fragment>
          <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>

          <li>
            <button onClick={handleLogOut}>LOGOUT</button>
          </li>
        </React.Fragment>
      )}

      {!isAuth && (
        <React.Fragment>
          <li>
            <NavLink to="/auth">LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/signup">SIGNUP</NavLink>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
