## Exploration: GEO & SEO Enhancements for ezefernandez.com

### Current State

The site at https://ezefernandez.com/ is a **client-side rendered SPA** (React 19 + Vite 7 + TypeScript + Tailwind 4 + DaisyUI 5). The only HTML served is `<div id="root"></div>` — **zero content visible to AI crawlers**.

**Previous GEO audit**: 20/100 (Critical)

**Current branch**: `feat/geo-seo-enhancements` with AGENTS.md already updated on the branch.

### Affected Areas

#### Key Files
- `index.html` — Current empty shell, single static meta tags in Spanish only
- `vite.config.ts` — Minimal config (react + tailwind plugins only)
- `vercel.json` — SPA-only rewrites, no headers, no caching, no i18n routing
- `src/components/MetaTags/MetaTags.tsx` — Client-side JS meta injection (good for users, invisible to crawlers)
- `src/routes/AppRoutes.tsx` — All route definitions
- `src/context/ThemeProvider.tsx` — Dark class applied on client render
- `public/robots.txt` — Open to all crawlers (correct)
- `public/sitemap.xml` — Only 4 URLs, no case studies, no lastmod/changefreq
- `src/i18n.ts` — 12 namespaces, ES/EN, Detection via localStorage/navigator

#### Route Structure (9 routes + catch-all)

| Route | Page | MetaTags? | Content Type | Content Volume (ES+EN) |
|-------|------|-----------|-------------|----------------------|
| `/` → redirect → `/home` | HomePage | ✅ | Hero + stack + featured + CTAs | ~400 words |
| `/about` | AboutPage | ✅ | Bio + skills + projects + education | ~700 words |
| `/projects` | ProjectsPage | ✅ | Project directory with search/filter | ~200 words |
| `/projects/cinelab` | CineLabCaseStudy | ✅ | Full case study with screenshots | ~900 words ES, ~900 EN |
| `/projects/movie-dashboard` | MovieDashboardCaseStudy | ✅ | Full case study with screenshots | ~900 words ES, ~900 EN |
| `/projects/chefcitoia` | ChefcitoIACaseStudy | ✅ | Full case study with screenshots | ~900 words ES, ~900 EN |
| `/contact` | ContactPage | ✅ | Form + intro | ~300 words |
| `/privacy` | PrivacyPage | ✅ | Privacy policy | ~500 words |
| `/not-found` (and `*`) | NotFoundPage | ✅ (noIndex) | 404 message | ~100 words |

**Total content**: ~5,000 words across both languages. **None of it is in the initial HTML.**

#### Data Sources (Static Repositories)
- `src/data/projects.ts` — 3 projects with full metadata (id, nameKey, shortKey, repo, demo, images, tech, year, featured)
- `src/data/about.ts` — Full data interface (name, role, email, github, linkedIn, cv, summaryKey, categories, abilities, projects, education, availability)

#### MetaTags Component Analysis
- **Client-side only**: Uses `useEffect` to inject meta tags via DOM API after JS loads
- **Injects**: title, description, canonical, OG (type, title, description, image, url, site_name), Twitter (card, title, description, image), robots
- **Works as cleanup**: Restores previous values on unmount
- **API is good** — would work well with prerender if we inject data into HTML
- **NOT used in index.html** as static HTML — only the final `<script>` and CSS are in the build output

#### i18n Architecture
- **12 namespaces** per language: common, home, projects, contact, notfoundpage, aboutpage, header, footer, cinelabcasestudy, moviedashboardcasestudy, chefcitoiacasestudy, privacy
- **Detection**: localStorage → navigator — no URL-based language detection
- **Static data** (projects.ts, about.ts) uses key references to i18n — content is in JSON files
- **No hreflang tags** anywhere

#### Rendering Strategy
- **Current**: SPA only. Vite build produces `dist/index.html` with `<script>` tag only
- **Build output** (dist/index.html): Same empty `<div id="root">` — JS is the only content
- **No SSR, no prerender, no ISR** — crawlers get blank page
- **Vercel config**: Single rewrite rule `/(.*) → /index.html`

#### Design System
- **Fonts**: Inter (currently in index.html), but AGENTS.md mentions Instrument Serif (display), Work Sans (body), JetBrains Mono (code) — likely changed or pending
- **Colors**: OKLCH-based tokens in `src/index.css` with `@theme` and `.dark` overrides
- **Comprehensive design tokens**: spacing, typography, color scheme (bg, surface, text, muted, primary, accent, border), radii, layout, transitions
- **Dark mode**: `.dark` class applied via ThemeProvider, default is dark
- **Component layer**: `.btn-minimal`, `.chip`, `.badge`, `.input-minimal`, `.card-minimal`, `.section-shell`, `.carousel-control`, etc.
- **Accessibility**: WCAG 2.2 AA target, `aria-labelledby`, `prefers-reduced-motion`, `focus-visible` rings, keyboard navigation
- **Forms**: DaisyUI checkbox for consent, custom input classes

#### Deploy Infrastructure
- **Vercel**: Auto-deploy from `main` branch
- **vercel.json**: Only `rewrites` — no `headers`, `redirects`, `cache`, or `security` directives
- **No i18n subdomains or paths** (all URLs serve one HTML, language chosen client-side)

---

### Gaps Analysis

| # | Gap | Severity | Impact | Current State |
|---|-----|----------|--------|---------------|
| G1 | **Zero HTML content for crawlers** | 🔴 Critical | Crawlers see blank page | All content injected via JS |
| G2 | **No structured data (JSON-LD)** | 🔴 Critical | AI crawlers can't extract entities | Zero schema markup |
| G3 | **No hreflang tags** | 🟡 High | Search engines don't know about EN/ES versions | No i18n SEO |
| G4 | **No preload/prefetch hints** | 🟡 High | Slow initial load perception | No resource hints in HTML for routes |
| G5 | **Sitemap incomplete** | 🟡 High | 3 case studies + privacy + contact missing | 4 URLs only, no lastmod/changefreq |
| G6 | **No llms.txt** | 🟡 High | AI crawlers have no structured site map | Not present |
| G7 | **No .well-known/ or AI-specific endpoints** | 🟡 Medium | Can't instruct AI crawlers directly | Not present |
| G8 | **No `navigate` (prefetch) on link hover** | 🟡 Medium | React 14+ API not used | Not implemented |
| G9 | **No canonical per locale** | 🟡 Medium | Duplicate content risk with EN/ES | Canonical doesn't consider lang |
| G10 | **No `alt` language detection** | 🟢 Low | EN version can't be found via URL | Only localStorage navigator |
| G11 | **Security headers missing** | 🟢 Low | No Content-Security-Policy, etc. | Not in vercel.json |
| G12 | **Font mismatch** | 🟢 Low | index.html uses Inter, AGENTS.md says Work Sans | index.html and built output may differ |
| G13 | **Meta tags duplicated** | 🟢 Low | Two `<meta name="description">` in index.html | Lines 14 and 27-28 duplicate |
| G14 | **No OG image alt text** | 🟢 Low | Social previews lack alt on OG images | Not present |
| G15 | **Role not updated everywhere** | 🟢 Low | Some places still say "Front-end Developer", others "Full Stack Developer" | Inconsistency |

---

### Approaches per Gap

#### G1: HTML Content for Crawlers — **Prerender Strategy**

**Approach 1a: Static Prerender via @preact/preset-vite or vite-plugin-ssr**
- Pros: Full static HTML per route, crawler-ready, works with current Vite setup, no framework migration
- Cons: Need to handle i18n (generate ES/EN HTML per route = 2× URL count), not truly dynamic
- Effort: Medium

**Approach 1b: SSR via Vite + Vercel Serverless Functions**
- Pros: True dynamic rendering, works with i18n naturally
- Cons: Requires Vercel Pro (serverless functions), adds latency, more complex infra
- Effort: High

**Approach 1c: Manual static HTML pages with pre-rendered content**
- Pros: Full control, no build tool changes
- Cons: Manual maintenance, duplicates template logic
- Effort: Low for initial, High for maintenance

**→ Recommendation**: **Approach 1a** — static prerender. The site content changes rarely (it's a portfolio), so static prerender is perfect. Use a Vite plugin that generates HTML per route at build time. For i18n, generate `/es/home`, `/en/home`, etc.

#### G2: JSON-LD Structured Data

**Approach 2a: Inject JSON-LD via MetaTags component (client-side)**
- Pros: Works with current architecture
- Cons: Only visible after JS executes — invisible to crawlers in current setup
- Effort: Low

**Approach 2b: Hardcode JSON-LD in prerendered HTML**
- Pros: Visible to all crawlers immediately
- Cons: Must coordinate with prerender solution
- Effort: Medium

**→ Recommendation**: **Approach 2b** — once we have prerender, inject JSON-LD in the prerendered HTML. Create schema for: Person (main), WebSite, WebPage, Project (for each project), Article (for case studies).

#### G3-G4: Sitemap, hreflang, Headers

**→ Recommendation**: Fix directly in `public/sitemap.xml`, add hreflang links in prerendered HTML head, and add security/cache headers in `vercel.json` (which supports static sites without Pro).

#### G6-G7: AI Visibility (llms.txt, .well-known)

**→ Recommendation**: Add `public/llms.txt` with structured site overview for AI crawlers. Add `.well-known/` endpoint references if applicable.

---

### Recommendation Priority

| Priority | Gap | Action | Effort | Impact |
|----------|-----|--------|--------|--------|
| **P0** | G1: No HTML content | Implement static prerender | Medium | 🔴 Critical — unlocks everything else |
| **P1** | G2: No structured data | Add JSON-LD schema in prerendered HTML | Medium | 🔴 Critical — AI entity extraction |
| **P2** | G6: No llms.txt | Create public/llms.txt | Low | 🟡 High — AI crawler guidance |
| **P3** | G5: Sitemap incomplete | Expand sitemap with all routes + case studies | Low | 🟡 High — crawl coverage |
| **P4** | G3: No hreflang | Add hreflang in prerendered HTML per locale | Low | 🟡 High — i18n SEO |
| **P5** | G11: Security headers | Add CSP, X-Frame-Options, etc. in vercel.json | Low | 🟡 Medium — security |
| **P6** | G13: Duplicate meta tags | Clean up index.html duplicate descriptions | Low | 🟢 Low — hygiene |
| **P7** | G15: Role inconsistency | Standardize to "Full Stack Developer" across all pages | Low | 🟢 Low — consistency |

---

### Content Volume Summary

| Page | ES Words | EN Words | Total Words |
|------|----------|----------|-------------|
| Home | ~180 | ~180 | ~360 |
| About | ~350 | ~350 | ~700 |
| Projects | ~90 | ~90 | ~180 |
| Case Study — CineLab | ~420 | ~430 | ~850 |
| Case Study — Movie Dashboard | ~420 | ~430 | ~850 |
| Case Study — ChefcitoIA | ~410 | ~420 | ~830 |
| Contact | ~130 | ~130 | ~260 |
| Privacy | ~230 | ~230 | ~460 |
| Not Found | ~60 | ~60 | ~120 |
| **Total** | **~2,290** | **~2,320** | **~4,610** |

> The user's goal was 2,000+ words per language. Currently at ~2,300. This is adequate for portfolio SEO, but case studies could be expanded.

---

### Design Observations

1. **Strong design system**: OKLCH tokens, consistent spacing (4px base), comprehensive component layer (chips, badges, buttons, inputs, cards)
2. **Dark mode first**: Default is dark theme, light is alternativ — well executed with CSS custom properties
3. **Accessibility**: WCAG 2.2 AA target achieved — keyboard nav, focus-visible rings, `aria-labelledby`, `prefers-reduced-motion`, descriptive aria-labels
4. **Typography**: Currently Inter in HTML (v1 index.html), but AGENTS.md says Instrument Serif / Work Sans / JetBrains Mono — index.html may be stale
5. **Visual quality**: Clean card-based design, gradient backgrounds, subtle shadows, rounded corners — modern and professional
6. **Responsive**: Mobile-first with breakpoints at sm/md/lg, mobile drawer navigation
7. **Potential design debt**: `useMemo` in ProjectsPage despite React 19 compiler (minor), some inline `grid-cols-3` for buttons that could be a component

---

### Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Prerender breaks React hydration | Medium | Test thoroughly, use well-maintained plugin, keep JS interactive |
| i18n routes conflict with current redirect logic | Medium | Plan URL structure carefully (e.g., `/en/home`, `/es/home`) |
| Dark mode flash during prerender | Low | Inject theme detection script in `<head>` |
| Build time increases significantly | Low | Portfolio has ~9 routes × 2 languages = 18 pages — negligible |
| Vite plugin compatibility with Vite 7 | Medium | Check plugin compatibility before committing |

---

### Ready for Proposal

**Yes**. The exploration is complete. The orchestrator can proceed to the Proposal phase with the following instructions:

1. **Focus on Prerender** as the foundation — without it, no other GEO/SEO improvement matters
2. **Slice A (Prerender + Infra)** should be planned first
3. **Prerender tool**: Evaluate `@preact/preset-vite` or manual Vite plugin for static HTML generation
4. After prerender works, proceed to **Slice B** (schema + llms.txt + sitemap) and **Slice C** (content polish)
5. The design audit is low priority but can be folded into Slice C

Suggested slice order:
- **A**: Prerender + vercel.json headers + sitemap expansion + hreflang
- **B**: JSON-LD schema + llms.txt + robots.txt improvements
- **C**: Content polish + role consistency + design audit
