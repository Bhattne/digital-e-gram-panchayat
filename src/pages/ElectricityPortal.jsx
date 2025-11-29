import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ElectricityPortal() {
  const { language } = useLanguage();

  const [consumerID, setConsumerID] = useState("");
  const [amount, setAmount] = useState("");
  const [electricityIssue, setElectricityIssue] = useState("");
  const [electricityImage, setElectricityImage] = useState(null);

  function payBill(e) {
    e.preventDefault();

    alert(
      language === "hi"
        ? `💡 बिजली बिल ₹${amount} भुगतान सफल`
        : `💡 Electricity Bill ₹${amount} Paid Successfully`
    );

    setConsumerID("");
    setAmount("");
  }

  function submitElectricityComplaint(e) {
    e.preventDefault();
    alert(
      language === "hi"
        ? "⚠ बिजली शिकायत दर्ज की गई"
        : "⚠ Electricity Complaint Submitted"
    );
    setElectricityIssue("");
    setElectricityImage(null);
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "hi" ? "⚡ बिजली सेवाएँ" : "⚡ Electricity Services"}
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* BILL PAYMENT SECTION */}
        <form onSubmit={payBill} className="glass-card p-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            {language === "hi" ? "💰 बिजली बिल भुगतान" : "💰 Pay Electricity Bill"}
          </h2>

          <input
            required
            value={consumerID}
            onChange={(e) => setConsumerID(e.target.value)}
            placeholder={language === "hi" ? "उपभोक्ता संख्या" : "Consumer Number"}
            className="w-full p-3 rounded bg-black/40 border border-gray-600 mb-4"
          />

          <input
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={language === "hi" ? "राशि (₹)" : "Amount (₹)"}
            className="w-full p-3 rounded bg-black/40 border border-gray-600 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 p-3 rounded-lg text-black font-bold hover:bg-emerald-600 transition"
          >
            {language === "hi" ? "भुगतान करें" : "Pay Bill"}
          </button>
        </form>

        {/* ELECTRICITY COMPLAINT */}
        <form onSubmit={submitElectricityComplaint} className="glass-card p-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            {language === "hi" ? "⚠ बिजली शिकायत" : "⚠ Electricity Complaint"}
          </h2>

          <textarea
            required
            value={electricityIssue}
            onChange={(e) => setElectricityIssue(e.target.value)}
            placeholder={language === "hi" ? "समस्या बताएं..." : "Describe the issue..."}
            className="w-full h-28 p-3 rounded bg-black/40 border border-gray-600 mb-4"
          />

          <label className="block mb-4">
            <span>{language === "hi" ? "छवि अपलोड (वैकल्पिक)" : "Upload Image (Optional)"}</span>
            <input type="file" accept="image/*"
              onChange={(e) => setElectricityImage(e.target.files[0])}
              className="block mt-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-yellow-400 p-3 rounded-lg text-black font-bold hover:bg-yellow-500 transition"
          >
            {language === "hi" ? "शिकायत दर्ज करें" : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
