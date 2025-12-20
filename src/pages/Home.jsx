import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import Footer from "../components/Footer";
import React from "react";
export default function Home() {
  const hotels = [
    {
      name: "Ocean View Villa",
      city: "Goa",
      price: 4999,
      rating: 4.8,
      image: "https://cdn.tapetender70er.de/media/image/7e/cd/e4/AirBnB-3_944x944@2x.jpg",
    },
    {
      name: "Royal Palace",
      city: "Udaipur",
      price: 6999,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      name: "Hilltop Retreat",
      city: "Manali",
      price: 3999,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">
          Featured stays
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, i) => (
            <Card key={i} hotel={hotel} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
