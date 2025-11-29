import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // optional but makes it beautiful
import AiChatAssistant from "./AiChatAssistant";
<AiChatAssistant />  
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#09131F] to-[#02111D] text-white px-6 py-10">

      {/* HEADER */}
      <motion.h1 
        initial={{opacity:0,y:-10}} 
        animate={{opacity:1,y:0}} 
        className="text-4xl font-extrabold text-center text-yellow-400 tracking-wide drop-shadow-md"
      >
        ADMIN CONTROL PANEL 🏛
      </motion.h1>

      <p className="text-gray-300 text-center mt-1 text-lg">
        Manage village digital services and operations smoothly.
      </p>

      <div className="w-full text-center mt-8">
        <div className="inline-block px-6 py-2 rounded-full border border-yellow-400 text-yellow-400 text-sm tracking-wide">
          Logged in as Administrator
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12 max-w-6xl mx-auto">
<AdminCard 
  to="/admin/ai-assistant" 
  title="AI Gram Assistant" 
  icon="🤖"
  desc="Chat with AI and get smart insights!"
  color="from-teal-500 to-emerald-600"
/>

        <AdminCard to="/admin/complaints" title="Complaint Handling" icon="📝"
          desc="View, filter & resolve public complaints" color="from-purple-600 to-pink-600" />

        <AdminCard to="/admin/electricity" title="Electricity Control" icon="⚡"
          desc="Power outages, unit usage, load scheduling" color="from-yellow-500 to-orange-600" />

        <AdminCard to="/admin/water" title="Water Supply Management" icon="💧"
          desc="Track supply, demand & distribution" color="from-cyan-500 to-blue-500" />

        <AdminCard to="/admin/road" title="Road & Infrastructure" icon="🛣"
          desc="Approve construction & road repairs" color="from-green-500 to-emerald-600" />

        <AdminCard to="/admin/billing" title="Billing & Payments" icon="💰"
          desc="Electricity + water billing & dues" color="from-amber-500 to-red-600" />

        <AdminCard to="/admin/notices" title="Notice Board" icon="📜"
          desc="Upload notices, PDFs, circulars" color="from-indigo-600 to-purple-700" />
      </div>

      {/* FOOTER */}
      <div className="text-center mt-14">
        <Link to="/" aclassName="text-emerald-400 hover:text-emerald-300 text-sm underline">
          ⬅ Return to home
        </Link>
        
      </div>

    </div>
  );
}

/******************
  CARD COMPONENT
*******************/
function AdminCard({ to, icon, title, desc, color }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale:1.05 }}
        whileTap={{ scale:0.98 }}
        className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${color} transition-all cursor-pointer`}
      >
        <div className="text-4xl mb-3">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-200 mt-1 text-sm opacity-90">{desc}</p>
      </motion.div>
    </Link>
  );
}
