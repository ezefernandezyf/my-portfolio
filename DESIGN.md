---
name: 'Ezequiel Fernández — Portfolio'
description: 'Full Stack Developer portfolio with dark-first amber-accented design system'
colors:
  near-black-void: '#0a0a0f'
  deep-slate: '#14141a'
  shadow-blue: '#1a1a24'
  white-stone: '#fafafa'
  warm-silver: '#a1a1aa'
  faded-pewter: '#9ca3af'
  monitor-amber: '#f59e0b'
  ember: '#d97706'
  subtle-line: '#27272a'
  active-line: '#3f3f46'
  warm-parchment: '#faf7f0'
  rough-linen: '#f5f0e8'
  washed-stone: '#efe8da'
  iron-ink: '#1c1917'
  soft-graphite: '#57534e'
  faded-clay: '#78716c'
  burnished-amber: '#b45309'
  deep-amber: '#92400e'
  subtle-ochre: '#e7e2d8'
  active-ochre: '#d6cfc2'
typography:
  display:
    fontFamily: 'Instrument Serif, Georgia, serif'
    fontSize: 'clamp(2.25rem, 6vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Instrument Serif, Georgia, serif'
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Work Sans, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'Work Sans, system-ui, sans-serif'
    fontSize: '0.625rem'
    fontWeight: 700
    letterSpacing: '0.18em'
  mono:
    fontFamily: 'JetBrains Mono, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: '6px'
  md: '8px'
  lg: '12px'
  xl: '24px'
  pill: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  xxl: '48px'
  section: '96px'
  gutter: '32px'
  gutter-sm: '16px'
components:
  button-primary:
    backgroundColor: '{colors.monitor-amber}'
    textColor: '{colors.near-black-void}'
    rounded: '{rounded.md}'
    padding: '16px 32px'
    height: '56px'
  button-primary-hover:
    backgroundColor: '{colors.ember}'
  button-outline:
    textColor: '{colors.white-stone}'
    rounded: '{rounded.md}'
    padding: '16px 32px'
    height: '56px'
  button-ghost:
    textColor: '{colors.monitor-amber}'
    padding: '8px 16px'
    height: '56px'
  btn-minimal:
    rounded: '{rounded.lg}'
    padding: '12px 24px'
  card-base:
    backgroundColor: '{colors.deep-slate}'
    rounded: '{rounded.md}'
    padding: '16px'
  card-minimal:
    rounded: '{rounded.lg}'
    padding: '16px'
  card-elevated:
    backgroundColor: '{colors.deep-slate}'
    rounded: '{rounded.lg}'
    padding: '32px'
  input:
    backgroundColor: '{colors.shadow-blue}'
    rounded: '{rounded.sm}'
    padding: '12px 16px'
  chip:
    rounded: '{rounded.pill}'
    padding: '2px 10px'
  nav-link:
    typography: label
---

# Design System: Ezequiel Fernández — Portfolio

## 1. Overview

**Creative North Star: "The Architect's Studio"**

This portfolio is a room with controlled lighting, noble materials, and precise blueprints. Every surface is deliberate — nothing is here because a template put it here. The studio is dark by default: deep near-black walls that push content forward, with amber as the only source of warmth, like monitor light reflecting off a desk at dusk. The designer works in this room, and the room itself proves the work.

The system practices what it preaches. A Full Stack Developer portfolio cannot look like it was generated — the portfolio IS the proof of craft. Every component, transition, and layout choice must feel intentional, not inherited. Dark-first is not a fashion statement here; it is the atmosphere of the room. Light mode is given equal care, with warm parchment tones and a burnished amber that preserves the same hierarchy and personality in daylight.

**Key Characteristics:**

- **Dark-first, dual-mode.** Near-black void background is the default. Light mode switches to warm parchment with its own amber accent, not inverted colors.
- **Single accent restraint.** Amber (OKLCH ~0.70 0.158 74) is the only chromatic color. It occupies ≤10% of any given screen. Its rarity is the point.
- **Responsive elevation.** Surfaces are flat at rest. Shadows appear only on hover or interaction — quiet in repose, responsive to touch.
- **Editorial typography contrast.** Serif display (Instrument Serif) for hierarchy and personality; sans body (Work Sans) for readability. The pairing is the primary aesthetic move.
- **Micro-interactions with purpose.** Motion communicates state change and hierarchy. It never decorates.

## 2. Colors: The Studio Palette

The palette is a two-temperature system: a near-black neutral core with a single amber accent. Dark mode and light mode each have their own amber — cooler and brighter in dark, warmer and deeper in light — so the same emotional role survives the mode switch without looking like a filter.

All tokens use OKLCH internally for consistent lightness and chroma across modes. Hex values in this document are the sRGB approximations used in the codebase.

### Primary (Accent)

- **Monitor Amber** (dark: `#f59e0b` / oklch 0.702 0.158 74) — the single accent. Used for CTAs, active nav underlines, focus rings, highlights. Never used as a background for body text. In light mode, shifts to **Burnished Amber** (`#b45309` / oklch 0.539 0.156 54), which carries the same energy against a warm-parchment background.
- **Ember / Deep Amber** (`#d97706` / `#92400e`) — hover states for accent elements. One step darker in the same hue, preserving direction without a hue shift.

### Neutral

- **Near-Black Void** (dark bg: `#0a0a0f`) — primary background. A near-black with a trace of cool blue. In light mode, **Warm Parchment** (`#faf7f0`) — a warm off-white with a touch of ochre warmth, never cream or beige.
  > **Parchment rationale (2026 audit).** Kept because it forms half of the dual-mode identity (not inverted dark mode). Paired with burnished amber (`#b45309`), it carries the same personality as dark mode — warm, intentional, grounded. Off-white alternatives risk feeling sterile; chromatic shift risks feeling derivative.
- **Deep Slate / Rough Linen** (`#14141a` / `#f5f0e8`) — surface layer. Cards, panels, section backgrounds. One step up from the void/parchment.
- **Shadow Blue / Washed Stone** (`#1a1a24` / `#efe8da`) — elevated surfaces. Input backgrounds, hovered drawer items, image placeholders. Slightly cooler in dark mode (blue undertone), slightly more ochre-warm in light.
- **White Stone / Iron Ink** (`#fafafa` / `#1c1917`) — primary text. Maximum contrast in both modes.
- **Warm Silver / Soft Graphite** (`#a1a1aa` / `#57534e`) — secondary text. Descriptions, meta, nav links. Must maintain ≥4.5:1 contrast against its background.
- **Faded Pewter / Faded Clay** (`#9ca3af` / `#78716c`) — muted text. Placeholders, captions, legal text. Floor value for readability.
- **Subtle Line / Subtle Ochre** (`#27272a` / `#e7e2d8`) — default borders. Cards, inputs, dividers. Invisible until you look for it.
- **Active Line / Active Ochre** (`#3f3f46` / `#d6cfc2`) — hover borders. Appears on interactive element hover.

**The Monitor Glow Rule.** Amber occupies ≤10% of any given screen. It is the flash of a monitor in a dark room, not a floodlight. The accent is always the smallest area, always the highest contrast.

**The Two-Amber Rule.** Dark mode amber and light mode amber are NOT the same color. Dark mode wants a bright, warm amber (`#f59e0b`) against near-black. Light mode wants a deeper, more saturated amber (`#b45309`) against warm parchment. If you swap them, one mode will look washed out or harsh.

## 3. Typography: Crafted Contrast

**Display Font:** Instrument Serif (with Georgia, serif fallback)
**Body Font:** Work Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** The pairing carries the entire visual personality. Instrument Serif brings the weight of editorial design and architectural confidence — its wedge serifs and generous proportions demand attention without shouting. Work Sans supplies clean, unobtrusive readability for long text. The contrast between them is the defining aesthetic relationship of the system.

### Hierarchy

- **Display** (700, clamp(2.25rem, 6vw, 4.5rem), 0.9, -0.03em letter-spacing): Hero names and major headings. Capped at 6rem (~96px) ceiling; never larger. `text-wrap: balance` required. Use `text-balance` Tailwind utility or equivalent.
- **Headline** (700, clamp(1.75rem, 4vw, 2.25rem), 1.1, -0.02em): Section titles. The "H2" of the system. Unify scale across all section headings — no page has a larger or smaller section title than another.
- **Title** (600, 1rem, 1.3): Card titles, list item headers. Medium weight, body-sized, minimal letter-spacing.
- **Body** (400, 1rem, 1.7): Running text, descriptions, project summaries. Capped at 65–75ch line length. Color is Warm Silver / Soft Graphite, never White Stone / Iron Ink (reserve those for headings).
- **Label** (700, 0.625rem / 10px, 0.18em, uppercase): Eyebrow text, button labels, nav items, form labels. The "small but loud" tier. Always uppercase with wide tracking. Never exceed 11px.
- **Mono** (400, 0.875rem, 1.5): Code snippets, years, data values. JetBrains Mono for its legible, technical character.

**The serif-only-for-display rule.** Instrument Serif never appears in body copy or labels. It is reserved for hierarchy — display and headline roles only. Body text is always Work Sans. This preserves the serif's impact through scarcity.

**The label-shout rule.** Labels (10–11px, bold, uppercase, 0.18em tracking) are intentionally loud for their size. They must be set in Warm Silver / Soft Graphite or lower contrast — NEVER in the accent color, which is reserved for interactive highlights.

## 4. Elevation: Responsive Depth

The system refuses persistent shadows. Surfaces at rest are purely tonal — depth is created by background color stacking, not by shadows. Shadows only appear as a response to user interaction: hover, focus, active. This keeps the interface calm and readable while providing clear, physical feedback when the user engages.

This is not flat design. It is _responsive_ elevation: the room is quiet until you touch something, and then it tells you exactly what you touched.

### Tonal Stack

Depth is created by moving up the surface hierarchy:

- **Level 0** — Near-Black Void / Warm Parchment (primary background)
- **Level 1** — Deep Slate / Rough Linen (cards, panels, sections)
- **Level 2** — Shadow Blue / Washed Stone (inputs, elevated states, mobile drawer)

### Shadow Vocabulary

- **card-base hover** (`box-shadow: 0 6px 18px rgba(2, 6, 23, 0.07)` → `0 18px 40px rgba(2, 6, 23, 0.12)`): Base card shadow. Subtle at rest, lifts on hover. Light mode uses reduced opacity (0.04 / 0.10).
- **card-minimal** (`box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08)`): Light ambient shadow for minimal containers. Used for the control cluster and minimal sections.
- **section-shell** (`box-shadow: 0 24px 72px rgba(15, 23, 42, 0.08)`): Broad, soft shadow for large section wrappers. Creates page rhythm.
- **mobile-drawer** (`box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22)`): Deep, focused shadow for the mobile navigation overlay. Highest shadow value in the system.

**The Flat-By-Default Rule.** No surface has a shadow at rest unless it is structurally necessary (section-shell, mobile drawer). Hover shadows must feel like a physical response, not a design tick.

## 5. Components: Precise Assembly

### Buttons

- **Shape:** Medium radius (8px / 0.5rem) for primary and outline; large radius (12px) for minimal variant. No pill buttons — the system uses pills only for chips and language toggle.
- **Primary (CTA):** Solid Monitor Amber (`#f59e0b`) fill, Near-Black Void (`#0a0a0f`) text. 56px height, 32px horizontal padding. 14px uppercase bold with 0.1em tracking. On hover, background shifts to Ember (`#d97706`). Active state scales to 0.95. Focus-visible shows a 2px amber outline.
- **Outline:** Transparent background, 1px Subtle Line (`#27272a`) border, White Stone (`#fafafa`) text. Same dimensions and tracking as primary. On hover, border shifts to Active Line (`#3f3f46`). Used for secondary actions like "About Me" on the homepage.
- **Ghost:** Transparent, no border, Monitor Amber (`#f59e0b`) text. Used for tertiary actions (CV download). Hover adds underline decoration and shifts to accent color. Minimum tap target: 44px.
- **Minimal (btn-minimal):** Transparent background, 1px border with amber tint, amber text. Large radius (12px). Used for "Ver todos los proyectos" and similar secondary CTAs. On hover, background takes a 12% amber tint.

### Cards / Containers

- **Base (card-base):** Deep Slate (`#14141a`) background, 8px radius, 16px padding. Subtle shadow at rest (0 6px 18px rgba(2,6,23,0.07)). On hover, lifts 6px with deeper shadow. Used for generic content blocks.
- **Minimal (card-minimal):** Color-mixed Deep Slate at 96% opacity, 12px radius, 1px Subtle Line border. Light ambient shadow. Used for secondary containers, control clusters, and shell sections.
- **Elevated (ProjectCard):** Deep Slate background, 12px radius, 32px padding, 1px Subtle Line border. On hover, the card lifts 6px, shadow deepens (0 18px 40px rgba(2,6,23,0.18)), and border acquires an amber tint at 50% opacity. Used exclusively for project directory and featured work.

### Forms (Inputs / Textareas)

- **Labels:** 11px, semibold (600), uppercase, 0.16em tracking, Warm Silver (`#a1a1aa`). Placed above the field (not floating). 8px gap between label and field.
- **Inputs:** Minimum 44px height, 6px radius, Shadow Blue (`#1a1a24`) background, 1px Subtle Line (`#27272a`) border. 12px / 16px internal padding. Placeholder in Faded Pewter (`#9ca3af`). On focus: border shifts to Monitor Amber (`#f59e0b`) with a 1px amber ring (`box-shadow: 0 0 0 1px #f59e0b`). Focus-visible: 2px amber outline offset 2px.
- **Textareas:** Same visual treatment as inputs. Minimum 120px height (7.5rem), vertical resize only (`resize: vertical`). 5 visible rows default.
- **Error state:** Border shifts to red-500 (the only non-amber color in the system for negative feedback). Error message in 12px red text below the field with `role="alert"`.

### Navigation

- **Desktop:** Inline links at 14px, medium (500) weight, 0.05em tracking, uppercase. Default: Warm Silver (`#a1a1aa`). On hover: shifts to Monitor Amber, and a 2px amber underline animates left-to-right via a pseudo-element (`::after`). Active/focused route: amber text with full-width underline. All links receive `focus-ring` (2px amber outline on focus-visible).
- **Mobile:** Slide-in drawer from the right edge. 320px wide (`w-80`), capped at full width on small screens. Left border-radius of 24px (`rounded-l-3xl`). Forced solid Deep Slate background to prevent backdrop-filter bleed. Drawer items: 16px radius, transparent border, padding 16px vertical / 12px horizontal. Active item gets border + surface-elevated background, amber text. Inactive: Warm Silver. Icon + label pattern per row.
- **Drawer overlay:** Semi-transparent black (`rgba(0,0,0,0.45)`) with a 1px backdrop blur. Opacity transitions at 300ms with ease-in-out.
- **Logo/Home link:** `[EZ]` in amber, JetBrains Mono, 20px bold. Serves as both brand mark and home navigation.

### Chips / Tags

- **Outline (default):** Transparent background, 1px Subtle Line (`#27272a`) pill border, White Stone (`#fafafa`) text. 10px, bold, uppercase. Tight tracking (-0.02em). 4px / 10px padding.
- **Primary (chip-primary):** Amber-tinted background (20% amber mix), amber border at 55% opacity, amber text. Used for highlighting primary skill tags.
- **Completed (chip-completed):** Transparent background, amber border at 45% opacity, amber text. Used for certification completion badges on the About page.
- **Ghost (chip-ghost):** Completely transparent, no border, Faded Pewter (`#9ca3af`) text. Used for extremely low-priority labeling.

### Theme Toggle

Icon-only button. 40px square, pill radius, no background. Default icon color: Warm Silver (`#a1a1aa`). On hover: shifts to Monitor Amber (`#f59e0b`). Renders a Sun icon (`SunIcon` from Heroicons) when the resolved theme is dark, Moon icon when light. Tooltip on hover shows current and target theme (supports system mode). Minimum tap target is well exceeded at 40px. Focus-visible: 2px amber outline.

### Language Switcher

Pill-shaped cluster (9999px radius), 1px Subtle Line border, Deep Slate background. Contains two buttons (ES / EN):

- **Active:** Shadow Blue (`#1a1a24`) background, White Stone text, subtle drop shadow. The active pill is physically separated by the container's inset padding.
- **Inactive:** Transparent background, semi-transparent White Stone text at 50% opacity. On hover: full opacity White Stone.
- **Typography:** 10px, bold (700), uppercase, 0.1em tracking.
- **Accessibility:** Container has `role="group"` and `aria-label="Language switcher"`. Each button uses `aria-pressed`.

### Carousel

- **Controls:** Circular buttons, 44px (`w-11 h-11`), 1px Subtle Line border, 96% Deep Slate color-mixed background. ChevronLeft / ChevronRight icons. On hover: background blends 22% amber, border blends 35% amber. Focus-visible: 2px amber outline.
- **Dots:** 8px circular indicators, 1px Subtle Line border at 85% opacity, Faded Pewter fill at 28% opacity. Active dot (`is-active`): solid Monitor Amber fill and border, slightly scaled (1.05x). Transitions on background, transform, border-color at 150ms.
- **Track:** CSS transform-based slide (`translateX`), 500ms ease-in-out, `will-change: transform`. Respects `prefers-reduced-motion`.
- **Accessibility:** Container has `role="region"`, `aria-roledescription="carousel"`, and keyboard navigation (ArrowLeft / ArrowRight). A visually hidden `aria-live="polite"` region announces the current slide.

## 6. Do's and Don'ts

### Do:

- **Do** use Monitor Amber as the single accent across all interactive states — buttons, links, focus rings, active indicators. If a second color appears, it must be an error state (red) or a neutral.
- **Do** keep body text in Warm Silver / Soft Graphite, never White Stone / Iron Ink. Reserve maximum contrast for headings.
- **Do** animate with purpose: state transitions (150ms fast), entrance reveals (500ms fade-in-up with stagger), theme toggles (250ms). Each animation must have a `prefers-reduced-motion: reduce` fallback.
- **Do** use the tonal layering system for depth before adding shadows. Surfaces stack: Void → Slate → Shadow Blue. Shadows are the last resort, not the first.
- **Do** keep chips and labels tight — 10px uppercase bold with tight tracking. These are the "instrument panel" of the interface: small, dense, informative.
- **Do** cap display text at 6rem (~96px) max. Larger than that is shouting, not designing.
- **Do** use `text-wrap: balance` on all h1–h3 headings for even line lengths, and `text-wrap: pretty` on body text to reduce orphans.

### Don't:

- **Don't** use purple gradients, neon accents, blue links, or glassmorphism. These are "AI-generic developer portfolio" tells that the system explicitly rejects.
- **Don't** do scroll-hijacking, excessive animations, or agency-style overdesign. The studio is calm — motion communicates, it doesn't perform.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding above every section. Numbers earn their place only when the content IS a sequence (a process, a timeline, an ordered flow).
- **Don't** use the tiny uppercase tracked eyebrow ("ABOUT", "PROJECTS", "PROCESS") above every section heading as a default. One deliberate kicker is voice; an eyebrow on every section is AI grammar. The system uses labeled headings differently per page.
- **Don't** use side-stripe borders (border-left or border-right greater than 1px as a colored accent on cards or callouts). Use full borders, background tints, or nothing.
- **Don't** use gradient text (`background-clip: text` with a gradient). Emphasis is achieved through weight, size, and color, not decorative gradients.
- **Don't** use cards when a simpler layout would do. Cards are the most overused pattern in developer portfolios. Use them only for the project directory. Nested cards are always wrong.
- **Don't** swap dark-mode amber (`#f59e0b`) into light mode or light-mode amber (`#b45309`) into dark mode. Each mode has its own amber. Using the wrong value makes the accent feel disconnected from its environment.
- **Don't** forget light mode. It is not dark mode inverted — it has its own amber, its own neutrals, its own shadow opacities. Every component must be tested in both modes.
