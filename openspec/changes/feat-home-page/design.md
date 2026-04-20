# Design: Home Page Featured Work Refresh

## Technical Approach

Keep the current home page structure, but replace the bottom three text-only cards with a recent-work grid built from `src/data/projects.ts`. Reuse the existing `ProjectCard` and `MetaTags` components, keep the hero at the top, and keep the preview aside as a smaller supporting block so the featured grid becomes the main secondary section. Add `framer-motion` for lightweight fade/slide entrance and staggered children, with reduced-motion handling so content remains immediately readable.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Hero / preview aside | Keep the hero and preview aside structure, but visually reduce the aside so it supports the page instead of competing with the grid. | Rebuild the hero or remove the aside entirely. | The proposal and spec both require preserving the top layout; reducing the aside is enough to rebalance hierarchy without a broader refactor. |
| Recent-work rendering | Render a compact grid of existing project cards in `HomePage` with no new feature layer. | Create a new featured-work component or data adapter. | The change is intentionally minimal; `HomePage` can own the selection and layout logic without introducing another abstraction. |
| Motion | Use `framer-motion` containers/items with simple opacity + translateY variants, and suppress or minimize motion when reduced motion is preferred. | No motion, or a complex animation system. | The UI reference benefits from subtle movement, but the change must remain accessible and cheap to maintain. |
| Project selection | Show featured projects first, in source order, and cap the home grid to a small curated subset. | Show all projects or derive a dynamic ranking. | The home page is a highlight, not a directory. Source order already encodes curation in `projects.ts`, so the selection stays deterministic. |

## Data Flow

`src/data/projects.ts` remains the source of truth for project metadata. `HomePage` reads that array, filters to `featured === true`, and slices the result to a small home subset (two items for the recent-work highlight). If the featured set changes later, ordering remains stable because the source array order is the tie-breaker.

Home copy continues to come from the `home` namespace for page labels, section headings, CTA text, and motion-safe labels. Individual project names and blurbs still resolve through the existing `projects` namespace keys used by `ProjectCard` and the case-study pages.

```
projects.ts ──→ HomePage selection ──→ ProjectCard grid
     │                    │                    │
     └── projects i18n ───┴── home i18n ───────┘
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json` | Modify | Add `framer-motion` as a runtime dependency. |
| `src/pages/HomePage.tsx` | Modify | Replace the bottom cards with a featured-project grid, add motion wrappers, and reduce the preview aside prominence. |
| `src/locales/en/home.json` | Modify | Add/update labels for the recent-work section and supporting CTA copy. |
| `src/locales/es/home.json` | Modify | Keep ES keys aligned with the English home namespace. |
| `src/pages/tests/HomePage.test.tsx` | Modify | Assert the new grid, curated project selection, and key home labels. |

## Interfaces / Contracts

No new shared interfaces are required. The home page can consume the existing project shape:

```ts
type FeaturedProject = {
  id: string;
  nameKey: string;
  shortKey: string;
  repo?: string;
  demo?: string;
  images?: string[];
  tech?: string[];
  year?: number;
  featured?: boolean;
};
```

The only local contract is the deterministic selection rule in `HomePage`: `featured` first, then current array order, then a small slice.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Project selection and locale keys | Keep the selection logic simple enough to assert through `HomePage` output; fail tests if the home namespace drifts between `en` and `es`. |
| Integration | Home page rendering and motion-safe UI | Render `HomePage` under `MemoryRouter`, verify the hero still appears first, the aside still exists, and the recent-work grid shows the expected featured projects. |
| Component | Reused `ProjectCard` behavior | Re-run existing `ProjectCard` coverage only if its props or layout need adjustments; otherwise leave it unchanged. |

## Migration / Rollout

No migration required. This is a purely presentational refactor behind the existing home route. If the new grid regresses, revert `HomePage.tsx` and the locale copy while leaving `projects.ts` and shared components untouched.

## Open Questions

- None. The data source, selection rule, and layout scope are already constrained by the current code and the index reference.