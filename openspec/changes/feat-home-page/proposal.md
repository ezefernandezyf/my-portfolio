# Proposal: Home Page Featured Work Refresh

## Executive Summary
Refactor the home page bottom section into a featured/recent-work grid that better matches `docs/redesignReferences/indexReference.html`, while preserving the existing hero and reusing current portfolio primitives.

## Intent
Replace the current text-only 3-card section, which does not align with the reference design, with a visually richer recent-work grid that improves visual hierarchy, portfolio credibility, and content parity with the new index reference.

## Scope
### In Scope
- Replace the bottom home section with a featured/recent-work grid.
- Reuse existing `ProjectCard`, `projects` data, and home i18n namespaces.
- Add staggered entrance motion with `framer-motion`.
- Preserve the current hero and profile/preview aside.

### Out of Scope
- Rewriting the hero layout.
- Introducing new backend/data sources.
- Reworking global routing, metadata, or unrelated pages.
- Adding a new design system layer or overhauling shared UI primitives.

## Approach
Use a minimal refactor: select a small set of featured projects from existing data, render them in a grid that mirrors the reference hierarchy, and apply restrained stagger/fade motion to match the index reference without changing the broader page architecture.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/HomePage.tsx` | Modified | Replace the bottom text-only section with a featured work grid. |
| `src/components/ProjectCard/*` | Modified or reused | Reuse current card presentation where possible. |
| `src/data/projects.ts` | Reused | Source of project selection and display content. |
| `src/locales/en/*`, `src/locales/es/*` | Modified | Copy updates for home section labels and supporting text. |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Featured project choice feels arbitrary | Medium | Use explicit selection criteria tied to relevance, recency, or visual fit. |
| Motion feels heavy or inconsistent | Low | Keep transitions subtle and staggered, avoiding complex choreography. |
| i18n strings drift between languages | Medium | Update both locale namespaces together and keep keys aligned. |

## Rollback Plan
If the new grid regresses layout or readability, revert the home section to the previous bottom-card structure while keeping the hero and shared data untouched.

## Dependencies
- Existing project metadata and thumbnails must be sufficient to populate the featured grid.
- `framer-motion` must remain available in the current frontend stack.

## Success Criteria
- [ ] Home page bottom section visually matches the reference hierarchy more closely than the current implementation.
- [ ] The page reuses existing project data and shared components without introducing new data plumbing.
- [ ] i18n coverage remains intact for ES/EN home content.
- [ ] Motion is present but restrained, with staggered reveals on the featured grid.

## Notes
- i18n: keep section labels and supporting copy in the existing home namespaces; do not introduce language-specific branching.
- Featured project selection: choose a small curated subset from the current projects data, favoring strongest portfolio items and visual diversity.
- framer-motion usage: apply lightweight container/item stagger and simple fade/translate transitions only.

## Next Step
Proceed to `sdd-spec` to define the home-page delta spec and lock the content/model expectations before design or implementation.