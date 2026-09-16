# AnatomyOf

> A code window with clickable callouts explaining a language's syntax, or a non-code system like a CI pipeline.

<!-- odin:about HAND-OWNED above the GENERATED marker. Edit freely; `odin codex about --ingest` carries it back into Odin's Codex. -->

## What it is

AnatomyOf is a free, open-source web app that teaches programming-language syntax through interactively annotated source-code examples: a code window with color-coded callouts explaining every structural part (shebang, imports, class definitions, control flow), for dozens of languages plus non-code concept pages (a website, a CI pipeline, a GitHub contribution). Every entry ships minimal and verbose variants, light/dark themes, and deep-linkable URLs. It is entirely data-driven - each language or concept is one TypeScript file of annotation text and code segments - so adding coverage is a content edit, not new UI code.

## Things not to forget

_The intricacies worth remembering: the gotchas, the half-built parts, the decisions whose
reason lives nowhere else. Odin never overwrites this section._

- The whole site is data-driven: each language or concept is a single TypeScript file exporting a LanguageDef (metadata, annotation catalog, minimal/verbose code segments), so adding a new entry is a content edit, not a UI change. anchors: `app/src/lib/types.ts:194`
- The Visual diagram tab (topology/graph/timeline) is a deliberate partial rollout - live on only 7 of 55 entries - because most language pages were judged not to earn one; see docs/visual-variants.md for what was rejected before extending it further. anchors: `app/src/lib/visual.ts:85`
- The code window's macOS-style traffic-light buttons are easter eggs, not real window controls: green flips the concept mockup into a party-mode animation and red just shakes the window. anchors: `app/src/components/CodePanel.vue:29`
- Touch devices get a two-step tap-to-pin in place of hover: a first tap pins a callout and shows its connector line, a second tap opens the deep-dive modal - do not assume hover handlers alone cover mobile. anchors: `app/src/components/AnatomyView.vue:98`
- The Suggest-a-language form only opens a mailto: link and immediately marks itself done regardless of whether a mail client actually opened - on a browser/OS with none configured it silently fails with no visible fallback. anchors: `app/src/components/SuggestDialog.vue:40`
- The visit counter deliberately avoids third-party analytics: one fire-and-forget ping per session to LunarWerx's own endpoint with a random localStorage id and coarse country only, and it is skipped entirely for Do Not Track / Global Privacy Control browsers. anchors: `app/src/lib/analytics.ts:10`
- Shiki syntax highlighting is lazy-loaded per language and per theme, so the light-theme assets only download if a visitor actually triggers the light theme - keep new entries registered in highlighter.ts rather than bundling grammars eagerly. anchors: `app/src/lib/highlighter.ts:27`

<!-- odin:about GENERATED BEGIN - rewritten by `odin codex about --publish`; edit the Codex, not this -->

## What Odin knows about this project

Everything from here down is generated from this project's Codex dossier
(`codex/projects/anatomyof.md` in the Odin clone) and is **rewritten on every publish** -
edit the dossier, not this block. Everything ABOVE the marker is yours.

### At a glance

- **Ships as:** static site - Vue 3 SPA built with Vite/Bun, deployed to GitHub Pages by a companion repo (anatomyof.github.io) whose GitHub Actions build this repo's app/ on a schedule and on demand
- **Live at:** https://anatomyof.lunarwerx.com
- **Written in:** TypeScript (83 files), Vue (23 files), Python (1 files)
- **Built with:** Tailwind, TypeScript, Vite, Vitest, Vue
- **Tests:** 6 test file(s)
- **CI:** `ci.yml`, `trigger-pages.yml`
- **Domain:** programming languages, syntax reference, developer education, annotated code tours, TIOBE index, GitHub Pages
- **Remote:** https://github.com/LunarWerxs/AnatomyOf.git

### Architecture

- `app/src/data/` - one file per language or concept, each exporting a LanguageDef: metadata, annotation catalog, minimal/verbose code segments, and an optional Visual panel definition - this is the entire content of the site
- `app/src/lib/` - core logic: types.ts (the LanguageDef/AnnotationDef/Visual* schema), anatomy.ts (merges annotation ranges into code segments), highlighter.ts (lazy Shiki setup), visual.ts (computes topology/graph/timeline geometry from data), analytics.ts, chunk.ts (dynamic import helper)
- `app/src/components/` - Vue UI: AnatomyPage (variant routing), CodePanel/AnnotationCard/AnnotationDialog (callouts), AppSidebar (nav/search/theme), SuggestDialog, ConnectorLayer (hover trace lines)
- `app/src/components/visual/` - the three diagram renderers (TopologyDiagram, GraphDiagram, TimelineDiagram) that draw whatever visual.ts lays out - no per-entry drawing code
- `app/src/components/mockups/` - hand-built UI mockups (Website, Settings, MobileApp, Dashboard, Email) for the non-code concept pages that have no source to show
- `app/scripts/` - build-time content-integrity tooling: check-examples.ts (annotation/diagram ref consistency), check-grammars.ts (Shiki grammar coverage), check-links.ts (dead learnMore links), gen-catalog.ts (regenerates the lazy-loader catalog), gen-brand.ts, prerender.ts
- `scripts/` - scripts/run.py - a one-command local dev launcher (finds bun, installs deps, starts the Vite server, opens a browser)
- `docs/` - docs/visual-variants.md - design rationale for the Visual diagram tab: which entries earn one, what was rejected, remaining candidates

### Features

12 recorded - 12 shipped, 0 partial, 0 planned. Each `path:line` is where the feature is DEFINED, checked by `odin codex check`.

**Shipped**

- **Language anatomy pages** - Dozens of languages (Python to Ada, Prolog, COBOL, GML, WebAssembly) each get an annotated code window with color-coded callouts for every structural part, ranked in the sidebar by TIOBE popularity. - `app/src/lib/types.ts:194`, `app/src/data/index.ts:11`
- **Concept pages (non-code anatomy)** - The same annotated-tour format applied to things that aren't code: a website, a settings screen, a mobile app, a dashboard, an email, a CI pipeline, and a GitHub contribution flow, each with a live UI mockup instead of source. - `app/src/data/website.ts:5`, `app/src/data/ci.ts:6`, `app/src/components/MockupPanel.vue:10`
- **Hover-to-trace, click-to-deep-dive callouts** - Hovering a callout draws a connector line into the exact code lines it describes; clicking opens a full deep-dive modal with a Learn more link. - `app/src/components/AnnotationCard.vue:31`, `app/src/components/AnnotationDialog.vue:1`, `app/src/components/ConnectorLayer.vue:1`
- **Minimal / verbose / visual view toggle with deep-linkable URLs** - Every entry ships minimal and verbose code variants (a third Visual tab where defined), each reachable by a shareable URL like /#/python/verbose. - `app/src/components/AnatomyPage.vue:80`, `app/src/lib/types.ts:22`
- **Visual diagram tab (topology / graph / timeline)** - A data-driven third tab renders diagrams (client/server topology, branch/merge graphs, overlap timelines) from reusable templates instead of hand-drawn SVG; annotations can be shared between the code and diagram views. Live on 7 of 55 entries as of the design doc. - `app/src/lib/visual.ts:85`, `app/src/lib/types.ts:115`, `app/src/components/visual/TopologyDiagram.vue:1`
- **Sidebar search and popularity sort** - Instant name/extension filter over languages and concepts, toggleable between TIOBE-popularity order and A-Z, plus a Coming soon section for unimplemented entries. - `app/src/components/AppSidebar.vue:29`, `app/src/components/AppSidebar.vue:43`
- **Light / dark theme** - Persisted theme toggle (defaults dark) for the whole app and the code window. - `app/src/components/AppSidebar.vue:77`, `app/src/components/AppSidebar.vue:83`
- **Mobile-responsive layout with tap-to-pin callouts** - On touch devices a first tap pins a callout (showing its connector) and a second tap opens the deep-dive modal, replacing hover for devices with no pointer. - `app/src/components/AnatomyView.vue:98`, `app/src/components/AnatomyView.vue:112`
- **Shiki syntax highlighting** - Code is highlighted with Shiki, the same engine VS Code uses; languages and themes are lazy-loaded per page so the light theme only ever downloads if the traffic-light easter egg is used. - `app/src/lib/highlighter.ts:95`, `app/src/lib/highlighter.ts:27`
- **Traffic-light easter eggs** - The code window's macOS-style traffic-light buttons hide small jokes: green flips the concept mockup into a party-mode animation, red gives the window a playful shake. - `app/src/components/CodePanel.vue:29`, `app/src/components/CodePanel.vue:41`
- **Suggest a language or concept** - A form that opens the visitor's own email client with a pre-filled mailto to the maintainer - no backend or account needed to submit a request. - `app/src/components/SuggestDialog.vue:40`, `app/src/lib/suggest.ts:4`
- **Privacy-respecting visit counter** - One fire-and-forget anonymous ping per session to LunarWerx's own endpoint (random localStorage id, coarse country, no cookies, no third-party trackers, 90-day expiry); skipped entirely for Do Not Track / Global Privacy Control browsers. - `app/src/lib/analytics.ts:10`

### Where to add a new one

- **a new language or concept page** - add app/src/data/<id>.ts exporting a LanguageDef (metadata, annotation catalog, minimal/verbose example segments); register its Shiki grammar in highlighter.ts; set a popularity rank and run `bun run gen:catalog` to regenerate the lazy-loader map anchors: `app/src/lib/types.ts:194`, `app/src/lib/highlighter.ts:27`, `app/scripts/gen-catalog.ts:19`
- **a Visual diagram on an existing entry** - add a `visual` block to the LanguageDef naming a topology/graph/timeline template and its content; app/src/lib/visual.ts computes geometry, the components under app/src/components/visual/ only draw it - see docs/visual-variants.md for which entries earn one anchors: `app/src/lib/visual.ts:85`, `app/src/lib/types.ts:187`
- **a content-integrity check** - add a script under app/scripts/ wired into `bun run check`/`bun run build` (pattern: check-examples.ts validates annotation<->diagram ref consistency, check-grammars.ts validates highlighter imports, check-links.ts probes learnMore URLs) anchors: `app/scripts/check-examples.ts:3`, `app/scripts/check-grammars.ts:13`
- **a concept-page mockup** - add a component under app/src/components/mockups/ and wire it from MockupPanel.vue for a LanguageDef with `category: 'concept'` anchors: `app/src/components/MockupPanel.vue:10`

### Gaps and wants

_Withheld: this repository is public, and the gap list is not published outside the private index._
_Read it with `python odin.py codex brief anatomyof` in the Odin clone._

---

_Generated by `odin codex about --publish anatomyof` on 2026-09-16 from a Codex dossier stamped 2026-09-05. Regenerate after the product moves; `odin codex about` reports drift._
<!-- odin:about GENERATED END sha=c067aba4b101 -->
