import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/logo_bg.jpg";

import Input from "./Input";
import Button from "./Button";
import useCounter from "../hooks/useCounter";

export default function Hero() {
  const navigate = useNavigate();

  // reusable counter hook
  const rooms = useCounter(1, 1);

  const [search, setSearch] = useState({
    city: "",
    startDate: "",
    endDate: "",
    roomsCount: rooms.value,
  });

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // sync counter value with search state
  useEffect(() => {
    setSearch((prev) => ({
      ...prev,
      roomsCount: rooms.value,
    }));
  }, [rooms.value]);

  const handleSearch = () => {
    navigate("/search", { state: search });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <img
        src={bg}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative w-full max-w-7xl px-4">
        {/* Text */}
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Find your next <br />
            <span className="text-[#FF385C]">perfect stay</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Hand-picked hotels and homes for every journey.
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mx-auto max-w-5xl
            bg-white/95 backdrop-blur-md
            rounded-2xl
            p-3 sm:p-4
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-3
            shadow-[0_20px_45px_rgba(0,0,0,0.15)]
          "
        >
          {/* Location */}
          <Input
            label="Location"
            name="city"
            value={search.city}
            onChange={handleChange}
            placeholder="City"
            icon={MapPin}
          />

          {/* Check-in */}
          <Input
            label="Check in"
            type="date"
            name="startDate"
            value={search.startDate}
            onChange={handleChange}
            icon={Calendar}
          />

          {/* Check-out */}
          <Input
            label="Check out"
            type="date"
            name="endDate"
            value={search.endDate}
            onChange={handleChange}
            icon={Calendar}
          />

          {/* Rooms Counter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Rooms
            </label>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300">
              <button onClick={rooms.decrement}>
                <Minus size={14} />
              </button>
              <span className="text-sm font-semibold">
                {rooms.value}
              </span>
              <button onClick={rooms.increment}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full h-[42px] bg-[#FF385C] text-white hover:bg-[#e11d48]"
            >
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
