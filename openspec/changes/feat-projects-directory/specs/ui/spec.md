# Delta for Projects UI

## ADDED Requirements

### Requirement: Projects directory rebuild

The system MUST rebuild the projects directory page to match the reference HTML with a strong editorial header, a compact search/filter area, and a responsive project grid. The layout SHOULD present projects in a visually balanced directory format instead of a stacked card feed.

#### Scenario: Directory header is present
- GIVEN the projects page renders
- WHEN the user lands on the page
- THEN the page MUST show a prominent projects title and descriptive intro
- AND the introductory content MUST align with the reference hierarchy

#### Scenario: Search/filter controls are present
- GIVEN the projects page renders
- WHEN the header area is visible
- THEN the search input MUST be present
- AND the directory controls MUST be discoverable without scrolling

### Requirement: Responsive project grid

The system MUST render projects in a responsive grid with consistent card sizing and aligned preview regions across rows and breakpoints. Card content SHOULD remain readable even when copy lengths differ between projects.

#### Scenario: Grid aligns card previews
- GIVEN at least two projects are visible
- WHEN the grid renders at desktop width
- THEN project previews MUST align across cards
- AND differing description lengths MUST NOT shift preview positions vertically

#### Scenario: Grid remains usable on smaller screens
- GIVEN the viewport is below the desktop breakpoint
- WHEN the page renders
- THEN the grid MUST collapse to a single column or other mobile-friendly layout
- AND project actions MUST remain reachable

### Requirement: Search and load-more behavior

The system MUST preserve the existing project search/filter contract and the load-more affordance. Filtering SHOULD continue to match project names, descriptions, and technologies using the current data source.

#### Scenario: Search filters visible projects
- GIVEN the user enters a query
- WHEN the query matches project content
- THEN the visible list MUST be filtered to matching projects only

#### Scenario: Load more reveals additional projects
- GIVEN more projects exist than the initial visible count
- WHEN the user activates load more
- THEN additional projects MUST be revealed without reloading the page

### Requirement: Project action links

Each project card MUST expose case study, repository, and demo actions with icons or link treatments aligned to the reference. The case study action SHOULD be visually distinct from the repository action.

#### Scenario: Project actions remain accessible
- GIVEN a project card is visible
- WHEN the user inspects the actions area
- THEN case study, repo, and demo actions MUST be available when the data exists
- AND each action MUST remain keyboard focusable
