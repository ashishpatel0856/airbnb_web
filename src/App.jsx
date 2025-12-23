import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminHotel from "./pages/AdminHotel";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Only HOTEL_MANAGER can access */}
      <Route
        path="/admin/hotels"
        element={
          <ProtectedRoute allowedRoles={["HOTEL_MANAGER"]}>
            <AdminHotel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
