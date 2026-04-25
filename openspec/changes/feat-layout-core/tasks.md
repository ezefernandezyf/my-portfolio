# Tasks: Layout Core Shell

## Phase 1: Infrastructure / layout styling

- [x] 1.1 Update `src/index.css` and `src/components/layouts/MainLayout.tsx` to tighten shell spacing, page gutters, and vertical rhythm so the layout matches the reference on mobile and desktop.
- [x] 1.2 Normalize shared surface styling in `src/components/layouts/Header.tsx` and `src/components/layouts/Footer.tsx` so borders, blur, background, and stacking feel consistent across the shell.
- [x] 1.3 Review responsive utility classes in `src/components/layouts/Header.tsx` for nav, social actions, `LanguageSwitcher`, and `ThemeToggle` so the compact control cluster stays aligned at each breakpoint.

## Phase 2: Implementation

- [x] 2.1 Rework the desktop header markup in `src/components/layouts/Header.tsx` to preserve the existing routes while matching the reference order, spacing, and active-link treatment.
- [x] 2.2 Simplify the mobile drawer in `src/components/layouts/Header.tsx` so menu button, close button, Escape, backdrop click, and nav-link activation all close the drawer cleanly.
- [x] 2.3 Refine `src/components/LanguageSwitcher/LanguageSwitcher.tsx` and `src/components/ThemeToggle/ThemeToggle.tsx` so their active states, labels, and titles remain accessible in the compact header shell.
- [x] 2.4 Polish `src/components/layouts/Footer.tsx` and `src/components/layouts/MainLayout.tsx` so the footer copy, privacy link, and header/main/footer composition match the shell reference.

## Phase 3: Testing / verification

- [x] 3.1 Extend `src/components/tests/Header.test.tsx` for desktop nav visibility, drawer open/close flows, Escape, backdrop click, and link-triggered close behavior.
- [x] 3.2 Extend `src/components/tests/LanguageSwitcher.test.tsx`, `src/components/tests/ThemeToggle.test.tsx`, `src/components/tests/Footer.test.tsx`, and `src/components/tests/MainLayout.test.tsx` for aria state, `document.documentElement.lang`, current-year/legal link, and shell order.
- [ ] 3.3 Verify the change with `npm run check` and the targeted Vitest suites for layout-core before handing off to apply.