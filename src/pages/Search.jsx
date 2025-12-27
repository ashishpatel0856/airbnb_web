import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosConfig";
import HotelCard from "../components/HotelCard";

export default function Search() {
  const { state } = useLocation();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchHotels = async () => {
    setLoading(true);
    try {
      const res = await api.post("/public/hotels/search", {
        city: state?.city,
        startDate: state?.startDate,
        endDate: state?.endDate,
        roomsCount: state?.roomsCount,
      });
      setHotels(res.data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) searchHotels();
  }, [state]);

  if (loading)
    return <p className="text-center mt-20 text-lg">Loading hotels...</p>;

  if (!hotels.length)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        No hotels available for selected dates
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
        Stays in <span className="text-[#FF385C]">{state?.city}</span>
      </h2>

      <div className="flex flex-col gap-10">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
