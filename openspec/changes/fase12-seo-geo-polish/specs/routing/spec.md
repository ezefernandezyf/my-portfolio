# Routing Specification

## Purpose

Locale-aware navigation paths that preserve the `/en/` prefix when English is active.

## Requirements

### Requirement: Locale-Prefixed Navigation Links

The system MUST prefix all navigation paths with `/en/` when active language is English.
A shared utility (e.g., `useLocalizedPath` hook) SHALL wrap all `<Link to={...}>` and `<NavLink to={...}>` props.
The utility MUST be used in: Header (desktop + mobile drawer), HomePage CTAs, AboutPage links, Footer links, internal `to=` props.

#### Scenario: Header nav links with English active

- GIVEN active language is English
- WHEN Header renders navigation
- THEN Projects links to `/en/projects`, About to `/en/about`, Contact to `/en/contact`

#### Scenario: Header nav links with Spanish active

- GIVEN active language is Spanish
- WHEN Header renders navigation
- THEN links use no prefix: `/projects`, `/about`, `/contact`

#### Scenario: HomePage CTAs preserve locale

- GIVEN active language is English
- WHEN HomePage renders CTA buttons
- THEN "Proyectos" links to `/en/projects`, "Acerca de mí" to `/en/about`

#### Scenario: Mobile drawer links preserve locale

- GIVEN active language is English and mobile drawer is open
- WHEN drawer navigation renders
- THEN all links use `/en/` prefix

### Requirement: Active Link Highlighting

`NavLink` active state MUST correctly match when locale prefix is present.
`NavLink to="/en/projects"` SHALL be styled as active when URL is `/en/projects`.

#### Scenario: Active nav link with English prefix

- GIVEN current URL is `/en/projects` and language is English
- WHEN Header renders nav
- THEN Projects NavLink is styled as active (accent color + underline)
