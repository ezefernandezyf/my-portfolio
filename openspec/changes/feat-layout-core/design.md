# Design: Layout Core Shell

## Technical Approach

This change is a styling-first refactor of the shared layout shell. The implementation should keep the current React composition intact: `MainLayout` continues to render `Header`, a single `main` region with the routed outlet, and `Footer`. The work is primarily inside the header/footer shell markup, responsive Tailwind/DaisyUI classes, and the existing interaction hooks for language and theme.

The reference HTML shows a compact, fixed header with a branded left anchor, a desktop nav, and a right-aligned control cluster. The current app already has the same primitives, so the refactor should tighten spacing, visibility rules, and state handling rather than introduce new layout abstractions. The mobile drawer stays, because the spec requires drawer interaction, but it should be simplified to a minimal slide-over: nav links plus essential actions, not a second full desktop shell.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Shell ownership | Keep `Header` stateful and localize drawer state there | Move drawer state to context or route state | Drawer state is purely presentational and does not need global ownership; local state keeps the change small and predictable. |
| Navigation pattern | Preserve desktop nav + mobile drawer split | Replace drawer with inline mobile accordion | The spec still requires open/close behavior, Escape handling, backdrop click, and body scroll lock; the drawer already satisfies that contract. |
| Control cluster | Keep a compact control cluster for language, theme, and social/CV actions | Split controls across the header and drawer | The reference groups these actions together, and the current components already expose them as small, reusable controls. |
| i18n/theme contracts | Keep the existing `LanguageSwitcher` and `ThemeToggle` contracts | Create new layout-specific controls | `LanguageSwitcher` already updates `i18n.language` and `document.documentElement.lang`; `ThemeToggle` already reads from `ThemeContext`. Reusing them avoids duplicating state logic. |
| Layout composition | Keep `MainLayout` as a pure shell wrapper | Introduce a layout controller or nested shell components | The current `Outlet`-based routing is already clean; only spacing and semantic structure need refinement. |

## Data Flow

The shell has two independent interaction paths:

    ThemeProvider ──→ ThemeContext ──→ ThemeToggle ──→ useTheme()
         │                               │
         │                               └─ toggles resolved theme, updates <html> class/data-theme
         └─ applies theme to document root

    i18n instance ──→ LanguageSwitcher ──→ i18n.changeLanguage(lng)
                             │
                             └─ updates document.documentElement.lang on success

    Header open state ──→ mobile drawer/backdrop/escape handlers ──→ body scroll lock
                              │
                              └─ closing also happens on nav link activation

`MainLayout` stays passive: it renders the shell around routed content and does not participate in theme or language state.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/components/layouts/Header.tsx` | Modify | Rework responsive structure, tighten header spacing, keep drawer behavior, and align control placement with the reference. |
| `src/components/layouts/Footer.tsx` | Modify | Simplify footer styling while preserving copyright year and privacy link. |
| `src/components/layouts/MainLayout.tsx` | Modify | Keep shell order and main semantics; adjust spacing/background to match the reference. |
| `src/components/LanguageSwitcher/LanguageSwitcher.tsx` | Modify | Preserve ES/EN toggle contract, refine visual treatment and active state. |
| `src/components/ThemeToggle/ThemeToggle.tsx` | Modify | Keep context-driven toggle behavior, refine title/label treatment if needed for shell consistency. |
| `src/context/ThemeContext.ts` / `src/hooks/useTheme.ts` | Modify only if needed | No behavioral change expected; only adjust if the shell needs a clearer resolved-theme contract. |
| `src/i18n.ts` and `src/locales/{en,es}/header.json` / `footer.json` | Modify only if copy alignment is needed | Keep namespaces intact; only update labels if the shell copy needs to match the reference more closely. |
| `src/components/tests/Header.test.tsx` | Modify | Verify drawer dismissal paths, responsive state, and active nav behavior against the existing contract. |
| `src/components/tests/Footer.test.tsx` | Modify | Verify current year and privacy link remain present. |
| `src/components/tests/LanguageSwitcher.test.tsx` | Modify | Verify exactly two choices, active state, and locale updates. |
| `src/components/tests/MainLayout.test.tsx` | Modify | Verify header/main/footer order and `role="main"`. |

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Drawer state, language toggle, theme toggle, footer copy | Extend the existing component tests with user-event flows and assertions on aria state, body scroll, and locale/root updates. |
| Integration | Shell composition and provider wiring | Render `MainLayout` inside `ThemeProvider` and `MemoryRouter`, then assert banner/main/contentinfo order and routed content rendering. |
| Regression | Spec scenarios | Map each Given/When/Then scenario from the UI spec to one or more test cases, especially mobile drawer dismissal and language/theme state contracts. |

## Migration / Rollout

No migration required. This is a UI shell refactor with no route, data, or storage schema change.

## Open Questions

None. The reference and spec are sufficient to keep the implementation within the current component model.
