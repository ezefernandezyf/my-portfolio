# my-portfolio — Agent Context

> Portfolio personal de Ezequiel Fernández, Full Stack Developer. Sitio estático desplegado en Vercel.

## Stack
- **Frontend**: React 19 + TypeScript 5.9 (strict) + Vite 7 + React Router 7
- **Styling**: Tailwind CSS 4 + DaisyUI 5 + OKLCH design tokens + CSS keyframes
- **Fonts**: Instrument Serif (display), Work Sans (body), JetBrains Mono (code)
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector (ES/EN, 14+ namespaces)
- **Validation**: Zod 4 + react-hook-form + @hookform/resolvers
- **Email**: @emailjs/browser (contact form)
- **Icons**: @heroicons/react
- **Testing**: Vitest 4 + React Testing Library + jsdom (80% coverage threshold)
- **Lint/Format**: ESLint 9 flat config + Prettier
- **Package Manager**: pnpm 11
- **Deploy**: Vercel (automatic from `main`)

## Architecture
- **Feature-based / Screaming Architecture** con DDD-lite:
  - `src/components/` — UI reutilizable (layouts, MetaTags, ThemeToggle, LanguageSwitcher, SocialButton)
  - `src/context/` — React contexts (ThemeContext/Provider)
  - `src/data/` — repositorios estáticos tipados (about.ts, projects.ts)
  - `src/entities/` — modelos de dominio (project types, repository)
  - `src/features/` — slices verticales (projects-list, projects-case-study con i18n propio)
  - `src/hooks/` — custom hooks (useTheme, useThemeColor)
  - `src/locales/` — JSON de traducción ES/EN por namespace
  - `src/pages/` — componentes de ruta (HomePage, AboutPage, ContactPage, ProjectsPage, PrivacyPage, NotFoundPage, + case studies)
  - `src/routes/` — AppRouter (BrowserRouter) + AppRoutes
  - `src/shared/` — seo (MetaTags), ui (ProjectCard, ProjectCarousel)
- **Sin backend** — portfolio 100% estático, sin API ni base de datos
- **Sin SSR** actualmente — el HTML servido es `<div id="root"></div>` (en proceso de arreglar con `geo-seo-enhancements`)

## Conventions
- Conventional Commits: `feat(scope):`, `fix(scope):`, `chore:`, `docs:`, `test(scope):` — **título en inglés, descripción en español**
- React 19: named imports, no `useMemo`/`useCallback` innecesarios, hooks en `src/hooks/`
- TypeScript: strict mode, nunca `any`, `interface` para objetos, `type` para uniones/alias
- Tailwind 4: tokens OKLCH en `src/index.css` (`@theme` + custom variants), DaisyUI 5 para componentes accesibles
- Testing: tests co-localizados (`src/**/tests/`), cobertura mínima 80%, `npm run test:coverage`
- i18n: cada namespace = un `{namespace}.json` en `src/locales/{lang}/`, keys en camelCase
- Accesibilidad: WCAG 2.2 AA target, `aria-labelledby` en secciones, `prefers-reduced-motion` respetado, focus-visible rings
- Performance: Lighthouse 95+ target, fonts preloaded con `preconnect`
- Never build after changes, never add "Co-Authored-By" to commits
- ESLint + Prettier: `pnpm run lint` / `pnpm run format`

## Git Workflow (STRICT)
1. **Feature branches**: toda tarea arranca en una rama nueva desde `develop`
2. **Branch naming**: `feat/short-name`, `fix/short-name`, `chore/short-name`
3. **Atomic commits**: un cambio lógico por commit, formato convencional
4. **Push + PR + Merge**: push a la rama, crear PR a `develop`, mergear — nunca commit directo a `develop` o `main`
5. **Clean working tree**: sin archivos sin trackear, sin WIP antes del PR
6. **Lint before push**: `pnpm run lint` debe pasar
7. **Tests before merge**: `pnpm test` debe pasar
8. **Deploy**: merge a `main` dispara deploy automático a Vercel

## How to Run
```bash
pnpm install              # instala dependencias
pnpm run dev              # dev server en localhost:5173
pnpm run build            # build de producción (tsc + vite build)
pnpm run preview          # preview del build
pnpm run test             # correr tests
pnpm run test:coverage    # tests con coverage
pnpm run lint             # ESLint check
pnpm run lint:fix         # ESLint auto-fix
pnpm run format           # Prettier write
pnpm run check            # lint + build + test:coverage (todo junto)
```

## Key Files
- `index.html` — HTML entry point, meta tags base, font preloads, `<div id="root">`
- `vite.config.ts` — Vite configure (React + Tailwind plugins)
- `vercel.json` — Vercel deploy config (SPA rewrites)
- `src/main.tsx` — React entry, StrictMode + ThemeProvider + AppRouter
- `src/App.tsx` — top-level app shell
- `src/i18n.ts` — i18next configuration (namespaces, LanguageDetector)
- `src/index.css` — Tailwind `@theme` tokens, base styles, animation keyframes, utility classes
- `src/routes/AppRouter.tsx` — BrowserRouter wrapper
- `src/routes/AppRoutes.tsx` — route definitions (/, /home, /about, /projects, /projects/:id, /privacy, /contact)
- `src/data/about.ts` — tipado completo (AboutData interface, categorías, skills, proyectos, educación)
- `src/data/projects.ts` — array de proyectos (ids, tech stacks, repos, demos, imágenes)
- `src/components/MetaTags/MetaTags.tsx` — inyección client-side de meta tags (title, description, OG, Twitter, canonical)
- `src/components/ThemeToggle/ThemeToggle.tsx` — toggle dark/light con persistencia en localStorage
- `src/components/LanguageSwitcher/LanguageSwitcher.tsx` — toggle ES/EN con i18next
- `src/components/layouts/Header.tsx` — header responsive con nav + LanguageSwitcher + ThemeToggle
- `src/components/layouts/Footer.tsx` — footer con links, social icons, copyright
- `src/context/ThemeContext.ts` — definición del ThemeContext
- `src/context/ThemeProvider.tsx` — provider con lógica de tema (dark default, localStorage)
- `src/hooks/useTheme.ts` — hook para consumir ThemeContext
- `src/features/projects-case-study/` — feature de case studies (template dinámico, i18n por proyecto)
- `src/shared/seo/MetaTags.tsx` — versión compartida del componente MetaTags
- `public/robots.txt` — abierto a todos los crawlers
- `public/sitemap.xml` — 4 URLs principales
- `.atl/skill-registry.md` — registro de skills del proyecto
- `skills/` — skills locales (react-19, tailwind-4, typescript, zod-4, portfolio-personality)

## Skills
- `react-19` — React 19 APIs y patterns
- `tailwind-4` — Tailwind 4 con OKLCH tokens y custom variants
- `typescript` — strict mode, generics, type narrowing
- `zod-4` — schemas de validación
- `portfolio-personality` — identidad visual, micro-interacciones, anti-generic design

Source of truth: `.atl/skill-registry.md`. Skills globales en `~/.config/opencode/skills/`.

## Roadmap

### Fase 0 — Foundations & Setup ✅
Vitest, CI/CD (GitHub Actions), Theme (dark-first), i18n (ES/EN con 14 namespaces), Tailwind 4 + DaisyUI 5.

### Fase 1 — Global Layout & Navigation Rebuild ✅
Header, Footer, LanguageSwitcher, ThemeToggle reconstruidos desde cero.

### Fase 2 — Home Page ✅
Hero section (fade-in animation, stats, CTAs), stack grid, featured project carousel, contact CTA.

### Fase 3 — Projects Directory ✅
Bento grid con búsqueda y filtros por tecnología, links a repos y demos.

### Fase 4 — Case Studies Template ✅
`CaseStudyTemplate` dinámico único que renderiza cualquier case study desde `src/features/projects-case-study/`.

### Fase 5 — About Me Page ✅
Hero, stack cards, categorías de skills, habilidades blandas, proyectos destacados, educación, disponibilidad.

### Fase 6 — Privacy Page ✅
Política de privacidad en formato card, sobria y consistente.

### Fase 7 — Contact & Final Polish ✅
Formulario de contacto con Zod validation + react-hook-form, layout lado a lado, email via EmailJS.

### Fase 8 — Full Stack Identity + EchoLog Case Study ✅
Identidad actualizada a Full Stack Developer (home, about, meta tags, footer). EchoLog como proyecto principal con case study completo (ES/EN, screenshots, stack detallado).

### Fase 9 — Design Polish ✅
Stats en hero de homepage, link "Ver todos los proyectos" en Recent Work, redes sociales en footer, ajustes visuales.

### Fase 10 — GEO & SEO Enhancements 🔲 (en `feat/geo-seo-enhancements`)
> SDD completo. GEO score actual: 20/100 (Critical). Target: 60+/100.
- [ ] **Slice A — Prerender + Infra**: static prerender de todas las rutas, Vercel security/cache headers, sitemap mejorado
- [ ] **Slice B — AI Visibility**: schema JSON-LD, meta tags únicos por ruta en HTML, llms.txt, adaptar MetaTags
- [ ] **Slice C — Content & Polish**: expansión de contenido a 2,000+ palabras, AGENTS.md rewrite, auditoría de diseño
