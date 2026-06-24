# Tradecraft Labs — Implementation Plan

## 1. Repository Analysis Summary

### What exists
| Layer | Asset | Notes |
|---|---|---|
| Platform docs | PRD v1, Technical Architecture v1, Information Architecture v1, Design Principles | All four documents are internally consistent and detailed |
| Research | Project 001 (BISO) — proposal, literature matrix, annotated bibliography, insights, raw data, interview guide, interview pool, analysis template, paper outline | Active project, interview phase in progress |
| Structure | `/docs`, `/research/project-001-biso/{proposal,literature,insights,interviews,paper}` | Intentional; matches IA document |
| Code | None | Planning phase confirmed |

### Key constraints derived from documents
- Stack is pre-decided: Next.js + TypeScript + Tailwind + Vercel + MDX + GitHub
- Analytics: Plausible or Umami (privacy-first, no Google Analytics)
- No user accounts, forums, comments, paywalls, or AI chat features
- No hacker aesthetics — typography-led, academic-professional
- Must support multiple future research projects with zero architectural rework
- Every page answers: What is this? Why does it matter? What next?
- Research artifacts are versioned (v1, v2...) and that versioning is meaningful — it documents intellectual evolution

### Format problem to resolve immediately
All substantive research artifacts are `.docx` files. The platform's content model (MDX) requires plain-text source files. Converting `.docx` to `.mdx` is the first real task before any page can render real content. The `.txt` files (insights, raw data, interview template) are already in structured plain text and require light MDX wrapping only.


## 2. Architectural Risks & Missing Requirements

### Risk 1 — Content authoring workflow is undefined
The PRD says content is MDX but no authoring workflow is specified. Options: (a) hand-edit MDX files in the repo, (b) a headless CMS (Contentlayer, Sanity), (c) Git-based with a local MDX editor. Given the solo-researcher context and "research is the product" principle, direct MDX in the repo is the correct choice — it keeps the artifact evolution in Git history, which is itself a research artifact.

### Risk 2 — Artifact versioning semantics need a decision
The Technical Architecture doc says artifacts have a `version` field, but the current files use filename suffixes (`_v1`, `_v2`). The platform needs a canonical versioning convention. Recommendation: keep version in the MDX frontmatter; filenames stay stable (e.g., `research-insights.mdx` with `version: 2` in frontmatter). Previous versions can be preserved in Git history rather than as parallel files.

### Risk 3 — Research status model needs to be typed, not free-form
The PRD defines a status pipeline: `Concept → Literature Review → Proposal → Interviews → Analysis → Draft → Publication`. This must be a typed enum in the content model, not a free-form string, or filtering and status displays will break as projects are added.

### Risk 4 — No defined URL slug convention for multi-project scale
As more projects are added, URL collisions become possible. Recommendation: `/research/[project-slug]/` as the canonical prefix for all project content. Project 001 slug: `project-001-biso`.

### Risk 5 — Download/PDF strategy is unspecified
The PRD lists "downloads" as a feature. The `.docx` originals should not be served directly (format is not web-native). Recommendation: convert to PDF at publish time; store PDFs in `/public/downloads/` with a naming convention matching the content model.

### Risk 6 — Search scope vs. complexity tradeoff
The Technical Architecture calls for search across projects, artifacts, journal entries, and publications. Full-text search adds meaningful build complexity. For MVP, defer to static filtering by tags/status. Post-MVP: Pagefind (static site search, no server required) integrates with Next.js SSG perfectly.


## 3. Recommended Tech Stack

```
Framework:      Next.js 14+ (App Router)
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS + typography plugin
Content:        MDX via Contentlayer 2 (or next-mdx-remote for simpler setup)
Hosting:        Vercel (free tier sufficient for static/ISR)
Repo:           GitHub (content + code in same repo)
Analytics:      Plausible (self-hosted or cloud, privacy-first)
Fonts:          Inter (body) + Lora serif (headings — academic register)
PDF downloads:  Static files in /public/downloads/
Search (post-MVP): Pagefind
```

Why Contentlayer over a CMS: Zero external dependency, content lives in Git alongside code, version history IS the artifact version history, no API keys, free.


## 4. Content Model

### 4.1 Research Project

```typescript
// content/projects/project-001-biso.mdx (frontmatter)
{
  title: string               // full title
  slug: string                // "project-001-biso"
  status: ProjectStatus       // enum: see section 4.5
  stage: ResearchStage        // enum: see section 4.5
  researchQuestion: string
  workingThesis: string
  researchGap: string
  methodology: string[]       // ["Literature Review", "Practitioner Interviews", ...]
  startDate: string           // ISO date
  updatedDate: string         // ISO date
  tags: string[]
  artifacts: ArtifactRef[]    // references to artifact slugs
  downloads: DownloadRef[]
  featured: boolean
}
```

### 4.2 Artifact

```typescript
// content/artifacts/biso-research-insights.mdx
{
  title: string
  slug: string
  artifactType: ArtifactType  // enum: see section 4.5
  version: number             // 1, 2, 3...
  status: ArtifactStatus      // "draft" | "active" | "superseded" | "published"
  project: string             // project slug reference
  description: string
  createdDate: string
  updatedDate: string
  downloadUrl?: string        // path to PDF if available
  tags: string[]
}
// body = MDX content
```

### 4.3 Journal Entry

```typescript
// content/journal/2024-11-15-interview-phase-begins.mdx
{
  title: string
  slug: string
  date: string
  category: JournalCategory   // "milestone" | "reflection" | "update" | "observation"
  project: string             // project slug reference
  summary: string             // 1-2 sentence abstract
  tags: string[]
}
// body = MDX content
```

### 4.4 Publication

```typescript
// content/publications/biso-governance-intermediary-draft.mdx
{
  title: string
  slug: string
  authors: string[]
  publicationDate: string
  version: number
  status: "draft" | "submitted" | "published"
  abstract: string
  downloadUrl?: string
  citationText: string
  project: string
  tags: string[]
}
```

### 4.5 Enums

```typescript
type ProjectStatus = "active" | "completed" | "planned" | "paused"

type ResearchStage =
  | "concept"
  | "literature-review"
  | "proposal"
  | "interviews"
  | "analysis"
  | "draft"
  | "publication"

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
  | "journal-entry"
  | "presentation"

type JournalCategory = "milestone" | "reflection" | "update" | "observation"
```


## 5. File System Architecture

```
/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home
│   ├── research/
│   │   ├── page.tsx              # Research listing
│   │   └── [project]/
│   │       ├── page.tsx          # Project overview
│   │       ├── artifacts/
│   │       │   ├── page.tsx      # Artifact listing for project
│   │       │   └── [artifact]/
│   │       │       └── page.tsx  # Individual artifact
│   │       ├── journal/
│   │       │   ├── page.tsx      # Journal for project
│   │       │   └── [entry]/
│   │       │       └── page.tsx  # Journal entry
│   │       └── publications/
│   │           └── page.tsx      # Publications for project
│   ├── publications/
│   │   └── page.tsx              # All publications (cross-project)
│   └── about/
│       └── page.tsx
│
├── content/                      # MDX source files (Contentlayer reads here)
│   ├── projects/
│   │   └── project-001-biso.mdx
│   ├── artifacts/
│   │   ├── biso-research-proposal.mdx
│   │   ├── biso-literature-matrix.mdx
│   │   ├── biso-annotated-bibliography.mdx
│   │   ├── biso-research-insights.mdx
│   │   ├── biso-research-data.mdx
│   │   ├── biso-interview-guide.mdx
│   │   ├── biso-interview-pool.mdx
│   │   ├── biso-interview-analysis-template.mdx
│   │   └── biso-paper-outline.mdx
│   ├── journal/
│   │   └── (entries as created)
│   └── publications/
│       └── (papers as created)
│
├── research/                     # SOURCE ARTIFACTS (original files, unchanged)
│   └── project-001-biso/         # existing structure preserved
│
├── docs/                         # Platform docs (existing, unchanged)
│
├── components/
│   ├── ui/                       # Primitives: Button, Badge, Card, etc.
│   ├── research/                 # ResearchCard, ArtifactCard, StatusBadge, etc.
│   ├── layout/                   # Header, Footer, Nav, PageLayout
│   └── mdx/                      # MDXComponents (custom renderers)
│
├── lib/
│   ├── content.ts                # Contentlayer query helpers
│   ├── research-status.ts        # Stage pipeline logic
│   └── utils.ts
│
├── public/
│   └── downloads/                # PDF artifacts for download
│
├── contentlayer.config.ts
├── tailwind.config.ts
└── next.config.mjs
```

Key decision: The original `/research/` and `/docs/` directories stay exactly as they are. The new `/content/` directory holds MDX versions of the artifacts optimized for web rendering. This preserves the source artifacts while enabling the web platform.


## 6. Page Architecture

### 6.1 Home (/)
Purpose: Orient any visitor — academic, practitioner, or executive — within 10 seconds.

Sections:
1. Hero — Mission statement, one sentence. No hero image.
2. Current Research — Card for Project 001 with status pill, stage indicator, one-line thesis summary, and three CTAs: [View Research] [View Progress] [Read Proposal]
3. Research Themes — 4-6 thematic tags drawn from the active project (Governance, Trust, Decision Quality, etc.)
4. Latest Updates — 3 most recent journal entries with date + category

### 6.2 Research Listing (/research)
Purpose: Entry point for all research projects.

- Project cards with: title, status, stage pipeline visualization, research question excerpt, artifact count
- Filter by status (Active / Completed / Planned)
- Designed to show 1 project now, 5+ projects gracefully later

### 6.3 Project Overview (/research/[project])
Purpose: The authoritative hub for a single research project.

Sections:
1. Project header — title, status pill, stage pipeline (horizontal stepper showing current stage)
2. Research Question — prominent, large type
3. Working Thesis — current version, clearly marked as working/evolving
4. Research Gap — why this matters
5. Artifacts grid — all artifacts for this project, grouped by type, with version badges
6. Research Journal — timeline of recent entries
7. Progress metrics — stage completion, artifact count, interview count (when applicable)

### 6.4 Artifact (/research/[project]/artifacts/[artifact])
Purpose: Full display of a single research artifact.

- Artifact header: type badge, version number, status, dates
- Full MDX body rendered with academic typography
- Download link (PDF) when available
- Related artifacts sidebar
- "Part of [Project]" breadcrumb always visible

### 6.5 Journal (/research/[project]/journal)
Purpose: Show the evolution of research over time — the intellectual log.

- Chronological timeline of entries
- Category filters: milestone / reflection / update / observation
- Each entry: date, category badge, title, summary, link to full entry

### 6.6 Publications (/research/[project]/publications and /publications)
Purpose: Final research outputs, downloadable.

- Publication cards with: title, status (draft/submitted/published), abstract, download CTA, citation
- Designed to support multiple papers per project over time

### 6.7 About (/about)
Purpose: Establish credibility and context.

- Mission
- Founder bio (Joseph Hawley — Cybersecurity Director, Georgia Tech MS Cybersecurity, BISO practitioner)
- Research focus areas
- Links: JoeHawley.com, LinkedIn
- Speaking/academic context


## 7. Component Architecture

### Primitives (components/ui/)
```
Badge           — status pills, category tags, version labels
Card            — base card with variants (research, artifact, journal)
Button          — primary, secondary, ghost variants
Divider
Typography      — H1-H4, Body, Caption, Label (wraps Tailwind prose)
```

### Research-domain components (components/research/)
```
ResearchCard          — project listing card
ArtifactCard          — artifact with type, version, status, download
StagePipeline         — horizontal stepper showing research stages
StatusBadge           — colored pill: Active / Draft / Published
ArtifactGrid          — responsive grid of ArtifactCards
JournalTimeline       — chronological list with visual timeline line
ThesisBlock           — styled callout for working thesis display
ResearchQuestion      — large-type display for research question
ProgressSummary       — stage + artifact + interview counts
CitationBlock         — formatted citation with copy button
```

### Layout (components/layout/)
```
Header          — wordmark + minimal nav: Research / Publications / About
Footer          — mission tagline + links
PageLayout      — consistent page wrapper with max-width
BreadcrumbNav   — Research > Project > Artifact trail
SidebarLayout   — for artifact pages with related-content sidebar
```

### MDX components (components/mdx/)
```
MDXComponents   — custom renderers for h1-h4, blockquote, table, code
Callout         — insight/warning/note styled blocks
KeyThemes       — styled list for research themes
ConceptualModel — for the Trust → Communication → Governance → Outcomes model display
```


## 8. Data Flow

```
/research/ (source files)
    │
    │  (manual conversion, one-time per artifact)
    ▼
/content/ (MDX with frontmatter)
    │
    │  Contentlayer (at build time)
    ▼
.contentlayer/generated/ (TypeScript types + JSON)
    │
    │  lib/content.ts (query helpers)
    ▼
Next.js page components (generateStaticParams + async page functions)
    │
    │  Props passed to components
    ▼
React components → HTML
    │
    │  Vercel build → static output
    ▼
CDN-served pages
```

No server-side runtime needed for MVP. All pages are statically generated at build time. When a new journal entry or artifact is added, a Git push triggers a Vercel rebuild (seconds).


## 9. Design System Decisions

### Typography
- Headings: Lora (serif) — academic register, readable at all sizes
- Body: Inter (sans-serif) — modern, high legibility
- Code/mono: JetBrains Mono — for any inline references

### Color palette (anti-cliché)
- Not green-on-black, no lock icons, no hexagons
- Neutral base: warm white (#FAFAF8) background, dark ink (#1A1A1A) text
- One accent: deep navy (#1E3A5F) — professional, governance-appropriate
- Status colors: green/amber/blue for Active/Draft/Published — semantic only, not decorative

### Spacing
Generous whitespace throughout. Research content needs room to breathe.

### Motion
None beyond subtle fade-in on page load. No animations that distract from content.


## 10. Phased Implementation Roadmap

### Phase 0 — Content Preparation (before writing any code)
Estimated effort: 2-4 hours

1. Convert all .docx artifacts to MDX files under /content/artifacts/
2. Convert the .txt files (insights, raw data, interview template) to MDX
3. Write content/projects/project-001-biso.mdx with full frontmatter
4. Create contentlayer.config.ts with all schema definitions
5. Collect the research question, thesis, gap, methodology, and status from the README and documents

Deliverable: A /content/ directory with 9 artifact MDX files and 1 project MDX file.

---

### Phase 1 — Foundation (MVP skeleton)
Estimated effort: 1 day

- Initialize Next.js 14 App Router project with TypeScript + Tailwind
- Install and configure Contentlayer
- Implement contentlayer.config.ts (Project, Artifact, Journal, Publication schemas)
- Implement lib/content.ts query helpers
- Build Header, Footer, PageLayout
- Build design tokens (typography, color, spacing) in tailwind.config.ts
- Implement all primitive UI components (Badge, Card, Button, Typography)

Deliverable: Running app with no 404s, correct font/color system, no content yet.

---

### Phase 2 — Home + Research Listing
Estimated effort: 1 day

- Build Home page (/) with Hero, Current Research card, Research Themes, Latest Updates
- Build Research listing page (/research) with project cards and status filter
- Build ResearchCard, StagePipeline, StatusBadge components
- Wire Contentlayer data to both pages
- Verify Project 001 appears correctly

Deliverable: Home and research listing working with real content.

---

### Phase 3 — Project Hub + Artifacts
Estimated effort: 1-2 days

- Build Project overview page (/research/[project]) with all sections
- Build artifact listing page (/research/[project]/artifacts)
- Build individual artifact page (/research/[project]/artifacts/[artifact])
- Build ArtifactGrid, ArtifactCard, ThesisBlock, ResearchQuestion, ProgressSummary components
- Implement BreadcrumbNav
- Wire MDX rendering for artifact bodies
- Test with all 9 Project 001 artifacts

Deliverable: Full project hub and all nine BISO artifacts rendered and navigable.

---

### Phase 4 — Journal + Publications
Estimated effort: 1 day

- Build journal pages (/research/[project]/journal, /research/[project]/journal/[entry])
- Build publications pages
- Build JournalTimeline, CitationBlock components
- Write first journal entry documenting the platform launch and current research stage
- Wire all pages

Deliverable: Research journal functional; publications page ready for when draft paper exists.

---

### Phase 5 — About + Polish
Estimated effort: half day

- Build About page with mission, founder bio, external links
- Add PDF download infrastructure (/public/downloads/, download links in artifact pages)
- Implement Plausible analytics snippet
- Add Open Graph / SEO metadata to all pages
- Accessibility pass (contrast, focus states, semantic HTML)
- Mobile responsive review

Deliverable: Platform is launch-ready.

---

### Phase 6 — Post-Launch (not in MVP)
- Pagefind static search
- Research Journal RSS feed
- Citation copy-to-clipboard
- Research theme explorer / tag pages
- Interview statistics display (when interviews complete)
- Presentation archive


## 11. Recommended First Actions

In priority order:

1. Confirm tech stack — Next.js App Router + Contentlayer is the recommendation; if you prefer next-mdx-remote (simpler, less type-safe) or a headless CMS, decide now before Phase 1 begins.
2. Convert .docx files to MDX — This is the blocking dependency. Without it, no page can render real research content.
3. Decide on the PDF download strategy — Convert originals to PDF now, or defer until paper is submitted?
4. Confirm the URL slug — Proposed: project-001-biso. Confirm this is how you want the project identified in URLs permanently.
5. Confirm font choice — Lora + Inter is the recommendation. Easier to change before Phase 1 than after.


## 12. What the Platform Will Look Like When Complete

A visitor landing on the home page will immediately understand: this is an independent research initiative, currently studying the BISO role as a governance intermediary, the research is active and in the interview phase, and they can read the proposal, follow the journal, or explore artifacts. An academic reader can drill into the literature matrix and annotated bibliography. A practitioner can read the research insights and case studies in the research data. An executive can read the abstract and thesis. A hiring manager or conference organizer can see the rigor of the work and reach the founder's LinkedIn.

No feature has been added that isn't in the PRD. No architectural decision has been made that will require rework when Project 002 is added.
