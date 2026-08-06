import { describe, expect, it } from 'vitest';

import { ROUTE_META, ROUTE_KEYS } from '../route-meta';

const LOCALES = ['es', 'en'] as const;

const AUTHOR_NAME = 'Ezequiel Fernández';
const TYPO_SEPARATOR = ' , ';

describe('ROUTE_META integrity (canonical SEO source)', () => {
  it('covers every route key in ROUTE_KEYS', () => {
    expect(ROUTE_KEYS.length).toBeGreaterThan(0);
    for (const key of ROUTE_KEYS) {
      expect(ROUTE_META[key], `ROUTE_META is missing route key "${key}"`).toBeDefined();
    }
  });

  it.each(ROUTE_KEYS)('route "%s" has non-empty es/en titles and descriptions containing the author name', (key) => {
    const route = ROUTE_META[key];

    for (const locale of LOCALES) {
      const seo = route[locale];
      expect(seo.title, `${key}.${locale}.title`).toBeTruthy();
      expect(seo.description, `${key}.${locale}.description`).toBeTruthy();
      expect(seo.title, `${key}.${locale}.title`).toContain(AUTHOR_NAME);
    }
  });

  it.each(ROUTE_KEYS)('route "%s" has no " , " typo in titles (space-comma-space)', (key) => {
    const route = ROUTE_META[key];

    for (const locale of LOCALES) {
      expect(route[locale].title, `${key}.${locale}.title`).not.toContain(TYPO_SEPARATOR);
    }
  });

  it('has unique titles per locale', () => {
    for (const locale of LOCALES) {
      const titles = ROUTE_KEYS.map((key) => ROUTE_META[key][locale].title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size, `${locale} titles are not unique`).toBe(titles.length);
    }
  });

  it('not-found route keeps noIndex with locale-specific meta (spec: NotFound noIndex)', () => {
    const notFound = ROUTE_META['not-found'];

    expect(notFound.noIndex).toBe(true);
    for (const locale of LOCALES) {
      expect(notFound[locale].title, `not-found.${locale}.title`).toBeTruthy();
      expect(notFound[locale].description, `not-found.${locale}.description`).toBeTruthy();
    }
  });

  it('snapshot captures ROUTE_META for regression detection', () => {
    expect(ROUTE_META).toMatchSnapshot();
  });
});
