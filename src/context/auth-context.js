import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextStore = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextStore;
