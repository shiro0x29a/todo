import { createContext, useState, useContext, useEffect } from 'react';
import { PropsWithChildren } from 'react';

import i18n from '../i18n';

interface ILanguageContext {
  currentLanguage: string
  changeLanguage: (lng: string) => void
}

const LanguageContext = createContext<ILanguageContext | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider')
  }
  return context;
};

export default function LanguageProvider({ children }: PropsWithChildren) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
