export type AccentColor =
  | 'slate'
  | 'blue'
  | 'sky'
  | 'indigo'
  | 'green'
  | 'teal'
  | 'red'
  | 'rose'
  | 'amber'
  | 'orange'
  | 'purple'
  | 'pink'

/** The two code-example sizes. Every real language ships both. */
export type ExampleVariant = 'minimal' | 'verbose'

/**
 * What the toggle is showing. `visual` is offered only by entries that define
 * a `visual` block, so the third button appears on those pages and nowhere else.
 */
export type ViewVariant = ExampleVariant | 'visual'

export interface AnnotationDef {
  id: string
  /** Short bold label, e.g. "Shebang" */
  title: string
  /** One-or-two sentence explanation shown on the callout card */
  body: string
  /**
   * In-depth writeup shown in the detail modal.
   * Paragraphs separated by blank lines ("\n\n"); `backticks` render as inline code.
   */
  details: string
  /**
   * Optional "Learn more" URL shown in the detail modal: a stable, authoritative
   * reference for this specific concept (official docs, MDN, cppreference,
   * Wikipedia…). Collected by `scripts/check-links.ts` for dead-link checking.
   */
  learnMore?: string
  color: AccentColor
  /** Which column the callout card sits in on desktop */
  side: 'left' | 'right'
}

/**
 * A run of consecutive source lines. Examples are built by concatenating
 * segments; line ranges for annotations are derived automatically, so data
 * files never hand-count line numbers.
 */
export interface ExampleSegment {
  /** Raw code lines (no trailing newline). `{ code: '' }` is one blank line. */
  code: string
  /** Ids of annotations this segment belongs to (a line may belong to several) */
  refs?: string[]
}

/* ── Visual templates ──────────────────────────────────────────────────────
 *
 * A `visual` block is DATA, never hand-drawn SVG: each panel names a template
 * and supplies its content, and the matching component under components/visual/
 * computes the geometry. That is what makes a template reusable, so adding a
 * diagram to a new entry is a data edit rather than a drawing exercise.
 *
 * Every element carries a `ref` naming the annotation it belongs to, exactly
 * like a code segment's `refs`, so hover, callout cards, and connector lines
 * all work unchanged.
 */

/** A labelled line inside a topology node (a matrix leg, an ordered step). */
export interface VisualNodeRow {
  label: string
  /** Annotation this row binds to; falls back to the node's own `ref`. */
  ref?: string
  /** Render a green tick, for rows that represent something that passed. */
  ok?: boolean
}

/** A box in a topology diagram. */
export interface VisualNode {
  id: string
  ref: string
  title: string
  sub?: string
  rows?: VisualNodeRow[]
  /** Render compact and rounded (an event chip) instead of a titled card. */
  pill?: boolean
}

/** A dashed container grouping nodes that live in the same place. */
export interface VisualZone {
  id: string
  label: string
  nodes: VisualNode[]
}

export interface VisualEdge {
  /** Node ids. */
  from: string
  to: string
  ref: string
  label?: string
  /**
   * Perpendicular offset for the route, so two edges between the same pair
   * (a push and a clone, say) do not draw on top of each other. Within one
   * zone it shifts the line sideways; between zones it shifts the anchors
   * up or down.
   */
  bow?: number
  /** Draw dashed, for a dependency that gates rather than moves something. */
  dashed?: boolean
}

/** Boxes in dashed zones, joined by labelled arrows. Answers "what lives where". */
export interface TopologyPanel {
  template: 'topology'
  caption?: string
  zones: VisualZone[]
  edges: VisualEdge[]
}

export interface GraphLane {
  id: string
  label: string
}

export interface GraphNode {
  id: string
  ref: string
  /** Lane id this node sits in. */
  lane: string
  /** Horizontal slot, 0-based; spacing is uniform. */
  col: number
  label?: string
  /** `merge` draws filled, `conflict` draws a warning ring. */
  kind?: 'commit' | 'merge' | 'conflict'
  /** Text above the node rather than below it. */
  above?: string
}

export interface GraphLink {
  from: string
  to: string
  ref: string
  label?: string
  /** Ends with an arrowhead (a merge back into a lane). */
  arrow?: boolean
}

/** Lanes and nodes with branch/merge curves. Answers "in what order". */
export interface GraphPanel {
  template: 'graph'
  caption?: string
  lanes: GraphLane[]
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface TimelineBar {
  id: string
  ref: string
  label: string
  /** Both in `unit`s along the axis. */
  start: number
  end: number
  /** Trailing note printed after the bar. */
  note?: string
}

export interface TimelineMarker {
  at: number
  ref: string
  label: string
}

/** Bars on a clock. Answers "what overlapped, and what waited". */
export interface TimelinePanel {
  template: 'timeline'
  caption?: string
  /** Axis length and the label suffix, e.g. 90 and "s". */
  max: number
  unit?: string
  bars: TimelineBar[]
  markers?: TimelineMarker[]
}

export type VisualPanelDef = TopologyPanel | GraphPanel | TimelinePanel

export interface VisualDef {
  /** Rendered top to bottom. Several templates can share one page. */
  panels: VisualPanelDef[]
}

export interface LanguageDef {
  id: string
  /** Display name, e.g. "Python" */
  name: string
  /**
   * 'language' entries (default) are real source files grouped under
   * "Languages"; 'concept' entries (e.g. a website's structure) are grouped
   * separately and drop the "file" noun from the title.
   */
  category?: 'language' | 'concept'
  /**
   * Sidebar sort key for the "Languages" group (ascending, lower = more
   * popular). Based on the TIOBE Index position (July 2026 snapshot). A few
   * entries TIOBE can't rank directly use a documented convention:
   *   · HTML/CSS take a decimal slot (6.1 / 6.2): TIOBE excludes markup, so
   *     they're placed by Stack Overflow usage instead of a TIOBE position.
   *   · TIOBE's 51-100 tier (bash…batch) has no intra-rank, so those numbers
   *     (51+) are ordered by rough real-world usage.
   *   · Languages outside TIOBE's top 100 (WebAssembly, Nim), and component
   *     file formats TIOBE does not track at all (Svelte), use 101+.
   * Concepts omit this and keep their curated array order in `data/index.ts`.
   */
  popularity?: number
  /** The highlighted word in the H1, e.g. "Python" -> "Anatomy of a Python file" */
  titleWord: string
  /**
   * The noun after the title word in the H1. Defaults to "file"
   * ("Anatomy of a Python file"); set to '' for concepts
   * ("Anatomy of a Website").
   */
  titleNoun?: string
  article: 'a' | 'an'
  extensions: string[]
  /** Hex color used for the highlighted title word and sidebar dot */
  accentHex: string
  /** Link to the language's official page (title word links here) */
  officialUrl: string
  /** Shiki grammar id, e.g. "python" | "bat" | "css" */
  shikiLang: string
  /** The NOTE box text at the bottom */
  note: string
  annotations: AnnotationDef[]
  /**
   * Code examples (per variant). Present for real languages. Omitted for
   * `mockup` concepts, which render a live UI instead of code.
   */
  examples?: Record<ExampleVariant, ExampleSegment[]>
  /**
   * When set, this entry renders a live UI mockup (not a code panel) and its
   * annotation `id`s must match the mockup's `data-region` ids. Used by
   * `concept` entries like a website, settings page, or mobile app.
   */
  mockup?: 'website' | 'settings' | 'mobileapp' | 'dashboard' | 'email'
  /**
   * Diagrams built from the reusable templates above. Presence of this block
   * is what adds the third "Visual" button to the toggle, so an entry opts in
   * simply by describing its diagram.
   */
  visual?: VisualDef
}

/**
 * The lightweight slice of a LanguageDef the sidebar and router need for EVERY
 * language: everything except the heavy `annotations` and `examples`, which load
 * on demand (see data/catalog.generated.ts + data/index.ts's loadLanguage()).
 */
export type LanguageMeta = Pick<
  LanguageDef,
  'id' | 'name' | 'category' | 'popularity' | 'accentHex' | 'extensions' | 'shikiLang'
>

/** An annotation with its computed 1-indexed inclusive line ranges. */
export type ResolvedAnnotation = AnnotationDef & {
  ranges: Array<[number, number]>
  /**
   * The column the card actually renders in. Derived from `side` by the
   * balancer in anatomy.ts, which prevents one column from ending up empty
   * when a variant only references annotations that prefer the same side.
   */
  column: 'left' | 'right'
}

/** A fully assembled example: code plus annotations resolved to line ranges. */
export interface ResolvedAnatomy {
  variant: ExampleVariant
  code: string
  lineCount: number
  annotations: ResolvedAnnotation[]
}
