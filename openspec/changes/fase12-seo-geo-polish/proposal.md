# Proposal: Fase 12 — SEO/GEO Fine-Tuning + New Content

## Intent

Boost GEO score 58→65-70/100: refine meta tags with keywords, expand on-page content, add BreadcrumbList schema, inject alt text in prerender, fix i18n routing bug, add missing portfolio items (Microsoft cert, geo-seo-opencode case study).

## Scope

### In Scope

- Per-route descriptive titles & meta descriptions with keywords
- Expanded /projects & /contact content (200+ words, new i18n keys)
- BreadcrumbList schema in prerender & schema.ts
- Alt text injection in prerender `<img>` tags
- AI Skills Fest 2026 certification card (AboutPage education)
- geo-seo-opencode project + case study (CLI tool, no demo link)
- CV download per active language (ES/EN)
- Fix routing: hardcoded paths → locale-prefixed `<Link>`/`<NavLink>`
- Final GEO audit (target 65-70/100)

### Out of Scope

- New pages/routes, SSR, design overhauls, tech stack additions

## Capabilities

### New

- `seo-meta`: per-route titles + descriptions with search keywords
- `seo-structured-data`: BreadcrumbList schema injection
- `seo-content`: expanded /projects and /contact descriptive sections

### Modified

- `prerender`: alt text in prerendered `<img>` tags
- `about-data`: 4th education card (certification), CV path per locale
- `projects`: geo-seo-opencode entry (no demo) + case study
- `routing`: locale-prefixed `<Link>`/`<NavLink>` paths

## Approach

1. Update `src/data/route-meta.ts` + i18n namespaces for keyword titles/descriptions
2. Add new i18n keys for expanded content on /projects and /contact
3. Update `scripts/prerender.mjs` + `src/data/schema.ts` for BreadcrumbList + alt text
4. Add AI Skills Fest to `src/data/about.ts` education + locale keys
5. Add geo-seo-opencode to `src/data/projects.ts` + case study feature + i18n
6. Make CV href dynamic in Header, HomePage, AboutPage via `i18n.language`
7. Wrap `<Link>`/`<NavLink>` paths with locale prefix utility
8. Run final GEO audit

## Affected Areas

| Area                                | Impact   |
| ----------------------------------- | -------- |
| `src/data/route-meta.ts`            | Modified |
| `src/data/schema.ts`                | Modified |
| `scripts/prerender.mjs`             | Modified |
| `src/locales/*/`                    | Modified |
| `src/data/about.ts`                 | Modified |
| `src/data/projects.ts`              | Modified |
| `src/features/projects-case-study/` | New      |
| `src/pages/AboutPage.tsx`           | Modified |
| `src/pages/HomePage.tsx`            | Modified |
| `src/components/layouts/Header.tsx` | Modified |

## Risks

| Risk                      | Likelihood | Mitigation                   |
| ------------------------- | ---------- | ---------------------------- |
| Prerender breaks          | Low        | Test with `pnpm run build`   |
| Routing fix causes 404s   | Med        | Manual nav test both locales |
| Breadcrumb schema invalid | Low        | Google Rich Results Test     |

## Rollback Plan

Revert feature branch before merging to develop. If merged, revert the merge commit.

## Dependencies

None (code + content only, no external services).

## Success Criteria

- [ ] GEO score reaches 65-70/100
- [ ] All 11 routes have unique titles & descriptions with keywords per locale
- [ ] /projects and /contact have 200+ words of content each
- [ ] BreadcrumbList passes Google Structured Data validation
- [ ] Prerendered pages have alt text on all `<img>` tags
- [ ] AI Skills Fest cert visible on AboutPage
- [ ] geo-seo-opencode in projects grid + case study works
- [ ] CV link changes with active language
- [ ] Nav links retain locale prefix in both ES and EN
