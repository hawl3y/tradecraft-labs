# Phase 1 — Complete

## Files Created

### Library
| File | Purpose |
|---|---|
| `lib/site.ts` | Site-wide constants: name, mission (short + full), external links, year |

### UI Primitives (`components/ui/`)
| File | What it does |
|---|---|
| `Badge.tsx` | Semantic badge with 6 variants: `default`, `success`, `warning`, `info`, `neutral`, `muted` |
| `Button.tsx` | Dual-render component: `<button>` for click handlers, `<Link>` or `<a>` for navigation; 3 variants (primary, secondary, ghost), 2 sizes (sm, md) |
| `Card.tsx` | Base card container; polymorphic `as` prop (div/article/section/li); optional `hover` state |
| `Divider.tsx` | Horizontal rule with optional centered label |
| `index.ts` | Barrel export for clean imports from `@/components/ui` |

### Layout Components (`components/layout/`)
| File | What it does |
|---|---|
| `Nav.tsx` | **Client component.** Desktop inline nav + mobile hamburger with drawer. Active state via `usePathname()` with `aria-current="page"` |
| `Header.tsx` | Server component. Sticky top-0. Wordmark (Lora serif) + mission subtitle (hidden on xs, visible sm+) + Nav |
| `Footer.tsx` | Server component. Full mission statement, external links (JoeHawley.com, LinkedIn), copyright |
| `PageLayout.tsx` | Max-width wrapper with consistent padding. Three width variants: default (68rem), narrow (48rem, for reading pages), wide |
| `BreadcrumbNav.tsx` | Accessible breadcrumb: `<nav aria-label="Breadcrumb">` + `<ol>` list + `aria-current="page"` on last item |
| `SidebarLayout.tsx` | Two-column grid (main + sidebar). Stacks on mobile, side-by-side on desktop (lg+). Sidebar position configurable left/right |
| `index.ts` | Barrel export for clean imports from `@/components/layout` |

### Updated Files
| File | Change |
|---|---|
| `app/layout.tsx` | Wired Header + Footer into root layout; added OG metadata; body gets flex/min-h-screen classes |
| `app/page.tsx` | Updated to use PageLayout + Lora heading; labelled Phase 3 |
| `tsconfig.json` | Added `"baseUrl": "."` to resolve Contentlayer import alias warning |

### Route Stubs (`app/`)
All 10 routes resolve with correct breadcrumbs, page titles, and phase labels:

- `/research`
- `/research/[project]`
- `/research/[project]/artifacts`
- `/research/[project]/artifacts/[artifact]`
- `/research/[project]/journal`
- `/journal`
- `/journal/[entry]`
- `/publications`
- `/about`


---

## Components Created (11 total)

`Badge` · `Button` · `Card` · `Divider` · `Nav` · `Header` · `Footer` · `PageLayout` · `BreadcrumbNav` · `SidebarLayout` · *(plus 2 barrel index files)*


---

## Architectural Decisions Made

1. **`lib/site.ts` for all site-wide constants** — Mission text, links, and name are referenced by Header, Footer, and layout metadata from a single source. No string duplication.

2. **Nav is the only client component** — The rest of the layout tree is server components. Nav is the minimum required client boundary for `usePathname()`. The mobile drawer state lives here only.

3. **Button is a dual-render component** — Uses discriminated union types to render as `<button>` or `<Link>/<a>` depending on whether `href` is provided. This keeps call sites clean without needing a separate `ButtonLink` component.

4. **PageLayout applies at the page level, not in the root layout** — Allows full-bleed sections on the homepage (Phase 3) while keeping consistent padding on all other pages. The root layout only applies Header + Footer.

5. **Dynamic routes use async `params`** — All `[project]`, `[artifact]`, `[entry]` pages use `Promise<{ param: string }>` per Next.js 15 conventions. Established correctly in stubs so Phase 4/5 pages don't need to retrofit.

6. **Journal entry pages use `width="narrow"`** — Set in the stub now so the narrow reading width is correct from first content render in Phase 4.


---

## Rendered Layout Description

Every page now shows:

- **Header** (sticky): `TRADECRAFT LABS` in Lora serif, `Independent research on cybersecurity governance` subtitle (visible on sm+), nav links Research / Journal / About in Inter. Active page underlined in navy. Mobile: hamburger toggles a vertical drawer.
- **Body**: Warm white background (`#FAFAF8`), near-black text (`#1A1A1A`), Inter sans-serif.
- **Footer**: Full mission statement in small type, JoeHawley.com and LinkedIn as external links, © 2026 Tradecraft Labs.


---

## Blockers Encountered

**None.** The webpack cache warning from Phase 0 is still present (cosmetic, known contentlayer2 issue). The `baseUrl` warning from Contentlayer was resolved with a one-line tsconfig fix.


---

## Build Output

```
Route (app)                                      Size  First Load JS
┌ ○ /                                           134 B         102 kB
├ ○ /_not-found                                 998 B         103 kB
├ ○ /about                                      134 B         102 kB
├ ○ /journal                                    134 B         102 kB
├ ƒ /journal/[entry]                            172 B         106 kB
├ ○ /publications                               134 B         102 kB
├ ○ /research                                   134 B         102 kB
├ ƒ /research/[project]                         172 B         106 kB
├ ƒ /research/[project]/artifacts               172 B         106 kB
├ ƒ /research/[project]/artifacts/[artifact]    172 B         106 kB
└ ƒ /research/[project]/journal                 172 B         106 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```


---

## Next Phase

**Phase 2 — Seed Content** (awaiting approval)

Tasks:
- Write `content/projects/project-001-biso.mdx` with full frontmatter
- Create stub artifact MDX files for all nine Project 001 artifacts
- Convert `Research_Insights_v2.txt` → MDX (full body)
- Convert `Research_Data.txt` → MDX (full body)
- Convert `Interview_Analysis_Template_v1.txt` → MDX (full body)
- Write first journal entry: `content/journal/2026-06-23-platform-launch.mdx`
- Verify Contentlayer generates all types without errors
