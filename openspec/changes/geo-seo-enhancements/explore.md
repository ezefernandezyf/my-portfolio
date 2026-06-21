## Exploration: GEO & SEO Enhancements for ezefernandez.com (REDO — main codebase)

### Current State

Site is a **client-side rendered SPA** (React 19 + Vite 7 + TypeScript + Tailwind 4 + DaisyUI 5). The HTML served is `<div id="root"></div>` + script tag — **zero content visible to crawlers**.

**Branch**: `feat/geo-seo-enhancements` (rebased onto `main`). Working tree clean.

**AGENTS.md**: Updated at `e6f1a0e`, EchoLog-style, matches production state — role is "Full Stack Developer", 14 namespaces, 5 projects, correct fonts.

### Key Changes from Previous Explore (stale `develop`)

| Item | Old (develop) | Current (main) |
|------|-------------|----------------|
| Projects | 3 (Movie Dashboard, CineLab, ChefcitoIA) | 5 (+ EchoLog, Nexus Talent) |
| Case studies | 3 | 5 (all projects have case studies) |
| i18n namespaces | 12 | 14 (+echologcasestudy, +nexustalentcasestudy) |
| Fonts in index.html | Inter | Instrument Serif + Work Sans + JetBrains Mono ✓ |
| Title in index.html | "Ezequiel Fernández" | "Ezequiel Fernández - Full Stack Developer" ✓ |
| Role in about.ts | "Front-end Developer" | "Full Stack Developer" ✓ (fixed in Phase 8) |
| MetaTags default desc | — | Still says "Front-end Developer" (line 15) ❌ |
| Package manager | npm | pnpm 11 ✓ |
| React version | 19.0 | 19.2 ✓ |
| Vite version | 6.x | 7.3.1 ✓ |
| DaisyUI | v4 | v5 ✓ (but see below) |

### Route Structure (11 routes + catch-all)

| Route | Page | MetaTags? | Render Type | Approx Words (ES+EN) |
|-------|------|-----------|-------------|---------------------|
| `/` → `/home` | HomePage | ✅ client-side | Hero + stack + featured + CTAs | ~300 |
| `/about` | AboutPage | ✅ client-side | Bio + skills stack + projects + education | ~600 |
| `/projects` | ProjectsListPage | ✅ client-side | Directory with search/filter | ~200 |
| `/projects/echolog` | ProjectCaseStudyPage | ✅ client-side | Full case study | ~1,200 |
| `/projects/nexus-talent` | ProjectCaseStudyPage | ✅ client-side | Full case study | ~600 |
| `/projects/movie-dashboard` | ProjectCaseStudyPage | ✅ client-side | Full case study | ~700 |
| `/projects/cinelab` | ProjectCaseStudyPage | ✅ client-side | Full case study | ~500 |
| `/projects/chefcitoia` | ProjectCaseStudyPage | ✅ client-side | Full case study | ~450 |
| `/contact` | ContactPage | ✅ client-side | Form + email info | ~300 |
| `/privacy` | PrivacyPage | ✅ client-side | Privacy policy | ~400 |
| `/not-found` (and `*`) | NotFoundPage | ✅ (noIndex) | 404 | ~80 |

**Total content**: ~5,300 words across both languages. **None in initial HTML.**

### Affected Areas

#### Key Files
- `index.html` — Empty shell, `lang="es"`, `class="dark"`, fonts OK, favicon OK
- `vite.config.ts` — Minimal: react() + tailwindcss() only
- `vercel.json` — SPA-only single rewrite, **zero headers**
- `src/components/MetaTags/MetaTags.tsx` — Client-side JS meta injection (invisible to crawlers)
- `src/routes/AppRoutes.tsx` — 11 routes, all MetaTags-consuming
- `src/i18n.ts` — 14 namespaces, ES/EN, localStorage/navigator detection
- `src/data/projects.ts` — 5 projects with metadata
- `src/data/about.ts` — role: "Full Stack Developer" ✓ (already fixed)
- `src/entities/project/` — Clean DDD-lite repository pattern (types + repository)
- `public/robots.txt` — Open to all crawlers ✓
- `public/sitemap.xml` — **Only 4 URLs** — missing 7 routes, case studies, no lastmod/changefreq
- `public/favicon.svg` — "EZ" monogram in JetBrains Mono, amber on dark ✓
- `public/site.webmanifest` — Proper PWA manifest with shortcuts ✓
- `public/og-image.png` — Exists (but unknown quality; model can't read it)

#### Pages & Features
- `src/pages/` — 6 page components + Projects/ subfolder
- `src/features/projects/list/page/ProjectsListPage.tsx` — Project directory with search
- `src/features/projects-case-study/page/ProjectCaseStudyPage.tsx` — Dynamic case study template loader
- `src/pages/Projects/CaseStudyTemplate.tsx` — Case study rendering template
- `src/components/layouts/Header.tsx` — Fixed nav with drawer, ThemeToggle, LanguageSwitcher
- `src/components/layouts/Footer.tsx` — Simple footer with social + privacy

#### Config & Infrastructure
- `openspec/changes/geo-seo-enhancements/` — Already has explore.md (stale) + proposal.md
- `openspec/specs/` — Empty (no specs directory)
- `openspec/config.yaml` — Schema-driven spec convention with RFC 2119 rules

### SEO Gaps Analysis

| # | Gap | Severity | Impact | Current State |
|---|-----|----------|--------|---------------|
| G1 | **Zero HTML content for crawlers** | 🔴 Critical | Crawlers see blank page | All content injected via JS |
| G2 | **No structured data (JSON-LD)** | 🔴 Critical | AI crawlers can't extract entities | Zero schema markup |
| G3 | **No hreflang tags** | 🟡 High | Search engines can't find EN/ES versions | No i18n SEO |
| G4 | **Sitemap incomplete** | 🟡 High | 7 routes + case studies missing | 4 URLs only, no lastmod/changefreq |
| G5 | **No llms.txt or .well-known/** | 🟡 High | AI crawlers have no structured site map | Not present |
| G6 | **No `navigate` prefetch** | 🟡 Medium | React Router's `navigate` not used for hover prefetch | Not implemented |
| G7 | **No canonical per locale** | 🟡 Medium | Duplicate content risk with EN/ES | Canonical doesn't consider lang |
| G8 | **Security headers missing** | 🟡 Medium | No CSP, X-Frame-Options, etc. | Not in vercel.json |
| G9 | **No cache headers** | 🟡 Medium | Hashed assets not cached | No vercel.json headers |
| G10 | **No language detection via URL** | 🟢 Low | EN version can't be found via URL path | Only localStorage/navigator |
| G11 | **MetaTags default "Front-end Developer"** | 🟢 Low | Stale description in MetaTags.tsx line 15 | Still says "Front-end" |
| G12 | **No alternate language links** | 🟢 Low | html tag has `lang="es"` only | No alternate links |

### Design Observations & Inconsistencies

1. **🔴 Design token mismatch (PrivacyPage + CaseStudyTemplate)**: These two pages use a DIFFERENT design token namespace (`text-on-surface`, `bg-surface-container-lowest`, `text-outline`, `text-on-surface-variant`, `text-primary-fixed`, `font-headline`, `font-label`, `border-outline-variant/20`) that is NOT defined in `index.css`'s `@theme`. The project's tokens are `--color-text-primary`, `--color-surface`, `--color-text-muted`, `--color-accent`, `--font-display`, `--font-body`, etc. These pages either:
   - Depend on DaisyyUI tokens that aren't configured (no `@plugin "daisyui"` in `index.css`)
   - Or use a shadow token system not present in the codebase
   - **Either way, these pages have broken/unresolved CSS classes**
   - Recommended: rewrite these pages to use the existing `@theme` tokens (.card-minimal, .chip, etc.)

2. **Local `fadeInUp` functions**: PrivacyPage and CaseStudyTemplate both define local `fadeInUp()` functions with inline `animation` styles instead of using the `.animate-fade-in-up` CSS class defined in `index.css` — duplicated code and inconsistent approach.

3. **MetaTags default not updated**: Line 15 of `MetaTags.tsx` still says "Front-end Developer" despite the site identity being "Full Stack Developer".

4. **Dark mode class hardcoded**: `index.html` has `<html lang="es" class="dark">` — the `.dark` class is hardcoded, not dynamic. ThemeProvider toggles it by adding/removing the class on `document.documentElement`. This means:
   - Initial HTML render is always dark (correct for dark-first design)
   - But no theme-detection script in `<head>` — flash of wrong theme possible
   - Need preload of theme in `<head>` for prerender (inject `<script>` before `</head>`)

5. **DaisyUI 5 dependency but no `@plugin`**: `daisyui` is in `package.json` but `index.css` has no `@plugin "daisyui"`. Either DaisyUI is loaded through Tailwind v4 auto-detection, or it's a dead dependency. Tailwind CSS 4's bundler integration (`@tailwindcss/vite`) should auto-detect DaisyUI, but the token mismatch on PrivacyPage suggests something is off.

6. **Accessibility**: Strong foundation — WCAG 2.2 AA target, keyboard nav, focus-visible rings, `prefers-reduced-motion`, aria-labels. PrivacyPage and CaseStudyTemplate might have WCAG issues if unresolved CSS tokens break visual rendering.

### Rendering Strategy

- **Current**: SPA only. Vite produces `dist/index.html` with `<script>` tag only. Zero content in HTML.
- **No SSR, no prerender, no ISR** — crawlers get empty page.
- **Vercel**: Single rewrite, no headers, no i18n routing, no security presets.

### i18n Architecture

- **14 namespaces** per language (ES/EN): common, home, projects, contact, notfoundpage, aboutpage, header, footer, privacy, cinelabcasestudy, moviedashboardcasestudy, chefcitoiacasestudy, echologcasestudy, nexustalentcasestudy
- **Detection**: localStorage → navigator — no URL-based language
- **No hreflang** anywhere
- **No alternate links** in HTML

### Data Sources (Static)

- `src/data/projects.ts` — 5 projects with full metadata (i18n key references for names)
- `src/data/about.ts` — Role "Full Stack Developer" (already fixed in Phase 8)
- `src/entities/project/` — Clean repository pattern with cloning for immutability

### Deploy Infrastructure

- **Vercel auto-deploy** from `main` branch
- **vercel.json**: Only `rewrites` — no `headers`, `redirects`, `cache`, or `security` directives
- **No i18n routing** — all URLs serve one HTML, language chosen client-side

### Approach Options per Gap

#### G1: Static Prerender (unlocks everything)
1. **Static prerender via Vite plugin** (recommended) — Generate HTML per route at build time. 11 routes × 2 languages = 22 pages.
2. **SSR via Vercel Serverless** — Overkill, requires Pro plan, adds latency.
3. **Manual prerender script** — Custom Node script using `react-dom/server` + `renderToString` or `renderToStaticMarkup`.

**Recommendation**: Approach 1 — static prerender. Portfolio content is static, changes rarely. Evaluate `vite-plugin-ssr` compatibility with Vite 7 / React 19, or write a small build script.

#### G2: JSON-LD Schema
- Inject in prerendered HTML head as `<script type="application/ld+json">` per route
- Types: `Person` (main entity), `WebSite`, `WebPage` (per route), `Project` (per project), `Article` (per case study)
- Tool: Type-safe schema builder in `src/data/schema.ts`

#### G3–G8: Headers, Sitemap, llms.txt, Meta
- All can be done independently: `vercel.json` headers, updated `public/sitemap.xml`, `public/llms.txt`
- `MetaTags.tsx` adaption: move meta data to a shared `route-meta.ts` mapping used by both prerender AND client-side MetaTags

### Design Fixes Required

1. **PrivacyPage + CaseStudyTemplate redesign tokens** — These pages reference undefined CSS tokens. Must rewrite to use the project's `@theme` tokens (--color-text-primary, --color-surface, --color-accent, etc.) or reintegrate DaisyUI properly.

2. **Unify `fadeInUp` animation approach** — Replace local `fadeInUp()` functions with the `.animate-fade-in-up` CSS class from `index.css` across PrivacyPage and CaseStudyTemplate.

3. **MetaTags default description** — Update line 15 from "Front-end Developer" to "Full Stack Developer".

### Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Prerender breaks React hydration | Medium | Test all 22 pages post-build; fallback to Playwright script |
| i18n routes conflict with current redirect logic | Medium | Plan URL structure: `es/` = default (no prefix), `/en/...` for English |
| Dark mode flash during prerender | Low | Inject theme-detection script in `<head>` |
| PrivacyPage/CaseStudyTemplate token mismatch breaks styling | Medium | Must fix token references as part of Slice C |
| Vite plugin compatibility with Vite 7 + React 19 | Medium | Evaluate plugin before committing; fallback to custom script |

### Content Volume Summary (Updated)

| Page | ES Words | EN Words | Source |
|------|----------|----------|--------|
| Home | ~150 | ~150 | home.json + data-driven |
| About | ~300 | ~300 | aboutpage.json + data-driven |
| Projects | ~100 | ~100 | projects.json |
| EchoLog Case Study | ~550 | ~550 | echologcasestudy.json |
| Nexus Talent Case Study | ~300 | ~300 | nexustalentcasestudy.json |
| Movie Dashboard Case Study | ~350 | ~350 | moviedashboardcasestudy.json |
| CineLab Case Study | ~250 | ~250 | cinelabcasestudy.json |
| ChefcitoIA Case Study | ~200 | ~200 | chefcitoiacasestudy.json |
| Contact | ~150 | ~150 | contact.json |
| Privacy | ~200 | ~200 | privacy.json |
| Not Found | ~40 | ~40 | notfoundpage.json |
| **Total** | **~2,640** | **~2,640** | **~5,280 total** |

Content is adequate (exceeds the 2,000+/lang target). Case studies could be richer.

### Recommendation Priority

| Priority | Gap | Action | Effort | Impact |
|----------|-----|--------|--------|--------|
| **P0** | G1: No HTML content | Static prerender (22 pages) | Medium | 🔴 Critical — unlocks everything |
| **P1** | G2: No structured data | JSON-LD schema in prerendered HTML | Medium | 🔴 Critical — AI entity extraction |
| **P2** | G5: No llms.txt | Create `public/llms.txt` + `/.well-known/llms.txt` | Low | 🟡 High — AI crawler guidance |
| **P3** | G4: Sitemap incomplete | Expand to all 11 routes + lastmod/changefreq | Low | 🟡 High — crawl coverage |
| **P4** | G3: No hreflang | hreflang links in prerendered HTML per locale | Low | 🟡 High — i18n SEO |
| **P5** | G8/G9: Security/cache headers | Add to vercel.json | Low | 🟡 Medium — security |
| **P6** | Design token mismatch | Fix PrivacyPage + CaseStudyTemplate tokens | Medium | 🟡 Medium — design consistency |
| **P7** | G11: MetaTags default "Front-end" | Update to "Full Stack Developer" in MetaTags.tsx | Low | 🟢 Low — consistency |

### Ready for Proposal

**Yes — with one critical update to the existing proposal**.

The previous proposal had 3 slices and 12 deliverables. This re-exploration found **a significant new issue**: the PrivacyPage and CaseStudyTemplate use **undefined design tokens** that must be fixed. Add this to Slice C.

**Updated slice map**:
- **A** (Prerender + Infra): Static prerender, vercel.json headers, sitemap, hreflang
- **B** (AI Visibility): JSON-LD schema, per-route meta, llms.txt, MetaTags adapt
- **C** (Polish + Fixes): Content polish, role consistency, **fix design token mismatch** on PrivacyPage + CaseStudyTemplate, unify animation approach, update MetaTags default

The existing `proposal.md` has good scope but needs:
1. Updated content volume numbers (5 projects, 5 case studies, 14 namespaces)
2. Design token mismatch fix added to Slice C
3. Updated route count (11 routes × 2 langs = 22 pages, not 18)
