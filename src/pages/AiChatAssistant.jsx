// 📍 src/pages/AiChatAssistant.jsx
import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

// must import from this path — updated!
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AiChatAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste 🙏 I am Panchayat AI Assistant. How may I help you?" }
  ]);
  const [input, setInput] = useState("");

  // ⛔ FIX 1 — generate key properly
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Fetch data from DB
  async function fetchNotices() {
    const snap = await getDocs(collection(db, "notices"));
    return snap.docs.map(d => d.data());
  }
  async function fetchComplaints() {
    const snap = await getDocs(collection(db, "complaints"));
    return snap.docs.map(d => d.data());
  }

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages(m => [...m, { sender: "user", text: input }]);

    try {
      // ⛔ FIX 2 — fetch data before prompt
      const notices = await fetchNotices();
      const complaints = await fetchComplaints();

      const prompt = `
        You are a Panchayat AI Assistant.

        Notices: ${JSON.stringify(notices)}
        Complaints: ${JSON.stringify(complaints)}

        User Question → "${input}"
        Respond clearly, politely and helpful.
      `;

      // ⛔ FIX 3 — correct AI model + streaming support
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      const text = result.response.text();

      setMessages(m => [...m, { sender: "bot", text }]);
      setInput("");

    } catch (err) {
      setMessages(m => [...m, { sender: "bot", text:"⚠ Error connecting AI — Check .env & API key!" }]);
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05121b] text-white p-6">
      <div className="w-96 bg-black/70 border border-emerald-400/50 p-5 rounded-2xl shadow-2xl">

        <h2 className="text-xl font-bold text-center text-emerald-300">
          🤖 Panchayat AI Assistant
        </h2>

        <div className="h-64 overflow-y-auto border border-gray-700 p-2 rounded mt-3 space-y-2">
          {messages.map((m,i)=>(
            <p key={i} className={`p-2 rounded text-sm ${
              m.sender==="bot" ? "bg-emerald-700/50" : "bg-gray-700/60 text-right"
            }`}>
              {m.text}
            </p>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          />
          <button onClick={sendMessage} className="bg-emerald-500 px-4 rounded font-bold">➤</button>
        </div>
      </div>
    </div>
  );
}
