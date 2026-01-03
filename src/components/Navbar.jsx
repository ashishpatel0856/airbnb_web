import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React from "react";
import ic from "../assets/icons.svg";

export default function Navbar() {
  const { userRole, userName, logout } = useAuth(); // get userName from auth context

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl text-[#FF385C]">
            <img
              src={ic}
              alt="Airbnb logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <span className="leading-none">Airbnb</span>
          </div>

          {/* Search */}
          <div className="hidden sm:flex items-center bg-white rounded-full shadow-sm border px-4 py-2 text-sm">
            <span className="font-medium">Anywhere</span>
            <span className="mx-3 h-5 w-px bg-gray-300" />
            <span className="font-medium hidden md:inline">Any week</span>
            <span className="mx-3 h-5 w-px bg-gray-300 hidden md:block" />
            <span className="text-gray-500">Add guests</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border rounded-full px-3 py-1 hover:shadow transition"
              >
                <Menu size={18} />
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border text-sm overflow-hidden">
                  {!userRole ? (
                    <>
                      <Link to="/login" className="block px-4 py-3 hover:bg-gray-100">
                        Login
                      </Link>
                      <Link to="/signup" className="block px-4 py-3 hover:bg-gray-100">
                        Sign up
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 font-medium border-b">
                        Hello, {userName || (userRole === "HOTEL_MANAGER" ? "Hotel Manager" : "User")}
                      </div>

                      {/* Bookings link for normal user */}
                      {userRole !== "HOTEL_MANAGER" && (
                        <Link
                          to="/my-bookings"
                          className="block px-4 py-3 hover:bg-gray-100"
                        >
                          My Bookings
                        </Link>
                      )}

                      {/* Manage Hotels for hotel manager */}
                      {userRole === "HOTEL_MANAGER" && (
                        <Link
                          to="/admin/hotels"
                          className="block px-4 py-3 hover:bg-gray-100"
                        >
                          Manage Hotels
                        </Link>
                      )}

                      {/* Sign out */}
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobile(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobile(false)}
          />

          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-[#FF385C]">Airbnb</span>
              <X onClick={() => setMobile(false)} className="cursor-pointer" />
            </div>

            <div className="flex flex-col gap-4 text-lg">
              <Link to="/" onClick={() => setMobile(false)}>Home</Link>

              {!userRole && (
                <>
                  <Link to="/login" onClick={() => setMobile(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setMobile(false)}>Sign up</Link>
                </>
              )}

              {userRole !== "HOTEL_MANAGER" && (
                <Link to="/my-bookings" onClick={() => setMobile(false)}>
                  My Bookings
                </Link>
              )}

              {userRole === "HOTEL_MANAGER" && (
                <Link to="/admin/hotels" onClick={() => setMobile(false)}>
                  Manage Hotels
                </Link>
              )}

              {userRole && (
                <button onClick={logout} className="text-left text-red-500">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
