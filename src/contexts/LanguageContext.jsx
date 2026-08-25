import React, { createContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Detecta idioma del navegador o usa inglés por defecto
    const browserLang = navigator.language.split('-')[0];
    const savedLang = localStorage.getItem('language');
    return savedLang || (browserLang === 'es' ? 'es' : 'en');
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};