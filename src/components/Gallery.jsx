import { motion } from "framer-motion";
import React from "react";
export default function Gallery() {
  const images = [
    "https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlyYm5ifGVufDB8fDB8fHww",
    "https://news.airbnb.com/wp-content/uploads/sites/4/2020/04/Airbnb_Mexico_Casa_Meztitla.jpg",
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://www.hosthub.com/wp-content/uploads/2023/02/small-hotel-room-interior-with-double-bed-bathroom-scaled.jpg"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-8">
        Inspiration for your next stay
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl overflow-hidden ${
              i === 0 ? "md:col-span-2 md:row-span-2 h-[400px]" : "h-48"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
