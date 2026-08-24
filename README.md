<div align="center">

<a href="https://anatomyof.lunarwerx.com">
  <img src="app/public/og-image.png" alt="AnatomyOf: interactive, annotated tours of source files" width="720" />
</a>

<p><em>An interactive, annotated tour of what's inside a source file, one language at a time.</em></p>

<p>
  <a href="https://anatomyof.lunarwerx.com"><img src="https://img.shields.io/badge/live_demo-anatomyof.lunarwerx.com-38bdf8?style=for-the-badge&logo=github&logoColor=white" alt="Live demo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/LunarWerxs/anatomyof?style=for-the-badge&color=22c55e" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Vue_3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

</div>

---

AnatomyOf is a free, open-source web app that teaches programming language syntax through
interactively annotated source-code examples, pairing minimal and verbose code samples with
hover-and-click callouts that explain each structural part (imports, control flow, class
definitions) for dozens of languages, plus non-code concept pages like a website or a CI
pipeline.

**[AnatomyOf](https://anatomyof.lunarwerx.com)** opens an example source file in a code
window with color-coded callouts explaining every structural part: shebang, imports, class
definitions, control flow, and more. **Hover** a callout to trace it into the code; **click**
it for an in-depth writeup. Every language ships a **minimal** and a **verbose** example,
light & dark themes, and shareable URLs like
[`/#/python/verbose`](https://anatomyof.lunarwerx.com/#/python/verbose).

Beyond real languages, **concept pages** dissect the structural anatomy of a website, a
settings screen, a mobile app, a dashboard, an email, a CI pipeline, and a GitHub
contribution: the same idea, applied to things that aren't code.

## ✨ Highlights

- 🔬 **Dozens of languages, plus concept pages**: from Python and Rust to Ada, Prolog, COBOL, GML, and WebAssembly
- 🎨 **Color-coded callouts** wired to the exact lines they describe
- 🖱️ **Hover to trace, click to dive**: a full deep-dive modal per concept, with a *Learn more* link
- 🌗 **Light & dark themes**, and **fully mobile-responsive** (tap to pin a callout, tap again to open it)
- 🧭 **Sidebar ranked by real-world popularity** (TIOBE Index), toggleable to A-Z, with instant search
- ⚡ **Syntax highlighting by [Shiki](https://shiki.style)**. The same engine VS Code uses
- 🔗 **Deep-linkable URLs** for every language and variant
- 🥚 A few easter eggs hiding behind the code window's traffic-light buttons

## 🚀 Live

### → **[anatomyof.lunarwerx.com](https://anatomyof.lunarwerx.com)**

## 🛠️ Built with

**Bun** · **Vite** · **Vue 3** · **TypeScript** · **Tailwind CSS 4** · **Reka UI** · **Shiki** · **Biome**

## 🧑‍💻 Quick start / Develop

```sh
cd app
bun install
bun run dev      # http://localhost:5173
bun run build    # type-check + production build
bun run check    # biome lint/format + grammar/example checks
```

The live site is built and deployed by GitHub Actions in the companion
[anatomyof.github.io](https://github.com/AnatomyOf/anatomyof.github.io) repo, which builds
this repo's `app/` on a schedule and on demand.

## ➕ Adding a language

Everything is data-driven, one file per language in `app/src/data/`:

1. Create `app/src/data/<id>.ts` exporting a `LanguageDef`: metadata, an annotation
   catalog (card text + modal deep-dive), and two example variants built from
   **segments** (`{ code, refs }`). Line ranges are derived automatically, never
   hand-counted. For a non-language "concept" page, set `category: 'concept'` and
   `titleNoun: ''`.

   **Humor is part of the spec.** Every example must carry a little tasteful,
   language-specific coding humor: comical, ironic, or a nerdy in-joke/quote a
   dev of that language would appreciate (Zen of Python, Rust's borrow checker,
   Perl's write-only reputation, …). Put it **only** in comments and string/print
   literals, keep the code valid and still clearly teaching, and never rename an
   identifier that an annotation references. 2-5 touches per language.
2. Add the grammar import to `app/src/lib/highlighter.ts` (enforced by
   `scripts/check-grammars.ts`, which runs in `bun run build`/`check`).
3. Set a `popularity` rank on the `LanguageDef` and remove it from `comingSoon.ts` if
   applicable. Run `bun run gen:catalog` (also run automatically by `bun run build`) to
   regenerate the catalog and lazy-loader map. The sidebar's **Languages** group is sorted
   by `popularity` (TIOBE Index position; lower = higher up, with a documented convention
   for entries TIOBE can't rank). Concepts omit `popularity` and keep their curated order.

> Brand assets (favicon, social card, in-app mark) are all generated from
> `app/public/logo.svg` via `bun run scripts/gen-brand.ts`.

## 🖼️ Adding a Visual variant

Entries can carry a **third** toggle option next to *minimal* and *verbose*, showing
diagrams instead of code. The button appears only for entries that define a `visual`
block, so nothing needs to be greyed out anywhere else.

Diagrams are **data, never hand-drawn SVG**. Each panel names one of the reusable
templates in `app/src/lib/visual.ts`, which computes the geometry; the components under
`app/src/components/visual/` only draw what it returns. Adding a diagram to a new entry
is therefore a data edit, and a template gets reused by describing content rather than
redrawing it.

| Template   | Shape                                     | Answers                          |
| ---------- | ----------------------------------------- | -------------------------------- |
| `topology` | Boxes in dashed zones, labelled arrows    | *What lives where, and what moves it* |
| `graph`    | Lanes with branch/merge curves            | *In what order*                  |
| `timeline` | Bars on a clock                           | *What overlapped, and what waited* |

Every element carries a `ref` naming the annotation it belongs to, exactly like a code
segment's `refs`, so hover, callout cards, and connector lines work unchanged. One page
may stack several panels, and an annotation referenced by two of them highlights in both
at once. See `ci.ts` (topology + timeline) and `github.ts` (topology + graph).

An annotation may be referenced **only** by a diagram, in which case it appears on the
Visual tab and nowhere else. That is how `javascript.ts` documents the event loop without
inventing async code for its examples: the call stack and the two queues are runtime
facts, not syntax. `scripts/check-examples.ts` enforces both directions, that every
diagram `ref` resolves to a real annotation, and that no annotation is orphaned.

> `topology` suits things with a client/server split and does not generalize to a single
> source file; `graph` and `timeline` do, so they are the ones to reach for if the Visual
> tab ever grows past the concept pages.

**[docs/visual-variants.md](docs/visual-variants.md)** records the reasoning: which
entries earn a diagram and which do not, what was tried and rejected, the remaining
candidates with what each would cost, and the gotchas worth knowing before touching it.

## 🔒 Privacy

On page load the site sends one anonymous visit ping to LunarWerx's own endpoint
(`studio.connections.icu`): a random visitor id kept in `localStorage`, nothing else. No
cookies, no third-party trackers, no personal data; server-side it becomes a daily-uniques
count (with coarse country) that expires after 90 days. Browsers signaling
**Do Not Track** or **Global Privacy Control** are never pinged.

## 🆚 How it compares

AnatomyOf sits closest to **[Learn X in Y Minutes](https://learnxinyminutes.com)**, a free,
open-source, community-maintained catalog of language, framework, and tool overviews
under a CC BY-SA license, hosted on GitHub and open to pull requests. Both are free tours
across many languages with no account required. The formats differ: Learn X in Y Minutes
presents each language as a single commented code file, read top to bottom like an article.
AnatomyOf instead renders a code window with clickable, color-coded callouts tied to exact
lines, a separate deep-dive modal per concept, minimal and verbose variants, and light/dark
themes, and it extends that same annotated-tour format to non-code concepts (a CI pipeline,
a GitHub contribution) that a syntax-focused catalog doesn't cover. Compared with a
language's own official docs or tutorial, AnatomyOf is narrower in depth (it is not a full
reference) but consistent in presentation across every language it covers.

## ❓ FAQ

**Is AnatomyOf free?**
Yes. AnatomyOf is free and open source under the MIT License, with the full source on
GitHub. There is no account, sign-up, or paid tier: opening the site is the entire
onboarding, and anyone can fork or self-host it under the same license.

**Does it work offline?**
No. AnatomyOf is a client-side web app deployed to GitHub Pages with no service worker or
offline mode built in, so it needs an internet connection to load. You can run a local copy
with `bun install` and `bun run dev` (see Quick start, above) and use it on your own network
instead.

**What are the system requirements?**
None beyond a reasonably current desktop or mobile browser. AnatomyOf is a static Vue 3
single-page app with no installer, account, or backend to configure; the layout is fully
mobile-responsive, so a phone or tablet works as well as a laptop.

**How is it different from Learn X in Y Minutes?**
Both are free tours across many languages, but the format differs. Learn X in Y Minutes
presents each language as a single commented code file read top to bottom; AnatomyOf renders
a code window with clickable, color-coded callouts, a separate deep-dive modal per concept,
minimal and verbose variants, and light/dark themes.

**Is my data sent anywhere?**
Almost none. On page load AnatomyOf sends one anonymous visit ping (a random visitor id in
localStorage, plus a coarse country) to LunarWerx's own endpoint, with no cookies and no
third-party trackers. It expires after 90 days, and the ping is skipped entirely for
browsers signaling Do Not Track or Global Privacy Control.

**Which languages does it cover?**
Dozens, from mainstream ones like Python, Rust, and TypeScript to less common picks such as
Ada, Prolog, COBOL, GML, and WebAssembly, each ranked in the sidebar by real-world
popularity via the TIOBE Index (toggleable to A-Z). Concept pages extend the same format to
things that aren't code, like a CI pipeline or a GitHub contribution.

**Can I add a language myself?**
Yes. AnatomyOf is data-driven: adding a language means creating one `LanguageDef` file under
`app/src/data/`, with minimal and verbose code examples plus an annotation catalog, then
adding its grammar to the highlighter. See "Adding a language," above, for the full steps.

## 📄 License

[MIT](LICENSE) © [LunarWerx](https://lunarwerx.com): free to use, fork, and adapt.

<div align="center">
  <br />
  <a href="https://anatomyof.lunarwerx.com"><img src="app/public/apple-touch-icon.png" alt="AnatomyOf" width="48" /></a>
  <br /><br />
  <sub>Built by <a href="https://lunarwerx.com"><b>LunarWerx</b></a> · Deployed on GitHub Pages</sub>
  <br /><br />
  <sub>
    Made by <a href="https://lunarwerx.com"><b>LunarWerx Studios</b></a>. Also check out
    <a href="https://repoyeti.com">RepoYeti</a>,
    <a href="https://devwebui.lunarwerx.com">DevWebUI</a>, and
    <a href="https://quickdictate.lunarwerx.com">QuickDictate</a>.
  </sub>
</div>
