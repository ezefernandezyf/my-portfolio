# My Portfolio

Portfolio personal de Ezequiel Fernández — Full Stack Developer. Sitio estático con prerender, desplegado en Vercel.

## Demo

- https://ezefernandez.com

## Resumen

Portfolio construido con React 19 + Vite 7 + TypeScript strict. Incluye páginas principales (Home, About, Projects, Contact, Privacy), 6 proyectos con case studies, internacionalización completa (ES/EN con 16+ namespaces), prerender estático (24 páginas HTML con JSON-LD + hreflang), light/dark mode con personalidad visual diferenciada, y WCAG 2.2 AA. Tests con Vitest 4 + React Testing Library (cobertura 80%+).

## Tecnologías

- React 19 + TypeScript 5.9 (strict) + Vite 7
- Tailwind CSS 4 + DaisyUI 5 + OKLCH design tokens
- React Router 7 + i18next (ES/EN, lazy-loaded namespaces)
- Zod 4 + react-hook-form
- Vitest 4 + React Testing Library + jsdom (87 tests)
- pnpm 11 + ESLint 9 + Prettier
- Prerender estático (jsdom + renderToStaticMarkup)
- JSON-LD @graph (Person + WebSite + WebPage + BreadcrumbList)
- CI/CD: GitHub Actions → Vercel

## Proyectos destacados

1. **EchoLog** — SaaS multi-tenant de feedback (React, Node.js, Express, Prisma, PostgreSQL)
2. **Nexus Talent** — Plataforma de reclutamiento con IA (React, Supabase, Tailwind 4)
3. **geo-seo-opencode** — Toolkit GEO open source para opencode (Bash, Python, CLI, cross-platform)
4. **Movie Management Dashboard** — Dashboard SPA con CRUD y Supabase Auth
5. **ChefcitoIA** — Generador de recetas con IA y validación Zod
6. **CineLab** — Movie search app con TMDB API

## Roadmap

| Fase | Estado |
|------|--------|
| 0-9 — Fundaciones, Layout, Páginas, Case Studies, Polish | ✅ |
| 10 — GEO & SEO Enhancements (prerender, JSON-LD, sitemap) | ✅ |
| 11 — Diseño: Personalidad Visual (light mode, skip-to-content, scroll progress) | ✅ |
| 12 — SEO/GEO Fino + Routing + Contenido (meta, breadcrumbs, CV dinámico) | ✅ |
| 13 — Pulido Final | 🔲 |

## Estructura relevante

- `src/pages/` — páginas (Home, About, Projects, Contact, Privacy, NotFound)
- `src/components/` — componentes reutilizables (Header, Footer, SkipLink, ScrollProgress, ProjectCard...)
- `src/features/` — slices verticales (projects-list, projects-case-study)
- `src/locales/` — traducciones ES/EN (16+ namespaces)
- `src/data/` — repositorios estáticos (projects.ts, about.ts, route-meta.ts, schema.ts)
- `src/hooks/` — custom hooks (useLocalizedPath, useTheme)
- `scripts/prerender.mjs` — motor de prerender estático (22 páginas)
- `public/` — assets, CVs, sitemap.xml, llms.txt, robots.txt

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

- `pnpm run dev` — Vite dev server
- `pnpm run build` — build de producción + prerender estático
- `pnpm run preview` — preview del build
- `pnpm test` — Vitest (87 tests)
- `pnpm test:coverage` — tests con coverage
- `pnpm run lint` — ESLint
- `pnpm run format` — Prettier

## Testing

Tests con Vitest + React Testing Library + jsdom. Setup incluye mock de react-i18next. 87 tests en 29 archivos.

```bash
pnpm test
```

## Deploy (Vercel)

Conectado desde Vercel con GitHub integration. Configuración:

- Build command: `pnpm run build`
- Output directory: `dist`
- Framework: Vite

## Convenciones

- Conventional Commits: título en inglés, descripción en español
- Branches: `feat/<name>`, `fix/<name>`, `chore/<name>`
- SDD para cambios sustanciales: propose → spec → design → tasks → apply → verify
- WCAG 2.2 AA target, `prefers-reduced-motion` respetado
- TypeScript strict mode, nunca `any`
