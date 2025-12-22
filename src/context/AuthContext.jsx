import React, { createContext, useContext, useState } from "react";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading,setLoading] = useState(false); // setLoading user ko repeat action se rokta h

  //signup
 const signup = async ({ name, email, password,gender,dateOfBirth ,roles}) => {
  setLoading(true);
  try {
    const res = await api.post(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
      gender,
      dateOfBirth,
       roles: [], 
      
    });

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err.response?.data || { message: "Signup failed" },
    };
  } finally {
    setLoading(false);
  }
};

  //login
const login = async ({ email, password }) => {
  try {
    const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });

    console.log("LOGIN RESPONSE ", res.data);

    const jwt =
      res.data?.accessToken || res.data?.data?.accessToken;

    if (!jwt) {
      return {
        ok: false,
        error: { message: "Token missing from response" },
      };
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
    <AuthContext.Provider value={{ token,signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily
export const useAuth = () => useContext(AuthContext);


