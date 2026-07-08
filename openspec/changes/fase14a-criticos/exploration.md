## Exploration: fase14a-criticos — Auditoría 360° Critical Fixes

### Current State

Five critical issues from a 77/100 audit (Visual: 77, Contenido: 75, Técnico: 80) block shipping or break core functionality.

### Affected Areas

| #   | Issue                                    | Files                                                                                                             | Severity                    |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 1   | LanguageSwitcher CSS classes don't exist | `src/components/LanguageSwitcher/LanguageSwitcher.tsx` + `src/index.css`                                          | 🔴 User-blocking            |
| 2   | Schema JSON-LD injects i18n keys as text | `src/data/schema.ts:58-59`                                                                                        | 🔴 Invalid structured data  |
| 3   | 6 case studies lack `meta.description`   | `src/data/route-meta.ts` (6 entries), 12 JSON locale files                                                        | 🔴 Empty meta descriptions  |
| 4   | English strings in Spanish locale files  | 6 ES case study JSON files (`labels.featured`, `deepDive.heading`, `carousel.alt`)                                | 🔴 Bad UX for Spanish users |
| 5   | Double `<main>` nesting                  | `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `PrivacyPage.tsx`, `CaseStudyTemplate.tsx` + `MainLayout.tsx` | 🔴 Invalid HTML semantics   |

### Confirmed Findings

**1. LanguageSwitcher — INVISIBLE.** Classes `bg-surface-container-high`, `font-space-grotesk`, `bg-surface-container-lowest`, `text-text/50`, `text-text` do not match any token in `src/index.css`'s `@theme` block. Available: `bg-surface`, `bg-surface-elevated`, `text-text-primary`, `text-text-secondary`, `text-text-muted`, `font-body`, `font-display`. The component also duplicates the `control-cluster` pill pattern already defined in `index.css`.

**2. Schema JSON-LD — i18n keys as text.** `schema.ts:58-59` sets `name: route.titleI18nKey` and `description: route.descI18nKey`, producing raw strings like `"home:meta.title"` in JSON-LD. Fix: use `route[lang].title` and `route[lang].description` (the resolved `LocaleSEO` objects already exist on each `RouteMeta`).

**3. Missing meta descriptions on 6 case studies.** All six `descI18nKey` fields point to `meta.title` (e.g., `cinelabcasestudy:meta.title`). No `meta.description` key exists in any of the 12 locale files (ES + EN). Fix requires: (a) adding `meta.description` to each of the 12 JSON files, (b) changing `descI18nKey` to `meta.description`.

**4. English strings in ES locales.** Confirmed:

- `cinelab`: `labels.featured: "Featured"`, `carousel.alt` in English
- `moviedashboard`: `labels.featured: "Featured"`, `carousel.alt` in English
- `echolog`: `deepDive.heading: "Technical Deep Dive"`
- `nexustalent`: `deepDive.heading: "Technical Deep Dive"`
- `chefcitoia`: `carousel.alt` in English
- `geoseoopencode`: `deepDive.heading: "Deep Dive Técnico"` (mixed)

**5. Double `<main>` confirmed.** `MainLayout.tsx:20` wraps `<Outlet />` in `<main id="main-content">`. Five page components then render another `<main>` inside it: `HomePage.tsx:119`, `AboutPage.tsx:112`, `ContactPage.tsx:120`, `PrivacyPage.tsx:43`, `CaseStudyTemplate.tsx:159`. Fix: change inner `<main>` to `<div>`.

### Dependencies

Independent — all five can be fixed in parallel. No issue blocks another.

### Approaches

Only one viable approach per issue — they're straight bugs, not design tradeoffs:

| Issue                         | Approach                                                                                      | Effort  |
| ----------------------------- | --------------------------------------------------------------------------------------------- | ------- |
| LanguageSwitcher              | Replace CSS classes with project tokens; remove duplicate pill; use `control-cluster` wrapper | Low     |
| Schema JSON-LD                | Switch `route.titleI18nKey` → `route[lang].title` on lines 58-59                              | Trivial |
| Missing meta descriptions     | Add `meta.description` to 12 locale files + fix `descI18nKey` in 6 route-meta entries         | Medium  |
| English strings in ES locales | Replace 9 string values across 6 files                                                        | Low     |
| Double `<main>`               | Change `<main>` → `<div>` in 5 files                                                          | Trivial |

### Recommendation

Fix all five in a single atomic commit. They're independent, low-risk, and each blocks a user-visible feature (language switch, SEO, i18n, HTML validity).

### Risks

- Low. No behavioral changes, only markup/string corrections.
- Schema fix: verify prerender script (`scripts/prerender.mjs`) doesn't duplicate the same bug.
- i18n key changes: verify `descI18nKey` references resolve in both locales.

### Ready for Proposal

Yes.
