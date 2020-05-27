import React, { createContext, useState } from 'react';
import tokenAuth from '../config/token';

export const AuthContext = createContext();

const AuthContextStore = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  if (token && userId && !localStorage.getItem('userData')) {
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate,
      })
    );
  }

  if (token) {
    tokenAuth(token);
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, token, setToken, userId, setUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextStore;
