import React from "react";
import { IndianRupee, BedDouble } from "lucide-react";
import Button from "./Button";
import ImageSlider from "./ImageSlider"; 

export default function RoomCard({ room, onClick }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      
      {/* Image Slider */}
      <div className="w-full h-44 sm:h-52 md:h-56 select-none">
        <ImageSlider
          images={room.photos?.length ? room.photos : ["https://placehold.co/600x400"]}
          onImageClick={onClick ? () => onClick(room) : undefined} 
        />
      </div>

      {/* Room Info */}
      <div className="p-4 flex flex-col gap-4 flex-1">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg">{room.type}</h3>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <BedDouble size={16} />
              <span>Capacity: {room.capacity}</span>
            </div>

            <div className="flex items-center gap-1 text-green-600 font-bold mt-2">
              <IndianRupee size={16} />
              <span>{room.basePrice}/night</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 sm:text-right">
            <p className="mb-1 leading-relaxed">
              <span className="font-medium">Amenities:</span>{" "}
              <span className="break-words">{room.amenities.join(", ")}</span>
            </p>
            <p>
              <span className="font-medium">Total rooms:</span> {room.totalCount}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <Button className="w-full py-3 bg-[#FF385C] hover:bg-[#e0314f] text-white rounded-2xl text-sm font-medium">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
