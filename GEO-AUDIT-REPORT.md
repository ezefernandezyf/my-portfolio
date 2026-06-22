# GEO Audit Report: Ezequiel Fernández Portfolio

**Audit Date:** 2026-06-22
**URL:** https://ezefernandez.com
**Business Type:** Agency/Services (Personal Portfolio)
**Pages Analyzed:** 24 (full sitemap)

---

## Executive Summary

**Overall GEO Score: 65/100 (Fair, approaching Good)**

The portfolio has strong technical GEO foundations — all AI crawlers are allowed, sitemap covers 24 URLs with full hreflang alternates, and prerendered static HTML ensures AI systems can index content without JavaScript execution. Content quality is solid with real certifications (Microsoft AI Skills Fest 2026), original case studies with problem-solution structure, and clear E-E-A-T signals on the About page. The main gaps are limited third-party platform presence (no Wikipedia, YouTube, or Reddit) and content depth below what AI systems need for sustained citation in competitive queries.

Since the Fase 10 baseline audit (54/100), multiple improvements have been made: route-specific meta titles/descriptions, BreadcrumbList schema, expanded content sections, geo-seo-opencode case study, and AI Skills Fest certification. These collectively moved the score from 54 → 65 (+11 points).

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 74/100 | 25% | 18.5 |
| Brand Authority | 42/100 | 20% | 8.4 |
| Content E-E-A-T | 74/100 | 20% | 14.8 |
| Technical GEO | 84/100 | 15% | 12.6 |
| Schema & Structured Data | 70/100 | 10% | 7.0 |
| Platform Optimization | 35/100 | 10% | 3.5 |
| **Overall GEO Score** | | | **64.8 → 65/100** |

---

## Score Evolution

| Phase | Score | Key Changes |
|---|---|---|
| Pre-Fase 10 (baseline) | 20/100 | No prerender, no schema, no meta tags |
| Post-Fase 10 | 54/100 | Prerender, JSON-LD @graph, llms.txt, sitemap, MetaTags |
| Post-Fase 12 | 58/100 (est.) | Route-meta, BreadcrumbList, alt text, content, cert |
| **Post-Fase 13 (current)** | **65/100** | Sitemap auto, llms.txt update, content trimmed, descKey fix |

---

## Critical Issues (Fix Immediately)

*None.* No blocking GEO issues detected.

---

## High Priority Issues

### H1: Content needs more quotable depth per page
**Severity:** High | **Pages affected:** All

The "Cómo trabajo" and "Cómo colaboro" sections are well-written but each paragraph averages 90-110 words. For AI systems to cite specific passages with confidence, paragraphs of 150-200 words with concrete examples, metrics, or numbered methodologies perform significantly better (Princeton 2024 study).

**Recommended fix:** Add 1-2 concrete methodology examples per section. E.g., "arquitectura basada en features — por ejemplo, en EchoLog cada módulo de workspace, board y feedback es un Feature Slice independiente con sus propios repositorios y servicios."

### H2: No FAQ schema despite Q&A-structured content
**Severity:** High | **Pages affected:** /contact, /projects

The "Cómo colaboro" section inherently answers questions (how do you integrate? what's your process? how do you handle testing?). Adding FAQPage schema would make these directly extractable by Google AI Overviews and ChatGPT.

**Recommended fix:** Add FAQPage schema with Question/Answer pairs on ContactPage and ProjectsPage.

---

## Medium Priority Issues

### M1: Limited brand authority signals outside GitHub
**Severity:** Medium | **Pages affected:** Brand-level

The portfolio has strong GitHub presence (multiple repos, stars via geo-seo-claude lineage) and a LinkedIn profile, but lacks presence on platforms AI models use for entity recognition: Wikipedia, YouTube technical content, Reddit discussions, Stack Overflow.

**Recommended fix:** Create a YouTube channel with 2-3 short technical walkthroughs. Participate in 1-2 relevant Reddit/Stack Overflow threads monthly.

### M2: Case studies missing Article schema
**Severity:** Medium | **Pages affected:** /projects/*

All case study pages have Product schema via JSON-LD @graph but lack Article schema, which would help AI systems understand these as substantive technical content rather than just product pages.

**Recommended fix:** Add Article schema type to the JSON-LD @graph for case study pages.

### M3: No explicit "last reviewed" date on content
**Severity:** Medium | **Pages affected:** /about, /projects

AI systems cite content more often when it shows freshness signals. The sitemap has `<lastmod>` but the visible page content doesn't show when it was last updated.

**Recommended fix:** Add a subtle "Last updated: June 2026" line in the footer or About page.

---

## Low Priority Issues

### L1: Missing OpenGraph image dimensions
**Severity:** Low | **Pages affected:** All

OpenGraph images should specify `og:image:width` and `og:image:height` for optimal rendering in social previews and AI summaries.

### L2: LinkedIn URL uses numeric ID
**Severity:** Low | **Pages affected:** llms.txt, footer

`linkedin.com/in/ezequiel-fernandez-59a21a387/` — the numeric suffix is fine but a custom LinkedIn vanity URL would look more professional.

### L3: No X/Twitter card image
**Severity:** Low | **Pages affected:** All

Twitter card meta tags are present but could include a dedicated square image optimized for social previews.

---

## Category Deep Dives

### AI Citability (74/100)

**Strengths:**
- llms.txt is comprehensive — describes stack, projects, site structure, and contact info in a format AI crawlers can parse efficiently
- "Cómo trabajo" section uses clear declarative sentences ideal for AI extraction
- Case studies follow problem → solution → architecture pattern, which maps well to AI Q&A extraction
- Route-specific meta descriptions provide good contextual summaries

**Weaknesses:**
- Paragraphs average 90-110 words — longer passages (150-200w) with concrete examples quote better
- No explicit Q&A blocks (e.g., "How do I structure a React project? [answer]")
- Homepage text is too sparse for meaningful AI citation outside name/role recognition

**Top quotable passages:**
1. "Cada proyecto que construyo arranca con una premisa simple: entender el problema antes de escribir una línea de código." (ProjectsPage)
2. "Mi stack técnico es pragmático, no hype-driven." (ProjectsPage)
3. "Mi enfoque es escribir código que otro desarrollador pueda entender sin explicación." (ContactPage)

### Brand Authority (42/100)

**Strengths:**
- Active GitHub profile with 6+ public repos
- geo-seo-opencode is a port of a project with 8.3k stars (strong lineage signal)
- Microsoft AI Skills Fest 2026 certification (Credly verified badge)

**Weaknesses:**
- No Wikipedia entry (expected for individual portfolio — not critical)
- No YouTube technical content
- No Reddit/Stack Overflow activity visible
- LinkedIn presence is passive (profile exists, no active content)

### Content E-E-A-T (74/100)

**Strengths:**
- About page has real biographical details (age, location, specific skills)
- Education section lists 4 concrete certifications with institutions
- Case studies link to real GitHub repositories with code
- Content is demonstrably original (not AI-generated filler)
- Credly badge verifies Microsoft certification

**Weaknesses:**
- No external citations or references to the author's work
- Case studies lack "results" or "impact" metrics (e.g., performance improvements, user counts)
- No blog or thought leadership content

### Technical GEO (84/100)

**Strengths:**
- robots.txt allows all crawlers — no AI bot blocking
- llms.txt present and well-structured with projects, skills, certs, and full route table
- Sitemap covers 24 URLs with complete hreflang alternates
- Prerendered static HTML ensures AI crawlers can index content without JavaScript
- Unique meta titles and descriptions per route
- Security headers configured (CSP, X-Frame-Options via vercel.json)
- 404 page exists with proper status code

**Weaknesses:**
- No server-side rendering (prerender compensates, but dynamic pages rely on SPA hydration)
- Some prerendered pages show incomplete content in text-only fetches

### Schema & Structured Data (70/100)

**Strengths:**
- JSON-LD @graph with Person → sameAs (GitHub, LinkedIn)
- WebSite schema with SearchAction
- WebPage schema per route with breadcrumb, description, inLanguage
- BreadcrumbList on case study pages
- Geo-coordinates and contact info in Person schema

**Weaknesses:**
- Missing FAQPage schema on "Cómo colaboro" content
- Missing Article schema on case study pages
- Missing HowTo schema on geo-seo-opencode page (it's a CLI toolkit with installation steps)

### Platform Optimization (35/100)

**Strengths:**
- GitHub: strong presence (6+ repos, active commits)
- LinkedIn: professional profile exists
- Credly: verified certification badge

**Weaknesses:**
- No YouTube channel or technical content
- No Reddit discussions or community presence
- No Wikipedia / Wikidata entity
- No Twitter/X developer presence
- No Stack Overflow activity

---

## Quick Wins (Implement This Week)

1. **Add FAQPage schema to ContactPage** — 15-minute change, directly improves AI extractability for the "how I work" section, +3-5 points on Citability
2. **Add Article schema to case study pages** — 10-minute change in schema.ts, helps AI classify case studies as substantive content
3. **Add concrete examples to 2-3 paragraphs** — insert "por ejemplo, en EchoLog…" into existing paragraphs, +2-3 points on Citability
4. **Add og:image:width/height to MetaTags** — 5-minute fix, improves social previews
5. **Add "last updated" date in footer** — content freshness signal for AI citation

---

## 30-Day Action Plan

### Week 1: Schema & Freshness
- [ ] Add FAQPage schema to ContactPage and ProjectsPage
- [ ] Add Article schema to case study JSON-LD
- [ ] Add "Last updated: June 2026" to footer
- [ ] Fix og:image dimensions in MetaTags component

### Week 2: Content Depth
- [ ] Add 1-2 concrete project examples per "Cómo trabajo" paragraph
- [ ] Add methodology section to About page (DDD-lite, testing approach)
- [ ] Create a "Technical philosophy" section linking to case studies

### Week 3: Platform Presence
- [ ] Create YouTube channel, upload 1-2 short code walkthroughs
- [ ] Set up LinkedIn custom URL (remove numeric suffix)
- [ ] Write 1 technical LinkedIn post about geo-seo-opencode

### Week 4: Polish & Measure
- [ ] Re-run GEO audit to measure score improvement
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Google AI Overviews and ChatGPT for brand mentions

---

## Appendix: Pages Analyzed

| URL | Title | GEO Score | Issues |
|---|---|---|---|
| /home | Home | 62 | Sparse content for AI citation |
| /about | Sobre mí | 74 | Strong E-E-A-T, real certs |
| /projects | Proyectos | 72 | Good process content, missing FAQ schema |
| /projects/echolog | EchoLog | 68 | Solid case study, no Article schema |
| /projects/geo-seo-opencode | geo-seo-opencode | 70 | Unique content, no HowTo schema |
| /projects/cinelab | CineLab | 65 | Lighter case study content |
| /projects/movie-dashboard | Movie Dashboard | 65 | Lighter case study content |
| /projects/chefcitoia | ChefcitoIA | 62 | Shortest case study |
| /projects/nexus-talent | Nexus Talent | 67 | AI-focused, good content |
| /contact | Contacto | 70 | Q&A-structured, needs FAQ schema |
| /privacy | Privacidad | 55 | Thin content, expected for legal page |
| /not-found | 404 | N/A | Error page, excluded from SEO |

*All routes × 2 languages (ES/EN). Full 24 URLs in sitemap with hreflang.*
