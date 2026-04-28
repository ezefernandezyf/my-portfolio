# Case Study Route Rollback Map

## Purpose
Provide a fast rollback map for migrated case-study routes.

## Route Fallbacks
- `/projects/movie-dashboard` -> `src/pages/Projects/MovieDashboardCaseStudy.tsx`
- `/projects/cinelab` -> `src/pages/Projects/CineLabCaseStudy.tsx`
- `/projects/chefcitoia` -> `src/pages/Projects/ChefcitoIACaseStudy.tsx`
- `/projects/nexus-talent` -> `src/pages/Projects/NexusTalentCaseStudy.tsx`

## Rollback Procedure
1. In `src/routes/AppRoutes.tsx`, replace each `<ProjectCaseStudyPage ... />` with its legacy component.
2. Keep feature files untouched for post-mortem analysis.
3. Run focused tests:
   - `src/routes/tests/AppRoutes.caseStudyMigration.test.tsx`
   - `src/pages/tests/*CaseStudy.test.tsx`
4. If tests pass, keep rollback branch deployable and re-open migration work in a new batch.