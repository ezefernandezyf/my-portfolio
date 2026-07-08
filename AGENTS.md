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

### Fase 10 — GEO & SEO Enhancements ✅
> SDD completo. GEO score: 20/100 → 54/100 (+34 puntos).
- [x] **Slice A — Prerender + Infra**: static prerender 22 páginas, Vercel security/cache headers, hreflang
- [x] **Slice B — AI Visibility**: schema JSON-LD @graph, meta tags únicos por ruta, llms.txt, sitemap 22 URLs, MetaTags adapt
- [x] **Slice C — Content & Polish**: fix CSS tokens huérfanos, AGENTS.md rewrite, favicons regenerados
- [x] Migración npm → pnpm 11, CI Node 22
- [x] Redirect raíz `/` → `/home` (fix post-audit)

### Fase 11 — Diseño: Personalidad Visual ✅ (en `feat/design-audit-improvements`)
> Auditoría de diseño completada (score: 72/100). Mejoras priorizadas según portfolio-personality skill.

Prioridad (top 3):
- [x] **Stagger animation en grilla de proyectos** — cards aparecen secuencialmente al scrollear (50ms delay)
- [x] **Skip-to-content link** — primer elemento focusable, requerido WCAG 2.2 AA
- [x] **Dark/light mood diferenciado** — light mode con personalidad propia, no solo colores invertidos

Segunda tanda:
- [x] Hover morphing mejorado en cards (shadow + translateY) — removido asimétrico por preferencia
- [x] Unificar escala de H2
- [x] Scroll progress en case studies
- [x] Foto de perfil más arriba en AboutPage (ya estaba ok)
- [x] Legibilidad: text-muted y labels con contraste WCAG AA en ambos modos

### Fase 12 — SEO/GEO Fino + Certificación + Routing ✅ (en `feat/fase12-seo-geo-polish`)
> SDD completo. 4 PRs. GEO score pendiente de auditoría final.

- [x] **Títulos descriptivos** — cada página con title único, keywords, descriptions en `route-meta.ts`
- [x] **Meta descriptions con keywords reales** — descripciones SEO para las 12 rutas
- [x] **Expandir contenido** — secciones nuevas en /projects y /contact (200+ palabras)
- [x] **BreadcrumbList schema** — structured data de navegación en JSON-LD @graph
- [x] **Alt text en imágenes del prerender** — JSDOM post-render injection en `scripts/prerender.mjs`
- [x] **Certificación AI Skills Fest 2026 (Microsoft)** — 4ª card en Educación con badge Credly
- [x] **geo-seo-opencode case study** — proyecto en posición 3, CLI toolkit open source, sin demo
- [x] **CV dinámico según idioma** — ES/EN PDF según `i18n.language`
- [x] **Fix routing** — URLs mantienen `/en/` al navegar en inglés, hook `useLocalizedPath`
- [x] **Education status** — activo (en curso) vs completado con chip-completed
- [ ] **GEO audit final** — correr auditoría completa post-cambios, medir score final

### Fase 13 — Pulido Final 🔲 (absorbida en Fase 14)

### Fase 14 — Auditoría 360° & Fixes 🚧 (en `feat/fase14-audit-fixes`)
> Auditoría completa con impeccable + design-taste-frontend + redesign-existing-projects. Score combinado: **77/100** (Visual: 77, Contenido: 75, Técnico: 80). PRODUCT.md + DESIGN.md creados.

#### Fase 14a — 🔴 Críticos: i18n + Schema + Infra
- [ ] **Fix LanguageSwitcher** — clases CSS inexistentes (`bg-surface-container-high`, `font-space-grotesk`, `text-text/50`). El componente está invisible. Reemplazar con tokens del proyecto (`bg-surface-elevated`, `font-body`, `text-text-muted`). Eliminar doble pill (container propio + `control-cluster` padre).
- [ ] **Fix schema JSON-LD** — `schema.ts:58-59` inyecta keys de i18next (`"home:meta.title"`) como texto en vez del valor resuelto. Usar `route[lang].title` / `route[lang].description`.
- [ ] **Agregar `meta.description` a 6 case studies** — `descI18nKey` en `route-meta.ts` apunta a `meta.title`. Crear key `meta.description` en cada namespace: `cinelabcasestudy`, `moviedashboardcasestudy`, `chefcitoiacasestudy`, `nexustalentcasestudy`, `echologcasestudy`, `geoseoopencodecasestudy`.
- [ ] **Traducir strings en inglés en locales español** — `labels.featured: "Featured"` → `"Destacado"`, `deepDive.heading: "Technical Deep Dive"` → `"Profundización técnica"`, `carousel.alt` en inglés, `noPreview: "Sin preview disponible"` → `"Sin vista previa"`. Archivos: `cinelabcasestudy`, `moviedashboardcasestudy`, `echologcasestudy`, `nexustalentcasestudy`, `chefcitoiacasestudy`.
- [ ] **Fix doble `<main>` anidado** — `HomePage.tsx`, `ContactPage.tsx`, `AboutPage.tsx` definen `<main role="main">` dentro del `<main id="main-content">` de `MainLayout`. Cambiar a `<div>` o `<section>`.

#### Fase 14b — 🟡 Accesibilidad & UX Writing
- [ ] **Agregar `text-wrap: balance` a h1-h3** — requerido por DESIGN.md, no implementado en ningún heading.
- [ ] **Fix contraste `text-muted` en light mode** — `#78716c` sobre `#faf7f0` = ~4.1:1 (no alcanza 4.5:1 WCAG AA para body text). Subir a `#6b5e58` o similar.
- [ ] **Devolver foco al botón hamburguesa al cerrar drawer** — guardar ref al trigger y llamar `.focus()` en `close()`.
- [ ] **i18n en tooltips y aria-labels** — `ThemeToggle` (`"Tema: dark. Click para cambiar a light"`), `LanguageSwitcher` (`"Cambiar a español"`), `ProjectCarousel` (`"Imagen X de Y"`) — todo hardcodeado en español.
- [ ] **i18n en labels hardcodeados** — `CaseStudyTemplate`: `"Case Study"`, `"Featured"`, `"The Engineering Stack"`. `PrivacyPage`: `"Privacy & Trust"`. `ProjectsListPage`: `"projects"`, `"visible"`.
- [ ] **Externalizar descripciones de educación a i18n** — `AboutPage.tsx:296-303` tiene 4 párrafos hardcodeados en español.
- [ ] **Fix `DEFAULT_DESC` monolingüe** — `MetaTags.tsx:15` fallback solo en español. Hacerlo consciente del idioma.
- [ ] **Fix `useThemeColor`** — lee `--color-bg` que no existe. Debe leer `--color-bg-primary`.
- [ ] **Empty state en búsqueda de proyectos** — cuando el filtro no devuelve resultados, mostrar mensaje en vez de grilla vacía.

#### Fase 14c — 🟡 Consistencia Visual
- [ ] **Unificar altura de botones primarios** — HomePage usa `h-14` (56px, correcto según DESIGN.md). AboutPage y ContactPage usan `px-6 py-3` (~42-46px). Unificar en 56px.
- [ ] **Unificar escalas de headings** — HomePage `text-8xl`, AboutPage `text-[2.75rem]`, CaseStudy `text-[3rem]`. Usar tokens consistentes.
- [ ] **Fix gradiente radial hardcodeado** — `HomePage.tsx:129` usa `rgba(245,158,11,0.12)` (ámbar dark mode). En light mode debería usar `var(--color-accent)`. Mismo problema en `ProjectsListPage.tsx:75`.
- [ ] **Fix alineación de ProjectCard** — `min-h-32 md:min-h-36` no alinea contenido verticalmente entre cards del grid. Usar `flex flex-col` con imagen en `mt-auto`.
- [ ] **Agregar espaciado final en CaseStudyTemplate** — `pb-0` deja el footer pegado al último section.
- [ ] **Evaluar light mode parchment** — `#faf7f0` cae en la banda "warm cream AI default". Si bien está justificado en DESIGN.md, considerar alternativas (off-white con chroma hacia el ámbar, o true neutral).
- [ ] **Fix `eslint-plugin-prettier` no integrado** — la dependencia existe pero no se usa en `eslint.config.js`. Integrar o remover.

#### Fase 14d — 🔵 Pulido Técnico
- [ ] **Fix `.env.example`** — referencia variables de Formspree (`VITE_CONTACT_FORM_ENDPOINT`) que ya no se usan. Actualizar a variables de EmailJS.
- [ ] **Migrar jpgs a webp** — Movie Dashboard, ChefcitoIA, CineLab usan `.jpg`. Convertir a `.webp`.
- [ ] **Agregar `width`/`height` explícitos en imágenes del carousel** — para prevenir CLS.
- [ ] **Fix `check` script** — usa `npm run` en vez de `pnpm run`.
- [ ] **Auto-generar sitemap en build** — `sitemap.xml` tiene fechas estáticas. Ejecutar `generate-sitemap.mjs` como pre-build hook.
- [ ] **Deduplicar route-meta ↔ prerender** — `prerender.mjs` duplica manualmente las definiciones de ruta. Importar de `route-meta.ts` como hace `generate-sitemap.mjs`.
- [ ] **Fix `eslint-plugin-prettier` y `@vitest/coverage-v8`** — dependencias no usadas. Remover o integrar.
- [ ] **Limpiar TODO de `CurrentlySection`** — si no se va a migrar a framer-motion, remover el comentario.

#### Fase 14e — ⚪ Opcionales / Bajo Impacto
- [ ] **ScrollProgress con `useRef` en vez de `useState`** — evita re-renders en cada frame.
- [ ] **Mouse-follow gradient con `useMotionValue`** — actualmente usa `useState` + `onPointerMove`, causando re-renders.
- [ ] **Pausar carousel autoplay en tab inactiva** — usar `document.hidden`.
- [ ] **Alt text más descriptivo en imágenes del carousel** — `"Vista previa de EchoLog"` → describir contenido real.
- [ ] **Meta descriptions de NotFound más largas** — ES: 90 chars, EN: ~100 chars. Mínimo recomendado 120.
- [ ] **Agregar `fetchpriority="high"` en LCP candidates** — foto de perfil en AboutPage, hero images.
- [ ] **Agregar `object-src 'none'` explícito en CSP**.
- [ ] **Agregar `pnpm audit` en CI**.

