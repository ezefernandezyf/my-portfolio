# Tasks: Fase 15 GEO — Titles & Source of Truth

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~300–370 authored (excl. generated snapshot) |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR (commit-by-work-unit) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | route-meta tests + prerender refactor | PR 1 (commit 1) | `pnpm test src/data/tests/route-meta.test.ts` | `pnpm run build` → grep dist titles, no `" , "` | Revert `prerender.mjs` + delete test |
| 2 | SPA migration + locale cleanup | PR 1 (commits 2–3) | `pnpm test` (full suite) | `pnpm run preview` → nav ES/EN, view-source title | Revert pages + JSON (git-restorable) |

## Phase 1: Foundation — route-meta integrity tests

- [x] 1.1 Create `src/data/tests/route-meta.test.ts`: iterate all 14 `ROUTE_META` keys × 2 locales — `es.title`/`en.title` non-empty, contain "Ezequiel Fernández", unique per locale, no `" , "` (spec: Divergence guard, No separator typo)
- [x] 1.2 Assert `ROUTE_META['not-found'].noIndex === true`, title/description non-empty (spec: NotFound noIndex)
- [x] 1.3 Add snapshot `expect(ROUTE_META).toMatchSnapshot()` (spec: Snapshot regression)

## Phase 2: Prerender refactor — `scripts/prerender.mjs`

- [x] 2.1 `buildRoutes()`: add `es: route.es, en: route.en`; drop `ns`, `titleKey`, `descKey`, `i18nInterpolation`
- [x] 2.2 Rewrite `metaTitle()`/`metaDesc()`: `lang === 'en' ? route.en.title : route.es.title` (JSON-LD/OG/breadcrumb auto-fix)
- [x] 2.3 Line 249: projects visible H1 `getVal(content, 'meta.title')` → `'header.title'`

## Phase 3: SPA migration (route-meta as sole source)

- [x] 3.1 `HomePage.tsx:113-114`: `ROUTE_META.home[lang]` via existing `i18n.language`
- [x] 3.2 `AboutPage.tsx:111`: `ROUTE_META.about[lang].title` + `.description` (replaces `t('summary')` in MetaTags; keep for visible line 138)
- [x] 3.3 `ContactPage.tsx:115-116`: `ROUTE_META.contact[lang]`
- [x] 3.4 `PrivacyPage.tsx:37-38`: `ROUTE_META.privacy[lang]`
- [x] 3.5 `NotFoundPage.tsx:12-13`: `ROUTE_META['not-found'][lang]`, keep `noIndex={true}`
- [x] 3.6 `ProjectsListPage.tsx`: add `<MetaTags>` with `ROUTE_META.projects[lang]`; visible H1 `t('meta.title')`→`t('header.title')`, intro `t('meta.description')`→`t('header.subtitle')`
- [x] 3.7 `ProjectCaseStudyPage.tsx`: resolve `ROUTE_META[\`projects/${projectId}\`][lang]`, pass `metaTitle`/`metaDescription` props
- [x] 3.8 `CaseStudyTemplate.tsx`: add optional `metaTitle?`/`metaDescription?`; pass to `<MetaTags>` (line 155)

## Phase 4: Locale JSON cleanup (26 files)

- [x] 4.1 Remove `meta.title`/`meta.description` from 13 es namespaces: home, aboutpage, projects, cinelabcasestudy, moviedashboardcasestudy, chefcitoiacasestudy, nexustalentcasestudy, echologcasestudy, geoseoopencodecasestudy, contextbridgecasestudy, eggdemocasestudy, privacy, notfoundpage
- [x] 4.2 Same for 13 en namespaces; `meta.contact.*` intact in `contact.json`, none of `meta.title`/`meta.description` remain (spec: preserve non-SEO)

## Phase 5: Verification

- [x] 5.1 `pnpm run build` → grep 28 dist HTML titles (14 routes × 2 locales): match route-meta, zero `" , "` (spec: prerender title, Home ES, Projects EN, About/Case-study desc)
- [x] 5.2 `pnpm test` — new + existing suites green (i18nParity unaffected: symmetric removal)
- [x] 5.3 `pnpm run lint`; commit by work unit, Conventional Commits (EN title, ES body)
