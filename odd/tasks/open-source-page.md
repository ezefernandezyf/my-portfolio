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
      `chore/skill-registry-refresh`. `.gitignore` hunk (`.atl/`) reverted because those
      files stay tracked.
- [ ] T2 Typed contributions data + ES/EN locale namespace.
- [ ] T3 The page, the route in both locale groups, and the route-meta entry.
- [ ] T4 Prerender branch, sitemap regeneration, route-meta snapshot.
- [ ] T5 Header nav entry (desktop + drawer) and `llms.txt` mention.
- [ ] T6 Docs: the CV deployment follows in a separate `docs` branch once the PDFs arrive.

## Technical notes

- `MainLayout` owns the only `<main>`; the page must render `<div>`.
- `useLocalizedPath` must wrap every internal link.
- `scripts/prerender.mjs` dispatches on the i18n namespace; without an `opensource`
  branch the page prerenders `"Page content loading..."` and the sanity check still passes.
- `ROUTE_KEYS` and `ROUTE_META` are separate orderings; both need the new key.
- `route-meta.test.ts` snapshot must be refreshed with `pnpm test -- -u`.
- Build is not run locally by project convention; CI verifies the prerender branch.
