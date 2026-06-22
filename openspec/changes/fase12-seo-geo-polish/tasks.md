# Tasks: Fase 12 — SEO/GEO Fine-Tuning + New Content

## Review Workload Forecast

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Work Units

| Unit | Est. | PR | Base |
|------|------|----|------|
| SEO Meta + i18n | ~230 | PR 1 | tracker |
| Projects + cert | ~275 | PR 2 | PR 1 |
| Routing + CV | ~155 | PR 3 | PR 2 |
| Prerender + Schema | ~205 | PR 4 | PR 3 |

## Phase 1 — SEO Meta & i18n Content ✅ (PR #1)

- [x] 1.1 Add `keywords` field to `RouteMeta` interface — via `LocaleSEO.keywords` (string[] inline) in `es`/`en` objects
- [x] 1.2 Fix `descI18nKey` on about route — apunta a `aboutpage:meta.description` (key agregada). Case-study routes mantienen `*.meta.title` hasta que tengan description keys
- [x] 1.3 Add `geo-seo-opencode` entry to `ROUTE_META` + `ROUTE_KEYS`
- [x] 1.4 Update `home.json` ES/EN meta with search keywords — titles actualizados
- [x] 1.5 Add `contentSection.*` keys (heading, paragraph1-3) to `projects.json` ES/EN
- [x] 1.6 Add `contentSection.*` keys (heading, paragraph1-2) to `contact.json` ES/EN
- [x] 1.7 Add `education.3.*` for AI Skills Fest to `aboutpage.json` ES/EN

## Phase 2 — New Project & Certification

- [ ] 2.1 Make `demo` optional in `src/entities/project/model/types.ts`
- [ ] 2.2 Add geo-seo-opencode entry (no demo, terminal shots, Node.js/Commander) to `projects.ts`
- [ ] 2.3 Add 4th education (AI Skills Fest 2026, Microsoft, Credly) to `src/data/about.ts`
- [ ] 2.4 Create `geoseoopencodecasestudy.json` ES/EN (all required keys)
- [ ] 2.5 Register namespace in `namespaces.ts` + add stack to `buildCaseStudyContent.ts`
- [ ] 2.6 Register namespace in `src/i18n.ts` + add route to `AppRoutes.tsx`

## Phase 3 — Routing & CV

- [ ] 3.1 Create `src/hooks/useLocalizedPath.ts` — prepend `/en` when EN active
- [ ] 3.2 Export from `src/hooks/index.ts`
- [ ] 3.3 `Header.tsx`: localize 5 NavLinks + logo + 3 drawer links + CV href
- [ ] 3.4 `Footer.tsx`: localize privacy link
- [ ] 3.5 `HomePage.tsx`: localize 3 CTAs + CV href
- [ ] 3.6 `AboutPage.tsx`: localize 2 CTAs + CV href + 4th education card + descriptions

## Phase 4 — Prerender & Schema

- [ ] 4.1 Add `buildBreadcrumbList()` to `src/data/schema.ts`
- [ ] 4.2 Integrate into `buildJsonLdGraph`
- [ ] 4.3 Sync geo-seo-opencode in `scripts/prerender.mjs` ROUTES
- [ ] 4.4 Add BreadcrumbList to prerender JSON-LD builder
- [ ] 4.5 Alt-text injection in `injectIntoHtml`: JSDOM scan img, route-aware alt or `alt=""`
- [ ] 4.6 Sync expanded content into `buildPageContent` for projects + contact
- [ ] 4.7 Render `content.*` section above grid in `ProjectsListPage.tsx`
- [ ] 4.8 Render `process.*` section before info in `ContactPage.tsx`

## Phase 5 — Testing & Verification

- [ ] 5.1 Unit: `useLocalizedPath` returns correct prefix per locale
- [ ] 5.2 Unit: `buildBreadcrumbList` correct ListItem count per depth
- [ ] 5.3 Unit: CV path resolves to `*_EN.pdf` on EN locale
- [ ] 5.4 Integration: `pnpm run build` → grep dist for `alt=`, `BreadcrumbList`
- [ ] 5.5 Manual: navigate all links ES/EN, verify zero 404s
