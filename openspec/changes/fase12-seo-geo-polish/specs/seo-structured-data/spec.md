# SEO Structured Data Specification

## Purpose

BreadcrumbList schema.org structured data injected into every prerendered page for navigation hierarchy.

## Requirements

### Requirement: BreadcrumbList JSON-LD Injection

The system MUST inject a `BreadcrumbList` node into the JSON-LD `@graph` on every prerendered page.
The breadcrumb SHALL reflect the page's hierarchy (e.g., Home > Projects > EchoLog).
Implementation MUST live in both `src/data/schema.ts` and `scripts/prerender.mjs`.

#### Scenario: Top-level route breadcrumb

- GIVEN route is `/projects` and locale is Spanish
- WHEN static HTML is generated
- THEN JSON-LD @graph includes BreadcrumbList [Home, Projects]

#### Scenario: Nested case study breadcrumb

- GIVEN route is `/projects/echolog` and locale is English
- WHEN static HTML is generated
- THEN JSON-LD @graph includes BreadcrumbList [Home, Projects, EchoLog]

#### Scenario: Home page has single-item breadcrumb

- GIVEN route is `/home`
- WHEN static HTML is generated
- THEN BreadcrumbList contains one item: [Home]

### Requirement: Google Rich Results Validation

The BreadcrumbList MUST pass Google Rich Results Test.
All items SHALL have `@type: "ListItem"`, `position` (1-indexed), `name`, and `item` (absolute URL).

#### Scenario: Structured data validates

- GIVEN any prerendered page
- WHEN tested with Google Rich Results Test
- THEN no errors or critical warnings for BreadcrumbList

### Requirement: Locale-Aware Breadcrumb Names

Breadcrumb item names MUST match the page language. `name` SHALL use the resolved page title in the active locale.

#### Scenario: Spanish names on ES breadcrumb

- GIVEN locale is Spanish and route is /projects/cinelab
- THEN BreadcrumbList names are "Inicio", "Proyectos", "CineLab"
