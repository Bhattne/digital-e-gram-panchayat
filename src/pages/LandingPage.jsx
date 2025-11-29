// src/pages/LandingPage.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./landing-assets/landing.css";
import { useLanguage } from "../contexts/LanguageContext";
import InteractiveMap from "../components/InteractiveMap";

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen relative bg-gray-900 text-white">
      
      {/* =========== HERO SECTION =========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Animated Handshake Background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 0.14, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <svg className="w-[90%] max-w-4xl" viewBox="0 0 1200 600" fill="none">
            <g transform="translate(0,80)">
              <path d="M180 380 C220 340 340 300 480 280 C540 272 640 270 720 300 C760 315 820 330 860 335"
                stroke="#06b58a" strokeWidth="8" opacity="0.6" fill="none" />
              <path d="M1020 380 C980 340 860 300 720 280 C660 272 560 270 480 300 C440 315 380 330 340 335"
                stroke="#06b58a" strokeWidth="8" opacity="0.6" fill="none" />
              <circle cx="600" cy="320" r="120" fill="url(#grad)" opacity="0.03" />
              <defs>
                <linearGradient id="grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b58a"/>
                  <stop offset="100%" stopColor="#0f9d58"/>
                </linearGradient>
              </defs>
            </g>
          </svg>
        </motion.div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
            {language === "hi" ? "डिजिटल ई-ग्राम पंचायत" : "Digital E-Gram Panchayat"}
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {language === "hi"
              ? "गाँव के विकास के लिए डिजिटल और स्मार्ट समाधान।"
              : "Empowering villages with smart, transparent governance."}
          </p>

          {/* Buttons → now go to /role */}  
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              className="px-8 py-3 bg-emerald-500 rounded-lg font-semibold hover:bg-emerald-600 transition"
              onClick={() => navigate("/role")}
            >
              {language === "hi" ? "शुरू करें" : "Get Started"}
            </button>

            <button
              className="px-8 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
              onClick={() => navigate("/role")}
            >
              {language === "hi" ? "लॉगिन" : "Login"}
            </button>
          </div>
        </div>

        <div className="hero-overlay" />
      </section>


      {/* ========= FEATURES SECTION ========= */}
      <section className="section">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <motion.div
            className="glass p-6"
            initial={{ opacity:0, x:-80 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:.8 }}>
            <h3 className="text-2xl font-semibold text-emerald-400">
              {language==="hi"?"नया स्वास्थ्य केंद्र":"New Health Centre"}
            </h3>
            <p className="text-gray-300">
              {language==="hi"
                ?"आपातकालीन संपर्क, डॉक्टर उपलब्धता और स्वास्थ्य अपडेट।"
                :"Live updates on doctors, emergency contacts & facilities."}
            </p>
          </motion.div>

          <motion.div
            className="glass p-6"
            initial={{ opacity:0, x:80 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:.8 }}>
            <h3 className="text-2xl font-semibold text-emerald-400">
              {language==="hi"?"सोलर स्ट्रीट लाइट्स":"Solar Street Lights"}
            </h3>
            <p className="text-gray-300">
              {language==="hi"
                ?"स्थापना की स्थिति, समस्याएँ और मरम्मत अनुरोध।"
                :"Track installation, raise maintenance requests."}
            </p>
          </motion.div>

        </div>
      </section>


      {/* ================= MAP ================= */}
      <section className="section">
        <div className="max-w-6xl mx-auto glass p-6 h-96 border border-gray-700">
          <InteractiveMap />
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-400">
        © {new Date().getFullYear()} Digital E-Gram Panchayat · 
        {language==="hi"?" ग्रामों का डिजिटल भविष्य":" Transforming Rural India Digitally"}
      </footer>
    </div>
  );
}
