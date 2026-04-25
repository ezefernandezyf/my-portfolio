# Delta for Case Studies Template

## ADDED Requirements

### Requirement: Shared case study template

The system MUST render case study pages through a shared template that uses a consistent hero, media block, and editorial body layout aligned to the reference HTML. The template SHOULD allow per-project content to vary without changing the overall visual language.

#### Scenario: Case study header is consistent
- GIVEN any case study route renders
- WHEN the page loads
- THEN the hero/header area MUST use the same shared structure across projects
- AND the title, subtitle, and top actions MUST align with the reference hierarchy

#### Scenario: Case study media block is consistent
- GIVEN a case study includes preview images
- WHEN the page renders
- THEN the media block MUST preserve consistent proportions and placement across projects
- AND differing image dimensions MUST NOT change the overall layout rhythm

### Requirement: Optional section rendering

The system MUST allow each case study to render only the sections that apply to that project while preserving a shared section style. Missing sections SHOULD be omitted cleanly without visual gaps or empty placeholders.

#### Scenario: Project-specific sections render
- GIVEN a project provides stack, summary, problem, and implementation content
- WHEN the case study page renders
- THEN the template MUST display those sections in the shared order
- AND section headings MUST use the reference typography and spacing

#### Scenario: Unsupported sections are omitted
- GIVEN a project does not define an optional section
- WHEN the page renders
- THEN the template MUST skip that section
- AND the layout MUST remain visually balanced

### Requirement: Shared actions and navigation

The system MUST keep the repository, demo, and back navigation actions available in the case study header area when the project data provides them. These actions SHOULD match the reference emphasis and remain keyboard accessible.

#### Scenario: Header actions remain available
- GIVEN the project has repository and demo URLs
- WHEN the header renders
- THEN the template MUST show repo and demo actions
- AND the back-to-projects action MUST still be present

### Requirement: Route-level compatibility

The system MUST preserve the existing project routes and localized content namespaces so the migration does not break current links or translations.

#### Scenario: Existing routes still resolve
- GIVEN an existing case study URL is visited
- WHEN routing resolves
- THEN the current path MUST still load the correct project page
- AND the page MUST render through the new shared template