# Design: Fase 12 — SEO/GEO Fine-Tuning + New Content

## Technical Approach

Seven independent domains converge on one outcome: push GEO from 58→65-70. Each domain modifies isolated files — route metadata, i18n namespaces, prerender script, navigation components — with minimal cross-domain coupling. A single `useLocalizedPath` hook is the only new shared abstraction.

## Architecture Decisions

| Domain | Choice | Rejected | Rationale |
|--------|--------|----------|-----------|
| Routing | `useLocalizedPath()` hook returning `(path) => string` | HOC wrapper, custom `<LocalizedLink>` component | Existing code uses `<Link>`/`<NavLink>` directly; a utility callback is least invasive. NavLink's `className({isActive})` works because React Router matches `to=/en/projects` against current URL. |
| BreadcrumbList | Build breadcrumb items from route path segments, resolve names via `tr()` in prerender | Static per-route breadcrumb arrays | Already have locale resolution in prerender — reuse it. Top-level routes get 2 items (Home → Page), case studies get 3 (Home → Projects → CaseStudy). |
| Alt text injection | JSDOM post-render scan in `injectIntoHtml` before file write | React-side injection via components | Prerender runs React once; post-processing HTML is simpler than threading alt props through every component. |
| Expanded content | i18n keys under `projects:content.*` and `contact:process.*`, rendered in page components AND `buildPageContent` | Separate content-only components | Dual rendering (SPA + prerender) requires both React component and prerender builder to emit the same text. |
| CV lang routing | Ternary on `i18n.language` (useTranslation hook already imported in all 3 components) | New hook or context | Three components already use `useTranslation` — just add the inline resolution. No new abstraction needed. |
| Optional demo | Empty string `''` in data, `demo?: string` in `Project` type | Conditional type unions | ProjectCard already checks `{demo && ...}` — empty string is falsy. Making field optional in interface is backward-compatible. |
| geo-seo-opencode case study | Follow existing pattern: namespace file + `buildCaseStudyContent` entry + route registration | New case study page component | Existing `CaseStudyTemplate` + `ProjectCaseStudyPage` handle all rendering via namespace keys. Zero new React code. |

## Hook Design: `useLocalizedPath`

```typescript
// src/hooks/useLocalizedPath.ts
import { useTranslation } from 'react-i18next';
export function useLocalizedPath() {
  const { i18n } = useTranslation();
  return (path: string): string =>
    i18n.language === 'en' ? `/en${path}` : path;
}
```

**Integration**: all 22 `<Link to>` / `<NavLink to>` instances across Header (5 NavLinks + 1 logo + 3 drawer), HomePage (3 CTAs), AboutPage (2 CTAs) replace `to="/path"` with `to={localize('/path')}`. Logo special-cased: `to={localize('/home')}`.

## Data Flow

```
route-meta.ts (keywords + titles)
  ├─→ MetaTags.tsx (client: <title>, <meta description>)
  ├─→ prerender.mjs (static: injectIntoHtml, buildJsonLdScript, alt scan)
  │     └─→ dist/*/index.html (crawler-ready)
  └─→ schema.ts (client-side JSON-LD, BreadcrumbList)

i18n.language
  ├─→ useLocalizedPath() → Link to={localize('/path')}
  ├─→ CV path: i18n.language === 'en' ? 'CV_EN.pdf' : 'CV.pdf'
  └─→ Breadcrumb names (via tr() in prerender)

projects.ts + about.ts (data layer)
  └─→ projectRepository / about constant → pages render
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useLocalizedPath.ts` | Create | Hook: prepends `/en` when EN active |
| `src/data/route-meta.ts` | Modify | Add `keywords` field + geo-seo-opencode entry; fix descI18nKey pointing to title keys |
| `src/data/schema.ts` | Modify | Add `buildBreadcrumbList()` function, integrate into `buildJsonLdGraph` |
| `src/data/about.ts` | Modify | 4th education entry (AI Skills Fest); `cv` field left as-is (dynamic resolution in components) |
| `src/data/projects.ts` | Modify | Add geo-seo-opencode entry (6 projects) |
| `src/entities/project/model/types.ts` | Modify | `demo?: string` (optional) |
| `scripts/prerender.mjs` | Modify | BreadcrumbList in JSON-LD; alt text injection in `injectIntoHtml`; expanded content in buildPageContent for projects + contact; sync ROUTES array |
| `src/pages/AboutPage.tsx` | Modify | 4th card (isActive: index < 3), description paragraph, localized CV path |
| `src/pages/HomePage.tsx` | Modify | useLocalizedPath on 3 CTAs; localized CV download |
| `src/components/layouts/Header.tsx` | Modify | useLocalizedPath on all NavLinks + logo + drawer; localized CV in drawer |
| `src/components/layouts/Footer.tsx` | Modify | useLocalizedPath on privacy link |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modify | Render `content.*` section above grid |
| `src/pages/ContactPage.tsx` | Modify | Render `process.*` section before info cards |
| `src/routes/AppRoutes.tsx` | Modify | Add geo-seo-opencode routes (ES + /en/) |
| `src/i18n.ts` | Modify | Register `geoseoopencodecasestudy` namespace |
| `src/features/projects-case-study/i18n/namespaces.ts` | Modify | Add imports + resources for new case study |
| `src/features/projects-case-study/lib/buildCaseStudyContent.ts` | Modify | Add geo-seo-opencode stack sections |
| `src/locales/{es,en}/aboutpage.json` | Modify | `education.3` keys for certification |
| `src/locales/{es,en}/projects.json` | Modify | `content.*` section + `geo-seo-opencode.*` entry |
| `src/locales/{es,en}/contact.json` | Modify | `process.*` section (4 paragraphs) |
| `src/locales/{es,en}/home.json` | Modify | Updated `meta.title` and `meta.description` with keywords |
| `src/locales/{es,en}/geoseoopencodecasestudy.json` | Create | Full case study namespace (17+ keys per locale) |

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Unit | `useLocalizedPath` hook | Vitest: assert returns `/en/projects` when lang=en, `/projects` when es |
| Unit | `buildBreadcrumbList` | Vitest: verify correct ListItem count per route depth |
| Unit | CV path resolution | Vitest: verify EN locale → CV_EN.pdf |
| Integration | Prerender output | `pnpm run build` → grep dist for `alt=`, `BreadcrumbList`, expanded content text |
| Integration | Nav links active state | Manual: navigate EN and ES, verify active styling on all routes |
| E2E | Full nav flow both locales | Manual: click through all links in EN and ES, verify zero 404s |

## Open Questions

- [ ] Is `/Ezequiel_Fernandez_CV_EN.pdf` already present in `public/`? If not, it must be added before this change deploys.
