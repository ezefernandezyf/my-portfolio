# Tasks: Fase 13 — Final Polish

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~330-370 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR (6 slices, content + tooling, no behavioral changes) |
| Delivery strategy | ask-always |
| Chain strategy | single-pr (applied) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Notes |
|------|------|-------|
| 1 | Expand i18n content (7 paragraphs + 2 short texts, ES+EN) | Locale JSONs only |
| 2 | Add contact paragraph3 rendering | ContactPage.tsx + prerender.mjs |
| 3 | Fix prerender about descKey bug | 1-line fix in prerender.mjs |
| 4 | Auto-generate sitemap script + regenerate sitemap.xml | New script + regenerated file |
| 5 | Update llms.txt | Add missing content |
| 6 | Verify + lint + test + build | No GEO audit — paused |

## Phase 1: Content Expansion (Locale JSONs)

- [x] 1.1 Expand `src/locales/es/projects.json` contentSection.paragraph1-3 + header.subtitle to 180-200w (ES)
- [x] 1.2 Expand `src/locales/en/projects.json` contentSection.paragraph1-3 + header.subtitle to 180-200w (EN)
- [x] 1.3 Expand `src/locales/es/contact.json` contentSection.paragraph1-2 + hero.description to 180-200w (ES)
- [x] 1.4 Expand `src/locales/en/contact.json` contentSection.paragraph1-2 + hero.description to 180-200w (EN)
- [x] 1.5 Add `contentSection.paragraph3` to `src/locales/es/contact.json` — process & values, enterprise tone (ES)
- [x] 1.6 Add `contentSection.paragraph3` to `src/locales/en/contact.json` — process & values, enterprise tone (EN)

## Phase 2: Rendering Updates

- [x] 2.1 Update `src/pages/ContactPage.tsx` to render `t('contentSection.paragraph3')` below paragraph2
- [x] 2.2 Update `scripts/prerender.mjs` to read and render `contentSection.paragraph3` in the contact section handler

## Phase 3: Bugfix — Prerender about descKey

- [x] 3.1 Fix `scripts/prerender.mjs` L35: change `descKey: 'meta.title'` → `'meta.description'` for the /about route entry

## Phase 4: Sitemap Automation

- [x] 4.1 Create `scripts/generate-sitemap.mjs` — reads route-meta.ts ROUTE_KEYS + priority/changefreq, outputs `public/sitemap.xml` with 24 URLs × hreflang (exclude not-found)
- [x] 4.2 Run `node scripts/generate-sitemap.mjs` to regenerate `public/sitemap.xml`

## Phase 5: llms.txt Update

- [x] 5.1 Update `public/llms.txt` — add geo-seo-opencode project, AI Skills Fest 2026 cert, refreshed skills, complete 12-route table

## Phase 6: Verification

- [x] 6.1 Word count check — verify all 7 paragraphs reach 180-200w, ContactPage shows 3 paragraphs
- [x] 6.2 Prerender verify — confirm /about og:description uses meta.description, not meta.title
- [x] 6.3 Sitemap verify — confirm 22 URL entries (11 routes × 2 locales), not-found excluded, hreflang correct
- [x] 6.4 Run `pnpm run lint`, `pnpm test`, `pnpm run build` — all pass

## Post-verification (paused, user confirmation needed)

- [ ] P1 Run GEO audit final via geo-audit skill (user confirms after items 1-5 deployed to production)
