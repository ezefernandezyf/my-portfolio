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

- [ ] T1 Rewrite the open source intro and the home hero bio (ES + EN).
- [ ] T2 Add the Open Source CTA to the home hero.
- [ ] T3 Replace every em dash with real punctuation (locales, TSX, CSS, llms.txt, docs).
- [ ] T4 Unify the type scale: one display class for page h1, one headline class for h2.
- [ ] T5 Unify the radius scale and delete the dead CSS utilities.
- [ ] T6 Collapse the repeated animation ladder.
- [ ] T7 Move the stack chips out of the hero into their own section.
- [ ] T8 Verify: lint, tests, coverage, prerender, production deploy.

## Constraints taken from DESIGN.md

- Display: clamp(2.25rem, 6vw, 4.5rem), line-height 0.9, tracking -0.03em.
- Headline: clamp(1.75rem, 4vw, 2.25rem), line-height 1.1, tracking -0.02em.
- Radii: buttons 8px, minimal cards 12px, elevated (ProjectCard) 12px. No pill buttons.
- `text-wrap: balance` on h1–h3, `text-wrap: pretty` on body paragraphs.
- One deliberate kicker is voice; an eyebrow on every section is AI grammar.
