// src/pages/AdminPanel.jsx
import React, { useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPanel() {
  const [titleEn, setTitleEn] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descHi, setDescHi] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";
    let pdfUrl = "";

    try {
      if (imageFile) {
        const imgRef = ref(storage, `notices/images/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imgRef, imageFile);
        imageUrl = await getDownloadURL(imgRef);
      }

      if (pdfFile) {
        const pdfRef = ref(storage, `notices/pdfs/${Date.now()}-${pdfFile.name}`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      await addDoc(collection(db, "notices"), {
        title_en: titleEn,
        title_hi: titleHi,
        desc_en: descEn,
        desc_hi: descHi,
        imageUrl,
        pdfUrl,
        category: "general",
        createdAt: serverTimestamp(),
      });

      alert("📜 Notice uploaded successfully!");

      setTitleEn("");
      setTitleHi("");
      setDescEn("");
      setDescHi("");
      setImageFile(null);
      setPdfFile(null);
      e.target.reset();
    } catch (err) {
      console.error("Error uploading notice:", err);
      alert("Error uploading notice. Check console.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl bg-black/40 p-8 rounded-xl border border-gray-700 shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2 text-center">
          🏛 Admin Notice Panel
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Post Notices | Upload PDF/Image
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title (English)"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none focus:border-emerald-400"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="सूचना शीर्षक (Hindi)"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none focus:border-emerald-400"
            value={titleHi}
            onChange={(e) => setTitleHi(e.target.value)}
            required
          />

          <textarea
            placeholder="Notice Details (English)"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none focus:border-emerald-400 h-24"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            required
          />

          <textarea
            placeholder="सूचना विवरण (Hindi)"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none focus:border-emerald-400 h-24"
            value={descHi}
            onChange={(e) => setDescHi(e.target.value)}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-300"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">PDF (optional)</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full text-sm text-gray-300"
              onChange={(e) => setPdfFile(e.target.files[0] || null)}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg p-3 mt-2 disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Notice"}
          </button>
        </form>
      </div>
    </div>
  );
}
