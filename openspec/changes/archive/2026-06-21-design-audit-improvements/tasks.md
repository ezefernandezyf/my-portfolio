# Tasks: Design Audit Improvements

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350-380 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + SkipLink + ScrollProgress | PR 1 | CSS tokens, i18n, WCAG, progress bar |
| 2 | Visual polish + Stagger | PR 2 | Hover, H2, asymmetric, stagger, photo |

## Phase 1: Foundation

- [x] 1.1 `src/index.css` — Add light mood tokens in `:root:not(.dark)`: `--color-bg-primary: #faf7f0`, `--color-surface: #f5f0e8`, `--color-accent: #b45309` (amber-700, WCAG 4.57:1 ✓), softer shadow overrides on `.card-base`, `.section-shell`, `.card-minimal`
- [x] 1.2 `src/index.css` — Add `--text-h2: 1.75rem` in `@theme` + `.section-left { margin-left: 0; margin-right: auto; max-width: 900px; }`
- [x] 1.3 `src/locales/en/common.json` + `src/locales/es/common.json` — Add `skipToContent` and `scrollProgress.ariaLabel` i18n keys (EN: "Skip to content" / "Reading progress"; ES: "Saltar al contenido principal" / "Progreso de lectura")

## Phase 2: Skip-to-Content (WCAG 2.2 AA)

- [x] 2.1 `src/components/SkipLink/SkipLink.tsx` — Create `<a href="#main-content">` with `.sr-only` + `:focus-visible` reveal, i18n via `common` ns, `prefers-reduced-motion` guard
- [x] 2.2 `src/components/layouts/MainLayout.tsx` — Add `id="main-content" tabIndex={-1}` to `<main>`, render `<SkipLink />` as first child before `<Header />`
- [x] 2.3 Tests — Write SkipLink tests: i18n text per language, Tab→Enter focus flow, `.sr-only` when unfocused

## Phase 3: Scroll Progress

- [x] 3.1 `src/components/ScrollProgress/ScrollProgress.tsx` — Create fixed accent bar (≤4px, `z-40`), `requestAnimationFrame` loop, `prefers-reduced-motion` guard
- [x] 3.2 `src/pages/Projects/CaseStudyTemplate.tsx` — Import and render `<ScrollProgress />` before `<main>`
- [x] 3.3 Tests — Write ScrollProgress test: mock scrollHeight/scrollTop, verify width % at top/50%/bottom

## Phase 4: Visual Polish

- [x] 4.1 `src/pages/HomePage.tsx` + `src/features/projects/list/page/ProjectsListPage.tsx` — Add IntersectionObserver stagger on project grids: observe container, set `animation-delay: 50ms * index` per card, reuse existing `.animate-fade-in-up`
- [x] 4.2 `src/index.css` (`.card-base:hover`) + `src/components/ProjectCard/ProjectCard.tsx` — Enhance hover morph: `translateY(-6px)` + deeper shadow `rgba(2,6,23,0.18)`, light mode shadow variant
- [x] 4.3 `src/pages/HomePage.tsx` + `src/pages/AboutPage.tsx` — Apply `.section-left` to hero/sections for asymmetric layout, alternate centered vs left-aligned
- [x] 4.4 All H2 elements — Replace ad-hoc sizes with `var(--text-h2)` / `text-[1.75rem]` (CaseStudyTemplate problem/solution/deep-dive h2s, AboutPage sections, contact sections); HomePage hero h2s override to `2.25rem` via `md:text-[2.25rem]`
- [x] 4.5 `src/pages/AboutPage.tsx` — Move profile photo `<img>` above `<h1>` in grid: swap column order (photo first col-span-4, then heading col-span-8)

## Phase 5: Verification

- [x] 5.1 Manual — WCAG contrast check: amber-700 (`#b45309`) on cream bg (`#faf7f0`) ≥ 4.5:1, verify dark mode unchanged
- [x] 5.2 Tests — Write stagger integration test: IntersectionObserver mock, verify cards receive delayed animation classes
- [x] 5.3 Manual — Dev server review: hover morph, scroll progress tracking, skip-to-content Tab flow, light/dark theme toggle
