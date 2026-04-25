# Proposal: Case Studies Template Rebuild

## Intent
Rebuild the case study pages from the reference HTML by extracting a shared template that can render every project case study with the same visual structure, typography, spacing, and action hierarchy.

## Scope
### In Scope
- Create a shared case study template that matches the reference layout.
- Refactor the current case study pages to use the shared template.
- Keep existing routes, project slugs, and localized copy contracts intact.
- Align header, hero, preview image area, and section rhythm with the reference HTML.

### Out of Scope
- Changing the project route structure.
- Reworking the project data model beyond what the template needs.
- Adding new backend/API behavior.

## Approach
Replace the per-page hardcoded layout with a shared case study shell that receives project-specific content and renders a consistent experience across all case study routes. The template should preserve the current SEO/meta behavior, but the visible structure should be rebuilt to mirror the reference: compact navbar/header, strong hero, prominent media block, and a long-form editorial body with consistent section spacing.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/Projects/*CaseStudy.tsx` | Modified/Rebuilt | Migrate pages to the shared template |
| `src/pages/Projects/CaseStudyTemplate.tsx` | New | Shared visual and structural shell |
| `src/pages/Projects/caseStudyData.ts` or equivalent | New/Modified | Optional typed content source for the template |
| `src/locales/{en,es}/*casestudy.json` | Modified | Copy adjustments for the reference-aligned layout |
| `src/pages/tests/*CaseStudy*.tsx` | Modified/New | Verify the shared template and per-project rendering |
| `src/routes/AppRoutes.tsx` | No expected change | Routes stay stable |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Template becomes too generic and loses project-specific flavor | Medium | Keep the template flexible only where the reference allows it; use typed content blocks for unique sections |
| Existing localized copy does not map cleanly to a shared structure | Medium | Preserve per-project namespaces and adapt the template to render optional sections |
| Visual drift remains between pages | High | Normalize shared spacing, typography, and media proportions in the template instead of in each page |

## Rollback Plan
If the shared template causes regressions, keep the existing route files intact and revert the template migration while preserving the reference-driven layout work done in isolated pieces.

## Success Criteria
- [ ] All case study routes render through a shared template.
- [ ] The visible layout matches the reference structure and spacing more closely than the current hardcoded pages.
- [ ] Project-specific content still renders correctly per route.
- [ ] Tests cover the shared template and at least one representative case study route.

## Next Step
Proceed to spec/design for the shared case studies template and then implement the migration.