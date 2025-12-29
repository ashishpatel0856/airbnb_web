import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images = [], onImageClick, className = "" }) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = false;
  };
  const onTouchMove = (e) => {
    const diff = Math.abs(startX.current - e.touches[0].clientX);
    if (diff > 5) isDragging.current = true;
  };
  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const onMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = false;
  };
  const onMouseMove = (e) => {
    const diff = Math.abs(startX.current - e.clientX);
    if (diff > 5) isDragging.current = true;
  };
  const onMouseUp = (e) => {
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const handleClick = () => {
    if (!isDragging.current && onImageClick) onImageClick();
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
 
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-full object-cover rounded-xl cursor-pointer transition-all duration-300"
        draggable={false}
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-0.5 rounded-full text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-0.5 rounded-full text-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              current === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
