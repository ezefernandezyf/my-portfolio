# Tasks: Phase 0 Foundations and CI

## Phase 1: Infrastructure
- [x] 1.1 Create `.github/workflows/ci.yml` with checkout, Node setup, dependency install, lint, build, and `test:coverage` jobs.
- [x] 1.2 Add workflow triggers for `push` and `pull_request` only, targeting the default branch.

## Phase 2: Quality Gates
- [x] 2.1 Update `vitest.config.ts` to enforce 80% coverage thresholds for lines, functions, branches, and statements.
- [x] 2.2 Keep coverage reports in `coverage/` with `text` and `lcov` reporters so CI output and local reporting stay aligned.
- [x] 2.3 Add or refine a `package.json` script if a single reusable `check` command improves CI readability.

## Phase 3: Test Stability
- [x] 3.1 Audit `src/setupTests.ts` against the current locale namespaces and add any missing EN/ES mocks required for CI stability.
- [x] 3.2 Confirm the existing i18n mock preserves `changeLanguage` behavior and does not require network access.

## Phase 4: Verification
- [x] 4.1 Run lint, build, and coverage locally with the same command order used by CI.
- [x] 4.2 Verify the workflow fails on a forced lint error and on simulated coverage below 80%.
- [x] 4.3 Confirm translation-based component tests still pass for both Spanish and English after the bootstrap audit.
