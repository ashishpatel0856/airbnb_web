import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#FF385C]">
          AirStay
        </Link>

        {/* Center Search */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border shadow-sm hover:shadow-md transition">
          <span className="text-sm font-medium">Anywhere</span>
          <span className="h-5 w-px bg-gray-300" />
          <span className="text-sm font-medium">Any week</span>
          <span className="h-5 w-px bg-gray-300" />
          <span className="text-sm text-gray-500">Add guests</span>
          <button className="bg-[#FF385C] text-white p-2 rounded-full">
            🔍
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 relative">
          <Link className="hidden md:block text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full">
            Become a host
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border rounded-full px-3 py-1 hover:shadow"
          >
            ☰
            <img
              className="w-8 h-8 rounded-full"
              src={user?.name
                ? `https://ui-avatars.com/api/?name=${user.name}`
                : "https://i.pravatar.cc/40"}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-14 bg-white w-52 rounded-xl shadow-lg border">
              {!user ? (
                <>
                  <Link className="block px-4 py-3 hover:bg-gray-100" to="/login">Login</Link>
                  <Link className="block px-4 py-3 hover:bg-gray-100" to="/signup">Sign up</Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600">Hi {user.name}</div>
                  <Link className="block px-4 py-3 hover:bg-gray-100" to="/profile">Profile</Link>
                  <Link className="block px-4 py-3 hover:bg-gray-100" to="/bookings">Bookings</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
