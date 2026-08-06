# GEO Audit Report: Ezequiel Fernández — Portfolio

**Audit Date:** 2026-08-05
**URL:** https://ezefernandez.com
**Business Type:** Agency/Services (personal portfolio / developer brand)
**Pages Analyzed:** 22 (11 rutas × 2 idiomas)

---

## Executive Summary

**Overall GEO Score: 52/100 (Poor)**

El sitio tiene una infraestructura técnica excelente (94/100): prerender funcional, JSON-LD en HTML crudo, robots abierto a todos los AI crawlers, llms.txt impecable, Vercel edge con TTFB < 300ms. El problema es que la infraestructura sirve un **esqueleto**: el contenido de mayor valor (proyectos, stats, skills, listas, decisiones de arquitectura) se renderiza client-side y los AI crawlers que no ejecutan JS nunca lo ven. A eso se suma una presencia off-site casi nula (brand authority 19/100) que impide que los modelos desambigüen la entidad "Ezequiel Fernández" (confundida con un futbolista argentino). El score de plataformas (26/100) confirma que el sitio no está estructurado para extracción tipo AI Overviews: sin FAQ, sin tablas, sin headings pregunta, sin fechas verificables.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 55/100 | 25% | 13.75 |
| Brand Authority | 19/100 | 20% | 3.80 |
| Content E-E-A-T | 62/100 | 20% | 12.40 |
| Technical GEO | 94/100 | 15% | 14.10 |
| Schema & Structured Data | 57/100 | 10% | 5.70 |
| Platform Optimization | 26/100 | 10% | 2.60 |
| **Overall GEO Score** | | | **52.4/100** |

---

## Critical Issues (Fix Immediately)

1. **Prerender incompleto — el contenido real es invisible para los AI crawlers.** El HTML servido solo contiene secciones estáticas. En `/projects` el crawler ve ~470 palabras de prosa metodológica pero **cero nombres de proyectos o links**; `/about` sirve 2 párrafos (~55 palabras); el home ~25-30 palabras. Los grids, carousels, listas de skills/educación, stats y las secciones de decisiones de los case studies quedan vacías client-side. GPTBot/ClaudeBot/PerplexityBot (que no ejecutan JS) nunca ven el valor del sitio. Evidencia: `/tmp/opencode/geo/home.html` — secciones `<section>` vacías tras el hero.
2. **Cero contenido estructurado para extracción.** No hay headings pregunta (H2/H3 interrogativos), no hay FAQ, no hay tablas HTML, no hay `<ul>/<ol>` en el prerender. Google AI Overviews (que solapa ~70% con featured snippets) no tiene nada que extraer. Las secciones de los case studies se titulan "Summary"/"The problem"/"Architecture & decisions" en vez de preguntas.
3. **Sin fechas visibles ni `datePublished`/`dateModified` en el body ni en JSON-LD.** Todo el contenido es 2026 (fresco), pero la frescura no es verificable por máquinas — penaliza freshness en AIO, Perplexity y Gemini.

## High Priority Issues

1. **Bug tipográfico `" , "` en títulos de locales ES.** `src/locales/{es,en}/home.json` y otros emiten `"Portfolio Personal , Full Stack Developer"`, `"Sobre mí , Full Stack Developer"` — con coma y espacio invertidos — y esto llega a `<title>`, `og:title`, `WebPage.name` y nombres de breadcrumb. **Ojo**: el sitio desplegado hoy muestra los títulos buenos de `route-meta.ts` (`"Ezequiel Fernández | Full Stack Developer | Personal Portfolio"`), lo que significa que el build desplegado es anterior a un cambio de locales — **el próximo deploy los degrada**.
2. **Divergencia de fuentes de verdad para títulos.** `route-meta.ts` tiene títulos descriptivos con el nombre; los locales JSON (que es lo que emite el prerender) tienen títulos defectuosos. Hay que alinear (los locales deben ganar o eliminar la duplicación).
3. **Case studies tipados como `WebPage` genérico.** Ninguno usa `Article`/`TechArticle`/`SoftwareApplication`. El proyecto CLI `geo-seo-opencode` debería ser `SoftwareApplication` (applicationCategory, operatingSystem, featureList). Esto renuncia al señal E-E-A-T más fuerte del sitio.
4. **`Person` schema mínimo.** `sameAs` solo GitHub + LinkedIn; faltan `image`, `description`, `knowsAbout` (React, Node, TypeScript, PostgreSQL), `alumniOf`, `hasCredential` (AI Skills Fest 2026 + Credly), `worksFor`, `award`, `contactPoint`. El nodo Person es el centro del grafo de una marca personal.
5. **`@id` de BreadcrumbList duplicado global.** Todas las páginas usan `https://ezefernandez.com/#breadcrumb` con contenidos distintos — al mergear grafos hay conflicto de IDs. Debe ser page-scoped (`/about#breadcrumb`). Los nombres de breadcrumb heredan el bug de título.
6. **Stats clave solo en meta description, no en body.** EchoLog: "606 tests, 45 PRs en 3 meses", "~20.000 líneas" solo en `<meta name="description">`; el body corta en "Decisiones clave con tradeoffs explícitos:" con la lista client-rendered. Candidatos de citación perdidos.
7. **Brand authority casi nula.** GitHub `ezefernandezyf` (14 repos, 39 followers) tiene **0 stars en todos los repos**; sin Wikidata item (la búsqueda resuelve a un futbolista argentino, Q83750159); sin presencia en Reddit, HN, StackOverflow, Quora, YouTube. No hay backlinks ni testimonios.
8. **Strings hardcodeadas sin i18n.** `CaseStudyTemplate.tsx:164` "Case Study", `:218` "Featured", `:296` "The Engineering Stack"; `PrivacyPage.tsx:48` "Privacy & Trust" — en inglés dentro de páginas ES. Y peor: `AboutPage.tsx:296-303` tiene la educación hardcodeada en **español**, así que `/en/about` muestra párrafos en español a usuarios en inglés.
9. **URL de Credly duplicada/divergente.** `llms.txt` referencia `credly.com/badges/6f6e4c5f-1d80-4a63-8f1b-3a4a7c6b9e2d`; `AboutPage.tsx:308` referencia `credly.com/badges/e3409ca3-b1e2-4ffd-9862-e6c5883a8723`. Una de las dos está rota — riesgo de confianza en la única credencial third-party verificable.
10. **Cero links internos en el HTML prerenderizado.** Header nav, footer y anchors son client-side. Los AI crawlers ven texto + JSON-LD pero **no pueden navegar el sitio desde el contenido**; descubrimiento depende solo de sitemap.xml.
11. **Manejo de 404.** Rutas desconocidas devuelven el 404 genérico de Vercel (79 bytes, sin branding/meta/nav). La custom NotFoundPage `/not-found` responde **200**, no tiene `<meta name="robots">` y es indexable.
12. **Sin IndexNow.** `/.well-known/indexnow-key.txt` → 404. El lever N°1 de Bing Copilot está sin usar (Copilot es la plataforma donde el sitio mejor puntúa: 42/100).

## Medium Priority Issues

- **Imágenes `.jpg` sin migrar a `.webp`**: 11 archivos (CineLab `cinelab-1..4.jpg`, Movie Dashboard `moviedash-1..4.jpg`, ChefcitoIA `chefcitoia-1..3.jpg`).
- **Cadena de redirect www de 2 saltos**: `www` → 307 → `ezefernandez.com` → 308 → `/home`. Debería ser un único 301.
- **Redirects sin security headers**: la respuesta 308 `/` → `/home` no lleva CSP, X-Content-Type-Options, X-Frame-Options ni Referrer-Policy (solo HSTS).
- **Case studies delgados**: CineLab, MovieDashboard, ChefcitoIA son genéricos — "El proyecto fue un reto técnico", "Lighthouse 90+" sin link de evidencia, sin counts de tests/PRs. EchoLog es el modelo a seguir.
- **About page thin**: ~50 palabras prerenderizadas, muy por debajo del piso de 300; sin timeline, sin outcomes, sin narrativa.
- **Sitemap `lastmod` estático** `2026-06-22` en las 22 URLs; `Last-Modified` real es 2026-07-30. Falta el hook de auto-generación (ya anotado en roadmap Fase 14d).
- **`CollectionPage` (/projects) sin `mainEntity`/`hasPart`** que enlace a los case studies; case studies sin `dateModified`.
- **`keywords` de `route-meta.ts` nunca emitidos** a JSON-LD — dato muerto.
- **ContactPage sin datos de contacto en schema**: sin `ContactPoint`, `email`, `telephone`.
- **`WebSite` node monolingüe en inglés** también en páginas ES; falta `inLanguage` (ES).
- **Contenido no detectado**: FAQPage/HowTo/speakable ausentes en /contact y case studies.

## Low Priority Issues

- **Polishing de seguridad**: falta `permissions-policy`; CSP sin `object-src 'none'` explícito; HSTS sin `includeSubDomains`.
- **`og:site_name` y robots meta solo client-side**; falta robots meta en todas las páginas prerenderizadas.
- **BOM UTF-8 en archivos de locales JSON** — cualquier consumidor distinto de prerender debe usar `utf-8-sig`.
- **llms.txt no está referenciado** desde el HTML `<head>` ni promovido on-page.
- **`useThemeColor.tsx:31`** lee `--color-bg` inexistente (debería ser `--color-bg-primary`) — fuera de GEO pero afecta fiabilidad.
- **Alt text descriptivo** de imágenes de carousel mejorable.
- **Fork huérfano de geo-seo-opencode** (GejorBalvin) en GitHub — monitorear.

---

## Category Deep Dives

### AI Citability (55/100)
El prerender captura solo secciones estáticas; el contenido más citable (proyectos, stats, decisiones) es client-rendered e invisible. El home ES tiene ~25-30 palabras de body. Los case studies más fuertes (EchoLog: 606 tests, 45 PRs, JWT sin jsonwebtoken, tradeoffs explícitos) nunca llegan a los crawlers sin JS. Rewrite target: bloques de 134-167 palabras respuesta-primero, p.ej. "Ezequiel Fernández es un Full Stack Developer de Argentina que construye productos con React 19, Node.js, Express y PostgreSQL".

### Brand Authority (19/100)
Cero estrellas en GitHub (39 followers), sin Wikidata item (desambiguación de entidad falla hacia un futbolista), sin Reddit/HN/StackOverflow/Quora/YouTube. El único third-party verificable es el badge de Credly (HTTP 200). llms.txt y robots.txt impecables pero no compensan la ausencia off-site. Acción mínima: crear item de Wikidata + publicar contenido value-first (Show HN, dev.to, StackOverflow answer) + buscar estrellas con docs/README pulidos.

### Content E-E-A-T (62/100)
Experience fuerte en EchoLog (métricas reales, root-causes de bugs), débil en el resto (cero métricas). Expertise list-based: stack + certificación Microsoft, pero sin bio narrativa. Authoritativeness 4/25: sin backlinks, sin media, sin testimonios. Trustworthiness dañada por la URL de Credly duplicada. Topical authority "Developing" (8 case studies + 13 páginas de contenido). Acciones: completar prerender de case studies, profundizar los 3 delgados, rebuild de /about como bio narrativa con timeline, arreglar Credly, i18n-ificar strings hardcodeadas.

### Technical GEO (94/100)
El punto fuerte del sitio: robots.txt válido y abierto a todos los AI crawlers; canonical self-referencing + hreflang recíproco es/en/x-default en cada página; JSON-LD @graph en HTML crudo; texto completo prerenderizado (parcial); TTFB 118-290ms; página ≈170KB (JS 149KB brotli, CSS 11KB); assets immutable max-age=31536000; preconnect + preload de fonts; Vercel edge HIT. Gaps: cero links internos en el HTML, 404 genérico, cadena www 307+308, redirects sin security headers, sitemap lastmod estático, IndexNow ausente.

### Schema & Structured Data (57/100)
El @graph (Person/WebSite/WebPage/BreadcrumbList) está presente y válido en todas las páginas — **el bug sospechado de i18n keys en schema.ts está FIXED** (se verifica en HTML servido: todos los valores resueltos). Los problemas son de completitud: Person minimalista, case studies como WebPage genérico (sin Article/TechArticle/SoftwareApplication), `@id` de breadcrumb duplicado, sin fechas, sin keywords, sin ContactPoint, `WebSite` monolingüe. Recordatorio: `src/data/schema.ts` y `scripts/prerender.mjs:118-213` son builders duplicados que deben mantenerse en sync — la dedup es prioridad técnica.

### Platform Optimization (26/100)
- **Google AI Overviews: 20/100** — sin headings pregunta, FAQ, tablas ni listas en el HTML estático.
- **ChatGPT Web Search: 20/100** — sin entidad Wikipedia/Wikidata, sin comunidad, contenido prerenderizado delgado.
- **Perplexity: 26/100** — datos originales en case studies (606 tests, 45 PRs) pero el crawler no los ve; cero validación comunitaria.
- **Gemini: 24/100** — schema @graph es el mejor asset, pero Person subpoblado, sin Knowledge Panel/GBP/YouTube, imágenes client-rendered con un solo og-image compartido.
- **Bing Copilot: 42/100** — el mejor de los cinco: meta descriptions reales por página, GitHub/LinkedIn activos, hreflang en sitemap. Bloqueado por falta de IndexNow y Bing Webmaster Tools no verificable.

---

## Quick Wins (Implement This Week)

1. **Fix títulos `" , "`** en locales ES/EN (`home.json`, `aboutpage.json`, case studies) — 5 minutos, impacto inmediato en SERP, OG y schema. Alinear con `route-meta.ts` y eliminar la divergencia.
2. **Inyectar nav + footer links en el prerender** (`scripts/prerender.mjs`) — crawlers pueden navegar el sitio sin JS. Alto impacto, bajo esfuerzo (los links ya existen en ROUTE_META).
3. **Reconciliar URL de Credly** — verificar cuál badge es real y unificar `llms.txt` + código + schema.
4. **Mover stats de los case studies al body** — tabla de "Resultados" en EchoLog (606 tests / 45 PRs / ~20k líneas / 3 meses) con `<table>` HTML.
5. **Enriquecer nodo Person** — `image`, `description`, `knowsAbout`, `hasCredential` (Credly), 3+ sameAs más.
6. **404: `noindex` + Vercel 404.html** — la NotFoundPage indexable responde 200 hoy.
7. **IndexNow** — generar key en `/.well-known/indexnow-key.txt` + ping en build.

## 30-Day Action Plan

### Week 1: Prerender completo (el lever #1)
- [ ] Extender `scripts/prerender.mjs` para renderizar grids de proyectos, skills, educación, stats, items de carousel y listas de decisiones de case studies
- [ ] Inyectar nav + footer con links reales en el HTML estático
- [ ] Mover stats de meta description a body (tabla de resultados en cada case study)
- [ ] Fix títulos `" , "` en todos los locales + alinear con `route-meta.ts`

### Week 2: Schema & Structured Data
- [ ] Case studies → `TechArticle` (headline, datePublished, dateModified, author, image, speakable)
- [ ] geo-seo-opencode → `SoftwareApplication` (applicationCategory, operatingSystem, featureList)
- [ ] Enriquecer `Person` (image, description, knowsAbout, alumniOf, hasCredential, contactPoint, sameAs extra)
- [ ] Breadcrumb `@id` page-scoped + `dateModified` en WebPage + `mainEntity`/`hasPart` en CollectionPage
- [ ] Emitir `keywords` y `ContactPoint`; deduplicar builders schema.ts ↔ prerender.mjs

### Week 3: Contenido
- [ ] Deepen CineLab / MovieDashboard / ChefcitoIA al nivel EchoLog (tests, PRs, tradeoffs, hookCode)
- [ ] Rebuild `/about` como bio narrativa (timeline, outcomes, rol por proyecto, > 300 palabras)
- [ ] i18n-ificar strings hardcodeadas (CaseStudyTemplate, PrivacyPage, educación de AboutPage en EN)
- [ ] Headings pregunta + 5-question FAQ por case study + fechas visibles ("By Ezequiel Fernández")

### Week 4: Off-site + Infra
- [ ] Crear Wikidata item "Ezequiel Fernández (software developer)" con sameAs GitHub/LinkedIn/Credly
- [ ] Publicar geo-seo-opencode: Show HN + r/seo/r/llmops + artículo dev.to + StackOverflow answer
- [ ] IndexNow + Bing Webmaster Tools + sitemap submit
- [ ] Migrar 11 JPG → webp; fix cadena www a 301 único; security headers en redirects; 404 noindex

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://ezefernandez.com | → 308 → /home | redirect chain, headers faltantes |
| https://ezefernandez.com/home | Portfolio Personal , Full Stack Developer | título defectuoso, prerender vacío |
| https://ezefernandez.com/en/home | Ezequiel Fernández \| Full Stack Developer \| Personal Portfolio | prerender vacío (EN) |
| https://ezefernandez.com/about | Sobre mí , Full Stack Developer | título defectuoso, thin content |
| https://ezefernandez.com/en/about | About Me , Full Stack Developer | educación ES en página EN |
| https://ezefernandez.com/projects | Projects directory | cero proyectos en prerender |
| https://ezefernandez.com/projects/echolog | EchoLog case study | WebPage genérico, stats solo meta |
| https://ezefernandez.com/projects/geo-seo-opencode | geo-seo-opencode case study | debería ser SoftwareApplication |
| https://ezefernandez.com/projects/cinelab | CineLab case study | delgado, JPG sin webp |
| https://ezefernandez.com/projects/movie-dashboard | Movie Dashboard case study | delgado, JPG sin webp |
| https://ezefernandez.com/projects/chefcitoia | ChefcitoIA case study | delgado, JPG sin webp |
| https://ezefernandez.com/projects/nexus-talent | Nexus Talent case study | — |
| https://ezefernandez.com/contact | Contact | schema sin ContactPoint |
| https://ezefernandez.com/privacy | Privacy | "Privacy & Trust" hardcoded |
| https://ezefernandez.com/not-found | 404 page | responde 200, indexable |
| /en/* (8 páginas espejo) | — | mismos issues ES |
| https://ezefernandez.com/robots.txt | robots.txt | ok, sin reglas AI específicas |
| https://ezefernandez.com/llms.txt | llms.txt | ok, el mejor asset |
| https://ezefernandez.com/sitemap.xml | sitemap | lastmod estático 2026-06-22 |
