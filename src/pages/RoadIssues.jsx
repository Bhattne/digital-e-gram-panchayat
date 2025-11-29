import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function RoadIssues() {
  const { language } = useLanguage();

  const [location, setLocation] = useState("");
  const [roadType, setRoadType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  function submitRoadIssue(e) {
    e.preventDefault();
    alert(
      language === "hi"
        ? "🛣 सड़क समस्या सफलतापूर्वक भेजी गई!"
        : "🛣 Road issue submitted successfully!"
    );

    setLocation("");
    setRoadType("");
    setDescription("");
    setImage(null);
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "hi" ? "🛣 सड़क समस्या रिपोर्ट करें" : "🛣 Report Road Issues"}
      </h1>

      <form onSubmit={submitRoadIssue} className="max-w-3xl mx-auto glass-card p-8 space-y-6">

        {/* ROAD TYPE */}
        <label>
          <span className="block text-lg font-semibold mb-2">
            {language === "hi" ? "समस्या का प्रकार चुनें" : "Select Issue Type"}
          </span>
          <select
            required
            value={roadType}
            onChange={(e) => setRoadType(e.target.value)}
            className="w-full p-3 rounded bg-black/40 border border-gray-700"
          >
            <option value="">{language === "hi" ? "चुनें" : "Choose"}</option>
            <option value="pothole">{language === "hi" ? "गड्ढे वाली सड़क" : "Potholes"}</option>
            <option value="damaged">{language === "hi" ? "टूटी/टूटी हुई सड़क" : "Broken Road"}</option>
            <option value="waterlogged">{language === "hi" ? "जलभराव समस्या" : "Water Logging"}</option>
            <option value="unfinished">{language === "hi" ? "अधूरी सड़क" : "Unfinished Road"}</option>
            <option value="other">{language === "hi" ? "अन्य" : "Other"}</option>
          </select>
        </label>

        {/* LOCATION */}
        <label>
          <span className="block text-lg font-semibold mb-2">
            {language === "hi" ? "स्थान (लोकेशन)" : "Location"}
          </span>
          <input
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={language === "hi" ? "समस्या का स्थान दर्ज करें..." : "Enter road location..."}
            className="w-full p-3 rounded bg-black/40 border border-gray-700"
          />
        </label>

        {/* DESCRIPTION */}
        <label>
          <span className="block text-lg font-semibold mb-2">
            {language === "hi" ? "विवरण" : "Describe the Issue"}
          </span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={language === "hi" ? "समस्या का विवरण लिखें..." : "Explain details clearly..."}
            className="w-full h-28 p-3 rounded bg-black/40 border border-gray-700"
          />
        </label>

        {/* IMAGE UPLOAD */}
        <label>
          <span className="block text-lg font-semibold mb-2">
            {language === "hi" ? "छवि प्रमाण अपलोड करें (वैकल्पिक)" : "Upload Image (Optional)"}
          </span>
          <input type="file" accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-orange-400 text-black font-bold p-3 rounded hover:bg-orange-500 text-lg"
        >
          {language === "hi" ? "रिपोर्ट सबमिट करें" : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
