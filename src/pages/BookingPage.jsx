import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ImageSlider from "../components/ImageSlider";
import Skeleton from "../components/Skeleton";
import Input from "../components/Input";

const STATUS_STYLES = {
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  RESERVED: "bg-yellow-100 text-yellow-700",
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);
  const [guests, setGuests] = useState([{ name: "", gender: "MALE", age: "" }]);

  const openGuestModal = (bookingId) => {
    setActiveBookingId(bookingId);
    setShowGuestModal(true);
  };

  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const addMoreGuest = () => {
    setGuests([...guests, { name: "", gender: "MALE", age: "" }]);
  };


  // fetching all bookings
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


  // payments
  const handlePayment = async (id) => {
    try {
      const res = await api.post(`/bookings/${id}/payments`);
      window.location.href = res.data.sessionUrl;
    } catch {
      alert("Payment failed");
    }
  };



  //cancel bookings
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel booking?")) return;
    try {
      await api.post(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch {
      alert("Cancel failed");
    }
  };


  // adding new guest
  const submitGuests = async () => {
    try {
      await api.post(`/bookings/${activeBookingId}/addGuests`, guests);
      setShowGuestModal(false);
      setGuests([{ name: "", gender: "MALE", age: "" }]);
      fetchBookings();
    } catch (err) {
      alert("Failed to add guests");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

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
        <p className="text-center text-gray-500 mt-20">No bookings found</p>
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
                  <p className="font-semibold text-black">₹{b.amount}</p>
                </div>

                {/* AMENITIES */}
                {b.roomAmenities?.length > 0 && (
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-medium">Amenities:</span>{" "}
                    {b.roomAmenities.join(", ")}
                  </p>
                )}

                {/* GUESTS */}
               {b.guests?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">
                    Guests:
                  </p>
                  <p className="text-sm text-gray-600">
                    {b.guests.map(g => g.name).join(", ")}
                  </p>
                </div>
              )}


                {/* ACTIONS */}
    
            <div className="flex gap-2 pt-3">

            {/* RESERVED → Add Guests */}
              {b.bookingStatus === "RESERVED" && (
                <button
                  onClick={() => openGuestModal(b.id)}
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-black"
                >
                  Add Guests
                </button>
              )}

              {/* GUESTS_ADDED → Pay + Cancel */}
              {b.bookingStatus === "GUESTS_ADDED" && (
                <>
                  <button
                    onClick={() => handlePayment(b.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Pay Now
                  </button>

                  <button
                    onClick={() => handleCancel(b.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* CONFIRMED → Cancel only */}
              {b.bookingStatus === "CONFIRMED" && (
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

      {/* GUEST MODAL */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Add Guests</h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {guests.map((g, i) => (
                <div key={i} className="border rounded-xl p-4 space-y-3">
                  <Input
                    label="Guest Name"
                    placeholder="Enter name"
                    value={g.name}
                    onChange={(e) =>
                      handleGuestChange(i, "name", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        value={g.gender}
                        onChange={(e) =>
                          handleGuestChange(i, "gender", e.target.value)
                        }
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <Input
                      label="Age"
                      type="number"
                      placeholder="Age"
                      value={g.age}
                      onChange={(e) =>
                        handleGuestChange(i, "age", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addMoreGuest}
              className="w-full mt-4 bg-gray-100 py-2 rounded-lg text-sm"
            >
              + Add another guest
            </button>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowGuestModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitGuests}
                className="flex-1 bg-[#FF385C] text-white py-2 rounded-lg"
              >
                Save Guests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
