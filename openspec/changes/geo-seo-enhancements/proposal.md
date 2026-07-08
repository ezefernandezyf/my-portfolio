# Proposal: GEO & SEO Enhancements

## Intent

GEO score 20/100 (Critical) — crawlers see a blank SPA shell. Target: 60+/100. Make content visible to AI crawlers (ChatGPT, Perplexity, Gemini) and search engines without a framework migration.

## Scope

### In Scope (12 deliverables, 3 slices)

**Slice A — Prerender + Infra (~400 lines)**

1. Static prerender pipeline (11 routes × ES/EN = 22 pages)
2. Vercel security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
3. Vercel cache headers (immutable for hashed `/assets/*`)
4. hreflang alternate links in prerendered HTML

**Slice B — AI Visibility (~400 lines)** 5. JSON-LD `@graph` schema (Person, WebSite, WebPage, Project, Article) per route 6. Per-route unique meta tags in prerendered HTML (title, description, OG, Twitter, canonical) 7. `llms.txt` + `/.well-known/llms.txt` 8. MetaTags component adaptation (detect prerendered tags, avoid duplicates) 9. Sitemap expansion: all 11 routes with lastmod + changefreq

**Slice C — Design Fixes + Polish (~200 lines)** 10. Fix PrivacyPage CSS tokens (replace undefined tokens with `@theme` tokens from index.css) 11. Fix CaseStudyTemplate CSS tokens (same) 12. Sitemap submission verification

### Out of Scope

- Framework migration (no Next.js, Astro, Remix)
- Backend, API, or database
- New pages, features, or blog
- Dynamic SSR or serverless functions
- Content expansion (~5,280 words adequate)
- Role / font fixes (already correct on `main`)

## Capabilities

| Type | Name            | Description                                                             |
| ---- | --------------- | ----------------------------------------------------------------------- |
| New  | `prerender`     | Static prerender pipeline generating 22 HTML pages at build time        |
| New  | `seo-meta`      | Per-route meta, JSON-LD schema, hreflang, canonical in prerendered HTML |
| New  | `ai-visibility` | `llms.txt` + `/.well-known/llms.txt` for AI crawler guidance            |
| New  | `vercel-config` | Security + cache headers in `vercel.json`                               |
| New  | `sitemap`       | Expanded sitemap with all 11 routes, lastmod, changefreq                |

No existing specs to modify — first SDD cycle on this project.

## Approach

| Deliverable    | Approach                                                            |
| -------------- | ------------------------------------------------------------------- |
| Prerender      | Vite plugin (or `renderToStaticMarkup` script) — 22 pages × 2 langs |
| Headers        | `vercel.json` `headers` block                                       |
| Sitemap        | Static `public/sitemap.xml` — all 11 routes                         |
| hreflang       | `<link rel="alternate">` in prerendered `<head>` per locale         |
| JSON-LD        | Type-safe schema builder per route, injected in prerendered HTML    |
| Per-route meta | Route-to-meta mapping consumed by prerender + MetaTags              |
| llms.txt       | Static `public/llms.txt`                                            |
| MetaTags adapt | Keep client injection; detect prerendered tags to avoid dupes       |
| CSS token fix  | Rewrite PrivacyPage + CaseStudyTemplate to use `@theme` tokens      |

## Slice Map

| Slice | Lines | Depends On               |
| ----- | ----- | ------------------------ |
| **A** | ~400  | None                     |
| **B** | ~400  | A (needs prerender HTML) |
| **C** | ~200  | A, B                     |

Delivery: Stacked PRs to `develop`. PR#1 → `develop`, subsequent slices rebased on `develop`.

## Affected Areas

| Area                                       | Impact   | Description                       |
| ------------------------------------------ | -------- | --------------------------------- |
| `vite.config.ts`                           | Modified | Add prerender plugin / build step |
| `vercel.json`                              | Modified | Add security + cache headers      |
| `public/sitemap.xml`                       | Replaced | 11 routes, lastmod, changefreq    |
| `public/llms.txt`                          | New      | AI crawler guidance               |
| `public/.well-known/llms.txt`              | New      | Well-known AI endpoint            |
| `src/components/MetaTags/MetaTags.tsx`     | Modified | Prerender tag dedup               |
| `src/data/schema.ts`                       | New      | JSON-LD builder                   |
| `src/data/route-meta.ts`                   | New      | Per-route meta mapping            |
| `src/pages/PrivacyPage.tsx`                | Modified | CSS token fix                     |
| `src/pages/Projects/CaseStudyTemplate.tsx` | Modified | CSS token fix                     |

## Risks

| Risk                               | Likelihood | Mitigation                                      |
| ---------------------------------- | ---------- | ----------------------------------------------- |
| Prerender breaks hydration         | Medium     | Test all 22 pages; Playwright fallback          |
| Vite plugin incompatible w/ Vite 7 | Medium     | Evaluate before Slice A; custom script fallback |
| Build time increase                | Low        | 22 pages — negligible                           |

## Rollback Plan

**Per slice**: Each PR is self-contained. Revert the PR → deploy from `develop`. Prerender is opt-in (new build step), so reverting `vite.config.ts` restores SPA-only instantly.

**Full rollback**: `git revert` merge commit on `develop` + push. Vercel auto-deploys previous state.

## Dependencies

Prerender is THE blocker — Slice A must ship before B or C.

## Success Criteria

- [ ] All 22 pages return prerendered HTML with unique `<title>` + `<meta>`
- [ ] JSON-LD validates (Schema.org / Google Rich Results)
- [ ] GEO score ≥ 60/100 (re-audit)
- [ ] All 11 routes in sitemap, valid XML
- [ ] hreflang correct for ES/EN pairs
- [ ] `llms.txt` serves at both URLs
- [ ] Security + cache headers present in Vercel responses
- [ ] PrivacyPage + CaseStudyTemplate render with correct design tokens

## Review Workload Forecast

| Slice | Budget | Forecast   | Risk                                   |
| ----- | ------ | ---------- | -------------------------------------- |
| A     | 400    | ~400 lines | Medium — prerender plugin config risky |
| B     | 400    | ~400 lines | Low — schema + meta well-defined       |
| C     | 200    | ~200 lines | Low — CSS fixes + verification         |

**Decision needed before apply**: No (auto-chain confirmed by user).
**Chained PRs recommended**: Yes — 3 stacked PRs to `develop`.
**400-line budget risk**: Medium (Slice A).
