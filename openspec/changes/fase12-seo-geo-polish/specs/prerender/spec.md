# Prerender Alt Text Specification

## Purpose
Dynamic alt text injection on `<img>` tags during static prerender for WCAG 2.2 AA and GEO.

## Requirements

### Requirement: Alt Text Injection
The system MUST scan prerendered HTML for `<img>` tags via JSDOM and inject `alt` where missing.
Alt text SHALL be route-aware: project screenshots receive project name, decorative images receive `alt=""`.
`scripts/prerender.mjs` injectIntoHtml SHALL perform this after React rendering, before file write.

#### Scenario: Project screenshot receives descriptive alt text
- GIVEN a case study page with project screenshots
- WHEN prerender generates static HTML
- THEN each `<img>` without alt gets contextual text like "Screenshot of EchoLog dashboard"

#### Scenario: Decorative image receives empty alt
- GIVEN an `<img>` used for visual decoration (e.g., background accent)
- WHEN prerender encounters it
- THEN it receives `alt=""` (not removed, not given descriptive text)

#### Scenario: Image with existing alt is preserved
- GIVEN an `<img>` with a non-empty `alt` attribute
- WHEN prerender scans the HTML
- THEN the existing alt text is NOT modified

### Requirement: Locale-Aware Alt Text
Alt text MUST be localized: ES pages receive Spanish alt text, EN pages receive English.
The prerender script SHALL use the active lang code to select the correct locale variant.

#### Scenario: Spanish alt text on ES page
- GIVEN locale is Spanish and page contains a project screenshot
- WHEN prerender generates the page
- THEN injected alt text is in Spanish (e.g., "Captura de EchoLog — panel principal")

#### Scenario: English alt text on EN page
- GIVEN locale is English
- WHEN prerender generates the page
- THEN injected alt text is in English (e.g., "Screenshot of EchoLog — main dashboard")
