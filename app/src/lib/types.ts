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

export type ExampleVariant = 'minimal' | 'verbose'

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
   *   · Languages outside TIOBE's top 100 (WebAssembly, Nim) use 101+.
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
