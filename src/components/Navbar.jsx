import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function Navbar() {
  const { userRole, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-[#FF385C]"
        >
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-[#FF385C]">
            <path d="M16 0C9.4 0 4 5.4 4 12c0 7.4 9.5 18.6 11.2 20.6.4.5 1.2.5 1.6 0C18.5 30.6 28 19.4 28 12 28 5.4 22.6 0 16 0z" />
          </svg>
          Staybnb
        </Link>

        {/* CENTER SEARCH (DESKTOP) */}
        <div className="hidden md:flex items-center bg-white rounded-full shadow-sm border px-4 py-2">
          <span className="text-sm font-medium">Anywhere</span>
          <span className="mx-3 h-5 w-px bg-gray-300" />
          <span className="text-sm font-medium">Any week</span>
          <span className="mx-3 h-5 w-px bg-gray-300" />
          <span className="text-sm text-gray-500">Add guests</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* DESKTOP AUTH */}
          {!userRole && (
            <div className="hidden md:flex gap-4 text-sm font-medium">
              <Link to="/login">Login</Link>
              <Link to="/signup" className="px-4 py-2 border rounded-full">
                Sign up
              </Link>
            </div>
          )}

          {/* USER MENU */}
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border rounded-full px-3 py-1"
            >
              <Menu size={18} />
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border text-sm">
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
                    <div className="px-4 py-3 font-medium">
                      {userRole === "HOTEL_MANAGER" ? "Hotel Manager" : "User"}
                    </div>

                    {userRole === "HOTEL_MANAGER" && (
                      <Link
                        to="/admin/hotels"
                        className="block px-4 py-3 hover:bg-gray-100"
                      >
                        Manage Hotels
                      </Link>
                    )}

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

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setMobile(true)} className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobile && (
        <div className="fixed inset-0 bg-white z-50 p-6">
          <div className="flex justify-between mb-6">
            <span className="text-xl font-bold text-[#FF385C]">Staybnb</span>
            <X onClick={() => setMobile(false)} />
          </div>

          <div className="space-y-4 text-lg">
            <Link to="/" onClick={() => setMobile(false)}>Home</Link>

            {!userRole && (
              <>
                <Link to="/login" onClick={() => setMobile(false)}>Login</Link>
                <Link to="/signup" onClick={() => setMobile(false)}>Sign up</Link>
              </>
            )}

            {userRole === "HOTEL_MANAGER" && (
              <Link to="/admin/hotels" onClick={() => setMobile(false)}>
                Manage Hotels
              </Link>
            )}

            {userRole && (
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
