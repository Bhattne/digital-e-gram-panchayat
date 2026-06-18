import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

export default function WaterPortal() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const [tankerAddress, setTankerAddress] = useState("");
  const [tankerLoading, setTankerLoading] = useState(false);
  const [tankerSuccess, setTankerSuccess] = useState(false);

  const [connectionName, setConnectionName] = useState("");
  const [connectionAddress, setConnectionAddress] = useState("");
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  const [waterIssue, setWaterIssue] = useState("");
  const [complaintLoading, setComplaintLoading] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  const [error, setError] = useState("");

  async function requestTanker(e) {
    e.preventDefault();
    setTankerLoading(true); setError("");
    try {
      await addDoc(collection(db, "tankerRequests"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        address: tankerAddress,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setTankerSuccess(true);
      setTankerAddress("");
    } catch {
      setError(language === "hi" ? "अनुरोध असफल" : "Request failed. Try again.");
    }
    setTankerLoading(false);
  }

  async function applyConnection(e) {
    e.preventDefault();
    setConnectionLoading(true); setError("");
    try {
      await addDoc(collection(db, "waterConnections"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        name: connectionName,
        address: connectionAddress,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setConnectionSuccess(true);
      setConnectionName(""); setConnectionAddress("");
    } catch {
      setError(language === "hi" ? "आवेदन असफल" : "Application failed. Try again.");
    }
    setConnectionLoading(false);
  }

  async function submitComplaint(e) {
    e.preventDefault();
    setComplaintLoading(true); setError("");
    try {
      await addDoc(collection(db, "complaints"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        issue: "water",
        description: waterIssue,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setComplaintSuccess(true);
      setWaterIssue("");
    } catch {
      setError(language === "hi" ? "शिकायत असफल" : "Complaint failed. Try again.");
    }
    setComplaintLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <Link to="/citizen-dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition">
            ← {language === "hi" ? "वापस" : "Back to Dashboard"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            💧 {language === "hi" ? "पानी सेवाएँ" : "Water Services"}
          </h1>
          <p className="text-gray-400 mt-1">
            {language === "hi" ? "टैंकर, संयोजन और शिकायत" : "Tanker, connection and complaints"}
          </p>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-300">❌ {error}</div>}

        <div className="grid md:grid-cols-3 gap-6">

          {/* Tanker Request */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-cyan-300 mb-4">
              🚚 {language === "hi" ? "पानी का टैंकर" : "Request Tanker"}
            </h2>
            {tankerSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-sm">
                ✅ {language === "hi" ? "अनुरोध भेजा गया!" : "Request sent!"}
                <button onClick={() => setTankerSuccess(false)} className="block mt-2 underline">
                  {language === "hi" ? "नया अनुरोध" : "New request"}
                </button>
              </div>
            ) : (
              <form onSubmit={requestTanker} className="space-y-3">
                <textarea
                  required
                  value={tankerAddress}
                  onChange={(e) => setTankerAddress(e.target.value)}
                  rows={4}
                  placeholder={language === "hi" ? "पूरा पता लिखें..." : "Enter full address..."}
                  className="w-full bg-black/40 border border-gray-700 focus:border-cyan-500 p-3 rounded-xl text-white outline-none transition resize-none"
                />
                <button
                  type="submit"
                  disabled={tankerLoading}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl transition"
                >
                  {tankerLoading ? "..." : (language === "hi" ? "अनुरोध भेजें" : "Submit Request")}
                </button>
              </form>
            )}
          </div>

          {/* New Connection */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-blue-300 mb-4">
              📄 {language === "hi" ? "नया जल संयोजन" : "New Connection"}
            </h2>
            {connectionSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-sm">
                ✅ {language === "hi" ? "आवेदन भेजा गया!" : "Application sent!"}
                <button onClick={() => setConnectionSuccess(false)} className="block mt-2 underline">
                  {language === "hi" ? "नया आवेदन" : "New application"}
                </button>
              </div>
            ) : (
              <form onSubmit={applyConnection} className="space-y-3">
                <input
                  required
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                  placeholder={language === "hi" ? "आवेदक नाम" : "Applicant Name"}
                  className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-blue-500 text-white outline-none transition"
                />
                <textarea
                  required
                  value={connectionAddress}
                  onChange={(e) => setConnectionAddress(e.target.value)}
                  rows={3}
                  placeholder={language === "hi" ? "पूर्ण पता" : "Full Address"}
                  className="w-full bg-black/40 border border-gray-700 focus:border-blue-500 p-3 rounded-xl text-white outline-none transition resize-none"
                />
                <button
                  type="submit"
                  disabled={connectionLoading}
                  className="w-full bg-blue-400 hover:bg-blue-500 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl transition"
                >
                  {connectionLoading ? "..." : (language === "hi" ? "आवेदन भेजें" : "Submit Application")}
                </button>
              </form>
            )}
          </div>

          {/* Complaint */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-red-300 mb-4">
              ⚠️ {language === "hi" ? "पानी शिकायत" : "Water Complaint"}
            </h2>
            {complaintSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-sm">
                ✅ {language === "hi" ? "शिकायत दर्ज हुई!" : "Complaint registered!"}
                <button onClick={() => setComplaintSuccess(false)} className="block mt-2 underline">
                  {language === "hi" ? "नई शिकायत" : "New complaint"}
                </button>
              </div>
            ) : (
              <form onSubmit={submitComplaint} className="space-y-3">
                <textarea
                  required
                  value={waterIssue}
                  onChange={(e) => setWaterIssue(e.target.value)}
                  rows={4}
                  placeholder={language === "hi" ? "समस्या का विवरण..." : "Describe issue clearly..."}
                  className="w-full bg-black/40 border border-gray-700 focus:border-red-500 p-3 rounded-xl text-white outline-none transition resize-none"
                />
                <button
                  type="submit"
                  disabled={complaintLoading}
                  className="w-full bg-red-400 hover:bg-red-500 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl transition"
                >
                  {complaintLoading ? "..." : (language === "hi" ? "शिकायत दर्ज करें" : "Submit Complaint")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}