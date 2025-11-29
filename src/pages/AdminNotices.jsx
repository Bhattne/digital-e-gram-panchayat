// 🚀 src/pages/AdminNotices.jsx (Full Upgrade)
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminNotices() {

  const [title_en, setTitleEn] = useState("");
  const [title_hi, setTitleHi] = useState("");
  const [desc_en, setDescEn] = useState("");
  const [desc_hi, setDescHi] = useState("");
  const [category, setCategory] = useState("general");

  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notices"), snap =>
      setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  async function uploadNotice() {
    if (!title_en.trim() || !title_hi.trim()) return alert("Enter title in both languages");
    let pdfUrl = "", imageUrl = "";

    // 🔥 Automatically upload to Firebase Storage
    if (file) {
      const ext = file.name.split(".").pop();
      const fileRef = ref(storage, `notices/${Date.now()}.${ext}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      if (ext === "pdf") pdfUrl = url;
      else imageUrl = url;
    }

    await addDoc(collection(db, "notices"), {
      title_en, title_hi, desc_en, desc_hi, category,
      imageUrl, pdfUrl,
      createdAt: serverTimestamp()
    });

    setTitleEn(""); setTitleHi(""); setDescEn(""); setDescHi("");
    setCategory("general"); setFile(null);
  }

  async function remove(id) {
    await deleteDoc(doc(db, "notices", id));
  }

  return (
    <div className="min-h-screen bg-[#07121c] text-white p-10">

      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        📜 Admin Notice Control Panel — Power Mode
      </h1>

      {/* Upload Panel */}
      <div className="bg-[#102131] p-6 rounded-xl space-y-3">

        <input onChange={e=>setTitleEn(e.target.value)} value={title_en}
          placeholder="Notice Title (English)" className="w-full p-3 rounded bg-black/30"/>
        <input onChange={e=>setTitleHi(e.target.value)} value={title_hi}
          placeholder="शीर्षक (Hindi)" className="w-full p-3 rounded bg-black/30"/>

        <textarea onChange={e=>setDescEn(e.target.value)} value={desc_en}
          placeholder="Description English" className="w-full p-3 rounded bg-black/30"/>
        <textarea onChange={e=>setDescHi(e.target.value)} value={desc_hi}
          placeholder="विवरण (Hindi)" className="w-full p-3 rounded bg-black/30"/>

        <select value={category} onChange={e=>setCategory(e.target.value)} className="p-3 bg-black/30 w-full rounded">
          <option value="general">General</option>
          <option value="meeting">Meeting</option>
          <option value="scheme">Govt Scheme</option>
          <option value="emergency">Emergency</option>
        </select>

        {/* 🔥 FILE INPUT — AUTO UPLOAD */}
        <input type="file" onChange={e=>setFile(e.target.files[0])}
          className="w-full p-2 bg-black/30 rounded text-gray-300"/>

        <button onClick={uploadNotice}
          className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded font-bold">
          📤 Upload Notice
        </button>
      </div>

      {/* Live List */}
      <h2 className="text-2xl font-bold mt-10">All Notices</h2>
      {notices.map(n => (
        <div key={n.id} className="bg-[#102131] p-4 rounded-lg mt-4 flex justify-between">
          <div>
            <p className="text-xl font-bold">{n.title_en}</p>
            <p className="text-gray-300">{n.desc_en}</p>
            {n.pdfUrl && <a href={n.pdfUrl} target="_blank" className="text-blue-400 underline">📄 View PDF</a>}
            {n.imageUrl && <img src={n.imageUrl} className="w-40 rounded mt-3"/>}
          </div>
          <button className="text-red-400 hover:text-red-600" onClick={()=>remove(n.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}
