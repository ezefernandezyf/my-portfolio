# Projects Data Specification

## Purpose
New geo-seo-opencode project entry and case study for the GEO/SEO CLI tool.

## Requirements

### Requirement: geo-seo-opencode Project Entry
The system MUST include a 6th project in `src/data/projects.ts` for "geo-seo-opencode".
Entry SHALL have: id `geo-seo-opencode`, repo URL, NO demo (CLI tool), images (terminal screenshots), tech stack (Node.js, Commander, jsdom, chalk), year 2026, featured true.
I18n keys SHALL be added to `projects.json` under `geo-seo-opencode.*`.

#### Scenario: Project appears in grid without demo link
- GIVEN route is /projects
- WHEN the grid renders
- THEN geo-seo-opencode card appears with name, description, repo link
- AND no demo button is shown

#### Scenario: Project appears in featured selection
- GIVEN HomePage renders featured projects
- WHEN geo-seo-opencode is included
- THEN card shows repo link but no demo link

### Requirement: geo-seo-opencode Case Study Page
The system MUST render a case study at `/projects/geo-seo-opencode` via existing `CaseStudyTemplate`.
A new i18n namespace `geoseoopencodecasestudy` SHALL be created with ES/EN locale files (all required keys: header.*, meta.*, summary, problem, solution, architecture, deepDive).
Route SHALL be added to `src/data/route-meta.ts`, `src/routes/AppRoutes.tsx`, and prerender list.

#### Scenario: Case study renders with full content
- GIVEN route is /projects/geo-seo-opencode, locale is Spanish
- WHEN the page renders
- THEN headings (Summary, Problem, Solution, Architecture) appear with translated content
- AND repo link present, demo link absent

#### Scenario: Prerendered case study is indexed
- GIVEN static prerender runs
- WHEN geo-seo-opencode HTML is generated
- THEN page includes structured content, JSON-LD schema, and meta tags for crawlers
