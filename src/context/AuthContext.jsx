import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../api/axiosConfig";
import {jwtDecode} from "jwt-decode"; // fixed import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userRole, setUserRole] = useState(""); // user role
  const [userName, setUserName] = useState(""); // add username
  const [loading, setLoading] = useState(false);

  // Decode token on page load or token change
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.roles || []);
        setUserName(decoded.name || ""); // set name from JWT
      } catch (err) {
        console.error("Invalid token", err);
        setUserRole("");
        setUserName("");
      }
    } else {
      setUserRole("");
      setUserName("");
    }
  }, [token]);

  // Signup
  const signup = async ({ name, email, password, gender, dateOfBirth, roles }) => {
    setLoading(true);
    try {
      await api.post(API_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        gender,
        dateOfBirth,
        roles: roles || [],
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
    setLoading(true);
    try {
      const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const jwt = res.data?.accessToken || res.data?.data?.accessToken;
      if (!jwt) return { ok: false, error: { message: "Token missing" } };

      localStorage.setItem("token", jwt);
      setToken(jwt);

      // Decode JWT to get roles and username
      const decoded = jwtDecode(jwt);
      setUserRole(decoded.roles || []);
      setUserName(decoded.name || ""); // set name from JWT

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || { message: "Login failed" } };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole("");
    setUserName(""); // clear username on logout
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userName, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
