import React from "react";
import { IndianRupee, Users, BedDouble } from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={room.photos[0] || "https://placehold.co/600x400"}
        className="h-48 w-full object-cover"
        alt={room.type}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{room.type}</h3>
        <p className="text-gray-500 mb-2">
          <BedDouble size={14} /> Capacity: {room.capacity}
        </p>
        <p className="text-green-600 font-bold mb-2">
          <IndianRupee size={14} /> {room.basePrice} / night
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Amenities: {room.amenities.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          Total rooms: {room.totalCount}
        </p>
      </div>
    </div>
  );
}
