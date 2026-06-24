# Git Readiness Review
**Date:** 2026-06-24  
**Repository:** https://github.com/hawl3y/tradecraft-labs  
**Status:** Not yet initialized — review required before first push

---

## Summary

The repository is structurally ready for Git, but three issues must be resolved before the first push to a public GitHub repository. One issue (`Interview_Pool_v1.docx`) is a research ethics concern. Two issues (`.claude/` not in `.gitignore`, root planning files) are hygiene issues. All are correctable before the first commit.

| Issue | Severity | Blocking? |
|---|---|---|
| `.claude/` not in `.gitignore` | High | Yes |
| `Interview_Pool_v1.docx` in public repo | High | Judgment call |
| Root planning files (`Phase-X-Complete.md`, etc.) | Medium | No |
| `docs/screenshots/` binary PNG files | Low | No |
| `.gitkeep` files in populated directories | Low | No |
| `archive/` empty directory | Low | No |

---

## Repository Structure Assessment

### What to commit

These directories and files form the platform source and should be tracked:

```
app/                        Next.js App Router pages and routes
components/                 React component library
content/                    MDX content (projects, artifacts, journal, publications)
lib/                        Utility modules and shared logic
public/                     Static assets (OG image, downloads placeholder)
docs/                       Design principles, release notes, review documents
  └─ (see exception below for screenshots and .docx files)
research/                   Source research materials
  └─ (see exception below for Interview_Pool_v1.docx)
.env.example                Environment variable documentation
.gitignore                  (after updates described below)
contentlayer.config.ts      Content schema definition
next.config.mjs             Next.js configuration
package.json                Dependency manifest
package-lock.json           Dependency lockfile
postcss.config.mjs          PostCSS configuration
tailwind.config.ts          Tailwind design tokens
tsconfig.json               TypeScript configuration
README.md                   Repository readme
```

### What NOT to commit

```
node_modules/               Already in .gitignore ✓
.next/                      Already in .gitignore ✓
.contentlayer/              Already in .gitignore ✓
.env / .env.local           Already in .gitignore ✓
next-env.d.ts               Already in .gitignore ✓
.DS_Store                   Already in .gitignore ✓
.vercel                     Already in .gitignore ✓
.claude/                    NOT YET in .gitignore — must add
```

### What requires a decision before committing

```
docs/screenshots/           18 PNG files — see Binary Files section
research/.../Interview_Pool_v1.docx — see Research Materials section
Root planning files         9 session artifacts — see Root Files section
```

---

## Critical Issue: `.claude/` Not in `.gitignore`

**Severity: High — must fix before first push**

The `.claude/` directory contains Claude Code session settings:

```
.claude/settings.local.json
```

This file may contain tool permissions, session identifiers, or local configuration that should not be published to a public repository. It is machine-local configuration with no value to other contributors.

**Resolution:** Add `.claude/` to `.gitignore` before running `git add`.

```
# Claude Code
.claude/
```

---

## Critical Issue: `Interview_Pool_v1.docx` in a Public Repository

**Severity: High — requires judgment before push**

The file at `research/project-001-biso/interviews/Interview_Pool_v1.docx` likely contains a list of potential research interview participants — names, titles, organizations, and possibly contact information.

Publishing this to a **public** GitHub repository raises two concerns:

**1. Research ethics / IRB compliance**  
Georgia Tech's IRB requirements for human subjects research typically prohibit the public disclosure of participant identities or contact details without explicit consent. A list of people who were *considered* as potential participants — even those not yet contacted — may qualify as identifiable human subjects data.

**2. Professional risk**  
Even if individuals have not yet been contacted, publishing their names as "potential interview subjects for research on the BISO role" could affect professional relationships or create an expectation they did not agree to.

**Options:**

| Option | Description |
|---|---|
| Exclude from git | Add `research/**/Interview_Pool*.docx` to `.gitignore`. The file stays locally but is never pushed. |
| Move outside repository | Move `Interview_Pool_v1.docx` to a location outside the project directory before initializing git. |
| Private repository only | If the repository is kept private during active research, this concern is deferred (but not eliminated — repos can be made public later). |

**Recommendation:** Exclude `Interview_Pool_v1.docx` from the repository. The interview analysis template, guide, and analysis framework are appropriate to publish. The participant list is not.

---

## `.gitignore` Review

Current `.gitignore` coverage:

| Pattern | Coverage | Status |
|---|---|---|
| `node_modules/` | Build dependencies | ✓ Correct |
| `/.next/` | Next.js build output | ✓ Correct |
| `/out/` | Static export output | ✓ Correct |
| `/.contentlayer/` | Contentlayer generated types | ✓ Correct |
| `.env` and variants | Secrets and local config | ✓ Correct |
| `.DS_Store` | macOS metadata files (all dirs) | ✓ Correct |
| `*.tsbuildinfo` | TypeScript incremental build info | ✓ Correct |
| `next-env.d.ts` | Next.js generated type declarations | ✓ Correct |
| `.vercel` | Vercel CLI local config | ✓ Correct |
| `/coverage/` | Test coverage reports | ✓ Correct |

**Missing entries (must add):**

```
# Claude Code
.claude/
```

**Recommended additions (by decision):**

```
# Research participant data (PII — exclude from public repo)
research/**/Interview_Pool*.docx

# Development screenshots (optional — large binary files)
# docs/screenshots/
```

**Complete updated `.gitignore` additions:**

```gitignore
# Claude Code
.claude/

# Research participant data
research/**/Interview_Pool*.docx
```

---

## Root-Level Planning Files

**Severity: Medium — not blocking, but creates noise**

Nine files at the repository root are session artifacts from the Claude Code build process. They contain planning documents and phase completion summaries generated during development:

```
Content-Mapping-v1.md       Content planning document
Implementation-Plan.md      Initial implementation plan
Implementation-Plan-v2.md   Revised implementation plan
Wireframes-v1.md            Wireframe specifications
Phase-1-Complete.md         Phase 1 completion summary
Phase-2-Complete.md         Phase 2 completion summary
Phase-3-Complete.md         Phase 3 completion summary
Phase-4-Complete.md         Phase 4 completion summary
phase5-summary.md           Phase 5 summary
```

These files have no runtime function and are not referenced by the platform. However, they document the build process, which has archival value.

**Options:**

| Option | Tradeoff |
|---|---|
| Commit as-is | Root stays cluttered; files are findable |
| Move to `docs/build/` before committing | Clean root; same archival value; one-time move |
| Add to `.gitignore` and exclude | Not tracked; preserved locally only |

**Recommendation:** Move to `docs/build/` before the first commit. This keeps the root clean, preserves the build history in the repository, and creates a logical home for process documentation separate from platform documentation (`docs/reviews/`) and release notes (`docs/releases/`).

If this creates friction before the first push, committing them at the root is acceptable — they can be reorganized in a subsequent commit.

---

## Build Artifact Review

### `.next/` — Excluded ✓

Next.js build output. Already in `.gitignore`. Should never be committed. Vercel regenerates this on every deployment.

### `.contentlayer/` — Excluded ✓

Contentlayer generates TypeScript type definitions and JSON representations of all MDX content at build time. These are derived from source MDX files in `content/`. Already in `.gitignore`. Vercel regenerates this during build.

### `next-env.d.ts` — Excluded ✓

Auto-generated by Next.js during build. Already in `.gitignore`.

### `public/og/og-default.png`

A static PNG copy of the OG image, generated from the live `/opengraph-image` route. This is a large binary (~30–80KB typically) that duplicates what Next.js generates dynamically.

**Decision:** This file can be committed (it serves as a visual reference per `public/og/README.md`) or excluded. Since it's documented in the README and serves a reference purpose, committing it is reasonable. It will only change when the OG design changes.

---

## Binary Files Decision

### `docs/screenshots/` (18 PNG files)

Screenshots taken during visual review phases (Phase 5 and Phase 6). They document the platform's appearance at specific points in development.

**Considerations:**
- Binary files don't diff in git — a changed screenshot creates a full duplicate in history
- 18 PNGs could range from a few MB to 20+ MB of initial repository size
- They're development review artifacts, not platform source files
- They have no runtime function

**Options:**

| Option | Tradeoff |
|---|---|
| Commit | Repository captures visual history; adds binary weight |
| Exclude (`docs/screenshots/`) | Clean repository; screenshots preserved locally |
| Commit to a separate `docs` branch | Possible but adds complexity for solo developer |

**Recommendation:** For a solo developer/researcher, committing the screenshots is fine. They document that the visual review was done. If repository size becomes a concern after several phases of screenshots, consider adding `docs/screenshots/` to `.gitignore` at that point.

### `docs/*.docx` and `research/**/*.docx`

The `docs/` directory contains three `.docx` planning documents (Information Architecture, PRD, Technical Architecture). The `research/` directory contains five `.docx` source artifacts plus the Interview Pool.

**Considerations:**
- Binary files, no git diffability
- `.docx` files are source materials with archival value
- They document the research methodology and design decisions behind the platform

**Recommendation:** Commit them (minus `Interview_Pool_v1.docx` per the PII concern above). They're source materials, not generated output. The lack of diffability is acceptable for a research platform — these files change infrequently and the whole-file history is sufficient.

---

## `.gitkeep` Files

Directories scaffolded early in development contain `.gitkeep` placeholder files to ensure git tracks empty directories:

```
components/journal/.gitkeep
components/layout/.gitkeep
components/mdx/.gitkeep
components/publications/.gitkeep
components/research/.gitkeep
components/ui/.gitkeep
content/artifacts/.gitkeep
content/journal/.gitkeep
content/projects/.gitkeep
content/publications/.gitkeep
public/downloads/.gitkeep
```

Most of these directories now contain real files. `.gitkeep` files in populated directories are harmless but unnecessary. The `content/publications/.gitkeep` and `public/downloads/.gitkeep` files remain useful since those directories are intentionally empty at v0.1.0.

**Recommendation:** Leave as-is. The `.gitkeep` files don't affect anything, and removing them is not worth a separate commit.

---

## `archive/` Directory

The `archive/` directory at the repository root is empty (no files, no `.gitkeep`). Git does not track empty directories, so it will not appear in the repository.

**Recommendation:** No action needed. If it's intended as a future home for archived content, add a `.gitkeep` before the first commit to preserve the directory.

---

## Recommendations Before First Push

**Must do before `git init`:**

1. Update `.gitignore` to add `.claude/`
2. Update `.gitignore` to exclude `research/**/Interview_Pool*.docx` (or remove the file from the project directory if not needed locally)
3. Verify no `.env` files exist in the project root that could be accidentally staged

**Strongly recommended before first commit:**

4. Move root planning files to `docs/build/` for a clean repository root (or add them to `.gitignore`)
5. Verify `.env.example` does not contain any real secrets — only placeholder values

**Acceptable as-is:**

6. `docs/screenshots/` PNG files — commit or exclude, either is fine
7. `.gitkeep` files — leave as-is
8. `public/og/og-default.png` — commit as visual reference

**Decision required but not blocking:**

9. `research/**/*.docx` (minus Interview_Pool) — commit as source materials (recommended) or exclude

---

## Recommended Git Workflow

### Branch Strategy

```
main          Production branch — Vercel auto-deploys on push
              Always deployable. Only merge when build is clean.

dev           Active development branch
              Day-to-day work happens here.
              Merge to main via PR or direct push when ready to deploy.

content/*     Content-only branches
              New journal entries, artifact conversions (Phase 7), copy changes.
              Example: content/journal-interview-reflections
              Can merge directly to main — no code changes, no dev branch required.

feature/*     Feature development branches
              Code changes, new components, infrastructure updates.
              Merge to dev first, then dev to main.
```

For a **solo researcher/developer**: the `dev` → `main` PR model adds friction without much benefit. A pragmatic approach:

- Work directly on `main` for content-only changes (journal entries, artifact MDX)
- Use `dev` or a short-lived branch for any code changes that could break the build
- The rule is simple: **if `npm run build` passes locally, it's safe to push to main**

### Commit Strategy

Use short, descriptive commit messages in present tense. No tooling required (no Conventional Commits enforcement needed for a solo project).

**Format:**
```
<type>: <short description>

Optional body if the why isn't obvious from the title.
```

**Types:**
```
content:    New or updated MDX content (journal entries, artifacts)
feat:       New platform feature or component
fix:        Bug fix or visual correction
docs:       Documentation changes (release notes, review docs)
config:     Configuration changes (Next.js, Tailwind, Contentlayer)
chore:      Maintenance (dependency updates, .gitignore, cleanup)
```

**Examples:**
```
content: add journal entry for first interview round
content: convert research proposal artifact to MDX
feat: add citation copy-to-clipboard to CitationBlock
fix: correct date parsing for UTC offset in sitemap
docs: add Git Readiness Review and Push Readiness Checklist
chore: update .gitignore to exclude Interview_Pool
```

Keep commits atomic: one logical change per commit. A journal entry is one commit. Converting three artifacts in Phase 7 can be three commits or one — whichever is easier to reason about.

### Tagging Strategy

Tags mark meaningful milestones. They're lightweight and don't require a ceremony.

```
v0.1.0    Initial platform release (this release)
v0.2.0    Phase 7 complete — all artifacts converted to MDX
v0.3.0    First paper submitted for publication
v1.0.0    First paper published — platform fully content-complete
```

Annotated tags (with `-a` flag) are preferred over lightweight tags — they store the tagger, date, and message, which is useful for release history.

```bash
git tag -a v0.1.0 -m "Initial platform release — Tradecraft Labs"
git push origin v0.1.0
```

### Release Strategy

A **release** corresponds to a meaningful state of the platform — not every commit. For a solo research platform, releases are infrequent.

**When to cut a release:**
- Platform infrastructure complete (this release — v0.1.0)
- Significant content milestone (all artifacts converted, first paper added)
- Major new capability (search, RSS, Publications section live)

**Release checklist:**
1. Update `docs/releases/vX.Y.Z.md` with what changed
2. Run `npm run build` locally — 0 errors
3. Merge to `main`
4. Tag the commit
5. Push tag to GitHub
6. Trigger Vercel deployment (automatic on push to main)
7. Run `docs/reviews/Production-Validation-Checklist.md`

**For solo researcher/developer:** Releases are a documentation practice, not a release engineering requirement. The goal is to have a commit you can return to if something breaks after new content is added. Tags serve that purpose without process overhead.
