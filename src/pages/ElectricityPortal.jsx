import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

export default function ElectricityPortal() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const [consumerID, setConsumerID] = useState("");
  const [amount, setAmount] = useState("");
  const [billLoading, setBillLoading] = useState(false);
  const [billSuccess, setBillSuccess] = useState(false);

  const [electricityIssue, setElectricityIssue] = useState("");
  const [complaintLoading, setComplaintLoading] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  const [error, setError] = useState("");

  async function payBill(e) {
    e.preventDefault();
    setBillLoading(true); setError("");
    try {
      await addDoc(collection(db, "billPayments"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        consumerID,
        amount: Number(amount),
        type: "electricity",
        status: "paid",
        paidAt: serverTimestamp(),
      });
      setBillSuccess(true);
      setConsumerID(""); setAmount("");
    } catch {
      setError(language === "hi" ? "भुगतान असफल" : "Payment failed. Try again.");
    }
    setBillLoading(false);
  }

  async function submitComplaint(e) {
    e.preventDefault();
    setComplaintLoading(true); setError("");
    try {
      await addDoc(collection(db, "complaints"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        issue: "electricity",
        description: electricityIssue,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setComplaintSuccess(true);
      setElectricityIssue("");
    } catch {
      setError(language === "hi" ? "शिकायत दर्ज नहीं हुई" : "Complaint failed. Try again.");
    }
    setComplaintLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <Link to="/citizen-dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition">
            ← {language === "hi" ? "वापस" : "Back to Dashboard"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            ⚡ {language === "hi" ? "बिजली सेवाएँ" : "Electricity Services"}
          </h1>
          <p className="text-gray-400 mt-1">
            {language === "hi" ? "बिल भुगतान और शिकायत" : "Bill payment and complaints"}
          </p>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-300">❌ {error}</div>}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Bill Payment */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">
              💰 {language === "hi" ? "बिजली बिल भुगतान" : "Pay Electricity Bill"}
            </h2>

            {billSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300">
                ✅ {language === "hi" ? "भुगतान सफल!" : "Payment successful!"}
                <button onClick={() => setBillSuccess(false)} className="block mt-2 text-sm underline">
                  {language === "hi" ? "नया भुगतान" : "Pay another"}
                </button>
              </div>
            ) : (
              <form onSubmit={payBill} className="space-y-4">
                <input
                  required
                  value={consumerID}
                  onChange={(e) => setConsumerID(e.target.value)}
                  placeholder={language === "hi" ? "उपभोक्ता संख्या" : "Consumer Number"}
                  className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-emerald-500 text-white outline-none transition"
                />
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={language === "hi" ? "राशि (₹)" : "Amount (₹)"}
                  className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-emerald-500 text-white outline-none transition"
                />
                <button
                  type="submit"
                  disabled={billLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition"
                >
                  {billLoading ? "..." : (language === "hi" ? "भुगतान करें" : "Pay Now")}
                </button>
              </form>
            )}
          </div>

          {/* Complaint */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-300 mb-4">
              ⚠️ {language === "hi" ? "बिजली शिकायत" : "Electricity Complaint"}
            </h2>

            {complaintSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300">
                ✅ {language === "hi" ? "शिकायत दर्ज हो गई!" : "Complaint registered!"}
                <button onClick={() => setComplaintSuccess(false)} className="block mt-2 text-sm underline">
                  {language === "hi" ? "नई शिकायत" : "New complaint"}
                </button>
              </div>
            ) : (
              <form onSubmit={submitComplaint} className="space-y-4">
                <textarea
                  required
                  value={electricityIssue}
                  onChange={(e) => setElectricityIssue(e.target.value)}
                  rows={5}
                  placeholder={language === "hi" ? "समस्या बताएं..." : "Describe the issue..."}
                  className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-yellow-500 text-white outline-none transition resize-none"
                />
                <button
                  type="submit"
                  disabled={complaintLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition"
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