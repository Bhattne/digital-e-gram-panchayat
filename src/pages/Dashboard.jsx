import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { language } = useLanguage();
  const { userProfile } = useAuth(); // detects admin role

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        {language === "hi"
          ? "डिजिटल ई–ग्राम पंचायत डैशबोर्ड"
          : "Digital E-Gram Panchayat Dashboard"}
      </h1>

      {/* GRID MENU — 3 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* 🌊 Water Services */}
        <Link to="/water" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
          <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">💧 
            {language === "hi" ? "जल सेवा" : "Water Services"}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {language === "hi"
              ? "नया कनेक्शन • टैंकर अनुरोध • शिकायतें"
              : "New connection, Tanker request, Complaints"}
          </p>
        </Link>

        {/* ⚡ Electricity Portal */}
        <Link to="/electricity" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
          <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">⚡ 
            {language === "hi" ? "बिजली सेवा" : "Electricity Portal"}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {language === "hi" ? "बिल भुगतान और शिकायत दर्ज" : "Bill Payment & Complaint Submission"}
          </p>
        </Link>

        {/* 🛣 Road Issue Reporting */}
        <Link to="/road" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
          <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">🛣 
            {language === "hi" ? "सड़क समस्या रिपोर्ट" : "Road Issue Reporting"}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {language === "hi"
              ? "गड्ढे, अधूरा कार्य, खराब सड़क"
              : "Broken roads, potholes, incomplete work"}
          </p>
        </Link>

        {/* 📜 Notice Board */}
        <Link to="/notices" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
          <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">📜 
            {language === "hi" ? "सूचना पट्ट" : "Notice Board"}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {language === "hi" ? "योजनाएँ, घोषणाएँ, बैठक अपडेट" : "Announcements, Schemes, Meetings"}
          </p>
        </Link>

        {/* 📢 Complaint Portal — NOW MATCHES ALL CARDS */}
        <Link to="/complaint" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
          <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">📢 
            {language === "hi" ? "शिकायत पोर्टल" : "Complaint Portal"}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {language === "hi" ? "शिकायत दर्ज करें और स्थिति देखें" : "Submit complaints & track status"}
          </p>
        </Link>

        {/* 🏛 Admin Panel — Only visible if admin */}
        {userProfile?.role === "admin" && (
          <Link to="/admin" className="glass p-6 rounded-xl hover:scale-[1.03] transition border border-gray-700">
            <div className="text-emerald-300 font-bold text-xl flex items-center gap-2">🏛 
              {language === "hi" ? "प्रशासन पैनल" : "Admin Notice Panel"}
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {language === "hi" ? "सूचनाएँ पोस्ट करें | PDF/छवि अपलोड" : "Post Notices | Upload PDF/Image"}
            </p>
          </Link>
        )}

      </div>
    </div>
  );
}
