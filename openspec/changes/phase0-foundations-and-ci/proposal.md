# Proposal: Phase 0 Foundations and CI

## Intent
Establecer la base operativa del rediseño antes de tocar features visuales. El objetivo es cerrar la brecha crítica de calidad: automatización de CI/CD, validación de lint/type-check/tests, y cobertura mínima exigida para sostener el resto del roadmap.

## Scope
### In Scope
- Crear workflow de GitHub Actions para lint, type-check y tests con coverage.
- Definir umbral de coverage mínimo del 80% para el pipeline.
- Validar setup actual de Vitest, Testing Library e i18n mocks.
- Documentar el flujo de verificación en el repo.

### Out of Scope
- Rediseño visual de páginas.
- Refactor de componentes de layout o contenido.
- Migración de case studies a template genérico.

## Approach
Implementar primero la infraestructura de calidad y luego usarla como gate para todas las fases siguientes. El workflow debe fallar ante errores de lint, type-check o coverage insuficiente. La configuración existente de tests e i18n se conservará y se validará sin reescrituras innecesarias.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `.github/workflows/ci.yml` | New | Pipeline de validación continua |
| `vitest.config.ts` | Modified | Cobertura y umbrales |
| `package.json` | Modified | Scripts de verificación si faltan |
| `src/setupTests.ts` | Reviewed | Mocks y entorno de testing |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Coverage bajo 80% | High | Añadir tests focalizados antes de merge |
| Falsos negativos en CI | Medium | Validar el workflow localmente antes de habilitarlo |
| Ruptura de i18n en tests | Low | Mantener mocks existentes y cubrir namespaces |

## Rollback Plan
Si el pipeline bloquea merges por configuración incorrecta, revertir el workflow y el umbral de coverage, manteniendo intacto el código de producción. Cualquier cambio en scripts o Vitest debe ser reversible sin tocar componentes funcionales.

## Dependencies
- GitHub Actions disponible en el repo remoto.
- Base actual de Vitest, Testing Library e i18n ya presente.

## Success Criteria
- [ ] Lint, type-check y tests corren en CI.
- [ ] Coverage mínimo del 80% se valida automáticamente.
- [ ] El workflow falla ante errores reales y pasa en el estado actual esperado.
- [ ] No se rompe la ejecución local de tests ni el soporte i18n.
