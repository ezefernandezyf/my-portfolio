# My Portfolio

Portfolio personal de Ezequiel Fernández, Full Stack Developer. Sitio estático con prerender, desplegado en Vercel.

## Demo

- https://ezefernandez.com

## Resumen

Portfolio construido con React 19 + Vite 7 + TypeScript strict. Tiene páginas principales (Home, About, Projects, Contact, Privacy, Open Source), 9 proyectos con case study propio, internacionalización completa (ES/EN, 19 namespaces por idioma), prerender estático de 32 páginas con JSON-LD y hreflang, light/dark mode con personalidad visual diferenciada y WCAG 2.2 AA como objetivo.

## Tecnologías

- React 19 + TypeScript 5.9 (strict) + Vite 7
- Tailwind CSS 4 + DaisyUI 5 + tokens de diseño OKLCH
- React Router 7 + i18next (ES/EN, namespaces por feature)
- Zod 4 + react-hook-form
- Vitest 4 + React Testing Library + jsdom (146 tests)
- pnpm 11 + ESLint 9 + Prettier
- Prerender estático (jsdom + renderToStaticMarkup)
- JSON-LD `@graph` (Person, WebSite, WebPage, CollectionPage, BreadcrumbList)
- CI/CD: GitHub Actions → Vercel

## Proyectos con case study

1. **Relevy**: SaaS de auditoría GEO/SEO (Next.js 15, React 19, PostgreSQL, Prisma)
2. **EchoLog**: SaaS multi-tenant de feedback (React, Express, Prisma, PostgreSQL)
3. **Nexus Talent**: Plataforma de reclutamiento con IA (React 19, Express, Groq)
4. **geo-seo-opencode**: Toolkit GEO open source para opencode (Bash, Python, CLI)
5. **Egg**: Diagnóstico de AI readiness (React, Vite)
6. **Context Bridge**: Búsqueda multi-fuente para developers (TypeScript, Express, Slack)
7. **Movie Management Dashboard**: Dashboard SPA con CRUD y Supabase Auth
8. **ChefcitoIA**: Generador de recetas con IA y validación Zod
9. **CineLab**: Búsqueda de películas con TMDB API

Además, `/open-source` documenta los tres pull requests mergeados en `vitest` y `@fastify/cookie`.

## Estructura relevante

- `src/pages/`: páginas (Home, About, Projects, Contact, Privacy, Open Source, NotFound)
- `src/components/`: componentes reutilizables (Header, Footer, SkipLink, ScrollProgress, ProjectCard...)
- `src/features/`: slices verticales (projects-list, projects-case-study)
- `src/locales/`: traducciones ES/EN (19 namespaces por idioma)
- `src/data/`: repositorios estáticos (projects.ts, about.ts, openSource.ts, route-meta.ts, schema.ts)
- `src/hooks/`: custom hooks (useLocalizedPath, useTheme, useThemeColor)
- `scripts/prerender.mjs`: motor de prerender estático (32 páginas)
- `scripts/generate-sitemap.mjs`: genera el sitemap desde `route-meta.ts`
- `public/`: assets, CVs, sitemap.xml, llms.txt, robots.txt

## Requisitos locales

- Node.js >= 22
- pnpm 11
- Git

## Instalación y desarrollo

```bash
git clone git@github.com:ezefernandezyf/my-portfolio.git
cd my-portfolio

pnpm install
pnpm run dev        # http://localhost:5173
```

## Scripts útiles

- `pnpm run dev`: Vite dev server
- `pnpm run build`: build de producción + prerender estático
- `pnpm run preview`: preview del build
- `pnpm test`: Vitest
- `pnpm run test:coverage`: tests con coverage
- `pnpm run lint`: ESLint
- `pnpm run format`: Prettier

## Testing

Tests con Vitest + React Testing Library + jsdom. El setup incluye un mock de react-i18next que resuelve las claves desde un mapa de recursos propio.

```bash
pnpm test
```

146 tests en 32 archivos. Umbrales de cobertura: 80 % líneas, 80 % funciones, 70 % branches, 80 % statements.

## Deploy (Vercel)

Conectado desde Vercel con GitHub integration. Configuración:

- Build command: `pnpm run build`
- Output directory: `dist`
- Framework: Vite

## Convenciones

- Conventional Commits: título en inglés, descripción en español
- Branches: `feat/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>`
- ODD por defecto (autorizar, explorar, trackear, implementar por tarea, cerrar); SDD con artefactos cuando se pide explícitamente
- WCAG 2.2 AA target, `prefers-reduced-motion` respetado
- TypeScript strict mode, nunca `any`
