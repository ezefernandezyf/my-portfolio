# visual-mood Specification

## Purpose

Differentiate dark and light modes with distinct visual personalities via CSS custom properties — warm minimal for light, moody deep for dark — replacing the generic inverted color scheme.

## Requirements

### Requirement: Light mood warm personality

The system MUST apply warm, creamy background tones in light mode that feel deliberately crafted rather than mechanically inverted from dark mode.

#### Scenario: Light mode renders warm background

- GIVEN the user has light mode active (`:root:not(.dark)`)
- WHEN the page renders
- THEN `--color-bg-primary` is a warm off-white (e.g., `#faf7f0` range, not `#f8fafc`)
- AND `--color-surface` is a warmer surface tone distinct from the background

#### Scenario: Light mode softens shadow depth

- GIVEN the user has light mode active
- WHEN a `.card-minimal`, `.section-shell`, or `.card-base` element renders
- THEN shadow opacity is lower than dark mode equivalents
- AND shadows use warmer undertones consistent with the creamy palette

#### Scenario: Light mode accent pop

- GIVEN the user has light mode active
- WHEN an accent-colored element renders (`--color-accent`)
- THEN the accent color contrasts visibly against the warm background
- AND accent hover state remains distinguishable

### Requirement: Dark mood preserved identity

The system MUST preserve the existing moody dark aesthetic — deep near-black backgrounds, elevated surfaces, and warm amber accent — as the default theme.

#### Scenario: Dark mode unchanged identity

- GIVEN the user has dark mode active (default)
- WHEN any page renders
- THEN `--color-bg-primary` is near-black (`#0a0a0f` or equivalent)
- AND the amber accent (`#f59e0b` range) remains the primary accent

#### Scenario: Surface hierarchy maintained in dark

- GIVEN dark mode is active
- WHEN stacked surface elements render (cards, sections, panels)
- THEN `--color-surface` and `--color-surface-elevated` create visible depth through incremental lightness

### Requirement: Mood transition respects user motion preference

The system MUST honor `prefers-reduced-motion: reduce` during theme transitions.

#### Scenario: Reduced-motion theme switch

- GIVEN the user has `prefers-reduced-motion: reduce` active
- WHEN the theme toggles between light and dark
- THEN background and text color transitions complete in ≤ 1ms via the existing reduced-motion media query

#### Scenario: Normal motion theme switch

- GIVEN the user has `prefers-reduced-motion: no-preference`
- WHEN the theme toggles
- THEN the transition duration respects `--transition-medium` (250ms)

### Requirement: Mood tokens are additive

The system MUST define light mood tokens as an additive layer — no existing dark-first `@theme` tokens SHALL be removed or renamed.

#### Scenario: Dark mode after light mood change

- GIVEN light mood tokens have been added to `:root:not(.dark)`
- WHEN the user switches to dark mode
- THEN all pages render identically to before the change (no visual regression)
