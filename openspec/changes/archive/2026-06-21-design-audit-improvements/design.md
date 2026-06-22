# Design: Visual Personality Improvements

## Technical Approach

Eight deliverables layered atop the existing dark-first token system with zero new dependencies. All interactivity uses native browser APIs (IntersectionObserver, requestAnimationFrame). CSS changes are additive in `:root:not(.dark)` blocks — dark mode renders identically to before. Components follow the project's existing Screaming Architecture pattern (`src/components/ComponentName/ComponentName.tsx`).

## Architecture Decisions

### Decision 1: Skip link target

**Choice**: Add `id="main-content" tabIndex={-1}` to MainLayout's wrapping `<main>`, not to each page.
**Alternatives**: Per-page `<main>` id — fragile and repetitive; wrapping `<div>` in every page — scope creep.
**Rationale**: MainLayout wraps every route. One change covers all 6+ pages. `tabIndex={-1}` makes the element programmatically focusable for keyboard navigation.

### Decision 2: Stagger via IntersectionObserver, not scroll event

**Choice**: Single IntersectionObserver per grid, `animation-delay` incremented by 50ms per card.
**Alternatives**: CSS-only staggered keyframes — can't trigger on scroll entry; scroll event listener — janky without throttling.
**Rationale**: Project already uses IntersectionObserver for section fade-in (`useSectionFadeIn` in AboutPage). Consistent pattern.

### Decision 3: Scroll progress position

**Choice**: Fixed bar inside CaseStudyTemplate, `z-40` (below header `z-50`), accent-colored.
**Alternatives**: Render in App.tsx globally — would appear on non-case-study pages; portal to body — unnecessary complexity.
**Rationale**: Spec requires it only on case studies. Component co-located with template where it renders.

### Decision 4: H2 token type

**Choice**: Single `--text-h2` token in `@theme` with value `1.75rem` (matches most existing H2s). HomePage sections override to `2.25rem` via `md:text-[2.25rem]`.
**Alternatives**: Two tokens (h2-page, h2-section) — over-engineering for 2 variants; clamp() fluid — unnecessary for static site.
**Rationale**: 1.75rem is the modal H2 size across AboutPage, CaseStudyTemplate, and contact sections. HomePage hero sections already use responsive breakpoints.

## Data Flow

```
Skip-to-content flow:
  Tab press → SkipLink receives :focus-visible → Enter → href="#main-content" → browser focus jump → MainLayout <main id="main-content">

Scroll progress flow:
  CaseStudyTemplate mounts → ScrollProgress useEffect → requestAnimationFrame loop
  → document.documentElement.scrollHeight / scrollTop → width % → style update
  → reduced-motion? → instant width : transition width

Stagger flow:
  Page mounts → IntersectionObserver observes grid container
  → container enters viewport → cards get .animate-fade-in-up + nth-child animation-delay
  → observer disconnects (one-shot)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/index.css` | Modify | Add light mood tokens in `:root:not(.dark)`, `--text-h2` in `@theme`, `.section-left` utility |
| `src/components/SkipLink/SkipLink.tsx` | Create | `<a href="#main-content">` with `.sr-only` + `:focus-visible`, i18n via `common` ns |
| `src/components/ScrollProgress/ScrollProgress.tsx` | Create | Fixed accent bar, rAF loop, `prefers-reduced-motion` guard |
| `src/components/layouts/MainLayout.tsx` | Modify | Add `id="main-content" tabIndex={-1}` to `<main>`, render `<SkipLink />` as first child |
| `src/pages/HomePage.tsx` | Modify | IntersectionObserver stagger on featured grid, `.section-left` on hero section |
| `src/pages/AboutPage.tsx` | Modify | Swap photo above h1 (mobile-first column order), `.section-left` on sections |
| `src/pages/Projects/CaseStudyTemplate.tsx` | Modify | Render `<ScrollProgress />` after `<main>`, replace H2 sizes with `--text-h2` |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modify | IntersectionObserver stagger on card grid |
| `src/components/ProjectCard/ProjectCard.tsx` | Modify | Enhance hover: `-translate-y-1.5` + `shadow-[0_18px_40px_rgba(2,6,23,0.18)]` |
| `src/locales/en/common.json` | Modify | Add `"skipToContent": "Skip to content"` |
| `src/locales/es/common.json` | Modify | Add `"skipToContent": "Saltar al contenido principal"` |

## Interfaces / Contracts

```typescript
// ScrollProgress — no props, self-contained
() => React.JSX.Element

// SkipLink — no props, reads i18n from 'common' namespace
() => React.JSX.Element
```

## Key CSS Changes

**Light mood tokens** (additive in `:root:not(.dark)`):
```
--color-bg-primary: #faf7f0     (was #f8fafc)
--color-surface: #f5f0e8        (was #ffffff)
--color-accent: #d97706         (unchanged from current light)
```
Shadow opacity reduced ~40% in light mode via overrides on `.section-shell`, `.card-minimal`, `.card-base`.

**New token**: `--text-h2: 1.75rem` in `@theme`. Applied via `font-size: var(--text-h2)` on all H2 elements.

**New utility**: `.section-left { margin-left: 0; margin-right: auto; max-width: 900px; }` — complements existing `.site-container` and `.container-min`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | ScrollProgress percentage calculation | jsdom mock scrollHeight/scrollTop |
| Unit | SkipLink i18n text by language | RTL render with i18next provider |
| Integration | SkipLink Tab → Enter focus flow | RTL + userEvent.tab() |
| Integration | Stagger cards receive staggered delays | RTL + IntersectionObserver mock |
| Visual | Light/dark token contrast | Manual audit with WCAG contrast checker |
| Visual | Hover morph on ProjectCard | Dev server review |

## Migration / Rollout

No migration required. All tokens are additive. Light mode override block is isolated — removing it falls back to current light mode. Each component is self-contained and atomic-commit revertible.

## Open Questions

- [ ] Confirm `#faf7f0` / `#f5f0e8` cream tones meet WCAG AA contrast against accent text (`#d97706` on light bg) — verify with contrast tool before merge
