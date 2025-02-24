import React, { useEffect, useState, createContext, useContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("weatherUser")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("weatherToken") || null
  );
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || []
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);
  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (token, userData) => {
    localStorage.setItem("weatherToken", token);
    localStorage.setItem("weatherUser", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("weatherToken");
    localStorage.removeItem("weatherUser");
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        registeredUsers,
        setRegisteredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
