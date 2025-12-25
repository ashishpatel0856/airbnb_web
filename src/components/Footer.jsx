import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t text-gray-600">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-gray-900 text-base mb-3">
              Airbnb
            </h3>
            <p className="text-sm leading-relaxed">
              Discover unique places to stay around the world.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-900 cursor-pointer">Hotels</li>
              <li className="hover:text-gray-900 cursor-pointer">Experiences</li>
              <li className="hover:text-gray-900 cursor-pointer">Destinations</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-900 cursor-pointer">About</li>
              <li className="hover:text-gray-900 cursor-pointer">Careers</li>
              <li className="hover:text-gray-900 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-900 cursor-pointer">Help Center</li>
              <li className="hover:text-gray-900 cursor-pointer">Cancellation</li>
              <li className="hover:text-gray-900 cursor-pointer">Safety</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © 2025 Airbnb. All rights reserved.
      </div>
    </footer>
  );
}
