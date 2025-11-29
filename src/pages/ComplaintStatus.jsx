import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ComplaintStatus() {
  const { language } = useLanguage();

  // Fetch stored complaints from localStorage for now
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaintsData")) || [];
    setComplaints(saved);
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "hi" ? "📊 शिकायत स्थिति" : "📊 Complaint Status"}
      </h1>

      {/* Show if no complaints */}
      {complaints.length === 0 && (
        <p className="text-center text-gray-300 text-lg">
          {language === "hi" ? "अभी तक कोई शिकायत दर्ज नहीं की गई है" : "No complaints filed yet"}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {complaints.map((c, i) => (
          <div key={i} className="glass-card p-6 animate-fadeIn">
            
            <h2 className="text-xl font-bold mb-2 text-emerald-300">
              {language === "hi" ? "शिकायत #" : "Complaint #"} {i + 1}
            </h2>

            <p className="mb-2">
              <b>{language === "hi" ? "समस्या:" : "Issue:"}</b> {c.issue}
            </p>

            <p className="mb-2">
              <b>{language === "hi" ? "प्राथमिकता:" : "Priority:"}</b> 
              <span className={`ml-1 px-2 py-1 rounded text-black text-sm ${
                c.priority === "emergency" ? "bg-red-400" :
                c.priority === "urgent"    ? "bg-yellow-400" :
                                             "bg-emerald-400"
              }`}>
                {language === "hi"
                  ? c.priority === "emergency" ? "आपातकाल" :
                    c.priority === "urgent"    ? "तत्काल" : "सामान्य"
                  : c.priority.charAt(0).toUpperCase() + c.priority.slice(1)}
              </span>
            </p>

            <p className="mb-2">
              <b>{language === "hi" ? "स्थिति:" : "Status:"}</b> 
              <span className="text-blue-300">
                {language === "hi" ? "लंबित" : "Pending"}
              </span>
            </p>

            <p className="mb-2">
              <b>{language === "hi" ? "तारीख:" : "Date:"}</b> 
              {new Date(c.date).toLocaleDateString()}
            </p>

            {c.image && (
              <img 
                src={URL.createObjectURL(c.image)} 
                alt="evidence" 
                className="w-full h-32 object-cover rounded mt-3 border border-gray-700"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
