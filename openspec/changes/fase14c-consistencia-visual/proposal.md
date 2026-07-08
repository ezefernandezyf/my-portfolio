# Proposal: Fase 14c — Consistencia Visual

## Intent

7 fixes from the 360° audit: unify button heights, heading scales across pages, remove hardcoded gradient colors that break light mode, fix ProjectCard vertical alignment, add bottom spacing in CaseStudyTemplate, evaluate light-mode parchment, and integrate unused `eslint-plugin-prettier` dependency.

## Scope

### In Scope

- Unify primary button height to 56px (`h-14`) per DESIGN.md across AboutPage, ContactPage, CaseStudyTemplate
- Normalize page H1s to DESIGN.md Headline scale (`clamp(1.75rem, 4vw, 2.25rem)`) except HomePage hero (Display scale)
- Replace hardcoded `rgba(245,158,11,0.12)` gradients at HomePage L129, ProjectsListPage L75 with `color-mix(in srgb, var(--color-accent) 12%, transparent)`
- Fix ProjectCard: use `mt-auto` on image container so cards align images vertically in grid
- Add `pb-24` (6rem) on CaseStudyTemplate wrapper (currently `pb-0`)
- Evaluate light-mode `#faf7f0` — recommend KEEP with DESIGN.md justification
- Integrate `eslint-plugin-prettier` + `eslint-config-prettier` into ESLint flat config

### Out of Scope

- HomePage hero headings (correct per DESIGN.md Display scale)
- Fase14a, 14b, 14d, 14e tasks
- New features or refactors beyond listed files

## Capabilities

### New Capabilities

None

### Modified Capabilities

None

## Approach

Targeted Tailwind class replacements. All changes reference DESIGN.md tokens. No new deps needed. Fix 6 (parchment) is decision-only — no code change.

## Affected Areas

| Area                                                   | Impact   | Description                                                   |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------- |
| `src/pages/AboutPage.tsx`                              | Modified | Button heights → `h-14`, H1 heading → Headline scale          |
| `src/pages/ContactPage.tsx`                            | Modified | Submit button → `h-14`                                        |
| `src/pages/Projects/CaseStudyTemplate.tsx`             | Modified | Demo/repo buttons → `h-14`, wrapper `pb-0` → `pb-24`          |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Modified | H1 heading, hardcoded gradient                                |
| `src/pages/HomePage.tsx`                               | Modified | Hardcoded radial gradient                                     |
| `src/components/ProjectCard/ProjectCard.tsx`           | Modified | Image container → `mt-auto`, remove `min-h-*`                 |
| `eslint.config.js`                                     | Modified | Add prettier plugin + config                                  |
| `DESIGN.md`                                            | Modified | Document parchment decision (if kept, add rationale footnote) |

## Risks

| Risk                                           | Likelihood | Mitigation                                                         |
| ---------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| Button height changes cause overflow on mobile | Low        | All targets already near 56px; `min-h-[3.5rem]` prevents collapse  |
| Heading resize breaks line wraps               | Low        | Headline clamp handles responsive; visual check in both modes      |
| `color-mix()` not supported in older Safari    | Low        | OKLCH project uses same pattern throughout; Safari 15+ supports it |

## Rollback Plan

`git revert` each commit. Changes are isolated to 5 component files — no shared types or state.

## Dependencies

- PR #33 (fase14a + fase14b) merged to `feat/fase14-audit-fixes`
- `eslint-config-prettier` already in devDependencies

## Success Criteria

- [ ] All primary buttons render at 56px height in both modes
- [ ] Page H1s use consistent Headline scale (`text-[1.75rem] md:text-[2.25rem]`)
- [ ] Radial gradient adapts to light/dark via `var(--color-accent)`
- [ ] ProjectCard images align to bottom of card in 2-column grid
- [ ] CaseStudyTemplate has 6rem bottom padding between last section and footer
- [ ] Light-mode parchment decision documented in DESIGN.md
- [ ] `pnpm run lint` reports Prettier formatting issues (integration verified)
