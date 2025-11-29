// src/pages/CitizenDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import FloatingAIButton from "../components/FloatingAIButton";  // ⬅  ONLY ADDED IMPORT

export default function CitizenDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white p-10">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-emerald-400 drop-shadow mb-3">
        Citizen Dashboard 👤
      </h1>
      <p className="text-gray-300 text-lg">
        Welcome! You can access public services here.
      </p>

      {/* MAIN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

<Link 
  to="/admin/ai-assistant"
  className="p-6 rounded-2xl bg-black/30 border border-teal-500/40 shadow-lg hover:shadow-teal-400/40 hover:scale-105 transition"
>
  <h2 className="text-xl font-semibold text-teal-300">🤖 AI Gram Assistant</h2>
  <p className="text-gray-400 mt-2">Ask questions & get instant help.</p>
</Link>
        <Link 
          to="/electricity" 
          className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-emerald-600/30 shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-emerald-300">⚡ Electricity Service</h2>
          <p className="text-gray-400 mt-2">Apply for connection or report issues.</p>
        </Link>

        <Link 
          to="/water" 
          className="p-6 rounded-2xl bg-black/30 border border-cyan-500/40 shadow-lg hover:shadow-cyan-400/40 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-cyan-300">💧 Water Supply</h2>
          <p className="text-gray-400 mt-2">Water supply request & complaints.</p>
        </Link>

        <Link 
          to="/road" 
          className="p-6 rounded-2xl bg-black/30 border border-yellow-500/40 shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-yellow-300">🛣 Road & Infrastructure</h2>
          <p className="text-gray-400 mt-2">Submit road issues or suggestions.</p>
        </Link>

        <Link 
          to="/complaint" 
          className="p-6 rounded-2xl bg-black/30 border border-red-500/40 shadow-lg hover:shadow-red-400/40 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-red-300">📝 Register Complaint</h2>
          <p className="text-gray-400 mt-2">Report problems directly.</p>
        </Link>

        <Link 
          to="/status" 
          className="p-6 rounded-2xl bg-black/30 border border-purple-500/40 shadow-lg hover:shadow-purple-400/40 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-purple-300">📊 Complaint Status</h2>
          <p className="text-gray-400 mt-2">Track complaint progress.</p>
        </Link>

        <Link 
          to="/notices" 
          className="p-6 rounded-2xl bg-black/30 border border-blue-500/40 shadow-lg hover:shadow-blue-400/40 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-blue-300">📢 Notices / Announcements</h2>
          <p className="text-gray-400 mt-2">Village notices, updates & events.</p>
        </Link>

      </div>

      {/* RETURN BUTTON */}
      <div className="mt-12">
        <Link to="/" className="text-emerald-400 text-lg underline hover:text-emerald-300">
          ⬅ Back to Home
        </Link>
      </div>

      {/* AI BUTTON ADDED — NOTHING ELSE CHANGED */}
      <FloatingAIButton />   {/* ✅ AI Chat Assistant appears bottom-right */}

    </div>
  );
}
