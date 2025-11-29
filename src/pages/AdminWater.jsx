import React, { useState } from "react";

export default function AdminWater() {
  const [tankerRequests, setRequests] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-[#001015] text-white p-10">

      <h1 className="text-4xl font-bold text-blue-400 mb-6">💧 Water Supply Control Panel</h1>

      {/* Tanker Distribution */}
      <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold">Tanker Requests</h2>

        <div className="flex mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter area name"
            className="flex-1 bg-black px-3 py-2 rounded-l-lg"
          />
          <button
            onClick={() => {setRequests([...tankerRequests, input]); setInput(""); }}
            className="bg-blue-500 px-5 py-2 rounded-r-lg font-semibold"
          >
            Add
          </button>
        </div>

        <ul className="mt-3 space-y-2">
        {tankerRequests.map((a,i)=>(
          <li key={i} className="bg-blue-700/30 px-3 py-2 rounded-lg">
            🚰 Tanker Dispatched → {a}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
