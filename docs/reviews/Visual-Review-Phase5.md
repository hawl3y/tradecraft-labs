# Visual Review — Phase 5
**Date:** 2026-06-24  
**Reviewer:** Claude (automated visual review against rendered screenshots)  
**Status:** Pre-Phase 6 gate review

---

## 1. Screenshot Inventory

All screenshots generated at current implementation state using shot-scraper against the local dev server (Next.js 15, Contentlayer2, Tailwind CSS v3.4).

| Filename | Route | Viewport |
|---|---|---|
| `homepage-desktop.png` | `/` | 1280 × 900 |
| `homepage-mobile.png` | `/` | 390 × 844 |
| `research-desktop.png` | `/research` | 1280 × 900 |
| `research-mobile.png` | `/research` | 390 × 844 |
| `project-overview-desktop.png` | `/research/project-001-biso` | 1280 × 900 |
| `project-overview-mobile.png` | `/research/project-001-biso` | 390 × 844 |
| `artifact-active-desktop.png` | `/research/project-001-biso/artifacts/biso-research-insights` | 1280 × 900 |
| `artifact-active-mobile.png` | `/research/project-001-biso/artifacts/biso-research-insights` | 390 × 844 |
| `artifact-stub-desktop.png` | `/research/project-001-biso/artifacts/biso-research-proposal` | 1280 × 900 |
| `artifact-stub-mobile.png` | `/research/project-001-biso/artifacts/biso-research-proposal` | 390 × 844 |
| `journal-desktop.png` | `/journal` | 1280 × 900 |
| `journal-mobile.png` | `/journal` | 390 × 844 |
| `journal-entry-desktop.png` | `/journal/2026-06-23-platform-launch` | 1280 × 900 |
| `journal-entry-mobile.png` | `/journal/2026-06-23-platform-launch` | 390 × 844 |

All 14 screenshots saved to `docs/screenshots/`.

---

## 2. Visual Hierarchy Review

### Homepage

**What is working well:**
- The Lora serif hero statement — "Independent research exploring the human side of cybersecurity governance, leadership, and risk-informed decision making." — is immediately legible and editorially strong. At `text-4xl md:text-5xl` it reads as a mission declaration, not a tagline.
- The "CURRENT RESEARCH" section label is appropriately understated. It frames the project preview without competing with the mission statement.
- Typography hierarchy is clear: hero mission → project title → thesis excerpt → CTAs.
- On mobile, the hero fills the viewport with large serif text. This reads like a journal cover, which is appropriate for a research platform.

**What feels incomplete:**
- There is substantial dead whitespace between the hero text and the "CURRENT RESEARCH" section — roughly 30–35% of the desktop viewport is empty. This gap creates hesitation: a visitor may not immediately know whether to scroll.
- The three CTAs below the thesis excerpt ("View Project", "View Artifacts", "Read Journal") are not visible in the initial viewport. Combined with the whitespace gap, the below-fold content is very close to invisible on first load.
- The right half of the homepage desktop layout is entirely empty. The hero and current research sections use a constrained `max-w-content` left-aligned column, leaving a large right margin unused. This is intentional for readability, but at 1280px it looks sparse rather than spacious.

**What should be improved:**
- Consider reducing the hero bottom padding to close the gap before "CURRENT RESEARCH". The mission statement is strong enough to carry the page; it does not need that much breathing room.
- The homepage section dividers (border-b) between alternating `bg-background`/`bg-surface` sections are not visible in the initial viewport — this is fine architecturally, but the transition between the hero and research section lacks visual punctuation.

---

### Research Listing

**What is working well:**
- The `ResearchCard` communicates everything relevant at a glance: project number, status, full title, progress stage, research question, artifact count, and last updated date.
- The compact progress timeline in the card — a row of dots — provides immediate stage context without requiring explanation. The filled/hollow visual language is unambiguous.
- The "View Project →" button placement (bottom right of card) is natural and consistent with reading flow.
- Active/stub distinction is preserved from the artifact system and will scale cleanly to multiple projects.

**What feels incomplete:**
- With only one project, the page feels like a holding page rather than a listing. The header "Research Projects" with "Active and planned research initiatives." is accurate but reads thin when only a single card follows.
- The compact timeline lacks labels at this size. A first-time visitor will see a row of dots with no stage names and may not understand what they communicate.

**What should be improved:**
- The compact timeline is appropriate for the card context, but consider adding a one-line stage label ("Stage: Interviews") below or near the timeline in the ResearchCard — similar to the project overview mobile treatment which shows "Current Stage: Interviews". This costs very little space and adds interpretive value.

---

### Project Overview

**What is working well:**
- The page establishes authority immediately: breadcrumb → project badge + status → full serif title → progress timeline → research question → working thesis. This is the right information order for both academic and professional audiences.
- The full `ResearchProgressTimeline` with labeled stages is the clearest representation of research state anywhere on the platform. The filled-dot-to-interviews visual is immediately readable.
- The `ResearchQuestion` blockquote in large italic serif (text-xl/text-2xl) has the right weight — it occupies the space that in a dissertation would be the central framing device.
- The `ThesisBlock` (navy border, `bg-navy-light`) visually distinguishes the working thesis from the research question. The version label ("Working Thesis (v2)") correctly signals that this is a living document.
- The two-column layout (artifacts + journal sidebar) is correct for desktop — it puts artifacts in the primary reading position and journal in a supporting role.

**What feels incomplete:**
- At the 900px desktop viewport, the initial fold shows: breadcrumbs, header, badges, title, and the progress timeline. The research question and thesis block are visible only after scrolling. A visitor cannot immediately see the thesis without scrolling — this may be intentional but worth evaluating.
- The project overview's MDX body ("Project 001 is the foundational research initiative...") is rendered between the ThesisBlock and the two-column artifact/journal section. At the point in research this text was written, it describes the project at a high level. As the project matures, this section will need richer content to justify its position.

**What should be improved:**
- The journal sidebar section header says "Journal" with a "View all →" link that only appears when there are more than 3 entries. With exactly 1 entry, the sidebar shows the entry without a "View all" link. This is correct behavior but may seem incomplete. Consider always showing the journal link to the project journal page — it serves as a navigational affordance regardless of count.

---

### Artifact Pages

**Active artifact — what is working well:**
- The `SidebarLayout` works correctly at desktop. The right sidebar cleanly separates metadata (Project, Artifact Details, Other Artifacts, Recent Journal) from the primary reading content.
- The header badges — `Research Insights`, `v2`, `Active` — provide immediate context without cluttering the title.
- The description in the left-bordered blockquote functions as an abstract. This is the right academic pattern.
- MDX content renders correctly. The `@tailwindcss/typography` prose styles are applied — paragraph spacing, heading weights, and line heights are all appropriate for reading.
- The sidebar "OTHER ARTIFACTS" section correctly filters out stubs — visitors are only linked to content that exists.

**Active artifact — what feels incomplete:**
- On mobile, the breadcrumb wraps awkwardly when the artifact title is long. "BISO Research Project – Research Insights (Working Theories)" causes the last breadcrumb item to occupy a second line after a bare "/" separator, creating a visual orphan.
- The sidebar heading labels ("PROJECT", "ARTIFACT DETAILS", "OTHER ARTIFACTS", "RECENT JOURNAL") are visible on desktop but disappear to below the fold on mobile — visitors reading the artifact content on mobile must scroll well past the content area to reach related navigation.

**Stub artifact — what is working well:**
- The "Content pending" centered block is the right treatment. It clearly communicates state without creating an empty or broken page experience.
- The italic serif "Content pending" label matches the platform's typographic voice.
- The sidebar still populates fully for stubs — the project link, artifact details, and related active artifacts are all present. A visitor on a stub page has clear pathways to content that does exist.

**Stub artifact — what should be improved:**
- The "Content pending" message ("This artifact is complete in the project source documents. Full content will be published here as the research progresses.") is accurate but slightly awkward. The phrase "project source documents" is internal language that may not be meaningful to an external audience. Consider revising to something like "This artifact is complete. Full content will be published as the research progresses."

---

### Journal

**What is working well:**
- The journal header ("Research Journal" + "A continuous record of research in progress.") correctly sets expectations. The subtitle emphasizes ongoing, in-process work rather than publication.
- The filter chip row (All / Milestones / Reflections / Updates / Observations) is clean and accessible. The active state (dark fill + white text) is clear.
- The "1 ENTRY" count below the filters gives transparent totals before reading the list.
- The single entry renders correctly: date, Milestone + Project 001 badges, serif title link, summary text, "Read entry →" link.

**What feels incomplete:**
- With one journal entry, the page is largely empty. The footer is visible without scrolling. For launch with a single entry this is acceptable, but it communicates very early-stage activity. The journal is positioned as a primary differentiator — its current state underserves that positioning.
- On mobile, the filter chips wrap across two rows — "Observations" falls to a second row alone. This is a single-orphan problem caused by the combination of chip count and mobile viewport width.

**What should be improved:**
- The orphan "Observations" chip on mobile (390px). Options: reduce chip padding slightly, abbreviate one label (e.g., "Obs." — not recommended for clarity), or accept the wrap as tolerable until there is more content to justify the filter system's prominence.

---

### Journal Entry

**What is working well:**
- The entry header pattern (date → category badge → project link → serif H1 → summary blockquote) is the correct academic article structure. It reads like a research memo, which is exactly what journal entries should feel like.
- The summary in a left-bordered blockquote functions as an abstract. The visual separation from the body text is clear without being heavy.
- MDX body text renders at the correct reading size with appropriate Inter line height (`leading-relaxed`). Paragraphs are spaced well.
- Section headings ("What Has Been Completed") render in bold serif via `@tailwindcss/typography`. The weight difference from body text is correct.
- On mobile, the journal entry is the strongest reading experience on the platform. The narrow single-column layout, comfortable body type, and absence of competing UI elements creates genuine focus.

**What feels incomplete:**
- The prev/next navigation at the bottom of the entry (designed for between-entry navigation) does not appear with only one entry. With a single entry there is no context for it, which is correct — but it means the bottom of the entry page is just a "← All journal entries" link and the footer, which feels abrupt.

**What should be improved:**
- No critical issues on the journal entry page. It is the most polished single-page reading experience on the platform.

---

## 3. Typography Review

### Lora (serif)

Lora is performing as intended throughout the platform. At display sizes (homepage hero, project title, journal entry h1), it reads as authoritative and academic without feeling archaic. The italic variant — used in research questions, thesis blocks, and the journal entry summary blockquote — carries the right weight for quotation and hypothesis.

**Strengths:**
- Display weight at text-3xl/text-4xl: strongly editorial
- Italic at text-xl/text-2xl (ResearchQuestion): communicates open-question status appropriately
- MDX headings in `@tailwindcss/typography` (h2/h3): appropriate weight distinction from body text

**Concern:**
- The `ThesisBlock` uses italic serif for the thesis text body (`font-serif text-base italic`). At base size, Lora italic reads slightly narrow. For a thesis statement that runs 2-3 sentences, the italic weight at this size can feel slightly underpowered compared to the blockquote formatting used in ResearchQuestion. This is minor but worth noting.

### Inter (sans-serif)

Inter handles all body text, UI labels, metadata, badges, and navigation. It reads cleanly at every size in use.

**Strengths:**
- Navigation labels at Inter `text-sm`: clean and appropriately subordinate to content
- Artifact descriptions and metadata at `text-xs`/`text-sm`: readable without competing with headings
- Badge labels: well-proportioned at their small size

**Concern:**
- The journal body text (MDX content via `prose`) renders at Inter base size. At 1280px, the line length is constrained by `max-w-prose` (48rem), which is correct. However, the journal entry header metadata (date, badge, project link) uses Inter `text-sm` which looks proportionally small next to the large Lora H1 immediately below it. The size jump is intentional but the transition is slightly abrupt.

### Reading Experience

The overall reading experience is appropriate for a research platform targeting professionals. The combination of Lora for structural headings and italic content, and Inter for body and metadata, creates a clear academic/professional voice.

- **Academic credibility:** High. Lora at display size, italic blockquotes for research questions and theses, and the artifact structure modeled on research documents all contribute to a credible academic presentation.
- **Content density:** Appropriate. The platform is dense enough to communicate seriousness without being exhausting. The use of `max-w-prose` on journal entries and `max-w-content` on project/artifact pages keeps line lengths in the readable range.
- **Mobile readability:** Strong on journal entries (best single-page experience on the platform). Acceptable on project overview. Adequate on artifact pages (sidebar stack below content is correct but creates very long pages on mobile).

---

## 4. UX Review

### Academic Researcher

An academic researcher visiting the platform will immediately recognize the structural vocabulary: research question, working thesis, methodology list, annotated bibliography, literature matrix. These are not marketing terms — they are the actual artifacts of research.

**Works well:** The artifact taxonomy (Foundations → Analysis → Field Work → Writing) maps correctly to the stages of academic research. The `thesisVersion` field and "This thesis evolves as research progresses." note correctly communicate that the thesis is not a conclusion but a living hypothesis.

**Friction points:** The artifact listing page shows "0/3" for the Foundations group — meaning 3 stubs, 0 published. An academic researcher may find stub artifacts that communicate nothing about content less useful than simply hiding them. However, the stubs do communicate research scope and current state, which has value.

### Cybersecurity Practitioner

A practitioner — CISO, BISO, security director — will assess whether this research is relevant to their work. The project title, research question, and working thesis are all visible before any scroll on the homepage. The thesis directly names the BISO role, governance intermediary framing, and decision quality — all practitioner-relevant concepts.

**Works well:** The project overview page communicates research stage and methodology. A practitioner can see that this is at the interview stage and uses practitioner interviews as primary methodology — they know this will reflect real practitioner experience, not just academic theory.

**Friction points:** The artifact system may not be immediately legible to a practitioner. "Annotated Bibliography," "Literature Matrix," and "Paper Outline" are academic artifact names that do not have practitioner equivalents. A practitioner may not know what to click first. The "3 of 9 artifacts published" count may imply the platform is early-stage, which could reduce engagement.

### Executive Leader

An executive (CEO, board member, CRO) will evaluate quickly: what is this about, is the researcher credible, and is this worth reading?

**Works well:** The homepage hero statement answers "what is this" immediately. The project title and research question communicate seriousness. The journal entry format (structured, clear headings, no jargon) is accessible to non-academics.

**Friction points:** The platform has no "About" page content visible in these screenshots. If an executive navigates to About and finds minimal content, the credibility signal weakens. This is a Phase 6/7 concern, not a current code issue.

### Conference Organizer

A conference organizer evaluating whether to invite this researcher to present will look for: research topic clarity, methodology rigor, current stage, and evidence of active work.

**Works well:** The project overview page provides all of this. The progress timeline shows "Interviews" as current stage. The working thesis (v2) signals iteration. The journal entry documents active work.

**Friction points:** There is no publications page with content yet. A conference organizer would want to see prior publications or CFP-submitted abstracts. This is a content gap, not a structural problem.

### Recruiter

A recruiter evaluating research credentials will look for: topic expertise, academic rigor, practical application, and communication quality.

**Works well:** The platform structure — research question, working thesis, methodology, artifact system — demonstrates systematic research capability. The journal entry is well-written and communicates clearly.

**Friction points:** Recruiters may not engage deeply with the artifact structure. The platform does not surface the researcher's identity or credentials prominently. The "About" navigation item is present but its content is not evaluated here.

---

## 5. Accessibility Review

### Contrast

Based on visual inspection of screenshots:

- **Ink (`#1A1A1A`) on Background (`#FAFAF8`):** Strong contrast. Passes WCAG AA and AAA for all text sizes.
- **Muted (`#6B7280`) on Background:** At `text-xs` and `text-sm`, this gray is borderline WCAG AA for small text. The muted color is used for metadata labels, dates, and descriptive text throughout. This is the primary contrast concern on the platform.
- **Navy (`#1E3A5F`) on Background:** Good contrast. Used for links, borders, and badge backgrounds. Passes AA.
- **Badge text on badge backgrounds:** The green "Active" badge and blue "Info" badge both appear to have adequate contrast. The "Muted" gray badge (used for version numbers on stubs) is the lightest — warrants verification.
- **White text on navy-filled badge ("All" in Journal filter):** Strong contrast. Passes AAA.

**Recommendation:** Verify `#6B7280` on `#FAFAF8` at `text-xs` (11–12px rendered size) programmatically. It may fall below 4.5:1 at small sizes.

### Focus States

Focus state styling is not visible in static screenshots. The codebase uses `focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1` on interactive elements observed in BreadcrumbNav. This pattern should be applied consistently across all interactive elements (buttons, links, filter chips, nav items).

**Recommendation:** Keyboard-navigate the full platform before launch to verify focus ring visibility on all interactive elements, particularly:
- Journal filter chips (aria-pressed pattern in use)
- Nav links
- Breadcrumb links
- "Read entry →" and "View Project →" links

### Navigation

- **Breadcrumb:** Implemented with `aria-label="Breadcrumb"`, `role="list"`, and `aria-current="page"` on the final item. This is correct semantic navigation.
- **Main nav:** Three links (Research, Journal, About). Simple enough that no ARIA landmarks beyond the header are required. A skip-to-content link is not visible — this is a gap for keyboard and screen reader users.
- **Mobile nav:** Hamburger menu visible in screenshots but the menu implementation is not reviewed here.

**Recommendation:** Add a skip-to-content link before Phase 6. This is the highest-value accessibility addition for keyboard users on content-heavy pages.

### Mobile Usability

- Touch targets: Badge and filter chip sizes are adequate. The "Read entry →" link and "View Project →" button appear to have sufficient tap target height.
- The journal filter chips on mobile wrap to two rows — the second row contains only "Observations." This is usable but slightly awkward.
- The breadcrumb on long artifact titles wraps across two lines on mobile — readable but visually unpolished.

### Reading Flow

- **Journal entry:** Best reading flow on the platform. Narrow column, appropriate line height, clear section structure.
- **Project overview:** Long page with multiple distinct sections. No in-page anchors or table of contents. For the current content depth this is acceptable; as the project body grows, this may need revisiting.
- **Artifact active page:** The sidebar follows the main content on mobile. The reading flow is correct (content first, then related navigation), but mobile visitors must scroll far to reach related artifacts and journal links.

---

## 6. Wireframe Compliance Review

### Areas that match

| Page | Wireframe Element | Implementation |
|---|---|---|
| Homepage | 5-section structure: hero, current research, timeline, why this matters, journal | ✓ Matches |
| Homepage | Serif mission statement as hero | ✓ Matches |
| Homepage | Alternating bg-background / bg-surface sections | ✓ Matches |
| Research listing | ResearchCard with badges, title, compact timeline, research question, artifact count | ✓ Matches |
| Project overview | Breadcrumb navigation | ✓ Matches |
| Project overview | Full progress timeline below title | ✓ Matches |
| Project overview | ResearchQuestion as large italic blockquote | ✓ Matches |
| Project overview | ThesisBlock with version label and navy border | ✓ Matches |
| Project overview | Two-column artifacts + journal sidebar layout | ✓ Matches |
| Artifact listing | ArtifactGrid with 4 group taxonomy | ✓ Matches |
| Artifact listing | Active count displayed (active/total per group) | ✓ Matches |
| Individual artifact | SidebarLayout with project + metadata + related + journal | ✓ Matches |
| Individual artifact | Stub "content pending" block instead of MDX | ✓ Matches |
| Journal | Filter chips with category + project dimensions | ✓ Matches |
| Journal | Vertical timeline with dot-per-entry | ✓ Matches |
| Journal entry | Header: date, category, project badge | ✓ Matches |
| Journal entry | Summary as left-bordered blockquote | ✓ Matches |
| Journal entry | Prev/next navigation | ✓ Matches (conditional on adjacent entries) |

### Areas that differ

| Difference | Why | Change needed? |
|---|---|---|
| Homepage hero has large gap between hero text and "Current Research" section | Phase 3 implementation chose generous vertical padding for section separation | Consider reducing — see Section 2 |
| Journal filter "Observations" wraps to second row on mobile | 5 chips + 390px viewport causes wrap | Acceptable for now; becomes a non-issue as content grows and filters see real use |
| Artifact stub sidebar shows stubs in "OTHER ARTIFACTS" sidebar list | Implementation correctly filters to non-stub artifacts only (matching design intent) | N/A — behavior is correct |
| Project journal sidebar always links to project journal even with ≤3 entries | Current implementation: "View all →" only shown when > 3 entries | Consider showing journal link always — low cost, better navigation |
| Compact timeline in ResearchCard has no stage label | By design for space efficiency | Consider adding one-line "Stage: Interviews" label — see Section 2 |

### Why differences exist

The identified differences are all minor scope decisions made during Phase 5 implementation, none involve architectural changes or deviations from the approved wireframe direction. No rollback is required.

---

## 7. Launch Readiness Assessment

### What is launch ready

- **Homepage** — Structurally and visually ready. The hero is strong, the current research section is informative, and the overall first impression is appropriate for a research platform. Minor whitespace refinement would improve it but is not blocking.
- **Research listing** — Ready. Will improve naturally as additional projects are added.
- **Project overview** — Ready. The most complete page on the platform. Communicates research stage, question, thesis, artifacts, and journal in a coherent structure.
- **Artifact pages (active)** — Ready. MDX renders correctly, sidebar is populated, navigation is clear.
- **Artifact pages (stub)** — Ready. The "Content pending" treatment is honest and appropriate.
- **Journal entry** — Ready. Best reading experience on the platform. Typography, layout, and content structure all function correctly.
- **Navigation** — Ready. Breadcrumbs, main nav, and footer all functional.
- **Build** — Ready. 21 pages, 0 build errors, all routes SSG-rendered.
- **Date handling** — Fixed (UTC off-by-one resolved). Dates display correctly.

### What still needs refinement

**Before launch (recommended):**

1. **Homepage: hero section whitespace** — Reduce bottom padding of the hero section or increase the visual anchor between sections. The dead space between the mission statement and "CURRENT RESEARCH" label is the most visible issue across all desktop screenshots.

2. **Stub artifact copy** — Replace "full content available in source documents" with language appropriate for an external audience. Internal implementation language should not appear on published pages.

3. **Skip-to-content link** — Add before launch for keyboard accessibility. One small component, high value for assistive technology users.

4. **Muted text contrast verification** — Programmatically verify `#6B7280` at small text sizes. If it fails WCAG AA at text-xs, adjust to a slightly darker gray.

5. **Journal: project link in sidebar always visible** — Show the project journal link on the project overview's journal sidebar regardless of entry count.

**Before launch (lower priority):**

6. **ResearchCard: stage label** — Add a one-line "Stage: Interviews" below the compact timeline in the ResearchCard. Improves interpretability for first-time visitors without adding significant UI weight.

7. **Breadcrumb wrapping on mobile** — Evaluate whether long artifact titles need truncation in the breadcrumb. The current wrap behavior is functional but not polished.

### Recommended priorities before launch

| Priority | Issue | Effort |
|---|---|---|
| 1 | Homepage hero whitespace — reduce vertical gap | Trivial (1 Tailwind class) |
| 2 | Stub artifact copy — remove internal language | Trivial (1 string change) |
| 3 | Skip-to-content link | Small (1 new component, add to layout) |
| 4 | Muted text contrast verification | Small (measure + adjust if needed) |
| 5 | ResearchCard stage label | Small (1 line added to component) |
| 6 | Project overview journal sidebar link always visible | Trivial (1 condition removed) |

None of these require architectural changes or Phase 6 work. They can be addressed as targeted refinements.

---

### Overall Assessment

Tradecraft Labs reads as a research platform, not a website. The typographic choices (Lora for structure, Inter for text), the artifact taxonomy, the research question and thesis framing, and the journal as a first-class feature all contribute to an appropriate academic/professional register. The visual hierarchy is clear across all pages. The implementation is technically sound.

The primary gap before launch is content volume — one journal entry, mostly stub artifacts — which is an honest reflection of research-in-progress rather than an implementation problem. The platform is built correctly for the content that will come.

The six refinements above are recommended but none are blocking. The platform is architecturally ready for Phase 6.
