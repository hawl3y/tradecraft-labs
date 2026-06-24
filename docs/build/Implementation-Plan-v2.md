# Tradecraft Labs — Implementation Plan v2

> Revised from v1 based on architectural feedback received 2026-06-23.
> Key changes: content conversion deferred; Research Journal elevated to first-class feature;
> Research Progress Timeline added as a prominent platform component; homepage redesigned
> around three orientation questions; mission visibility strategy added; stack confirmed.

---

## 1. Confirmed Stack

```
Framework:         Next.js 14+ (App Router)
Language:          TypeScript (strict mode)
Styling:           Tailwind CSS + @tailwindcss/typography plugin
Content:           MDX via Contentlayer
Hosting:           Vercel
Version Control:   GitHub (content + code in same repo)
Analytics:         Plausible (privacy-first)
Fonts:             Lora (headings, serif) + Inter (body, sans-serif) + JetBrains Mono (code)
PDF downloads:     Static files served from /public/downloads/
Search (post-MVP): Pagefind
```

No decisions remain open on the stack. Implementation can begin when architecture is approved.


---

## 2. Revised Architectural Decisions

### 2.1 Content Conversion Is Not a Prerequisite

The original v1 plan treated .docx-to-MDX conversion as a blocking Phase 0.
This is reversed. The platform skeleton — routing, layouts, navigation, design system,
content schemas, and all page structures — will be built first using a minimal seed
content set. The full artifact conversion is a dedicated content phase that occurs after
the platform is structurally complete.

Seed content for skeleton development:
- Project frontmatter (derivable from existing README and documents, no docx needed)
- The two .txt artifacts (Research Insights v2, Research Data) with light MDX wrapping
- One initial journal entry written fresh to document the platform launch
- Stub artifact entries (title + description only, no body) for all nine project artifacts,
  so every route resolves and the UI is fully testable

This means every page and component can be built and validated before the conversion
work begins.

### 2.2 Research Journal Is a First-Class Platform Feature

The journal is not a sub-feature nested inside a research project.
It is a top-level platform feature with its own navigation entry.

The platform has two journal surfaces:

Global Journal (/journal)
  - All journal entries across all projects
  - Chronological, filterable by project and category
  - The primary way a returning visitor tracks research evolution

Project Journal (/research/[project]/journal)
  - Filtered view showing only entries for a specific project
  - Accessible from the project hub as a tab or section link
  - Same entry content, different scope filter

An entry lives in one place (/journal/[entry]) and is surfaced in both views.

### 2.3 Research Progress Timeline Is a First-Class Component

The ResearchProgressTimeline is a reusable component that renders the full research
lifecycle with the current stage clearly marked. It appears in three contexts:

1. Homepage — prominently, anchored to the current active project
2. Project overview page — directly below the project header
3. Research listing cards — compact variant

The component accepts a stage value (typed enum) and renders all stages with visual
differentiation between completed, current, and upcoming stages. It is entirely
data-driven and requires no changes when a new project at a different stage is added.

### 2.4 Mission Visibility Strategy

The mission — "Independent research exploring the human side of cybersecurity governance,
leadership, and risk-informed decision making." — appears in five specific locations:

1. Header (persistent): Rendered as a subtitle beneath the Tradecraft Labs wordmark,
   visible on every page. Short enough to read in passing; present on every route.

2. Homepage Hero (primary): The mission is the first thing a visitor reads.
   It is the answer to "What is this?" and occupies the opening section.

3. Footer (persistent): Full mission statement in the footer on every page.
   Visitors who scroll to the bottom of any page are re-grounded in the platform purpose.

4. About page (full treatment): The mission leads the About page and is followed by
   the expanded context — why this research area, what problems it addresses, who it
   serves.

5. Open Graph / meta description (invisible but important): The mission text is used
   as the default meta description for the site, ensuring it appears correctly in
   search results, link previews, and social shares.

This means the mission is impossible to miss on first visit and consistently reinforced
on every subsequent page.


---

## 3. Final Information Architecture

### 3.1 Site Map

```
/                               Home
/research                       All Research Projects
/research/[project]             Project Overview
/research/[project]/artifacts   Artifact Listing (project-scoped)
/research/[project]/artifacts/[artifact]  Individual Artifact
/research/[project]/journal     Journal (project-scoped view)
/journal                        Global Journal (all projects)
/journal/[entry]                Individual Journal Entry
/publications                   All Publications (cross-project)
/about                          Mission, Founder, Focus Areas
```

Note: /research/[project]/publications is intentionally omitted from MVP routing.
Publications are surfaced on the project overview page and linked to /publications,
which handles cross-project publication display. This simplifies navigation without
hiding content.

### 3.2 Final Navigation Structure

```
┌────────────────────────────────────────────────────────┐
│  TRADECRAFT LABS                                        │
│  Independent research on cybersecurity governance       │
│                                            [nav]        │
│                Research  |  Journal  |  About           │
└────────────────────────────────────────────────────────┘
```

Four items: Research, Journal, About, and an implicit home via the wordmark.
Publications is accessible from Research and the project pages, not a top-level
nav item in MVP. This keeps the navigation scannable and reflects the platform's
actual hierarchy: research is the core, the journal is the window into its evolution,
about establishes context.

Mobile: hamburger menu collapses to the same four items in a vertical drawer.

Active state: current section highlighted with the navy accent color and an underline.
No filled backgrounds or bold on nav items — subtle visual signal only.


---

## 4. Final Content Model

### 4.1 Research Project

```typescript
// content/projects/project-001-biso.mdx

{
  title: string                 // Full paper title
  slug: string                  // URL-safe identifier: "project-001-biso"
  projectNumber: string         // Display number: "001"
  status: ProjectStatus         // "active" | "completed" | "planned" | "paused"
  stage: ResearchStage          // Current lifecycle stage (typed enum)
  researchQuestion: string      // The primary research question
  workingThesis: string         // Current working thesis (expected to evolve)
  thesisVersion: number         // Thesis version number (1, 2, 3...)
  researchGap: string           // Why this research is needed — "Why This Matters"
  methodology: string[]         // ["Literature Review", "Practitioner Interviews"]
  startDate: string             // ISO date
  updatedDate: string           // ISO date
  tags: string[]                // ["governance", "trust", "decision-quality", ...]
  featured: boolean             // Controls homepage prominence
}
// MDX body: expanded project description (optional, rendered on project page)
```

### 4.2 Artifact

```typescript
// content/artifacts/biso-research-insights.mdx

{
  title: string
  slug: string
  artifactType: ArtifactType    // Typed enum — see section 4.5
  version: number               // Current version number (e.g., 2)
  status: ArtifactStatus        // "stub" | "draft" | "active" | "superseded" | "published"
  project: string               // Parent project slug
  description: string           // 1-2 sentence description for listing views
  createdDate: string           // ISO date
  updatedDate: string           // ISO date
  downloadUrl?: string          // /downloads/filename.pdf when available
  tags: string[]
}
// MDX body: full artifact content
```

Note on "stub" status: Artifacts with status "stub" have frontmatter and a description
but no MDX body yet. They appear in the artifact grid with a "Coming Soon" indicator
and no body link. This allows the full artifact listing to be rendered during skeleton
development before conversion work is complete.

### 4.3 Journal Entry

```typescript
// content/journal/2026-06-23-platform-launch.mdx

{
  title: string
  slug: string
  date: string                  // ISO date — also drives sort order
  category: JournalCategory     // "milestone" | "reflection" | "update" | "observation"
  project: string               // Parent project slug (enables project-scoped filtering)
  summary: string               // 1-2 sentence abstract shown in listing views
  tags: string[]
}
// MDX body: full journal entry
```

### 4.4 Publication

```typescript
// content/publications/biso-governance-intermediary-draft.mdx

{
  title: string
  slug: string
  authors: string[]
  publicationDate?: string      // Optional — may not exist until submitted/published
  version: number
  status: "draft" | "submitted" | "published"
  abstract: string
  downloadUrl?: string
  citationText?: string         // Formatted citation — populated at submission/publication
  project: string
  tags: string[]
}
```

### 4.5 Type Enums

```typescript
type ProjectStatus =
  | "active"
  | "completed"
  | "planned"
  | "paused"

type ResearchStage =
  | "concept"
  | "literature-review"
  | "proposal"
  | "interviews"
  | "analysis"
  | "draft"
  | "publication"

// Ordered array used by ResearchProgressTimeline component:
const RESEARCH_STAGES: ResearchStage[] = [
  "concept",
  "literature-review",
  "proposal",
  "interviews",
  "analysis",
  "draft",
  "publication",
]

// Display labels for stages:
const STAGE_LABELS: Record<ResearchStage, string> = {
  "concept":           "Concept",
  "literature-review": "Lit. Review",
  "proposal":          "Proposal",
  "interviews":        "Interviews",
  "analysis":          "Analysis",
  "draft":             "Draft",
  "publication":       "Publication",
}

type ArtifactType =
  | "research-proposal"
  | "literature-matrix"
  | "annotated-bibliography"
  | "research-insights"
  | "research-data"
  | "interview-guide"
  | "interview-pool"
  | "interview-analysis"
  | "paper-outline"
  | "draft-paper"
  | "final-paper"
  | "presentation"

type ArtifactStatus =
  | "stub"
  | "draft"
  | "active"
  | "superseded"
  | "published"

type JournalCategory =
  | "milestone"
  | "reflection"
  | "update"
  | "observation"
```


---

## 5. Final File System Architecture

```
/
├── app/
│   ├── layout.tsx                      # Root layout (Header, Footer, fonts, analytics)
│   ├── page.tsx                        # Home
│   ├── research/
│   │   ├── page.tsx                    # All research projects
│   │   └── [project]/
│   │       ├── page.tsx                # Project overview
│   │       ├── artifacts/
│   │       │   ├── page.tsx            # Artifact listing
│   │       │   └── [artifact]/
│   │       │       └── page.tsx        # Individual artifact (full MDX)
│   │       └── journal/
│   │           └── page.tsx            # Project-scoped journal view
│   ├── journal/
│   │   ├── page.tsx                    # Global journal (all projects)
│   │   └── [entry]/
│   │       └── page.tsx                # Individual journal entry
│   ├── publications/
│   │   └── page.tsx                    # All publications
│   └── about/
│       └── page.tsx
│
├── content/                            # MDX source (Contentlayer reads here)
│   ├── projects/
│   │   └── project-001-biso.mdx
│   ├── artifacts/
│   │   ├── biso-research-proposal.mdx          # stub initially
│   │   ├── biso-literature-matrix.mdx          # stub initially
│   │   ├── biso-annotated-bibliography.mdx     # stub initially
│   │   ├── biso-research-insights.mdx          # full content (from .txt)
│   │   ├── biso-research-data.mdx              # full content (from .txt)
│   │   ├── biso-interview-guide.mdx            # stub initially
│   │   ├── biso-interview-pool.mdx             # stub initially
│   │   ├── biso-interview-analysis.mdx         # full content (from .txt)
│   │   └── biso-paper-outline.mdx              # stub initially
│   ├── journal/
│   │   └── 2026-06-23-platform-launch.mdx      # First entry, written fresh
│   └── publications/
│       └── (empty at launch — ready for draft paper)
│
├── research/                           # SOURCE ARTIFACTS — never modified
│   └── project-001-biso/
│       ├── insights/
│       ├── interviews/
│       ├── literature/
│       ├── paper/
│       └── proposal/
│
├── docs/                               # Platform documentation — never modified
│
├── components/
│   ├── ui/                             # Primitives
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Divider.tsx
│   ├── layout/
│   │   ├── Header.tsx                  # Wordmark + mission subtitle + nav
│   │   ├── Footer.tsx                  # Mission + links
│   │   ├── Nav.tsx                     # Research / Journal / About
│   │   ├── PageLayout.tsx              # Max-width wrapper, consistent padding
│   │   ├── BreadcrumbNav.tsx           # Contextual breadcrumb trail
│   │   └── SidebarLayout.tsx           # Two-column layout for artifact pages
│   ├── research/
│   │   ├── ResearchProgressTimeline.tsx  # Stage stepper — reusable, data-driven
│   │   ├── ResearchCard.tsx              # Project listing card
│   │   ├── ArtifactCard.tsx              # Individual artifact with type + status
│   │   ├── ArtifactGrid.tsx              # Grouped artifact display
│   │   ├── StatusBadge.tsx               # Active / Draft / Published pill
│   │   ├── ThesisBlock.tsx               # Styled working thesis callout
│   │   ├── ResearchQuestion.tsx          # Large-type research question display
│   │   ├── WhyThisMatters.tsx            # Research gap / significance block
│   │   └── ProgressSummary.tsx           # Stage + artifact + interview counts
│   ├── journal/
│   │   ├── JournalTimeline.tsx           # Chronological list with visual line
│   │   ├── JournalEntry.tsx              # Entry card (date, category, title, summary)
│   │   └── JournalFilter.tsx             # Category + project filter controls
│   ├── publications/
│   │   ├── PublicationCard.tsx
│   │   └── CitationBlock.tsx
│   └── mdx/
│       ├── MDXComponents.tsx             # Custom renderers for MDX elements
│       ├── Callout.tsx                   # Insight / note / warning blocks
│       ├── KeyThemes.tsx                 # Styled research theme list
│       └── ConceptualModel.tsx           # Trust → Governance → Outcomes display
│
├── lib/
│   ├── content.ts                        # Contentlayer query helpers
│   ├── research-stages.ts                # Stage ordering, labels, completion logic
│   └── utils.ts
│
├── public/
│   └── downloads/                        # PDF artifacts (added during content phase)
│
├── contentlayer.config.ts
├── tailwind.config.ts
└── next.config.mjs
```


---

## 6. Final Page Architecture

### 6.1 Home (/)

Purpose: Answer three questions in approximately ten seconds.
  1. What is this?          → Hero / Mission
  2. What is being studied? → Current Research + Research Progress Timeline
  3. Why should I care?     → Why This Matters

```
SECTION 1: HERO
  Mission statement — large, clean, immediate.
  No image. No animation. Typography only.

SECTION 2: CURRENT RESEARCH
  Project title (full).
  Status badge + Project number.
  One-sentence thesis summary.
  CTAs: [View Research]  [Read Proposal]  [Follow in Journal]

SECTION 3: RESEARCH PROGRESS TIMELINE
  Full stage pipeline rendered horizontally.
  Completed stages: filled indicator.
  Current stage: highlighted with accent color + label "Current Stage".
  Upcoming stages: unfilled/muted.
  Reuses ResearchProgressTimeline component.

SECTION 4: WHY THIS MATTERS
  A short paragraph (3-5 sentences) drawn from the research gap field.
  Answers: what problem does this research address, and who should care.
  Not marketing copy — direct, academic, plainspoken.

SECTION 5: FROM THE JOURNAL
  Heading: "From the Research Journal"
  Three most recent entries: date, category badge, title, one-line summary.
  CTA: [View All Journal Entries →]
  This section signals to visitors that research is ongoing and followable.

FOOTER
  Full mission statement.
  Links: JoeHawley.com · LinkedIn
  Copyright.
```

### 6.2 Research Listing (/research)

Purpose: Entry point for all research projects, scalable from 1 to many.

- Section heading: "Research Projects"
- Filter row: All / Active / Completed / Planned (hidden when only one project exists)
- ResearchCard for each project:
  - Project number + title
  - Status badge
  - ResearchProgressTimeline (compact variant, no labels)
  - Research question excerpt (first sentence)
  - Artifact count + last updated date
  - CTA: [View Project →]

### 6.3 Project Overview (/research/[project])

Purpose: The complete, authoritative hub for a single research project.

```
HEADER
  Breadcrumb: Research > Project 001
  Project number badge + Status badge
  Full project title (H1)

RESEARCH PROGRESS TIMELINE
  Full-size version, same as homepage but project-specific.

RESEARCH QUESTION
  Large-type display. Clearly labeled "Research Question".

WORKING THESIS
  ThesisBlock component.
  Labeled: "Working Thesis (v2)" — version number surfaced.
  Small note: "This thesis evolves as research progresses."

TWO-COLUMN LAYOUT (below the above)

  LEFT COLUMN: ARTIFACTS
    ArtifactGrid grouped by type category:
      Foundations:  Research Proposal, Literature Matrix, Annotated Bibliography
      Analysis:     Research Insights, Research Data
      Field Work:   Interview Guide, Interview Pool, Interview Analysis
      Writing:      Paper Outline, Draft Paper (when available)
    Each ArtifactCard: title, type badge, version badge, status, description, link.
    Stub artifacts show a muted "Pending" state instead of a link.

  RIGHT COLUMN: RESEARCH JOURNAL
    Heading: "Research Journal"
    Last 4 entries for this project (JournalEntry component).
    CTA: [View All Entries →] → /research/[project]/journal
```

### 6.4 Artifact (/research/[project]/artifacts/[artifact])

Purpose: Full reading experience for a single research artifact.

```
HEADER
  Breadcrumb: Research > Project 001 > Artifacts > [Artifact Name]
  Artifact type badge + Version badge + Status badge
  Full artifact title (H1)
  Description + dates

SIDEBAR LAYOUT (two-column on desktop, single-column on mobile)

  MAIN CONTENT (left, wider):
    Full MDX body rendered with Tailwind typography.
    Academic typographic treatment throughout.
    Download link (PDF) pinned near title when available.

  SIDEBAR (right, narrower):
    "Part of" — project link
    "Related Artifacts" — 3-4 related artifacts by type
    "In the Journal" — 2-3 journal entries tagged to this artifact
```

### 6.5 Global Journal (/journal)

Purpose: The primary place to follow the evolution of research across all projects.

```
HEADER
  "Research Journal"
  Mission-adjacent subheading: "A continuous record of research in progress."

FILTER ROW
  Category: All / Milestones / Reflections / Updates / Observations
  Project:  All / Project 001 / [future projects]

TIMELINE
  JournalTimeline component.
  Entries in reverse chronological order.
  Each entry: date (prominent), category badge, project tag, title, summary.
  Visual timeline line connecting entries on the left.
  Click any entry → /journal/[entry]
```

### 6.6 Project Journal (/research/[project]/journal)

Purpose: Project-scoped view of the journal for visitors following a specific project.

- Same layout as global journal, pre-filtered to the project.
- Header includes project title and link back to project overview.
- Category filter remains available.
- "View Global Journal" link available for context.

### 6.7 Individual Journal Entry (/journal/[entry])

Purpose: Full reading experience for a single journal entry.

```
HEADER
  Date + Category badge + Project tag
  Entry title (H1)
  Summary (lead paragraph, styled distinctly)

BODY
  Full MDX content.

FOOTER
  ← Previous Entry  |  Next Entry →
  Link back to project
```

### 6.8 Publications (/publications)

Purpose: Final research outputs. Sparse at launch; grows over time.

- If no publications exist: a holding state that explains publications will appear here
  when research reaches the publication stage. Not a dead end — sets expectation.
- When publications exist: cards with title, status, abstract, download CTA, citation.

### 6.9 About (/about)

Purpose: Establish credibility and context. Answer: who is doing this and why.

```
SECTION 1: MISSION
  Full mission statement, large and prominent.

SECTION 2: RESEARCH FOCUS
  What problems this platform investigates.
  Current and future research areas.

SECTION 3: FOUNDER
  Joseph Hawley
  Cybersecurity Director, Business Information Security Partner
  Georgia Tech MS Cybersecurity (in progress)
  Brief bio emphasizing practitioner-researcher perspective.

SECTION 4: EXTERNAL LINKS
  JoeHawley.com
  LinkedIn
  Academic / conference context (if applicable)
```


---

## 7. Final Component Architecture

### Primitives (components/ui/)

```
Badge
  Props: label, variant (status | type | category | version)
  Variants drive color: status=active→green, status=draft→amber, etc.

Button
  Props: label, href, variant (primary | secondary | ghost), size
  Ghost variant for inline text links that need button affordance.

Card
  Base card with consistent padding, border, and hover state.
  No variant-specific logic — layout is handled by consuming components.

Divider
  Horizontal rule with optional label. Used between page sections.
```

### Layout (components/layout/)

```
Header
  Left: Tradecraft Labs wordmark (links to /)
        Mission subtitle (small, one line, always visible)
  Right: Nav (Research / Journal / About)
  Sticky on scroll with a subtle border appearing on scroll.

Footer
  Full mission statement (centered or left-aligned).
  Secondary links: JoeHawley.com · LinkedIn
  Copyright line.

Nav
  Four items: Research, Journal, About (wordmark is implicit Home)
  Active state: accent underline on current section.
  Mobile: hamburger → vertical drawer.

PageLayout
  Consistent max-width (e.g., max-w-4xl or max-w-5xl), horizontal padding.
  Used as a wrapper on every page.

BreadcrumbNav
  Renders trail: Research > [Project Title] > Artifacts > [Artifact Title]
  Truncates middle segments on mobile.

SidebarLayout
  Two-column (main + sidebar) on desktop, stacked on mobile.
  Used on artifact pages.
```

### Research (components/research/)

```
ResearchProgressTimeline
  Props: stages (ordered array), currentStage, variant ("full" | "compact")
  Full variant: labels visible, current stage highlighted + labeled "Current Stage"
  Compact variant: dots only, no labels (for listing cards)
  Reusable — accepts any ResearchStage value, renders correctly for any project

ResearchCard
  Project listing card.
  Contains: project number, title, status badge, compact timeline, question excerpt,
  artifact count, CTA.

ArtifactCard
  Title, artifact type badge, version badge, status indicator, description.
  Stub state: muted, no link, "Pending" label.
  Active state: links to artifact page, download button if available.

ArtifactGrid
  Groups ArtifactCards by category (Foundations / Analysis / Field Work / Writing).
  Category headings with artifact counts.

StatusBadge
  Thin pill. Color-coded: Active (green), Draft (amber), Published (blue),
  Planned (gray), Paused (gray).

ThesisBlock
  Callout-style block for working thesis display.
  Includes version label and "working thesis" qualifier.
  Visually distinct from body text — slight background tint, left border.

ResearchQuestion
  Large-type display. Italic or distinct weight. Clearly labeled.

WhyThisMatters
  Section component for research gap display.
  Accepts text content (from project researchGap field).
  Renders with appropriate heading and paragraph styling.

ProgressSummary
  Small metrics row: "Stage: Interviews · 9 Artifacts · 3 Interviews Completed"
```

### Journal (components/journal/)

```
JournalTimeline
  Vertical timeline with entries and a connecting line.
  Renders JournalEntry for each item.

JournalEntry
  Date (prominent, left or top), category badge, project tag, title, summary.
  Hover state shows full entry link.

JournalFilter
  Two filter groups: Category + Project.
  URL-driven state (query params) so filtered views are shareable.
```

### MDX (components/mdx/)

```
MDXComponents
  Custom renderers passed to Contentlayer's useMDXComponent.
  h1 → styled with Lora, appropriate sizing
  h2, h3 → hierarchical sizing
  blockquote → styled callout
  table → responsive with borders
  a → styled links with correct color

Callout
  variant: "insight" | "note" | "warning"
  Used within artifact MDX to highlight key findings or caveats.

KeyThemes
  Styled tag-cloud or list for rendering research theme lists.

ConceptualModel
  Visual representation of the Trust → Communication → Governance → Outcomes chain.
  Renders the emerging conceptual model from Research Insights in a structured layout.
```


---

## 8. Data Flow

```
/research/           — Source files (original .docx, .txt) — read-only, never deleted
/content/            — MDX with frontmatter — the web platform's content layer
     │
     │  Contentlayer processes at build time
     ▼
.contentlayer/generated/   — TypeScript types + JSON representations
     │
     │  lib/content.ts — typed query helpers
     │    getAllProjects()
     │    getProjectBySlug(slug)
     │    getArtifactsByProject(projectSlug)
     │    getAllJournalEntries()
     │    getJournalEntriesByProject(projectSlug)
     │    getAllPublications()
     ▼
Next.js page functions
  generateStaticParams() — all slugs known at build time
  async page()           — data fetched, passed to components as typed props
     │
     ▼
React components → HTML → Vercel CDN
```

Zero runtime server required. Every page is statically generated.
Adding content (a new journal entry, a new artifact) = Git commit → Vercel rebuild (~30s).


---

## 9. Design System

### Typography

```
Headings:   Lora (Google Fonts) — serif, academic register
Body:       Inter (Google Fonts) — clean, high legibility at all sizes
Mono:       JetBrains Mono — for any inline code or references
```

Type scale (Tailwind classes, configured in tailwind.config.ts):
```
Display:  text-4xl / font-lora / leading-tight   (hero, page titles)
H1:       text-3xl / font-lora
H2:       text-2xl / font-lora
H3:       text-xl  / font-lora
Body:     text-base / font-inter / leading-relaxed
Small:    text-sm  / font-inter
Label:    text-xs  / font-inter / tracking-wide / uppercase
```

### Color Palette

```
Background:    #FAFAF8   Warm white — not stark, comfortable for reading
Surface:       #F3F2EF   Slightly darker for cards and callout backgrounds
Text Primary:  #1A1A1A   Near-black — high contrast, not harsh
Text Muted:    #6B7280   For metadata, dates, supporting text
Accent:        #1E3A5F   Deep navy — primary brand color
Accent Light:  #E8EEF5   Tinted navy — backgrounds for callouts, thesis blocks

Status Colors (semantic only, not decorative):
  Active/Published:  #15803D  (green-700)
  Draft/Interviews:  #B45309  (amber-700)
  Planned/Paused:    #6B7280  (gray-500)
  Completed:         #1E3A5F  (navy — same as accent)
```

### Spacing

8pt grid. Generous section spacing (py-16 between homepage sections, py-12 minimum).
Research content needs white space — density is the enemy of academic readability.

### Motion

None except a subtle opacity fade on page load (100ms, opacity 0→1).
No scroll animations, parallax, or hover transforms on content.
Button and link hover states: color transition only (150ms).


---

## 10. Final MVP Implementation Roadmap

### Phase 0 — Project Initialization
Estimated effort: 2-3 hours

Tasks:
- Initialize Next.js 14 App Router project with TypeScript
- Install and configure Tailwind CSS + @tailwindcss/typography
- Install and configure Contentlayer
- Configure next.config.mjs with Contentlayer plugin
- Set up Google Fonts (Lora + Inter) via next/font
- Configure tailwind.config.ts with design tokens (colors, fonts, spacing)
- Write contentlayer.config.ts with all four schemas (Project, Artifact, Journal, Publication)
- Write lib/content.ts with all query helper functions
- Write lib/research-stages.ts with stage array, labels, and ordering logic
- Create full directory structure (app/, content/, components/, lib/, public/downloads/)
- Set up .gitignore (exclude .contentlayer/, node_modules/, .next/)
- Verify Contentlayer generates types successfully with empty content directories

Deliverable: A running Next.js app with correct configuration, typed content schemas,
and an established directory structure. No pages or components yet.

---

### Phase 1 — Design System + Primitive Components
Estimated effort: 1 day

Tasks:
- Build Badge component (all variants: status, type, category, version)
- Build Button component (primary, secondary, ghost)
- Build Card component (base only)
- Build Divider component
- Build Header (wordmark + mission subtitle + Nav)
- Build Footer (mission + links)
- Build Nav (Research / Journal / About with active state)
- Build PageLayout (max-width wrapper)
- Build BreadcrumbNav
- Build SidebarLayout
- Build root app/layout.tsx wiring Header, Footer, PageLayout, fonts, Plausible snippet
- Create placeholder pages for all routes (return null or a heading only — no 404s)

Deliverable: Every route resolves. The Header, Footer, and mission subtitle are visible
on every page. The design system is established. No content or research-specific
components yet.

---

### Phase 2 — Seed Content
Estimated effort: 2-3 hours

Tasks:
- Write content/projects/project-001-biso.mdx with full frontmatter
  (derived from research/project-001-biso/README.md and .txt files — no docx needed)
- Create stub artifact MDX files for all nine Project 001 artifacts
  (frontmatter only: title, type, version, status="stub", description — no body)
- Convert research/project-001-biso/insights/Research_Insights_v2.txt → MDX
  (structured plain text, light wrapping work only)
- Convert research/project-001-biso/insights/Research_Data.txt → MDX
- Convert research/project-001-biso/interviews/Interview_Analysis_Template_v1.txt → MDX
- Write first journal entry: content/journal/2026-06-23-platform-launch.mdx
- Verify Contentlayer generates all types without errors
- Verify query helpers return expected data

Deliverable: Real project data flowing through the content layer. Three artifact MDX
files with full body content. Six stub artifact files. One journal entry. All
Contentlayer types resolving correctly.

---

### Phase 3 — Homepage
Estimated effort: 1 day

Tasks:
- Build ResearchProgressTimeline (full and compact variants)
- Build WhyThisMatters component
- Build ThesisBlock component
- Build StatusBadge component
- Build JournalEntry component (for homepage preview)
- Build Homepage (app/page.tsx) with all five sections:
    Hero, Current Research, Research Progress Timeline,
    Why This Matters, From the Journal
- Wire to real Contentlayer data (featured project, latest journal entries)
- Verify all three orientation questions are answered within the first viewport

Deliverable: A fully functional homepage with real content, correct visual hierarchy,
and the Research Progress Timeline showing Project 001 at the Interviews stage.

---

### Phase 4 — Research Journal (Global + Project-Scoped)
Estimated effort: 1 day

Tasks:
- Build JournalTimeline component
- Build JournalFilter component (category + project filters, URL-driven)
- Build global journal page (app/journal/page.tsx)
- Build individual journal entry page (app/journal/[entry]/page.tsx)
- Build project-scoped journal page (app/research/[project]/journal/page.tsx)
  (same component, pre-filtered by project)
- Add ← Previous / Next → navigation on entry pages
- Wire all journal navigation: homepage → /journal, project page → project journal
- Write 2-3 additional journal entries to give the timeline meaningful content

Deliverable: A fully functional journal system with global and project-scoped views.
The journal is navigable from the homepage and from the project overview. Entries
render in full with MDX body content.

---

### Phase 5 — Research Project Pages + Artifact System
Estimated effort: 1-2 days

Tasks:
- Build ResearchQuestion component
- Build ProgressSummary component
- Build ArtifactCard (active and stub states)
- Build ArtifactGrid (grouped by category)
- Build ResearchCard (for research listing)
- Build project overview page (app/research/[project]/page.tsx)
  with all sections: header, timeline, question, thesis, artifact grid, journal preview
- Build research listing page (app/research/page.tsx)
- Build artifact listing page (app/research/[project]/artifacts/page.tsx)
- Build individual artifact page (app/research/[project]/artifacts/[artifact]/page.tsx)
  with SidebarLayout, MDX body rendering, related artifacts sidebar
- Build MDXComponents with custom renderers for all element types
- Build Callout, KeyThemes, ConceptualModel MDX components
- Test with the three full-body artifact files (insights, data, interview template)
- Verify stub artifacts show correctly with "Pending" state

Deliverable: The complete research project hub is functional. All nine artifacts are
accessible. Three have full body content; six are clearly marked as pending. The
artifact reading experience is complete with academic typography.

---

### Phase 6 — Publications + About + Polish
Estimated effort: 1 day

Tasks:
- Build PublicationCard and CitationBlock components
- Build publications page (app/publications/page.tsx)
  with appropriate holding state for pre-publication phase
- Build About page (app/about/page.tsx)
- Add PDF download infrastructure (public/downloads/ + download links in artifact pages)
- SEO: add generateMetadata to all pages (title, description, OG tags)
  Mission text as default meta description
- Accessibility: audit heading hierarchy, focus states, color contrast, alt text
- Mobile: full responsive review across all pages
- Performance: verify static generation on all routes, no unnecessary client components

Deliverable: Platform is complete and launch-ready. Every route is functional,
navigable, and correctly representing its content.

---

### Phase 7 — Content Completion (Post-Launch, Ongoing)
Estimated effort: 4-6 hours, spread over time as research progresses

Tasks:
- Convert biso-research-proposal.mdx from stub → full body (from .docx)
- Convert biso-literature-matrix.mdx from stub → full body (from .docx)
- Convert biso-annotated-bibliography.mdx from stub → full body (from .docx)
- Convert biso-interview-guide.mdx from stub → full body (from .docx)
- Convert biso-interview-pool.mdx from stub → full body (from .docx)
- Convert biso-paper-outline.mdx from stub → full body (from .docx)
- Generate PDFs from source documents and add to public/downloads/
- Update artifact statuses from "stub" to "active" as each conversion completes

Note: Each conversion is independent. They can be done one at a time as bandwidth
allows. The platform handles partial completion gracefully via the stub status system.

---

### Phase 8 — Post-Launch Enhancements (Future)

- Pagefind integration for full-text static search
- Research Journal RSS feed
- Citation copy-to-clipboard on PublicationCard and CitationBlock
- Research theme explorer / tag pages
- Interview statistics display (interview count, themes identified, etc.)
- Presentation archive
- Version history display on artifact pages (links to prior Git commits)
- Additional journal entries as interviews complete and analysis progresses


---

## 11. Open Questions Requiring Decisions Before Phase 0

These are the only items that cannot proceed without a response:

1. URL slug confirmation
   Proposed permanent URL for Project 001: /research/project-001-biso
   This appears in all inbound links and cannot be changed post-launch without
   breaking URLs. Confirm or specify an alternative.

2. PDF download strategy
   Two options:
   (a) Convert .docx source files to PDF during Phase 7 content work and serve from
       /public/downloads/ — keeps everything in the repo.
   (b) Upload PDFs to a separate location (Google Drive, etc.) and link externally.
   Recommendation: option (a). Keeps downloads versioned with the codebase.

3. Plausible hosting
   Plausible can be self-hosted (free, requires a server) or cloud-hosted ($9/month).
   For MVP, cloud-hosted is simpler and avoids infrastructure. Confirm preference.

4. Domain
   The Vercel deployment URL will be auto-generated (tradecraftlabs.vercel.app) until
   a custom domain is configured. Is a custom domain ready, or will the Vercel URL
   be used for the initial launch?


---

## 12. Revised Architectural Risks

### Risk 1 (Resolved) — Content conversion blocking skeleton
Resolved by the stub artifact system. The skeleton builds and all routes resolve
before any docx conversion is required.

### Risk 2 (Resolved) — Artifact versioning convention
Version lives in MDX frontmatter. Filenames are stable. Git history preserves
the evolution of each file. Resolved.

### Risk 3 (Resolved) — Stack selection
Stack is confirmed: Next.js App Router, TypeScript, Tailwind, Contentlayer,
Vercel. Resolved.

### Risk 4 (Active) — Research stage changes mid-project
The Research Progress Timeline hardcodes a 7-stage pipeline. If a future project
has a different number of stages (e.g., a shorter desk-research project with no
interviews), the component must accommodate it gracefully. Mitigation: the component
accepts the full stages array as a prop; a future project can define a custom stage
array in its content without modifying the component.

### Risk 5 (Active) — Journal entry volume at launch
The platform launches with one journal entry. This creates a sparse "From the Journal"
section on the homepage. Mitigation: write 3-4 backdated journal entries during Phase 4
documenting the research history to date (literature review completion, proposal
completion, start of interview phase). These are factually accurate, not fabricated —
they document events that already occurred.

### Risk 6 (Active) — Publications page at launch
The publications page will have no content at launch. A "dead end" page erodes trust.
Mitigation: a holding state that explains the publication is in progress, shows the
current research stage, and links to the draft paper artifact once it exists. This
frames the empty state as an invitation to follow along rather than a missing feature.


---

## 13. What the Platform Communicates on Launch

When the platform launches at the end of Phase 6:

A visitor who knows nothing about the research will land on the homepage and within
ten seconds understand: this is an independent research platform, it is studying how
the Business Information Security Officer role functions as a governance intermediary,
the research is currently in the practitioner interview phase, and they can read the
working proposal, follow the journal, and explore the analysis as it develops.

An academic reader will find a clearly articulated research question, a versioned
working thesis, an annotated bibliography, a literature matrix, and a developing
conceptual model — the intellectual scaffolding of a serious research project.

A practitioner will find research insights drawn from real practitioner observations,
case studies, and a governance-focused framing that speaks directly to their
professional experience.

An executive will find a concise thesis, clear research gap, and a growing body of
evidence about how organizations make better cybersecurity risk decisions.

A returning visitor will check the journal, see what has changed since their last
visit, and follow the research forward.

The platform will be ready to accept Project 002 without any structural modification.
A new project requires one new MDX file in content/projects/ and its associated
artifacts and journal entries. Every component, layout, and route handles it
automatically.
