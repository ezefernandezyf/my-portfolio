import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import type { ReactNode } from 'react';

import esCommon from './locales/es/common.json';
import enCommon from './locales/en/common.json';
import esFooter from './locales/es/footer.json';
import enFooter from './locales/en/footer.json';
import esHeader from './locales/es/header.json';
import enHeader from './locales/en/header.json';
import esHome from './locales/es/home.json';
import enHome from './locales/en/home.json';
import esContact from './locales/es/contact.json';
import enContact from './locales/en/contact.json';
import esProjects from './locales/es/projects.json';
import enProjects from './locales/en/projects.json';
import esAbout from './locales/es/aboutpage.json';
import enAbout from './locales/en/aboutpage.json';
import esNotFound from './locales/es/notfoundpage.json';
import enNotFound from './locales/en/notfoundpage.json';
import esCineLab from './locales/es/cinelabcasestudy.json';
import enCineLab from './locales/en/cinelabcasestudy.json';

type JsonValue = string | number | boolean | JsonObject | JsonArray | null;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = Array<JsonValue>;

const resources: Record<'es' | 'en', Record<string, JsonObject>> = {
  es: {
    common: esCommon,
    footer: esFooter,
    header: esHeader,
    home: esHome,
    contact: esContact,
    projects: esProjects,
    aboutpage: esAbout,
    notfoundpage: esNotFound,
    cinelabcasestudy: esCineLab,
  },
  en: {
    common: enCommon,
    footer: enFooter,
    header: enHeader,
    home: enHome,
    contact: enContact,
    projects: enProjects,
    aboutpage: enAbout,
    notfoundpage: enNotFound,
    cinelabcasestudy: enCineLab,
  },
};

let currentLang: 'es' | 'en' = 'es';

function interpolate(str: string, vars?: Record<string, unknown>): string {
  return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, v) => {
    if (vars && v in vars) return String(vars[v] ?? '');
    if (v === 'year') return String(new Date().getFullYear());
    return '';
  });
}

function normalizeNsKey(key: string) {
  if (key.includes(':')) {
    const [ns, rest] = key.split(':', 2);
    return { ns, key: rest };
  }
  if (key.includes('.') && key.split('.')[0] in (resources.es || {})) {
    const pos = key.indexOf('.');
    return { ns: key.slice(0, pos), key: key.slice(pos + 1) };
  }
  return { ns: undefined, key };
}

function getFromNamespace(namespace: string, realKey: string): JsonValue | undefined {
  const parts = realKey.split('.');
  let cur: JsonValue | undefined =
    resources[currentLang]?.[namespace] ?? resources['es']?.[namespace];
  for (const p of parts) {
    if (cur && typeof cur === 'object' && !Array.isArray(cur) && p in (cur as JsonObject)) {
      cur = (cur as JsonObject)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

function resolveTranslation(
  rawKey: string,
  opts?: { ns?: string | string[]; returnObjects?: boolean; [k: string]: unknown },
  defaultNs = 'common',
): unknown {
  const normalized = normalizeNsKey(rawKey);
  let namespace = normalized.ns ?? defaultNs;
  const realKey = normalized.key;

  if (opts?.ns) {
    namespace = Array.isArray(opts.ns) ? opts.ns[0] : opts.ns;
  }

  const value = getFromNamespace(namespace, realKey);

  if (value === undefined) return rawKey;

  if (opts?.returnObjects) {
    if (Array.isArray(value)) return value;
    if (value && typeof value === 'object') return value;
  }

  if (typeof value === 'string') {
    return interpolate(value, opts);
  }

  return value;
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
  const useTranslation = (ns: string | string[] = 'common') => {
    const defaultNs = Array.isArray(ns) ? ns[0] : ns;
    return {
      t: (
        key: string,
        opts?: { ns?: string | string[]; returnObjects?: boolean; [k: string]: unknown },
      ) => resolveTranslation(key, opts, defaultNs),
      i18n: {
        language: currentLang,
        changeLanguage: async (lng: 'es' | 'en') => {
          await changeTestLang(lng);
          return Promise.resolve();
        },
      },
    };
  };

  const Trans = ({ children }: { children: ReactNode }) => children;

  return {
    useTranslation,
    Trans,
    initReactI18next: {},
  } as unknown as Partial<typeof import('react-i18next')>;
});
