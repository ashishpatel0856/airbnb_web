import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import Footer from "../components/Footer";
import React from "react";
import Button from "../components/Button";
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

        {
      name: "The Gardena",
      city: "UP",
      price: 4999,
      rating: 4.8,
      image: "https://news.airbnb.com/wp-content/uploads/sites/4/2019/01/hotelmemo.jpg",
    },
    {
      name: "Golden Fortune",
      city: "Gorakhpur",
      price: 6999,
      rating: 4.9,
      image: "https://etimg.etb2bimg.com/photo/99991759.cms",
    },
    {
      name: "Grandsr",
      city: "Delhi",
      price: 3999,
      rating: 4.7,
      image: "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Airbnb-room-design-ideas-Courtney-B.jpg",
    },
        {
      name: "The Raj Palace",
      city: "Uttrakhand",
      price: 4999,
      rating: 4.8,
      image: "https://www.loribeds.com/cdn/shop/articles/lori_optimize_2e92b6c0-bc7c-4570-990b-6c4867c96094_600x.png?v=1744813117",
    },
    {
      name: "The Royel City",
      city: "Kanpur",
      price: 6999,
      rating: 4.9,
      image: "https://r1imghtlak.mmtcdn.com/e3571782-f875-48cc-a6b4-95cf24dc1299.PNG?&output-quality=75&downsize=520:350&crop=520:350;0,159&output-format=jpg&downsize=480:336&crop=480:336",
    },
    {
      name: "Singhasni Vartika",
      city: "Mumbai",
      price: 3999,
      rating: 4.7,
      image: "https://9to5mac.com/wp-content/uploads/sites/6/2023/05/Airbnb-Rooms.jpg?quality=82&strip=all",
    },
        {
      name: "The Taj Palace",
      city: "Lucknow",
      price: 4999,
      rating: 4.8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5MT4M3MKzDWtCHyzx0Q9Emy7Hq0Ob0nZUQ&s",
    },
    {
      name: "Tanushree Grand",
      city: "Ghaziabad",
      price: 6999,
      rating: 4.9,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStHKBBYk1hWDhKHOqiwZRs63O7enSHHnCi7A&s",
    },
    {
      name: "The Sai Hotel",
      city: "Asam",
      price: 3999,
      rating: 4.7,
      image: "https://www.autohost.ai/assets/blog/featured_airbnb-bedroom-ideas_airbnb-bedroom-ideas_758294f4.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl  font-bold mb-8">
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
