import React from "react";

export default function Input({ label, icon: Icon, className = "", ...props }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400 dark:text-gray-400" size={18} />}
        <input
          {...props}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition dark:border-gray-700 dark:placeholder-gray-500"
        />
      </div>
    </div>
  );
}
