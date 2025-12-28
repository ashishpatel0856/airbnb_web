import React from "react";
import Button from "./Button";
import ImageSlider from "./ImageSlider";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 space-y-4">

      {/* Hotel Image Slider */}
      <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden">
        <ImageSlider
          images={hotel.photos?.length ? hotel.photos : ["https://placehold.co/600x400"]}
          className="w-full h-full rounded-xl"
        />
      </div>

      {/* Hotel Info */}
      <h2 className="text-2xl font-bold">{hotel.name}</h2>
      <p className="text-gray-500">{hotel.city}</p>
      <p className="text-gray-600 text-sm">{hotel.amenities?.join(", ")}</p>

      {/* Rooms Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {hotel.rooms?.map((room) => (
          <div
            key={room.id}
            className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-gray-50 rounded-xl p-3"
          >
            {/* Room Image Slider */}
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 rounded-lg overflow-hidden">
              <ImageSlider
                images={room.photos?.length ? room.photos : ["https://placehold.co/600x400"]}
                className="w-full h-full rounded-lg"
              />
            </div>

            {/* Room Details */}
            <div className="mt-2 flex flex-col gap-1">
              <h3 className="font-semibold text-lg uppercase">{room.type}</h3>
              <p className="text-gray-500 text-sm">
                Capacity: {room.capacity} | Available: {room.availableRooms}
              </p>
              <p className="text-gray-600 text-sm">{room.amenities?.join(", ")}</p>
              <p className="text-green-600 font-bold text-lg mt-1">
                ₹{room.price}/night
              </p>

              <Button className="mt-2 w-full bg-[#FF385C] hover:bg-[#e0314f] text-white rounded-xl py-2 text-sm font-medium">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
