import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.post("/hotels/search", {
      city: "Prayagraj",                 // 👈 test city
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 2 * 86400000)
        .toISOString()
        .slice(0, 10),
      roomsCount: 1,
      page: 0,
      size: 9
    })
      .then(res => {
        console.log("HOTELS", res.data);
        setHotels(res.data?.content || []);
      })
      .catch(err => {
        console.error("Search error", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">
          Featured stays
        </h2>

        {loading ? (
          <p>Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p>No hotels available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => (
              <Card key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
