import { Routes, Route } from "react-router-dom";
import React from "react";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";

import AdminHotel from "./pages/AdminHotel";
import Rooms from "./pages/Rooms";

import ProtectedRoute from "./components/ProtectedRoute";
import BookingPage from "./pages/BookingPage";
import AllBookings from "./pages/AllBookings";

export default function App() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/hotels/:hotelId" element={<HotelDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ---------------- USER ROUTES ---------------- */}
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute allowedRoles={["USER", "HOTEL_MANAGER"]}>
            <BookingPage />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN / HOTEL MANAGER ROUTES ---------------- */}
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

      <Route
        path="/admin/hotels/:hotelId/bookings"
        element={
          <ProtectedRoute allowedRoles={["HOTEL_MANAGER"]}>
            <AllBookings />
          </ProtectedRoute>
        }
      />

      {/* ---------------- 404 / Catch-all Route ---------------- */}
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-xl font-semibold text-gray-600">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}
