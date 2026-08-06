# Design: Fase 15 GEO — Titles & Source of Truth

## Technical Approach

Unify SEO metadata to a single source: `src/data/route-meta.ts` `LocaleSEO` objects. Three consumers (prerender, SPA pages, JSON-LD) switch from i18n-key resolution to direct `ROUTE_META[routeKey][lang].title` reads. 13 locale JSON files lose their `meta.title`/`meta.description` keys. `contact.json` `meta.contact.*` keys remain because they serve non-SEO UI copy. `ProjectsListPage` gets the MetaTags it currently lacks.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Fix only locale JSON (sync titles to match route-meta) | Two sources still drift; next typo re-breaks prerender silently | No |
| Delete route-meta, let i18n be sole source | route-meta already correct; JSON is the broken copy; schema.ts needs resolved strings not keys | No |
| route-meta as canonical, remove JSON dup | One place to audit; prerender + SPA auto-consistent | Yes |
| Case study template resolves route-meta internally via `pathname` | Couples generic template to route-meta data module | No |
| Parent passes separate `metaTitle`/`metaDescription` props to CaseStudyTemplate | Explicit; template stays unaware of route-meta | Yes |

## Data Flow

```
ROUTE_META (single source)
 ├─→ prerender.mjs metaTitle()/metaDesc() → <title>, OG, Twitter, JSON-LD
 ├─→ schema.ts buildWebPage() → JSON-LD name/description
 ├─→ SPA pages → <MetaTags title={route[lang].title}>
 └─→ CaseStudyPage → CaseStudyTemplate (metaTitle/metaDescription props)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `scripts/prerender.mjs` | Modify | `buildRoutes()` adds `es`/`en` fields from `ROUTE_META[key]`; `metaTitle()`/`metaDesc()` read them directly instead of i18n resolution |
| `src/pages/HomePage.tsx` | Modify | Import `ROUTE_META`; replace `t('meta.title',{ns:'home'})` with `ROUTE_META.home[lang].title` |
| `src/pages/AboutPage.tsx` | Modify | Import `ROUTE_META`; replace `t('meta.title')` with `ROUTE_META.about[lang].title` |
| `src/pages/ContactPage.tsx` | Modify | Import `ROUTE_META`; replace `t('meta.contact.title')` with `ROUTE_META.contact[lang].title` |
| `src/pages/PrivacyPage.tsx` | Modify | Import `ROUTE_META`; replace `t('meta.title')` |
| `src/pages/NotFoundPage.tsx` | Modify | Import `ROUTE_META`; replace `t('meta.title')`; keep `noIndex={true}` |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modify | Add `MetaTags` import + component with `ROUTE_META.projects[lang]` (currently missing) |
| `src/features/projects-case-study/page/ProjectCaseStudyPage.tsx` | Modify | Resolve `ROUTE_META[routeKey][lang]`, pass as new `metaTitle`/`metaDescription` props to CaseStudyTemplate |
| `src/pages/Projects/CaseStudyTemplate.tsx` | Modify | Accept new `metaTitle`/`metaDescription` props; pass them to MetaTags instead of `title`/`description` |
| `src/locales/{es,en}/*.json` (26 files) | Modify | Remove `meta.title`/`meta.description` from 13 namespaces × 2 locales; preserve `meta.contact.*` in contact.json |
| `src/data/tests/route-meta.test.ts` | Create | Integrity + snapshot tests |

## Interfaces / Contracts

### `buildRoutes()` output shape (prerender.mjs)

```js
// NEW: es/en LocaleSEO fields added
{ path, schemaType, ogImage, es: LocaleSEO, en: LocaleSEO }
// Dropped: ns, titleKey, descKey, i18nInterpolation
```

### CaseStudyTemplate new props

```typescript
interface CaseStudyTemplateProps {
  // ... existing props ...
  metaTitle?: string;   // NEW: SEO title from ROUTE_META
  metaDescription?: string; // NEW: SEO description from ROUTE_META
}
```

### SPA language selector (repeated pattern)

```typescript
const { i18n } = useTranslation();
const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
```

Existing pattern from `HomePage.tsx:17`. Used by all 7 SPA consumers.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `ROUTE_META` integrity | Vitest iterates all 14 routes: `es.title`/`en.title` non-empty, contain "Ezequiel Fernandez", unique per locale, no `" , "` substring |
| Unit | Snapshot regression | `expect(ROUTE_META).toMatchSnapshot()` — any accidental title change surfaces in diff |
| Integration | Build output | `pnpm run build` + grep dist HTML for `<title>` per route × locale; assert no `" , "` in any of 22 files |
| Manual | SPA nav | `pnpm run preview` → navigate each route in ES/EN → view-source: verify `<title>` matches route-meta |

### Test ↔ Spec Mapping

| Spec Scenario | Test |
|--------------|------|
| No separator typo in titles | Unit: `expect(title).not.toContain(' , ')` |
| Prerender reads title from route-meta | Integration: grep dist HTML |
| SPA renders title from route-meta | Manual: preview + view-source |
| NotFound noIndex + correct title | Unit: assert `ROUTE_META['not-found'].noIndex === true` + `title` non-empty |
| SEO key removal preserves non-SEO | Lint step: grep `meta.title` in locale JSON after cleanup |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Changes are purely build-time. Rollback: revert feature branch — all locale JSON keys restorable from git.

## Open Questions

None.
