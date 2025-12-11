import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosConfig, { API_ENDPOINTS } from "../api/axiosConfig";
import { Mail, User, Lock } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosConfig.post(API_ENDPOINTS.REGISTER, formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 
    bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 relative overflow-hidden">

      {/* Blurred circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl" />

      {/* Glassmorphic Card */}
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl shadow-2xl 
        border border-white/30 rounded-3xl p-10 relative z-10">

        <h1 className="text-4xl font-extrabold text-white text-center mb-2 drop-shadow-lg">
          Create an Account
        </h1>

        <p className="text-center text-white/80 mb-8">
          Join our community and start your amazing journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-600" size={20} />
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-md 
              focus:ring-2 focus:ring-white focus:outline-none text-gray-900 placeholder-gray-500
              shadow-sm"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-600" size={20} />
            <input
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-md 
              focus:ring-2 focus:ring-white focus:outline-none text-gray-900 placeholder-gray-500
              shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-600" size={20} />
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-md 
              focus:ring-2 focus:ring-white focus:outline-none text-gray-900 placeholder-gray-500
              shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white/90 text-blue-700 font-bold text-lg 
            rounded-xl shadow-lg hover:bg-white transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
