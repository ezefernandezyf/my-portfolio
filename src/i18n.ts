import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .init({
    resources: {
      en: { common: enCommon },
      es: { common: esCommon },
    },
    fallbackLng: 'es',
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

