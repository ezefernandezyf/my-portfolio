import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

import esCommon from './locales/es/common.json';
import enCommon from './locales/en/common.json';

const resources: Record<string, any> = {
  es: esCommon,
  en: enCommon,
};

let currentLang = 'es';

function getTranslation(key: string) {
  const parts = key.split('.');
  let cur: any = resources[currentLang] ?? resources['es'];
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = cur[p];
    } else {
      cur = undefined;
      break;
    }
  }
  return typeof cur === 'string' ? cur : key;
}

vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: (key: string) => getTranslation(key),
      i18n: {
        language: currentLang,
        changeLanguage: async (lng: string) => {
          currentLang = lng;
          document.documentElement.lang = lng;
          return Promise.resolve();
        },
      },
    }),
    Trans: ({ children }: any) => children,
    initReactI18next: {},
  };
});
