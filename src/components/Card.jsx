import { MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";

export default function Card({ hotel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${hotel.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="w-full h-44 sm:h-52 md:h-56 rounded-xl overflow-hidden">
        <ImageSlider
          images={hotel.photos?.length ? hotel.photos : ["https://placehold.co/600x400"]}
          onClick={handleClick} 
          className="w-full h-full rounded-xl"
        />
      </div>

      <div
        onClick={handleClick}
        className="p-4 flex flex-col gap-2 flex-1 cursor-pointer"
      >
        <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
          {hotel.name}
        </h3>

        <div className="text-sm text-gray-500 flex items-start gap-1">
          <MapPin size={15} className="mt-0.5" />
          <span className="line-clamp-2">
            {hotel.contactInfo?.location}, {hotel.city}
          </span>
        </div>

        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">Amenities:</span>{" "}
          {hotel.amenities?.join(", ")}
        </p>

        <p className="font-semibold text-green-600 text-sm sm:text-base">
          ₹ From room price / night
        </p>
      </div>
    </div>
  );
}
