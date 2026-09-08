# projects-directory Specification

## Purpose

Define the projects data model and directory behavior: the `projects` array in `src/data/projects.ts`, the visible-project pagination in the grid, and how featured/project-listing i18n resolves. This is a NEW capability (no existing `projects-directory` spec).

## Requirements

### Requirement: PD-1 — Project entry shape

Every entry in `src/data/projects.ts` SHALL declare `id`, `nameKey`, `shortKey`, `repo`, `images` (array), `tech` (array), `year`, and `featured`. `demo` is OPTIONAL (omitted when absent).

#### Scenario: Valid entry renders in grid

- GIVEN a project entry with all required fields
- WHEN `ProjectCard` renders it
- THEN name, short, repo, first image, tech, and year display correctly

### Requirement: PD-2 — Featured ordering

The `projects` array SHALL be order-sensitive: `featured: true` entries SHALL be ordered with the newest flagship first, and `getProjects().slice(0, 2)` SHALL be relied upon by the landing hero/carousel.

#### Scenario: Landing slice surfaces two flagship projects

- GIVEN `projects` has `geo-saas` at position 0 and `echolog` at position 1
- WHEN the home page renders its featured section via `slice(0, 2)`
- THEN both Relevy and EchoLog appear, in that order

### Requirement: PD-3 — Grid visibility pagination

`INITIAL_VISIBLE_PROJECTS` SHALL be 9 and `LOAD_MORE_STEP` SHALL be 3. The grid SHALL render `filteredProjects.slice(0, visibleProjects)` and offer "load more" while more items remain.

#### Scenario: Nine projects initially visible

- GIVEN 9 total projects exist (8 prior + Relevy)
- WHEN `/projects` renders
- THEN 9 project cards are visible with no "load more" required
