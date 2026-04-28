import { describe, expect, it } from 'vitest';

import enCineLab from '../../../locales/en/cinelabcasestudy.json';
import esCineLab from '../../../locales/es/cinelabcasestudy.json';
import enMovieDashboard from '../../../locales/en/moviedashboardcasestudy.json';
import esMovieDashboard from '../../../locales/es/moviedashboardcasestudy.json';
import enChefcitoIA from '../../../locales/en/chefcitoiacasestudy.json';
import esChefcitoIA from '../../../locales/es/chefcitoiacasestudy.json';
import enNexusTalent from '../../../locales/en/nexustalentcasestudy.json';
import esNexusTalent from '../../../locales/es/nexustalentcasestudy.json';

type JsonNode = string | number | boolean | null | JsonNode[] | { [k: string]: JsonNode };

function flattenKeys(node: JsonNode, prefix = ''): string[] {
  if (Array.isArray(node)) {
    return [prefix];
  }

  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) => {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      return flattenKeys(value, nextPrefix);
    });
  }

  return [prefix];
}

describe('Case study i18n parity', () => {
  const namespaces = [
    { name: 'cinelabcasestudy', en: enCineLab, es: esCineLab },
    { name: 'moviedashboardcasestudy', en: enMovieDashboard, es: esMovieDashboard },
    { name: 'chefcitoiacasestudy', en: enChefcitoIA, es: esChefcitoIA },
    { name: 'nexustalentcasestudy', en: enNexusTalent, es: esNexusTalent },
  ];

  it.each(namespaces)('$name has matching key structures in en and es', ({ en, es }) => {
    const enKeys = flattenKeys(en as JsonNode).sort();
    const esKeys = flattenKeys(es as JsonNode).sort();
    expect(enKeys).toEqual(esKeys);
  });
});