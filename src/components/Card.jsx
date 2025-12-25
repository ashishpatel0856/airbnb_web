import { MapPin } from "lucide-react";
import React from "react";

export default function Card({ hotel }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      
      <img
        src={hotel.photos?.[0] || "https://placehold.co/600x400"}
        alt={hotel.name}
        className="h-44 sm:h-52 md:h-56 w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2">
          {hotel.name}
        </h3>

      
        <div className="text-sm text-gray-500 flex items-start gap-1 leading-snug">
          <MapPin size={15} className="mt-0.5 shrink-0" />
          <span className="line-clamp-2">
            {hotel.contactInfo?.location}, {hotel.city}
          </span>
        </div>

      
       <p className="text-xs text-gray-500 leading-snug">
          <span className="font-medium text-gray-700">Amenities:</span>{" "}
          {hotel.amenities?.join(", ")}
      </p>


        {/* Price */}
        <p className="font-semibold text-green-600 text-sm sm:text-base leading-tight">
          ₹ From room price / night
        </p>
      </div>
    </div>
  );
}
