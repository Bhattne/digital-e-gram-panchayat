import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  function choose(role) {
    localStorage.setItem("selectedRole", role); // ⭐ FIX — role now stores in browser
    navigate("/login", { state: { role } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F] px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-600/10 blur-2xl"></div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-2xl shadow-2xl
                      hover:shadow-emerald-500/40 transition duration-300 w-full max-w-lg text-center">
        
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
          Select Your Role
        </h1>

        <p className="text-gray-300 mb-10 text-lg">
          Continue as Citizen or Admin
        </p>

        <div className="flex flex-col gap-5">

          <button
            onClick={() => choose("citizen")}
            className="w-full py-4 rounded-xl text-black font-semibold text-lg
                       bg-emerald-400 hover:bg-emerald-500 hover:scale-105
                       shadow shadow-emerald-500/30 transition-transform">
            Citizen Portal
          </button>

          <button
            onClick={() => choose("admin")}
            className="w-full py-4 rounded-xl font-semibold text-lg text-white
                       bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105
                       shadow shadow-purple-500/40 transition-transform">
            Admin Portal
          </button>

        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-10 text-gray-300 hover:text-white text-sm underline">
          ← Back to Home
        </button>

      </div>
    </div>
  );
}
