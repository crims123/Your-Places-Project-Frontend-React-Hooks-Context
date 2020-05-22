import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextStore = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, token, setToken, userId, setUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextStore;
