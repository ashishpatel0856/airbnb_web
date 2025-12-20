import React, { useState } from "react";
import bg from "../assets/logo_bg.jpg";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center">
      
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Find your perfect stay
        </h1>
        <p className="mt-4 text-lg text-white/90">
          Book unique homes & experiences around the world
        </p>

        {/* Floating search */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="border p-3 rounded-xl" placeholder="Location" />
          <input type="date" className="border p-3 rounded-xl" />
          <input type="date" className="border p-3 rounded-xl" />
          <button className="bg-[#FF385C] text-white rounded-xl font-semibold">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}


