# Tasks: Layout Core Pixel-Perfect Rebuild

## Phase 1: Foundations

- [x] 1.1 Define exact visual checklist from docs/redesignReferences for Header/Footer controls and layout hierarchy.
- [x] 1.2 Decide legacy strategy: keep current components in place or move previous implementations to src/components/old before rebuild.
- [x] 1.3 Freeze module 2 execution until module 1R acceptance criteria are met.

## Phase 2: Rebuild Implementation

- [x] 2.1 Rebuild Header from scratch (desktop + mobile behavior) based on reference structure and typography.
- [x] 2.2 Rebuild LanguageSwitcher and ThemeToggle from scratch, aligned with reference control design.
- [x] 2.3 Rebuild Footer from scratch for parity in spacing, typography, and legal/link layout.
- [x] 2.4 Rebuild MainLayout composition to ensure reference-consistent shell spacing and hierarchy.

## Phase 3: Verification

- [x] 3.1 Update/replace layout tests to validate rebuilt contracts (navigation, mobile drawer behavior, i18n/theme interactions).
- [x] 3.2 Validate pixel-perfect parity manually by breakpoint against references.
- [x] 3.3 Run lint + targeted tests and confirm coverage expectations for layout core.
