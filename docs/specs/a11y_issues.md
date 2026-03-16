# A11Y & QA Issues — Audit Report

Date: 2026-03-16

Summary: findings from Fase 5 smoke-check (keyboard, ARIA, tokens, contrast). Items that require logic changes or deeper review are listed as action items.

1) Hardcoded color values used in JS hook
- File: `src/hooks/useThemeColor.tsx`
- Issue: the hook returns hardcoded hex colors (`#0b1220` and `#ffffff`) instead of reading from the CSS theme tokens created in `src/index.css` (@theme). This ties the hook to color values and prevents centralized token updates.
- Why it's a logic change: updating the hook to read CSS variables would require JS behavior change (reading computed styles) — this may be considered logic-level change. ACTION: developer to replace hardcoded hexes with a token lookup (e.g., `getComputedStyle(document.documentElement).getPropertyValue('--color-bg')`) or expose theme tokens via a safe API.

2) Focus management that may require programmatic adjustments
- Files inspected: `src/components/layouts/Header.tsx` (mobile drawer), various modals/carousels.
- Finding: current implementation focuses the drawer via a timeout when opened (works, but can be fragile). If additional accessibility robustness is required (trap focus inside dialog), that is a logic change and must be handled separately.
- ACTION: Consider implementing an a11y focus trap utility if desired; this is flagged as a logic change and not applied here.

3) Tailwind utility reliance for `ring-primary`
- Files: `src/components/ProjectCard/ProjectCard.tsx` uses `focus-visible:ring focus-visible:ring-primary`.
- Finding: project relies on Tailwind's `ring-primary` utility. Because we intentionally avoided a `tailwind.config.js` for token injection, ensure your Tailwind build provides `ring-primary` (DaisyUI may map `--p` to `--color-primary`). If `ring-primary` is not available, the global `:focus-visible` outline in `src/index.css` will still show an outline, but check runtime visuals.
- ACTION: Verify in the built site the ring color matches `--color-primary`. If not, consider replacing Tailwind ring-utilities with a dedicated CSS selector using `:focus-visible` and `var(--color-primary)`.

4) Contrast check notes
- I replaced `color: #fff` in `.btn.btn-minimal.btn-primary` with `color: var(--color-on-primary)` and added the token in `@theme` to centralize contrast control.
- Recommendation: run a color contrast tool (or manual checks) for `--color-primary` vs `--color-on-primary` and `--color-muted` vs `--color-bg` to confirm WCAG AA/AAA as needed. Current palette appears to meet AA for body text, but CTA contrast should be verified across light/dark tokens.

5) Token consistency
- Most styles read from `@theme` tokens in `src/index.css`. A few internal CSS rules still use rem values for spacing (intentional) and local paddings; these are acceptable when using rem derived from base tokens, but avoid ad-hoc pixel values in component CSS.

6) Images and alt attributes
- Observed: images across pages include descriptive `alt` attributes (often via i18n). Good.

7) ARIA usage
- Header drawer uses `role="dialog"`, `aria-modal`, `aria-controls`, and `aria-expanded` appropriately. Good.
- ProjectCard and social buttons include descriptive `aria-label`s; some decorative SVGs have `aria-hidden` — good.

- Next steps / remediation plan
- Low-effort (applied): centralized `--color-on-primary` token and applied it to primary button text.
- Low-effort (applied): Added explicit :focus-visible CSS selectors using `--color-accent` for interactive elements in `src/index.css`.
- Medium-effort (applied): Updated `src/hooks/useThemeColor.tsx` to read `--color-bg` from computed styles and fall back to previous values; this removes the hardcoded color usage.
- Medium-effort (requires runtime verification): ensure `ring-primary` utility maps visually to `--color-primary`. If not, replace with CSS :focus-visible rules that use `var(--color-primary)`.
- Logic-change tasks (documented): update `useThemeColor.tsx` to avoid hardcoded hex colors; optional: implement focus trap in drawer.

If you want, I can:
- Open a PR with these changes and the `a11y_issues.md` file included.
- Make the runtime CSS replacement for `ring-primary` selectors to guaranteed :focus-visible rules (visual-only CSS change) — I can implement that now.
- Run the test suite to surface any selectors relying on text sizes that changed.

End of report.
