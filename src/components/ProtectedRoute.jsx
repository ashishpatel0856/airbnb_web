import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { token, userRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.some((r) => userRole.includes(r))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
