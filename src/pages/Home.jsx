import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all hotels at home pages
  const allPublicHotels = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/hotels");
      console.log("Hotels API:", res.data);
      setHotels(res.data.data || []);
    } catch (err) {
      console.error("Error fetching hotels", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allPublicHotels();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Featured stays</h2>

        {loading ? (
          <p>Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p>No hotels available</p>
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
