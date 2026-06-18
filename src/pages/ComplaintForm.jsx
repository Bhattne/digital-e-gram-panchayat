import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { Link } from "react-router-dom";

export default function ComplaintForm() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!issue || !description) {
      setError(language === "hi" ? "कृपया सभी विवरण भरें" : "Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let imageUrl = null;

      if (image) {
        const imageRef = ref(storage, `complaints/${currentUser.uid}/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "complaints"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        issue,
        priority,
        description,
        imageUrl,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setIssue(""); setPriority("normal"); setDescription(""); setImage(null);

    } catch (err) {
      setError(language === "hi" ? "कुछ गलत हुआ। पुनः प्रयास करें।" : "Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  const priorityColors = {
    normal: "border-emerald-500 text-emerald-400",
    urgent: "border-yellow-500 text-yellow-400",
    emergency: "border-red-500 text-red-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white px-4 py-10">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link to="/citizen-dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition">
            ← {language === "hi" ? "वापस" : "Back to Dashboard"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            {language === "hi" ? "📢 शिकायत दर्ज करें" : "📢 File a Complaint"}
          </h1>
          <p className="text-gray-400 mt-1">
            {language === "hi" ? "अपनी समस्या यहाँ दर्ज करें" : "Report your issue and we'll look into it"}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300">
            ✅ {language === "hi" ? "शिकायत सफलतापूर्वक दर्ज की गई!" : "Complaint submitted successfully!"}
            <button onClick={() => setSuccess(false)} className="ml-4 text-sm underline">
              {language === "hi" ? "नई शिकायत दर्ज करें" : "File another"}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-300">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "समस्या का प्रकार *" : "Issue Type *"}
            </label>
            <select
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
              className="w-full bg-black/40 border border-gray-700 focus:border-emerald-500 p-3 rounded-xl text-white outline-none transition"
            >
              <option value="">{language === "hi" ? "— चुनें —" : "— Select —"}</option>
              <option value="water">{language === "hi" ? "💧 पानी" : "💧 Water"}</option>
              <option value="electricity">{language === "hi" ? "⚡ बिजली" : "⚡ Electricity"}</option>
              <option value="road">{language === "hi" ? "🛣 सड़क" : "🛣 Road / Infrastructure"}</option>
              <option value="cleaning">{language === "hi" ? "🧹 सफाई" : "🧹 Sanitation"}</option>
              <option value="other">{language === "hi" ? "📋 अन्य" : "📋 Other"}</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              {language === "hi" ? "प्राथमिकता *" : "Priority *"}
            </label>
            <div className="flex gap-3">
              {["normal", "urgent", "emergency"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition ${
                    priority === p
                      ? priorityColors[p] + " bg-white/10"
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {p === "normal" ? (language === "hi" ? "सामान्य" : "Normal") :
                   p === "urgent" ? (language === "hi" ? "तत्काल" : "Urgent") :
                   (language === "hi" ? "आपातकाल" : "Emergency")}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "विवरण *" : "Description *"}
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-black/40 border border-gray-700 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition resize-none"
              placeholder={language === "hi" ? "समस्या का विवरण लिखें..." : "Describe the issue clearly..."}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "फोटो (वैकल्पिक)" : "Photo (Optional)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-900/50 file:text-emerald-300 hover:file:bg-emerald-800/50"
            />
            {image && <p className="text-emerald-400 text-xs mt-1">✓ {image.name}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition text-lg"
          >
            {loading
              ? (language === "hi" ? "भेजा जा रहा है..." : "Submitting...")
              : (language === "hi" ? "शिकायत दर्ज करें" : "Submit Complaint")}
          </button>

        </form>
      </div>
    </div>
  );
}