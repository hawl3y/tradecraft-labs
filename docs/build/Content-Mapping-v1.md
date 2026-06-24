# Content Mapping — Project 001
> Produced 2026-06-23. Reviews how each existing research artifact maps into the platform content model.

---

## Section 1 — Project Metadata

Source: `research/project-001-biso/README.md`
Destination: `content/projects/project-001-biso.mdx`

| Frontmatter Field | Source Location | Value |
|---|---|---|
| `title` | README — Title | The Business Information Security Officer as a Governance Intermediary: Improving Cybersecurity Decision Quality Through Trust, Influence, and Risk-Based Decision Making |
| `slug` | Confirmed | `project-001-biso` |
| `projectNumber` | README | `001` |
| `status` | README — Status | `active` |
| `stage` | README — Stage | `interviews` |
| `researchQuestion` | README — Research Question | How does the Business Information Security Officer function as a governance intermediary and boundary-spanning leader to improve the quality of cybersecurity risk decisions between business and security stakeholders? |
| `workingThesis` | README + Insights v2 — Working Thesis (Version 2) | The BISO functions as a governance intermediary and boundary-spanning leadership role… (full text) |
| `thesisVersion` | Insights v2 filename | `2` |
| `researchGap` | Insights v2 — Emerging Research Gap section | Limited research examines how BISOs influence decision-making, improve governance, affect risk acceptance, or contribute to decision quality. (derived from gap section) |
| `methodology` | README + Proposal | `["Literature Review", "Practitioner Interviews", "Qualitative Analysis"]` |
| `startDate` | Estimated from artifacts | `2024-01-01` (earliest artifact is v1 — exact date unknown, to be updated by author) |
| `updatedDate` | Phase 2 creation date | `2026-06-23` |
| `tags` | Insights v2 — Practitioner Themes | `["governance", "biso", "trust", "decision-quality", "boundary-spanning", "risk-management", "cybersecurity-leadership"]` |
| `featured` | Platform logic | `true` |


---

## Section 2 — Artifact Mapping (9 artifacts)

| # | Source File | Format | MDX Slug | Artifact Type | Version | Phase 2 Status | Conversion Method |
|---|---|---|---|---|---|---|---|
| 1 | `proposal/Research_Proposal_v1.docx` | .docx | `biso-research-proposal` | `research-proposal` | 1 | **stub** | Phase 7 — docx → MDX |
| 2 | `literature/Literature_Matrix_v1.docx` | .docx | `biso-literature-matrix` | `literature-matrix` | 1 | **stub** | Phase 7 — docx → MDX |
| 3 | `literature/BISO_Annotated_Bibliography.docx` | .docx | `biso-annotated-bibliography` | `annotated-bibliography` | 1 | **stub** | Phase 7 — docx → MDX |
| 4 | `insights/Research_Insights_v2.txt` | .txt | `biso-research-insights` | `research-insights` | 2 | **full content** | Phase 2 — txt → MDX (light wrapping) |
| 5 | `insights/Research_Data.txt` | .txt | `biso-research-data` | `research-data` | 1 | **full content** | Phase 2 — txt → MDX (light wrapping) |
| 6 | `interviews/Interview_Guide_v1.docx` | .docx | `biso-interview-guide` | `interview-guide` | 1 | **stub** | Phase 7 — docx → MDX |
| 7 | `interviews/Interview_Pool_v1.docx` | .docx | `biso-interview-pool` | `interview-pool` | 1 | **stub** | Phase 7 — docx → MDX |
| 8 | `interviews/Interview_Analysis_Template_v1.txt` | .txt | `biso-interview-analysis` | `interview-analysis` | 1 | **full content** | Phase 2 — txt → MDX (light wrapping) |
| 9 | `paper/Paper_Outline_v1.docx` | .docx | `biso-paper-outline` | `paper-outline` | 1 | **stub** | Phase 7 — docx → MDX |

### Stub Artifact Descriptions
What appears in the UI before full conversion in Phase 7.

| Slug | Description for listing view |
|---|---|
| `biso-research-proposal` | Formal research proposal outlining the study's purpose, problem statement, research question, methodology, and significance. Includes theoretical framing and review of existing BISO literature. |
| `biso-literature-matrix` | Structured matrix mapping 15+ sources to the working thesis. Columns track core argument, support/challenge relationship, and connection to the BISO governance intermediary model. |
| `biso-annotated-bibliography` | Annotated bibliography of 15 selected sources spanning organizational theory, governance frameworks, cybersecurity leadership, and BISO-specific literature. Prepared for Georgia Tech MS Cybersecurity. |
| `biso-interview-guide` | Semi-structured interview guide for practitioner interviews. Five core questions covering security-business conflict, risk acceptance, trust, BISO value, and future governance. Includes role-specific follow-up prompts. |
| `biso-interview-pool` | Candidate pool of eight practitioner interview subjects representing executive technology leadership, cybersecurity leadership, GRC, security partnership, business leadership, and communications functions. |
| `biso-paper-outline` | Proposed structure for the final research paper. Covers introduction, literature review (seven sub-sections), conceptual framework, methodology, findings, discussion, and conclusion. |


---

## Section 3 — Journal Mapping

| Source | Journal Entry | Slug | Category | Notes |
|---|---|---|---|---|
| *(none — written fresh)* | Platform Launch and Research Status | `2026-06-23-platform-launch` | `milestone` | First entry. Documents platform launch, current research stage (Interviews), and what has been completed to date. Written in Phase 2. |

### Empty Directory Noted
`research/project-001-biso/journal/` exists but contains no files. This is the source directory for raw journal notes. As the research progresses, raw notes written here can be cleaned up and published as entries in `content/journal/`. The two directories serve different purposes — source notes vs. published platform entries.

### Recommended Additional Journal Entries
To be written in Phase 4 (not Phase 2), documenting prior milestones that already occurred.

| Proposed Slug | Category | Milestone Being Documented |
|---|---|---|
| `2024-Q4-research-initiated` | `milestone` | Research project initiated, research question formulated |
| `2025-Q1-literature-review-complete` | `milestone` | Literature review and annotated bibliography completed |
| `2025-Q2-proposal-complete` | `milestone` | Research proposal finalized |
| `2025-Q3-thesis-refined` | `reflection` | Working thesis updated from v1 to v2 — shift from communication framing to governance intermediary framing |
| `2026-Q1-interview-phase-begins` | `milestone` | Practitioner interview phase initiated |

These are factually accurate (events already occurred) and give the journal meaningful depth from day one.


---

## Section 4 — Publications Mapping

| Source | Publication | Status | Notes |
|---|---|---|---|
| `paper/Paper_Outline_v1.docx` | *(outline only — no publication entry yet)* | — | The paper is not yet in draft. No `content/publications/` entry is created in Phase 2. The publications page will show a holding state. |
| `paper/drafts/` | *(empty — future)* | — | When a draft is written, it becomes a `content/publications/` entry with `status: "draft"` |
| `paper/final/` | *(empty — future)* | — | Final submitted/published version |
| `paper/publications/` | *(empty — future)* | — | Published version with DOI, citation text, and download PDF |


---

## Section 5 — Empty Directories (Future Content Staging)

These directories exist in the source tree and have a defined future purpose.

| Directory | Purpose | When Content Appears |
|---|---|---|
| `interviews/transcripts/` | Raw interview transcripts as they are completed | After each practitioner interview |
| `interviews/analysis/` | Completed analyses using the Interview Analysis Template | After each transcript is reviewed |
| `research/project-001-biso/journal/` | Raw journal notes (source material, not published) | Ongoing — author's working notes |
| `assets/` | Images, diagrams, figures for the paper and platform | When conceptual model diagrams are created |


---

## Summary

| Content Type | Total | Phase 2 (full) | Phase 2 (stub) | Phase 7 (deferred) |
|---|---|---|---|---|
| Project metadata | 1 | 1 | — | — |
| Artifacts | 9 | 3 | 6 | 6 |
| Journal entries | 1 | 1 | — | — |
| Publications | 0 | 0 | — | — |

**3 artifacts get full body content in Phase 2** (the `.txt` files): Research Insights, Research Data, Interview Analysis Template.

**6 artifacts get stubs in Phase 2** (the `.docx` files): Research Proposal, Literature Matrix, Annotated Bibliography, Interview Guide, Interview Pool, Paper Outline.

**Publications directory stays empty** until a draft exists.
