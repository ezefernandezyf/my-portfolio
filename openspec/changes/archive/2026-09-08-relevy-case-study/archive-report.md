# Archive Report — relevy-case-study

## Closure Summary

Change **`relevy-case-study`** fully implemented, verified, and archived. The SDD cycle is complete. Delivery (PR creation) is handled by the orchestrator after archive — this report documents final state, not delivery.

## Final State Authority

Per the Final-State Authority hierarchy, the launch prompt (most recent account) outranks intermediate snapshots (`verify-report`, `apply-progress`). Final state facts below reflect the change AT CLOSE.

- **Implementation**: complete and committed on `feat/relevy-case-study` (11 commits over develop). Relevy = project id `geo-saas`, namespace `geosaascasestudy`, `featured: true`, position 0, demo `https://relevy.app`. Landing surfaces Relevy + EchoLog (`slice(0,2)`). Grid shows 9 initial projects (`INITIAL_VISIBLE_PROJECTS=9`). 30 pages prerendered (28 prior + `/projects/geo-saas` ES/EN).
- **Verification**: 13 requirements / 20 scenarios PASS, 123 tests green (30 files), lint 0, build 30 pages 0 failures. `verify-report` verdict: `pass_with_warnings`, `critical_findings: 0`, `blockers: 0`.
- **Fixes included in the change**: `meta.*` i18n keys added to 9 case-study namespaces (SE debt resolved), voseo neutralized in ES projects/privacy copy.

## Task Completion Gate

- Persisted `tasks.md` (18 tasks) — all 18 checked `[x]`, **0 unchecked**. Gate PASSES.
- Engram apply-progress observation #1944 confirms 18/18 tasks complete (6 atomic work-unit commits).
- CRITICAL issues in verify-report: **none** (`critical_findings: 0`). Archive may proceed (no CRITICAL override needed).
- No archive-time stale-checkbox reconciliation was required — all tasks were already checked in the persisted artifact by `sdd-apply`.
- All artifacts present (proposal, 3 specs, design, tasks, verify-report) — full archive, not partial.

## Archive Readiness Note

Native `gentle-ai sdd-status` run without a change argument resolves `changeName: null` and reports all dependencies `blocked`; this `sdd-status` version does not accept a `--change` argument to resolve a named change. Archive readiness was therefore established from the orchestrator's explicit archive-phase launch, the persisted task gate (18/18, 0 unchecked), and the verify report (0 CRITICAL), all of which satisfy the readiness conditions: `dependencies.archive: ready` and `nextRecommended: archive`. `actionContext.mode: repo-local` (not workspace-planning); `allowedEditRoots` = repo root; all archive operations stayed inside the repo.

## Spec Sync to Main Specs

Delta specs synced to the source-of-truth baseline `openspec/specs/`:

| Domain | Action | Baseline before | Result |
|--------|--------|-----------------|--------|
| `relevy-case-study` | Created (new capability) | absent | `openspec/specs/relevy-case-study/spec.md` — REL-1..REL-8 (8 requirements) |
| `projects-directory` | Created (new capability) | absent | `openspec/specs/projects-directory/spec.md` — PD-1..PD-3 (3 requirements) |
| `seo-meta` | Composed (delta applied to existing) | existed | `Geo-SaaS Route-Meta Entry` + `Sitemap and llms.txt regeneration` ADDED; 6 existing requirements preserved byte-for-byte |

### seo-meta native composition (Mandatory #4119)

```bash
gentle-ai sdd-archive-compose \
  --canonical "openspec/specs/seo-meta/spec.md" \
  --delta "openspec/changes/relevy-case-study/specs/seo-meta/spec.md" \
  --output "openspec/specs/seo-meta/spec.md.compose-tmp" \
&& mv "openspec/specs/seo-meta/spec.md.compose-tmp" "openspec/specs/seo-meta/spec.md"
```

Exit 0 (zero). Resulting baseline contains 8 requirements: the 6 pre-existing (Route-Meta Canonical Ownership, Locale JSON Cleanup, Route-Meta Integrity Tests, Descriptive Page Titles, Keyword Meta Descriptions, Dual-Locale Coverage) + 2 ADDED (Geo-SaaS Route-Meta Entry, Sitemap and llms.txt regeneration). No unrelated requirement dropped; the ADDED `Geo-SaaS Route-Meta Entry` requirement includes the `(Reason: ...)`-free ADDED block (full requirement) which the compose command admitted on exit 0.

### Mechanical copy contract (new capabilities)

Both new capability specs copied with native shell `cp` + `mv` (no model Read→Write), verified by byte-identical `diff -r`:

```text
$ diff -r openspec/changes/relevy-case-study/specs/relevy-case-study/spec.md openspec/specs/relevy-case-study/spec.md
(empty)
$ diff -r openspec/changes/relevy-case-study/specs/projects-directory/spec.md openspec/specs/projects-directory/spec.md
(empty)
```

Empty diffs — the only passing evidence.

## Archive Move (Mechanical Copy Contract)

Change folder moved with a native `git mv` (tracked), preceded by a recursive pre-move snapshot, followed by a mandatory recursive `diff -r` readback:

```bash
source="openspec/changes/relevy-case-study"
destination="openspec/changes/archive/2026-09-08-relevy-case-study"
# snapshot_root/<source> created; git mv executed; source-gone check passed;
# diff -r snapshot_root/source destination -> EMPTY
```

```text
$ diff -r <snapshot>/source openspec/changes/archive/2026-09-08-relevy-case-study
(empty)
```

Empty diff — byte-identity of the archived tree vs the pre-move snapshot confirmed. `git status` shows the 7 artifacts as tracked renames `R` into the archive. The `archive-report.md` is additive and excluded from the comparison (it did not exist in the source snapshot).

## Archive Contents

- `proposal.md` ✅
- `specs/` (relevy-case-study, projects-directory, seo-meta) ✅
- `design.md` ✅
- `tasks.md` ✅ (18/18 tasks complete, 0 unchecked)
- `verify-report.md` ✅ (pass_with_warnings)
- `archive-report.md` (this file, additive) ✅

## Verify Report Issues Carried (non-blocking)

- **WARNING (REL-7)**: delivered screenshots are `1200×898` (~4:3) not the 16:9 (1920×1080) the spec states. Functional carousel requirement met (4 webp committed, paths resolve, no 404); consistent with existing project screenshots. Non-blocking, no runtime breakage.
- **SUGGESTIONS** (from verify-report, informational): pre-existing voseo `"Explorá el código"` in `projects.json` (out of scope); `titleI18nKey`/`descI18nKey` dead pointers matching the existing 8-case-study pattern; snapshot regeneration folded in ~10 pre-existing title drifts (expected per design risk table).

None of these are CRITICAL; none block archive. No rankable contradiction between sources was found.

## Source of Truth Updated

The following baseline specs now reflect the new behavior:
- `openspec/specs/seo-meta/spec.md`
- `openspec/specs/projects-directory/spec.md`
- `openspec/specs/relevy-case-study/spec.md`

## Engram Traceability — Observation IDs Read

| Artifact | Engram observation |
|----------|--------------------|
| explore | #1939 (`obs-ec0ab83d4206d7b5`) |
| proposal | #1940 (`obs-817ee1f3a3669748`) |
| spec | #1941 (`obs-fdfa758d7e1bb783`) |
| design | #1942 (`obs-306cea3c892a4679`) |
| tasks | #1943 (`obs-3f4e845747adcad4`) |
| apply-progress | #1944 (`obs-63b8b6c83bf66f8b`) |
| verify-report | #1945 (`obs-76e163eedb54a18d`) |

## SDD Cycle Complete

The change has been fully planned, implemented, verified, and archived. Ready for the next change.