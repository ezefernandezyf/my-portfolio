# Proposal: Design — Visual Personality

## Intent

Design audit score 72/100. Portfolio is functionally complete but visually generic. This change adds deliberate personality: staggered interaction, distinct light/dark moods, and WCAG 2.2 AA compliance make the portfolio feel crafted, not assembled.

## Scope

### In Scope (8 deliverables)

**Top 3 (must do)**

1. **Stagger animation** — project cards appear sequentially on scroll (50ms delay)
2. **Skip-to-content link** — first focusable element, WCAG 2.2 AA required
3. **Dark/light mood differentiation** — light mode with warm/minimal personality (creamy bg, soft shadows, amber accent pop)

**Second batch** 4. **Asymmetric layout** — alternate centered/left-aligned sections on HomePage and AboutPage 5. **Hover morphing** — enhanced shadow + translateY on project cards 6. **Unified H2 scale** — single token across all pages 7. **Scroll progress indicator** — thin accent bar fixed at top in all case studies 8. **Profile photo higher** — move above h1 in AboutPage

### Out of Scope

- Full light mode redesign (no font changes, layout changes, or new color system)
- Animation library (no framer-motion/gsap — pure CSS + IntersectionObserver)
- New pages, features, or content
- Component library extraction

## Capabilities

### New Capabilities

- `visual-mood`: Dark/light mood differentiation with distinct personalities (warm light, moody dark) via CSS tokens
- `scroll-progress`: Reading progress indicator for case study pages (`<ScrollProgress>`)
- `skip-to-content`: WCAG 2.2 AA skip navigation link (`<SkipLink>`)

### Modified Capabilities

None — `openspec/specs/` is empty, first SDD cycle establishes these.

## Approach

| Item            | Implementation                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Stagger         | IntersectionObserver in `ProjectsListPage` + `HomePage` → CSS `animation-delay` per card (50ms)          |
| Skip-to-content | New `<SkipLink>` as first `<body>` child → targets `#main-content`, visible on :focus-visible            |
| Light mood      | New `:root:not(.dark)` block in `index.css` — creamy bg, softer shadows, amber accent pop                |
| Asymmetric      | `.section-left` / `.section-center` utility classes on alternating page sections                         |
| Hover morph     | Enhance `card-base` + ProjectCard transition: `translateY(-6px)`, deeper shadow                          |
| H2 scale        | Add `--text-h2` token in `@theme`, replace ad-hoc sizes in all pages                                     |
| Scroll progress | New `<ScrollProgress>` in CaseStudyTemplate → fixed top bar, tracks scroll % via `requestAnimationFrame` |
| Photo position  | Move `<img>` above `<h1>` in AboutPage grid layout, swap column order                                    |

## Affected Areas

| Area                                                   | Impact   | Description                                                          |
| ------------------------------------------------------ | -------- | -------------------------------------------------------------------- |
| `src/index.css`                                        | Modified | Light mood tokens, H2 scale, asymmetric utilities, hover transitions |
| `src/components/ProjectCard/ProjectCard.tsx`           | Modified | Hover morph animation                                                |
| `src/components/SkipLink/SkipLink.tsx`                 | New      | Skip-to-content component                                            |
| `src/components/ScrollProgress/ScrollProgress.tsx`     | New      | Reading progress bar                                                 |
| `src/pages/HomePage.tsx`                               | Modified | Stagger, asymmetric section layout                                   |
| `src/pages/AboutPage.tsx`                              | Modified | Photo position, asymmetric sections                                  |
| `src/pages/Projects/CaseStudyTemplate.tsx`             | Modified | Scroll progress, H2 scale                                            |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modified | Stagger animation                                                    |

## Risks

| Risk                                  | Likelihood | Mitigation                                              |
| ------------------------------------- | ---------- | ------------------------------------------------------- |
| Light mood breaks existing color refs | Medium     | Audit all `var(--color-*)` usages before merge          |
| Stagger fails on reduced-motion       | Low        | Existing `prefers-reduced-motion` media query covers it |
| Scroll progress flickers              | Low        | `requestAnimationFrame` throttling                      |

## Rollback Plan

Each deliverable is an atomic commit. `git revert <commit>` per item. Light mood tokens are additive — reverting removes them, dark mode is unaffected. Test each revert with `pnpm run dev`.

## Dependencies

None. All changes are self-contained CSS/component work within the existing stack.

## Success Criteria

- [ ] Design audit re-score ≥ 85/100
- [ ] Skip-to-content visible on Tab press, navigates to `#main-content`
- [ ] Light mode feels deliberately warm (not inverted dark mode)
- [ ] H2 font-size uniform across all pages
- [ ] Scroll progress bar renders in every case study and tracks accurately
- [ ] Stagger animation only plays when `prefers-reduced-motion: no-preference`
- [ ] Cards lift with shadow + translateY on hover
