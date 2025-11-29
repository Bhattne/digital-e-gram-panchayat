import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function WaterPortal() {
  const { language } = useLanguage();

  const [tankerAddress, setTankerAddress] = useState("");
  const [connectionName, setConnectionName] = useState("");
  const [connectionAddress, setConnectionAddress] = useState("");
  const [waterIssue, setWaterIssue] = useState("");
  const [waterImage, setWaterImage] = useState(null);

  // ============= REQUEST WATER TANKER =============
  function requestTanker(e) {
    e.preventDefault();
    alert(
      language === "hi"
        ? "🚰 पानी का टैंकर अनुरोध भेज दिया गया है"
        : "🚰 Water tanker request submitted"
    );
    setTankerAddress("");
  }

  // ============= NEW CONNECTION =============
  function applyConnection(e) {
    e.preventDefault();
    alert(
      language === "hi"
        ? "📄 नया जल-संयोजन आवेदन भेजा गया"
        : "📄 New Water Connection Request Submitted"
    );
    setConnectionName("");
    setConnectionAddress("");
  }

  // ============= WATER COMPLAINT =============
  function submitComplaint(e) {
    e.preventDefault();
    alert(
      language === "hi"
        ? "⚠ पानी की समस्या रिपोर्ट की गई"
        : "⚠ Water complaint submitted"
    );
    setWaterIssue("");
    setWaterImage(null);
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "hi" ? "💧 पानी सेवाएँ" : "💧 Water Services"}
      </h1>

      <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {/* ================= 1️⃣ Water Tanker ================= */}
        <form onSubmit={requestTanker} className="glass-card p-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            {language === "hi" ? "🚚 पानी का टैंकर अनुरोध" : "🚚 Request Water Tanker"}
          </h2>

          <textarea
            required
            value={tankerAddress}
            onChange={(e) => setTankerAddress(e.target.value)}
            placeholder={language === "hi" ? "पूरा पता लिखें..." : "Enter full address..."}
            className="w-full h-28 bg-black/40 border border-gray-600 p-3 rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 p-3 rounded font-bold text-black hover:bg-emerald-600"
          >
            {language === "hi" ? "अनुरोध भेजें" : "Submit Request"}
          </button>
        </form>

        {/* ================= 2️⃣ New Water Connection ================= */}
        <form onSubmit={applyConnection} className="glass-card p-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            {language === "hi" ? "📄 नया जल संयोजन" : "📄 New Water Connection"}
          </h2>

          <input
            required
            value={connectionName}
            onChange={(e) => setConnectionName(e.target.value)}
            placeholder={language === "hi" ? "आवेदक नाम" : "Applicant Name"}
            className="w-full p-3 rounded bg-black/40 border border-gray-600 mb-4"
          />

          <textarea
            required
            value={connectionAddress}
            onChange={(e) => setConnectionAddress(e.target.value)}
            placeholder={language === "hi" ? "पूर्ण पता" : "Full Address"}
            className="w-full h-28 bg-black/40 border border-gray-600 p-3 rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-400 p-3 rounded font-bold text-black hover:bg-blue-500"
          >
            {language === "hi" ? "आवेदन भेजें" : "Submit Application"}
          </button>
        </form>

        {/* ================= 3️⃣ Water Complaint ================= */}
        <form onSubmit={submitComplaint} className="glass-card p-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            {language === "hi" ? "⚠ पानी शिकायत" : "⚠ Water Complaint"}
          </h2>

          <textarea
            required
            value={waterIssue}
            onChange={(e) => setWaterIssue(e.target.value)}
            placeholder={language === "hi" ? "समस्या का विवरण..." : "Describe issue clearly..."}
            className="w-full h-28 bg-black/40 border border-gray-600 p-3 rounded mb-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setWaterImage(e.target.files[0])}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full bg-red-400 p-3 rounded font-bold text-black hover:bg-red-500"
          >
            {language === "hi" ? "शिकायत दर्ज करें" : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
