# Push Readiness Checklist
**Version:** v0.1.0  
**Repository:** https://github.com/hawl3y/tradecraft-labs  
**Use:** Complete every item before running `git push` for the first time

---

## 1. Local Build Verification

Confirm the platform builds cleanly from source before establishing the repository baseline.

- [ ] `npm run build` completes with **0 errors**
- [ ] `npm run build` output shows **24 routes** (or current expected count)
- [ ] No TypeScript errors: `npx tsc --noEmit` exits cleanly
- [ ] No Contentlayer schema warnings in build output
- [ ] `/opengraph-image` generates without font-loading errors (visible in build log)
- [ ] Dev server starts successfully: `npm run dev` → `http://localhost:3000` loads

---

## 2. Content Verification

Confirm all content files are accurate and appropriate for public visibility.

### MDX Content

- [ ] `content/projects/project-001-biso.mdx` — research question, working thesis, and gap statement are accurate as of today
- [ ] `content/artifacts/biso-research-insights.mdx` — content is current; no internal-only notes visible
- [ ] `content/artifacts/biso-research-data.mdx` — content is current; no raw personally-identifiable data
- [ ] `content/artifacts/biso-interview-analysis.mdx` — content is current; no participant-identifying information
- [ ] All 6 stub artifacts show `status: "stub"` in frontmatter — confirm no stubs accidentally contain empty MDX bodies that would render as blank pages
- [ ] `content/journal/2026-06-23-platform-launch.mdx` — reads accurately as the launch entry; no placeholder text

### Platform Copy

- [ ] `lib/site.ts` — `SITE.name`, `SITE.mission.full`, and `SITE.links` are correct
- [ ] About page bio (`app/about/page.tsx`) — researcher bio is accurate and up to date
- [ ] No visible "TODO", "Lorem ipsum", or placeholder text on any page

---

## 3. Repository Verification

Confirm no sensitive or unwanted files are staged for commit.

### Sensitive Files

- [ ] No `.env` or `.env.local` file exists in the project root (not just in .gitignore — confirm file doesn't exist)
- [ ] `.env.example` contains **only placeholder values**, not real secrets
- [ ] `.claude/` is added to `.gitignore` (settings.local.json must not be pushed)
- [ ] `research/project-001-biso/interviews/Interview_Pool_v1.docx` is either:
  - Added to `.gitignore` as `research/**/Interview_Pool*.docx`, OR
  - Moved outside the project directory
  - **Do not push a participant list to a public repository**

### `.gitignore` Completeness

Run `git status` after `git add .` and scan the staged files list for anything unexpected:

- [ ] No `node_modules/` files are staged
- [ ] No `.next/` files are staged
- [ ] No `.contentlayer/` files are staged
- [ ] No `.DS_Store` files are staged
- [ ] No `.claude/` files are staged
- [ ] No `Interview_Pool*.docx` files are staged (if excluded)

### Repository Root Cleanliness

- [ ] Root planning files (`Phase-X-Complete.md`, `Implementation-Plan*.md`, `Content-Mapping-v1.md`, `Wireframes-v1.md`, `phase5-summary.md`) are either:
  - Moved to `docs/build/`, OR
  - Added to `.gitignore`, OR
  - Intentionally committed at the root (acceptable if preferred)

---

## 4. Git Verification

Confirm git state before pushing.

### Configuration

- [ ] `git remote -v` shows `origin https://github.com/hawl3y/tradecraft-labs.git` for both fetch and push
- [ ] `git branch` (or `git status`) confirms the current branch is `main`
- [ ] `git log --oneline -5` shows the expected commit(s) with correct message(s)

### Staged Files Review

After `git add` and before `git commit`:

- [ ] `git status` shows expected files in "Changes to be committed"
- [ ] `git diff --cached --stat` shows a reasonable file count (no unexpected inclusions)
- [ ] Scan the diff output for any file that shouldn't be in the initial commit

### GitHub Repository State

Before pushing, confirm the remote is ready:

- [ ] GitHub repository `hawl3y/tradecraft-labs` exists
- [ ] Repository is set to the intended visibility (public or private)
- [ ] Repository is empty (no files, no default README that would conflict)
- [ ] Default branch on GitHub is `main` (not `master`)

---

## 5. Release Verification

Confirm release documentation is complete and accurate.

- [ ] `docs/releases/v0.1.0.md` exists and reflects the current state of the platform
- [ ] `docs/reviews/Git-Readiness-Review.md` is complete
- [ ] `docs/reviews/Production-Validation-Checklist.md` is complete
- [ ] `docs/reviews/Soft-Launch-Plan.md` is complete
- [ ] `README.md` at the repository root accurately describes the project (not a placeholder)

---

## 6. Tag Verification

After the first push succeeds:

- [ ] `git tag -a v0.1.0 -m "Initial platform release — Tradecraft Labs"` creates the tag
- [ ] `git push origin v0.1.0` pushes the tag to GitHub
- [ ] GitHub → Releases tab shows the v0.1.0 tag (may need to be promoted to a full Release entry)

---

## Sign-Off

| Check | Reviewer | Date | Notes |
|---|---|---|---|
| Local build verified | | | |
| Content reviewed | | | |
| Sensitive files confirmed excluded | | | |
| Repository verified | | | |
| Git state confirmed | | | |
| Release docs complete | | | |
| **Ready to push** | | | |

---

## Quick Reference: Issues to Resolve First

Based on the Git Readiness Review (`docs/reviews/Git-Readiness-Review.md`), resolve these before pushing:

| # | Issue | Action |
|---|---|---|
| 1 | `.claude/` not in `.gitignore` | Add `.claude/` to `.gitignore` |
| 2 | `Interview_Pool_v1.docx` in public repo | Add to `.gitignore` or remove file |
| 3 | Root planning files cluttering repo root | Move to `docs/build/` or add to `.gitignore` |
