import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <Route
      {...props}
      render={(props) =>
        userData && userData.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
