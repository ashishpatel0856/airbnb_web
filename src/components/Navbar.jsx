import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-red-500">AirStay</Link>
            <div className="hidden md:flex items-center bg-white rounded-full border px-3 py-2 shadow-sm">
              <input className="outline-none px-3 w-56" placeholder="Search destinations" />
              <div className="px-2 text-gray-300">|</div>
              <input className="outline-none px-3 w-36" placeholder="Dates" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/become-host" className="hidden md:block text-sm px-3 py-2 rounded-full hover:bg-gray-100">Become a host</Link>

            <div ref={ref} className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 border rounded-full px-3 py-2 hover:shadow">
                <Menu size={16} />
                <img src={user?.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=EDE9FE&color=5B21B6` : "https://i.pravatar.cc/40"} alt="avatar" className="w-8 h-8 rounded-full" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
                  {!user ? (
                    <>
                      <Link className="block px-4 py-2 hover:bg-gray-100" to="/login">Login</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-100" to="/signup">Sign Up</Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700">Hi, {user.name}</div>
                      <Link className="block px-4 py-2 hover:bg-gray-100" to="/profile">Profile</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-100" to="/bookings">Bookings</Link>
                      <div className="border-t mt-2" />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
