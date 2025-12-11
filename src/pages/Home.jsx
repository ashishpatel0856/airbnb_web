import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";

export default function Home() {
  const example = [
    { title: "Ocean View Apartment", subtitle: "Goa, India", price: 120, image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff?auto=format&fit=crop&w=800&q=60" },
    { title: "Cozy Studio", subtitle: "Jaipur, India", price: 80, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=60" },
    { title: "Modern Flat", subtitle: "Bengaluru, India", price: 95, image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60" },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-xl font-semibold mb-6">Featured stays</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {example.map((e, i) => <Card key={i} {...e} />)}
        </div>
      </div>
    </>
  );
}
