/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext();

const checkToken = () => {
  const token = Cookies.get("tokenf");
  if(token) {
    return true;
  }
  else  {
    return false;
  }
}

const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(checkToken);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkToken();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, server }}>
      {children}
    </AuthContext.Provider>
  );
};

const server =  `http://localhost:4000/api/v1`;
export { AuthContext, AuthProvider, server };