import React, { createContext, useContext, useState } from "react";
import api from "../api/axiosConfig";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * createBooking
   * @param {Object} params
   * @param {number} params.hotelId
   * @param {number} params.roomId
   * @param {string} params.checkInDate - YYYY-MM-DD
   * @param {string} params.checkOutDate - YYYY-MM-DD
   * @param {number} params.roomsCount
   */
  const createBooking = async ({
    hotelId,
    roomId,
    checkInDate,
    checkOutDate,
    roomsCount = 1,
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Debug: log the payload
      console.log("Booking payload:", { hotelId, roomId, checkInDate, checkOutDate, roomsCount });
      console.log("POST URL:", api.defaults.baseURL + "/bookings/init");
      const res = await api.post("/bookings/init", {
        hotelId,
        roomId,
        checkInDate,
        checkOutDate,
        roomsCount,
      });

      // Save the booking to context
      setCurrentBooking(res.data.data || res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error("Failed to create booking:", err);
      setError(err.response?.data || err.message);
      throw err; // re-throw so the caller can handle it
    } finally {
      setLoading(false);
    }
  };

  const clearBooking = () => setCurrentBooking(null);

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        loading,
        error,
        createBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
