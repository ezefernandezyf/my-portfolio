# Proposal: Relevy Case Study

## Intent

Add a **Relevy** case study (id `geo-saas`, namespace `geosaascasestudy`) to the portfolio as the **featured, first-position** project. The landing shows `getProjects().slice(0, 2)`, so it will surface Relevy + EchoLog. This is the newest flagship work (GEO/SEO auditing micro-SaaS) and belongs above existing entries.

## Scope

### In Scope
- New bilingual case study content (ES/EN) from the content ficha, rendered via the existing shared `CaseStudyTemplate`.
- `projects.ts`: insert `geo-saas` at **position 0**, `featured: true`, `demo: https://relevy.app`, reorder the rest per confirmed order (echoLog → cinelab).
- `INITIAL_VISIBLE_PROJECTS` 8 → 9 in the projects grid.
- Route + i18n registration for the new case study (routes, route-meta, namespaces, stackByProject).
- 4 screenshots (`public/projects/geo-saas/`, webp 16:9).
- Chore: regenerate `public/sitemap.xml`, update `public/llms.txt`.
- Adjust affected tests + snapshots.

### Out of Scope
- Any Fase 14/15 fixes (hardcoded i18n in template, deep prerender, titles typo, contrast, etc.).
- New pages, SSR, schema/JSON-LD changes, design overhauls.

## Capabilities

### New Capabilities
- `relevy-case-study`: bilingual case study for Relevy (id `geo-saas`), driven by `src/locales/{es,en}/geosaascasestudy.json` and rendered by the shared template.

### Modified Capabilities
- `projects-directory`: projects data model — new entry at position 0 (featured), reordering, `INITIAL_VISIBLE_PROJECTS` 8→9.
- `seo-meta`: new `/projects/geo-saas` route-meta entry + regenerated `sitemap.xml` and `llms.txt`.

## Approach

Follow the proven case-study integration pattern (commit `f5c47fc`, egg-demo — 12 files). No architectural change: content is data + i18n, the template is untouched. Content source of truth is the ficha `docs/geo-saas-case-study.md` (referenced, not duplicated — spec expands it).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/projects.ts` | Modified | `geo-saas` entry, `featured: true`, reorder |
| `src/locales/{es,en}/projects.json` | Modified | New project listing strings |
| `src/locales/{es,en}/geosaascasestudy.json` | New | Full bilingual case study content |
| `src/data/route-meta.ts` | Modified | ROUTE_META + ROUTE_KEYS for `geo-saas` |
| `src/routes/AppRoutes.tsx` | Modified | 2 routes (ES/EN) |
| `src/features/projects-case-study/i18n/namespaces.ts` | Modified | Register `geosaascasestudy` |
| `src/features/projects-case-study/lib/buildCaseStudyContent.ts` | Modified | `stackByProject` entry |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modified | `INITIAL_VISIBLE_PROJECTS` 8→9 |
| `public/projects/geo-saas/` | New | 4 screenshots (webp 16:9) |
| `public/sitemap.xml`, `public/llms.txt` | Modified | Regenerate / update |
| `src/pages/tests/HomePage.test.tsx`, `ProjectsPage.test.tsx` | Modified | Hrefs (position 0), 9-visible counts |
| `route-meta.test.ts.snap`, `i18nParity.test.ts` | Modified | Regenerate snapshot, add namespace |

**Not touched**: `schema.ts`, `prerender.mjs` (derive from route-meta), `CaseStudyTemplate.tsx`.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Test count/href assertions break from reorder | Med | Update HomePage/ProjectsPage tests + snapshots |
| ES/EN parity drift in new namespace | Low | `i18nParity.test.ts` gate |
| Content ficha `featured: false` conflicts with confirmed `true` | Low | Confirmed user decision overrides ficha default |

## Rollback Plan

Revert the feature branch before merging to develop. Post-merge, revert the merge commit — all changes are additive (new files + array edits + one constant), no destructive moves.

## Dependencies

- Content ficha `docs/geo-saas-case-study.md` (source of truth).
- 4 Relevy screenshots in webp 16:9.

## Success Criteria

- [ ] Relevy appears at position 0, `featured: true`, in `/projects` and the landing (Relevy + EchoLog).
- [ ] `/projects/geo-saas` renders fully bilingual (ES/EN), demo → `https://relevy.app`.
- [ ] Grid shows 9 initial projects.
- [ ] `pnpm test`, `pnpm run lint`, `pnpm run build` pass.
- [ ] `sitemap.xml` + `llms.txt` include the new case study.
