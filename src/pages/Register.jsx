// src/pages/Register.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"; // ⬅ language hook

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { language } = useLanguage(); // 🔥 detect Hindi/English

  // ------------------- EMAIL/PASSWORD REGISTER -------------------
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError(language === "hi" ? "पासवर्ड मेल नहीं खा रहा" : "Passwords do not match");
    }

    setLoading(true);
    try {
      await register({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(
        language === "hi"
          ? "रजिस्ट्रेशन असफल। कृपया पुनः प्रयास करें।"
          : "Registration failed. Please try again."
      );
    }
    setLoading(false);
  }

  // ------------------- GOOGLE REGISTER / LOGIN -------------------
  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(language === "hi" ? "Google लॉगिन असफल" : "Google login failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 relative">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-xl bg-black/70 border border-gray-800 shadow-xl hover:shadow-emerald-500 transition-shadow">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {language === "hi" ? "खाता बनाएँ" : "Create an account"}
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-black border border-green-700 text-white p-3 rounded-lg shadow hover:shadow-emerald-500 transition mb-4"
        >
          <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5" />
          {language === "hi" ? "Google से जारी रखें" : "Continue with Google"}
        </button>

        <div className="text-gray-400 text-sm text-center my-4">
          {language === "hi" ? "या" : "or"}
        </div>

        {/* FORM EXACTLY SAME — only placeholder language updated */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={nameRef}
            type="text"
            placeholder={language === "hi" ? "पूरा नाम" : "Full Name"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white focus:border-emerald-400 outline-none transition"
          />

          <input
            ref={emailRef}
            type="email"
            placeholder={language === "hi" ? "ईमेल" : "Email"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white focus:border-emerald-400 outline-none transition"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder={language === "hi" ? "पासवर्ड" : "Password"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white focus:border-emerald-400 outline-none transition"
          />

          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder={language === "hi" ? "पासवर्ड पुष्टि करें" : "Confirm Password"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white focus:border-emerald-400 outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 p-3 rounded-lg font-semibold text-black hover:bg-emerald-600 hover:shadow-emerald-500 transition mt-2"
          >
            {language === "hi" ? "रजिस्टर करें" : "Register"}
          </button>
        </form>

        {/* 🔙 BACK ARROW — kept exactly same position */}
        <Link 
          to="/" 
          className="absolute top-5 left-5 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">{language === "hi" ? "वापस" : "Back"}</span>
        </Link>

        <p className="text-gray-300 text-sm text-center mt-4">
          {language === "hi" ? "पहले से खाता है?" : "Already have an account?"}{" "}
          <Link to="/login" className="text-emerald-400 underline">
            {language === "hi" ? "लॉगिन करें" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
