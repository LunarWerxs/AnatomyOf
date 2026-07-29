<div align="center">

<a href="https://anatomyof.github.io">
  <img src="app/public/og-image.png" alt="AnatomyOf: interactive, annotated tours of source files" width="720" />
</a>

<p><em>An interactive, annotated tour of what's inside a source file, one language at a time.</em></p>

<p>
  <a href="https://anatomyof.github.io"><img src="https://img.shields.io/badge/live_demo-anatomyof.github.io-38bdf8?style=for-the-badge&logo=github&logoColor=white" alt="Live demo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/LunarWerxs/anatomyof?style=for-the-badge&color=22c55e" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Vue_3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

</div>

---

**[AnatomyOf](https://anatomyof.github.io)** opens an example source file in a code
window with color-coded callouts explaining every structural part: shebang, imports, class
definitions, control flow, and more. **Hover** a callout to trace it into the code; **click**
it for an in-depth writeup. Every language ships a **minimal** and a **verbose** example,
light & dark themes, and shareable URLs like
[`/#/python/verbose`](https://anatomyof.github.io/#/python/verbose).

Beyond real languages, **concept pages** dissect the structural anatomy of a website, a
settings screen, a mobile app, a dashboard, and an email: the same idea, applied to things
that aren't code.

## ✨ Highlights

- 🔬 **47 languages + 5 concept pages**: from Python and Rust to Ada, Prolog, COBOL, Svelte, and WebAssembly
- 🎨 **Color-coded callouts** wired to the exact lines they describe
- 🖱️ **Hover to trace, click to dive**: a full deep-dive modal per concept, with a *Learn more* link
- 🌗 **Light & dark themes**, and **fully mobile-responsive** (tap to pin a callout, tap again to open it)
- 🧭 **Sidebar ranked by real-world popularity** (TIOBE Index), toggleable to A-Z, with instant search
- ⚡ **Syntax highlighting by [Shiki](https://shiki.style)**. The same engine VS Code uses
- 🔗 **Deep-linkable URLs** for every language and variant
- 🥚 A few easter eggs hiding behind the code window's traffic-light buttons

## 🚀 Live

### → **[anatomyof.github.io](https://anatomyof.github.io)**

## 🛠️ Built with

**Bun** · **Vite** · **Vue 3** · **TypeScript** · **Tailwind CSS 4** · **Reka UI** · **Shiki** · **Biome**

## 🧑‍💻 Develop

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

## 🔒 Privacy

On page load the site sends one anonymous visit ping to LunarWerx's own endpoint
(`studio.connections.icu`): a random visitor id kept in `localStorage`, nothing else. No
cookies, no third-party trackers, no personal data; server-side it becomes a daily-uniques
count (with coarse country) that expires after 90 days. Browsers signaling
**Do Not Track** or **Global Privacy Control** are never pinged.

## 📄 License

[MIT](LICENSE) © [LunarWerx](https://lunarwerx.com): free to use, fork, and adapt.

<div align="center">
  <br />
  <a href="https://anatomyof.github.io"><img src="app/public/apple-touch-icon.png" alt="AnatomyOf" width="48" /></a>
  <br /><br />
  <sub>Built by <a href="https://lunarwerx.com"><b>LunarWerx</b></a> · Deployed on GitHub Pages</sub>
</div>
