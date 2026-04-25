"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("dmcu-language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("dmcu-language", lang);
  };

  const t = (key) => {
    const translations = {
      en: {
        back: "Back to Database",
        stats: "Diagnostics",
        abilities: "Known Abilities",
        backstory: "Character Backstory",
        listen: "Listen",
        pause: "Pause",
        stop: "Stop",
        strength: "Strength",
        intelligence: "Intelligence",
        energy: "Energy",
        combat: "Combat",
        loading: "Decrypting Archives...",
        error: "Unable to load this profile",
        retry: "Retry Fetch",
        home: "Back to Roster"
      },
      hi: {
        back: "डेटाबेस पर वापस",
        stats: "निदान",
        abilities: "ज्ञात क्षमताएं",
        backstory: "चरित्र की पृष्ठभूमि",
        listen: "सुनें",
        pause: "विराम",
        stop: "रुकें",
        strength: "शक्ति",
        intelligence: "बुद्धि",
        energy: "ऊर्जा",
        combat: "लड़ाई",
        loading: "अभिलेखागार को डिकोड किया जा रहा है...",
        error: "इस प्रोफाइल को लोड करने में असमर्थ",
        retry: "पुनः प्रयास करें",
        home: "रोस्टर पर वापस"
      },
      gu: {
        back: "ડેટાબેઝ પર પાછા",
        stats: "નિદાન",
        abilities: "જાણીતી ક્ષમતાઓ",
        backstory: "પાત્રની પૃષ્ઠભૂમિ",
        listen: "સાંભળો",
        pause: "વિરામ",
        stop: "અટકાવો",
        strength: "શક્તિ",
        intelligence: "બુદ્ધિ",
        energy: "ઉર્જા",
        combat: "લડાઈ",
        loading: "આર્કાઇવ્સ ડિકોડ કરવામાં આવી રહ્યા છે...",
        error: "આ પ્રોફાઇલ લોડ કરવામાં અસમર્થ",
        retry: "ફરીથી પ્રયાસ કરો",
        home: "રોસ્ટર પર પાછા"
      }
    };

    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
