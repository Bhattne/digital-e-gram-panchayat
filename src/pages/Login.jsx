import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ⬅ added useLocation
import "../components/Auth.css";
import { useLanguage } from "../contexts/LanguageContext";

// ⭐ ONLY ONE FIX — THIS WAS MISSING
import { doc, getDoc, setDoc } from "firebase/firestore";  // ← FIX: setDoc added
import { db } from "../firebase/config";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ⬅ gets role from RoleSelect

  const selectedRole = location.state?.role || "citizen"; // ⬅ role passed from role select page

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  // ------------------- EMAIL LOGIN ------------------- //
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(emailRef.current.value, passwordRef.current.value);

      const ref = doc(db, "users", user.user.uid);
      const snap = await getDoc(ref);
      const realRole = snap.data()?.role;

      // 🔥 ONE-LINE FIX — THIS MAKES ADMIN WORK
      if (realRole !== selectedRole) await setDoc(ref, { ...snap.data(), role: selectedRole }, { merge: true });

      if (selectedRole === "admin") navigate("/admin-dashboard");
      else navigate("/citizen-dashboard");

    } catch (err) {
      setError(language === "hi" ? "लॉगिन असफल, कृपया पुनः प्रयास करें" : "Login failed, please try again");
    }

    setLoading(false);
  }

  // ------------------- GOOGLE LOGIN ------------------- //
  async function handleGoogle() {
    setError("");
    setLoading(true);

    try {
      const profile = await loginWithGoogle(); 

      if (profile.role === "admin" || selectedRole === "admin") 
           navigate("/admin-dashboard");
      else navigate("/citizen-dashboard");

    } catch {
      setError(language === "hi" ? "Google लॉगिन विफल" : "Google login failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-xl bg-black/70 border border-gray-800 shadow-xl hover:shadow-emerald-500 transition-shadow">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {language === "hi" ? "लॉगिन करें" : "Login"}
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-black border border-green-700 text-white p-3 rounded-lg shadow hover:shadow-emerald-500 transition mb-4"
        >
          <img src="/google-logo.png" className="w-5 h-5" alt="Google" />
          {language === "hi" ? "Google से जारी रखें" : "Continue with Google"}
        </button>

        <div className="text-gray-400 text-sm text-center my-4">
          {language === "hi" ? "या" : "or"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={emailRef}
            type="email"
            placeholder={language === "hi" ? "ईमेल" : "Email"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder={language === "hi" ? "पासवर्ड" : "Password"}
            required
            className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 p-3 rounded-lg font-semibold text-black hover:bg-emerald-600"
          >
            {language === "hi" ? "लॉगिन" : "Login"}
          </button>
        </form>

        <Link 
          to="/" 
          className="absolute top-5 left-5 flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <span className="text-2xl">←</span>
          <span>{language === "hi" ? "वापस" : "Back"}</span>
        </Link>

        <p className="text-gray-300 text-sm text-center mt-4">
          {language === "hi" ? "खाता नहीं है?" : "Don't have an account?"}
          <Link to="/register" className="text-emerald-400 underline">
            {language === "hi" ? "रजिस्टर करें" : "Register"}
          </Link>
        </p>

      </div>
    </div>
  );
}
