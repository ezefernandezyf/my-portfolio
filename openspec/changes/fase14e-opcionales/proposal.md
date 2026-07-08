# Proposal: Fase 14e — Optional Polish & Performance

## Intent

Apply 8 low-impact performance, accessibility, and security improvements from the 360° audit. All fixes use native browser APIs only — no new dependencies.

## Scope

### In Scope
- ScrollProgress: `useRef` + direct DOM instead of `useState` (stops per-frame re-renders)
- HomePage mouse-follow gradient: `useRef` + direct style update instead of `useState`
- ProjectCarousel: pause autoplay on hidden tab via `document.hidden` + `visibilitychange`
- Carousel alt text: descriptive content for all 6 case studies (ES+EN, 12 files)
- NotFound meta descriptions: expand to 120+ chars (ES+EN)
- LCP `fetchpriority="high"`: profile photo in AboutPage
- CSP: add `object-src 'none'` in vercel.json
- CI: add `pnpm audit` step (non-blocking)

### Out of Scope
- Installing framer-motion or any new dependency
- Spec-level or functional changes

## Capabilities

### New Capabilities
None

### Modified Capabilities
None

## Approach

Native APIs only: `useRef` for DOM writes (no React re-renders), `visibilitychange` for tab detection. All changes are isolated — one source file per fix, except locale files which follow existing i18n patterns. Estimated total: 80-90 changed lines across 19 files.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/ScrollProgress/ScrollProgress.tsx` | Modified | useRef + direct style instead of useState |
| `src/pages/HomePage.tsx` | Modified | useRef for mouse gradient div |
| `src/components/ProjectCarousel/ProjectCarousel.tsx` | Modified | visibilitychange pause/resume |
| `src/locales/{es,en}/*casestudy.json` | Modified | Descriptive carousel alt (12 files) |
| `src/locales/{es,en}/notfoundpage.json` | Modified | Longer meta descriptions |
| `src/pages/AboutPage.tsx` | Modified | fetchpriority on profile photo |
| `vercel.json` | Modified | object-src 'none' in CSP |
| `.github/workflows/ci.yml` | Modified | pnpm audit step |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| useRef changes incompatible with SSR | Low | Components already guard with `typeof window` checks |
| visibilitychange listener not cleaned up | Low | Standard useEffect cleanup pattern |
| `pnpm audit` finds vulnerabilities | Low | Non-blocking step (`continue-on-error: true`) |

## Rollback Plan

Revert individual files via `git checkout`. All changes are additive or single-line swaps. No migrations.

## Dependencies

None. Zero new packages.

## Success Criteria

- [ ] ScrollProgress no longer re-renders on scroll (React DevTools profiler)
- [ ] Mouse gradient no longer re-renders on pointer move
- [ ] Carousel pauses when tab hidden, resumes when visible
- [ ] Carousel alt text describes actual content, not just project name
- [ ] NotFound meta descriptions ≥ 120 chars (ES+EN)
- [ ] LCP image has `fetchpriority="high"`
- [ ] CSP header includes `object-src 'none'`
- [ ] CI includes `pnpm audit` (non-blocking)
- [ ] All existing tests pass (`pnpm test`)
