# SEO Content Specification

## Purpose
Expanded on-page content for /projects and /contact exceeding 200 words for search engine relevancy.

## Requirements

### Requirement: Expanded Projects Overview
The system MUST render an introductory content section on /projects above the project grid.
The section SHALL include heading + descriptive paragraph (80+ words) + methodology paragraph (60+ words).
Content SHALL be stored as i18n keys under `projects:content.*`.

#### Scenario: Projects page shows expanded content in Spanish
- GIVEN locale is Spanish and route is /projects
- WHEN the page renders
- THEN a section with heading, methodology description, and tech philosophy renders above the grid
- AND total introductory word count exceeds 200

#### Scenario: Prerendered projects page includes expanded content
- GIVEN static prerender runs for /projects
- WHEN HTML is generated
- THEN expanded content text is present in rendered markup for crawlers

### Requirement: Expanded Contact Process
The system MUST render a content section on /contact describing the collaboration process.
The section SHALL include heading + 3-4 paragraphs: response time, process overview, ideal project types.
Content SHALL be stored as i18n keys under `contact:process.*`.

#### Scenario: Contact page shows process section in English
- GIVEN locale is English and route is /en/contact
- WHEN the page renders
- THEN a process section with heading and 3+ paragraphs renders above contact info cards
- AND total word count exceeds 200

### Requirement: Crawler-Accessible Content
All expanded content MUST be present in static prerendered HTML output.
No client-side hydration dependency for search engine indexing.

#### Scenario: View source shows expanded content
- GIVEN a prerendered /projects or /contact HTML file
- WHEN viewing source (curl)
- THEN all expanded content paragraphs are present as server-rendered text
