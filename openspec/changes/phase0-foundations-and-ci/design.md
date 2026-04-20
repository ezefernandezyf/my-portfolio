# Design: Phase 0 Foundations and CI

## Technical Approach
Implement a repository-level quality gate using GitHub Actions and the existing Vitest/ESLint/TypeScript toolchain. The workflow will validate lint, type-check/build, and tests with coverage on every push and pull request, while the Vitest config will enforce the 80% coverage floor required by the roadmap.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| CI entrypoint | Single GitHub Actions workflow in `.github/workflows/ci.yml` | Multiple fragmented workflows | One workflow keeps checks deterministic and easy to reason about for a small-to-medium frontend repo. |
| Type validation | Use existing `npm run build` as type-check + bundle validation | Separate `tsc --noEmit` script | The repo already defines `build` as `tsc -b && vite build`, so it covers type-checking without adding new script drift. |
| Coverage gate | Enforce thresholds in `vitest.config.ts` | External coverage gating script | Coverage belongs with the test runner; keeping it in Vitest avoids duplicated rules and mismatched thresholds. |
| Test environment | Preserve `src/setupTests.ts` mocks and i18n behavior | Rebuild test bootstrap | The current bootstrap already mocks EN/ES namespaces and cleanup correctly; changing it now would add unnecessary risk. |

## Data Flow
Push/PR -> GitHub Actions -> install deps -> lint -> build/type-check -> test:coverage -> coverage threshold evaluation -> pass/fail.

    GitHub Event
        └──→ CI Workflow
               ├──→ npm ci
               ├──→ npm run lint
               ├──→ npm run build
               └──→ npm run test:coverage
                         └──→ Vitest coverage thresholds

## File Changes
| File | Action | Description |
|---|---|---|
| `.github/workflows/ci.yml` | Create | Runs lint, build/type-check, and coverage on push/PR. |
| `vitest.config.ts` | Modify | Add explicit coverage thresholds for the 80% gate. |
| `package.json` | Modify | Keep scripts aligned if CI needs a dedicated check command. |
| `src/setupTests.ts` | Review | Ensure current i18n mocks remain stable under CI. |

## Interfaces / Contracts
No runtime API changes. The only contracts are CI commands and test runner thresholds.

```ts
// Vitest coverage contract
coverage: {
  thresholds: {
    lines: 85,
    functions: 85,
    branches: 85,
    statements: 85,
  },
}
```

## Testing Strategy
| Layer | What to Test | Approach |
|---|---|---|
| Unit | Coverage gate and test bootstrap behavior | Validate Vitest reports and i18n mocks with component tests. |
| Integration | CI command chain | Run lint, build, and coverage as the workflow will. |
| E2E | Not applicable | No user-facing feature is changing in this phase. |

## Migration / Rollout
No migration required. The workflow can be added without changing production application behavior.

## Open Questions
- [ ] Should CI also run `format:check`, or keep the gate limited to lint, build/type-check, and tests as defined by the roadmap?
