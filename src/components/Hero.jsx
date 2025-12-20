import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import bg from "../assets/logo_bg.jpg";
import React from "react";
export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center">
      
      {/* Background Image */}
      <img
        src={bg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay (text readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Find stays you’ll love,
            <br className="hidden sm:block" />
            anywhere in the world
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-white/90 max-w-xl"
          >
            Hand-picked homes, premium hotels, and unforgettable experiences —
            curated just for you.
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 bg-white rounded-3xl shadow-2xl p-4 sm:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Location */}
              <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
                <MapPin className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Check in */}
              <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
                <Calendar className="text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Check out */}
              <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
                <Calendar className="text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
                <Users className="text-gray-400" size={20} />
                <input
                  type="number"
                  min="1"
                  placeholder="Guests"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Search Button */}
              <button className="bg-[#FF385C] hover:bg-[#e0314f] transition text-white rounded-2xl px-6 font-semibold">
                Search
              </button>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
