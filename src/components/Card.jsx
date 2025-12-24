import { MapPin } from "lucide-react";
import React from "react";
export default function Card({ hotel }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      {/* Image */}
     <img
  src={hotel.photos?.[0] || "https://placehold.co/600x400"}
  className="h-48 w-full object-cover"
/>


      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin size={14} />
          {hotel.contactInfo?.location}, {hotel.city}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {hotel.amenities?.slice(0, 4).map((a, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Temporary Price placeholder */}
        <p className="font-semibold text-green-600 mt-3">
          ₹ From room price / night
        </p>
      </div>
    </div>
  );
}
