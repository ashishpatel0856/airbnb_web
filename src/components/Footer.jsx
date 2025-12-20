import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h3 className="font-semibold mb-3">Airbnb</h3>
          <p className="text-gray-500">
            Discover unique places to stay around the world.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-gray-500">
            <li>Hotels</li>
            <li>Experiences</li>
            <li>Destinations</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-500">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-gray-500">
            <li>Help Center</li>
            <li>Cancellation</li>
            <li>Safety</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 pb-6">
        © 2025 Staybnb. All rights reserved.
      </div>
    </footer>
  );
}
