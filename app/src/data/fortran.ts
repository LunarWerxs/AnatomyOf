import type { LanguageDef } from '../lib/types'

export const fortran: LanguageDef = {
  id: 'fortran',
  popularity: 19,
  name: 'Fortran',
  titleWord: 'Fortran',
  article: 'a',
  extensions: ['.f90', '.f95'],
  accentHex: '#734f96',
  officialUrl: 'https://fortran-lang.org/',
  shikiLang: 'fortran-free-form',
  note: 'Modern Fortran is a procedural, imperative, and object-oriented language heavily used in scientific and numerical computing.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Starts with `!`, ignored by the compiler.',
      details:
        'Free-form Fortran (`.f90`/`.f95`) uses `!` to start a comment anywhere on a line, from the first column through end of line. This replaced the fixed-form rule where a `C` or `*` in column 1 marked an entire line as a comment, which is why old Fortran listings look so column-obsessed.\n\nThere is no block-comment syntax; every commented line needs its own `!`. In practice this means decades of scientific codebases are annotated one line at a time, often by whoever last touched the subroutine and lived to explain it.',
      learnMore: 'https://fortranwiki.org/fortran/show/Comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'module',
      title: 'Module definition',
      body: 'Encapsulates procedures and data with `module` / `end module`.',
      details:
        "A `module` groups related procedures, derived types, and data under one namespace, replacing the `COMMON` blocks that older Fortran used to share state across program units. Other program units pull in a module's contents with a `use` statement rather than textual `include`.\n\nModules compile to `.mod` files that encode interfaces, so the compiler checks argument types and counts across module boundaries: a huge reliability win over the implicit-interface calling conventions of FORTRAN 77.",
      learnMore: 'https://fortranwiki.org/fortran/show/Module',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'implicit-none',
      title: 'Implicit none',
      body: 'Enforces explicit variable declarations.',
      details:
        'Without `implicit none`, Fortran falls back to its historic naming rule: undeclared identifiers starting with `i` through `n` are implicitly `integer`, and everything else is implicitly `real`. That default has quietly caused more misplaced-decimal bugs than most languages manage in a lifetime.\n\n`implicit none` turns off that fallback and requires every variable to be declared, so a typo`d` name becomes a compile error instead of a silently-typed new variable. It is considered mandatory in any code written after roughly 1990.',
      learnMore: 'https://fortranwiki.org/fortran/show/Implicit+none',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'contains',
      title: 'Contains',
      body: "Separates a module or program's data/definitions from its internal procedures.",
      details:
        "The `contains` statement marks the boundary between a module's (or program's) declarations and the subroutines/functions defined inside it. Everything after `contains` is an internal procedure that automatically has access to the host's variables through host association.\n\nA program unit may have at most one `contains`, and procedures defined after it cannot themselves contain further nested procedures beyond one level. Fortran keeps the nesting shallow on purpose.",
      learnMore: 'https://fortranwiki.org/fortran/show/contains',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'subroutine-def',
      title: 'Subroutine definition',
      body: 'A procedure that performs a task and returns no value via `subroutine` / `end subroutine`.',
      details:
        'A `subroutine` is Fortran\'s procedure for work that communicates results through its arguments rather than a return value; it is invoked with `call`. This mirrors the function/subroutine split found in Pascal and Visual Basic, and predates the "everything is an expression" style of C-family languages.\n\nSubroutines can modify their arguments directly (see argument intent), which is how Fortran routines traditionally return multiple results without needing to pack them into a struct or tuple.',
      learnMore: 'https://fortranwiki.org/fortran/show/Procedures',
      color: 'green',
      side: 'right',
    },
    {
      id: 'argument-intent',
      title: 'Argument intent',
      body: 'Specifies whether a dummy argument is input (`in`), output (`out`), or both (`inout`).',
      details:
        'The `intent` attribute documents and enforces how a subroutine or function uses each dummy argument: `intent(in)` may only be read, `intent(out)` must be assigned before the procedure returns, and `intent(inout)` may be both read and modified. The compiler rejects programs that violate the declared intent.\n\nBeyond safety, `intent` lets the compiler optimize argument passing (e.g. it need not copy an `intent(in)` array back to the caller) and gives tooling enough information to catch an accidental write to what should have been read-only input.',
      learnMore: 'https://fortranwiki.org/fortran/show/intent',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'use-statement',
      title: 'Use statement',
      body: 'Imports entities from a module.',
      details:
        "`use module_name` brings a module's public procedures, types, and variables into the current scope. Adding `, only: calculate_square` restricts the import to exactly the named entities, which keeps large scientific codebases from silently colliding on common names like `x` or `n`.\n\n`use` statements must appear before any other declarations in a program unit, immediately after the `program`, `module`, or `subroutine` header: a holdover from the compiler needing to resolve the full symbol table before it processes anything else.",
      learnMore: 'https://fortranwiki.org/fortran/show/use',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'variable-decl',
      title: 'Variable declaration',
      body: 'Declares a variable and its type, optionally as a named constant with `parameter`.',
      details:
        'A type declaration such as `integer :: i, square_val` lists a type followed by `::` and one or more variable names, optionally with attributes like `dimension`, `allocatable`, or `parameter`. Multiple variables of the same type and attributes can share a single declaration line, separated by commas.\n\nAdding the `parameter` attribute, as in `integer, parameter :: limit = 5`, defines a compile-time constant: its value must be set at declaration and can never be reassigned, and the compiler is free to substitute it directly wherever it appears.',
      learnMore: 'https://fortranwiki.org/fortran/show/parameter',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'program-def',
      title: 'Program definition',
      body: 'The main execution point, opened with `program` and closed with `end program`.',
      details:
        'Exactly one `program` block per executable marks where execution begins: analogous to `main` in C or `def main()` elsewhere, except the block also declares its own local variables and can `use` any modules it needs. Fortran does not require the program name to match the source filename.\n\nA standalone program still benefits from `implicit none` and can itself contain internal procedures after `contains`, making it a legitimate host program unit in its own right, not just an entry point that immediately delegates elsewhere.',
      learnMore: 'https://fortranwiki.org/fortran/show/program',
      color: 'red',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Loop (do)',
      body: 'Executes a block of code repeatedly with `do` / `end do`.',
      details:
        "`do i = 1, limit` counts `i` from 1 through `limit` inclusive, stepping by 1 by default (a third value after another comma sets a custom step, including negative ones for counting down). This is Fortran's oldest surviving construct, dating back essentially unchanged in spirit to FORTRAN I in 1957.\n\nModern Fortran also supports `do while (condition)` for condition-driven loops and `exit`/`cycle` as the equivalents of `break`/`continue`. Array-wise operations and `forall`/`do concurrent` often replace explicit loops entirely when the iterations are independent.",
      learnMore: 'https://fortranwiki.org/fortran/show/do',
      color: 'rose',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Conditional (if-else)',
      body: 'Executes code based on a condition with `if` / `else` / `end if`.',
      details:
        "A block `if (condition) then ... else ... end if` branches on a logical expression; `mod(i, 2) == 0` is Fortran's modulo test, since there is no `%` operator. Multiple branches chain with `else if (condition) then`, and every block form must be explicitly closed with `end if`.\n\nA single-line form, `if (condition) statement`, skips the `then`/`end if` entirely for a one-statement action, which is convenient for guard clauses but cannot itself contain another `if` block.",
      learnMore: 'https://fortranwiki.org/fortran/show/if',
      color: 'pink',
      side: 'left',
    },
    {
      id: 'print-statement',
      title: 'Print statement',
      body: 'Outputs data to standard output with `print`.',
      details:
        '`print *, ...` writes a comma-separated list of values to standard output using Fortran\'s default ("list-directed") formatting, which chooses reasonable spacing and precision automatically. The asterisk stands in for a format specifier, meaning "use the default format" instead of a hand-written `FORMAT` string.\n\nFor precise column alignment or fixed decimal places, `write(*, "(format)")` accepts an explicit edit descriptor string, a facility that goes back to Fortran\'s original need to produce punch-card-aligned tabular output.',
      learnMore: 'https://fortranwiki.org/fortran/show/print',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'subroutine-call',
      title: 'Subroutine call',
      body: 'Executes a subroutine with `call`.',
      details:
        'A subroutine cannot be invoked like a function; it must be invoked with the `call` statement, e.g. `call calculate_square(i, square_val)`. Arguments are matched positionally to the subroutine\'s dummy arguments unless keyword form (`call foo(n=5)`) is used.\n\nBecause arguments are typically passed by reference, a `call` can change the caller\'s variables directly through any `intent(out)` or `intent(inout)` parameter. There is no need to capture a return value since the "return" happens by mutating what you passed in.',
      learnMore: 'https://fortranwiki.org/fortran/show/call',
      color: 'blue',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '! A minimal Fortran program -- still compiling since the Eisenhower administration',
        refs: ['comment'],
      },
      {
        code: 'program main_program',
        refs: ['program-def'],
      },
      {
        code: '  implicit none',
        refs: ['implicit-none'],
      },
      {
        code: '  integer :: i',
        refs: ['variable-decl'],
      },
      {
        code: '  integer, parameter :: limit = 3',
        refs: ['variable-decl'],
      },
      { code: '' },
      {
        code: '  do i = 1, limit',
        refs: ['loop'],
      },
      {
        code: '    if (mod(i, 2) == 0) then',
        refs: ['conditional'],
      },
      {
        code: '      print *, "Even:", i',
        refs: ['conditional', 'print-statement'],
      },
      {
        code: '    else',
        refs: ['conditional'],
      },
      {
        code: '      print *, "Odd:", i, "-- real programmers count from 1 anyway"',
        refs: ['conditional', 'print-statement'],
      },
      {
        code: '    end if',
        refs: ['conditional'],
      },
      {
        code: '  end do',
        refs: ['loop'],
      },
      {
        code: 'end program main_program',
        refs: ['program-def'],
      },
    ],
    verbose: [
      {
        code: '! This is a modern Fortran program (yes, "modern" -- filed under 2018, give or take)',
        refs: ['comment'],
      },
      {
        code: 'module math_operations',
        refs: ['module'],
      },
      {
        code: '  implicit none',
        refs: ['implicit-none'],
      },
      {
        code: 'contains',
        refs: ['contains'],
      },
      {
        code: '  subroutine calculate_square(n, result)',
        refs: ['subroutine-def'],
      },
      {
        code: '    integer, intent(in) :: n',
        refs: ['argument-intent'],
      },
      {
        code: '    integer, intent(out) :: result',
        refs: ['argument-intent'],
      },
      {
        code: '    result = n * n  ! rocket science, allegedly',
        refs: ['subroutine-def'],
      },
      {
        code: '  end subroutine calculate_square',
        refs: ['subroutine-def'],
      },
      {
        code: 'end module math_operations',
        refs: ['module'],
      },
      { code: '' },
      {
        code: 'program main_program',
        refs: ['program-def'],
      },
      {
        code: '  use math_operations, only: calculate_square',
        refs: ['use-statement'],
      },
      {
        code: '  implicit none',
        refs: ['implicit-none'],
      },
      {
        code: '  integer :: i, square_val',
        refs: ['variable-decl'],
      },
      {
        code: '  integer, parameter :: limit = 5',
        refs: ['variable-decl'],
      },
      { code: '' },
      {
        code: '  print *, "Calculating squares up to ", limit, "-- no GOTO required"',
        refs: ['print-statement'],
      },
      { code: '' },
      {
        code: '  ! Loop example (this construct predates the transistor radio)',
        refs: ['comment', 'loop'],
      },
      {
        code: '  do i = 1, limit',
        refs: ['loop'],
      },
      {
        code: '    call calculate_square(i, square_val)',
        refs: ['subroutine-call'],
      },
      { code: '' },
      {
        code: '    ! Conditional logic',
        refs: ['comment', 'conditional'],
      },
      {
        code: '    if (mod(i, 2) == 0) then',
        refs: ['conditional'],
      },
      {
        code: '      print *, "Square of even number ", i, " is ", square_val',
        refs: ['conditional', 'print-statement'],
      },
      {
        code: '    else',
        refs: ['conditional'],
      },
      {
        code: '      print *, "Square of odd number ", i, " is ", square_val',
        refs: ['conditional', 'print-statement'],
      },
      {
        code: '    end if',
        refs: ['conditional'],
      },
      {
        code: '  end do',
        refs: ['loop'],
      },
      { code: '' },
      {
        code: 'end program main_program',
        refs: ['program-def'],
      },
    ],
  },
}
