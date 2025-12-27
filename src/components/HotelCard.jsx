import React from "react";
import Button from "./Button";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4">
      {/* Hotel Images Carousel */}
      <div className="flex overflow-x-auto gap-2 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-4">
        {(hotel.photos?.length ? hotel.photos : ["https://placehold.co/600x400"]).map(
          (img, i) => (
            <img
              key={i}
              src={img}
              alt={hotel.name}
              className="h-56 w-[300px] sm:w-[350px] md:w-[400px] object-cover rounded-xl flex-shrink-0 snap-start"
            />
          )
        )}
      </div>

      {/* Hotel Name & City */}
      <h2 className="text-2xl font-bold">{hotel.name}</h2>
      <p className="text-gray-500">{hotel.city}</p>

      {/* Hotel Amenities */}
      <p className="text-gray-600 text-sm mt-1">{hotel.amenities?.join(", ")}</p>

      {/* Rooms Horizontal Scroll */}
      <div className="mt-4 flex gap-4 overflow-x-auto snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2">
        {hotel.rooms?.map((room) => (
          <div
            key={room.id}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-gray-50 rounded-xl p-3 snap-start"
          >
            {/* Room Images Carousel */}
            <div className="flex overflow-x-auto gap-2 snap-x mb-2">
              {(room.photos?.length ? room.photos : ["https://placehold.co/600x400"]).map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={room.type}
                    className="h-40 w-60 sm:w-64 md:w-72 object-cover rounded-lg flex-shrink-0 snap-start"
                  />
                )
              )}
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
