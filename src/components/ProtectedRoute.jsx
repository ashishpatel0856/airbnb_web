import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { token, userRole } = useAuth();

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.some((role) => userRole?.includes(role))
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
