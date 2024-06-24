import React, { createContext, useState, useEffect } from "react";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    setCookie("authToken", token, { path: "/", maxAge: 3600 });
    setIsLogin(true);
  };

  const handleLogout = () => {
    removeCookie("authToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
