# aidam-portfolio

Personal site for Muhammad Kaila Aidam Riyan. Next.js 15, App Router, TypeScript
strict, Tailwind v4. Deployed on Vercel.

Planning docs live one directory up: `context.md`, `prd.md`, `content.md`,
`design-system.md`, `tech-plan.md`. They are the source of truth; this README
only covers how to run and extend the code.

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
pnpm lint
pnpm format
```

Requires pnpm 11 (`npm i -g pnpm`). `pnpm-workspace.yaml` holds the one pnpm
setting the project needs — this is not a monorepo.

## Where things live

```
src/
  app/          routes; globals.css holds the whole token layer
  components/   the wayfinding system: signs, badges, the route line, chrome
  content/      every user-visible string and every piece of data
  lib/          fonts, theme resolution, formatting
public/cv/      the CV PDF, linked as-is
```

**No content string belongs in a component.** If you are editing copy, you are
editing something under `src/content/`. Components take content as props or
import it from there; that rule is what makes a content update a one-file change.

## Design system, in short

Jakarta transit wayfinding. Two colour-coded lines — **Jalur Kerja** (work: W1,
A1, P1) and **Jalur Pribadi** (personal: O1, G1) — meeting at the home page.
Sections are stations with codes. A route line runs down the left of every page.

Graphite (`#1E2733`) is the **default** mode for every reader, not a dark mode.
The day platform sits behind the switch and is never reached by an OS
preference alone — see decision 10 below.

Radius means something: `0` on signs, panels and bands; `999px` on station
markers and route badges only. No shadows anywhere. One motion moment per
session: the route line drawing top to bottom in 600ms.

## Milestones

M0 bootstrap and shell · M1 content layer · M2 home · M3 /work and /academic ·
M4 /projects and case studies · M5 /documentation gallery · M6 guestbook ·
M7 SEO and a11y audit · M8 links and redirect. See `tech-plan.md` §7.

## Standing content rules

- **TERRA and Mantau are confidential while GEMASTIK judging is open.** No repo
  links, no stack, no architecture, no screenshots. The `Project` type carries
  `confidential: true` and the case-study template must branch on it rather than
  relying on the data being absent.
- **No grades anywhere on the site.** `/academic` lists course names and credits
  only.
- **No date of birth, phone number, student ID or advisor name.**
- Skills are tiered strictly by evidence: nothing sits above "learning" without
  a named project or role behind it.

## Decisions taken during M0

Recorded here because they are judgment calls that the planning docs did not
settle outright. Each is also commented at the point in the code where it bites.

1. **Next.js pinned to 15.5.25**, the latest 15.x. Next 16 is current upstream;
   the docs specify 15, so 15 it is.
2. **Header nav shows a name beside every code.** The desktop wireframe shows
   bare codes, but design-system.md's own rule — "every route has a code and a
   label next to it" — wins over the sketch. Five two-character codes are not
   navigable by a stranger.
3. **The active station badge is filled with `--marker`, not with its line
   colour.** Measured: 13px/700 text needs 4.5:1, and `--line-life-lt`
   (`#D9451F`) cannot reach it against any on-palette colour — white is 4.36:1,
   the day ink 4.10:1. `--marker` is the token the design doc reserves for "you
   are here", specified to take ink on top, and it measures 12.38:1 in graphite
   and 5.51:1 on the day platform. The badge keeps its route colour as the ring.
4. **The active station's name is underlined.** On the day platform the marker
   fill measures 2.83:1 against the ground, just under the 3:1 WCAG asks of a
   state indicator, so the state is not left to the fill alone.
5. **Interactive controls take a `--ink-2` border, not `--rule`.** `--rule` is
   1.57:1 on graphite, which is right for its documented job — hairline dividers
   between rows, which WCAG 1.4.11 does not govern — and wrong for the visible
   edge of a button.
6. **Footer links are a list, not a middot string**, per the "no `A · B · C`
   meta strings" rule, even though content.md §12 sketches them with middots.
7. **The route line is a scaled div, not an SVG path.** The shell's height is
   content-driven and unknown at render; `scaleY` draws identically without
   needing a path length up front.
8. **Fonts are not preloaded.** next/font emits no `<link rel="preload">` for
   App Router root-layout fonts in 15.5. With `display: swap` and the
   metric-matched fallback next/font generates, text paints immediately and
   nothing shifts, so this costs a shorter swap flash rather than LCP. Revisit
   at M7 against real Lighthouse numbers.
9. **Guestbook and gallery dependencies are not installed yet.** They arrive at
   M5 and M6 rather than sitting unused in the tree from M0.
10. **The OS colour preference is deliberately ignored.** design-system.md
    contradicts itself here — "Graphite is the primary mode … not a 'dark mode'
    toggle" against "for anyone who prefers it or has the OS set to light".
    Honouring the OS loses: `prefers-color-scheme: light` also matches readers
    who have expressed *no* preference, because `no-preference` was dropped from
    Media Queries Level 5 and matches in no shipping browser. Every headless
    Chromium, Lighthouse run and link-preview capture reports `light`, so the
    site's identity palette would be the one thing an audit never sees.
    Graphite is the default for everyone; the switch is how you leave it.
11. **`theme-color` is one tag, rewritten in JavaScript.** Media-scoped
    `theme-color` variants are chosen by the browser on the OS preference alone
    and never see `data-theme`, so picking the day platform on a dark OS left a
    graphite address bar over a light page for the whole session.
12. **The theme switch is removed by `<noscript>`, not disabled.** Without
    JavaScript it cannot work, and a focusable control that announces an action
    it will never perform is worse than no control.
13. **CV link withheld while GEMASTIK judging is open.** The PDF carries live
    TERRA and Mantau repo URLs, TERRA's stack breakdown, and a phone number the
    PRD keeps off the site. `CV.available` in `src/content/site.ts` restores it
    in one line.
