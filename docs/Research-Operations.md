# Research Operations

## Purpose

This document defines the operational workflow for maintaining the Tradecraft Labs research platform.

The researcher focuses on conducting research.

Claude is responsible for determining how new research affects the platform, research artifacts, and published content.

The researcher should never need to decide where information belongs.

---

# Operating Principle

Research activities produce evidence.

Evidence produces analysis.

Analysis produces content updates.

Content updates produce platform updates.

Claude manages this workflow.

---

# Research Lifecycle

The platform follows this lifecycle.

Research Activity

↓

Analysis

↓

Recommended Changes

↓

Researcher Approval

↓

Platform Updates

↓

Git Commit

↓

Git Push

↓

Automatic Vercel Deployment

---

# Research Events

Every interaction falls into one of the following event types.

## Interview Completed

Examples:

* Interview conducted
* Recording completed
* Transcript received

Claude should:

* Store transcript
* Analyze transcript
* Extract themes
* Compare against existing findings
* Recommend platform updates

---

## Transcript Analysis

Examples:

* Transcript reviewed
* Coding complete
* Themes identified

Claude should determine whether findings require updates to:

* Research Data
* Research Insights
* Working Thesis
* Literature Discussion
* Journal
* Paper

---

## Research Insight

Examples:

* New governance pattern discovered
* Trust model refined
* Decision quality framework updated

Claude should determine whether:

* Existing insight changes
* New insight is created
* Thesis changes
* Conceptual model changes

---

## Thesis Revision

When the thesis changes:

Claude should:

* Update project metadata
* Update project overview
* Update research artifact
* Create journal entry documenting the change
* Identify paper sections requiring revision

---

## Paper Development

When the paper changes:

Claude should determine whether:

* Platform artifact changes
* Publication metadata changes
* Journal entry required

---

# Claude Decision Matrix

Every research event should automatically evaluate the following.

Research Data

Update?

Yes / No

Research Insights

Update?

Yes / No

Working Thesis

Update?

Yes / No

Journal

Create new entry?

Yes / No

Project Metadata

Update?

Yes / No

Paper

Update outline or findings?

Yes / No

Platform

Visible content changes?

Yes / No

---

# Required Output

After every research event Claude should produce a recommendation summary.

Example:

Research Event

Interview 03 Complete

Recommended Updates

✓ Research Data

✓ Research Insights

✓ Journal Entry

No Working Thesis Changes

No Project Metadata Changes

Paper Section 5 gains supporting evidence

Researcher Approval Required

---

# Researcher Responsibilities

The researcher should only:

* Conduct research
* Review recommendations
* Approve changes

The researcher should not decide:

* Which page to edit
* Which artifact to modify
* Which journal category to use
* Which metadata requires updating

Claude determines those changes.

---

# Journal Rules

Journal entries document research progress.

Claude determines the appropriate category.

Categories:

* Milestone
* Reflection
* Update
* Observation

The researcher should never manually select a category.

Journal entries must reflect real events.

Never fabricate dates.

Never fabricate progress.

---

# Artifact Rules

Artifacts represent the current state of the research.

Claude should recommend updates only when evidence materially changes the artifact.

Minor wording changes should be avoided.

Artifacts should evolve deliberately.

---

# Git Workflow

After approved updates:

1. Verify build

npm run build

2. Confirm no errors

3. Commit

Use an appropriate commit message.

Examples:

content: add interview 03 journal entry

content: refine working thesis to v3

content: update research insights from interview analysis

4. Push

git push origin main

Deployment occurs automatically.

---

# Research Ethics

Never publish:

* Participant identities
* Contact information
* Confidential organizational information
* Raw transcripts

Always anonymize practitioner examples.

---

# Guiding Principle

The researcher performs research.

Claude manages the research platform.

Every new piece of evidence should trigger analysis, recommendations, approval, publication, and deployment with minimal effort from the researcher.
