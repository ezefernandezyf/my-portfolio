# Portfolio Redesign - Workspace Instructions

Este proyecto emplea un flujo estricto de **Spec-Driven Development (SDD)**. El sistema (Agente IA) debe comportarse como un **Lead Software Architect y Pair Senior**, asegurando que toda decisión técnica, de diseño y arquitectónica se documente *antes* de escribir el código. La ejecución debe respetar a rajatabla la arquitectura definida.

## 1. Identidad y Contexto del Producto
- **Objetivo:** Rediseño completo y desde cero del portafolio web para un Front-end Developer. La plataforma debe ser una extensión de su capacidad técnica: interfaces limpias, altamente accesibles y optimizadas.
- **Enfoque de Trabajo:** NO se va a reciclar ni adaptar código de las vistas antiguas. Se construirá una nueva interfaz tomando como única fuente de verdad los archivos estáticos ubicados en docs/redesignReferences/.

### Regla de Rebuild UI (No Negociable)
- El rediseño debe ser un **rebuild visual completo** y no un "reskin" sobre componentes existentes.
- Queda prohibido considerar "cumplido" un módulo por ajustar colores, spacing o clases sobre la UI previa.
- Si un componente actual no replica fielmente la referencia (estructura, tipografía, jerarquía, layout y estados), se debe **reconstruir**.
- Se permite mover implementaciones previas a una zona de legado (por ejemplo `src/components/old/`) cuando ayude a mantener claridad durante el rebuild.
- El criterio de aceptación principal es **pixel-perfect contra referencias** en `docs/redesignReferences/`.

### Estrategia de Legacy para esta rama
- Mantener los componentes legacy en su ubicación actual mientras la fase 2 no requiera moverlos.
- No introducir `src/components/old/` por inercia: solo se moverán piezas si estorban la lectura del rebuild o si una futura fase necesita aislar explícitamente el código previo.
- La rama `feat/layout-core-rebuild` debe exponer como fuente de verdad los componentes reconstruidos, no los incrementales.

## 2. Stack Tecnológico y Arquitectura Core
El stack no se negocia. Buscamos demostrar ingeniería y eficiencia:
- **Frontend:** React + TypeScript.
- **Arquitectura:** "Screaming Architecture" o "Feature-based" (Ej: features/, core/, shared/, ui/). Los componentes UI deben estar estrictamente desacoplados de la lógica.
- **Estilos y Animaciones:** CSS/Tailwind (según corresponda el setup actual) + framer-motion para transiciones fluidas, físicas y profesionales (staggers, fade-ins, microinteracciones).
- **Regla de Motion Transversal:** Si una animación mejora lectura, jerarquía o percepción de calidad sin traicionar la referencia, debe aplicarse de forma consistente en todas las páginas nuevas del módulo; evitar efectos aislados que aparezcan solo en una pantalla.
- **Internacionalización (Crítico):** El sistema i18n actual (Dualidad ES/EN) se debe mantener funcional al 100% en todos los componentes nuevos.
- **Adaptación de Datos:** Los placeholders de los HTML (ej. "JWT Architecture" o fotos genéricas) deben ser reemplazados por los datos reales del desarrollador. **Regla:** Ante la duda de qué contenido insertar, el Agente debe detenerse y preguntar. No inventar datos.

## 3. Quality, Testing & CI/CD (Hard Requirements)
- **Test Coverage:** Meta innegociable del **80% de coverage** en lógica de negocio, hooks personalizados, mappers y componentes críticos de UI. Se prioriza calidad de aserciones sobre cantidad de tests vacíos.
- **CI/CD:** Se debe configurar un pipeline de Integración Continua (ej. GitHub Actions) que corra linters, type-checking y tests en cada push/PR, más un deployment automatizado (Vercel/Netlify).
- **Performance:** El código resultante debe apuntar a un score de **95+ en Lighthouse** (Performance, Accesibilidad, Best Practices).

## 4. The Precision Instrument (Design System)
- **Pixel-Perfect:** Los archivos HTML en docs/redesignReferences/ son la ley visual. El padding, la tipografía, los pesos visuales y la disposición deben clonarse con precisión milimétrica.
- **Responsividad:** 100% responsive design asumiendo un enfoque "Mobile First" pero garantizando excelencia en Desktop.
- **Restricciones:** Prohibida la sobreingeniería visual. Si el HTML no tiene un gradiente complejo, el componente de React tampoco debe tenerlo.
- **Criterio de Implementación:** Si hay divergencia visual entre componente actual y referencia, se prioriza rehacer el componente antes que iterar micro-ajustes.

### Antes de cada módulo (obligatorio)
- Leer la referencia HTML correspondiente antes de tocar código.
- Comparar el componente actual contra la referencia y nombrar la diferencia concreta en estructura, jerarquía, tipografía, spacing y estados.
- Formular una sola hipótesis falsable y una comprobación barata que la pueda refutar.
- Si el resultado visual no es igual, igual, igual, igual a la referencia, el módulo no se considera terminado.
- Si la referencia cambia, se rehace el bloque afectado; no se intenta mejorar con criterio propio.
- No cerrar un módulo por aproximación: el criterio sigue siendo pixel-perfect contra `docs/redesignReferences/`.

## 5. El Flujo de Trabajo (SDD Protocol)
La ejecución DEBE orquestarse con SDD integrando las herramientas de memoria (engram, openspec). Fases obligatorias antes de modificar el código estructural:
1. sdd-init / sdd-explore - Paneo del repo (revisar carpeta /skills, dependencias).
2. sdd-propose - Plan de acción y arquitectura por feature.
3. sdd-spec & sdd-design - Definir interfaces, props y estructura de componentes.
4. sdd-tasks - Checklist técnico accionable.
5. sdd-apply - Implementación en código (Acá se codea, NO antes).
6. sdd-verify - Comprobación contra el HTML de referencia y tests.

## 6. Flujo de Git y Organización
- **Branches por Feature:** Una rama nueva y aislada por cada módulo (ej. feat/hero-section, feat/bento-grid).
- **Commits Convencionales (Strict):** Título en Inglés, Descripción en Español.
  *Ejemplo:* feat(projects): implement bento grid with framer-motion \n\n Se maquetó la grilla de proyectos adaptando el contenido real y asegurando el soporte i18n.
- **Push Constante:** Sincronizar el repositorio remoto al finalizar unidades lógicas.

## 7. Responsabilidades Clínicas
- El Agente no debe hacer suposiciones de negocio. Si falta un asset (una foto, un texto), se pide por prompt.
- El uso de las herramientas de memoria contextual (context7, engram, openspec) es obligatorio para no perder el hilo entre sesiones.

## 8. Skills y Estructura Base
### Estructura del Proyecto
- \coverage/\: Reportes de coverage (Vitest).
- \docs/redesignReferences/\: Archivos estáticos HTML (referencias visuales únicas para el rediseño).
- \public/\: Assets estáticos publicables (robots.txt, sitemap, etc).
- \skills/\: Skills disponibles para el agente IA orientadas al stack del proyecto.
- \src/\: Directorio raíz principal de la lógica de React.
  - \src/components/\: Componentes encapsulados como Buttons, Layouts, ProjectCard, etc.
  - \src/context/\: Proveedores de Contexto (ThemeContext).
  - \src/data/\: Repositorios estáticos (about.ts, projects.ts).
  - \src/hooks/\: React custom hooks (e.g. useTheme).
  - \src/locales/\: Configuración multi-idioma de i18n (es/en).
  - \src/pages/\: Layouts a nivel de routing (Home, Contact, About, Projects).
  - \src/routes/\: Enrutadores e integraciones base como AppRouter.

### Skills Disponibles
Los siguientes skills se encuentran dentro del proyecto en la carpeta \skills/\ y definen las convenciones de generación de código:
- **react-19**: Instrucciones y guías técnicas para trabajar con las APIs de React 19.
- **tailwind-4**: Reglas de estilos de utilidad, custom themes, y optimizaciones de Tailwind 4.
- **typescript**: Reglas strict de tipado, interfaces, patterns y safety checks.
- **zod-4**: Parseo estricto e inferencia de Types para validaciones en schemas de objetos.

## 9. Mapa de Módulos (Roadmap)
Para garantizar una entrega iterativa y controlada, el rediseño se ejecutará en las siguientes fases secuenciales. No se avanzará de fase sin cumplir los criterios de validación.

- **Fase 0: Foundations & Setup Strict**
  - **Objetivo:** Configuración de Vitest para el 80% de coverage, setup de CI/CD (GitHub Actions), y revisión de Contextos core (Tema e i18n).
  - **Validación:** Pipeline automatizado en verde, linters pasando sin warnings, y configuración base de Tailwind 4 testeada.

- **Fase 1R: Global Layout & Navigation Rebuild (`feat/layout-core-rebuild`)**
  - **Objetivo:** Reconstrucción desde cero de Header, Footer, Language Switcher y Theme Toggle con estructura y estilos fieles a la referencia, sin reusar markup visual previo.
  - **Validación:** Paridad pixel-perfect contra referencias, componentes 100% responsivos, i18n funcional sin recarga y coverage > 80% en hooks/UI críticos.
  - **Nota de Control:** Fase 2 queda bloqueada hasta cerrar Fase 1R.

- **Fase 2: Home Page & Bento Grid (`feat/home-page`)**
  - **Objetivo:** Maquetación del Hero Section y la grilla 2-col de proyectos utilizando los datos reales. Integración inicial de `framer-motion` para fade-ins y staggers.
  - **Validación:** Animaciones a 60fps sin bloqueos de performance. Lighthouse score > 95. Inyección correcta de la data real.
  - **Estado:** En pausa hasta completar Fase 1R.

- **Fase 3: Projects Directory (`feat/projects-directory`)**
  - **Objetivo:** Página de portfolio, barra de búsqueda y filtros por tecnologías (tagging).
  - **Validación:** Lógica de filtrado cubierta por tests unitarios (Zod/Tipados estrictos). Persistencia de estado de búsqueda al cambiar idioma.

- **Fase 4: Case Studies Template (`feat/case-studies`)**
  - **Objetivo:** Reemplazar los 3 componentes de 600 líneas por un único `CaseStudyTemplate` dinámico (Screaming Architecture).
  - **Validación:** El componente puede renderizar cualquier case study desde un origen de datos tipado sin modificar su UI. 

- **Fase 5: About Me Page (`feat/about-page`)**
  - **Objetivo:** Reconstrucción completa de la página About Me tomando `docs/redesignReferences/aboutmeReference.html` como única fuente de verdad, con paridad pixel-perfect en hero, stack, habilidades blandas, educación y footer/CTA si aplica.
  - **Validación:** Estructura, tipografía, jerarquía, iconografía, spacing y estados iguales a la referencia; animaciones fluidas con `framer-motion` cuando el HTML lo sugiera y, si el resultado mejora, extender la misma lógica a páginas hermanas del módulo; contenido ES/EN consistente; accesibilidad WCAG 2.1 AA.
  - **Nota de Control:** Si un bloque no está claro o falta contenido real del desarrollador, se detiene y se pregunta antes de inventar datos.

- **Fase 6: Contact & Final Polish (`feat/contact-polish`)**
  - **Objetivo:** Formulario de contacto validado con `zod-4`, layout lado a lado, y revisión final de accesibilidad.
  - **Validación:** End-to-end testeado, 0 violaciones de accesibilidad, despliegue final en staging aprobado.
