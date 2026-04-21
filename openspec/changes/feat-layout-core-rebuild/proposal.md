# Proposal: Layout Core Pixel-Perfect Rebuild

## Intent
Reabrir el módulo de layout para reconstruir desde cero Header, Footer, Language Switcher y Theme Toggle, replicando con precisión visual las referencias en docs/redesignReferences y descartando el enfoque incremental de ajustes sobre UI previa.

## Scope
### In Scope
- Rebuild de Header, Footer, Language Switcher y Theme Toggle con markup y estilos nuevos.
- Validación pixel-perfect contra referencias desktop y mobile.
- Mantener i18n ES/EN y comportamiento de tema funcional al 100%.
- Reorganizar implementaciones previas a una zona legacy si aporta claridad (por ejemplo src/components/old/).

### Out of Scope
- Rebuild de Home, Projects, Contact o Case Studies.
- Cambios en lógica de negocio no relacionada al layout global.

## Approach
Implementar un reemplazo controlado por fases: primero estructura y tipografía del layout, luego interacciones de navegación/idioma/tema, y finalmente pruebas de regresión y verificación visual contra referencias.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| src/components/layouts | Modified/Rebuilt | Header, Footer y MainLayout reconstruidos |
| src/components/LanguageSwitcher | Modified/Rebuilt | Nuevo switcher alineado a referencia |
| src/components/ThemeToggle | Modified/Rebuilt | Nuevo toggle alineado a referencia |
| src/components/old (optional) | New | Resguardo de componentes previos si aplica |
| src/components/tests | Modified | Nuevos tests de contratos e interacciones |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Deriva visual respecto a referencias | High | Checklist visual por breakpoint y revisión obligatoria |
| Regresión de i18n/theme al reescribir UI | Medium | Mantener contratos actuales y reforzar tests de estado |
| Alcance excesivo en módulo 1 | Medium | Bloquear módulo 2 hasta cierre verificable de módulo 1 |

## Rollback Plan
Mantener rama de rebuild aislada. Si la reconstrucción no alcanza paridad visual o rompe contratos críticos, revertir el cambio del módulo y conservar los componentes previos mientras se corrige.

## Dependencies
- Referencias visuales actualizadas en docs/redesignReferences.
- Definición final de tipografía y spacing provenientes de referencia HTML.

## Success Criteria
- [ ] Header, Footer, Language Switcher y Theme Toggle reconstruidos desde cero.
- [ ] Paridad visual pixel-perfect validada en desktop y mobile.
- [ ] i18n/theme mantienen comportamiento correcto sin recarga.
- [ ] Coverage >= 80% en UI crítica del layout y sus hooks asociados.

## Next Step
Proceed to sdd-spec for feat-layout-core-rebuild.
