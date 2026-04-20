# Delta for UI

## ADDED Requirements

### Requirement: Responsive header shell

The header MUST match the reference shell across desktop and mobile. Navigation links, language switching, theme switching, and the social/action cluster MUST be present in the header area, while the desktop nav MUST be hidden below the medium breakpoint and the mobile menu trigger MUST be hidden at and above it.

#### Scenario: Desktop header is fully visible

- GIVEN the viewport is at or above the medium breakpoint
- WHEN the header renders
- THEN the primary navigation MUST be visible
- AND the mobile menu trigger MUST NOT be visible

#### Scenario: Mobile header collapses navigation

- GIVEN the viewport is below the medium breakpoint
- WHEN the header renders
- THEN the desktop navigation MUST be hidden
- AND the mobile menu trigger MUST be visible

### Requirement: Mobile drawer interaction

The mobile drawer MUST open and close through the menu button, the close button, Escape, backdrop click, and navigation link activation. While open, the drawer MUST behave as a modal region and body scrolling MUST be disabled.

#### Scenario: Drawer opens and closes from the menu button

- GIVEN the header is rendered on a mobile viewport
- WHEN the user activates the menu button
- THEN the drawer MUST become visible
- AND the menu button state MUST indicate the drawer is open

#### Scenario: Drawer closes through dismissal paths

- GIVEN the mobile drawer is open
- WHEN the user presses Escape or activates a drawer link
- THEN the drawer MUST close
- AND body scrolling MUST be restored

### Requirement: Language switcher state contract

The language switcher MUST expose exactly two choices, ES and EN. The active choice MUST be reflected through `aria-pressed`, and a successful change MUST update the document language to the selected locale.

#### Scenario: Switching languages updates the active state

- GIVEN the current language is ES
- WHEN the user selects EN
- THEN EN MUST become the active choice
- AND `document.documentElement.lang` MUST become `en`

#### Scenario: Failed language change preserves the current locale

- GIVEN the language change operation rejects
- WHEN the user selects a different locale
- THEN the current active choice MUST remain unchanged
- AND the document language MUST NOT be updated

### Requirement: Theme toggle state contract

The theme toggle MUST reflect the current theme state from the theme context and MUST invoke the toggle action when activated. When the stored preference is system, the control MUST still describe the resolved visual theme while preserving the system preference.

#### Scenario: Theme toggle invokes the context action

- GIVEN the theme toggle is rendered with any resolved theme
- WHEN the user activates the control
- THEN the theme context toggle action MUST be called once

#### Scenario: System theme remains readable

- GIVEN the stored theme is system
- WHEN the toggle renders
- THEN the control title MUST describe the resolved theme and the stored preference
- AND the icon MUST reflect the resolved theme

### Requirement: Footer and shell composition

The footer MUST render the current copyright year and the privacy policy link. The main layout MUST compose the header, a single main content region, and the footer in that order, and the main region MUST expose `role="main"`.

#### Scenario: Footer renders the legal link

- GIVEN the layout is rendered
- WHEN the footer appears
- THEN the copyright line MUST include the current year
- AND the privacy policy link MUST be present and focusable

#### Scenario: Main layout preserves shell order

- GIVEN a routed page is rendered inside the main layout
- WHEN the page content loads
- THEN the header MUST appear before the main region
- AND the footer MUST appear after the main region