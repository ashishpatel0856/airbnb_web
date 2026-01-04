import { createContext, useContext, useState } from "react";
import api from "../api/axiosConfig";
import React from "react";
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const createBooking = async ({ hotelId, roomId, checkInDate, checkOutDate }) => {
    setLoading(true);
    try {
      const res = await api.post("/bookings/init", {
        hotelId,
        roomId,
        checkInDate,
        checkOutDate,
      });
      setCurrentBooking(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{ currentBooking, createBooking, loading }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
