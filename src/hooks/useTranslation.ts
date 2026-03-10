import { useTranslation as useI18n } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18n();

  return {
    t: (key: string, options?: any): string => t(key, options) as string,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    isReady: i18n.isInitialized
  };
};
