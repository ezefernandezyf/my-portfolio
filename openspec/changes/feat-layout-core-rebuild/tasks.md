# Tasks: Layout Core Pixel-Perfect Rebuild

## Phase 1: Foundations

- [ ] 1.1 Define exact visual checklist from docs/redesignReferences for Header/Footer controls and layout hierarchy.
- [ ] 1.2 Decide legacy strategy: keep current components in place or move previous implementations to src/components/old before rebuild.
- [ ] 1.3 Freeze module 2 execution until module 1R acceptance criteria are met.

## Phase 2: Rebuild Implementation

- [ ] 2.1 Rebuild Header from scratch (desktop + mobile behavior) based on reference structure and typography.
- [ ] 2.2 Rebuild LanguageSwitcher and ThemeToggle from scratch, aligned with reference control design.
- [ ] 2.3 Rebuild Footer from scratch for parity in spacing, typography, and legal/link layout.
- [ ] 2.4 Rebuild MainLayout composition to ensure reference-consistent shell spacing and hierarchy.

## Phase 3: Verification

- [ ] 3.1 Update/replace layout tests to validate rebuilt contracts (navigation, mobile drawer behavior, i18n/theme interactions).
- [ ] 3.2 Validate pixel-perfect parity manually by breakpoint against references.
- [ ] 3.3 Run lint + targeted tests and confirm coverage expectations for layout core.
