import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isAuth, setIsAuth] = useState(null)
  const [isRequest, setIsRequest] = useState(false)
  const [isAdmin, setIsAdmin] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, isRequest, setIsRequest, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
