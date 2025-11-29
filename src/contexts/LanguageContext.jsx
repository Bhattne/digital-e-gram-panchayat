import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // default English
  const [showSelector, setShowSelector] = useState(true); // ALWAYS SHOW ON PAGE LOAD

  function chooseLanguage(code) {
    setLanguage(code);
    setShowSelector(false); // hide popup only after choosing
  }

  // 🔥 Translation dictionary
  function t(key) {
    const strings = {
      en: {
        title: "Digital E-Gram Panchayat",
        subtitle: "Empowering villages through transparent & efficient digital services.",
        getStarted: "Get Started",
        login: "Login",
        healthCentre: "New Health Centre",
        solar: "Solar Street Lights",
        footer: "Empowering villages through digital transformation."
      },

      hi: {
        title: "डिजिटल ई-ग्राम पंचायत",
        subtitle: "पारदर्शी और प्रभावी सेवाओं के साथ गांवों को सशक्त बनाना।",
        getStarted: "शुरू करें",
        login: "लॉगिन",
        healthCentre: "नया स्वास्थ्य केंद्र",
        solar: "सौर स्ट्रीट लाइटें",
        footer: "डिजिटल परिवर्तन के माध्यम से गांवों को सशक्त बनाना।"
      }
    };

    return strings[language]?.[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, chooseLanguage, t, showSelector }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
