(**Resumen Técnico: Refactor UI — Estética: Minimalista (Bento ligero opcional)**)

Objetivo: modernizar la UI manteniendo la funcionalidad y la lógica existentes, priorizando una estética minimalista con la posibilidad de usar patrones tipo "bento" como acento visual sutil cuando aporte jerarquía (no obligatorio).

1. Alcance

- Páginas principales: Home, Projects, About, Contact. Ver: [src/pages/HomePage.tsx](src/pages/HomePage.tsx).
- Layouts: `Header`, `MainLayout`, `Footer`. Ver: [src/components/layouts/Header.tsx](src/components/layouts/Header.tsx), [src/components/layouts/MainLayout.tsx](src/components/layouts/MainLayout.tsx), [src/components/layouts/Footer.tsx](src/components/layouts/Footer.tsx).
- Componentes clave a refactorizar: `ProjectCard`, `ProjectCarousel`, `ThemeToggle`, `LanguageSwitcher`, `SocialButton`. Ver: [src/components/ProjectCard/ProjectCard.tsx](src/components/ProjectCard/ProjectCard.tsx), [src/components/ProjectCarousel/ProjectCarousel.tsx](src/components/ProjectCarousel/ProjectCarousel.tsx).

2. Principios de diseño

- Minimalismo: reducir ruido visual, usar una paleta limitada de colores y tipografías, mayor contraste en CTAs.
- Bento Grid (opcional y sutil): grid modular para casos puntuales donde una celda más grande aporte jerarquía; la configuración por defecto será una cuadrícula limpia y espaciada.
- Componentes atómicos: atomizar estilos (botones, chips, cards) y exponer variables/utility-classes de Tailwind.
- Accesibilidad: mantener foco visible, roles ARIA existentes y mejorar contraste y navegación por teclado.

3. Sistema visual y tokens (propuesta)

- Espaciado: base = 4px; escala: 4, 8, 12, 16, 20, 24, 32, 40, 48.
- Tipografía: 3 niveles (h1, h2, body). Ejemplo: h1 40/48, h2 28/36, body 16/24.
- Colores: palette reducida (background, surface, primary, accent, muted, base-content). Implementar como capas de Tailwind (`--tw-*` o plugin de theme).
- Bordes y elevación: cards con radio 8px, sombras sutiles en hover (usar `shadow-sm` / `shadow-lg` moderado).

4. Cambios por componente (impacto y notas)

- `Header` ([src/components/layouts/Header.tsx](src/components/layouts/Header.tsx))
  - Simplificar densidad: reducir altura en pantallas grandes, mantener drawer móvil. No cambiar comportamiento ni estado (no tocar la lógica de apertura/escape).
  - Visual: logo más discreto, menor uso de gradientes salvo en acento del logo.

- `MainLayout` ([src/components/layouts/MainLayout.tsx](src/components/layouts/MainLayout.tsx))
  - Introducir grid container utilizable por páginas (ej. `site-container` + clase `bento-grid`).
  - No modificar `Outlet` ni estructura de rutas.

- `Footer` ([src/components/layouts/Footer.tsx](src/components/layouts/Footer.tsx))
  - Reforzar lectura en pantallas pequeñas, convertir enlaces en elementos con suficiente hit-area.

- `ProjectCard` ([src/components/ProjectCard/ProjectCard.tsx](src/components/ProjectCard/ProjectCard.tsx))
  - Rejilla tipo bento: algunos cards ocuparán 2x filas/columnas según `featured` flag (sin tocar lógica; usar prop `featured` existente para estilos responsivos).
  - Optimizar imágenes: mantener `loading="lazy"` y asegurar `object-cover` (ya implementado).

- `ProjectCarousel` ([src/components/ProjectCarousel/ProjectCarousel.tsx](src/components/ProjectCarousel/ProjectCarousel.tsx))
  - Mejorar indicadores visuales y reducir contraste agresivo; mantener comportamiento de autoplay y controles (no tocar la lógica).

5. Reglas de no-invasión (cumplir AGENT.md)

- No modificar lógica de negocio ni estado (p. ej. hooks, handlers). Sólo cambios de estructura y estilos.
- No añadir dependencias nuevas sin autorización.

6. Accesibilidad y performance

- Mantener roles/aria existentes. Añadir labels claros donde falten y revisar contraste contra `bg-base-100`.
- Performance: priorizar imágenes optimizadas, mantener `loading="lazy"`. Evitar CSS-in-JS; usar utilidades Tailwind.

7. Estrategia de migración (fases)

- Fase 0 — Tokens y utilidades: definir variables Tailwind y tokens de color/espaciado; crear utilidades de layout para una cuadrícula minimalista. El `bento-grid` se añadirá como alternativa opcional a integrar solo si se decide usarlo en fases posteriores.
- Fase 1 — Atomos: refactor de botones, chips, badges, inputs como pequeñas utilidades y clases. Para el refactor de átomos, el agente debe cargar obligatoriamente docs/skills/frontend_expert.md
- Fase 2 — Moleculas: `ProjectCard`, `ProjectCarousel`, `SocialButton`, `ThemeToggle` (estilado solo).
- Fase 3 — Layouts y páginas: `Header`, `MainLayout`, `Footer`, `HomePage` y `ProjectsPage` adaptadas al bento-grid.
- Fase 4 — QA y accesibilidad: pruebas manuales y correcciones.

8. Riesgos e impactos

- Bajo riesgo en lógica: todos los cambios serán puramente presentacionales. Tests de integración existentes deberían seguir pasando.
- Posible trabajo adicional: ajustes en i18n strings o tamaños por traducciones largas.

9. Entregables

- `docs/specs/ui_plan.md` (este documento) — objetivos y plan.
- Tokens Tailwind y utilidades (archivo de configuración o snippet a integrar).
- Lista de componentes refactorizados con PRs y checklist de aceptación (a crear en la fase de implementación).

10. Estimación (persona/días aproximados)

- Total estimado: 9–13 días de trabajo (1 diseñador senior + 1 dev frontend para implementación rápida).

Próximo paso propuesto: confirmada prioridad minimalista — prepararé el desglose por tareas y PRs enfocado en una cuadrícula limpia y utilidades minimalistas; el `bento-grid` quedará como alternativa no intrusiva.

Referencias: Header, MainLayout, Footer, ProjectCard y ProjectCarousel inspeccionados para este análisis.

**Desglose por tareas y PRs (minimalista — enfoque incremental)**

Fase 0 — Tokens y utilidades (PR: `ui/tokens-and-utilities`)
- Tareas:
  - Añadir variables de espaciado, tipografía y paleta reducida en `tailwind.config.js` o snippet de integración.
  - Crear utilidades de layout: `container-min`, `site-container`, `grid-clean`.
- Checklist PR:
  - ✅ Configuración de tokens revisada.
  - ✅ Ejemplos de uso en `HomePage` y `ProjectCard`.

Fase 1 — Átomos (PR: `ui/atoms/buttons-chips-badges`)
- Tareas:
  - Definir clases utilitarias para `btn-minimal`, `chip`, `badge` con estados `hover/focus` accesibles.
  - Documentar variantes (primary, ghost, outline).
- Checklist PR:
  - ✅ Tokens usados para colores y espaciado.
  - ✅ Accesibilidad: focus-visible y contraste comprobado.

Fase 2 — Moléculas (PR: `ui/molecules-projects-and-controls`)
- Tareas:
  - `ProjectCard`: aplicar `card-minimal` y variantes `featured` (solo clases; no tocar lógica).
  - `ProjectCarousel`: actualizar indicadores y controles con las nuevas utilidades.
  - `SocialButton`, `ThemeToggle`, `LanguageSwitcher`: aplicar estilo minimal.
- Checklist PR:
  - ✅ No se cambia lógica ni props.
  - ✅ Imágenes mantienen `loading="lazy"`.

Fase 3 — Layouts (PR: `ui/layouts-clean`)
- Tareas:
  - `Header`: reducir densidad visual, mantener drawer y comportamiento ARIA.
  - `MainLayout`: aplicar `site-container` y `grid-clean` para páginas.
  - `Footer`: aumentar hit-area y legibilidad.
- Checklist PR:
  - ✅ Comportamiento igual (no modificar hooks/estado).
  - ✅ Revisión accesibilidad básica.

Fase 4 — Páginas y ajuste final (PR: `ui/pages-refactor`)
- Tareas:
  - Adaptar `HomePage` y `ProjectsPage` a la cuadrícula limpia.
  - Revisar textos largos y tamaños responsivos.
- Checklist PR:
  - ✅ Visual consistente con átomos y moléculas.
  - ✅ Pruebas manuales en tamaños comunes (mobile, tablet, desktop).

Fase 5 — QA y accesibilidad (PR: `ui/qa-accessibility`) — entrega final
- Tareas:
  - Revisión de foco, navegación por teclado, labels y roles ARIA.
  - Lighthouse básico: performance y accessibility smoke-check.
- Checklist PR:
  - ✅ Issues críticos resueltos.
  - ✅ Lista de ajustes menores para iteraciones futuras.

Notas de coordinación
- Cada PR irá con una descripción corta del impacto (visual-only) y checklist de aceptación.
- No se añaden dependencias externas; cualquier necesidad nueva será aprobada antes.
- Prioridad: aplicar tokens y átomos primero para minimizar cambios por rework.
