# Tasks: Fase 14c — Consistencia Visual

## Review Workload Forecast

| Field                   | Value                       |
| ----------------------- | --------------------------- |
| Estimated changed lines | ~25                         |
| 400-line budget risk    | Low                         |
| Chained PRs recommended | No                          |
| Suggested split         | Single PR                   |
| Delivery strategy       | single-pr                   |
| Chain strategy          | size-exception (not needed) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Button Height & Heading Scale Unification

- [x] 1.1 **AboutPage.tsx** — Change hero buttons L144/L151 `px-6 py-3` → `h-14 px-8`; change H1 L133 `text-[2.75rem] sm:text-[3.25rem]` → `text-[1.75rem] font-bold tracking-[-0.02em] md:text-[2.25rem]`
- [x] 1.2 **ContactPage.tsx** — Change submit button L280 `px-10 py-3` → `h-14 px-10`
- [x] 1.3 **CaseStudyTemplate.tsx** — Change demo button L182 `px-6 py-3` → `h-14 px-6`; change repo button L193 `px-6 py-3` → `h-14 px-6`; change H1 L170 `text-[3rem] sm:text-[3.5rem]` → `text-[1.75rem] font-bold tracking-[-0.02em] md:text-[2.25rem]`
- [x] 1.4 **ProjectsListPage.tsx** — Change H1 L79 `text-[3.5rem]` → `text-[1.75rem] font-bold tracking-[-0.02em] md:text-[2.25rem]`

## Phase 2: Gradient, Card & Spacing Fixes

- [x] 2.1 **HomePage.tsx** — Replace L130 `rgba(245,158,11,0.12)` with `color-mix(in srgb, var(--color-accent) 12%, transparent)`
- [x] 2.2 **ProjectsListPage.tsx** — Replace L75 gradient `rgba(245,158,11,0.12)` with `color-mix(in srgb, var(--color-accent) 12%, transparent)`
- [x] 2.3 **ProjectCard.tsx** — Remove L66 `min-h-32 md:min-h-36` from content div; add `mt-auto` to image container L75
- [x] 2.4 **CaseStudyTemplate.tsx** — Change L163 wrapper `pb-0 pt-24` → `pb-24 pt-24`

## Phase 3: Dependency & Documentation

- [x] 3.1 **eslint.config.js** — Import `eslint-plugin-prettier` and `eslint-config-prettier`; add `...eslintConfigPrettier` to `extends` and `plugins: { prettier: eslintPluginPrettier }` with rule `prettier/prettier: "error"`
- [x] 3.2 **DESIGN.md** — Add rationale footnote for `#faf7f0` parchment: "Reviewed July 2026 audit. Kept because it forms half of the dual-mode identity (not inverted dark mode). Paired with burnished amber (`#b45309`), it carries the same personality as dark mode — warm, intentional, grounded. Off-white alternatives risk feeling sterile; chromatic shift risks feeling derivative."
- [x] 3.3 **Decision**: Evaluate parchment — RESOLVE: keep `#faf7f0` as-is (see 3.2 rationale)

## Phase 4: Verification

- [x] 4.1 Run `pnpm run build` — ensure no TS/compilation errors
- [x] 4.2 Run `pnpm run lint` — verify Prettier rules fire on format issues
- [x] 4.3 Visual check: toggle dark/light mode, verify gradients adapt and button heights consistent
- [x] 4.4 Visual check: verify ProjectCard grid alignment at md+ breakpoints
- [x] 4.5 Run `pnpm test` — verify existing tests still pass
