import React, { useState } from "react";
import bg from "../assets/logo_bg.webp";

export default function Hero() {
  return (
    <section className="relative h-[90vh]">
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Find your next stay
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90">
          Discover unique homes & experiences
        </p>

        {/* Search Card */}
        <div className="mt-10 bg-white text-black rounded-full shadow-xl p-3 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <input className="px-4 py-3 rounded-full border" placeholder="Where to?" />
            <input type="date" className="px-4 py-3 rounded-full border" />
            <input type="date" className="px-4 py-3 rounded-full border" />
            <input type="number" className="px-4 py-3 rounded-full border" min="1" />
            <button className="bg-[#FF385C] text-white rounded-full px-6">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

