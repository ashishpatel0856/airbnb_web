import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ImageSlider from "../components/ImageSlider";
import Skeleton from "../components/Skeleton";

const STATUS_STYLES = {
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  RESERVED: "bg-yellow-100 text-yellow-700",
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayment = async (id) => {
    try {
      const res = await api.post(`/bookings/${id}/payments`);
      window.location.href = res.data.sessionUrl;
    } catch {
      alert("Payment failed");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel booking?")) return;
    try {
      await api.post(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch {
      alert("Cancel failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-2xl p-4 space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No bookings found
        </p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-48 w-full">
                {b.hotelPhotos?.length ? (
                  <ImageSlider images={b.hotelPhotos} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg truncate">
                    {b.hotelName || "Hotel"}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[b.bookingStatus]}`}
                  >
                    {b.bookingStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Room: <span className="font-medium">{b.roomType}</span>
                </p>

                <div className="text-sm text-gray-600">
                  <p>Check-in: {b.checkInDate}</p>
                  <p>Check-out: {b.checkOutDate}</p>
                  <p>Rooms: {b.roomsCount}</p>
                  <p className="font-semibold text-black">
                    ₹{b.amount}
                  </p>
                </div>

                {/* AMENITIES */}
                {/* {b.roomAmenities?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.roomAmenities.map((a, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )} */}

                     {b.roomAmenities?.length > 0 && (
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">Amenities:</span>{" "}
                        {b.roomAmenities.join(", ")}
                      </p>
                    )}


                {/* ACTIONS */}
                <div className="flex gap-2 pt-3">
                  {b.bookingStatus === "RESERVED" && (
                    <button
                      onClick={() => handlePayment(b.id)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}
                  {b.bookingStatus !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
