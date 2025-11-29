import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSelector() {
  const { chooseLanguage, showSelector } = useLanguage();

  if (!showSelector) return null; // hide only after choosing

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md mx-4 rounded-2xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white text-center mb-2">
          Choose Language / भाषा चुनें
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => chooseLanguage("en")}
            className="py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-600"
          >
            English
          </button>

          <button
            onClick={() => chooseLanguage("hi")}
            className="py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-600"
          >
            हिन्दी
          </button>
        </div>
      </div>
    </div>
  );
}
