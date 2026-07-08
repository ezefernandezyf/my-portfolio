# Proposal: Fase 14a — Críticos

## Intent
Fix 5 production-breaking bugs from the 360° audit: invisible LanguageSwitcher, invalid JSON-LD schema, 6 case studies with no meta descriptions, English strings in Spanish locales, and double `<main>` nesting that violates HTML semantics.

## Scope

### In Scope
- Replace LanguageSwitcher CSS classes with project design tokens (`bg-surface-elevated`, `text-text-primary`, `font-body`)
- Fix `schema.ts:58-59` to use resolved SEO strings (`route[lang].title`) instead of i18n keys
- Add `meta.description` to 12 locale files (ES/EN × 6 case studies) + fix `descI18nKey` in `route-meta.ts`
- Translate 9 English/hardcoded strings to Spanish in 6 ES locale files
- Change `<main role="main">` to `<div>` in `HomePage`, `AboutPage`, `ContactPage`, `PrivacyPage`, `CaseStudyTemplate`

### Out of Scope
- Fase 14b (a11y, UX writing, i18n labels in non-case-study pages)
- Fase 14c (visual consistency: button heights, heading scales, gradients)
- Fase 14d (technical polish: webp conversion, env cleanup, sitemap automation)
- Fase 14e (optional optimizations: ScrollProgress ref, mouse-gradient ref)

## Capabilities

### Modified Capabilities
- `seo-structured-data`: schema.ts must output resolved strings from `route[lang]`, not i18n keys
- `seo-meta`: case study `descI18nKey` must reference `meta.description`, not `meta.title`

### New Capabilities
None — all changes fix broken implementations of existing capabilities.

## Approach

**Fixes are independent and low-risk. Order doesn't matter, but recommended sequence:**

1. **LanguageSwitcher** — Replace `bg-surface-container-high` → `bg-surface-elevated`, `font-space-grotesk` → `font-body`, `text-text/50` → `text-text-muted`, `text-text` → `text-text-primary`, `bg-surface-container-lowest` → `bg-surface`. Optionally wrap in existing `control-cluster` class to remove duplicate pill styling.

2. **Schema JSON-LD** — In `buildWebPage()`, change `name: route.titleI18nKey` → `name: route[lang].title` and `description: route.descI18nKey` → `description: route[lang].description`.

3. **Meta descriptions for case studies** — Add `"description": "…"` inside each `"meta"` object in all 12 locale files (6 ES + 6 EN). Update `descI18nKey` in `route-meta.ts` from `*:meta.title` to `*:meta.description` for all 6 case study entries.

4. **Spanish locale strings** — Replace 9 values across 6 ES files:
   - `cinelab`: `featured: "Destacado"`, `carousel.alt: "Vista previa de {{name}}"`
   - `moviedashboard`: `featured: "Destacado"`, `carousel.alt: "Vista previa de Movie Management Dashboard"`
   - `echolog`: `deepDive.heading: "Profundización técnica"`
   - `nexustalent`: `deepDive.heading: "Profundización técnica"`
   - `chefcitoia`: `carousel.alt: "Vista previa de IA Recipe Generator"`
   - `geoseoopencode`: `deepDive.heading: "Profundización técnica"`, `noPreview` fix comma/caps

5. **Double `<main>`** — Change to `<div>` in 5 files, preserving existing `className` and `role` attributes.

## Affected Areas

| Area | Impact | Files |
|------|--------|-------|
| LanguageSwitcher | Modified | `src/components/LanguageSwitcher/LanguageSwitcher.tsx` |
| Schema builder | Modified | `src/data/schema.ts` |
| Route meta | Modified | `src/data/route-meta.ts` |
| Spanish locales | Modified | 6 files in `src/locales/es/` |
| English locales | Modified | 6 files in `src/locales/en/` |
| Page shells | Modified | `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `PrivacyPage.tsx`, `CaseStudyTemplate.tsx` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Prerender script duplicates schema bug | Low | `prerender.mjs` mirrors schema logic; check after fixing |
| i18next key mismatch after adding `meta.description` | Low | Run `tsc --noEmit` + `pnpm dev` to verify resolution |
| Light mode contrast regressions in LanguageSwitcher | Low | Verify `text-text-muted` contrast in both themes |

## Rollback Plan
All changes are string/reference substitutions. Revert the commit. No data migrations, no API changes.

## Success Criteria
- [ ] LanguageSwitcher renders visible in both ES/EN and light/dark modes
- [ ] JSON-LD @graph contains resolved title/description strings, not i18n keys
- [ ] All 6 case studies have `<meta name="description">` in HTML
- [ ] Zero English strings remain in ES case study locale files (verified by grep)
- [ ] HTML validates: single `<main>` per page (verified by `pnpm build` output)
