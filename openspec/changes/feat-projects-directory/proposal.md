# Proposal: Projects Directory Rebuild

## Intent
Rebuild the projects directory page from the reference HTML so the page presents a cleaner, more editorial project listing with a search/filter bar, a responsive project grid, and per-project action links that match the visual language of the redesign.

## Scope
### In Scope
- Rebuild `ProjectsPage` layout and styling from the reference.
- Keep the existing project data source and i18n contract.
- Preserve search/filter behavior and the load-more affordance.
- Align project card structure, spacing, and action links with the reference.

### Out of Scope
- Reworking the underlying project data model.
- Changing project case study routes or detail pages.
- Adding new backend/API behavior.

## Approach
Replace the current stacked section layout with a reference-aligned directory page: a prominent intro/header area, a compact search/filter control bar, and a two-column responsive grid of project cards. The cards should reuse the existing data and translations, but their visual hierarchy and button/icon treatment should be rebuilt to match the reference.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/ProjectsPage.tsx` | Modified/Rebuilt | Main directory layout and filtering UI |
| `src/pages/tests/ProjectsPage*.tsx` | Modified | Update assertions for the new directory structure |
| `src/locales/{en,es}/projects.json` | Modified only if needed | Copy alignment with the reference and controls |
| `src/components/ProjectCard` | Potentially modified | Shared card visuals if the directory reuses it |
| `src/data/projects.ts` | No expected change | Data source remains the same |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Card spacing/height still feels uneven | High | Use a shared card layout with fixed preview regions and consistent text blocks |
| Search/filter behavior regresses | Medium | Keep the current filtering logic and add focused tests |
| Copy mismatch across locales | Medium | Validate en/es copy together and keep namespace parity |

## Rollback Plan
Keep the branch isolated. If the rebuild diverges from the reference or destabilizes filtering, revert the page component and tests for the module while leaving the data model untouched.

## Success Criteria
- [ ] Projects page layout matches the reference structure and spacing.
- [ ] Search/filter and load-more behaviors continue to work.
- [ ] Project cards render consistently across rows and breakpoints.
- [ ] Tests cover the directory behavior and key render states.

## Next Step
Proceed to spec/design for `feat-projects-directory` and then implement the rebuild.
