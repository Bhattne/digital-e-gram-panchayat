import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ComplaintForm() {
  const { language } = useLanguage();

  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!issue || !description) {
      alert(language === "hi" ? "कृपया सभी विवरण भरें" : "Please fill all details");
      return;
    }

    const complaintData = {
      issue,
      priority,
      description,
      image,
      date: new Date().toISOString()
    };

    console.log("Complaint submitted:", complaintData); // ⬅ later we store in DB

    alert(
      language === "hi"
        ? "शिकायत सफलतापूर्वक दर्ज की गई!"
        : "Complaint submitted successfully!"
    );

    // Clear form
    setIssue(""); setPriority("normal"); setDescription(""); setImage(null);
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "hi" ? "📢 शिकायत दर्ज करें" : "📢 File a Complaint"}
      </h1>

      <form 
        onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto glass-card p-8 shadow-lg space-y-5"
      >

        {/* Issue Type */}
        <label className="block">
          <span className="block mb-2 text-lg font-semibold">
            {language === "hi" ? "समस्या का प्रकार" : "Select Issue Type"}
          </span>

          <select
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
            className="w-full bg-black/40 border border-gray-600 p-3 rounded-lg"
          >
            <option value="">{language === "hi" ? "चुनें" : "Choose"}</option>
            <option value="water">{language === "hi" ? "पानी" : "Water Issue"}</option>
            <option value="electricity">{language === "hi" ? "बिजली" : "Electricity Issue"}</option>
            <option value="road">{language === "hi" ? "सड़क" : "Road/Infrastructure"}</option>
            <option value="cleaning">{language === "hi" ? "सफाई" : "Sanitation/Cleaning"}</option>
            <option value="other">{language === "hi" ? "अन्य" : "Other"}</option>
          </select>
        </label>

        {/* Priority */}
        <label>
          <span className="block mb-2 text-lg font-semibold">
            {language === "hi" ? "प्राथमिकता" : "Priority"}
          </span>

          <div className="flex gap-4">
            {["normal", "urgent", "emergency"].map((p) => (
              <label key={p} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                />
                <span>
                  {language === "hi"
                    ? p === "normal" ? "सामान्य" : p === "urgent" ? "तत्काल" : "आपातकाल"
                    : p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </label>

        {/* Description */}
        <label>
          <span className="block mb-2 text-lg font-semibold">
            {language === "hi" ? "विवरण" : "Describe the Issue"}
          </span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-28 bg-black/40 border border-gray-600 rounded-lg p-3"
            placeholder={language === "hi" ? "समस्या का विवरण लिखें..." : "Explain the issue clearly..."}
          />
        </label>

        {/* Image Upload */}
        <label>
          <span className="block mb-2 text-lg font-semibold">
            {language === "hi" ? "छवि अपलोड करें (वैकल्पिक)" : "Upload Image (Optional)"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-emerald-500 p-3 rounded-lg font-bold text-black hover:bg-emerald-600 text-lg"
        >
          {language === "hi" ? "जमा करें" : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
