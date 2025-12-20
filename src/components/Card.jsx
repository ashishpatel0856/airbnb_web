import { IndianRupee, Heart, Star } from "lucide-react";
import React from "react";
export default function Card({ hotel }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow hover:shadow-2xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={hotel.image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full">
          <Heart size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="fill-black" />
            {hotel.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500">{hotel.city}</p>

        <p className="flex items-center gap-1 mt-2">
          <IndianRupee size={14} />
          <span className="font-semibold">{hotel.price}</span>
          <span className="text-gray-500 text-sm">night</span>
        </p>
      </div>
    </div>
  );
}
