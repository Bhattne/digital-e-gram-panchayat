import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import app from "../firebase/config"; 
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import NotificationsButton from "../components/NotificationsButton";

const db = getFirestore(app); // 🔥 Main fix

export default function NoticeBoard() {
  const { language } = useLanguage();
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch notices LIVE from Firebase
  useEffect(() => {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const filtered = notices.filter((n) => {
    const title = language === "hi" ? n.title_hi : n.title_en;
    const desc = language === "hi" ? n.desc_hi : n.desc_en;

    const matchesSearch =
      (title || "").toLowerCase().includes(search.toLowerCase()) ||
      (desc || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || n.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            {language === "hi" ? "📜 पंचायत सूचना पट्ट" : "📜 Panchayat Notice Board"}
          </h1>

          <NotificationsButton />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === "hi" ? "सूचना खोजें..." : "Search notices..."}
            className="flex-1 p-3 rounded bg-black/40 border border-gray-700"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 rounded bg-black/40 border border-gray-700"
          >
            <option value="all">{language === "hi" ? "सभी" : "All"}</option>
            <option value="general">{language === "hi" ? "सामान्य" : "General"}</option>
            <option value="meeting">{language === "hi" ? "मीटिंग" : "Meeting"}</option>
            <option value="scheme">{language === "hi" ? "योजना" : "Scheme"}</option>
            <option value="emergency">{language === "hi" ? "आपातकाल" : "Emergency"}</option>
          </select>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-300">
            {language === "hi" ? "अभी कोई सूचना उपलब्ध नहीं" : "No notices available"}
          </p>
        )}

        <div className="space-y-5">
          {filtered.map((n) => (
            <div key={n.id} className="glass-card p-6">
              <h2 className="text-xl font-bold text-emerald-300">
                {language === "hi" ? n.title_hi : n.title_en}
              </h2>
              <p className="mt-2 text-gray-300">
                {language === "hi" ? n.desc_hi : n.desc_en}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                📅 {n.createdAt?.toDate?.().toLocaleString()}
              </p>

              {n.imageUrl && (
                <img
                  src={n.imageUrl}
                  alt="notice"
                  className="mt-3 w-full max-h-60 object-cover rounded"
                />
              )}

              {n.pdfUrl && (
                <a
                  href={n.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline mt-3 inline-block"
                >
                  {language === "hi" ? "PDF डाउनलोड करें" : "Download PDF"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
