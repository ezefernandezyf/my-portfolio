# Delta for UI

## MODIFIED Requirements

### Requirement: Home hero and preview section

The home page MUST keep the hero plus preview-aside structure from the current app and the `indexReference.html` hierarchy. Visual spacing, alignment, and sizing MAY be tuned, but the hero MUST remain first and the preview MUST remain adjacent on wide layouts.

#### Scenario: Hero remains the top section

- GIVEN the home page loads on any viewport
- WHEN the page renders
- THEN the hero content MUST appear before all other home sections
- AND the preview content MUST remain part of the top section

#### Scenario: Layout adapts without changing structure

- GIVEN the viewport is below the desktop breakpoint
- WHEN the hero section renders
- THEN the hero and preview MUST stack vertically
- AND the section order MUST remain unchanged

### Requirement: Bottom section becomes a recent-work grid

The current bottom three-card text-only section MUST be replaced with a recent-work/project grid that surfaces portfolio work from existing project data. The grid MUST present projects as visual cards and MUST reuse the existing project presentation primitives where applicable.

#### Scenario: Grid replaces the text cards

- GIVEN the home page renders
- WHEN the bottom section is displayed
- THEN the three text-only cards MUST NOT appear
- AND a project grid MUST be visible instead

#### Scenario: Grid stays visually rich

- GIVEN eligible projects exist in the data set
- WHEN the recent-work section renders
- THEN each item MUST be shown as a project card or equivalent project preview
- AND the section MUST remain distinct from the hero

## ADDED Requirements

### Requirement: Curated project selection

The home page MUST select projects from `src/data/projects.ts` using a deterministic, curated rule set. Featured projects SHOULD be prioritized, and the rendered set MUST stay small enough to function as a recent-work highlight rather than a full directory.

#### Scenario: Featured projects are preferred

- GIVEN multiple projects exist in the data set
- WHEN the recent-work grid is built
- THEN featured projects MUST be selected before non-featured projects
- AND the ordering MUST be stable across renders

#### Scenario: Selection remains bounded

- GIVEN the project data contains more eligible projects than the home grid should show
- WHEN the home page renders
- THEN only the curated subset MUST be shown
- AND no project MUST appear twice

### Requirement: Framer-motion staggered entrance

The home page MUST apply framer-motion fade-in and stagger behavior to the hero and recent-work sections. Motion MUST be restrained and MUST NOT block content visibility.

#### Scenario: Items animate in sequence

- GIVEN the page becomes visible
- WHEN the hero and grid items enter
- THEN elements MUST fade in with staggered timing
- AND the content MUST remain readable during the transition

#### Scenario: Reduced motion is respected

- GIVEN the user prefers reduced motion
- WHEN the page renders
- THEN staggered motion MUST be suppressed or minimized
- AND all content MUST remain visible

### Requirement: Home copy keys are synchronized

The home page MUST define matching `home` namespace keys in both `en` and `es` for the hero, recent-work, and CTA copy used on the page. Missing keys MUST NOT be tolerated at runtime.

#### Scenario: Both locales expose the same keys

- GIVEN the home namespace is loaded in English and Spanish
- WHEN the page resolves its labels
- THEN each key used by the home page MUST exist in both locales
- AND the namespaces MUST remain structurally aligned

#### Scenario: Missing keys are detectable in tests

- GIVEN a locale is missing a home key
- WHEN the home page renders under tests
- THEN the missing label MUST fail the locale contract
- AND the broken copy MUST not ship unnoticed