# Feature: Design consolidation + copy corrections

Branch: `feat/design-consolidation` (from `develop` @ `f1127d9`)

## Goal

Close the four items the anti-slop audit flagged but the previous release deferred, plus
the three corrections requested after release: two rewritten passages, an Open Source
call to action in the home hero, and removing every em dash from the repository.

## Non-goals

- No new palette, no new fonts, no layout reinvention.
- No change to the documented weight of display headings (see the font limitation below).

## Font limitation (blocking, reported not fixed)

`index.html` loads `Instrument+Serif:ital@0;1`: the family ships a single weight (400).
Every `font-medium` / `font-bold` on display text is **synthetic** bold. DESIGN.md asks
for 700, which the font cannot deliver. This branch unifies size, line-height and
tracking, and keeps the current rendered weight so the deploy does not change every
heading visually. Choosing between "keep synthetic bold" and "render the real 400" is a
design decision, not a cleanup, so it is left open.

## Tasks

- [x] T1 Rewrite the open source intro and the home hero bio (ES + EN).
- [x] T2 Add the Open Source CTA to the home hero.
- [x] T3 Replace every em dash with real punctuation (locales, TSX, CSS, llms.txt, docs).
- [x] T4 Unify the type scale: one display class for page h1, one headline class for h2.
- [x] T5 Unify the radius scale and delete the dead CSS utilities.
- [x] T6 Collapse the repeated animation ladder.
- [x] T7 Move the stack chips out of the hero into their own section.
- [x] T8 Verify: lint, tests, coverage, prerender, production deploy.

## Constraints taken from DESIGN.md

- Display: clamp(2.25rem, 6vw, 4.5rem), line-height 0.9, tracking -0.03em.
- Headline: clamp(1.75rem, 4vw, 2.25rem), line-height 1.1, tracking -0.02em.
- Radii: buttons 8px, minimal cards 12px, elevated (ProjectCard) 12px. No pill buttons.
- `text-wrap: balance` on h1–h3, `text-wrap: pretty` on body paragraphs.
- One deliberate kicker is voice; an eyebrow on every section is AI grammar.

## Evidence

- Commits: `63196fe` (CTA + two rewrites), `2e0be2a` (em dash sweep), `e74e908` (type
  and radius scale), `8867a79` (motion collapse), `0bdc8af` (hero diet).
- `pnpm run lint` clean, `pnpm exec vitest run` 32 files / 145 tests.
- `pnpm run test:coverage`: lines 92.85 %, functions 85.23 %, branches 72.72 %.
- `scripts/prerender.mjs`: 32 pages, 0 failed.
- Em dash count across `src`, `public`, `odd`, `docs`: 0.

## Decisions

- Display headings keep `font-medium`. The family ships a single weight, so switching to
  700 would only make the synthetic bold heavier. Reported, not changed.
- The icons in About section headings were removed: three identical `flex items-center
  gap-3` + icon headings read as a stamped template. The icons remain in the cards where
  they carry meaning.
- Scroll-reveal on the home page stays; it reveals sections, not individual list items.
