import React from "react";
import { IndianRupee } from "lucide-react";

const PLACEHOLDER =
  "https://via.placeholder.com/400x300?text=No+Image";

export default function Card({ hotel }) {
  const images = hotel.photos?.length
    ? hotel.photos.slice(0, 3)
    : [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];

  return (
    <div className="group cursor-pointer">
      <div className="rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-[2px] h-52">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-full w-full object-cover group-hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
        <p className="text-sm text-gray-500">{hotel.city}</p>
        <p className="text-sm">
          <span className="font-semibold text-gray-900">
            ₹{hotel.basePrice}
          </span>{" "}
          night
        </p>
      </div>
    </div>
  );
}
