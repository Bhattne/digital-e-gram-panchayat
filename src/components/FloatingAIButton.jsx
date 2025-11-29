
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FloatingAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      {open && (
        <Link
          to="/ai-assistant"
          className="fixed bottom-24 right-6 bg-black/90 text-white border border-emerald-400 px-4 py-2 rounded-xl shadow-xl"
        >
          Open AI Assistant 🤖
        </Link>
      )}

      
      <button
        className="fixed bottom-6 right-6 bg-emerald-500 text-black text-xl font-bold 
        px-5 py-4 rounded-full shadow-lg hover:scale-110 transition"
        onClick={() => setOpen(true)}
      >
        🤖
      </button>
    </>
  );
}
