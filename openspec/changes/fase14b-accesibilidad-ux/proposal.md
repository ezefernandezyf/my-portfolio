# Proposal: Fase 14b — Accessibility & UX Writing

## Intent

Fix 9 accessibility and i18n issues from the 360° audit. All mechanical — CSS tokens, i18n keys, React refs, conditional rendering. No architecture changes, no new dependencies.

## Scope

### In Scope

1. `text-wrap: balance` on h1–h3 (DESIGN.md §3)
2. Light mode `text-muted` contrast: `#78716c` → `#6b5e58` (WCAG AA ≥4.5:1)
3. Return focus to hamburger on mobile drawer close
4. i18n: ThemeToggle, LanguageSwitcher, ProjectCarousel tooltips/aria-labels
5. i18n: CaseStudyTemplate ("Case Study"/"Featured"/"The Engineering Stack"), PrivacyPage ("Privacy & Trust"), ProjectsListPage counters
6. i18n: education descriptions in AboutPage (lines 296–303)
7. `DEFAULT_DESC` language-aware in MetaTags (currently Spanish-only fallback)
8. `useThemeColor` read `--color-bg-primary` instead of non-existent `--color-bg`
9. Empty state message on project search with no results

### Out of Scope

Fase 14a fixes (PR #33), Fase 14c/d/e fixes

## Capabilities

### Modified Capabilities

- `accessibility`: focus return, contrast, heading balance, empty states
- `i18n`: tooltips, aria-labels, hardcoded strings, education descriptions across 6+ namespaces
- `theme`: CSS variable fix

## Approach

| Fix | Type               | Lines   |
| --- | ------------------ | ------- |
| 1   | CSS rule           | 3       |
| 2   | Token value        | 1       |
| 3   | Ref + .focus()     | 10      |
| 4   | i18n × 3 comps     | 40 + 24 |
| 5   | i18n × 3 comps     | 11 + 42 |
| 6   | i18n extraction    | 8 + 8   |
| 7   | i18n conditional   | 5       |
| 8   | CSS var name       | 2       |
| 9   | Conditional render | 10 + 4  |

**~168 lines total. Under 400-line budget.**

## Risks

| Risk                                          | Likelihood | Mitigation                                               |
| --------------------------------------------- | ---------- | -------------------------------------------------------- |
| Case study i18n updates touch 12 locale files | Medium     | Batch pattern, verify with `pnpm run dev`                |
| Contrast change shifts visual balance         | Low        | Same hue, 1 step darker toward DESIGN.md "Soft Graphite" |
| Focus return fails on rapid toggle            | Low        | Optional chaining `ref.current?.focus()`                 |

## Rollback Plan

Revert commit. Each fix is atomic — no cross-fix coupling.

## Success Criteria

- [ ] h1–h3 balanced text wrapping, `text-muted` ≥4.5:1 contrast in light mode
- [ ] Mobile drawer close → focus returns to hamburger (keyboard test)
- [ ] All i18n labels/aria-labels/tooltips respond to language switch
- [ ] Empty search shows localized message (ES/EN)
- [ ] `useThemeColor` uses correct `--color-bg-primary` in both modes
- [ ] `pnpm run lint && pnpm run build` pass
