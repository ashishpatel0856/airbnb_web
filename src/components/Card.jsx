import { IndianRupee, Heart, Star } from "lucide-react";
import React from "react";
import Button from "./Button";
export default function Card({ hotel }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={hotel.image || "https://placehold.co/600x400"}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{hotel.name}</h3>
        <p className="text-sm text-gray-500">{hotel.city}</p>
        <p className="text-green-600 font-bold">
          {IndianRupee}{hotel.minPrice} / night
        </p>
      </div>
    </div>
  );
}
