# Phase 3 — Homepage: Complete

**Date:** 2026-06-24

---

## Files Created

| File | Purpose |
|---|---|
| `components/research/ResearchProgressTimeline.tsx` | Full and compact stage pipeline |
| `components/research/ThesisBlock.tsx` | Left-bordered thesis callout (used in Phase 5) |
| `components/research/WhyThisMatters.tsx` | Research gap section component |
| `components/research/StatusBadge.tsx` | Status → Badge variant mapper |
| `components/journal/JournalEntry.tsx` | Entry card (date, category, title, summary) |
| `app/page.tsx` | Full homepage implementation |

---

## Component Notes

**ResearchProgressTimeline:** CSS Grid with `repeat(7, 1fr)` columns. Each cell contains a left half-connector, dot, and right half-connector — guarantees labels align under their dots with no coordinate math. Connector color logic: left half of stage `i` is navy if `i <= currentIdx`; right half is navy if `i < currentIdx`. On screens below `sm`, labels are hidden and a single "Current Stage: Interviews" text label renders below the track. Works for any `ResearchStage` value with no hardcoding.

**StatusBadge:** Thin wrapper over `Badge` that maps project/artifact status strings to the correct variant and display label. Accepts `string` (not the enum) so it works with both `ProjectStatus` and `ArtifactStatus` without separate components.

**JournalEntry:** Imports the Contentlayer-generated type as `JournalEntryData` to avoid naming conflict with the component itself. Uses `<time dateTime={entry.date}>` for semantic HTML. `line-clamp-2` on summary text.

**ThesisBlock:** Left-border callout with `bg-navy-light` background, version label, italic serif quote, and evolving thesis note. Built in Phase 3 for use in Phase 5 (project overview page).

**WhyThisMatters:** Accepts `text` prop (from `project.researchGap`), renders heading + paragraph constrained to `max-w-prose`.

---

## Homepage Section Structure

| Section | Content | Background |
|---|---|---|
| 1 — Hero | Mission statement in Lora serif (text-4xl / md:text-5xl) | background (#FAFAF8) |
| 2 — Current Research | Project badges, full title, thesis summary, 3 CTAs | background |
| 3 — Research Progress | Timeline showing 7 stages, Interviews highlighted as current | surface (#F3F2EF) |
| 4 — Why This Matters | Research gap paragraph from `project.researchGap` | background |
| 5 — From the Journal | Latest journal entries, link to /journal | surface |

Sections alternate background/surface for visual rhythm. No explicit borders between sections — spacing and background color do the separation.

---

## Design Decisions

1. **Hero typography only.** The wireframe specifies "No image. No background. Typography only." — implemented exactly. The mission statement is the only content in the hero section.

2. **Alternating section backgrounds.** `bg-background` and `bg-surface` alternate across the 5 sections. Creates visual separation without heavy dividers.

3. **CTA button hierarchy.** Primary → View Research, Secondary → Read Proposal, Ghost → Follow in Journal. The wireframe shows three equal-weight buttons; visual hierarchy was applied to guide attention toward the primary action.

4. **`max-w-prose` on research gap paragraph.** Section container is `max-w-content` (68rem), but the paragraph is capped at `max-w-prose` (48rem) for optimal line-length readability. Heading remains full-width within the container.

5. **Mobile timeline fallback.** Labels are hidden below `sm` breakpoint. A single "Current Stage: Interviews" text label renders below the dot track on mobile.

---

## Deviations from Wireframe

| Wireframe | Implementation | Reason |
|---|---|---|
| 3 journal entries shown | 1 journal entry shown | Only 1 real entry exists. Wireframe entries were illustrative. Per no-fabrication instruction. |
| Three equal-weight CTA buttons | Primary / Secondary / Ghost hierarchy | Improves visual hierarchy and guides primary action. |

---

## Three Orientation Questions — Verified

All three questions are answered within the first two viewport heights on desktop:

- **What is this?** Hero: "Independent research exploring the human side of cybersecurity governance, leadership, and risk-informed decision making."
- **What is being studied?** Current Research section: full project title + one-sentence thesis summary.
- **Why should I care?** Why This Matters section: research gap stated plainly in 4 sentences.

---

## Build Verification

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (8/8)
Generated 11 documents in .contentlayer
```

All 8 routes static. No TypeScript errors. No linting errors.

---

## Known Limitation

The "From the Journal" section currently shows one entry. Phase 4 includes writing 2–3 additional backdated journal entries (factually accurate, documenting events that already occurred). That will populate the section properly.

---

## Next Step

**Phase 4 — Research Journal** (awaiting approval)
