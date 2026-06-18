import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ComplaintStatus() {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaints() {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, "complaints"),
          where("userId", "==", currentUser.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setComplaints(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchComplaints();
  }, [currentUser]);

  const statusColors = {
    pending: "bg-yellow-900/40 text-yellow-300 border-yellow-500/40",
    "in-progress": "bg-blue-900/40 text-blue-300 border-blue-500/40",
    resolved: "bg-emerald-900/40 text-emerald-300 border-emerald-500/40",
    rejected: "bg-red-900/40 text-red-300 border-red-500/40",
  };

  const statusLabels = {
    pending: language === "hi" ? "प्रतीक्षित" : "Pending",
    "in-progress": language === "hi" ? "प्रगति पर" : "In Progress",
    resolved: language === "hi" ? "हल हो गया" : "Resolved",
    rejected: language === "hi" ? "अस्वीकृत" : "Rejected",
  };

  const issueIcons = {
    water: "💧", electricity: "⚡", road: "🛣", cleaning: "🧹", other: "📋",
  };

  function formatDate(timestamp) {
    if (!timestamp?.seconds) return "—";
    return new Date(timestamp.seconds * 1000).toLocaleDateString(
      language === "hi" ? "hi-IN" : "en-IN",
      { day: "numeric", month: "short", year: "numeric" }
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <Link to="/citizen-dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition">
            ← {language === "hi" ? "वापस" : "Back to Dashboard"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            📊 {language === "hi" ? "शिकायत स्थिति" : "Complaint Status"}
          </h1>
          <p className="text-gray-400 mt-1">
            {language === "hi" ? "अपनी सभी शिकायतों की स्थिति देखें" : "Track all your submitted complaints"}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            {language === "hi" ? "लोड हो रहा है..." : "Loading..."}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-400">
              {language === "hi" ? "अभी तक कोई शिकायत दर्ज नहीं की गई" : "No complaints filed yet"}
            </p>
            <Link to="/complaint" className="inline-block mt-4 text-emerald-400 underline">
              {language === "hi" ? "शिकायत दर्ज करें" : "File a complaint"}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{issueIcons[c.issue] || "📋"}</span>
                    <div>
                      <h3 className="font-semibold capitalize">{c.issue}</h3>
                      <p className="text-gray-400 text-sm mt-1 max-w-md">{c.description}</p>
                      <p className="text-gray-500 text-xs mt-2">{formatDate(c.createdAt)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[c.status] || statusColors.pending}`}>
                    {statusLabels[c.status] || statusLabels.pending}
                  </span>
                </div>
                {c.imageUrl && (
                  <img src={c.imageUrl} alt="complaint" className="mt-3 rounded-lg max-h-40 object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}