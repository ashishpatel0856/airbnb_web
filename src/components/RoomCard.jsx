import React from "react";
import { IndianRupee, BedDouble } from "lucide-react";
import Button from "./Button";
import ImageSlider from "./ImageSlider";

export default function RoomCard({ room, hotelName, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      
      {/* Image Slider - smaller height */}
      <div className="w-full h-36 sm:h-44 md:h-48 lg:h-52 overflow-hidden rounded-t-2xl">
        <ImageSlider
          images={room.photos?.length ? room.photos : ["https://placehold.co/600x400"]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4  flex flex-col flex-1 gap-2">
        {/* Hotel Name */}
        <p className="text-sm text-gray-400 truncate">{hotelName}</p>

        {/* Room Type */}
        <h3 className="font-semibold text-lg">{room.type}</h3>

        {/* Capacity */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <BedDouble size={16} /> {room.capacity} Guests
        </div>

        {/* Amenities */}
        {room.amenities?.length > 0 && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            Amenities: {room.amenities.join(", ")}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-1 text-green-600 font-bold mt-2">
          <IndianRupee size={16} /> {room.basePrice}/night
        </div>

        {/* Book Now */}
        <Button
          onClick={() => onBook(room)}
          className="mt-auto w-full bg-[#FF385C] text-white rounded-xl py-2 hover:bg-[#e0314f] transition"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
