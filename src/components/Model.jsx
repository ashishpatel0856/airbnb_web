import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        {title && <h3 className="text-lg font-bold mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
