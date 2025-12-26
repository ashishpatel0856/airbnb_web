import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosConfig";

const Search = () => {
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
      setHotels(res.data?.data?.hotels || []);
    } catch (error) {
      console.error("No hotels found", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      searchHotels();
    }
  }, [state]);

  if (loading) {
    return <p className="text-center mt-20">Loading hotels...</p>;
  }

  if (!hotels.length) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No hotels available for selected dates
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Stay in <span className="text-[#FF385C]">{state?.city}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.city}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-lg">
                  ₹{hotel.price}/night
                </span>
                <button className="px-4 py-2 bg-[#FF385C] text-white rounded-lg">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
