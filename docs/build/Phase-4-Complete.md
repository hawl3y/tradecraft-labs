# Phase 4 — Research Journal: Complete

**Date:** 2026-06-24

---

## Files Created

| File | Type | Purpose |
|---|---|---|
| `components/journal/JournalTimeline.tsx` | Server component | Vertical timeline with dot-and-line layout, entry cards |
| `components/journal/JournalFilter.tsx` | Client component | URL-driven category and project filter chips |
| `components/mdx/MDXContent.tsx` | Client component | MDX rendering via `useMDXComponent` hook |
| `app/journal/page.tsx` | Server page (Dynamic) | Global journal with filters |
| `app/journal/[entry]/page.tsx` | Server page (SSG) | Individual entry with MDX body, prev/next nav |
| `app/research/[project]/journal/page.tsx` | Server page (SSG) | Project-scoped journal view |

**Also fixed:** `lib/utils.ts` — `formatDate` and `formatDateShort` now parse ISO date strings as local time (`T00:00:00` suffix) rather than UTC midnight. Prevents off-by-one-day display in US timezones.

---

## Component Notes

### JournalTimeline
Server component. Renders a vertical `<ol>` with a continuous line (`absolute left-[6px]`) and per-entry dots. Each entry: date, category badge, optional project badge, serif title (linked), summary, "Read entry →" link.

- `showProjectBadge` prop controls project badge visibility — `false` on project-scoped journal since the project is already in page context
- `emptyMessage` prop for filtered-empty state
- Project number derived from slug pattern (`project-(\d+)`) — no prop drilling required

### JournalFilter
Client component. Accepts current filter state as props from the server page (no `useSearchParams` hook — avoids Suspense boundary requirement). Uses `useRouter` + `usePathname` for URL navigation.

- `applyFilter(key, value)` rebuilds search params from current state + the new filter, preserving the other active filter
- Project filter hidden when `showProjectFilter={false}` (project journal) or `projects.length <= 1` (global journal with single project)
- Each chip has `aria-pressed` attribute

### MDXContent
Minimal client wrapper for `useMDXComponent` from `next-contentlayer2/hooks`. Wraps rendered MDX in `prose max-w-none` to apply the Tailwind typography plugin styles (Lora headings, navy blockquotes, configured in Phase 1).

---

## Page Architecture

### Global Journal `/journal`
- Dynamic (server-rendered on demand) — required by searchParams access
- Filters: `?category=milestone`, `?project=project-001-biso`, combinable
- Shows filtered entry count vs. total
- JournalTimeline with project badges visible

### Individual Entry `/journal/[entry]`
- SSG — `generateStaticParams` generates one route per journal entry
- Layout: `PageLayout width="narrow"` (max-w-prose = 48rem)
- Header: date, category badge, project link → title (H1) → lead paragraph (summary with left border)
- Body: full MDX via MDXContent
- Footer: prev/next navigation (hidden when null), "← All journal entries" link

### Project Journal `/research/[project]/journal`
- SSG — `generateStaticParams` generates one route per project
- Pre-filtered to project's entries; category filter still available
- "View global journal →" link for context
- JournalTimeline with `showProjectBadge={false}`

---

## Route Build Output

```
ƒ  /journal                          Dynamic (searchParams filters)
●  /journal/[entry]                  SSG
     └ /journal/2026-06-23-platform-launch
○  /research                         Static
●  /research/[project]/journal       SSG
     └ /research/project-001-biso/journal
```

---

## Design Decisions

1. **Server-props pattern for JournalFilter.** The server page reads `searchParams`, filters entries, then passes `currentCategory` and `currentProject` as props to the client `JournalFilter`. This avoids `useSearchParams()` in the client component (which would require a `Suspense` boundary on every page using it).

2. **No project filter with one project.** The project filter chip group is hidden when there is only one project. The architecture supports it — add a second project and the filter appears automatically.

3. **Timeline dot colors are uniform.** The wireframe shows a `│` line with no color differentiation. Using uniform gray dots keeps the timeline clean. Category is communicated by the badge, not the dot color.

4. **Entry summary as a lead paragraph with left border.** The wireframe specifies "Summary (lead paragraph, styled distinctly)." A `border-l-4 border-gray-200 pl-4` treatment sets the summary apart from the body without adding visual weight.

5. **Prev/Next navigation omitted when null.** With one entry, neither prev nor next exists. The nav block is conditionally rendered only when at least one adjacent entry is available.

---

## Deviations from Approved Architecture

None. All three journal surfaces are implemented as specified:
- Global Journal `/journal` — full filter row, chronological timeline ✓
- Individual Entry `/journal/[entry]` — MDX body, prev/next nav ✓
- Project Journal `/research/[project]/journal` — pre-filtered, category-only filter, "View global journal →" link ✓

---

## Content Constraint

The Phase 4 plan included "write 2-3 additional journal entries." Per the no-fabrication instruction and without verified dates for prior research events, no additional entries were written. The journal system is fully functional with the one real entry.

When dates for prior events are available (literature review completion, proposal submission, interview phase start), entries can be added as standard MDX files and the timeline will render them automatically in chronological order.

---

## Known Limitations

- **1 journal entry at launch.** Timeline renders correctly with sparse content. Additional factual entries with verified dates will populate the timeline naturally as they are added.
- **No RSS feed.** Planned for Phase 8 post-launch enhancements.

---

## Next Step

**Phase 5 — Research Project Pages + Artifact System** (awaiting approval)
