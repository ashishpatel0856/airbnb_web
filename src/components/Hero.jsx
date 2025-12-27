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

  useEffect(() => {
    setSearch((prev) => ({
      ...prev,
      roomsCount: rooms.value,
    }));
  }, [rooms.value]);

  const handleSearch = () => {
    if (!search.city || !search.startDate || !search.endDate) {
      alert("Please fill all fields");
      return;
    }

    navigate("/search", { state: search });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <img
        src={bg}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-7xl px-4">
        <div className="text-center text-white mb-10">
          <h1 className="text-5xl font-bold">
            Find your <span className="text-[#FF385C]">perfect stay</span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          <Input
            label="Location"
            name="city"
            value={search.city}
            onChange={handleChange}
            placeholder="City"
            icon={MapPin}
          />

          <Input
            label="Check in"
            type="date"
            name="startDate"
            value={search.startDate}
            onChange={handleChange}
            icon={Calendar}
          />

          <Input
            label="Check out"
            type="date"
            name="endDate"
            value={search.endDate}
            onChange={handleChange}
            icon={Calendar}
          />

          <div>
            <label className="text-sm font-medium">Rooms</label>
            <div className="flex items-center justify-between border rounded-lg px-3 py-2">
              <button onClick={rooms.decrement}>
                <Minus size={14} />
              </button>
              <span>{rooms.value}</span>
              <button onClick={rooms.increment}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="bg-[#FF385C] text-white"
          >
            Search
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
