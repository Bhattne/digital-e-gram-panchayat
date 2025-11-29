import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-5 bg-white shadow-md fixed top-0 left-0 z-50">
      <h2 className="text-2xl font-bold text-green-700">Digital E-Gram Panchayat</h2>

      <div>
        <Link
          to="/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
