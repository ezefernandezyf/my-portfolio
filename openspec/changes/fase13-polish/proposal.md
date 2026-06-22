# Proposal: Fase 13 — Final Polish

## Intent

Five outstanding fixes from Fase 12 verification — content too thin, prerender bug, sitemap missing routes, llms.txt stale — plus GEO audit final.

## Scope

### In Scope
1. **Expand 7 paragraphs + 2 short texts** (ES+EN) to 180-200w substantive content: projects contentSection.paragraph1-3, projects header.subtitle, contact contentSection.paragraph1-2, contact hero.description
2. **Add 3rd paragraph** to ContactPage contentSection — process, testing, code review, continuous improvement
3. **Fix prerender about descKey** — line 35 emits `meta.title` instead of `meta.description` as og:description
4. **Auto-generate sitemap** from `route-meta.ts` — script reads all 12 routes × 2 locales = 24 URLs
5. **Update llms.txt** — add geo-seo-opencode, AI Skills Fest 2026 cert, refreshed skills list, complete route table
6. **GEO audit final** — paused; run after confirmation that items 1-5 are in production

### Out of Scope
- New pages/routes, SSR, design overhauls, tech stack changes

## Capabilities

### New Capabilities
None — content expansion + config fixes, no new behavioral specs.

### Modified Capabilities
None — all changes are content or tooling, existing behavior unchanged.

## Approach

1. Write expanded i18n content in ES (7 paragraphs + 2 short texts), translate to EN matching the established professional tone
2. Fix `scripts/prerender.mjs` L35: `descKey: 'meta.title'` → `'meta.description'` for /about route
3. Create `scripts/generate-sitemap.mjs` reading `route-meta.ts` ROUTE_KEYS, output `public/sitemap.xml` with hreflang
4. Update `public/llms.txt`: add missing project, cert, skill rows, route entries
5. Run GEO audit via GEO skill workflow (user confirms timing)

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/locales/{es,en}/projects.json` | Modified | contentSection.paragraph1-3 + header.subtitle |
| `src/locales/{es,en}/contact.json` | Modified | contentSection.paragraph1-3 + hero.description |
| `scripts/prerender.mjs` | Modified | L35 about descKey bugfix |
| `scripts/generate-sitemap.mjs` | New | Reads route-meta.ts, writes public/sitemap.xml |
| `public/sitemap.xml` | Regenerated | 12 routes × 2 locales = 24 URLs |
| `public/llms.txt` | Modified | Add missing content |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content sounds padded | Low | Write naturally, no filler, target 180-200w |
| Sitemap script desyncs from routes | Low | Reads canonical route-meta.ts at build time |
| i18n key mismatch in page renders | Low | Verify keys match in both locales + components |

## Rollback Plan

Revert feature branch. Sitemap: keep backup of current manual `public/sitemap.xml`.

## Dependencies

None — code + content only, no external services.

## Success Criteria

- [ ] All 7 paragraphs reach 180-200 words (ES+EN) without filler
- [ ] ContactPage renders 3 paragraphs in contentSection
- [ ] Prerendered /about og:description matches meta.description (not title)
- [ ] sitemap.xml has 24 URLs with correct hreflang
- [ ] llms.txt includes geo-seo-opencode, AI Skills Fest 2026, all 12 routes
- [ ] `pnpm run lint` passes, `pnpm test` passes, `pnpm run build` succeeds
