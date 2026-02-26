import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import type { ReactNode } from 'react';

import esCommon from './locales/es/common.json';
import enCommon from './locales/en/common.json';

type JsonValue = string | number | boolean | JsonObject | JsonArray | null;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = Array<JsonValue>;

const resources: Record<'es' | 'en', JsonObject> = {
  es: esCommon as JsonObject,
  en: enCommon as JsonObject,
};

let currentLang: 'es' | 'en' = 'es';

function getTranslation(key: string): string {
  const parts = key.split('.');
  let cur: JsonValue | undefined = resources[currentLang] ?? resources['es'];

  for (const p of parts) {
    if (cur && typeof cur === 'object' && !Array.isArray(cur) && p in (cur as JsonObject)) {
      cur = (cur as JsonObject)[p];
    } else {
      cur = undefined;
      break;
    }
  }

  return typeof cur === 'string' ? cur : key;
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

export const changeTestLang = async (lng: 'es' | 'en') => {
  currentLang = lng;
  document.documentElement.lang = lng;
  return Promise.resolve();
};

vi.mock('react-i18next', () => {
  const useTranslation = () => ({
    t: (key: string) => getTranslation(key),
    i18n: {
      language: currentLang,
      changeLanguage: async (lng: 'es' | 'en') => {
        await changeTestLang(lng);
        return Promise.resolve();
      },
    },
  });

  const Trans = ({ children }: { children: ReactNode }) => children;

  return {
    useTranslation,
    Trans,
    initReactI18next: {},
  } as unknown as Partial<typeof import('react-i18next')>;
});
