import React from "react";

export default function Input({
  label,
  icon: Icon,
  error,
  ...props
}) {
  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Input box */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition
          ${error
            ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500"
            : "border-gray-300 focus-within:ring-1 focus-within:ring-red-400"}
        `}
      >
        {Icon && <Icon size={18} className="text-gray-400" />}
        <input
          {...props}
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/*  Error Message */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
