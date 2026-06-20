# Proposal: GEO & SEO Enhancements

## Intent

GEO score is 20/100 (Critical) — crawlers see a blank SPA shell. Target: 60+/100. Make content visible to AI crawlers (ChatGPT, Perplexity, Gemini) and search engines without a framework migration.

## Scope

### In Scope (12 deliverables, 3 slices)

**Slice A — Prerender + Infra (~400 lines)**
1. Static prerender build pipeline (18 pages: 9 routes × ES/EN)
2. Vercel security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
3. Vercel cache headers (immutable for hashed assets)
4. Sitemap expansion (9 routes + lastmod + changefreq)
5. hreflang alternate links in prerendered HTML

**Slice B — AI Visibility (~400 lines)**
6. JSON-LD `@graph` schema (Person, WebSite, WebPage, Project, Article) in every prerendered page
7. Per-route unique title, description, OG, Twitter, canonical in prerendered HTML
8. llms.txt + `/.well-known/llms.txt`
9. MetaTags component adaptation for client-side SPA navigation

**Slice C — Content Polish (~200 lines)**
10. Role consistency fix (about.ts → "Full Stack Developer")
11. Font consistency fix (index.html vs design tokens)
12. Design audit checklist (meta dedup, OG alt, etc.)

### Out of Scope
- Framework migration (no Next.js, Astro, Remix)
- Backend, API, or database
- New pages, features, or blog
- Dynamic SSR or serverless functions

## Capabilities

### New Capabilities
- `prerender`: Static prerender build pipeline generating 18 HTML pages at build time
- `seo-meta`: Per-route meta tags, JSON-LD schema, hreflang, and canonical in prerendered HTML
- `ai-visibility`: llms.txt and `/.well-known/llms.txt` for AI crawler guidance
- `vercel-config`: Security and cache headers in vercel.json
- `sitemap`: Expanded sitemap with all routes, lastmod, and changefreq

### Modified Capabilities
None — first SDD cycle. No existing specs to modify.

## Approach

| Deliverable | Approach |
|---|---|
| Prerender | Vite plugin (e.g., `vite-plugin-ssr`-compatible or manual renderToStaticMarkup build step) — generate HTML per route at build time |
| Headers | `vercel.json` `headers` block — CSP, security, cache via source patterns |
| Sitemap | Static `public/sitemap.xml` — all 9 routes × 2 langs with `<lastmod>` + `<changefreq>` |
| hreflang | Inline `<link rel="alternate" hreflang="es/en">` in prerendered `<head>` per locale |
| JSON-LD | Type-safe schema builder function generating `@graph` per route; injected in prerendered HTML |
| Per-route meta | Route-to-meta mapping (title, desc, OG, Twitter, canonical) used by prerender step and MetaTags |
| llms.txt | Static `public/llms.txt` listing site structure, key pages, and AI guidance |
| MetaTags adapt | Keep current `useEffect`-based injection for client nav; prefetch route meta data |

## Slice Map

| Slice | Deliverables | Est. Lines | Depends On |
|---|---|---|---|
| **A** | Prerender pipeline + Vercel headers + sitemap + hreflang | ~400 | None — foundation |
| **B** | JSON-LD + per-route meta + llms.txt + MetaTags adapt | ~400 | A (needs prerender HTML) |
| **C** | Role fix + font fix + design audit | ~200 | A, B (content delivered) |

Delivery: Stacked PRs to `develop`. PR#1 `feat/geo-seo-enhancements/slice-a` → `develop`, PR#2 `slice-b` → `develop`, etc.

## Affected Areas

| Area | Impact | Changes |
|---|---|---|
| `vite.config.ts` | Modified | Add prerender plugin or build step |
| `vercel.json` | Modified | Add headers block (security + cache) |
| `index.html` | Modified | Clean meta, add font consistency |
| `public/sitemap.xml` | Replaced | All 9 routes, lastmod, changefreq |
| `public/llms.txt` | New | AI crawler guidance file |
| `public/.well-known/llms.txt` | New | Well-known AI endpoint |
| `src/components/MetaTags/MetaTags.tsx` | Modified | Adapt for prerender compatibility |
| `src/data/about.ts` | Modified | Role consistency |
| `src/data/schema.ts` | New | JSON-LD schema builder |
| `src/data/route-meta.ts` | New | Per-route meta mapping |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Prerender breaks React hydration | Medium | Test every route; use well-maintained plugin; keep JS interactive |
| i18n URL conflicts with existing routing | Medium | `es` = no prefix (current default), `/en/...` = English; test all redirects |
| Vite plugin incompatible with Vite 7 | Medium | Evaluate plugin before Slice A; fallback to Playwright script |
| Build time increase | Low | 18 pages — negligible for static prerender |

## Rollback Plan

**Per slice**: Each PR is self-contained. Revert the PR → deploy from `develop`. Prerender is opt-in (new build step), so reverting `vite.config.ts` changes restores SPA-only behavior instantly with zero impact on current users.

**Full rollback**: `git revert` the merge commit on `develop` + push. Vercel auto-deploys previous state. No data migration needed — all content is static.

## Dependencies

- **Prerender is THE blocker** — Slice A must ship before B or C. Without prerendered HTML, JSON-LD and per-route meta are invisible to crawlers.
- **Delivery strategy**: `auto-chain` — 3 stacked PRs, each under 400 lines.

## Success Criteria

- [ ] All 18 pages return prerendered HTML with unique `<title>` and `<meta>` tags
- [ ] JSON-LD schema validates (Google Rich Results Test / Schema.org validator)
- [ ] GEO score ≥ 60/100 (re-audit)
- [ ] All 9 routes appear in sitemap, valid XML
- [ ] hreflang links correct for ES/EN pairs
- [ ] llms.txt loads at `/llms.txt` and `/.well-known/llms.txt`
- [ ] Security headers present in Vercel response (CSP, X-Frame-Options, etc.)
- [ ] Cache headers set for hashed assets (immutable, 1 year)
- [ ] Role reads "Full Stack Developer" everywhere
- [ ] Fonts consistent between index.html and design tokens

## Review Workload Forecast

| Slices | Budget | Forecast | Risk |
|---|---|---|---|
| A | 400 lines | ~400 lines | Medium — prerender plugin config risky |
| B | 400 lines | ~400 lines | Low — schema + meta is well-defined |
| C | 400 lines | ~200 lines | Low — content fixes only |

**Decision needed before apply**: No (auto-chain confirmed by user).  
**Chained PRs recommended**: Yes — 3 stacked PRs to `develop`.  
**400-line budget risk**: Medium (Slice A). Slices B and C are Low.  

Each slice is an independent review unit with clear start/finish and autonomous rollback. PR#1 targets `develop`, subsequent slices target `develop` (clean rebase each).
