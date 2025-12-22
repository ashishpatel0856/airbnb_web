import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import bg from "../assets/logo_bg.jpg";
import Button from "./Button";
import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      
      {/* Background */}
      <img
        src={bg}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
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
            className="mt-6 text-base sm:text-lg text-white/90 max-w-xl"
          >
            Discover hand-picked homes, premium hotels and unforgettable
            experiences tailored just for you.
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="
              mt-12 
              rounded-3xl 
             
              backdrop-blur-xl 
              shadow-2xl 
              border border-white/30
              p-4 sm:p-6
            "
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Location */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  Location
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FF385C]">
                  <MapPin size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* Check in */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  Check in
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FF385C]">
                  <Calendar size={18} className="text-gray-400" />
                  <input
                    type="date"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* Check out */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  Check out
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FF385C]">
                  <Calendar size={18} className="text-gray-400" />
                  <input
                    type="date"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  Guests
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FF385C]">
                  <Users size={18} className="text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Add guests"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-[#FF385C] hover:bg-[#e0314f] text-white rounded-2xl">
                  Search
                </Button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
