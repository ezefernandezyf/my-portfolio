# Proposal: Fase 15 GEO — Titles & Source of Truth

## Intent

Fix the `" , "` typo bug in SEO titles (e.g., `"Portfolio Personal , Full Stack Developer"`) currently emitted by `scripts/prerender.mjs` and SPA MetaTags, and eliminate the duplicated source of truth between `src/data/route-meta.ts` (correct) and locale JSON files (broken). This also prevents a latent regression: EN pages currently serving correct titles from a pre-breakage deploy will degrade to the broken JSON titles on the next deployment.

## Scope

### In Scope
- Make `src/data/route-meta.ts` the single canonical source of truth for SEO title, description, and keywords for all 11 routes × 2 locales.
- Fix prerender `.mjs` to read `route.es.title` / `route.en.title` directly instead of resolving i18n keys from locale JSON.
- Update all SPA page components to pass route-meta strings to `MetaTags` instead of `t("meta.title")`.
- Remove `meta.title` and `meta.description` keys from all 14 `src/locales/{es,en}/*.json` files.
- Add Vitest integrity tests for route-meta (no empty titles, no duplicates, coverage for all 22 locale-route combos).

### Out of Scope
- Full DOM prerender (grids, stats, carousel) — deferred to a later Fase 15 change.
- Schema enrichment (TechArticle, Person expansion, Breadcrumb `@id`) — deferred to separate changes.
- Sitemap lastmod auto-generation.
- Non-SEO i18n keys remain in locale JSON; only `meta.title`/`meta.description` keys are removed.

## Capabilities

### Modified Capabilities
- `seo-meta`: Change requirement from "titles SHALL be stored as i18n keys under `meta.title`" to "titles SHALL be stored in `src/data/route-meta.ts` as `LocaleSEO.title`/`LocaleSEO.description`". Consumers (schema.ts, prerender.mjs, SPA) SHALL read from route-meta directly, not from i18n resolution.

## Approach

### Root cause
Two sources of truth exist: `route-meta.ts` (correct format: `"Ezequiel Fernández | Full Stack Developer | Portfolio Personal"`) and locale JSON (broken: `"Portfolio Personal , Full Stack Developer"`). `prerender.mjs` resolves i18n keys → reads JSON → emits broken title. `schema.ts` reads route-meta inline `es`/`en` objects → correct.

### Fix (3 consumers, 1 source)

1. **`scripts/prerender.mjs`**: Change `metaTitle()`/`metaDesc()` to `lang === 'en' ? route.en.title : route.es.title` (and likewise for description). Add `es`/`en` fields to `buildRoutes()` output so route objects carry LocaleSEO. JSON-LD builder automatically picks up the fix via `metaTitle()`.

2. **SPA pages**: Each page already imports `useTranslation`; use `i18n.language` to select `'en'`/`'es'`, then read `ROUTE_META[routeKey][lang].title` to pass to `<MetaTags>`. 7 files: HomePage, AboutPage, ContactPage, PrivacyPage, NotFoundPage, CaseStudyTemplate (receives as props; parent resolves), ProjectsListPage.

3. **Locale JSON**: Remove `meta.title` and `meta.description` from all 14 namespaces. Other `meta.*` keys (e.g., `meta.contact.title` in contact.json) stay if used for non-SEO UI copy.

### `.mjs` consumer strategy
`prerender.mjs` already imports `ROUTE_META` from `../src/data/route-meta.ts` (Vite resolves `.ts` imports at build time). The inline `es`/`en` LocaleSEO objects are plain JS objects — no JSON duplication, no shared file needed. This is the pragmatic choice for a Vite static site.

### Tests
- **Divergence guard**: Vitest test iterates `ROUTE_META` and asserts `es.title`/`en.title` are non-empty, contain `"Ezequiel Fernández"`, and are unique across all routes per locale.
- **Snapshot test**: Capture `ROUTE_META` for regression detection.
- Location: `src/data/tests/route-meta.test.ts`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/route-meta.ts` | No code change | Already correct; add test for integrity |
| `scripts/prerender.mjs` | Modified | `metaTitle()`/`metaDesc()` + `buildRoutes()` |
| `src/pages/HomePage.tsx` | Modified | Replace `t('meta.title')` with route-meta |
| `src/pages/AboutPage.tsx` | Modified | Same |
| `src/pages/ContactPage.tsx` | Modified | Same |
| `src/pages/PrivacyPage.tsx` | Modified | Same |
| `src/pages/NotFoundPage.tsx` | Modified | Same |
| `src/pages/Projects/CaseStudyTemplate.tsx` | No change | Receives title/desc as props |
| `src/features/projects-case-study/*` | Modified | Parent resolves meta from route-meta |
| `src/locales/{es,en}/*.json` | Modified | Remove `meta.title`/`meta.description` (14 files) |
| `src/data/tests/route-meta.test.ts` | New | Integrity + snapshot tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missed a page consuming i18n meta.title | Med | Grep all `.tsx` before editing; manual nav test per route per locale |
| Prerender title breaks silently | Low | `pnpm run build && pnpm run preview` + inspect dist HTML titles |
| Locale JSON removal breaks other `meta.*` consumers | Low | Keep `meta.contact.title` and other non-SEO keys; only remove `title`/`description` |

## Rollback Plan

Revert feature branch. All changes are code + JSON — no DB migrations, no schema changes. If merged: revert merge commit. Locale JSON keys can be restored from git history.

## Dependencies

None. No external services, no new packages. Pure code + JSON refactor.

## Success Criteria

- [ ] All 22 prerendered HTML files have correct titles (no `" , "` typo, format matches route-meta)
- [ ] SPA MetaTags renders correct titles in both ES and EN
- [ ] No missing `meta.title`/`meta.description` rendering in any route
- [ ] `pnpm run build` succeeds without errors
- [ ] `pnpm test` passes including new route-meta integrity tests
- [ ] `pnpm run lint` passes
