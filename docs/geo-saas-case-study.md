# Case Study — Relevy (GEO/SEO Auditing SaaS)

> Ficha completa para el portfolio. Bilingüe ES/EN: el ES es la base, el EN es traducción profesional. Los campos se mapean 1:1 a los archivos del portfolio.
> Nota interna: el repo nació como `geo-saas` / marca `GeoAudit`, se renombró a `Relevy` (sprint 11); el README actual y `docs/RELEVY-BRAND-BRIEF.md` mandan. El remote git local todavía apunta al alias `geoaudit.git` (GitHub redirige al nombre nuevo).

---

## 1. Identidad

- id: geo-saas
- displayName: Relevy
- namespace: geosaascasestudy
- year: 2026
- featured: false
  - _Decisión pendiente del owner del portfolio: default `false` hasta confirmar si va destacado en hero/carousel._
- repo: https://github.com/ezefernandezyf/relevy
  - _El remote local es `git@github.com:ezefernandezyf/geoaudit.git` (alias viejo); el README y AGENTS.md declaran `github.com/ezefernandezyf/relevy` como URL canónica._
- demo: https://relevy.app
  - _Verificado: fetch real HTTP 200 en el verify del sprint 21 (evidencia en `openspec/changes/archive/2026-09-07-sprint-21-citability-i18n/verify-report.md`)._
- position: _[NO DISPONIBLE — sin preferencia definida; omitido]_

---

## 2. Tech stack

**tech[]:**
```json
["Next.js 15", "React 19", "TypeScript 5", "Tailwind CSS 4", "Prisma 7", "PostgreSQL (Supabase)", "NextAuth.js v5", "Zod 4", "Vitest 4", "React Testing Library", "Playwright", "Sentry", "cheerio", "lucide-react", "Vercel", "GitHub Actions"]
```

**stackSections:**

| titleKey | title | items |
| --- | --- | --- |
| `stack.sections.frontend` | Frontend | Next.js 15 (App Router, RSC + Server Actions), React 19, TypeScript strict, Tailwind CSS 4, lucide-react |
| `stack.sections.backend` | Backend & Data | Prisma 7 con driver adapters (@prisma/adapter-pg), PostgreSQL (Supabase), cheerio (parseo HTML), Node.js 20+ |
| `stack.sections.auth` | Auth & Validation | NextAuth.js v5 (Auth.js, GitHub OAuth), Zod 4 (contracts compartidos) |
| `stack.sections.testing` | Testing & Quality | Vitest 4, React Testing Library + jest-dom, Playwright + @axe-core/playwright, Husky + lint-staged |
| `stack.sections.infra` | Infra & Observability | Vercel (Turbopack), GitHub Actions (CI), Sentry (@sentry/nextjs, DSN-guarded) |

_Regla de coherencia cumplida: `tech[]` es subconjunto de la unión de `stackSections.items`._

---

## 3. Header

- **header.title**: Relevy
- **header.short** (ES): "Auditoría GEO y SEO para buscadores con IA: ingresá una URL y obtené un GEO Score 0-100 con reporte de citabilidad, E-E-A-T, schema, plataforma y marca."
- **header.short** (EN): "GEO & SEO auditing for AI search: drop in a URL and get a 0-100 GEO Score with a full citability, E-E-A-T, schema, platform and brand report."
- **header.repoAria**: "Repositorio de Relevy" / "Relevy repository"
- **header.demoAria**: "Demo de Relevy" / "Relevy live demo"
- **header.backToProjects**: "← Volver a Proyectos" / "← Back to Projects"

---

## 4. Resumen

- **summary.heading**: "Resumen" / "Summary"
- **summary.text** (ES): "Relevy es un micro-SaaS que automatiza la auditoría GEO (Generative Engine Optimization): analiza una URL en vivo y devuelve un GEO Score de 0 a 100 con reporte completo de visibilidad en ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews y Bing Copilot. El stack es una app Next.js 15 única con dominios de negocio aislados, PostgreSQL con Prisma 7 y un plan Free de 10 auditorías cada 30 días."
- **summary.text** (EN): "Relevy is a micro-SaaS that automates GEO (Generative Engine Optimization) audits: it crawls a URL live and returns a 0-100 GEO Score plus a full AI-visibility report across ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews and Bing Copilot. It's a single Next.js 15 app with isolated business domains, PostgreSQL via Prisma 7, and a Free plan of 10 audits every 30 days."

---

## 5. El problema

- **problem.heading**: "El problema" / "The problem"
- **problem.text** (ES): "Las marcas no saben cómo las citan los motores de búsqueda con IA: ChatGPT, Claude, Perplexity o Google AI Overviews pueden ignorarlas o citar a la competencia sin que nadie lo detecte. Las herramientas SEO clásicas miden rankings y backlinks, no responden a la pregunta nueva: ¿soy una fuente citable para una IA? Antes de Relevy no existía un producto simple que combinara las seis dimensiones que determinan esa visibilidad — citabilidad del contenido, E-E-A-T, acceso de crawlers de IA, schema estructurado, readiness por plataforma y autoridad de marca — en un score accionable de 0 a 100. El desafío técnico real era construir motores de análisis deterministas sobre HTML arbitrario y ajeno, con fetching seguro (anti-SSRF) y rúbricas de scoring que no puntuaran todo en cero."
- **problem.text** (EN): "Brands have no visibility into how AI search engines cite them: ChatGPT, Claude, Perplexity or Google AI Overviews can ignore them or cite competitors with nobody noticing. Classic SEO tools measure rankings and backlinks — they don't answer the new question: am I a citable source for an AI? Before Relevy there was no simple product combining the six dimensions that drive that visibility — content citability, E-E-A-T, AI crawler access, structured schema, per-platform readiness and brand authority — into an actionable 0-100 score. The real technical challenge was building deterministic analysis engines over arbitrary third-party HTML, with safe (SSRF-proof) fetching and scoring rubrics that didn't zero out every real site."

---

## 6. La solución

- **solution.heading**: "La solución" / "The solution"
- **solution.list[]**:

1. **(ES)** GEO Score compuesto de 6 dimensiones ponderadas (v3.1.0: citabilidad 24 %, E-E-A-T 23 %, técnico 15 %, plataforma 14 %, schema 12 %, brand authority 12 %), calculado por una función pura en `src/scoring/calculator.ts` con bandas de severidad de fuente única.
   **(EN)** A 0-100 composite GEO Score across six weighted dimensions (v3.1.0: citability 24 %, E-E-A-T 23 %, technical 15 %, platform 14 %, schema 12 %, brand authority 12 %), computed by a pure function in `src/scoring/calculator.ts` with single-source severity bands.
2. **(ES)** Motor de citabilidad que detecta bloques de contenido, frases normativas, auto-contención y uniqueness; con soporte i18n EN+ES del sprint 21 (patrones léxicos bilingües en `src/citability/constants.ts`) que levantó el landing de ~50 a 74.
   **(EN)** A citability engine that detects content blocks, normative phrases, self-containment and uniqueness; EN+ES i18n landed in sprint 21 via bilingual lexical patterns in `src/citability/constants.ts`, lifting the landing from ~50 to 74.
3. **(ES)** Crawler access map sobre robots.txt, meta robots y headers HTTP (cheerio + fetch propio), y un fetch layer con guarda SSRF real: resolución DNS y clasificación de rangos IPv4/IPv6 privados y reservados en `src/lib/fetch/ssrf.ts`.
   **(EN)** A crawler access map over robots.txt, meta robots and HTTP headers (cheerio + custom fetch), and a fetch layer with a real SSRF guard: DNS resolution plus IPv4/IPv6 private/reserved range classification in `src/lib/fetch/ssrf.ts`.
4. **(ES)** E-E-A-T sobre experiencia, experticia, autoridad y confiabilidad; schema engine que detecta, valida y puntúa JSON-LD/Schema.org; platform readiness por motor (SSR, OpenGraph, headers, llms.txt) con view-models por plataforma.
   **(EN)** E-E-A-T scored across experience, expertise, authority and trustworthiness; a schema engine that detects, validates and scores JSON-LD/Schema.org; per-engine platform readiness (SSR, OpenGraph, headers, llms.txt) with platform view-models.
5. **(ES)** Auditoría en vivo server-side bajo Suspense con skeleton instantáneo (el primer paint no espera el resultado, ~2.8 s para example.com), persistencia en PostgreSQL con Prisma, historial en dashboard, share links con token único y auditoría multi-página (hasta 5 URLs).
   **(EN)** Live server-side audit under Suspense with an instant skeleton (first paint never waits for the result, ~2.8 s for example.com), PostgreSQL persistence via Prisma, dashboard history, unique-token share links and multi-page audits (up to 5 URLs).
6. **(ES)** Rate limiting 5 req/60 s con store DB-backed compartido entre instancias serverless (tabla `RateLimitEntry`), auth GitHub con NextAuth v5 y plan Free de 10 auditorías / 30 días sin sistema de pagos.
   **(EN)** Fixed-window rate limiting at 5 req/60 s with a DB-backed store shared across serverless instances (`RateLimitEntry` table), GitHub auth via NextAuth v5 and a single Free plan of 10 audits / 30 days with no payment system.

---

## 7. Arquitectura & decisiones

- **architecture.heading**: "Arquitectura & decisiones" / "Architecture & decisions"
- **architecture.list[]**:

1. **(ES)** Screaming Architecture: cada dominio de negocio es una carpeta top-level (`src/crawlers`, `src/citability`, `src/schema`, `src/eeat`, `src/platform`, `src/brand`, `src/scoring`, `src/report`) y `app/` es solo routing con Server Components que importan desde los dominios. La lógica de negocio no vive en el router.
   **(EN)** Screaming Architecture: each business domain is a top-level folder (`src/crawlers`, `src/citability`, `src/schema`, `src/eeat`, `src/platform`, `src/brand`, `src/scoring`, `src/report`) and `app/` is routing only, with Server Components importing from the domains. Business logic never lives in the router.
2. **(ES)** Scoring como función pura, determinista y sin I/O, con pesos versionados en semver (`scoringModelVersion` v2.0.0 → v3.1.0) y rebalanceo automático de pesos cuando un engine falla: el score nunca es NaN y un engine caído no distorsiona el compuesto. Eso permitió calibrar contra un corpus real sin reescribir la UI.
   **(EN)** Scoring as a pure, deterministic, I/O-free function with semver'd weight configs (`scoringModelVersion` v2.0.0 → v3.1.0) and automatic weight rebalancing when an engine fails: the score is never NaN and a downed engine never distorts the composite. That made calibration against a real corpus possible without rewriting the UI.
3. **(ES)** Zod 4 como single source of truth: contracts compartidos server/client en `src/lib/contracts/` (validación de entrada de URL, tipado del `AuditResult`). Server valida, el cliente infiere tipos — sin duplicación de esquemas entre capas.
   **(EN)** Zod 4 as the single source of truth: shared server/client contracts in `src/lib/contracts/` (URL input validation, `AuditResult` typing). The server validates, the client infers types — no duplicated schemas across layers.
4. **(ES)** Prisma 7 con driver adapters: el cliente runtime usa `@prisma/adapter-pg` (la URL de conexión vive en código), y la CLI usa `prisma.config.ts`. Separar runtime y CLI evitó el problema clásico de Prisma en serverless con poolers de sesión.
   **(EN)** Prisma 7 with driver adapters: the runtime client uses `@prisma/adapter-pg` (connection URL supplied in code) while the CLI uses `prisma.config.ts`. Splitting runtime and CLI avoided the classic Prisma-on-serverless issue with session poolers.
5. **(ES)** Decisiones de producto reversibles y documentadas: se construyó Stripe + plan PRO (sprints 4-5) y se removió antes del launch (sprint 10, migración `remove_billing_free_mode`) por decisión de producto — single Free plan 10/30d. También se evaluó y removió el PDF export (sprint 18) tras medir el costo real de Puppeteer en serverless. Cada sprint es un change SDD versionado en `openspec/` con proposal/spec/design/tasks/verify.
   **(EN)** Reversible, documented product decisions: Stripe + a PRO plan were built (sprints 4-5) and removed pre-launch (sprint 10, `remove_billing_free_mode` migration) — single Free plan 10/30d. PDF export was also evaluated and removed (sprint 18) after measuring the real cost of Puppeteer on serverless. Every sprint is a versioned SDD change under `openspec/` with proposal/spec/design/tasks/verify.
6. **(ES)** Desarrollo con SDD (Spec-Driven Development) + TDD estricto: cada cambio arranca con specs de capacidad (delta specs), y la calibración del motor se apoya en evidencia real (14 URLs del corpus) en lugar de opiniones. El verify de cada sprint corre la suite completa y typecheck como gate (nunca `build` tras cambios).
   **(EN)** SDD (Spec-Driven Development) with strict TDD: every change starts with capability specs (delta specs), and engine calibration is driven by real evidence (a 14-URL corpus) instead of opinions. Each sprint's verify runs the full test suite and typecheck as the gate (never `build` after changes).

---

## 8. Implementación destacada

- **implementation.heading**: "Implementación destacada" / "Highlight implementation"
- **implementation.hookTitle**: "GEO Score determinista: composición, exclusión y rebalanceo de pesos" / "Deterministic GEO Score: composition, exclusion and weight rebalancing"
- **implementation.hookCode** (extraído de `src/scoring/calculator.ts`, función `computeGeoScore`, v3.1.0):

```ts
  const dimensions: Record<DimensionKey, number | null> = {
    citability: engineScores.citability ?? null,
    eeat: engineScores.eeat ?? null,
    technical,
    schema: engineScores.schema ?? null,
    platform: rawPlatform,
    brand_authority: engineScores.brand_authority ?? null,
  };

  const available = DIMENSIONS.filter(
    (key) => dimensions[key] !== null && dimensions[key] !== undefined,
  );

  // RGS-10: no engine produced a score → valid result, never NaN.
  if (available.length === 0) {
    return {
      geoScore: 0,
      severityBand: severityForScore(0),
      scoringModelVersion: weights.version,
      weights,
      dimensions,
      notes: [...notes, "No engine scores available; composite defaults to 0"],
    };
  }

  // RGS-9: re-balance weights among the available dimensions. The weights map
  // is Partial (design D5) so historical configs without brand_authority fall
  // back to 0 weight - the brand dimension stays out of the composite.
  const availableWeight = available.reduce(
    (sum, key) => sum + (weights.weights[key] ?? 0),
    0,
  );
  const weighted = available.reduce(
    (sum, key) =>
      sum + (dimensions[key] as number) * (weights.weights[key] ?? 0),
    0,
  );
  const composite = weighted / availableWeight;
```

- **implementation.hookDescription** (ES): "Este es el corazón del producto: una función pura sin efectos ni I/O que combina los puntajes de los seis engines en el GEO Score final. Lo interesante es el manejo de fallos parciales: si un engine no pudo correr (timeout, HTTP 403, sitio sin contenido extraíble), se excluye de la sumatoria y los pesos se renorman entre las dimensiones disponibles, así un engine caído no castiga ni infla el resultado. El compuesto nunca es NaN, cada exclusión queda registrada en `notes` (superficie para el reporte), y la versión de pesos viaja en el resultado (`scoringModelVersion`) — lo que hizo posible recalibrar de v2.0.0 a v3.1.0 contra 14 URLs reales y comparar scores históricos sin ambigüedad. La dimensión `technical` se compone como `crawler × 0.6 + platform × 0.4` cuando no hay score standalone (RGS-2). Es determinista por diseño y está cubierta por tests unitarios que fijan los umbrales de banda y los casos de exclusión."
- **implementation.hookDescription** (EN): "This is the heart of the product: a pure function with no side effects or I/O that blends the six engines' scores into the final GEO Score. The interesting part is partial-failure handling: if an engine couldn't run (timeout, HTTP 403, site with no extractable content), it's excluded from the sum and the weights are renormalized across the available dimensions, so a downed engine neither punishes nor inflates the result. The composite is never NaN, every exclusion is recorded in `notes` (the surface the report renders), and the weight version travels in the result (`scoringModelVersion`) — which made recalibrating from v2.0.0 to v3.1.0 against 14 real URLs possible while keeping historical scores comparable. The `technical` dimension is composed as `crawler × 0.6 + platform × 0.4` when no standalone score exists (RGS-2). It's deterministic by design and covered by unit tests that pin the band thresholds and exclusion cases."

---

## 9. Accesibilidad

- **accessibility.heading**: "Accesibilidad" / "Accessibility"
- **accessibility.list[]**:

1. **(ES)** Contraste WCAG 2.2 AA verificado con `@axe-core/playwright` sobre un browser real (jsdom no computa contraste): escaneos sobre landing, pricing y report con reglas `color-contrast`, `aria-progressbar-name` y `label-content-name-mismatch`, sin violaciones.
   **(EN)** WCAG 2.2 AA contrast verified with `@axe-core/playwright` on a real browser (jsdom can't compute contrast): scans over landing, pricing and report with `color-contrast`, `aria-progressbar-name` and `label-content-name-mismatch` rules, zero violations.
2. **(ES)** Correcciones de contraste documentadas con ratios antes/después: el emerald de marca `#10b981` sobre blanco daba 2.42:1 (FAIL) y se reemplazó por `#047857` (5.24:1); igual con amber y red de los badges de severidad. Cero excepciones aceptadas sin registrar.
   **(EN)** Contrast fixes documented with before/after ratios: brand emerald `#10b981` on white was 2.42:1 (FAIL) and was replaced by `#047857` (5.24:1); same for the amber/red severity badges. No accepted exceptions without documentation.
3. **(ES)** Drawer mobile con botón `aria-expanded` / `aria-controls`, links de navegación con `aria-current`, y cierre del panel al navegar; accesible por teclado (el bug SSR que lo rompía se explica en la sección Bugs).
   **(EN)** Mobile drawer with `aria-expanded` / `aria-controls` button, nav links with `aria-current`, and the panel closes on navigation; keyboard-accessible (the SSR bug that broke it is explained in the Bugs section).
4. **(ES)** Barras de score con `role="progressbar"`, `aria-valuenow`/`aria-valuemin`/`aria-valuemax` y nombre accesible descriptivo (`aria-progressbar-name`); el nombre accesible del brand link replica el texto visible exacto para no romper `label-content-name-mismatch`.
   **(EN)** Score bars use `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` and a descriptive accessible name (`aria-progressbar-name`); the brand link's accessible name mirrors the exact visible text so `label-content-name-mismatch` stays green.
5. **(ES)** UI copy centralizada y consistente en español neutro (sin voseo) y formularios con labels asociadas (el E2E interactúa con `getByLabel("URL del sitio")`), más un E2E de contraste que asevera los security headers.
   **(EN)** Centralized, consistent UI copy in neutral Spanish and forms with associated labels (the E2E drives them with `getByLabel("URL del sitio")`), plus a contrast E2E that also asserts the security headers.

---

## 10. Métricas & resultados

- **performance.heading**: "Métricas & resultados" / "Metrics & results"
- **performance.list[]**:

1. **(ES)** 1119 tests pasando / 0 fallando / 4 skipped en el último verify (sprint 21, `pnpm test`); ~122 archivos de test; 305 `describe` y ~1083 casos `it` en el árbol actual.
   **(EN)** 1,119 tests passing / 0 failing / 4 skipped in the latest verify (sprint 21, `pnpm test`); ~122 test files; 305 `describe` blocks and ~1,083 `it` cases in the current tree.
2. **(ES)** CI con 4 jobs paralelos (lint, typecheck, test, E2E Playwright) sobre Node 24 + pnpm 11; E2E de auditoría free contra URL pública estable con asserts tolerantes; las suites con secrets se auto-saltan sin env (convención skip-if-no-env).
   **(EN)** CI with 4 parallel jobs (lint, typecheck, test, Playwright E2E) on Node 24 + pnpm 11; free-audit E2E against a stable public URL with tolerant asserts; secret-gated suites skip themselves without env (skip-if-no-env convention).
3. **(ES)** Calibración del motor con evidencia real: promedio 33.8 → 35.6 sobre 12 URLs tras v2.0.0; corpus final de 14 URLs con moz 57 / relevy 55 / promedio 42.4; el landing real de relevy.app puntúa 71 (evidencia re-pinned en el ScoreHero, sprint 21).
   **(EN)** Engine calibration backed by real evidence: average 33.8 → 35.6 across 12 URLs after v2.0.0; final 14-URL corpus with moz 57 / relevy 55 / average 42.4; the live relevy.app landing scores 71 (evidence re-pinned in the ScoreHero, sprint 21).
4. **(ES)** Auditoría en vivo ~2.8 s (example.com) con primer paint inmediato gracias al skeleton bajo Suspense; evidencia histórica Lighthouse (sprint 8): landing Performance 99 / Accessibility 100 / Best Practices 100 / SEO 100; pricing Performance 100; report Performance 99.
   **(EN)** Live audit ~2.8 s (example.com) with instant first paint thanks to the Suspense skeleton; historical Lighthouse evidence (sprint 8): landing Performance 99 / Accessibility 100 / Best Practices 100 / SEO 100; pricing Performance 100; report Performance 99.
5. **(ES)** Cobertura de código: **[NO DISPONIBLE]** — Vitest tiene `@vitest/coverage-v8` instalado pero la cobertura no corre en los verify ni está fijada como gate; no hay número oficial.
   **(EN)** Code coverage: **[NOT AVAILABLE]** — Vitest ships `@vitest/coverage-v8` but coverage doesn't run in verifies nor is it enforced as a gate; no official number exists.

---

## 11. Bugs reales & debugging

- **challenges.heading**: "Bugs reales & debugging" / "Real bugs & debugging"
- **challenges.list[]**:

1. **(ES)** HTTP 500 en TODAS las páginas tras agregar el drawer mobile (HYD-1, hotfix #80). Síntoma: la shell completa crasheaba porque el Navbar vive en el layout global. Causa raíz: `createPortal(document.body, …)` se ejecutaba durante el SSR — el portal no puede montarse en el server. Solución: montar el portal solo después del mount del cliente (`useEffect` como gate de hidratación); el toggle sigue visible en SSR. Enseñanza: cualquier API client-only dentro de un Server Component del layout global es un riesgo de runtime en toda la app.
   **(EN)** HTTP 500 on EVERY page after adding the mobile drawer (HYD-1, hotfix #80). Symptom: the whole shell crashed because the Navbar lives in the global layout. Root cause: `createPortal(document.body, …)` ran during SSR — a portal can't mount on the server. Fix: mount the portal only after client mount (a `useEffect` hydration gate); the toggle stays visible in SSR. Lesson: any client-only API inside a Server Component in the global layout is an app-wide runtime risk.
2. **(ES)** Saga del PDF export en producción (PDF-4, PDF-9, HYD-2, VMA-1 → removido en sprint 18). Síntoma: PDFs en blanco o "Requesting main frame too early!" en Vercel. Causas: `puppeteer-core` 25.8 esperaba Chrome 152 pero el pack `@sparticuz/chromium-min@149` trae Chromium 149 (mismatch de protocolo CDP); y el timing de frames (había que commitear el frame inicial antes de `setContent`). Solución parcial: alinear `puppeteer`/`puppeteer-core` a 25.1.0 y corregir el orden de frames. Decisión final de producto: remover la feature (sprint 18) — el costo operativo de Puppeteer en serverless superaba el valor para el plan Free. Enseñanza: medir el costo de infraestructura de una feature antes de enamorarse de ella.
   **(EN)** The PDF export saga in production (PDF-4, PDF-9, HYD-2, VMA-1 → removed in sprint 18). Symptom: blank PDFs or "Requesting main frame too early!" on Vercel. Root causes: `puppeteer-core` 25.8 expected Chrome 152 while the `@sparticuz/chromium-min@149` pack ships Chromium 149 (CDP protocol mismatch); plus frame timing (the initial frame had to be committed before `setContent`). Partial fix: align `puppeteer`/`puppeteer-core` to 25.1.0 and fix frame ordering. Final product decision: remove the feature (sprint 18) — Puppeteer's operational cost on serverless outweighed its value for a Free plan. Lesson: measure a feature's infrastructure cost before falling in love with it.
3. **(ES)** El motor puntuaba mal el mundo real: sitios legítimos quedaban en 0-48 porque las rúbricas eran binarias (todo-o-nada) y el schema casi nunca existía (11/12 URLs ≤ 10, 10/12 en 0). Síntoma: el score no discriminaba y castigaba a cualquier sitio sin JSON-LD. Causa: pesos y rúbricas diseñados "en el vacío", sin corpus. Solución: calibración con evidencia — crédito parcial por niveles en citabilidad/E-E-A-T/schema y rebalanceo de pesos a 28/24/20/14/14 (v2.0.0), luego bandas realistas 80/65/50/30 (v3.1.0). Documentado con tabla antes/después en `docs/calibration-diagnosis.md`.
   **(EN)** The engine scored the real world badly: legitimate sites landed at 0-48 because rubrics were all-or-nothing and schema barely exists anywhere (11/12 URLs ≤ 10, 10/12 at 0). Symptom: the score didn't discriminate and penalized any site without JSON-LD. Cause: weights and rubrics designed in a vacuum, with no corpus. Fix: evidence-driven calibration — tiered partial credit in citability/E-E-A-T/schema and weight rebalancing to 28/24/20/14/14 (v2.0.0), then realistic bands 80/65/50/30 (v3.1.0). Documented with before/after tables in `docs/calibration-diagnosis.md`.
4. **(ES)** El landing en español puntuaba ~50 sin razón de contenido (sprint 21). Síntoma: el propio sitio de Relevy, con contenido ES de calidad, no superaba 49.9. Causa raíz: el scorer de citabilidad solo reconocía patrones léxicos en inglés (answer blocks, cópulas, uniqueness), así que el contenido ES quedaba "sin bloques citables". Solución: extender `src/citability/constants.ts` con patrones bilingües EN+ES (definiciones "es un/una", cópulas, pronombres y conjunciones de lead, frases de uniqueness) exigiendo 0 cambios en `scorer.ts` (verificado por diff). Resultado: fixture ES 38.7 → 46.7 (+8.0 de lift) y score real 50 → 74.
   **(EN)** The Spanish landing scored ~50 for no content reason (sprint 21). Symptom: Relevy's own site, with quality ES content, couldn't get past 49.9. Root cause: the citability scorer only recognized English lexical patterns (answer blocks, copulas, uniqueness), so ES content looked like "no citable blocks". Fix: extend `src/citability/constants.ts` with bilingual EN+ES patterns (definitions "es un/una", copulas, lead pronouns/conjunctions, uniqueness phrases) requiring zero changes in `scorer.ts` (verified by diff). Result: ES fixture 38.7 → 46.7 (+8.0 lift) and the real score 50 → 74.

---

## 12. Qué se podría mejorar

- **improvements.heading**: "Qué se podría mejorar" / "What could be improved"
- **improvements.list[]**:

1. **(ES)** Fijar cobertura de código como gate: `@vitest/coverage-v8` está instalado pero la cobertura no corre en los verify — un umbral (ej. 80 % en los dominios core) evitaría regresiones silenciosas en engines.
   **(EN)** Enforce code coverage as a gate: `@vitest/coverage-v8` is installed but coverage never runs in verifies — a threshold (e.g. 80 % on core domains) would prevent silent engine regressions.
2. **(ES)** Ampliar E2E con sesión real: hoy las rutas que exigen auth/plan (dashboard, multi-page PRO) se saltan en CI por falta de credenciales; faltan flujos de share links y límites de plan con sesión de test (mocks de GitHub OAuth o cookie de sesión).
   **(EN)** Expand E2E with a real session: routes gated by auth/plan (dashboard, multi-page) currently skip in CI for lack of credentials; share-link flows and plan-limit enforcement still need test-session coverage (GitHub OAuth mocks or a session cookie).
3. **(ES)** Re-medir performance con tooling vivo: Lighthouse se removió (sprint 20) porque quedó roto al sacar puppeteer; el report en vivo depende de la URL auditada (una URL lenta corre el LCP al tiempo del audit). Conviene Core Web Vitals reales + límite de tiempo/cola para audits pesados.
   **(EN)** Re-measure performance with live tooling: Lighthouse was removed (sprint 20) after puppeteer left; the live report's speed depends on the audited URL (a slow URL pushes LCP to the audit time). Real Core Web Vitals plus a time budget/queue for heavy audits would help.
4. **(ES)** i18n de toda la app, no solo del engine: la copy de UI está centralizada pero solo en español neutro y sin framework de i18n; los headings del landing en inglés conviven con cuerpos ES. Un i18n real (ES/EN) abriría el producto a más mercado y dejaría la detección de idioma del audit consistente con la UI.
   **(EN)** Full-app i18n, not just the engine: UI copy is centralized but Spanish-only with no i18n framework; English landing headings sit next to Spanish bodies. Real i18n (ES/EN) would widen the market and keep the audit's language detection consistent with the UI.

---

## 13. SEO / Meta

### ES

- **meta.title**: "Relevy | Ezequiel Fernández, Full Stack Developer"
- **meta.description**: "Case study de Relevy: un SaaS de auditoría GEO y SEO con Next.js, TypeScript y Prisma que mide tu visibilidad en buscadores con IA." _(~140 chars; keywords: auditoría GEO, SEO, visibilidad en IA, Next.js, case study)_
- **meta.keywords[]**: `["auditoría GEO", "SEO para IA", "visibilidad en buscadores con IA", "Next.js case study", "TypeScript", "Prisma", "micro-SaaS", "full stack developer"]`

### EN

- **meta.title**: "Relevy | Ezequiel Fernández, Full Stack Developer"
- **meta.description**: "Relevy case study: a GEO & SEO auditing SaaS built with Next.js, TypeScript and Prisma that measures AI search visibility." _(~128 chars — se alarga con las plataformas si el template lo permite: "…visibility across ChatGPT, Claude, Perplexity and Gemini."; keywords: GEO audit, AI search visibility, Next.js, TypeScript, SaaS)_
- **meta.keywords[]**: `["GEO audit", "AI search visibility", "generative engine optimization", "Next.js case study", "TypeScript", "Prisma", "SaaS", "full stack portfolio"]`

---

## 14. Textos misceláneos

- **deepDive.heading**: "Profundización técnica" / "Technical deep dive"
- **carousel.alt** (ES): "Vista previa de Relevy" — (EN): "Relevy preview"
- **labels.year**: "Año:" / "Year:"
- **labels.featured**: "Destacado" / "Featured"
- **notFound**: "Proyecto no encontrado" / "Project not found"
- **noPreview**: "Sin vista previa" / "No preview available"

---

## 15. Imágenes (screenshots)

**Estado actual: [NO DISPONIBLE]** — no existen screenshots commiteados del producto (`public/` solo tiene `icon.svg`, `og.png` y assets de la app). Se necesitan 4 imágenes mínimas, formato `.webp`, proporción 16:9, 1920×1080, nombres sugeridos por slug (`geo-saas-1.webp` … `geo-saas-4.webp`):

1. **geo-saas-1.webp** — Landing hero: input de URL + ScoreHero con el GEO Score real (71) y las bandas de severidad. Debe mostrar el score con evidencia real, no un mock.
2. **geo-saas-2.webp** — Reporte en vivo: score compuesto con desglose por las 6 dimensiones (citabilidad, E-E-A-T, técnico, schema, plataforma, marca), barras de severidad y findings priorizados.
3. **geo-saas-3.webp** — Dashboard (requiere sesión): historial de auditorías con score trend y share links — o, si no hay captura con sesión, el detalle de un audit persistido multi-página.
4. **geo-saas-4.webp** — Vista móvil: drawer de navegación abierto (el componente que protagonizó el bug SSR HYD-1) + un tramo del reporte responsive, para mostrar la UI en 360 px.

---

_Fin de la ficha. Respetar el orden y los nombres de campo para el mapeo 1:1 al repo del portfolio._
