import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';

import enProjects from './locales/en/projects.json';
import esProjects from './locales/es/projects.json';

import enContact from './locales/en/contact.json';
import esContact from './locales/es/contact.json';

import enNotFound from './locales/en/notfoundpage.json';
import esNotFound from './locales/es/notfoundpage.json';

import enAbout from './locales/en/aboutpage.json';
import esAbout from './locales/es/aboutpage.json';

import enHeader from './locales/en/header.json';
import esHeader from './locales/es/header.json';

import enFooter from './locales/en/footer.json';
import esFooter from './locales/es/footer.json';

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    projects: enProjects,
    contact: enContact,
    notfoundpage: enNotFound,
    aboutpage: enAbout,
    header: enHeader,
    footer: enFooter,
  },
  es: {
    common: esCommon,
    home: esHome,
    projects: esProjects,
    contact: esContact,
    notfoundpage: esNotFound,
    aboutpage: esAbout,
    header: esHeader,
    footer: esFooter,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'es',
    ns: ['common', 'home', 'projects', 'contact', 'notfoundpage', 'aboutpage', 'header', 'footer'],
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

