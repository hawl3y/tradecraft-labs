# Soft Launch Plan
**Version:** v0.1.0  
**Platform:** Tradecraft Labs  
**Objective:** Validate the platform with a small audience before broad distribution, collect actionable feedback, and establish a stable baseline before Phase 7 content expansion

---

## Launch Framing

Tradecraft Labs is launching as a **research-in-progress platform**, not a finished product. The soft launch posture should reflect this:

- Frame it as "documenting research as it happens"
- Stubs are visible — that is intentional, not a defect
- Visitors who understand academic research will recognize the structure (working papers, artifacts, journal)
- This is not a blog, portfolio, or consulting page — orient introductions accordingly

**What's live at launch:**
- Full platform infrastructure (9 artifacts, 1 journal entry, research progress)
- 3 fully active artifacts with substantive content
- Project thesis, research question, and gap statement published
- Platform explains itself (About, Research Focus, Researcher bio)

**What's not yet live:**
- 6 stub artifacts (Phase 7 content conversion)
- No published papers
- Journal depth comes over time

---

## Pre-Launch Sequence (Before Sharing with Anyone)

Complete these steps before sending the URL to any person:

1. **DNS resolved** — Production domain is live and HTTPS is active
2. **Production Validation Checklist complete** — All critical items checked off
3. **Environment variables confirmed** — `NEXT_PUBLIC_SITE_URL` points to production domain, not Vercel fallback
4. **Sitemap verified** — `/sitemap.xml` contains production URLs
5. **OG image verified** — Social card preview shows cream/navy design, correct title
6. **Plausible configured** — Dashboard is live, at least one confirmed page view
7. **Mobile check** — Homepage and one project page verified on mobile device
8. **Journal entry current** — Platform launch entry (2026-06-23) reads as accurate; no placeholder text visible

---

## Soft Launch Phases

### Phase A — Self-Review (Day 1)

Reviewer: Joseph Hawley

Walk the platform as an unfamiliar visitor would. Use Incognito mode.

**Navigation path to walk:**
1. Homepage — read the hero, scroll to Current Research, click "View Research →"
2. Project overview — read thesis, scroll research progress, click an active artifact
3. Active artifact — read content, use breadcrumb to return
4. Stub artifact — confirm "Content pending" message is not confusing
5. Journal — read the platform launch entry
6. About — read researcher bio; check LinkedIn link opens correctly
7. Publications — confirm empty state is professional, not alarming

**Check for:**
- [ ] No broken links
- [ ] No visible placeholder text ("Lorem ipsum", "TODO", "TBD" in visible copy)
- [ ] Stub artifacts look intentional, not broken
- [ ] Typography and spacing feel right on the monitor you'll primarily use
- [ ] The research question and thesis accurately represent current thinking

**Before proceeding:** Resolve any issues found. Don't share the URL until self-review is clean.

---

### Phase B — Trusted Technical Reviewer (Day 2–3)

**Audience:** 1–2 people who can evaluate technical quality and research presentation

**Profile:**
- A peer who understands academic research or research publishing
- Someone comfortable giving direct feedback on platform UX (not just "looks good")
- Optionally: a colleague who knows the BISO research topic

**How to share:**
> "I've built a research platform to document my Georgia Tech thesis work publicly as it progresses. I'd appreciate a first look before I share it more broadly — specifically: does it read as a legitimate research platform, and is anything confusing or off-putting about how the content is organized?"

**Feedback to collect:**
- Does the platform communicate what it is within 30 seconds?
- Is the stub artifact state confusing or does it feel intentional?
- Does the About page accurately represent the research?
- Any broken links, visual issues, or copy problems?

**Decision gate:** Address any structural or copy issues before Phase C. Do not proceed if the platform communicates the wrong message about the research or researcher.

---

### Phase C — Research Community (Days 4–10)

**Audience:** Cybersecurity practitioners, BISO community, security governance professionals

**Profile:**
- Working BISOs or security directors with governance responsibility
- Peers from Georgia Tech cybersecurity program
- Practitioners who follow academic-adjacent security research
- Security leadership LinkedIn network

**How to share:**

Write a short LinkedIn post (3–4 sentences max):

> "I've been conducting research on the BISO role as a governance intermediary for my Georgia Tech thesis. I built a platform to document the research publicly as it progresses — working theories, raw observations, and the analytical frameworks I'm using. It's at an early stage by design. [URL] Feedback welcome."

Or share directly via DM to individuals with:
> "Working on BISO governance research — documenting it at [URL] as it progresses. Would value your perspective on whether this work is relevant to what you're seeing in practice."

**Feedback to collect:**
- Does the research question resonate with practitioners?
- Is anything in the working thesis surprising or contentious?
- Are there practitioners who should be interview candidates?
- Does the platform feel credible or academic enough to share with colleagues?

---

### Phase D — Academic and Executive Audience (Days 10–21)

**Audience:** Academic researchers, faculty, and business/executive contacts

**Profile:**
- Georgia Tech faculty or thesis committee (if appropriate to share publicly)
- Academic researchers in security governance, organizational behavior, or boundary-spanning theory
- Executive-level contacts (CISO, CRO, board-level) who could validate the governance framing

**How to share:**
> "I've launched a research platform documenting my thesis on the BISO role as a governance intermediary. The platform publishes working artifacts and analysis as the research develops, rather than waiting for final publication. [URL]"

**Feedback to collect:**
- Is the academic framing (governance intermediary, boundary-spanning) presented credibly?
- Does the research gap statement resonate with the academic audience?
- Would this platform be useful to cite in future research?
- Any suggested literature or prior work that should be in the literature matrix?

---

### Phase E — Potential Interview Participants (Ongoing from Phase C)

**Audience:** Cybersecurity and business leaders who qualify for research interviews

**Qualification criteria:**
- Current or former BISO, security director, or VP of security with explicit business-facing responsibilities
- Business executive (COO, CFO, CRO, business unit head) with experience working with security governance functions
- Governance leader (GRC, audit, risk) with CISO or BISO touchpoints

**How to use the platform in outreach:**
> "I'm conducting research on the BISO role as a governance intermediary for my Georgia Tech thesis. I've documented the current work at [URL] — the research question, working thesis, and observations so far are all visible there. Would you be willing to participate in a 45–60 minute research interview?"

The platform serves as a credibility artifact: it shows the research is serious, structured, and being conducted rigorously. Linking to it in interview outreach replaces lengthy email explanations of the research scope.

**Interview artifact status:**
- Interview Guide (stub) — will be published in Phase 7
- Interview Analysis Template (active) — already visible for transparency
- Interview Pool (stub) — internal, will remain stub until published

---

## Risks to Monitor

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Stub artifacts perceived as broken or unprofessional | Medium | High | "Content pending" copy is intentional; if feedback indicates confusion, add a line to About explaining the publishing model |
| Research thesis challenged publicly | Low | Medium | The working thesis is explicitly labeled as working. Response: "This is v2 of a working thesis. The interview data will refine or refute this." |
| Plausible analytics blocked by ad blockers | High | Low | Most privacy-conscious researchers use ad blockers. Plausible is privacy-respecting and isn't blocked by most — acceptable loss |
| Vercel fallback domain visible in sharing (tradecraftlabs.vercel.app) | Medium | Low | Set custom domain before Phase C; verify `NEXT_PUBLIC_SITE_URL` resolves correctly in OG tags |
| LinkedIn post underperforms / no engagement | High | Low | Direct outreach to targeted practitioners is the primary channel; LinkedIn post is secondary |
| Interview participant finds site via organic search before direct outreach | Low | Positive | Preferred outcome — platform demonstrates credibility before any ask |

---

## Success Criteria

**Minimum bar to consider soft launch successful:**
- [ ] Platform resolves at production domain without errors
- [ ] At least 3 people from the research community visit and provide feedback
- [ ] No feedback indicates the platform communicates the wrong message (e.g., "this looks like a blog/portfolio/consulting page")
- [ ] At least 1 outreach to a potential interview participant uses the platform URL

**Stretch goals:**
- [ ] Platform surfaces as a credibility artifact in at least 3 interview-participant outreach conversations
- [ ] First inbound inquiry from someone who discovered the platform independently
- [ ] Feedback triggers at least one substantive content improvement before Phase 7

---

## Feedback Collection Method

**No forms needed for soft launch.** Collect feedback via:

1. **Direct conversation** — Ask for a call or async message. Observe what people focus on.
2. **LinkedIn DMs** — Note specific comments and questions
3. **Plausible analytics** — Monitor page paths, bounce from homepage, journal engagement
4. **Email** (`joechawley@gmail.com`) — Document any unsolicited inbound notes

**Document findings:**
After each phase, write a brief journal entry (or update the platform launch entry) summarizing what was learned. These observations are research artifacts.

---

## Post-Soft-Launch: Decision Points

After Phase C (research community):

| Signal | Action |
|---|---|
| Multiple visitors confused by stubs | Accelerate Phase 7 or add an explanation paragraph to About |
| Strong resonance with working thesis | Begin interview outreach more aggressively |
| No engagement | Evaluate whether LinkedIn post framing needs revision |
| Interview participants actively seeking | Schedule interviews, update journal, add entries documenting recruiting observations |
| Discovery of significant gaps in literature matrix | Create a journal entry on the discovery; accelerate Phase 7 Literature Matrix conversion |

---

## Timing Reference

| Phase | Timing | Gate |
|---|---|---|
| Pre-Launch Sequence | Day 0 | Checklist complete, DNS live |
| Phase A — Self-Review | Day 1 | No blocking issues found |
| Phase B — Trusted Reviewer | Days 2–3 | Reviewer confirms platform reads correctly |
| Phase C — Research Community | Days 4–10 | Structural issues resolved |
| Phase D — Academic/Executive | Days 10–21 | Post-Phase C feedback incorporated |
| Phase E — Interview Outreach | Ongoing from Day 4 | Running in parallel with Phases C/D |
| Phase 7 (Content Conversion) | After soft launch stabilizes | Explicit approval required |
