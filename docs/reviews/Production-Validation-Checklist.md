# Production Validation Checklist
**Version:** v0.1.0  
**Platform:** Vercel  
**Use:** Run this checklist after each production deployment

Mark each item `[x]` when confirmed. Add the reviewer and date at the bottom of each section.

---

## Pre-Deployment

### Environment Variables

- [ ] `NEXT_PUBLIC_SITE_URL` is set to the production URL (e.g., `https://tradecraftlabs.com`)
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set to the registered domain (e.g., `tradecraftlabs.com`)
- [ ] No `.env` file is committed to the repository
- [ ] Both variables are confirmed in Vercel project → Settings → Environment Variables

### Repository State

- [ ] All changes are committed and pushed to the deployment branch (`main`)
- [ ] No uncommitted files that should be included in this release
- [ ] `docs/releases/v0.1.0.md` (or appropriate version) exists and is accurate
- [ ] `.gitignore` includes: `.env`, `.env.local`, `.next/`, `.contentlayer/`, `node_modules/`

### Build Verification (Local)

- [ ] `npm run build` completes with 0 errors
- [ ] `npm run build` output shows expected page count (currently: 24 routes)
- [ ] No TypeScript type errors: `npx tsc --noEmit`
- [ ] No Contentlayer schema warnings in build output
- [ ] OG image route (`/opengraph-image`) generates without font-loading errors

---

## Deployment

### Vercel Deployment

- [ ] Vercel deployment triggered (automatic via `main` branch push, or manual redeploy)
- [ ] Vercel build log shows no errors
- [ ] Vercel build log shows no warnings that could affect functionality
- [ ] Deployment preview URL resolves before promoting to production
- [ ] Production domain is aliased correctly in Vercel

---

## Post-Deployment: Core Pages

Verify each page loads correctly and without console errors.

### Static Pages

- [ ] `/` — Homepage loads with all 5 sections visible
- [ ] `/about` — About page loads with 4 sections
- [ ] `/research` — Research listing shows Project 001 card with stage label
- [ ] `/publications` — Shows empty-state holding content (not a 404 or error)
- [ ] `/journal` — Journal listing loads with filter controls

### Dynamic Pages

- [ ] `/research/project-001-biso` — Project overview loads with timeline, thesis, artifacts sidebar
- [ ] `/research/project-001-biso/artifacts` — Artifact listing loads with 4-group taxonomy
- [ ] `/research/project-001-biso/journal` — Project journal loads with correct entries
- [ ] `/journal/2026-06-23-platform-launch` — Individual journal entry loads correctly
- [ ] `/research/project-001-biso/artifacts/biso-research-insights` — Active artifact renders MDX body
- [ ] `/research/project-001-biso/artifacts/biso-research-proposal` — Stub artifact shows "Content pending" message (not a 404 or error)

### Infrastructure Routes

- [ ] `/robots.txt` — Accessible and contains `Sitemap:` with the production URL
- [ ] `/sitemap.xml` — Accessible and lists production URLs (not `localhost` or Vercel preview URLs)
- [ ] `/opengraph-image` — Returns a 1200×630 PNG image (not an error page)

---

## SEO Verification

### Meta Tags

Open browser DevTools → View Source (or inspector) on the homepage to verify:

- [ ] `<title>` is `Tradecraft Labs`
- [ ] `<meta name="description">` contains the site mission statement
- [ ] `<meta property="og:image">` points to the production domain (not localhost or preview)
- [ ] `<meta property="og:site_name">` is `Tradecraft Labs`
- [ ] `<meta name="twitter:card">` is `summary_large_image`

### Sitemap

- [ ] All 21+ content routes are present in `/sitemap.xml`
- [ ] URLs use the production domain (e.g., `https://tradecraftlabs.com/research/...`)
- [ ] No `localhost` or Vercel preview URLs appear in the sitemap

### robots.txt

- [ ] `Allow: /` is present (no routes are blocked)
- [ ] Sitemap URL points to the production domain

---

## Social Sharing Verification

### Twitter/X Card

Test at: [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

- [ ] `summary_large_image` card type displays
- [ ] OG image (1200×630 cream/navy design) renders in the preview
- [ ] Title and description are correct

### Open Graph (LinkedIn/Facebook)

Test at: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/) or LinkedIn Post Inspector

- [ ] OG image renders at correct dimensions
- [ ] Title is `Tradecraft Labs`
- [ ] Description is the site mission

### iMessage / Slack Link Preview

- [ ] Paste the production URL in a Slack message
- [ ] Preview card shows OG image, title, and description
- [ ] OG image is the cream/navy card (not a generic placeholder)

---

## Analytics Verification

**Prerequisite:** Domain must be registered in Plausible before verifying.

### Plausible Setup (First Deployment Only)

- [ ] Account created at plausible.io
- [ ] Domain `tradecraftlabs.com` (or production domain) added to Plausible
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var matches the Plausible-registered domain exactly
- [ ] Script appears in page source: `<script defer data-domain="..." src="https://plausible.io/js/script.js">`

### Live Verification

- [ ] Visit the production site (not in an ad-blocker-blocked browser)
- [ ] In Plausible dashboard, confirm the visit appears in real-time view within 30 seconds
- [ ] Navigate to 2-3 pages; confirm page views register in Plausible

### Development Isolation

- [ ] Confirm `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is NOT set in local `.env` (no analytics tracking during development)
- [ ] Dev server does not inject the Plausible `<script>` tag

---

## Mobile Verification

Test on actual device or Chrome DevTools mobile emulation (375px / iPhone SE baseline).

### Viewport

- [ ] Homepage hero text is readable at 375px (not overflowing)
- [ ] Navigation header is usable on mobile (hamburger or collapsed menu if applicable)
- [ ] Research cards do not overflow on small screens
- [ ] Artifact sidebar collapses to single-column on mobile
- [ ] Footer is readable and links are tappable

### Touch Targets

- [ ] All navigation links are at least 44×44px tap target
- [ ] Card "View →" links are easily tappable
- [ ] Skip-to-content link does not appear unexpectedly on mobile scroll

---

## Accessibility Verification

### Keyboard Navigation

- [ ] Tab from browser address bar to page: skip-to-content link appears visually (`Skip to main content`)
- [ ] Pressing Enter on skip-to-content moves focus to `<main>` content area
- [ ] All navigation links are keyboard-accessible in correct tab order
- [ ] No keyboard focus traps on any page

### Screen Reader (VoiceOver on macOS / NVDA on Windows)

- [ ] Homepage `<h1>` is announced as heading level 1 (mission statement)
- [ ] About page has `<h1>` "About Tradecraft Labs" (sr-only, still announced)
- [ ] Landmark regions are announced: `<header>`, `<main>`, `<footer>`, `<nav>`
- [ ] Stub artifact "Content pending" message is readable (not hidden from screen readers)

### Contrast (Spot Check)

- [ ] Muted text (`#5E6779`) on cream background (`#FAFAF8`) — 5.41:1 — passes WCAG AA
- [ ] Body text (`#1A1A1A`) on cream background — passes WCAG AAA
- [ ] Navy links (`#1E3A5F`) on cream background — passes WCAG AA

### Automated Scan (Optional)

Run `npx axe-cli <production-url>` or use the Axe browser extension:

- [ ] 0 critical violations on homepage
- [ ] 0 critical violations on a project page
- [ ] 0 critical violations on a journal entry page

---

## Performance Spot Check

Using Chrome Lighthouse or PageSpeed Insights:

- [ ] Homepage Lighthouse Performance score ≥ 90
- [ ] LCP (Largest Contentful Paint) ≤ 2.5s
- [ ] CLS (Cumulative Layout Shift) ≤ 0.1
- [ ] Fonts load without FOUT (flash of unstyled text) on fast connection

---

## Sign-Off

| Check | Reviewer | Date | Notes |
|---|---|---|---|
| Core pages verified | | | |
| SEO verified | | | |
| Social sharing verified | | | |
| Analytics verified | | | |
| Mobile verified | | | |
| Accessibility verified | | | |
| **Overall sign-off** | | | |

---

## Known Exceptions at v0.1.0

| Item | Status | Reason |
|---|---|---|
| 6 stub artifacts show "Content pending" | Expected | Phase 7 (content conversion) not yet complete |
| Publications page shows empty state | Expected | No papers submitted yet |
| Single journal entry | Expected | Journal grows as research progresses |
| Plausible not yet configured | Expected | Analytics configured after domain DNS resolves |
