import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import FloatingAIButton from "../components/FloatingAIButton";

export default function CitizenDashboard() {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const [complaintCount, setComplaintCount] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      if (!currentUser) return;
      try {
        const q = query(collection(db, "complaints"), where("userId", "==", currentUser.uid));
        const snap = await getDocs(q);
        setComplaintCount(snap.size);
      } catch {
        setComplaintCount(0);
      }
    }
    fetchStats();
  }, [currentUser]);

  const services = [
    { to: "/electricity", icon: "⚡", title: language === "hi" ? "बिजली सेवा" : "Electricity Service", desc: language === "hi" ? "कनेक्शन या समस्या के लिए आवेदन करें" : "Apply for connection or report issues", color: "emerald" },
    { to: "/water", icon: "💧", title: language === "hi" ? "जल सेवा" : "Water Supply", desc: language === "hi" ? "जल अनुरोध और शिकायतें" : "Water supply request & complaints", color: "cyan" },
    { to: "/road", icon: "🛣", title: language === "hi" ? "सड़क और बुनियादी ढाँचा" : "Road & Infrastructure", desc: language === "hi" ? "सड़क समस्या या सुझाव दें" : "Submit road issues or suggestions", color: "orange" },
    { to: "/complaint", icon: "📝", title: language === "hi" ? "शिकायत दर्ज करें" : "Register Complaint", desc: language === "hi" ? "समस्या सीधे रिपोर्ट करें" : "Report problems directly", color: "red" },
    { to: "/status", icon: "📊", title: language === "hi" ? "शिकायत स्थिति" : "Complaint Status", desc: language === "hi" ? "शिकायत की प्रगति देखें" : "Track complaint progress", color: "purple" },
    { to: "/notices", icon: "📢", title: language === "hi" ? "सूचनाएँ" : "Notices & Announcements", desc: language === "hi" ? "ग्राम सूचनाएँ और कार्यक्रम" : "Village notices, updates & events", color: "blue" },
  ];

  const colorMap = {
    emerald: "border-emerald-600/30 hover:shadow-emerald-500/30 text-emerald-300",
    cyan: "border-cyan-500/30 hover:shadow-cyan-400/30 text-cyan-300",
    orange: "border-orange-500/30 hover:shadow-orange-400/30 text-orange-300",
    red: "border-red-500/30 hover:shadow-red-400/30 text-red-300",
    purple: "border-purple-500/30 hover:shadow-purple-400/30 text-purple-300",
    blue: "border-blue-500/30 hover:shadow-blue-400/30 text-blue-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            {language === "hi" ? "नागरिक डैशबोर्ड 👤" : "Citizen Dashboard 👤"}
          </h1>
          <p className="text-gray-400 mt-2">
            {currentUser?.email && (
              <span>{language === "hi" ? "स्वागत है" : "Welcome"}, {currentUser.email}</span>
            )}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">{complaintCount}</p>
            <p className="text-xs text-gray-400">{language === "hi" ? "शिकायतें" : "Complaints"}</p>
          </div>
        </div>
      </div>

      {/* AI BANNER */}
      <Link
        to="/admin/ai-assistant"
        className="block mb-8 p-5 rounded-2xl bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/40 hover:border-teal-400/60 transition"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="font-semibold text-teal-300">{language === "hi" ? "AI ग्राम सहायक" : "AI Gram Assistant"}</h3>
            <p className="text-gray-400 text-sm">{language === "hi" ? "प्रश्न पूछें और तुरंत सहायता प्राप्त करें" : "Ask questions & get instant help"}</p>
          </div>
        </div>
      </Link>

      {/* SERVICE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className={`p-6 rounded-2xl bg-white/5 backdrop-blur border shadow-lg hover:scale-[1.02] transition ${colorMap[s.color]}`}
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link to="/" className="text-gray-400 hover:text-white text-sm transition">
          ← {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
        </Link>
      </div>

      <FloatingAIButton />
    </div>
  );
}