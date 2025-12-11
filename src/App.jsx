import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import HotelDashboard from "./pages/HotelDashboard";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      {/* Protected routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <div className="p-6">Profile page — protected</div>
          </ProtectedRoute>
        } 
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HotelDashboard />
          </ProtectedRoute>
        }
      />

      

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
