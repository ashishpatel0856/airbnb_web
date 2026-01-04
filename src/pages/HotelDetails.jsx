import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import { useBooking } from "../context/BookingContext";

export default function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hotel and rooms
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await api.get(`/public/hotels/${hotelId}`);
        setHotel(res.data.data.hotel);
        setRooms(res.data.data.rooms || []);
      } catch (err) {
        console.error("Failed to fetch hotel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  // Handle room booking
const handleBookNow = async (room) => {
  const checkIn = "2026-01-10";
  const checkOut = "2026-01-12";

  try {
    const booking = await createBooking({
      hotelId,
      roomId: room.id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      roomsCount: 1,
    });
    console.log("Booking successful:", booking);
    navigate("/my-bookings");
  } catch (err) {
    alert("Failed to book room. Please try again.");
  }
};

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading hotel...</p>;
  if (!hotel)
    return <p className="text-center mt-20 text-gray-600">Hotel not found</p>;

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hotel Info */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-gray-700 mb-2">{hotel.city}</p>
          {hotel.amenities?.length > 0 && (
            <p className="text-gray-600 text-sm sm:text-base">
              Amenities: {hotel.amenities.join(", ")}
            </p>
          )}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={handleBookNow}
            />
          ))}
        </div>
      </section>
    </>
  );
}
