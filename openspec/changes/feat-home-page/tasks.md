# Tasks: Home Page Featured Work Refresh

## Phase 1: Infrastructure / data + i18n

- [x] 1.1 Add aligned `home` keys in `src/locales/en/home.json` and `src/locales/es/home.json` for hero copy, recent-work heading, and CTA labels.
- [x] 1.2 Add a small pure selector in `src/pages/HomePage.tsx` that prioritizes `featured` projects, preserves source order, and caps the home grid to a curated subset.
- [x] 1.3 Confirm `src/data/projects.ts` metadata supports the curated subset; adjust only the featured flags or ordering needed for stable home picks.

## Phase 2: Implementation

- [x] 2.1 Tune the HomePage hero spacing, alignment, and preview-aside balance to better match `docs/redesignReferences/indexReference.html` without changing the top-level structure.
- [x] 2.2 Replace the bottom text-only cards in `src/pages/HomePage.tsx` with a compact recent-work grid built from `ProjectCard`.
- [x] 2.3 Add framer-motion container/item variants for the hero and grid with restrained fade + translate stagger, and respect reduced-motion settings.
- [x] 2.4 Keep the recent-work grid responsive and visually secondary to the hero, with the preview aside still present on desktop and stacked on mobile.

## Phase 3: Testing / verification

- [x] 3.1 Update `src/pages/tests/HomePage.test.tsx` to verify hero order, curated project selection, and removal of the old text-only cards.
- [x] 3.2 Extend `src/components/tests/ProjectCard.test.tsx` only if the home grid depends on featured-span, image, or link behavior not already covered.
- [ ] 3.3 Add shared behavior coverage for the home locale contract and motion-safe rendering where the selector or labels could drift.
- [ ] 3.4 Run `npm run check` and the targeted suites: `src/pages/tests/HomePage.test.tsx` and `src/components/tests/ProjectCard.test.tsx`.