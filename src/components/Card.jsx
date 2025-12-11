import React from "react";

export default function Card({ image, title, subtitle, price }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition">
      <div className="h-44 md:h-56 bg-gray-100">
        {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold">${price}</div>
            <div className="text-xs text-gray-500">/ night</div>
          </div>
        </div>
      </div>
    </div>
  );
}
