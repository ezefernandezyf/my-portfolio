# Tasks: Relevy Case Study (geo-saas)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~590 authored (docs ficha 270, JSON pair ~230, wiring/tests ~90) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | Single PR (size-exception) — units as atomic commits |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Commit docs ficha | PR 1 | `pnpm run lint` | N/A — static markdown copy | delete `docs/geo-saas-case-study.md` |
| 2 | projects.ts + listing i18n | PR 1 | `pnpm test --run src/data` | `pnpm run dev` → `/projects` shows Relevy card | revert `src/data/projects.ts`, `src/locales/{es,en}/projects.json` |
| 3 | JSON namespace pair | PR 1 | `pnpm test --run src/features/projects-case-study/tests/i18nParity.test.ts` | dev → `/projects/geo-saas` renders ES+EN | delete `src/locales/{es,en}/geosaascasestudy.json` |
| 4 | routes + route-meta + stack | PR 1 | `pnpm test --run src/data/tests/route-meta.test.ts` | dev → deep-link `/en/projects/geo-saas`; 5 stack sections | revert route-meta.ts, AppRoutes.tsx, buildCaseStudyContent.ts, namespaces.ts |
| 5 | grid 9 + tests + snap | PR 1 | `pnpm test --run` | full suite green | revert tests + `ProjectsListPage.tsx` |
| 6 | sitemap + llms.txt | PR 1 | `node --experimental-strip-types scripts/generate-sitemap.mjs` | crawl `/projects/geo-saas` present in sitemap | revert `public/sitemap.xml`, `public/llms.txt` |

Screenshots `public/projects/geo-saas/geo-saas-{1..4}.webp` are USER-provided (decision 9) — NOT apply tasks; must exist before apply, carousel 404s otherwise. Threat matrix: all rows N/A — declarative hardcoded routes only, no user-controlled path params.

## Phase 1: Docs & Data Foundation

- [x] 1.1 Copy `/home/ezeyf/Escritorio/geo-saas-case-study.md` (read-only) → new `docs/geo-saas-case-study.md`; commit `docs: add Relevy case study ficha`. Accept: file exists, content matches source.
- [x] 1.2 Insert `geo-saas` at index 0 of `src/data/projects.ts` per design §1 (id `geo-saas`, `nameKey`/`shortKey` `geo-saas.*`, repo `https://github.com/ezefernandezyf/relevy`, demo `https://relevy.app`, images `geo-saas-{1..4}.webp`, tech verbatim, year 2026, `featured: true`); reorder: echolog, nexus-talent, geo-seo-opencode, egg-demo, context-bridge, movie-dashboard, chefcitoia, cinelab. Accept: `getProjects()[0].id === 'geo-saas'`.
- [x] 1.3 Add `geo-saas` block (`name` "Relevy" + `short` from design §2, ES short neutral — no voseo) to `src/locales/es/projects.json` and `src/locales/en/projects.json`.

## Phase 2: Case-Study Namespace

- [x] 2.1 Create `src/locales/es/geosaascasestudy.json` — key structure per design §3; ES text from ficha §§4-12 (neutral Spanish); `hookCode` verbatim from ficha §8, `\n`-escaped; all 5 `stack.sections.*` keys.
- [x] 2.2 Create `src/locales/en/geosaascasestudy.json` — design §4; EN from ficha §§4-12. Accept (2.1+2.2): parity test green.
- [x] 2.3 Register namespace in `src/features/projects-case-study/i18n/namespaces.ts` — import `enGeoSaaS`/`esGeoSaaS`, add `geosaascasestudy` to resources en/es + `caseStudyNamespaces` (design §7).

## Phase 3: Routes, Meta & Stack Wiring

- [x] 3.1 Add `projects/geo-saas` to `src/data/route-meta.ts` (design §5, titles/descriptions/keywords verbatim) + append to `ROUTE_KEYS` after `projects/egg-demo`.
- [x] 3.2 Add ES + EN routes in `src/routes/AppRoutes.tsx` (design §6): `<Route path="/projects/geo-saas" element={<ProjectCaseStudyPage projectId="geo-saas" namespace="geosaascasestudy" />} />` + `/en/projects/geo-saas` twin.
- [x] 3.3 Add `stackByProject['geo-saas']` (5 sections, design §8) in `src/features/projects-case-study/lib/buildCaseStudyContent.ts`.
- [x] 3.4 `src/features/projects/list/page/ProjectsListPage.tsx`: `INITIAL_VISIBLE_PROJECTS` 8 → 9 (`LOAD_MORE_STEP` stays 3).

## Phase 4: Tests

- [x] 4.1 `src/features/projects-case-study/tests/i18nParity.test.ts`: add `enGeoSaaS`/`esGeoSaaS` imports + `{ name: 'geosaascasestudy', en: enGeoSaaS, es: esGeoSaaS }` entry.
- [x] 4.2 `src/pages/tests/HomePage.test.tsx`: featured = Relevy + EchoLog — headings; repo `relevy`,`echolog`; demo `relevy.app`,`echolog-web.vercel.app`; caseStudy `/projects/geo-saas`,`/projects/echolog`.
- [x] 4.3 `src/pages/tests/ProjectsPage.test.tsx`: headings/repo/caseStudy 8→9, demo 6→7.
- [x] 4.4 `src/pages/tests/ProjectsPage.coverage.test.tsx`: initial `toHaveLength(8)` → 9 (lines 146, 167); load-more 11 unchanged.
- [x] 4.5 Regenerate `src/data/tests/__snapshots__/route-meta.test.ts.snap` via `pnpm test --run -u`; diff folds in ~10 pre-existing title drifts — EXPECTED, do NOT revert.

## Phase 5: SEO Artifacts & Final Verify

- [x] 5.1 Regenerate `public/sitemap.xml` via `node --experimental-strip-types scripts/generate-sitemap.mjs` (adds `/projects/geo-saas` + EN twin with hreflang).
- [x] 5.2 `public/llms.txt`: add `- [Relevy](https://github.com/ezefernandezyf/relevy) — GEO/SEO auditing micro-SaaS…` bullet under `## Projects` + 2 Site Structure rows (`/projects/geo-saas`, `/en/projects/geo-saas` → "Relevy case study").
- [x] 5.3 Gate: `pnpm run lint` && `pnpm test --run` && `pnpm run build` all pass.