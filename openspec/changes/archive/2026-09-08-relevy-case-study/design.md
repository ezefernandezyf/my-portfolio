# Design: Relevy Case Study (geo-saas)

## Technical Approach

Add a bilingual (ES/EN) Relevy case study as the **featured, position-0** project by following the proven egg-demo integration pattern (12 files). No architectural change: content is data + i18n; the shared `CaseStudyTemplate` and `ProjectCaseStudyPage` are untouched. Content source of truth is the Relevy ficha at `/home/ezeyf/Escritorio/geo-saas-case-study.md` (outside the repo — see Risks).

## Architecture Decisions

| Decision | Options (tradeoff) | Choice & rationale |
|---|---|---|
| Template reuse vs new | Reuse `CaseStudyTemplate` (zero code) vs fork (drift, maintenance) | **Reuse** — Relevy is a standard list+code case study; no new layout needed |
| Featured via array position vs filter | Position 0 + `slice(0,2)` (implicit) vs explicit `featured` filter (would break `getProjects()` consumers) | **Position 0** — `HomePage`/`ProjectsListPage` rely on order (`slice(0,2)`, `slice(0, visibleProjects)`); `featured: true` is already set on 7 of 8 entries and only drives the "Destacado" badge |
| Route-meta title shape | Ficha comma form `X \| Ezequiel Fernández, Full Stack Developer` vs `\|`-descriptor form | **Comma form, verbatim from ficha §13** — matches the current source convention (all case-study titles were normalized to `X \| Ezequiel Fernández, Full Stack Developer` in `2a20455`) |
| `meta.*` i18n keys | Add `meta` object vs omit | **Omit** — `titleI18nKey`/`descI18nKey` are dead pointers in all 8 existing namespaces (only the inline `es`/`en` objects are consumed); adding `meta` would diverge from egg-demo |
| Ficha voseo in ES short | Keep verbatim vs neutralize | **Neutralize** — REL-8 forbids voseo; replace `ingresá`→`ingresa`, `obtené`→`obtén` |

## Data Flow

```
projects.ts (geo-saas entry) ──► projectRepository ──► HomePage slice(0,2) / ProjectsListPage slice(0,9)
geosaascasestudy.{es,en}.json ──► namespaces.ts ──► i18next ──► ProjectCaseStudyPage ──► CaseStudyTemplate
buildCaseStudyContent(stackByProject['geo-saas'], t) ──► stackSections + deep-dive sections
route-meta.ts['projects/geo-saas'] ──► MetaTags + schema.ts + prerender.mjs (derived, untouched)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/projects.ts` | Modify | Insert `geo-saas` at index 0, reorder rest |
| `src/locales/es/geosaascasestudy.json` | Create | ES namespace |
| `src/locales/en/geosaascasestudy.json` | Create | EN namespace |
| `src/locales/es/projects.json` | Modify | Add `geo-saas.name`/`.short` |
| `src/locales/en/projects.json` | Modify | Add `geo-saas.name`/`.short` |
| `src/data/route-meta.ts` | Modify | Add `projects/geo-saas` entry + `ROUTE_KEYS` append |
| `src/routes/AppRoutes.tsx` | Modify | 2 routes (ES + EN) |
| `src/features/projects-case-study/i18n/namespaces.ts` | Modify | Register `geosaascasestudy` |
| `src/features/projects-case-study/lib/buildCaseStudyContent.ts` | Modify | `stackByProject['geo-saas']` |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modify | `INITIAL_VISIBLE_PROJECTS` 8→9 |
| `public/projects/geo-saas/geo-saas-{1..4}.webp` | Create | 4 screenshots 16:9 |
| `public/sitemap.xml` | Modify | Regenerate (script) |
| `public/llms.txt` | Modify | Add project bullet + 2 site-structure rows |
| `src/features/projects-case-study/tests/i18nParity.test.ts` | Modify | Add `geosaascasestudy` |
| `src/data/tests/__snapshots__/route-meta.test.ts.snap` | Modify | Regenerate (⚠ large diff, see Risks) |
| `src/pages/tests/HomePage.test.tsx` | Modify | Featured = Relevy + EchoLog |
| `src/pages/tests/ProjectsPage.test.tsx` | Modify | Counts 8→9 / demo 6→7 |

## Detailed Per-File Specification

### 1. `src/data/projects.ts` — insert at index 0

```ts
{
  id: 'geo-saas',
  nameKey: 'geo-saas.name',
  shortKey: 'geo-saas.short',
  repo: 'https://github.com/ezefernandezyf/relevy',
  demo: 'https://relevy.app',
  images: [
    '/projects/geo-saas/geo-saas-1.webp',
    '/projects/geo-saas/geo-saas-2.webp',
    '/projects/geo-saas/geo-saas-3.webp',
    '/projects/geo-saas/geo-saas-4.webp',
  ],
  tech: ['Next.js 15', 'React 19', 'TypeScript 5', 'Tailwind CSS 4', 'Prisma 7', 'PostgreSQL (Supabase)', 'NextAuth.js v5', 'Zod 4', 'Vitest 4', 'React Testing Library', 'Playwright', 'Sentry', 'cheerio', 'lucide-react', 'Vercel', 'GitHub Actions'],
  year: 2026,
  featured: true,
},
```

Final order (index): `geo-saas(0), echolog(1), nexus-talent(2), geo-seo-opencode(3), egg-demo(4), context-bridge(5), movie-dashboard(6), chefcitoia(7), cinelab(8)`.

### 2. `src/locales/{es,en}/projects.json` — add `geo-saas` block

- ES: `"name": "Relevy"`, `"short": "Auditoría GEO y SEO para buscadores con IA: ingresa una URL y obtén un GEO Score 0-100 con reporte de citabilidad, E-E-A-T, schema, plataforma y marca."`
- EN: `"name": "Relevy"`, `"short": "GEO & SEO auditing for AI search: drop in a URL and get a 0-100 GEO Score with a full citability, E-E-A-T, schema, platform and brand report."`

### 3. `src/locales/es/geosaascasestudy.json` — full key structure

```json
{
  "header": {
    "title": "Relevy",
    "short": "Auditoría GEO y SEO para buscadores con IA: ingresa una URL y obtén un GEO Score 0-100 con reporte de citabilidad, E-E-A-T, schema, plataforma y marca.",
    "repoAria": "Repositorio de Relevy",
    "demoAria": "Demo de Relevy",
    "backToProjects": "← Volver a Proyectos"
  },
  "stack": {
    "heading": "Stack & Tecnologías",
    "sections": {
      "frontend": "Frontend",
      "backend": "Backend & Data",
      "auth": "Auth & Validation",
      "testing": "Testing & Quality",
      "infra": "Infra & Observability"
    }
  },
  "summary": { "heading": "Resumen", "text": "<ficha §4 summary.text ES>" },
  "problem": { "heading": "El problema", "text": "<ficha §5 problem.text ES>" },
  "solution": { "heading": "La solución", "list": ["<ficha §6 items 1..6 ES>"] },
  "architecture": { "heading": "Arquitectura & decisiones", "list": ["<ficha §7 items 1..6 ES>"] },
  "implementation": {
    "heading": "Implementación destacada",
    "hookTitle": "GEO Score determinista: composición, exclusión y rebalanceo de pesos",
    "hookCode": "<ficha §8 hookCode verbatim (TS snippet, \\n-escaped)>",
    "hookDescription": "<ficha §8 hookDescription ES>"
  },
  "accessibility": { "heading": "Accesibilidad", "list": ["<ficha §9 items 1..5 ES>"] },
  "performance": { "heading": "Métricas & resultados", "list": ["<ficha §10 items 1..5 ES>"] },
  "challenges": { "heading": "Bugs reales & debugging", "list": ["<ficha §11 items 1..4 ES>"] },
  "improvements": { "heading": "Qué se podría mejorar", "list": ["<ficha §12 items 1..4 ES>"] },
  "deepDive": { "heading": "Profundización técnica" },
  "carousel": { "alt": "Vista previa de Relevy" },
  "labels": { "year": "Año:", "featured": "Destacado" },
  "notFound": "Proyecto no encontrado",
  "noPreview": "Sin vista previa"
}
```

### 4. `src/locales/en/geosaascasestudy.json` — full key structure

```json
{
  "header": {
    "title": "Relevy",
    "short": "GEO & SEO auditing for AI search: drop in a URL and get a 0-100 GEO Score with a full citability, E-E-A-T, schema, platform and brand report.",
    "repoAria": "Relevy repository",
    "demoAria": "Relevy live demo",
    "backToProjects": "← Back to Projects"
  },
  "stack": {
    "heading": "Stack & Technologies",
    "sections": {
      "frontend": "Frontend",
      "backend": "Backend & Data",
      "auth": "Auth & Validation",
      "testing": "Testing & Quality",
      "infra": "Infra & Observability"
    }
  },
  "summary": { "heading": "Summary", "text": "<ficha §4 summary.text EN>" },
  "problem": { "heading": "The problem", "text": "<ficha §5 problem.text EN>" },
  "solution": { "heading": "The solution", "list": ["<ficha §6 items 1..6 EN>"] },
  "architecture": { "heading": "Architecture & decisions", "list": ["<ficha §7 items 1..6 EN>"] },
  "implementation": {
    "heading": "Highlight implementation",
    "hookTitle": "Deterministic GEO Score: composition, exclusion and weight rebalancing",
    "hookCode": "<ficha §8 hookCode verbatim (TS snippet, \\n-escaped)>",
    "hookDescription": "<ficha §8 hookDescription EN>"
  },
  "accessibility": { "heading": "Accessibility", "list": ["<ficha §9 items 1..5 EN>"] },
  "performance": { "heading": "Metrics & results", "list": ["<ficha §10 items 1..5 EN>"] },
  "challenges": { "heading": "Real bugs & debugging", "list": ["<ficha §11 items 1..4 EN>"] },
  "improvements": { "heading": "What could be improved", "list": ["<ficha §12 items 1..4 EN>"] },
  "deepDive": { "heading": "Technical deep dive" },
  "carousel": { "alt": "Relevy preview" },
  "labels": { "year": "Year:", "featured": "Featured" },
  "notFound": "Project not found",
  "noPreview": "No preview available"
}
```

**Notes**: `header.title`/`header.short` and `summary.*` are present for structural parity with egg-demo but NOT rendered by the template (page reads `projects.json` `name`/`short`; no summary section). `hookCode` must be embedded as a single JSON string with `\n` escapes — copy verbatim from ficha §8 (do not retype/alter the snippet).

### 5. `src/data/route-meta.ts` — add entry + ROUTE_KEYS

```ts
'projects/geo-saas': {
  pathname: '/projects/geo-saas',
  titleI18nKey: 'geosaascasestudy:meta.title',
  descI18nKey: 'geosaascasestudy:meta.description',
  es: {
    title: 'Relevy | Ezequiel Fernández, Full Stack Developer',
    description: 'Case study de Relevy: un SaaS de auditoría GEO y SEO con Next.js, TypeScript y Prisma que mide tu visibilidad en buscadores con IA.',
    keywords: ['auditoría GEO', 'SEO para IA', 'visibilidad en buscadores con IA', 'Next.js case study', 'TypeScript', 'Prisma', 'micro-SaaS', 'full stack developer'],
  },
  en: {
    title: 'Relevy | Ezequiel Fernández, Full Stack Developer',
    description: 'Relevy case study: a GEO & SEO auditing SaaS built with Next.js, TypeScript and Prisma that measures AI search visibility across ChatGPT, Claude, Perplexity and Gemini.',
    keywords: ['GEO audit', 'AI search visibility', 'generative engine optimization', 'Next.js case study', 'TypeScript', 'Prisma', 'SaaS', 'full stack portfolio'],
  },
  ogImage: '/og-image.png',
  schemaType: 'WebPage',
  priority: 0.7,
  changefreq: 'monthly',
},
```

Append `'projects/geo-saas'` to `ROUTE_KEYS` **after** `'projects/egg-demo'` (i.e., last case-study key). Title uniqueness verified against all existing source titles — no collision; contains author name; no ` , ` typo.

### 6. `src/routes/AppRoutes.tsx` — 2 routes

- ES group: `<Route path="/projects/geo-saas" element={<ProjectCaseStudyPage projectId="geo-saas" namespace="geosaascasestudy" />} />`
- EN group: `<Route path="/en/projects/geo-saas" element={<ProjectCaseStudyPage projectId="geo-saas" namespace="geosaascasestudy" />} />`

### 7. `src/features/projects-case-study/i18n/namespaces.ts`

Import `enGeoSaaS`/`esGeoSaaS` from `../../../locales/{en,es}/geosaascasestudy.json`; add `geosaascasestudy: enGeoSaaS` to `caseStudyResources.en` and `geosaascasestudy: esGeoSaaS` to `.es`; append `'geosaascasestudy'` to `caseStudyNamespaces`.

### 8. `src/features/projects-case-study/lib/buildCaseStudyContent.ts` — `stackByProject['geo-saas']`

```ts
'geo-saas': [
  { titleKey: 'stack.sections.frontend', defaultTitle: 'Frontend', items: ['Next.js 15 (App Router, RSC + Server Actions)', 'React 19', 'TypeScript strict', 'Tailwind CSS 4', 'lucide-react'] },
  { titleKey: 'stack.sections.backend', defaultTitle: 'Backend & Data', items: ['Prisma 7 (@prisma/adapter-pg)', 'PostgreSQL (Supabase)', 'cheerio (HTML parsing)', 'Node.js 20+'] },
  { titleKey: 'stack.sections.auth', defaultTitle: 'Auth & Validation', items: ['NextAuth.js v5 (Auth.js, GitHub OAuth)', 'Zod 4 (shared contracts)'] },
  { titleKey: 'stack.sections.testing', defaultTitle: 'Testing & Quality', items: ['Vitest 4', 'React Testing Library + jest-dom', 'Playwright + @axe-core/playwright', 'Husky + lint-staged'] },
  { titleKey: 'stack.sections.infra', defaultTitle: 'Infra & Observability', items: ['Vercel (Turbopack)', 'GitHub Actions (CI)', 'Sentry (@sentry/nextjs, DSN-guarded)'] },
],
```

**Risk-2 resolution**: `auth` is the only genuinely new `stack.sections.*` key (backend/testing/infra/frontend already exist in egg-demo's namespace, but the new namespace is self-contained so ALL five keys must be written into both JSON files, which §3–§4 do).

### 9. `src/features/projects/list/page/ProjectsListPage.tsx`

`const INITIAL_VISIBLE_PROJECTS = 9;` (was `8`). `LOAD_MORE_STEP` unchanged (`3`).

### 10. Screenshots — `public/projects/geo-saas/`

4 images, `.webp`, 16:9, 1920×1080, named `geo-saas-1.webp` … `geo-saas-4.webp`:
1. `geo-saas-1.webp` — landing hero: URL input + ScoreHero with real GEO Score (71) + severity bands
2. `geo-saas-2.webp` — live report: composite score + 6-dimension breakdown + severity bars + prioritized findings
3. `geo-saas-3.webp` — dashboard (session): audit history with score trend + share links (or persisted multi-page audit detail)
4. `geo-saas-4.webp` — mobile: navigation drawer open (the HYD-1 SSR bug component) + responsive report at 360px

### 11. `public/sitemap.xml` + `public/llms.txt`

- Regenerate sitemap: `node --experimental-strip-types scripts/generate-sitemap.mjs` (adds `/projects/geo-saas` + `/en/projects/geo-saas` with hreflang).
- `llms.txt`: add project bullet `- [Relevy](https://github.com/ezefernandezyf/relevy) — GEO/SEO auditing micro-SaaS…` (one line, from ficha summary) under `## Projects`, AND two rows in the Site Structure table: `/projects/geo-saas` / `/en/projects/geo-saas` → "Relevy case study".

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Unit | i18n parity | `i18nParity.test.ts` — add `{ name: 'geosaascasestudy', en: enGeoSaaS, es: esGeoSaaS }` + 2 imports |
| Unit | route-meta invariants | `route-meta.test.ts` auto-covers new key via `ROUTE_KEYS`; no source edit needed |
| Snapshot | route-meta | `pnpm test -- -u` — see Risks (large diff) |
| Component | HomePage | Update featured assertions: headings "Relevy"+"EchoLog"; repoLinks `[relevy, echolog]`; demoLinks `[relevy.app, echolog-web.vercel.app]`; caseStudyLinks `[/projects/geo-saas, /projects/echolog]` |
| Component | ProjectsPage | `getAllByRole('heading',{level:3})` → 9; repo links → 9; demo links → 7; case-study links → 9 |
| Integration | route rendering | Optional: add `geo-saas` case to `AppRoutes.caseStudyMigration.test.tsx` (asserts heading "Relevy") — not required |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Routes are declarative client-side `<Route>` entries with a hardcoded `projectId` literal (no user-controlled path params, no open redirect, no command execution).

## Migration / Rollout

No migration required. Additive change (new files + array edits + one constant). Rollback = revert the feature branch / merge commit.

## Risks

| Risk | Mitigation |
|---|---|
| **Snapshot drift**: `route-meta.test.ts.snap` is STALE vs `route-meta.ts` (source refactored in `2a20455` to comma-form titles; snapshot never regenerated — see cinelab/echolog/nexus-talent/geo-seo-opencode/movie-dashboard/projects/privacy diffs). Regenerating folds in ~10 unrelated title changes. | Tasks MUST run `pnpm test -- -u`, then REVIEW the full snapshot diff and confirm the only *intentional* additions are `projects/geo-saas` + the pre-existing drift. Flag in the PR description; this is the single largest diff source and may exceed the 400-line budget with JSON content. |
| **Ficha outside repo** (`/home/ezeyf/Escritorio/geo-saas-case-study.md`); proposal references `docs/geo-saas-case-study.md` which does not exist. | Design embeds all short strings + precise §references. Recommend committing the ficha to `docs/` for provenance (open question). |
| ES short voseo (`ingresá`/`obtené`) violates REL-8. | Neutralized in §2/§3 (design decision). |
| `titleI18nKey`/`descI18nKey` reference `geosaascasestudy:meta.*` keys not in the namespace. | Matches existing pattern (all 8 case studies); inline `es`/`en` objects are the resolved source. No action. |
| Test count/href breakage from reorder. | §Testing Strategy updates HomePage + ProjectsPage tests. |
| `ProjectsPage.coverage.test.tsx` may also assert counts. | Tasks: grep for `8`/`toHaveLength` in `src/pages/tests/ProjectsPage*` and update any count assertions. |

## Open Questions

- [ ] Commit the ficha to `docs/geo-saas-case-study.md` in this PR for provenance, or keep it external? (proposal references it but it's not in the affected-areas table)
- [ ] Are the 4 screenshots already generated, or do they need capturing from `relevy.app` before apply? (blocker if not available — carousel 404s otherwise)
