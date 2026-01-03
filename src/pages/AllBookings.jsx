import React, { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import api from "../api/axiosConfig";

const STATUS_STYLES = {
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  RESERVED: "bg-yellow-100 text-yellow-700",
  GUESTS_ADDED: "bg-blue-100 text-blue-700",
};

export default function AllBookings({ hotelId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/hotels/${hotelId}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [hotelId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-2xl p-5 space-y-4">
              <Skeleton className="h-5 w-1/2 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500 text-center mt-20">No bookings found.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Booking #{b.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    STATUS_STYLES[b.bookingStatus]
                  }`}
                >
                  {b.bookingStatus}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Check-in:</span> {b.checkInDate}
                </p>
                <p>
                  <span className="font-medium">Check-out:</span> {b.checkOutDate}
                </p>
                <p>
                  <span className="font-medium">Rooms:</span> {b.roomsCount}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> ₹{b.amount}
                </p>
              </div>

              {b.guests?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-800 mb-1">Guests</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {b.guests.map((g, i) => (
                      <li key={i}>{g.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
