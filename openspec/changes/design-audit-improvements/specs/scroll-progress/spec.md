# scroll-progress Specification

## Purpose

Provide a thin, fixed-position reading progress bar at the top of every case study page so users can gauge how far they have scrolled through long-form content.

## Requirements

### Requirement: Progress bar tracks scroll percentage

The system MUST render a horizontal bar fixed to the top of the viewport that fills from 0% to 100% as the user scrolls the page.

#### Scenario: Progress at page top

- GIVEN a case study page is loaded
- WHEN the scroll position is at the very top
- THEN the progress bar width is 0%

#### Scenario: Progress at page bottom

- GIVEN a case study page is loaded
- WHEN the user scrolls to the very bottom
- THEN the progress bar width is 100%

#### Scenario: Progress mid-scroll

- GIVEN a case study page is loaded and scrolled halfway
- WHEN the scroll position reaches 50% of the total scrollable distance
- THEN the progress bar width is approximately 50% (±2% tolerance)

### Requirement: Progress bar only on case studies

The system MUST render `<ScrollProgress>` only inside `CaseStudyTemplate` — it SHALL NOT appear on home, about, projects list, contact, or privacy pages.

#### Scenario: Case study page includes bar

- GIVEN the user navigates to any case study route (`/projects/:id`)
- WHEN the page renders
- THEN the scroll progress bar is visible at the top of the viewport

#### Scenario: Non-case-study page excludes bar

- GIVEN the user navigates to `/home`, `/about`, `/projects`, `/contact`, or `/privacy`
- WHEN the page renders
- THEN no scroll progress bar element exists in the DOM

### Requirement: Visual design constraints

The system MUST render the progress bar as a thin horizontal bar using the accent color.

#### Scenario: Visual appearance

- GIVEN a case study page is loaded
- WHEN the progress bar renders
- THEN it is ≤ 4px in height
- AND it uses `--color-accent` as its fill color
- AND it is positioned fixed at `top: 0` with the highest z-index among UI elements

### Requirement: Reduced motion disables animation smoothly

The system MUST render the progress bar at full width instantly when `prefers-reduced-motion: reduce` is active, rather than animating incrementally.

#### Scenario: Reduced motion behavior

- GIVEN the user has `prefers-reduced-motion: reduce` active
- WHEN the user scrolls a case study page
- THEN the progress bar updates to the correct percentage without visible interpolation
