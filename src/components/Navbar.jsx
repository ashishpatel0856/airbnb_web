import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        <h1 className="text-xl font-bold text-[#FF385C] tracking-tight">
          Airbnb
        </h1>

        <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow hover:shadow-md transition">
          <span className="font-medium">Anywhere</span>
          <span className="w-px h-5 bg-gray-300" />
          <span className="font-medium">Any week</span>
          <span className="w-px h-5 bg-gray-300" />
          <span className="text-gray-500">Add guests</span>
        </div>

        <div className="flex items-center gap-2 border rounded-full px-3 py-1 hover:shadow transition">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>

      </div>
    </nav>
  );
}
