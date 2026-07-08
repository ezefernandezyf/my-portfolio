# Tasks: Fase 14a — Críticos

## Review Workload Forecast

| Field                   | Value     |
| ----------------------- | --------- |
| Estimated changed lines | ~45–55    |
| 400-line budget risk    | Low       |
| Chained PRs recommended | No        |
| Suggested split         | Single PR |
| Delivery strategy       | single-pr |
| Chain strategy          | pending   |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low
```

## Phase 1: CSS Token Fixes

- [x] 1.1 `/src/components/LanguageSwitcher/LanguageSwitcher.tsx` — Replace outer `<div>` classes: `bg-surface-container-high font-space-grotesk` → `control-cluster font-body` (removes duplicate pill styling)
- [x] 1.2 Same file — Replace active button classes: `bg-surface-container-lowest text-primary` → `bg-surface text-text-primary`
- [x] 1.3 Same file — Replace inactive button classes: `text-text/50 hover:text-text` → `text-text-muted hover:text-text-primary`

## Phase 2: Structured Data Fixes

- [x] 2.1 `/src/data/schema.ts:58` — Change `name: route.titleI18nKey` → `name: route[lang].title`
- [x] 2.2 `/src/data/schema.ts:59` — Change `description: route.descI18nKey` → `description: route[lang].description`

## Phase 3: Locale & i18n Fixes

- [x] 3.1 `/src/data/route-meta.ts` — Change `descI18nKey` from `*:meta.title` to `*:meta.description` for all 6 case studies (cinelab, movie-dashboard, chefcitoia, nexus-talent, echolog, geo-seo-opencode)
- [x] 3.2 Add `"description"` to `"meta"` object in 12 locale files (6 EN + 6 ES), using the resolved SEO text from `route-meta.ts` for each case study
- [x] 3.3 `/src/locales/es/cinelabcasestudy.json` — Translate `labels.featured: "Featured"` → `"Destacado"`, `carousel.alt: "{{name}} preview"` → `"Vista previa de {{name}}"`
- [x] 3.4 `/src/locales/es/moviedashboardcasestudy.json` — Translate `labels.featured: "Featured"` → `"Destacado"`, `carousel.alt` to Spanish
- [x] 3.5 `/src/locales/es/echologcasestudy.json` — Translate `deepDive.heading: "Technical Deep Dive"` → `"Profundización técnica"`
- [x] 3.6 `/src/locales/es/nexustalentcasestudy.json` — Translate `deepDive.heading: "Technical Deep Dive"` → `"Profundización técnica"`
- [x] 3.7 `/src/locales/es/chefcitoiacasestudy.json` — Translate `carousel.alt` to Spanish
- [x] 3.8 `/src/locales/es/geoseoopencodecasestudy.json` — Translate `deepDive.heading: "Deep Dive Técnico"` → `"Profundización técnica"`, fix `noPreview` comma spacing

## Phase 4: HTML Semantics Fix

- [x] 4.1 `/src/pages/HomePage.tsx:119` — Change `<main role="main">` → `<div>`
- [x] 4.2 `/src/pages/AboutPage.tsx:112` — Change `<main role="main"` → `<div`
- [x] 4.3 `/src/pages/ContactPage.tsx:120` — Change `<main role="main"` → `<div`
- [x] 4.4 `/src/pages/PrivacyPage.tsx:43` — Change `<main role="main"` → `<div`
- [x] 4.5 `/src/pages/Projects/CaseStudyTemplate.tsx:159` — Change `<main` → `<div`
