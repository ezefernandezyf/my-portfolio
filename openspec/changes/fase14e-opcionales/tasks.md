# Tasks: Fase 14e — Optional Polish & Performance

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 80-90 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All 8 fixes | Single PR | <90 lines, no inter-fix deps |

## Phase 1: Performance (re-render fixes)

- [x] 1.1 `ScrollProgress.tsx`: replace `useState(width)` with `useRef<HTMLDivElement>`, set `style.width` directly in rAF callback, keep `useState` for `reducedMotion` + `aria-valuenow`
- [x] 1.2 `HomePage.tsx`: replace `mousePos` state with `useRef<HTMLDivElement>`, update `style.background` in `handlePointerMove`, remove `mousePos` from JSX
- [x] 1.3 `ProjectCarousel.tsx`: add `visibilitychange` listener, set `paused` when `document.hidden`, cleanup in useEffect return

## Phase 2: Content & SEO

- [x] 2.1 Carousel alt text: update `carousel.alt` in 12 case-study locale files (ES+EN) — describe what each screenshot shows, not just project name
- [x] 2.2 NotFound meta: expand `meta.description` in `src/locales/es/notfoundpage.json` and `src/locales/en/notfoundpage.json` to ≥120 chars

## Phase 3: Security, Infra & LCP

- [x] 3.1 `vercel.json`: add `object-src 'none'` to Content-Security-Policy header
- [x] 3.2 `.github/workflows/ci.yml`: add `pnpm audit` step after test with `continue-on-error: true`
- [x] 3.3 `AboutPage.tsx`: add `fetchpriority="high"` to profile photo `<img>` (LCP candidate)

## Phase 4: Verification

- [x] 4.1 Run `pnpm test` — all existing tests pass (87 passed, 29 files)
- [x] 4.2 Run `pnpm run build` — no type errors (build + prerender 24 pages OK)
- [ ] 4.3 React DevTools profiler: confirm ScrollProgress and HomePage hero no longer re-render on scroll/pointer-move [manual — needs browser check]
- [ ] 4.4 Manual check: carousel pauses when switching browser tabs, resumes on return [manual — needs browser check]
