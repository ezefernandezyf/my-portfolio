# skip-to-content Specification

## Purpose

Provide a WCAG 2.2 AA compliant skip navigation link as the first focusable element, allowing keyboard and screen reader users to bypass repetitive navigation and jump directly to the main content.

## Requirements

### Requirement: Skip link is first focusable element

The system MUST render a skip-to-content link as the first interactive element in the DOM on every page.

#### Scenario: Tab order places skip link first

- GIVEN any page is loaded
- WHEN the user presses Tab
- THEN the skip link receives focus before the header or any navigation element

#### Scenario: Skip link visible on focus

- GIVEN the skip link has keyboard focus
- WHEN the `:focus-visible` pseudoclass matches
- THEN the link becomes visibly opaque at the top of the viewport
- AND the link displays translated text indicating "Skip to main content" (ES) or "Skip to content" (EN)

#### Scenario: Skip link hidden when not focused

- GIVEN the skip link does NOT have focus
- WHEN the user views the page
- THEN the link is visually hidden using the `.sr-only` pattern or equivalent
- AND it does not occupy visible layout space

### Requirement: Skip link navigates to main content

The system MUST navigate focus to the `#main-content` element when the skip link is activated.

#### Scenario: Activation moves focus

- GIVEN the skip link has focus
- WHEN the user presses Enter
- THEN focus moves to the element with `id="main-content"`
- AND the main content element receives a visible focus ring

#### Scenario: Main content exists on every page

- GIVEN any page in the portfolio
- WHEN the page renders
- THEN an element with `id="main-content"` exists and wraps the primary content region

### Requirement: Internationalization support

The system MUST display the skip link text in the user's active language (ES/EN), using the existing i18next infrastructure.

#### Scenario: Spanish text

- GIVEN the active language is Spanish
- WHEN the skip link receives focus
- THEN the visible text reads "Saltar al contenido principal" or equivalent

#### Scenario: English text

- GIVEN the active language is English
- WHEN the skip link receives focus
- THEN the visible text reads "Skip to content" or equivalent

### Requirement: Reduced-motion compliance

The system MUST disable any CSS transition on the skip link when `prefers-reduced-motion: reduce` is active.

#### Scenario: Reduced-motion focus

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the skip link receives or loses focus
- THEN any opacity/transform change is instantaneous (≤ 1ms)
