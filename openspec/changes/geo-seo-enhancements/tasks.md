# Tasks: GEO & SEO Enhancements

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-develop
400-line budget risk: Medium

| Field                   | Value                                       |
| ----------------------- | ------------------------------------------- |
| Estimated changed lines | ~225 (A) + ~375 (B) + ~160 (C) = ~760 total |
| 400-line budget risk    | Medium                                      |
| Chained PRs recommended | Yes                                         |
| Delivery strategy       | stacked-to-develop                          |
| Chain strategy          | stacked-to-develop                          |

### Suggested Work Units

| Unit | Goal               | Likely PR      | Base    | Notes                                                        |
| ---- | ------------------ | -------------- | ------- | ------------------------------------------------------------ |
| 1    | Prerender + infra  | PR A → develop | develop | vite plugin, prerender.mjs, vercel.json, AppRoutes EN routes |
| 2    | AI visibility data | PR B → develop | develop | route-meta, schema, llms.txt, sitemap, MetaTags adapt        |
| 3    | Design token fixes | PR C → develop | develop | PrivacyPage + CaseStudyTemplate CSS mapping                  |

## Slice A — Prerender + Infrastructure

- [x] A1. Add `/en/*` route group in `AppRoutes.tsx` wrapping all routes (ES root, EN under `/en/...`). File: `src/routes/AppRoutes.tsx`. Effort: S.
- [x] A2. Add i18n rewrites + security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP) + immutable cache to `vercel.json`. File: `vercel.json`. Deps: A1. Effort: S.
- [x] A3. Register `closeBundle` Vite plugin in `vite.config.ts` that invokes `scripts/prerender.mjs`. File: `vite.config.ts`. Effort: S.
- [x] A4. Create `scripts/prerender.mjs` — jsdom + `renderToStaticMarkup` loop for 22 pages, i18n content per locale. File: `scripts/prerender.mjs`. Deps: A3. Effort: L.
- [x] A5. Inject hreflang `<link rel="alternate" hreflang="es|en">` in prerendered `<head>`. File: `scripts/prerender.mjs`. Deps: A4. Effort: S.
- [x] A6. Verify: `pnpm build` → 22 HTML files with text content + hreflang; `pnpm test` passes. Effort: S.

## Slice B — AI Visibility

- [x] B1. Create `src/data/route-meta.ts` — `RouteMeta` interface + 11-route meta mapping with i18n keys, schema types, ogImage. File: `src/data/route-meta.ts`. Effort: M.
- [x] B2. Create `src/data/schema.ts` — `buildJsonLdGraph()` returning `<script type="application/ld+json">` with Person, WebSite, WebPage nodes. File: `src/data/schema.ts`. Effort: M.
- [x] B3. Update prerender to inject per-route title, description, OG, Twitter, canonical from route-meta. File: `scripts/prerender.mjs`. Deps: B1. Effort: S.
- [x] B4. Update prerender to inject JSON-LD `@graph` block into `<head>`. File: `scripts/prerender.mjs`. Deps: B2. Effort: S.
- [x] B5. Create `public/llms.txt` and `public/.well-known/llms.txt` with AI crawler site summary. File: `public/llms.txt`, `public/.well-known/llms.txt`. Effort: S.
- [x] B6. Replace `public/sitemap.xml` — 22 URLs with hreflang, lastmod, changefreq. File: `public/sitemap.xml`. Effort: S.
- [x] B7. Update `MetaTags.tsx` — skip elements with `data-prerendered="true"`; fix `DEFAULT_DESC` to "Full Stack Developer". File: `src/components/MetaTags/MetaTags.tsx`. Deps: B3. Effort: M.
- [x] B8. Verify: `pnpm build` → unique meta per page, valid JSON-LD; `pnpm test` passes; no dupe meta. Effort: S.

## Slice C — Design Token Fixes

- [x] C1. Replace orphaned MD3 tokens in `PrivacyPage.tsx` with `@theme` equivalents per design mapping. File: `src/pages/PrivacyPage.tsx`. Effort: S.
- [x] C2. Replace orphaned MD3 tokens in `CaseStudyTemplate.tsx`; replace local `fadeInUp()` with `.animate-fade-in-up`. File: `src/pages/Projects/CaseStudyTemplate.tsx`. Effort: M.
- [x] C3. Verify: `pnpm test` passes; both pages render with correct tokens; no visual regression. Effort: S.
