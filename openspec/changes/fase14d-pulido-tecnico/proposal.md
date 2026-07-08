# Proposal: Fase 14d — Pulido Técnico

## Intent

Clean up 7 maintenance items from the Fase 14 auditoría 360°. Fix stale env vars, image formats, build scripts, dependency cruft, and dead comments. Zero behavioral changes — pure hygiene.

## Scope

### In Scope
- **Fix `.env.example`** — replace Formspree vars with EmailJS vars (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`)
- **Migrate jpg → webp references** — update `src/data/projects.ts` for Movie Dashboard (4), ChefcitoIA (3), CineLab (4); note: `.webp` file conversion needed separately
- **Add width/height to carousel images** — `ProjectCarousel.tsx` `<img>` lacks explicit dimensions → CLS risk
- **Fix `check` script** — `npm run` → `pnpm run` in `package.json`
- **Auto-generate sitemap on build** — add `prebuild` hook running `generate-sitemap.mjs` with `--experimental-strip-types`
- **Deduplicate route-meta ↔ prerender** — `prerender.mjs` hardcodes 11 routes that mirror `route-meta.ts`. Import `ROUTE_META`/`ROUTE_KEYS` instead, add `--experimental-strip-types` to vite.config.ts invocation
- **Remove unused dep `@vitest/coverage-v8`** — `vitest.config.ts` uses `istanbul`, v8 is dead weight
- **Clean `CurrentlySection.tsx` TODO** — remove framer-motion migration comment (no plan to install)

### Out of Scope
- `eslint-plugin-prettier` removal — already integrated in Fase 14c
- Actual `.jpg` → `.webp` file conversion (image pipeline task)
- Fase 14e optional items (ScrollProgress refactor, CSP, CI audit)

## Capabilities

### New Capabilities
None

### Modified Capabilities
None

## Approach

Seven atomically independent fixes in a single PR:

1. `.env.example`: replace 2 lines with 3 EmailJS vars (confirmed in `src/pages/ContactPage.tsx`)
2. `projects.ts`: change 11 `.jpg` paths to `.webp` (mark file conversion as TODO)
3. `ProjectCarousel.tsx`: add `width`/`height` to `<img>` inside the `aspect-video` wrapper
4. `package.json`: `"check"` script: `npm run` → `pnpm run`; add `"prebuild"` hook; remove `@vitest/coverage-v8` from devDependencies
5. `vite.config.ts`: add `--experimental-strip-types` flag to prerender Node invocation
6. `prerender.mjs`: replace hardcoded `ROUTES` array with dynamic map from `ROUTE_META` + `ROUTE_KEYS` imported from `route-meta.ts`
7. `CurrentlySection.tsx`: delete lines 3-6 (TODO comment block)

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `.env.example` | Modified | Formspree → EmailJS vars |
| `src/data/projects.ts` | Modified | 11 jpg → webp references |
| `src/components/ProjectCarousel/ProjectCarousel.tsx` | Modified | Add width/height attrs |
| `package.json` | Modified | check script, prebuild hook, remove dep |
| `vite.config.ts` | Modified | --experimental-strip-types flag |
| `scripts/prerender.mjs` | Modified | Import from route-meta.ts |
| `src/components/CurrentlySection/CurrentlySection.tsx` | Modified | Remove TODO comment |
| `pnpm-lock.yaml` | Auto | Dep removal cascade |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `--experimental-strip-types` breaks prerender in CI | Low | Same flag already used by generate-sitemap.mjs; Node 22 in CI supports it |
| Broken image refs if webp files don't exist yet | Low | Only change references; actual file conversion separate, images load progressively |

## Rollback Plan

Revert the single commit. Each change is independent — no cascading failures possible.

## Dependencies

- Node 22+ (already in CI)
- WebP file conversion for Movie Dashboard, ChefcitoIA, CineLab (separate task, not blocking)

## Success Criteria

- [ ] `pnpm run check` passes (uses `pnpm run` internally)
- [ ] `pnpm run build` regenerates sitemap with today's date
- [ ] Prerender produces 22 pages without route duplication errors
- [ ] `@vitest/coverage-v8` not in `node_modules` after `pnpm install`
- [ ] `pnpm test` — no snapshot changes from image ref updates
- [ ] ProjectCarousel renders with explicit width/height on `<img>`
