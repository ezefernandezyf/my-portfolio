# Tasks: Fase 14d — Pulido Técnico

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~60 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Config & Dependencies

- [ ] 1.1 Fix `check` script — `package.json:12`: change `npm run` → `pnpm run`
- [ ] 1.2 Add `prebuild` hook — `package.json`: add `"prebuild": "node --experimental-strip-types scripts/generate-sitemap.mjs"`
- [ ] 1.3 Remove `@vitest/coverage-v8` — `package.json:46`: delete line; run `pnpm install` to update lockfile
- [ ] 1.4 Fix `.env.example` — replace Formspree vars with EmailJS: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

## Phase 2: Code Cleanup

- [ ] 2.1 Migrate jpg→webp references — `src/data/projects.ts`: 11 paths (moviedash-*, chefcitoia-*, cinelab-*). Change `.jpg` → `.webp`
- [ ] 2.2 Add width/height to carousel `<img>` — `src/components/ProjectCarousel/ProjectCarousel.tsx:83-88`: add `width={1280}` `height={720}` (16:9 matching aspect-video)
- [ ] 2.3 Remove CurrentlySection TODO — `src/components/CurrentlySection/CurrentlySection.tsx:3-6`: delete framer-motion comment block

## Phase 3: Deduplicate Route Definitions

- [ ] 3.1 Update vite.config.ts — `vite.config.ts:16`: change `node "${script}"` → `node --experimental-strip-types "${script}"`
- [ ] 3.2 Refactor prerender.mjs — import `ROUTE_META` + `ROUTE_KEYS` from `../src/data/route-meta.ts`. Replace hardcoded `ROUTES` array (lines 33-46) with dynamic map. Map: `pathname` → `path`, derive `ns` from key, resolve meta from `ROUTE_META[lang]` instead of i18n key lookup
- [ ] 3.3 Verify prerender output — run `pnpm run build`, confirm 22 pages with `data-prerendered` markers

## Phase 4: Verification

- [ ] 4.1 Run `pnpm run check` — must pass: lint → build (with sitemap generation) → test:coverage
- [ ] 4.2 Verify sitemap freshness — confirm `<lastmod>` is today's date in `public/sitemap.xml`
- [ ] 4.3 Smoke test carousel — verify no visual regressions (width/height shouldn't change layout due to aspect-video container)
- [ ] 4.4 Verify no test snapshots broken — run `pnpm test` and confirm zero failures
