import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await api.get("/public/hotels");
        setHotels(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl text-center font-bold mb-8">Available Hotels</h2>

        {loading ? (
          <p className="text-center text-lg">Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hotels available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
                <Card hotel={hotel} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
