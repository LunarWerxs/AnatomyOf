# Visual variants: design notes

Why the third tab exists, how the templates were chosen, and which entries are still
worth doing. The *how-to* lives in the README; this is the *why*, written down so the
next pass does not relitigate it.

Status as of August 2026: 7 of 55 entries have a Visual tab.

## The problem it solves

The code panel answers "what is this line?" extremely well and cannot answer three
other questions at all:

- **Where does this live?** (a fork is on GitHub, a clone is on your disk)
- **In what order does it happen?** (a SQL query does not run top to bottom)
- **What overlapped, and what waited?** (a matrix is three machines at once)

Those are the only cases that earn a diagram. If the answer is already legible in the
code, a picture of the code is decoration.

## The three templates

| Template   | Shape                                  | The question it answers      |
| ---------- | -------------------------------------- | ---------------------------- |
| `topology` | Boxes in dashed zones, labelled arrows | Where does it live           |
| `graph`    | Lanes with branch/merge curves         | In what order                |
| `timeline` | Bars on a clock                        | What overlapped, what waited |

## Decisions

**Diagrams are data, not hand-drawn SVG.** Each panel names a template and supplies
content; `app/src/lib/visual.ts` computes the geometry and the components under
`app/src/components/visual/` only draw. This was the whole point of the exercise: three
one-off drawings would have been faster to ship and worthless on the fourth entry.
Adding a diagram is now a data edit.

**`topology` does not generalize, and that is fine.** It suits things with a real
client/server or process boundary. There is no topology in a Python file, so most
language pages will never use it. `graph` and `timeline` do generalize, because every
language has ordering and overlap. When extending the Visual tab to more entries, reach
for those two first.

**An annotation may be Visual-only.** `javascript.ts` documents the event loop with five
annotations (call stack, async APIs, the two queues, the rule) that no example
references. The alternative was bolting async code onto its code examples purely to
justify the annotations, which would have made the code variants worse in order to serve
the diagram. Runtime facts are not syntax, so they appear on the Visual tab and nowhere
else. `scripts/check-examples.ts` enforces both directions: every diagram `ref` must
resolve, and no annotation may be orphaned.

**The "annotated product screenshot" direction was rejected as a variant.** A mocked-up
GitHub pull request page reviewed well and is the cheapest thing to build, since the
`mockup` mechanism already exists. It was dropped because it duplicates what a
screenshot does and stops dead at the network boundary: it cannot show anything
happening on your own machine. It remains a good idea as its own *concept entry* (an
"Anatomy of a pull request page" alongside Website and Settings Page), not as a third
tab on an existing one.

**Panels stack, and annotations are shared across them.** A page may carry several
templates, and an annotation referenced by two panels highlights in both at once.
Hovering *matrix* on the CI page lights the three matrix rows in the topology and the
three bars in the timeline. This is worth preserving: it is what makes two panels read
as one explanation rather than two pictures.

## Where it stands

| Entry        | Panels               | The lesson                                          |
| ------------ | -------------------- | --------------------------------------------------- |
| `ci`         | topology + timeline  | Triggers fan out to jobs; `needs:` gates the deploy  |
| `github`     | topology + graph     | Fork vs clone; a branch diverging and merging back   |
| `sql`        | topology             | Written order is not execution order                 |
| `wasm`       | topology             | A sealed module with declared doors; a stack machine |
| `bash`       | topology             | One line, three programs, two pieces of plumbing     |
| `rust`       | timeline             | Borrows are about time, and may not overlap          |
| `javascript` | topology + timeline  | One thread, two queues, and a rule                   |

`graph` is currently used by one entry. It is the least exercised template and the most
likely to need adjustment when a second entry adopts it.

## Candidates, and what each would cost

Worth doing, data-only, binds to annotations that already exist:

- **Elixir / Erlang**: process-and-mailbox topology. The best remaining candidate.
- **Solidity**: transaction lifecycle: wallet, mempool, block, state.
- **PHP**: request lifecycle across the browser/server boundary.

Worth doing, but needs new annotations first (as JavaScript did):

- **C**: the build pipeline (preprocessor, compiler, assembler, linker). Considered and
  deliberately deferred: unlike JavaScript's event loop, the stages are toolchain
  concepts rather than facts about the language, so the annotations would be inventions
  rather than descriptions. Revisit only if the Visual tab becomes a headline feature.

Not worth doing:

- The five mockup concepts (`website`, `settings`, `mobileapp`, `dashboard`, `email`)
  already render a live UI and have no code tabs. Nothing to add.
- Most language pages. A page with no ordering, overlap, or boundary story should simply
  not have the tab, and the toggle already hides it automatically.

## Gotchas

**The toggle's handler validates against `options`, not a hard-coded list.** It shipped
once filtering emits against a literal `('minimal' | 'verbose')` pair, which silently
dropped `'visual'`: the button rendered, highlighted on hover, and did nothing. Loading
`/#/<id>/visual` directly worked the entire time, which is exactly why testing missed
it. If a fourth view is ever added, test the *control*, not the URL it produces.

**`context-stroke` colours the arrowheads.** One marker is shared by every arrow and
inherits each path's own stroke, so accents come from `accents.ts` rather than a second
palette. Marker ids must stay unique per template (`vt-arrow`, `vg-arrow`) since all
SVGs share one document.

**Diagram-heavy pages are tall.** `topology` grows with node count, and stacked nodes
joined by an arrow reserve a large gap for the label. Roughly four nodes per zone is the
comfortable ceiling; past that, reach for `timeline` instead.
