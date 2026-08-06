# seo-meta Specification

## Purpose

Provide a single canonical source of truth for SEO metadata (title, description, keywords) across all routes and locales. `src/data/route-meta.ts` `LocaleSEO` objects are the exclusive source, read directly by all consumers — `schema.ts` (JSON-LD), `scripts/prerender.mjs` (static prerender), and the SPA `MetaTags` — eliminating i18n-key resolution that caused the `" , "` title typo and the latent EN-title regression.

## Requirements

### Requirement: Route-Meta Canonical Ownership

SEO title, description, and keywords for every route SHALL be stored exclusively in `src/data/route-meta.ts` as `LocaleSEO` objects. Consumers — `schema.ts`, `prerender.mjs`, SPA — SHALL read `ROUTE_META[routeKey][lang].title` directly. No SEO metadata SHALL resolve from i18n locale JSON keys.

#### Scenario: Prerender reads title from route-meta

- GIVEN a build runs `scripts/prerender.mjs`
- WHEN `injectIntoHtml` writes `<title>` and OG/Twitter meta
- THEN title text comes from `route.es.title` or `route.en.title`
- AND it is never resolved via `tr()` i18n key lookup

#### Scenario: SPA renders title from route-meta

- GIVEN the SPA navigates to `/about` with i18n language `en`
- WHEN `MetaTags` receives `title` prop
- THEN the prop originates from `ROUTE_META['about']['en'].title`

#### Scenario: No separator typo in titles

- GIVEN any route and any locale
- WHEN a title string is assembled from route-meta `LocaleSEO.title`
- THEN it MUST NOT contain the substring `" , "` (space-comma-space)

### Requirement: Locale JSON Cleanup

`meta.title` and `meta.description` keys SHALL be removed from all locale namespace files. Non-SEO `meta.*` keys (e.g., `meta.contact.title`) SHALL remain untouched.

#### Scenario: SEO key removal preserves non-SEO meta keys

- GIVEN the change is applied across `src/locales/{es,en}/*.json`
- WHEN a build runs
- THEN no `meta.title` or `meta.description` key exists in any locale JSON
- AND `meta.contact.title` remains in `contact.json`

### Requirement: Route-Meta Integrity Tests

A Vitest suite in `src/data/tests/route-meta.test.ts` SHALL assert: every `es.title`/`en.title` is non-empty and contains `"Ezequiel Fernández"`; titles are unique per locale; a snapshot captures `ROUTE_META` for regression.

#### Scenario: Divergence guard

- GIVEN a developer introduces an empty or duplicate title in `ROUTE_META`
- WHEN `pnpm test` runs
- THEN integrity assertions fail with the offending route key and locale

#### Scenario: Snapshot regression

- GIVEN `ROUTE_META` content is stable
- WHEN a change accidentally alters a title string
- THEN the snapshot diff surfaces the exact regression

### Requirement: Descriptive Page Titles

The system MUST generate unique `<title>` tags per route from `ROUTE_META[routeKey][lang].title`. Titles SHALL include author name and role-based suffix. Titles SHALL NOT be stored or resolved from i18n locale JSON.

#### Scenario: Home page title in Spanish

- GIVEN locale is Spanish
- WHEN a crawler accesses `/home`
- THEN `<title>` reads "Ezequiel Fernández | Full Stack Developer | Portfolio Personal"

#### Scenario: Projects page title in English

- GIVEN locale is English
- WHEN `/en/projects` renders
- THEN `<title>` reads "Projects | Ezequiel Fernández | Full Stack Developer"

### Requirement: Keyword Meta Descriptions

The system MUST provide `<meta name="description">` per route from `ROUTE_META[routeKey][lang].description`. Descriptions SHALL originate from `LocaleSEO.description`, not from i18n locale JSON.

#### Scenario: About page description includes stack keywords

- GIVEN route is `/about`
- WHEN the page renders
- THEN meta description includes "React, Node.js, Full Stack Developer, TypeScript"

#### Scenario: Case study description includes project keywords

- GIVEN route is `/projects/echolog`
- WHEN the page renders
- THEN meta description includes "SaaS, PostgreSQL, multi-tenant, feedback, React 19"

### Requirement: Dual-Locale Coverage

The system MUST provide title + description for all routes × 2 locales via `ROUTE_META`. Each locale SHALL resolve from `route.es`/`route.en` directly. The `not-found` route SHALL retain `noIndex: true` while emitting correct locale-specific meta.

#### Scenario: Privacy page meta in both locales

- GIVEN route is `/privacy` in Spanish or English
- THEN unique `<title>` and `<meta name="description">` render per locale
- AND values originate from `ROUTE_META.privacy.es` / `ROUTE_META.privacy.en`

#### Scenario: NotFound page respects noIndex with correct title

- GIVEN route is `/not-found` with `noIndex: true`
- WHEN the page renders
- THEN `<title>` contains locale text from `ROUTE_META['not-found']`
- AND `<meta name="robots" content="noindex, nofollow">` is present
