# Phase 5 — Research Project Pages & Artifact System

**Status:** Complete  
**Build:** 21 pages, 0 errors  
**Date:** 2026-06-24

---

## Files Created

### Pages (4 new)

| File | Route | Type |
|------|-------|------|
| `app/research/page.tsx` | `/research` | Static |
| `app/research/[project]/page.tsx` | `/research/[project]` | SSG |
| `app/research/[project]/artifacts/page.tsx` | `/research/[project]/artifacts` | SSG |
| `app/research/[project]/artifacts/[artifact]/page.tsx` | `/research/[project]/artifacts/[artifact]` | SSG |

### Components (8 new/updated)

| File | Purpose |
|------|---------|
| `components/research/ResearchQuestion.tsx` | Large serif italic research question block |
| `components/research/ProgressSummary.tsx` | Stage · artifacts · methodology metrics row |
| `components/research/ThesisBlock.tsx` | Navy-bordered working thesis callout |
| `components/research/ArtifactCard.tsx` | Individual artifact row with stub/active states |
| `components/research/ArtifactGrid.tsx` | Grouped artifact display (4 groups) |
| `components/research/ResearchCard.tsx` | Project listing card with compact timeline |
| `components/mdx/Callout.tsx` | MDX callout block (insight / note / warning) |
| `components/mdx/MDXComponents.tsx` | Custom MDX component registry |
| `components/mdx/MDXContent.tsx` | `'use client'` MDX renderer with `useMDXComponent` |

---

## Design Decisions

### Research Listing (`/research`)
- Single `ResearchCard` per project — scales cleanly to multiple projects
- Filter row intentionally omitted: only 1 project exists; adds visual complexity without function
- Compact `ResearchProgressTimeline` inside each card gives stage context at a glance

### Project Overview (`/research/[project]`)
- Full-width `ResearchProgressTimeline` with labeled stages and "Current Stage: Interviews" on mobile
- Research question rendered as a large serif italic blockquote — highest visual weight below the title
- Working thesis in navy-bordered `ThesisBlock` with version label — visually distinct from the research question
- MDX body rendered between thesis and the two-column section (provides narrative context)
- Two-column grid `lg:grid-cols-[1fr_22rem]` — artifact list (primary) with journal sidebar (secondary)
- Journal sidebar capped at 3 entries; "View all →" link appears only when there are more than 3

### Artifact Listing (`/research/[project]/artifacts`)
- Full-width `ArtifactGrid` — no sidebar, clean scan view
- Active count displayed ("3 of 9 artifacts published") — communicates research progress without hiding stub entries
- Group headers show `active/total` (e.g., "0/3") — precise accounting within each category

### Individual Artifact (`/research/[project]/artifacts/[artifact]`)
- `SidebarLayout` with 18rem right sidebar
- Stub artifacts show "Content pending" block instead of rendering their sparse MDX body — avoids an empty or thin content experience
- Sidebar: project link → artifact metadata (type, version, updated date, download) → other artifacts (non-stub only, max 4) → recent journal (max 2)
- `PageLayout width="wide"` (max-w-7xl) — sidebar layout needs more horizontal room than the default 68rem content width

---

## No Deviations from Approved Architecture

All pages follow the approved Phase 5 plan. No fabricated dates introduced. Stub artifact handling implemented exactly as designed.
