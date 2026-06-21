# Design: GEO & SEO Enhancements

## Technical Approach

Static prerender via custom Vite plugin + `react-dom/server` `renderToStaticMarkup` generating 22 HTML pages (11 routes × ES/EN) post-build. Zero new production deps — `jsdom` 28.1.0 (already dev dep for RTL) provides the DOM environment; `react-dom` (already bundled) provides server rendering. JSON-LD schema and per-route meta are injected at build time, consumed by both prerender and client-side MetaTags via a shared `route-meta.ts` mapping. i18n implemented as URL-path prefix (`/en/...` for English, root for Spanish). Design token mismatch on PrivacyPage/CaseStudyTemplate resolved by mapping orphaned Material Design 3 tokens to the project's existing `@theme` tokens — DaisyUI was listed in docs but never actually in `package.json`.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `vite-plugin-prerender` | Vite 2-4, dead since 2022 | ❌ |
| `@preact/prerender-vite` | Requires Preact, not React | ❌ |
| Custom Vite `closeBundle` plugin + `renderToStaticMarkup` | Full control; zero new deps; jsdom already present | ✅ |
| `renderToString` (with hydration) | Larger HTML; hydration mismatch risk with SSR-less SPA | ❌ |
| `renderToStaticMarkup` (no hydration) | ~5-8% smaller; SPA mounts fresh — prerender for crawlers only | ✅ |

| Option | Tradeoff | Decision |
|--------|----------|----------|
| i18n via `/en/...` URL prefix | Requires vercel.json rewrite + React Router `/en/*` route group | ✅ Needed for hreflang |
| i18n via localStorage-only | No routing changes; invisible to crawlers | ❌ |
| ES as root, EN as prefix | Minimal AppRoutes changes; Vercel rewrites map `/en/*` → `/en/*/index.html` | ✅ |

## Prerender Pipeline

```
vite build
  ├─ tsc -b          ← typecheck
  ├─ [buildEnd]      ← rollup outputs dist/assets/
  └─ [closeBundle]   ← custom plugin triggers scripts/prerender.mjs
       │
       ├─ Import i18n resources + route-meta + schema builders
       ├─ for each (route, lang) in 22 combinations:
       │   ├─ new JSDOM(template) → document
       │   ├─ i18next.init({ lng: lang, resources }) 
       │   ├─ StaticRouter + App shell → renderToStaticMarkup
       │   ├─ Inject meta, JSON-LD, hreflang, canonical into <head>
       │   └─ write dist/{prefix}/{route}/index.html
       └─ Fallback: Playwright render script if any page fails
```

**Output structure** — Vercel serves as static files via rewrites:
```
dist/
├── index.html → redirect
├── home/index.html              ← ES
├── en/home/index.html           ← EN
├── projects/index.html
├── projects/echolog/index.html
├── en/projects/echolog/index.html
... (22 total)
```

**vercel.json — i18n rewrites + headers:**
```json
{
  "rewrites": [
    { "source": "/en/:path*", "destination": "/en/:path*/index.html" },
    { "source": "/((?!en/).*)", "destination": "/$1/index.html" }
  ],
  "headers": [
    { "source": "/assets/(.*)", "headers": [
      { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
    ]},
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]}
  ]
}
```

## New Module Interfaces

**`src/data/route-meta.ts`** — shared mapping consumed by prerender + MetaTags:
```typescript
type SchemaType = 'Person' | 'WebSite' | 'WebPage' | 'Project' | 'Article';

interface RouteMeta {
  pathname: string;       // "/projects/echolog"
  titleI18nKey: string;   // "echologcasestudy:meta.title"
  descI18nKey: string;    // "echologcasestudy:meta.description"
  ogImage?: string;       // default: "/og-image.png"
  schema: SchemaType[];   // ["Person","WebPage","Article"]
  noIndex?: boolean;      // true for /not-found
}

export const ROUTE_META: Record<string, RouteMeta>; // 11 entries + EN variants
```

**`src/data/schema.ts`** — type-safe JSON-LD `@graph` builder:
```typescript
export function buildJsonLdGraph(
  route: RouteMeta, lang: string, siteUrl: string
): string;
// Returns '<script type="application/ld+json">{"@context":"...","@graph":[...]}</script>'
```

**MetaTags adaptation**: Prerendered tags carry `data-prerendered="true"`. `setOrCreateMeta` checks this attribute on existing elements and skips creation. `document.title` still updates on SPA navigation. Also fix line 15 `DEFAULT_DESC` from "Front-end Developer" → "Full Stack Developer".

## Design Token Mapping (Slice C)

Orphaned MD3 tokens in PrivacyPage + CaseStudyTemplate are NOT DaisyUI — `daisyui` never existed in `package.json`. Each maps to an existing `@theme` token:

| Broken MD3 Token | Replacement |
|-----------------|-------------|
| `text-on-surface` | `text-[var(--color-text-primary)]` |
| `text-on-surface-variant` | `text-[var(--color-text-secondary)]` |
| `text-outline` | `text-[var(--color-text-muted)]` |
| `text-primary` / `text-primary-fixed` | `text-[var(--color-accent)]` |
| `text-on-primary` | `text-[var(--color-bg-primary)]` |
| `bg-surface-container-lowest` | `bg-[var(--color-bg-primary)]` |
| `bg-surface-container-low` | `bg-[var(--color-surface)]` |
| `bg-surface-container-high` | `bg-[var(--color-surface-elevated)]` |
| `border-outline-variant/20` | `border-[color-mix(in_srgb,var(--color-border)_20%,transparent)]` |
| `font-headline` | `.font-display` |

Also replace local `fadeInUp()` functions with `.animate-fade-in-up` CSS class + inline delay style.

## File Changes

| File | Action | Lines |
|------|--------|-------|
| `vite.config.ts` | Modify — add custom prerender plugin | +20 |
| `scripts/prerender.mjs` | Create — jsdom + renderToStaticMarkup + route loop | ~150 |
| `src/data/route-meta.ts` | Create — 11-route meta mapping | ~80 |
| `src/data/schema.ts` | Create — JSON-LD @graph builder | ~100 |
| `vercel.json` | Modify — i18n rewrites + security/cache headers | +25 |
| `src/components/MetaTags/MetaTags.tsx` | Modify — skip prerendered tags; fix DEFAULT_DESC | +15 |
| `src/routes/AppRoutes.tsx` | Modify — add `/en/*` route group wrapping existing routes | +30 |
| `public/sitemap.xml` | Replace — 22 URLs + hreflang + lastmod/changefreq | ~80 |
| `public/llms.txt` | Create — AI crawler site summary | ~40 |
| `public/.well-known/llms.txt` | Create — same content | ~40 |
| `src/pages/PrivacyPage.tsx` | Modify — token mapping + animation unification | ~50 |
| `src/pages/Projects/CaseStudyTemplate.tsx` | Modify — token mapping + animation unification | ~110 |

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Unit | `route-meta.ts` entries | Vitest: assert each has titleI18nKey + descI18nKey |
| Unit | `schema.ts` output | Vitest: snapshot `@graph` structure; validate with schema.org |
| Unit | Token-fixed pages render | Existing PrivacyPage + CaseStudyTemplate RTL tests pass |
| Integration | Prerender produces 22 files | Shell check: `ls dist/**/index.html \| wc -l` |
| E2E | Crawler sees content | `curl localhost:4173/home/ | grep "Full Stack"` |

## Open Questions

- [ ] CSP `default-src 'self'` may break Google Fonts (`fonts.googleapis.com`) and EmailJS. Determine exact policy during apply — likely need `font-src https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`.
- [ ] `jsdom` 28 handles ES module imports in prerender script? May need to use `createRequire` or run as `.mjs` with dynamic `import()`. Verify during Slice A apply.
