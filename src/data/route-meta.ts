/**
 * Route meta mapping — canonical source for per-route SEO metadata.
 *
 * Uses a centralized data approach rather than per-page meta tags so that
 * ALL route metadata lives in one place and can be consumed by:
 * - `src/data/schema.ts` (JSON-LD builder)
 * - `scripts/prerender.mjs` (mirrored inline for mjs compat)
 * - Future consumers: sitemap, breadcrumbs, og-image generators
 *
 * The `titleI18nKey`/`descI18nKey` fields point to i18next namespace keys
 * for SPA rendering (page components read them via `useTranslation`).
 * The inline `es`/`en` objects provide direct SEO text for structured data
 * consumers (schema.ts, prerender) that need resolved strings, not keys.
 *
 * NOTE: If you change routes here, sync the matching data in `scripts/prerender.mjs`.
 */

export type SchemaType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

/** Per-locale SEO content for a route */
export interface LocaleSEO {
  /** Descriptive <title> tag content, e.g. "Ezequiel Fernández — Projects | Full Stack Developer" */
  title: string;
  /** <meta name="description"> with 3-5 relevant keywords, 120-160 chars */
  description: string;
  /** Search keywords for the page — used in JSON-LD keywords and future <meta name="keywords"> */
  keywords: string[];
}

export interface RouteMeta {
  /** Route path without locale prefix, e.g. "/projects/echolog" */
  pathname: string;
  /** i18n key for <title>, format "namespace:path.to.key" */
  titleI18nKey: string;
  /** i18n key for <meta name="description">, format "namespace:path.to.key" */
  descI18nKey: string;

  /**
   * Direct SEO text content per locale.
   * These are the source of truth for resolved strings consumed by
   * schema.ts (JSON-LD) and prerender — no i18n key resolution needed.
   */
  es: LocaleSEO;
  en: LocaleSEO;

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
    es: {
      title: 'Ezequiel Fernández — Full Stack Developer | Portfolio Personal',
      description:
        'Desarrollador Full Stack especializado en React, Node.js, TypeScript y PostgreSQL. Conocé mi portfolio, proyectos y case studies.',
      keywords: ['desarrollador full stack', 'react', 'node.js', 'typescript', 'portfolio', 'desarrollo web'],
    },
    en: {
      title: 'Ezequiel Fernández — Full Stack Developer | Personal Portfolio',
      description:
        'Full Stack Developer specializing in React, Node.js, TypeScript and PostgreSQL. Explore my portfolio, projects, and case studies.',
      keywords: ['full stack developer', 'react', 'node.js', 'typescript', 'portfolio', 'web development'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 1.0,
    changefreq: 'daily',
  },
  about: {
    pathname: '/about',
    titleI18nKey: 'aboutpage:meta.title',
    descI18nKey: 'aboutpage:meta.description',
    es: {
      title: 'Sobre mí — Ezequiel Fernández, Full Stack Developer',
      description:
        'Conocé a Ezequiel Fernández, Desarrollador Full Stack con experiencia en React, TypeScript, Node.js y arquitectura limpia. Portfolio, proyectos y experiencia profesional.',
      keywords: ['sobre mí', 'desarrollador full stack', 'react', 'typescript', 'experiencia', 'cv'],
    },
    en: {
      title: 'About Me — Ezequiel Fernández, Full Stack Developer',
      description:
        'Learn about Ezequiel Fernández, a Full Stack Developer with experience in React, TypeScript, Node.js, and clean architecture. Portfolio, projects, and professional experience.',
      keywords: ['about', 'full stack developer', 'react', 'typescript', 'experience', 'cv'],
    },
    ogImage: '/og-image.png',
    schemaType: 'AboutPage',
    priority: 0.8,
    changefreq: 'monthly',
  },
  projects: {
    pathname: '/projects',
    titleI18nKey: 'projects:meta.title',
    descI18nKey: 'projects:meta.description',
    es: {
      title: 'Proyectos — React, Node.js, TypeScript | Ezequiel Fernández',
      description:
        'Explorá mi portfolio de proyectos construidos con React, Node.js, TypeScript y PostgreSQL. Desde SaaS multi-tenant hasta herramientas con IA y dashboards.',
      keywords: ['proyectos', 'react', 'node.js', 'typescript', 'portfolio', 'open source', 'desarrollo web'],
    },
    en: {
      title: 'Projects — Ezequiel Fernández | Full Stack Developer',
      description:
        'Explore my portfolio of projects built with React, Node.js, TypeScript, and PostgreSQL. From multi-tenant SaaS platforms to AI tools and dashboards.',
      keywords: ['projects', 'react', 'node.js', 'typescript', 'portfolio', 'open source', 'web development'],
    },
    ogImage: '/og-image.png',
    schemaType: 'CollectionPage',
    priority: 0.9,
    changefreq: 'weekly',
  },
  'projects/cinelab': {
    pathname: '/projects/cinelab',
    titleI18nKey: 'cinelabcasestudy:meta.title',
    descI18nKey: 'cinelabcasestudy:meta.title',
    es: {
      title: 'CineLab — Movie Search App | Ezequiel Fernández',
      description:
        'Movie Search App construida con React, TypeScript y la API de TMDB. Búsqueda, filtros, favoritos persistentes y recomendaciones dinámicas.',
      keywords: ['cinelab', 'movie app', 'react', 'typescript', 'tmdb', 'proyecto portfolio'],
    },
    en: {
      title: 'CineLab — Movie Search App | Ezequiel Fernández',
      description:
        'Movie Search App built with React, TypeScript and TMDB API. Features search, filters, persistent favorites, and dynamic recommendations.',
      keywords: ['cinelab', 'movie app', 'react', 'typescript', 'tmdb', 'portfolio project'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/movie-dashboard': {
    pathname: '/projects/movie-dashboard',
    titleI18nKey: 'moviedashboardcasestudy:meta.title',
    descI18nKey: 'moviedashboardcasestudy:meta.title',
    es: {
      title: 'Movie Management Dashboard | Ezequiel Fernández',
      description:
        'Dashboard SPA para gestión de catálogo de películas con CRUD, autenticación Supabase, React Query y arquitectura modular.',
      keywords: ['movie dashboard', 'react', 'supabase', 'react query', 'crud', 'typescript'],
    },
    en: {
      title: 'Movie Management Dashboard | Ezequiel Fernández',
      description:
        'SPA dashboard for movie catalog management with CRUD, Supabase auth, React Query, and modular architecture.',
      keywords: ['movie dashboard', 'react', 'supabase', 'react query', 'crud', 'typescript'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/chefcitoia': {
    pathname: '/projects/chefcitoia',
    titleI18nKey: 'chefcitoiacasestudy:meta.title',
    descI18nKey: 'chefcitoiacasestudy:meta.title',
    es: {
      title: 'ChefcitoIA — Generador de Recetas con IA | Ezequiel Fernández',
      description:
        'Generador de recetas con IA construido con React y TypeScript. Convertí ingredientes en ideas de comidas con validación Zod.',
      keywords: ['chefcitoia', 'generador recetas ia', 'react', 'typescript', 'zod', 'portfolio'],
    },
    en: {
      title: 'ChefcitoIA — AI Recipe Generator | Ezequiel Fernández',
      description:
        'AI-powered recipe generator built with React and TypeScript. Turn ingredients into practical meal ideas with Zod validation.',
      keywords: ['chefcitoia', 'ai recipe generator', 'react', 'typescript', 'zod', 'portfolio'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/nexus-talent': {
    pathname: '/projects/nexus-talent',
    titleI18nKey: 'nexustalentcasestudy:meta.title',
    descI18nKey: 'nexustalentcasestudy:meta.title',
    es: {
      title: 'Nexus Talent — Plataforma de Reclutamiento con IA | Ezequiel Fernández',
      description:
        'Plataforma de reclutamiento asistida por IA que convierte descripciones de trabajo en matrices de skills y estrategias de postulación.',
      keywords: ['nexus talent', 'reclutamiento ia', 'react', 'typescript', 'node.js', 'portfolio'],
    },
    en: {
      title: 'Nexus Talent — AI Recruitment Platform | Ezequiel Fernández',
      description:
        'AI-assisted recruitment platform that transforms job descriptions into structured skill matrices and application strategies.',
      keywords: ['nexus talent', 'ai recruitment', 'react', 'typescript', 'node.js', 'portfolio'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'projects/echolog': {
    pathname: '/projects/echolog',
    titleI18nKey: 'echologcasestudy:meta.title',
    descI18nKey: 'echologcasestudy:meta.title',
    es: {
      title: 'EchoLog — SaaS de Feedback Multi-tenant | Ezequiel Fernández',
      description:
        'SaaS multi-tenant de feedback para productos construido con React 19, Node.js, Express, PostgreSQL. Boards, votos, comentarios y workspaces.',
      keywords: ['echolog', 'saas', 'feedback', 'react', 'node.js', 'postgresql', 'multi-tenant'],
    },
    en: {
      title: 'EchoLog — Multi-tenant Feedback SaaS | Ezequiel Fernández',
      description:
        'Multi-tenant customer feedback SaaS built with React 19, Node.js, Express, PostgreSQL. Boards, voting, comments, and workspaces.',
      keywords: ['echolog', 'saas', 'feedback', 'react', 'node.js', 'postgresql', 'multi-tenant'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
  },
  privacy: {
    pathname: '/privacy',
    titleI18nKey: 'privacy:meta.title',
    descI18nKey: 'privacy:meta.description',
    es: {
      title: 'Política de Privacidad — Ezequiel Fernández',
      description:
        'Política de privacidad del portfolio de Ezequiel Fernández. Información sobre recolección de datos, cookies y derechos del usuario.',
      keywords: ['política de privacidad', 'protección de datos', 'cookies', 'portfolio'],
    },
    en: {
      title: 'Privacy Policy — Ezequiel Fernández',
      description:
        'Privacy policy for Ezequiel Fernández\'s portfolio website. Information about data collection, cookies, and user rights.',
      keywords: ['privacy policy', 'data protection', 'cookies', 'portfolio'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.3,
    changefreq: 'yearly',
  },
  contact: {
    pathname: '/contact',
    titleI18nKey: 'contact:meta.contact.title',
    descI18nKey: 'contact:meta.contact.description',
    es: {
      title: 'Contacto — Ezequiel Fernández, Full Stack Developer',
      description:
        'Contactá a Ezequiel Fernández para oportunidades de equipo, colaboraciones técnicas o proyectos freelance. Respuesta en 24 horas.',
      keywords: ['contacto', 'desarrollador full stack', 'contratación', 'freelance', 'colaboración'],
    },
    en: {
      title: 'Contact — Ezequiel Fernández, Full Stack Developer',
      description:
        'Get in touch with Ezequiel Fernández for team opportunities, technical collaborations, or freelance projects. 24h response time.',
      keywords: ['contact', 'full stack developer', 'hire', 'freelance', 'collaboration'],
    },
    ogImage: '/og-image.png',
    schemaType: 'ContactPage',
    priority: 0.6,
    changefreq: 'monthly',
  },
  'not-found': {
    pathname: '/not-found',
    titleI18nKey: 'notfoundpage:meta.title',
    descI18nKey: 'notfoundpage:meta.description',
    es: {
      title: 'Página No Encontrada — Ezequiel Fernández',
      description: 'La página que buscas no existe. Volvé al inicio.',
      keywords: ['404', 'no encontrada', 'página no encontrada'],
    },
    en: {
      title: 'Page Not Found — Ezequiel Fernández',
      description: 'The page you\'re looking for doesn\'t exist. Return to the homepage.',
      keywords: ['404', 'not found', 'page not found'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.1,
    changefreq: 'yearly',
    noIndex: true,
  },
  'projects/geo-seo-opencode': {
    pathname: '/projects/geo-seo-opencode',
    titleI18nKey: 'geoseoopencodecasestudy:meta.title',
    descI18nKey: 'geoseoopencodecasestudy:meta.title',
    es: {
      title: 'Geo-SEO OpenCode — Skill SEO para Buscadores con IA | Ezequiel Fernández',
      description:
        'Skill de GEO-SEO para OpenCode/Claude que optimiza sitios web para buscadores impulsados por IA. Node.js, Commander, análisis automatizado.',
      keywords: ['geo-seo', 'opencode', 'seo ia', 'claude', 'node.js', 'skill'],
    },
    en: {
      title: 'Geo-SEO OpenCode — AI SEO Skill | Ezequiel Fernández',
      description:
        'GEO-SEO skill for OpenCode/Claude that optimizes websites for AI-powered search engines. Node.js, Commander, automated analysis.',
      keywords: ['geo-seo', 'opencode', 'ai seo', 'claude', 'node.js', 'skill'],
    },
    ogImage: '/og-image.png',
    schemaType: 'WebPage',
    priority: 0.7,
    changefreq: 'monthly',
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
  'projects/geo-seo-opencode',
  'privacy',
  'contact',
  'not-found',
];
