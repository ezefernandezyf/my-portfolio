# Delta Spec: Fase 13 — Final Polish

> Polish phase. Content expansion, one bugfix, new sitemap tooling, config updates.
> No new components, no feature changes, no behavioral redesign.

## ADDED Requirements

### Requirement: Content paragraphs reach 180-200 words

| Deliverable         | Files                                       | Target                     |
| ------------------- | ------------------------------------------- | -------------------------- |
| Projects paragraphs | `projects.json` contentSection.p1-3 (ES+EN) | 180-200w each              |
| Projects subtitle   | `projects.json` header.subtitle (ES+EN)     | 20-40w                     |
| Contact paragraphs  | `contact.json` contentSection.p1-2 (ES+EN)  | 180-200w each              |
| Contact hero desc   | `contact.json` hero.description (ES+EN)     | 20-40w                     |
| Contact paragraph 3 | `contact.json` contentSection.p3 (ES+EN)    | 180-200w, process & values |

Contact paragraph 3 MUST cover: testing discipline, code review practices, CI/CD approach, and team communication.

#### Scenario: Paragraphs meet word targets

- GIVEN Projects or Contact page renders in ES or EN
- WHEN contentSection paragraphs are measured
- THEN each paragraph contains 180-200 words of natural prose
- AND ContactPage renders three content paragraphs
- AND no paragraph contains generic filler or detectable repetition

### Requirement: Auto-generated sitemap from route-meta.ts

The system MUST include `scripts/generate-sitemap.mjs` that reads `src/data/route-meta.ts` ROUTE_KEYS and priority/changefreq fields, producing `public/sitemap.xml` with hreflang alternates for 24 URLs.

#### Scenario: Sitemap script outputs correct entries

- GIVEN route-meta.ts defines 12 routes, 11 indexable (not-found has noIndex: true)
- WHEN generate-sitemap.mjs runs
- THEN output contains 22 `<url>` entries (11 routes × 2 locales)
- AND /not-found and /en/not-found are excluded
- AND each non-default-locale URL has `<xhtml:link rel="alternate" hreflang="...">`

#### Scenario: Sitemap reflects route-meta changes at build time

- GIVEN ROUTE_KEYS or priority values change in route-meta.ts
- WHEN generate-sitemap.mjs runs as build step
- THEN output sitemap.xml reflects updated values without manual editing

### Requirement: llms.txt completeness

The system MUST maintain `public/llms.txt` listing all published projects, certifications, and routes for AI crawler consumption.

#### Scenario: Missing content present

- GIVEN geo-seo-opencode project and AI Skills Fest 2026 certification exist
- WHEN an AI crawler reads llms.txt
- THEN Projects section lists geo-seo-opencode
- AND Certifications section references AI Skills Fest 2026
- AND Skills section is current
- AND route table lists all 24 entries across 12 routes

## MODIFIED Requirements

### Requirement: Prerender about descKey correction

(Previously: /about route emitted meta.title as og:description via `descKey: 'meta.title'`)

The prerender script MUST emit the correct og:description for /about by reading `meta.description` instead of `meta.title`.

#### Scenario: About og:description uses correct key

- GIVEN prerender generates /about page
- WHEN og:description meta tag is injected
- THEN content matches `aboutpage:meta.description`, not `aboutpage:meta.title`

#### Scenario: Other routes unaffected

- GIVEN prerender runs for all 12 routes
- WHEN any route other than /about is processed
- THEN og:description continues using its existing correct descKey
