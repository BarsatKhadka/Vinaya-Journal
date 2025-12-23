import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  }
};

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (savedLanguage) return savedLanguage;

  const systemLanguage = navigator.language.split('-')[0];
  return ['en', 'fr'].includes(systemLanguage) ? systemLanguage : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;