import React, { createContext, useContext, useState } from "react";
import api, { API_ENDPOINTS } from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get token from localStorage on initial load
  const [token, setToken] = useState(localStorage.getItem("token") || null);
const login = async ({ email, password }) => {
  try {
    const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });

    // Backend sends: { accessToken: "..." }
    const jwt = res.data?.accessToken; // <-- change from 'token' to 'accessToken'

    if (!jwt) {
      return { ok: false, error: { message: "Token missing from response" } };
    }

    localStorage.setItem("token", jwt);
    setToken(jwt);

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err.response?.data || { message: "Login failed" },
    };
  }
};


  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily
export const useAuth = () => useContext(AuthContext);
