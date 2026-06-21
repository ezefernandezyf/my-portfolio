/**
 * JSON-LD Schema.org @graph builder.
 *
 * Generates a `<script type="application/ld+json">` block with:
 * - Person (@id /#person) — the site author
 * - WebSite (@id /#website) — the portfolio site
 * - WebPage (per route) — with isPartOf → #website, about → #person
 *
 * Consumed at build time by `scripts/prerender.mjs` (schema logic mirrored there
 * for mjs compat) and available for client-side use.
 */

import type { RouteMeta } from './route-meta';

const SITE_URL = 'https://ezefernandez.com';
const AUTHOR_NAME = 'Ezequiel Fernández';
const AUTHOR_URL = `${SITE_URL}/about`;
const SITE_DESC = 'Full Stack Developer — portfolio, projects, and case studies';

interface JsonLdNode {
  '@type': string | string[];
  '@id': string;
  [key: string]: unknown;
}

function buildPerson(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    jobTitle: 'Full Stack Developer',
    sameAs: [
      'https://github.com/ezefernandezyf',
      'https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/',
    ],
  };
}

function buildWebSite(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${AUTHOR_NAME} — ${SITE_DESC}`,
    description: SITE_DESC,
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

function buildWebPage(route: RouteMeta, lang: string): JsonLdNode {
  const prefix = lang === 'en' ? '/en' : '';
  const url = `${SITE_URL}${prefix}${route.pathname}`;
  return {
    '@type': route.schemaType,
    '@id': url,
    url,
    name: route.titleI18nKey,
    description: route.descI18nKey,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    inLanguage: lang,
  };
}

/**
 * Build a complete `<script type="application/ld+json">` string
 * containing an @graph with Person, WebSite, and the current WebPage.
 *
 * @param route - RouteMeta for the current page
 * @param lang - Language code ('es' | 'en')
 * @returns Complete `<script>` tag with formatted JSON
 */
export function buildJsonLdGraph(route: RouteMeta, lang: string): string {
  const graph = [buildPerson(), buildWebSite(), buildWebPage(route, lang)];
  const json = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
    null,
    2,
  );
  return `<script type="application/ld+json">\n${json}\n</script>`;
}
