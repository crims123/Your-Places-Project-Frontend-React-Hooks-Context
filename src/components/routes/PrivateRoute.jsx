import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        !isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
