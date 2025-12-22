import { IndianRupee, Heart, Star } from "lucide-react";
import React from "react";
import Button from "./Button";

export default function Card({ hotel }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow hover:shadow-2xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition">
          <Heart size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        
        {/* Title + Rating */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="fill-black" />
            {hotel.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500">{hotel.city}</p>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between mt-3">
          <p className="flex items-center gap-1">
            <IndianRupee size={14} />
            <span className="font-semibold">{hotel.price}</span>
            <span className="text-gray-500 text-sm">/ night</span>
          </p>

          <Button className="bg-[#FF385C] text-white px-4 py-2 text-sm rounded-xl hover:bg-[#e0314f]">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
