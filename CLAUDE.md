# Tradecraft Labs — CLAUDE.md

## Operating Model

The operational workflow for conducting research, maintaining content, updating the platform, and managing deployments is defined in:

docs/Research-Operations.md

Always follow that workflow when processing new research or making platform updates.

---

## Purpose

Tradecraft Labs is an independent research platform for cybersecurity governance, leadership, and risk-informed decision making.

This is not a blog, portfolio, consulting site, or marketing website. It exists to:

- Publish research artifacts
- Track research progress
- Document the evolution of ideas
- Host draft and final research publications
- Support multiple future research projects

**Current project:** Project 001 — The Business Information Security Officer as a Governance Intermediary: Improving Cybersecurity Decision Quality Through Trust, Influence, and Risk-Based Decision Making

---

## Core Principles

1. Build a research platform, not a website.
2. Research is the product.
3. Research artifacts are first-class content.
4. Show the evolution of research, not only final outcomes.
5. Prioritize clarity, readability, and credibility.
6. Avoid cybersecurity clichés and hacker aesthetics.
7. Design for researchers, practitioners, executives, conference organizers, and students.
8. Future projects should require little or no architectural change.

---

## Technology Stack

- **Framework:** Next.js 15 App Router, TypeScript strict mode
- **Styling:** Tailwind CSS v3.4 with custom design tokens
- **Content:** Contentlayer2 + MDX
- **Hosting:** Vercel
- **Analytics:** Plausible (env-controlled)
- **Source control:** GitHub — https://github.com/hawl3y/tradecraft-labs
- **Deployment:** https://tradecraft-labs.vercel.app (Vercel subdomain until custom domain is configured)

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Controls `metadataBase`, sitemap URLs, and OG image domain display. Without it, all canonical URLs fall back to the Vercel subdomain. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain. If unset, no analytics script is injected. Platform functions normally without it. |

---

## Repository Structure

```
app/                    Next.js routes (do not add routes without understanding existing patterns)
components/             React component library
content/                Published MDX content — source of truth for what appears on the platform
  projects/
  artifacts/
  journal/
  publications/
docs/                   Platform documentation, release notes, review documents, build history
lib/                    Utility modules and shared logic
public/                 Static assets (OG image, downloads)
research/               Source research materials — READ ONLY (see Research Ethics below)
  project-001-biso/
    insights/
    interviews/
    literature/
    paper/
    proposal/
```

---

## Content Model

**Project** — A research initiative. Slug is permanent and used in all URLs.
Current: `project-001-biso`

**Artifact** — A research document. Can be `active` (full MDX content) or `stub` (placeholder — content pending conversion).

**JournalEntry** — A dated research update. Timestamped, categorized, linked to a project.

**Publication** — A submitted or published paper. Architecture is ready; no publications exist yet.

---

## Hard Rules

### Dates
- Never fabricate dates. If a date is unknown, use `"TBD"` in frontmatter.
- All date strings must be parsed with a `T00:00:00` suffix to prevent UTC midnight off-by-one errors in US timezones. Example: `new Date(dateString + 'T00:00:00')`.

### Source materials
- `/research/` files are read-only source artifacts. Do not modify them unless explicitly instructed.
- Do not convert `.docx` files to MDX unless explicitly asked to do so (Phase 7 work).
- Do not delete original source documents after conversion.

### URLs
- The `project-001-biso` slug is permanent. Do not rename it.
- Artifact slugs are permanent once published.

### Content
- Do not publish participant names, contact information, or identifiers.
- `Interview_Pool_v1.docx` is excluded from git by `.gitignore` and must remain excluded.
- The `biso-interview-pool.mdx` artifact stub is publishable — it contains no participant data.
- Always anonymize practitioner examples in research data artifacts.

### Git
- `npm run build` must pass with 0 errors before any commit.
- Never commit `.env`, `.env.local`, or `.claude/`.

---

## Technical Constraints

These are non-obvious issues discovered during the build. Do not re-introduce them.

**OG image fonts:** Satori (used by `next/og` ImageResponse) requires TTF or OTF font files. Google Fonts CDN serves WOFF/WOFF2, which Satori rejects with `[Error: Unsupported OpenType signature]`. The current OG image uses system Georgia. If adding a custom font to the OG image, load it via `readFileSync` from a local TTF file in `public/`.

**Journal filter and `useSearchParams`:** The `/journal` page uses a server-props pattern — the server page reads `searchParams` and passes `currentCategory`/`currentProject` as props to the client filter component. Do not refactor this to use `useSearchParams` directly without adding a Suspense boundary.

**Async params (Next.js 15):** Dynamic route params are typed as `Promise<{...}>` and must be awaited before use: `const { project } = await params`. This applies to all `[project]`, `[artifact]`, and `[entry]` route segments.

---

## Workflows

### New Interview Completed

1. Store transcript in `research/project-001-biso/interviews/transcripts/` (create directory if needed)
2. Create analysis document in `research/project-001-biso/interviews/analysis/`
3. Extract: themes, notable quotes, evidence supporting or challenging the working thesis, new research directions
4. Update `content/artifacts/biso-research-insights.mdx` only if findings materially affect existing working theories
5. Create a new journal entry (see below)

Do not include any participant-identifying information in any published content.

### New Journal Entry

Create: `content/journal/YYYY-MM-DD-slug.mdx`

Required frontmatter fields:
- `title`
- `date` (accurate — never fabricated)
- `category`
- `summary`
- `project`

Journal entries must reflect real events. They document what was learned, emerging themes, and research progress.

### Converting a Stub Artifact (Phase 7)

1. Identify source document in `research/project-001-biso/`
2. Convert content to MDX, preserving structure and meaning
3. Update the existing MDX file in `content/artifacts/`
4. Change `status: "stub"` to `status: "active"`
5. Increment version if content is materially different from the stub description
6. Do not delete the source document

**Exception:** `biso-interview-pool.mdx` should not be converted to active if it would require publishing participant names. If converting, publish only aggregate structure (e.g., number of participants, functional perspectives) without identifying information.

---

## Git Workflow

### Commit types

```
content:    New or updated MDX content
feat:       New platform feature or component
fix:        Bug or visual correction
docs:       Documentation changes
config:     Configuration changes
chore:      Maintenance, dependency updates, .gitignore changes
```

### Before every commit

```bash
npm run build     # must pass with 0 errors
```

### Release process

1. Update `docs/releases/vX.Y.Z.md`
2. Run `npm run build`
3. Commit and push to `main`
4. Tag the release: `git tag -a vX.Y.Z -m "Description"`
5. Push tag: `git push origin vX.Y.Z`
6. Run `docs/reviews/Production-Validation-Checklist.md`

### Versioning

```
v0.1.0    Initial platform release (current)
v0.2.0    Phase 7 complete — all artifacts converted
v0.3.0    First paper submitted
v1.0.0    First paper published
```

---

## Deployment

Vercel auto-deploys on push to `main`. No manual deployment step required.

### Before pushing

- Build passes locally
- No placeholder text visible on any page
- No sensitive data in any committed file
- `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel environment variables

### After deploying

Verify these routes load correctly:

- `/` — Homepage
- `/research` — Research listing
- `/research/project-001-biso` — Project overview
- `/journal` — Journal
- `/about` — About
- `/robots.txt` — Must contain production domain, not localhost
- `/sitemap.xml` — Must contain production domain, not localhost
- `/opengraph-image` — Must return a 1200×630 PNG

Full checklist: `docs/reviews/Production-Validation-Checklist.md`

---

## Research Ethics

Never publish:

- Participant names, roles, or organizational affiliations
- Participant contact information
- Internal company details from interviews
- Confidential organizational data
- Any content that could identify an interview participant

`Interview_Pool_v1.docx` must remain excluded from source control. It is in `.gitignore` as `research/**/Interview_Pool*.docx`.

When documenting practitioner observations, use only anonymized, generalized descriptions. The three case studies in `biso-research-data.mdx` are the established model — no names, no organizations, no identifying details.

---

## Accessibility

Maintain:

- Semantic HTML — `<main>`, `<header>`, `<footer>`, `<nav>` landmarks in place
- Skip-to-content link targeting `<main id="main-content" tabIndex={-1}>`
- Correct heading hierarchy on every page (each page must have exactly one `<h1>`)
- Muted text color `#5E6779` — minimum 5.41:1 contrast on `#FAFAF8` background
- WCAG AA compliance at minimum

Do not remove accessibility features.

---

## Design Tokens

```
background:  #FAFAF8   (cream — page background)
surface:     #F3F2EF   (off-white — card/section backgrounds)
ink:         #1A1A1A   (near-black — primary text)
muted:       #5E6779   (medium gray — secondary text, 5.41:1 contrast)
navy:        #1E3A5F   (deep navy — headings, links, accents)
navy-light:  #E8EEF5   (tint — navy-tinted backgrounds)

font-serif:  Lora      (headings, display, theses, callouts)
font-sans:   Inter     (body, UI, labels)
font-mono:   JetBrains Mono (code, citations)
```

---

## Future Projects

Add new projects by following the same structure:

```
research/project-002-*/     Source materials
content/projects/           New project MDX
content/artifacts/          New artifact MDX files
content/journal/            Journal entries referencing new project
```

All platform components, routes, and content types support multiple projects automatically. No architectural changes are required.
