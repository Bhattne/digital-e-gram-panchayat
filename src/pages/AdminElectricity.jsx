import React, { useState } from "react";

export default function AdminElectricity() {

  const [powerStatus, setPowerStatus] = useState("Stable");
  const [outages, setOutages] = useState([]);
  const [newArea, setNewArea] = useState("");

  function reportOutage() {
    if (newArea.trim() !== "") {
      setOutages([...outages, newArea]);
      setNewArea("");
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white p-10">

      <h1 className="text-4xl font-extrabold mb-6 text-emerald-400">
        ⚡ Electricity Supply Control Center
      </h1>

      {/* status card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-emerald-600">
          <h2 className="text-2xl font-bold">Current Grid Status</h2>
          <p className="text-xl mt-2 text-emerald-300">{powerStatus}</p>
          <button
            onClick={() => setPowerStatus("Under Maintenance")}
            className="mt-4 bg-emerald-500 px-5 py-2 rounded-lg font-semibold"
          >
            Mark Maintenance
          </button>
        </div>

        {/* Outage management */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-yellow-500">
          <h2 className="text-2xl font-bold">Power Outage Reports</h2>

          <div className="flex mt-4">
            <input
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="Enter affected area"
              className="bg-black flex-1 border px-3 py-2 rounded-l-lg"
            />
            <button
              onClick={reportOutage}
              className="bg-yellow-400 text-black px-5 rounded-r-lg font-bold"
            >
              Add
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {outages.map((o, i) => (
              <li
                key={i}
                className="bg-yellow-800/40 px-3 py-2 rounded-lg border-yellow-400 border"
              >
                ⚠ {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Billing */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-blue-500">
          <h2 className="text-2xl font-bold">Meter Billing</h2>
          <p className="opacity-70 mt-2">
            Upcoming feature: Consumer meter reading, invoice generation.
          </p>
          <button className="mt-5 bg-blue-500 px-5 py-2 rounded-lg font-semibold">
            Generate Bill
          </button>
        </div>
      </div>
    </div>
  );
}
