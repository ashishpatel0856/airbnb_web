import React, { useEffect, useState } from "react";
import api from '../api/axiosConfig';
import Skeleton from "../components/Skeleton"; // Make sure you imported Skeleton

const STATUS_STYLES = {
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  RESERVED: "bg-yellow-100 text-yellow-700",
  GUESTS_ADDED: "bg-blue-100 text-blue-700",
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/myBookings");
       setBookings(res.data.data || []);

    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setLoading(true);
    try {
      await api.post(`/bookings/${bookingId}/cancel`);
      fetchBookings(); // refresh bookings
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    setLoading(true);
    try {
      const res = await api.post(`/bookings/${bookingId}/payments`);
      window.location.href = res.data.sessionUrl; // redirect to Stripe
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-2xl p-5 space-y-4">
              <Skeleton className="h-5 w-1/2 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500 text-center mt-20">
          No bookings found.
        </p>
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

              <div className="mt-4 flex space-x-2">
                {b.bookingStatus === "RESERVED" && (
                  <button
                    onClick={() => handlePayment(b.id)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                )}
                {b.bookingStatus !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
