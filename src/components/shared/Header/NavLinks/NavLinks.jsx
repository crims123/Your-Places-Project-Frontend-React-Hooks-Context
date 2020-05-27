import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const { isAuth, setIsAuth, userId, setUserId, setToken } = useContext(
    AuthContext
  );

  const history = useHistory();

  const handleLogOut = () => {
    setIsAuth(false);
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
    history.push('/');
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
            <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
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
