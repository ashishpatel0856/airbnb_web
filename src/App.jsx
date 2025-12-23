import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminHotel from "./pages/AdminHotel";
import ProtectedRoute from "./components/ProtectedRoute";
import Rooms from "./pages/Rooms";

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

            <Route
        path="/admin/hotels/:hotelId/rooms"
        element={
          <ProtectedRoute allowedRoles={["HOTEL_MANAGER"]}>
            <Rooms />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
