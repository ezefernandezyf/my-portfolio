/**
 * JSON-LD Schema.org @graph builder.
 *
 * Generates a `<script type="application/ld+json">` block with:
 * - Person (@id /#person) | the site author
 * - WebSite (@id /#website) | the portfolio site
 * - WebPage (per route) | with isPartOf → #website, about → #person
 *
 * Consumed at build time by `scripts/prerender.mjs` (schema logic mirrored there
 * for mjs compat) and available for client-side use.
 */

import { ROUTE_META, type RouteMeta } from './route-meta';

const SITE_URL = 'https://ezefernandez.com';
const AUTHOR_NAME = 'Ezequiel Fernández';
const AUTHOR_URL = `${SITE_URL}/about`;
const SITE_DESC = 'Full Stack Developer | portfolio, projects, and case studies';

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
    name: `${AUTHOR_NAME} | ${SITE_DESC}`,
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

function buildBreadcrumbList(route: RouteMeta, lang: string): JsonLdNode {
  const segments = route.pathname.split('/').filter(Boolean);
  const prefix = lang === 'en' ? '/en' : '';
  const homeName = lang === 'en' ? 'Home' : 'Inicio';

  const itemListElement: Array<Record<string, unknown>> = [];

  if (route.pathname === '/home') {
    // Single item for home page
    itemListElement.push({
      '@type': 'ListItem',
      position: 1,
      name: homeName,
      item: `${SITE_URL}${prefix}/home`,
    });
  } else {
    // Always start with Home
    itemListElement.push({
      '@type': 'ListItem',
      position: 1,
      name: homeName,
      item: `${SITE_URL}${prefix}/home`,
    });

    // Build items from path segments
    let accumulatedPath = '';
    let position = 1;

    for (let i = 0; i < segments.length; i++) {
      accumulatedPath += `/${segments[i]}`;
      position++;

      let name: string;
      if (i === segments.length - 1) {
        // Last segment | use current route's resolved title
        name = lang === 'en' ? route.en.title : route.es.title;
      } else {
        // Intermediate segment | look up parent route in ROUTE_META
        const parentKey = accumulatedPath.slice(1);
        const parentMeta = ROUTE_META[parentKey];
        name = parentMeta ? (lang === 'en' ? parentMeta.en.title : parentMeta.es.title) : segments[i];
      }

      itemListElement.push({
        '@type': 'ListItem',
        position,
        name,
        item: `${SITE_URL}${prefix}${accumulatedPath}`,
      });
    }
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement,
  } as JsonLdNode;
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
  const graph = [buildPerson(), buildWebSite(), buildWebPage(route, lang), buildBreadcrumbList(route, lang)];
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
