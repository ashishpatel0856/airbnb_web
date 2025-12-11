import React, { useState } from "react";
import bg from "../assets/logo_bg.webp";

export default function Hero() {
  const [search, setSearch] = useState({ location: "", checkIn: "", checkOut: "", guests: 1 });

  return (
    <section className="relative h-[72vh] md:h-[85vh]">
      <img src={bg} alt="bg" className="absolute inset-0 w-full h-full object-cover brightness-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Find your next stay</h1>
        <p className="text-sm md:text-lg text-white/90 mb-8">Amazing homes, curated for you</p>

        <div className="mx-auto w-full md:w-3/4 bg-white rounded-full p-3 shadow-lg -mt-6">
          <div className="flex flex-col md:flex-row gap-3 items-center px-3">
            <input className="flex-1 rounded-full px-4 py-3 outline-none" placeholder="Where to?" value={search.location} onChange={(e)=>setSearch({...search, location:e.target.value})} />
            <input type="date" className="rounded-full px-4 py-3" value={search.checkIn} onChange={(e)=>setSearch({...search, checkIn:e.target.value})} />
            <input type="date" className="rounded-full px-4 py-3" value={search.checkOut} onChange={(e)=>setSearch({...search, checkOut:e.target.value})} />
            <input type="number" className="w-24 rounded-full px-4 py-3" min="1" value={search.guests} onChange={(e)=>setSearch({...search, guests:e.target.value})} />
            <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-md">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}
