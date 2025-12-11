import React, { createContext, useContext, useState } from "react";
import api, { API_ENDPOINTS } from "../api/axiosConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    return token ? { token, name } : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const token = res.data?.token ?? res.data?.accessToken ?? "";
      const name = res.data?.name ?? res.data?.username ?? "";
      localStorage.setItem("token", token);
      if (name) localStorage.setItem("username", name);
      setUser({ token, name });
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.response?.data || err.message };
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      await api.post(API_ENDPOINTS.REGISTER, payload);
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.response?.data || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
