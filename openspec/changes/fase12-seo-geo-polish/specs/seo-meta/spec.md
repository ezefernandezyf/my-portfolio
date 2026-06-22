# SEO Meta Specification

## Purpose
Per-route SEO-optimized HTML titles and meta descriptions with search keywords in ES and EN.

## Requirements

### Requirement: Descriptive Page Titles
The system MUST generate unique, keyword-rich `<title>` tags for every route.
Titles SHALL include the author name and role-based suffix (e.g., "Full Stack Developer | Portfolio").
Titles SHALL be stored as i18n keys under `meta.title` in each route's namespace.

#### Scenario: Home page title in Spanish
- GIVEN locale is Spanish
- WHEN a crawler accesses `/home`
- THEN `<title>` reads "Ezequiel Fernández — Full Stack Developer | Portfolio"

#### Scenario: Projects page title in English
- GIVEN locale is English
- WHEN `/en/projects` renders
- THEN `<title>` reads "Ezequiel Fernández — Projects | Full Stack Developer"

### Requirement: Keyword Meta Descriptions
The system MUST provide a `<meta name="description">` per route with 3-5 relevant search keywords.
Descriptions SHALL be 120-160 characters under `meta.description` i18n keys.
`src/data/route-meta.ts` descI18nKey MUST be corrected where it points to title keys.

#### Scenario: About page description includes stack keywords
- GIVEN route is `/about`
- WHEN the page renders
- THEN meta description includes "React, Node.js, Full Stack Developer, TypeScript, portfolio"

#### Scenario: Case study description includes project-specific keywords
- GIVEN route is `/projects/echolog`
- WHEN the page renders
- THEN meta description includes "SaaS, PostgreSQL, multi-tenant, feedback, React 19"

### Requirement: Dual-Locale Coverage
The system MUST provide complete title + description coverage for all 11 routes × 2 locales.
Each locale SHALL have independent keyword research for ES vs EN search intent.

#### Scenario: Privacy page has unique meta in both locales
- GIVEN route is `/privacy` in Spanish or English
- THEN a unique `<title>` and `<meta name="description">` renders per locale
