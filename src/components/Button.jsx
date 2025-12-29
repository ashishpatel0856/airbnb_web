import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-semibold shadow-md transition transform hover:-translate-y-0.5 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
