# Delta for geo-seo-enhancements

> 5 NEW capabilities — no existing specs. First SDD cycle on this project.

## Purpose

Static prerender + AI visibility + design fixes for the GEO 20/100 → 60+/100 target. Content must be visible to crawlers without framework migration. Delivered as 3 stacked PR slices; below organized by slice.

---

## ADDED Requirements — Slice A: Prerender + Infra

### Requirement: Static Prerender Pipeline

The build MUST generate valid, self-contained HTML for all 22 prerendered pages (11 routes × ES/EN locales). Prerendered HTML MUST contain full text content and per-route meta tags, NOT only `<div id="root"></div>`. If the Vite prerender plugin fails, the build SHALL fall back to a Playwright-based generation script.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| All pages prerendered | A production build runs | Build completes | All 22 `.html` files exist under `dist/` with full text content |
| Content visible in HTML | A prerendered page is served | A crawler fetches it | `<body>` contains text content, not an empty root div |
| Meta in prerendered HTML | Homepage is prerendered | A crawler fetches it | `<head>` contains `<title>`, `<meta name="description">`, and canonical link |
| Plugin failure fallback | The Vite prerender plugin errors | Build continues | Playwright script generates the 22 pages; build succeeds |

### Requirement: Vercel Security Headers

`vercel.json` MUST serve security headers on ALL responses: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Headers present | A request hits any route | Response is served | All 4 security headers are present in the HTTP response |

### Requirement: Vercel Cache Headers

Hashed `/assets/*` responses MUST include `Cache-Control: public, max-age=31536000, immutable`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Asset cache | Browser requests a hashed JS bundle | Response is served | `Cache-Control` header contains `immutable` and 1-year max-age |

### Requirement: hreflang Alternate Links

Every prerendered page MUST include `<link rel="alternate" hreflang="...">` for both `es` and `en` locales, pointing to the canonical URL for each language.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| ES page hreflang | A crawler fetches `/about` (ES default) | HTML is parsed | `<link rel="alternate" hreflang="es">` points to `/about`, `<link rel="alternate" hreflang="en">` points to `/en/about` |
| EN page hreflang | A crawler fetches `/en/about` | HTML is parsed | `<link rel="alternate" hreflang="en">` points to `/en/about`, `<link rel="alternate" hreflang="es">` points to `/about` |

---

## ADDED Requirements — Slice B: AI Visibility

### Requirement: JSON-LD Structured Data

Every prerendered page MUST include a `<script type="application/ld+json">` block with an `@graph` containing `Person`, `WebSite`, and `WebPage` types. The schema MUST validate against schema.org.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| JSON-LD present | Any prerendered page is loaded | Head is inspected | A valid `@graph` script tag exists with Person, WebSite, and WebPage nodes |
| Schema valid | The JSON-LD is extracted | Validated against schema.org | No errors; all required properties present |

### Requirement: Per-Route Unique Meta Tags

Each prerendered page MUST have a unique `<title>` and `<meta name="description">`. Every page MUST include `og:title`, `og:description`, `og:image`, `og:url`, `og:type` and `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Every page MUST include `<link rel="canonical">`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Unique titles | Two different routes are prerendered | Both pages are inspected | `<title>` text differs between them |
| OG and Twitter cards | Homepage is prerendered | Head is inspected | All OG and Twitter meta tags are present with correct values |
| Canonical present | Any page is prerendered | Head is inspected | `<link rel="canonical">` points to the page's canonical URL |

### Requirement: llms.txt for AI Crawlers

`llms.txt` MUST exist at both `/llms.txt` and `/.well-known/llms.txt`. It MUST summarize site sections, projects, and skills in a structured format suitable for AI crawler ingestion.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| llms.txt served | An AI crawler requests `/llms.txt` | Response is returned | 200 OK with markdown summarizing site content, projects, and skills |
| Well-known endpoint | An AI crawler requests `/.well-known/llms.txt` | Response is returned | Same content as `/llms.txt` |

### Requirement: Expanded Sitemap

The sitemap MUST include all 11 routes with `<lastmod>` and `<changefreq>` elements. The sitemap MUST include `xhtml:link` hreflang annotations for ES/EN pairs.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| All routes listed | Sitemap is fetched | XML is parsed | 11 `<url>` entries exist, each with `<lastmod>` and `<changefreq>` |
| Hreflang in sitemap | Sitemap is fetched | XML is parsed | Each URL entry includes `<xhtml:link>` for alternate language |

### Requirement: MetaTags Component Adaptation

The `MetaTags` component MUST detect metadata already present in prerendered HTML and SHALL NOT inject duplicate `<title>` or `<meta>` tags. It MUST still update `document.title` on client-side SPA navigation.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| No duplicate meta | A prerendered page loads | MetaTags mounts | No duplicate `<title>` or `<meta>` elements are added to `<head>` |
| Client-title update | User navigates from /about to /projects | SPA route changes | `document.title` updates to the new page's title |

---

## ADDED Requirements — Slice C: Design Fixes

### Requirement: CSS Token Fix — PrivacyPage

`PrivacyPage` MUST render with CSS tokens defined in `src/index.css` `@theme`. Any token not defined in `@theme` MUST be replaced with an equivalent defined token.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Valid tokens | PrivacyPage renders | Styles are applied | All CSS custom properties resolve; no undefined-token warnings |
| Appearance unchanged | PrivacyPage renders before and after the fix | Visual output is compared | Layout, colors, and spacing are visually identical |
| Tests pass | Token fix is applied | `pnpm test` runs | All existing PrivacyPage tests pass |

### Requirement: CSS Token Fix — CaseStudyTemplate

`CaseStudyTemplate` MUST render with CSS tokens defined in `src/index.css` `@theme`. Any token not defined in `@theme` MUST be replaced with an equivalent defined token.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Valid tokens | CaseStudyTemplate renders | Styles are applied | All CSS custom properties resolve; no undefined-token warnings |
| Appearance unchanged | CaseStudyTemplate renders before and after the fix | Visual output is compared | Layout, colors, and spacing are visually identical |
| Tests pass | Token fix is applied | `pnpm test` runs | All existing CaseStudyTemplate tests pass |
