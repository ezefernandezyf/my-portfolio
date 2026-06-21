/**
 * Route meta mapping — canonical source for per-route SEO metadata.
 *
 * Consumed by:
 * - `scripts/prerender.mjs` (mirrored inline for mjs compat)
 * - `src/data/schema.ts` (JSON-LD builder)
 *
 * NOTE: If you change routes here, sync the matching data in `scripts/prerender.mjs`.
 */

export type SchemaType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

export interface RouteMeta {
  /** Route path without locale prefix, e.g. "/projects/echolog" */
  pathname: string;
  /** i18n key for <title>, format "namespace:path.to.key" */
  titleI18nKey: string;
  /** i18n key for <meta name="description">, format "namespace:path.to.key" */
  descI18nKey: string;
  /** Open Graph image path relative to site root */
  ogImage: string;
  /** Schema.org type for the WebPage node */
  schemaType: SchemaType;
  /** Sitemap priority 0.0–1.0 */
  priority: number;
  /** Sitemap change frequency */
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Whether search engines should index this page */
  noIndex?: boolean;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  home: {
    pathname: '/home',
    titleI18nKey: 'home:meta.title',
    descI18nKey: 'home:meta.description',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 1.0,
    changefreq: 'daily',
  },
  about: {
    pathname: '/about',
    titleI18nKey: 'aboutpage:meta.title',
    descI18nKey: 'aboutpage:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'AboutPage',
    priority: 0.8,
    changefreq: 'monthly',
  },
  projects: {
    pathname: '/projects',
    titleI18nKey: 'projects:meta.title',
    descI18nKey: 'projects:meta.description',
    ogImage: '/og-image.png',
    schemaType: 'CollectionPage',
    priority: 0.9,
    changefreq: 'weekly',
  },
  'projects/cinelab': {
    pathname: '/projects/cinelab',
    titleI18nKey: 'cinelabcasestudy:meta.title',
    descI18nKey: 'cinelabcasestudy:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/movie-dashboard': {
    pathname: '/projects/movie-dashboard',
    titleI18nKey: 'moviedashboardcasestudy:meta.title',
    descI18nKey: 'moviedashboardcasestudy:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/chefcitoia': {
    pathname: '/projects/chefcitoia',
    titleI18nKey: 'chefcitoiacasestudy:meta.title',
    descI18nKey: 'chefcitoiacasestudy:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/nexus-talent': {
    pathname: '/projects/nexus-talent',
    titleI18nKey: 'nexustalentcasestudy:meta.title',
    descI18nKey: 'nexustalentcasestudy:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/echolog': {
    pathname: '/projects/echolog',
    titleI18nKey: 'echologcasestudy:meta.title',
    descI18nKey: 'echologcasestudy:meta.title',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  privacy: {
    pathname: '/privacy',
    titleI18nKey: 'privacy:meta.title',
    descI18nKey: 'privacy:meta.description',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.3,
    changefreq: 'yearly',
  },
  contact: {
    pathname: '/contact',
    titleI18nKey: 'contact:meta.contact.title',
    descI18nKey: 'contact:meta.contact.description',
    ogImage: '/og-image.png',
    schemaType: 'ContactPage',
    priority: 0.6,
    changefreq: 'monthly',
  },
  'not-found': {
    pathname: '/not-found',
    titleI18nKey: 'notfoundpage:meta.title',
    descI18nKey: 'notfoundpage:meta.description',
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.1,
    changefreq: 'yearly',
    noIndex: true,
  },
};

/** Ordered route keys matching the prerender loop order */
export const ROUTE_KEYS: string[] = [
  'home',
  'about',
  'projects',
  'projects/cinelab',
  'projects/movie-dashboard',
  'projects/chefcitoia',
  'projects/nexus-talent',
  'projects/echolog',
  'privacy',
  'contact',
  'not-found',
];
