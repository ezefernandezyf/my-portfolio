# About Data Specification

## Purpose
Fourth education certification entry and dynamic CV path per active locale.

## Requirements

### Requirement: Fourth Education Card — AI Skills Fest 2026
The system MUST render a 4th education card for "AI Skills Fest 2026" (Microsoft) on AboutPage.
The card SHALL include: certification title, period, Credly badge reference, descriptive paragraph.
Data SHALL be stored via `src/data/about.ts` education array entry and `aboutpage.education.3.*` i18n keys.

#### Scenario: Certification appears on AboutPage in Spanish
- GIVEN locale is Spanish and route is /about
- WHEN Education section renders
- THEN a 4th card appears with "AI Skills Fest 2026 — Microsoft" title and Credly badge

#### Scenario: Certification appears on AboutPage in English
- GIVEN locale is English and route is /en/about
- WHEN Education section renders
- THEN a 4th card appears with localized English content and Credly badge

### Requirement: Dynamic CV Path Per Locale
The CV download link MUST resolve to the locale-appropriate PDF based on active `i18n.language`.
When `i18n.language === 'en'`, href SHALL point to `/Ezequiel_Fernandez_CV_EN.pdf`.
When `i18n.language === 'es'`, href SHALL point to the Spanish variant.
Applies to: Header mobile drawer CV link, HomePage hero CTA, AboutPage hero CV link.

#### Scenario: English CV link on EN locale
- GIVEN active language is English
- WHEN Header, HomePage, or AboutPage renders CV download
- THEN href is `/Ezequiel_Fernandez_CV_EN.pdf`

#### Scenario: Spanish CV link on ES locale
- GIVEN active language is Spanish
- WHEN CV download link renders
- THEN href is the Spanish PDF variant
