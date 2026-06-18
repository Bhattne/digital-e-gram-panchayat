import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { Link } from "react-router-dom";

export default function RoadIssues() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const [location, setLocation] = useState("");
  const [roadType, setRoadType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submitRoadIssue(e) {
    e.preventDefault();
    setLoading(true); setError("");

    try {
      let imageUrl = null;
      if (image) {
        const imageRef = ref(storage, `roadIssues/${currentUser.uid}/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "roadIssues"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        roadType,
        location,
        description,
        imageUrl,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setLocation(""); setRoadType(""); setDescription(""); setImage(null);
    } catch {
      setError(language === "hi" ? "रिपोर्ट असफल" : "Submission failed. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071018] via-[#0d1b2a] to-[#000f1f] text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <Link to="/citizen-dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition">
            ← {language === "hi" ? "वापस" : "Back to Dashboard"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            🛣 {language === "hi" ? "सड़क समस्या रिपोर्ट करें" : "Report Road Issues"}
          </h1>
          <p className="text-gray-400 mt-1">
            {language === "hi" ? "सड़क की समस्या दर्ज करें" : "Report potholes, damage and more"}
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300">
            ✅ {language === "hi" ? "रिपोर्ट सफलतापूर्वक भेजी गई!" : "Report submitted successfully!"}
            <button onClick={() => setSuccess(false)} className="ml-4 text-sm underline">
              {language === "hi" ? "नई रिपोर्ट" : "Report another"}
            </button>
          </div>
        )}

        {error && <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-300">❌ {error}</div>}

        <form onSubmit={submitRoadIssue} className="space-y-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "समस्या का प्रकार *" : "Issue Type *"}
            </label>
            <select
              required
              value={roadType}
              onChange={(e) => setRoadType(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-orange-500 text-white outline-none transition"
            >
              <option value="">{language === "hi" ? "— चुनें —" : "— Select —"}</option>
              <option value="pothole">{language === "hi" ? "🕳 गड्ढे वाली सड़क" : "🕳 Potholes"}</option>
              <option value="damaged">{language === "hi" ? "🚧 टूटी हुई सड़क" : "🚧 Broken Road"}</option>
              <option value="waterlogged">{language === "hi" ? "🌊 जलभराव समस्या" : "🌊 Water Logging"}</option>
              <option value="unfinished">{language === "hi" ? "🏗 अधूरी सड़क" : "🏗 Unfinished Road"}</option>
              <option value="other">{language === "hi" ? "📋 अन्य" : "📋 Other"}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "स्थान *" : "Location *"}
            </label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={language === "hi" ? "समस्या का स्थान दर्ज करें..." : "Enter road location..."}
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-orange-500 text-white outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "विवरण *" : "Description *"}
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder={language === "hi" ? "समस्या का विवरण लिखें..." : "Explain details clearly..."}
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-orange-500 text-white outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {language === "hi" ? "फोटो प्रमाण (वैकल्पिक)" : "Photo Evidence (Optional)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-800/50"
            />
            {image && <p className="text-orange-400 text-xs mt-1">✓ {image.name}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition text-lg"
          >
            {loading
              ? (language === "hi" ? "भेजा जा रहा है..." : "Submitting...")
              : (language === "hi" ? "रिपोर्ट सबमिट करें" : "Submit Report")}
          </button>

        </form>
      </div>
    </div>
  );
}