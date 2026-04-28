# Import Boundaries Strategy

## Decision
Use an ESLint-based import-boundary strategy for architecture enforcement.

## Why ESLint
- Boundaries fail fast during local development and CI.
- Rules can be expressed per layer and per feature with readable diagnostics.
- Works with current TypeScript + Vite setup without changing runtime config.

## Allowed Directions
- `src/routes` -> `src/features`, `src/shared`, `src/pages` (temporary adapters only)
- `src/features/*` -> `src/entities`, `src/shared`
- `src/entities/*` -> `src/shared`
- `src/shared/*` -> internal shared modules only
- `src/pages/*` -> `src/features`, `src/shared` (during migration)

## Forbidden Directions
- `src/entities/*` -> `src/features/*`
- `src/shared/*` -> `src/features/*` or `src/entities/*`
- Cross-feature internals import (for example `features/a/*` importing `features/b/internal/*`)

## Transition Note
During the strangler migration, `src/pages` may temporarily import feature entrypoints. Legacy-to-feature adapters are allowed until each slice is fully migrated and verified.
