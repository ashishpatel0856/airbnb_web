import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userRole, setUserRole] = useState(null); // user role
  const [loading, setLoading] = useState(false);

  // Decode role from token if token exists
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.roles || []); // roles from backend JWT
      } catch (err) {
        console.error("Invalid token", err);
        setUserRole(null);
      }
    }
  }, [token]);

  // Signup
  const signup = async ({ name, email, password, gender, dateOfBirth, roles }) => {
    setLoading(true);
    try {
      const res = await api.post(API_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        gender,
        dateOfBirth,
        roles: roles || [], // send roles if provided
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || { message: "Signup failed" } };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async ({ email, password }) => {
      console.log("LOGIN HIT", email, password);

    try {
      const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });
          console.log("LOGIN RESPONSE", res.data); 

      const jwt = res.data?.accessToken || res.data?.data?.accessToken;

      if (!jwt) return { ok: false, error: { message: "Token missing" } };

      localStorage.setItem("token", jwt);
      setToken(jwt);

      // Decode JWT to get roles
      const decoded = jwtDecode(jwt);
      setUserRole(decoded.roles || []);

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || { message: "Login failed" } };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
