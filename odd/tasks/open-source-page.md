# Feature: Open Source page

Branch: `feat/open-source-page` (from `develop` @ `ef352e0`)
Source of truth for content: `/home/ezeyf/Escritorio/cv-hub/experience/open-source.md`

## Goal

Ship a dedicated `/open-source` page (ES + EN) that lists the three merged pull
requests, so the portfolio carries externally verifiable evidence instead of only
self-declared projects. Prerendered, indexed, linked from the header.

## Non-goals

- No listing of open or rejected PRs (`fastify#7046`, `typebox#297`).
- No claim of maintainer or regular-contributor status.
- No redesign of the header or of existing pages.
- No fix of the pre-existing Fase 15 findings touched in passing (breadcrumb `@id`,
  `ogImage` hardcoded in prerender, nested `<main>` in `ProjectsListPage`).

## Content constraints (from the source file)

- "Mergeado" is the only state that counts; each card must link its public PR.
- Name the package (`@fastify/cookie`), never "fastify" alone.
- vitest has two merges: frame as two distinct signals, not as "regular contributor".

## Tasks

- [x] T1 `chore: refresh the skill registry` — commit `98c8f41` on
      `chore/skill-registry-refresh` (amended to `c394b9e` to add `.codegraph/` to
      `.gitignore`). The `.atl/` ignore hunk stays reverted because those files remain
      tracked.
- [x] T2 Typed contributions data + ES/EN locale namespace — commit `004a4bc`.
- [x] T3 The page, the route in both locale groups, and the route-meta entry — commit
      `cd85ff4`. Nav moved to `lg:` so five uppercase items do not crowd at 768px.
- [x] T4 Prerender branch, sitemap regeneration, route-meta snapshot — commit `a5e7c57`.
- [x] T5 `llms.txt` mention — commit `11b53f1`.
- [ ] T6 CV PDFs (`docs` branch) and deployment, blocked on the two new PDFs.

## Evidence

- `pnpm run lint` — clean (`--max-warnings=0`).
- `pnpm exec vitest run` — 32 files, 145 tests, all passing.
- `pnpm run test:coverage` — lines 92.65%, functions 85.58%, branches 73.10%,
  statements 90.45%; thresholds are 80/80/70/80.
- Prerender run against the existing `dist/`: 32 pages, 0 failed. `dist/open-source/index.html`
  serves 558 words and 3 external GitHub links; `/en/open-source` serves 541 words and 3 links.
  JSON-LD emits `CollectionPage` + two `BreadcrumbList` items. Canonical is correct.
- `public/sitemap.xml` — 30 URLs, both locales with hreflang plus `x-default`.
- Build was not run locally by project convention; CI runs `pnpm run build` and therefore
  the prerender branch. A local `node --experimental-strip-types scripts/prerender.mjs`
  already exercised it successfully.

## Technical notes

- `MainLayout` owns the only `<main>`; the page must render `<div>`.
- `useLocalizedPath` must wrap every internal link.
- `scripts/prerender.mjs` dispatches on the i18n namespace; without an `opensource`
  branch the page prerenders `"Page content loading..."` and the sanity check still passes.
- `ROUTE_KEYS` and `ROUTE_META` are separate orderings; both need the new key.
- `route-meta.test.ts` snapshot must be refreshed with `pnpm test -- -u`.
- Build is not run locally by project convention; CI verifies the prerender branch.
