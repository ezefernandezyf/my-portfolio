# relevy-case-study Specification

## Purpose

Add a bilingual (ES/EN) case study for **Relevy** — a GEO/SEO auditing micro-SaaS — rendered by the existing shared `CaseStudyTemplate`, driven by `src/locales/{es,en}/geosaascasestudy.json`. Project id is `geo-saas`, `featured: true`, at **position 0** of `projects.ts`. Content source of truth is the Relevy content ficha (referenced, not duplicated).

## Requirements

### Requirement: REL-1 — Project data entry (projects.ts)

The system SHALL add a `geo-saas` entry at **position 0** of the `projects` array with: `id: 'geo-saas'`, `nameKey: 'geo-saas.name'`, `shortKey: 'geo-saas.short'`, `repo: 'https://github.com/ezefernandezyf/relevy'`, `demo: 'https://relevy.app'`, `images` (4 paths `/projects/geo-saas/geo-saas-{1..4}.webp`), `tech` (ficha stack), `year: 2026`, `featured: true`. The remaining entries SHALL be reordered to: echolog(1), nexus-talent(2), geo-seo-opencode(3), egg-demo(4), context-bridge(5), movie-dashboard(6), chefcitoia(7), cinelab(8).

#### Scenario: Landing surfaces Relevy + EchoLog

- GIVEN `getProjects()` returns the reordered array and the landing renders `slice(0, 2)`
- WHEN the home page renders
- THEN Relevy is position 0 and EchoLog is position 1

#### Scenario: Demo link resolves

- GIVEN the `geo-saas` entry
- WHEN the case study renders its demo CTA
- THEN `demo` equals `https://relevy.app`

### Requirement: REL-2 — Bilingual case-study namespace (geosaascasestudy.json)

The system SHALL create `src/locales/es/geosaascasestudy.json` and `src/locales/en/geosaascasestudy.json` with a key structure 1:1 matching the canonical `eggdemocasestudy.json` namespace: `header`, `stack` (`heading` + `sections`), `summary`, `problem`, `solution`, `architecture`, `implementation` (`heading`, `hookTitle`, `hookCode`, `hookDescription`), `accessibility`, `performance`, `challenges`, `improvements`, `deepDive`, `carousel`, `labels`, `notFound`, `noPreview`. `displayName` for both locales SHALL be `Relevy`. ES/EN key structures MUST be identical (parity gate).

#### Scenario: ES navigation renders full content

- GIVEN locale is Spanish
- WHEN a user visits `/projects/geo-saas`
- THEN header, summary, problem, solution, architecture, implementation, accessibility, performance, challenges, improvements sections all render non-empty Spanish text

#### Scenario: EN navigation renders full content

- GIVEN locale is English
- WHEN a user visits `/en/projects/geo-saas`
- THEN the same sections render non-empty English text

### Requirement: REL-3 — i18n parity

The `geosaascasestudy` namespace SHALL be added to the `i18nParity.test.ts` namespace list so that flattened ES and EN key structures are asserted equal.

#### Scenario: Parity gate passes

- GIVEN `i18nParity.test.ts` includes `geosaascasestudy`
- WHEN `pnpm test` runs
- THEN ES and EN flattened keys match exactly

### Requirement: REL-4 — Route registration

`src/routes/AppRoutes.tsx` SHALL register `/projects/geo-saas` (ES group) and `/en/projects/geo-saas` (EN group) routing to `ProjectCaseStudyPage projectId="geo-saas" namespace="geosaascasestudy"`.

#### Scenario: Direct deep link

- GIVEN the app is served
- WHEN a user opens `/projects/geo-saas` or `/en/projects/geo-saas`
- THEN the Relevy case study renders without a fallback or NotFound

### Requirement: REL-5 — Namespace registration

`src/features/projects-case-study/i18n/namespaces.ts` SHALL import `enGeosaas`/`esGeosaas`, add `geosaascasestudy` to `caseStudyResources.en`/`.es`, and append `'geosaascasestudy'` to `caseStudyNamespaces`.

#### Scenario: Template resolves the namespace

- GIVEN `caseStudyResources` and `caseStudyNamespaces` include `geosaascasestudy`
- WHEN the case study page initializes i18next
- THEN translations resolve without a "namespace not loaded" warning

### Requirement: REL-6 — Stack sections (buildCaseStudyContent.ts)

`stackByProject` SHALL add a `geo-saas` entry with the ficha's five sections mapped to `titleKey`s: `frontend`, `backend`, `auth`, `testing`, `infra`, each with its ficha `items`. The new `titleKey` keys (`stack.sections.backend`, `stack.sections.auth`, `stack.sections.infra`, and any others not already in the namespace) SHALL exist in both `geosaascasestudy.json` files.

#### Scenario: Stack renders five sections

- GIVEN the case study renders for `geo-saas`
- WHEN `buildCaseStudyContent('geo-saas', t)` runs
- THEN five stack sections render with their ficha items

### Requirement: REL-7 — Screenshots (public/projects/geo-saas/)

The system SHALL provide 4 screenshots at `public/projects/geo-saas/geo-saas-{1..4}.webp` in 16:9 (1920×1080) format: landing hero with GEO Score, report breakdown, dashboard/persisted audit, and mobile drawer view.

#### Scenario: Carousel renders four images

- GIVEN the case study renders
- WHEN the carousel loads
- THEN four preview images resolve without 404

### Requirement: REL-8 — Copy quality (no AI slop)

The final case-study copy SHALL be free of generic LLM filler (e.g. "In today's fast-paced digital landscape"), unsupported superlatives, and voseo. Copy SHALL follow the existing case-study register: factual, evidence-backed with the ficha's concrete numbers (1119 tests, ~2.8s audit, GEO score 71, 14-URL corpus), professional neutral Spanish / neutral English.

#### Scenario: Evidence is concrete, not generic

- GIVEN the rendered copy
- WHEN a reviewer reads any performance/challenges item
- THEN each claim cites a concrete figure from the ficha rather than a generic assertion

#### Scenario: No AI-slop phrases

- GIVEN the rendered copy
- WHEN a reviewer scans all sections
- THEN no phrase matches generic-LLM filler tropes (e.g. "today's fast-paced", "seamless", "unlock the power")
