# Tasks: Fase 14b — Accessibility & UX Writing

## Review Workload Forecast

```
Decision needed before apply: No — under 400-line budget
Chained PRs recommended: No
400-line budget risk: Low (~168 estimated changed lines)
```

---

### 1. CSS Fixes

#### 1.1 `text-wrap: balance` on h1–h3

- [x] **File**: `src/index.css`
- **Change**: Add `h1, h2, h3 { text-wrap: balance; }` rule inside the `h1,h2,h3,h4,h5,h6` block (after line 137) or as a standalone rule
- **Done**: All headings render with balanced line wrapping
- **Verify**: Open any page with multi-line headings (HomePage, AboutPage, CaseStudy) — inspect computed styles for `text-wrap: balance`

#### 1.2 `text-muted` contrast in light mode

- [x] **File**: `src/index.css`, line 75
- **Change**: `--color-text-muted: #78716c;` → `--color-text-muted: #6b5e58;`
- **Done**: Light mode muted text reaches ≥4.5:1 contrast against `#faf7f0`
- **Verify**: DevTools contrast checker on any `.text-muted` or `text-text-muted` element in light mode

---

### 2. Focus Management

#### 2.1 Return focus to hamburger on drawer close

- [x] **File**: `src/components/layouts/Header.tsx`
- **Changes**:
  1. Add `hamburgerRef` with `useRef<HTMLButtonElement | null>(null)`
  2. Attach `ref={hamburgerRef}` to the hamburger `<button>` (line 128)
  3. In `close()` function: add `hamburgerRef.current?.focus();` before `setOpen(false)`
- **Done**: After closing the mobile drawer (via close button, link click, or Escape), focus returns to the hamburger button
- **Verify**: Open mobile drawer (narrow viewport), hit Escape — focus should be on the hamburger button. Tab should navigate forward normally.

---

### 3. i18n — Tooltips & Aria-labels

#### 3.1 ThemeToggle i18n

- [x] **File**: `src/components/ThemeToggle/ThemeToggle.tsx`
- **Changes**:
  1. Import `useTranslation` from `react-i18next`
  2. Add `const { t } = useTranslation('common');`
  3. Replace `aria-label="Alternar tema"` with `aria-label={t('theme.toggleAria', { current: resolvedTheme })}`
  4. Replace hardcoded Spanish `title` string with i18n-aware version using `t()`
  5. Add keys to `src/locales/{es,en}/common.json`:
     ```json
     "theme": {
       "toggleAria": "Cambiar tema (actual: {{current}})",
       "toggleTitle": "Tema: {{theme}}. Click para cambiar a {{target}}",
       "toggleTitleSystem": "Tema: system ({{resolved}}). Click para cambiar a {{target}}",
       "dark": "oscuro",
       "light": "claro"
     }
     ```
     (English equivalents for `en` locales)
- **Done**: Tooltip and aria-label change language when switching ES/EN
- **Verify**: Hover ThemeToggle in both languages, check title tooltip; inspect aria-label attribute

#### 3.2 LanguageSwitcher i18n

- [x] **File**: `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
- **Changes**:
  1. Already imports `useTranslation` — use `t()` from `header` or `common` namespace
  2. Replace `aria-label="Cambiar a español"` with `t('language.switchToEs')`
  3. Replace `aria-label="Switch to English"` with `t('language.switchToEn')`
  4. Add keys to `src/locales/{es,en}/header.json` (already has social/mobile sections):
     ```json
     "language": {
       "switchToEs": "Cambiar a español",
       "switchToEn": "Switch to English"
     }
     ```
     EN locale: `"switchToEs": "Switch to Spanish"`, `"switchToEn": "Switch to English"`
- **Done**: LanguageSwitcher aria-labels follow the active language
- **Verify**: Inspect aria-label on ES/EN buttons after language switch

#### 3.3 ProjectCarousel i18n

- [x] **File**: `src/components/ProjectCarousel/ProjectCarousel.tsx`
- **Changes**:
  1. Import `useTranslation` from `react-i18next`
  2. Add `const { t } = useTranslation('common');`
  3. Replace hardcoded live region text (line 94): use `t('carousel.slideInfo', { current: index + 1, total: images.length })`
  4. Replace `aria-label="Anterior"` with `t('carousel.previous')`
  5. Replace `aria-label="Siguiente"` with `t('carousel.next')`
  6. Replace `aria-label={`Ir a imagen ${i + 1}`}` with `t('carousel.goToSlide', { slide: i + 1 })`
  7. Add keys to `src/locales/{es,en}/common.json`
- **Done**: All carousel aria-labels and live region text respond to language
- **Verify**: Open a case study with carousel, switch language, check aria-labels via DevTools

---

### 4. i18n — Hardcoded UI Labels

#### 4.1 CaseStudyTemplate labels

- [x] **File**: `src/pages/Projects/CaseStudyTemplate.tsx`
- **Props interface**: Already has localized props (`featuredLabel`, `backLabel`, etc.) but NOT for these:
  - Line 164: `"Case Study"` (eyebrow text)
  - Line 218: `"Featured"` (aside label)
  - Line 296: `"The Engineering Stack"` (section heading)
- **Changes**:
  1. Import `useTranslation` and call with the relevant case study namespace (already available via parent)
  2. Replace hardcoded strings with localized values from the case study locale JSON
  3. Add keys to each of the 6 case study namespaces (`{es,en}/*casestudy.json`):
     ```json
     "labels": {
       "caseStudy": "Caso de estudio",
       "featured": "Destacado",
       "engineeringStack": "Stack de ingeniería"
     }
     ```
     EN: `"caseStudy": "Case Study"`, `"featured": "Featured"`, `"engineeringStack": "The Engineering Stack"`
- **Done**: Case study eyebrow, featured badge label, and stack heading follow language
- **Verify**: Open EchoLog case study in EN and ES — all three labels should change

#### 4.2 PrivacyPage eyebrow

- [x] **File**: `src/pages/PrivacyPage.tsx`, line 48
- **Changes**:
  1. Already uses `useTranslation('privacy')`
  2. Replace hardcoded `"Privacy & Trust"` with `{t('eyebrow')}`
  3. Add `"eyebrow": "Privacidad y Confianza"` to `src/locales/es/privacy.json`
  4. Add `"eyebrow": "Privacy & Trust"` to `src/locales/en/privacy.json`
- **Done**: PrivacyPage eyebrow follows language
- **Verify**: Check Privacy page in both languages

#### 4.3 ProjectsListPage counters

- [x] **File**: `src/features/projects/list/page/ProjectsListPage.tsx`, lines 122–123
- **Changes**:
  1. Already uses `useTranslation('projects')`
  2. Replace `{filteredProjects.length} projects` with `{t('counters.projects', { count: filteredProjects.length })}`
  3. Replace `{visibleItems.length} visible` with `{t('counters.visible', { count: visibleItems.length })}`
  4. Add keys to `src/locales/{es,en}/projects.json`
- **Done**: Counter labels follow language (e.g., "12 proyectos" / "12 projects")
- **Verify**: Open Projects page, check counter text in both languages

---

### 5. i18n — Education Descriptions

#### 5.1 Externalize AboutPage education descriptions

- [x] **File**: `src/pages/AboutPage.tsx`, lines 296–303
- **Changes**:
  1. Replace ternary chain with `{t(`education.${index}.description`)}`
  2. Add `"description"` keys to each education entry in both locale files:
     - `aboutpage.json` ES:
       ```json
       "education": {
         "0": { "description": "Formación integral en desarrollo de software, arquitectura de sistemas y metodologías de trabajo para construir productos consistentes." },
         "1": { "description": "Certificación enfocada en seguridad, control de acceso y prácticas de hardening aplicadas a productos web modernos." },
         "2": { "description": "Formación intensiva en modelos generativos, flujo de entrega y criterios para llevar experimentos de IA a producción." },
         "3": { "description": "Participación en el evento global de Microsoft sobre IA generativa, agentes y Copilot. Badge verificado en Credly." }
       }
       ```
     - EN equivalents translated
- **Done**: Education descriptions follow language
- **Verify**: Open About page, check education card descriptions in both languages

---

### 6. MetaTags Fallback

#### 6.1 Language-aware DEFAULT_DESC

- [x] **File**: `src/components/MetaTags/MetaTags.tsx`, lines 14–15
- **Changes**:
  1. Import `useTranslation` — but MetaTags runs inside React so it can use i18n context
  2. Replace static `DEFAULT_DESC` with i18n lookup:
  ```typescript
  const { i18n } = useTranslation();
  const DEFAULT_DESC = i18n.language?.startsWith('en')
    ? 'Full Stack Developer specialized in React, TypeScript, and Node.js. I build modern, optimized, and accessible web applications.'
    : 'Full Stack Developer especializado en React, TypeScript y Node.js. Construyo aplicaciones web modernas, optimizadas y accesibles.';
  ```
  (This is a fallback — pages already provide `description` prop, so it only fires when missing.)
- **Done**: English visitors see English fallback description
- **Verify**: Temporarily remove `description` prop from HomePage MetaTags, check rendered meta description in both languages

---

### 7. useThemeColor CSS Variable

#### 7.1 Fix variable name

- [x] **File**: `src/hooks/useThemeColor.tsx`, line 31
- **Changes**:
  1. Change `getPropertyValue('--color-bg')` → `getPropertyValue('--color-bg-primary')`
  2. Update fallback colors (lines 38–39) to match design tokens:
     - Dark: `#0a0a0f` (was `#0b1220`)
     - Light: `#faf7f0` (was `#ffffff`)
- **Done**: `theme-color` meta tag uses correct background color in both modes
- **Verify**: Inspect `<meta name="theme-color">` in DevTools head section in both dark and light modes; verify value matches `--color-bg-primary`

---

### 8. Empty State — Project Search

#### 8.1 No-results message

- [x] **File**: `src/features/projects/list/page/ProjectsListPage.tsx`, after line 145 (end of grid div)
- **Changes**:
  1. After the grid render, add conditional:
  ```tsx
  {
    filteredProjects.length === 0 && (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-text-secondary">{t('emptyState.noResults')}</p>
        <p className="mt-2 text-sm text-text-muted">{t('emptyState.noResultsHint')}</p>
      </div>
    );
  }
  ```
  2. Add keys to `src/locales/{es,en}/projects.json`:
     ES: `"emptyState": { "noResults": "No se encontraron proyectos", "noResultsHint": "Intentá con otros términos de búsqueda." }`
     EN: `"emptyState": { "noResults": "No projects found", "noResultsHint": "Try different search terms." }`
- **Done**: Empty search shows localized message instead of blank grid
- **Verify**: Search for "zzzzz" in Projects page — see the empty state message in current language

---

### 9. Verification

#### 9.1 Global checks

- [x] **Command**: `pnpm run lint` — zero errors
- [x] **Command**: `pnpm run build` — zero errors, 24 pages prerendered
- [x] **Command**: `pnpm test` — 29/29 test files, 87/87 tests pass

#### 9.2 Manual QA

- [ ] Switch ES ↔ EN on every affected page; verify labels, tooltips, aria-labels change
- [ ] Verify contrast in light mode with DevTools contrast checker
- [ ] Test mobile drawer focus return (keyboard-only navigation)
- [ ] Test project search empty state
- [ ] Inspect `<meta name="theme-color">` in both modes

---

## File Manifest

| File                                                   | Action          | Est Δ |
| ------------------------------------------------------ | --------------- | ----- |
| `src/index.css`                                        | Edit (2 places) | +4    |
| `src/components/layouts/Header.tsx`                    | Edit            | +6    |
| `src/components/ThemeToggle/ThemeToggle.tsx`           | Edit            | +15   |
| `src/components/LanguageSwitcher/LanguageSwitcher.tsx` | Edit            | +6    |
| `src/components/ProjectCarousel/ProjectCarousel.tsx`   | Edit            | +12   |
| `src/pages/Projects/CaseStudyTemplate.tsx`             | Edit            | +8    |
| `src/pages/PrivacyPage.tsx`                            | Edit            | +2    |
| `src/features/projects/list/page/ProjectsListPage.tsx` | Edit            | +14   |
| `src/pages/AboutPage.tsx`                              | Edit            | +2    |
| `src/components/MetaTags/MetaTags.tsx`                 | Edit            | +8    |
| `src/hooks/useThemeColor.tsx`                          | Edit            | +3    |
| `src/locales/es/common.json`                           | Edit            | +12   |
| `src/locales/en/common.json`                           | Edit            | +12   |
| `src/locales/es/aboutpage.json`                        | Edit            | +4    |
| `src/locales/en/aboutpage.json`                        | Edit            | +4    |
| `src/locales/es/projects.json`                         | Edit            | +6    |
| `src/locales/en/projects.json`                         | Edit            | +6    |
| `src/locales/es/privacy.json`                          | Edit            | +1    |
| `src/locales/en/privacy.json`                          | Edit            | +1    |
| `src/locales/{es,en}/echologcasestudy.json`            | Edit each       | +6    |
| `src/locales/{es,en}/cinelabcasestudy.json`            | Edit each       | +6    |
| `src/locales/{es,en}/moviedashboardcasestudy.json`     | Edit each       | +6    |
| `src/locales/{es,en}/chefcitoiacasestudy.json`         | Edit each       | +6    |
| `src/locales/{es,en}/nexustalentcasestudy.json`        | Edit each       | +6    |
| `src/locales/{es,en}/geoseoopencodecasestudy.json`     | Edit each       | +6    |
| `src/locales/es/header.json`                           | Edit            | +4    |
| `src/locales/en/header.json`                           | Edit            | +4    |

**Estimated total: ~170 lines changed. Risk: Low.**
