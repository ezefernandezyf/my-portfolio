# Delta for UI

## ADDED Requirements

### Requirement: Full layout rebuild

The system MUST rebuild Header, Footer, Language Switcher, and Theme Toggle from scratch for module 1R. Incremental visual tuning over previous UI SHALL NOT be considered valid completion.

#### Scenario: Rebuild acceptance gate
- GIVEN module 1R implementation is proposed as complete
- WHEN the team evaluates deliverables
- THEN each layout component MUST be newly reconstructed
- AND completion MUST NOT rely on minor style edits over prior markup

### Requirement: Pixel-perfect reference parity

The rebuilt layout components MUST match docs/redesignReferences with pixel-perfect parity across desktop and mobile breakpoints, including typography, spacing, hierarchy, and interactive states.

#### Scenario: Desktop parity
- GIVEN a desktop viewport
- WHEN the rebuilt layout is compared against reference HTML
- THEN structure, typographic scale, spacing, and control placement MUST match the reference

#### Scenario: Mobile parity
- GIVEN a mobile viewport
- WHEN the rebuilt layout is compared against reference HTML
- THEN navigation behavior and visual hierarchy MUST match the reference

### Requirement: Contract preservation

The rebuilt UI MUST preserve i18n language switching and theme toggling behavior without page reload.

#### Scenario: Language switching remains functional
- GIVEN the user toggles language
- WHEN the switcher is activated
- THEN visible labels MUST change accordingly
- AND document language metadata MUST remain aligned

#### Scenario: Theme toggling remains functional
- GIVEN the user toggles theme
- WHEN the control is activated
- THEN theme state MUST change correctly
- AND visual result MUST remain consistent with the new layout

### Requirement: Module dependency gate

Module 2 and later modules MUST remain blocked until module 1R passes pixel-perfect and behavior verification.

#### Scenario: Module progression control
- GIVEN module 1R is not fully accepted
- WHEN planning attempts to continue module 2
- THEN implementation MUST be paused
- AND the backlog MUST reflect module 1R as blocking work
