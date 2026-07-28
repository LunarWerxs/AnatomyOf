import type { LanguageDef } from '../lib/types'

export const julia: LanguageDef = {
  id: 'julia',
  popularity: 27,
  name: 'Julia',
  titleWord: 'Julia',
  article: 'a',
  extensions: ['.jl'],
  accentHex: '#9558b2',
  officialUrl: 'https://julialang.org/',
  shikiLang: 'julia',
  note: 'Julia is a high-performance, dynamic programming language specifically designed for scientific computing and technical applications.',
  annotations: [
    {
      id: 'module',
      title: 'Module definition',
      body: 'Encapsulates code and defines a namespace (`module ... end`).',
      details:
        "A `module` block groups related definitions under a namespace, the way a package groups files. Names declared inside are qualified as `MyMath.distance` from the outside unless explicitly exported with `export`, which keeps unrelated packages from stepping on each other's `sqrt` or `distance` bindings.\n\nModules can `using` or `import` other modules, and nesting them mirrors how Julia's own standard library is organized (`Base`, `Core`, `Statistics`). Unlike a Python module, a Julia module is not tied one-to-one with a file. A single file can define several, though convention keeps it to one per package entry point.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/modules/',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Loads external modules (`using`, `import`).',
      details:
        "`using Statistics` brings a module's exported names into scope directly, so `mean(x)` works unqualified. This is the common case for standard-library and package code. `import Statistics` instead requires qualification (`Statistics.mean`) unless you explicitly extend a function, which is the idiom for adding methods to someone else's generic function.\n\nBoth trigger Julia's package precompilation the first time a module is loaded in a session, caching compiled code so subsequent `using` statements in later sessions start faster. This is also why the first call to a freshly loaded function can feel slow: the JIT compiler is specializing it for the actual argument types.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/modules/#using-and-import',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`#`) or block (`#= ... =#`), ignored by the compiler.',
      details:
        "A `#` starts a comment that runs to the end of the line, same as Python or Ruby. Block comments are wrapped in `#=` and `=#` instead of triple quotes, and (unlike most languages' block comments) they nest, so commenting out a region that already contains a `#= =#` pair is safe.\n\nJulia has no dedicated docstring syntax; documentation instead uses an ordinary string literal placed immediately before a definition, which the `Docs` system picks up and `?functionname` displays at the REPL.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/documentation/',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'struct',
      title: 'Type definition (struct)',
      body: 'Defines a composite data type.',
      details:
        "`struct Point ... end` declares an immutable composite type: once a `Point` is constructed its fields cannot be reassigned, which lets the compiler reason about it like a value type and often stack-allocate it. Prefixing with `mutable struct` opts back into reassignable fields at the cost of that optimization.\n\nJulia generates a default positional constructor automatically (`Point(1.0, 2.0)`) matching the field declaration order. Structs carry no methods of their own; behavior lives in standalone functions dispatched on the struct's type, which is the core of Julia's multiple-dispatch design.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/types/#Composite-Types',
      color: 'green',
      side: 'left',
    },
    {
      id: 'type-annotation',
      title: 'Type annotation',
      body: 'Specifies the type of a field or argument (`::Type`).',
      details:
        'The `::` operator asserts a type: `x::Float64` on a struct field constrains what can be stored there, while `p1::Point` on a function argument restricts which method applies. Annotations are optional almost everywhere (Julia infers types at compile time from whatever is actually passed) but they document intent and let multiple dispatch pick a more specific method.\n\nOmitting an annotation is not "untyped" the way a dynamically typed language usually means it; the field or argument is simply typed `Any`, and the compiler still specializes generated code per call site based on the concrete runtime types it sees.',
      learnMore: 'https://docs.julialang.org/en/v1/manual/types/#Type-Declarations',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'function-long',
      title: 'Function definition (long form)',
      body: 'Standard multi-line function syntax.',
      details:
        "`function name(args...) ... end` is the general-purpose form, used whenever a body needs more than one expression. The final evaluated expression is returned implicitly, though an explicit `return` (as in `distance`) is common for clarity or early exit.\n\nBecause Julia dispatches on argument types, the same function name can have many methods (`distance(p1::Point, p2::Point)` coexists with, say, `distance(p1::Point3D, p2::Point3D)`) and Julia picks the most specific applicable method at each call site. This is multiple dispatch, and it is the feature the rest of the language's design orbits.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/methods/',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'function-short',
      title: 'Function definition (short form)',
      body: 'Concise single-line syntax for simple functions.',
      details:
        '`area(r::Number) = pi * r^2` is sugar for a one-expression `function ... end` block. Mathematically minded code reads almost like the formula it implements. `pi` is a predefined constant of an irrational-number type that only becomes a concrete `Float64` (or other precision) when it participates in an operation.\n\nThis form is not a lambda; it defines a genuine named method just like the long form, participates in dispatch the same way, and can even be given additional methods later for other argument types.',
      learnMore:
        'https://docs.julialang.org/en/v1/manual/functions/#Compact-function-definition-syntax',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'string-interpolation',
      title: 'String interpolation',
      body: 'Embeds expressions in strings using `$()`.',
      details:
        'A bare `$name` splices a variable\'s value into a string, and `$(expression)` splices the result of an arbitrary expression: `"Distance: $(distance(p_a, p_b))"` calls the function inline and stringifies whatever it returns. This is closer to shell or Perl interpolation than to Python\'s `f"{...}"`, though it serves the same purpose.\n\nInterpolation works in both regular double-quoted strings and command backtick-strings, and a literal `$` in a string must be escaped as `\\$` to avoid triggering it.',
      learnMore: 'https://docs.julialang.org/en/v1/manual/strings/#string-interpolation',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes a block repeatedly (`for`, `while`).',
      details:
        "`for i in 1:3` iterates over a range (here, the inclusive `UnitRange` 1, 2, 3) or any other iterable (arrays, dicts, strings) the same way Python's `for` walks an iterable rather than counting indices. `while` repeats as long as its condition holds, and both loop forms support `break` and `continue`.\n\nUnlike a script-level `for` in some languages, loop bodies in Julia introduce their own scope: a variable first assigned inside the loop is not visible after `end` unless it was declared outside first. Ranges like `1:3` are lazy and allocation-free, so looping over even a huge range costs no more memory than looping over `1:3`.",
      learnMore: 'https://docs.julialang.org/en/v1/manual/control-flow/#man-loops',
      color: 'red',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `elseif`, `else`).',
      details:
        '`if` / `elseif` / `else` branch on a `Bool`. Julia is strict here, so a condition must actually be `true` or `false`; there is no truthy `0` or empty-collection fallback like in Python or JavaScript. The block still ends with a single `end`, matching every other block construct in the language.\n\nFor simple cases, the ternary `cond ? a : b` and short-circuiting `&&` / `||` (often used for guard clauses like `x < 0 && return`) cover what would otherwise need a full `if` block.',
      learnMore: 'https://docs.julialang.org/en/v1/manual/control-flow/#Conditional-Evaluation',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'main-execution',
      title: 'Function call & main execution',
      body: 'Calling functions and running top-level code.',
      details:
        'Julia has no single blessed "entry point" keyword; instead, `if abspath(PROGRAM_FILE) == @__FILE__` checks whether the current file was launched directly rather than `include`d or loaded as a package, mirroring Python\'s `if __name__ == "__main__":` guard. `@__FILE__` is a macro (marked by `@`) that expands to the current file\'s path at parse time.\n\nWrapping the script body in a `main()` function rather than leaving it at top level also helps performance: code inside a function gets specialized and compiled per argument type, while unwrapped top-level statements are executed in a more conservative, less optimized way.',
      learnMore:
        'https://docs.julialang.org/en/v1/manual/code-loading/#Running-Julia-from-the-command-line',
      color: 'indigo',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      {
        code: '# A minimal Julia script -- may or may not be as fast as C, results vary',
      },
      { code: '' },
      {
        code: 'struct Greeting\n    text::String\nend',
        refs: ['struct'],
      },
      { code: '' },
      {
        code: 'shout(g::Greeting) = uppercase(g.text) * "!!!"',
        refs: ['function-short'],
      },
      { code: '' },
      {
        code: 'function main()\n    g = Greeting("compiling on the first call is a feature")\n    for i in 1:3\n        println("Take $i: $(shout(g))")\n    end\nend',
        refs: ['function-long', 'loop', 'string-interpolation'],
      },
      { code: '' },
      {
        code: 'if abspath(PROGRAM_FILE) == @__FILE__\n    main()\nend',
        refs: ['main-execution'],
      },
    ],
    verbose: [
      { code: 'module MyMath # Module definition', refs: ['module'] },
      { code: '' },
      { code: 'using Statistics # Import standard library module', refs: ['imports'] },
      { code: '' },
      { code: '# This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: '#=\n  This is a multi-line comment\n  for documentation. Or for apologizing to future maintainers.\n=#',
        refs: ['comment'],
      },
      { code: '' },
      { code: '# Type definition (struct)', refs: ['struct'] },
      {
        code: 'struct Point\n    x::Float64  # Field with type annotation\n    y::Float64\nend',
        refs: ['struct', 'type-annotation'],
      },
      { code: '' },
      { code: '# Function definition (long form)', refs: ['function-long'] },
      {
        code: 'function distance(p1::Point, p2::Point)\n    dx = p1.x - p2.x\n    dy = p1.y - p2.y\n    return sqrt(dx^2 + dy^2)\nend',
        refs: ['function-long', 'type-annotation'],
      },
      { code: '' },
      { code: '# Function definition (short form)', refs: ['function-short'] },
      {
        code: 'area(r::Number) = pi * r^2  # not to be confused with pie, which is tastier',
        refs: ['function-short', 'type-annotation'],
      },
      { code: '' },
      { code: '# Main execution block', refs: ['main-execution'] },
      {
        code: 'function main()\n    p_a = Point(1.0, 2.0)\n    p_b = Point(4.0, 6.0)',
        refs: ['function-long'],
      },
      { code: '' },
      {
        code: '    # Function call & string interpolation\n    println("Distance: $(distance(p_a, p_b))")',
        refs: ['string-interpolation'],
      },
      { code: '' },
      {
        code: '    # Control flow (loop)\n    for i in 1:3\n        # Control flow (conditional)\n        if i % 2 == 0\n            println("Even iteration: $i, obviously")\n        end\n    end',
        refs: ['loop', 'conditional'],
      },
      { code: 'end', refs: ['function-long'] },
      { code: '' },
      { code: '# Call main function if running as a script', refs: ['main-execution'] },
      {
        code: 'if abspath(PROGRAM_FILE) == @__FILE__\n    main()\nend',
        refs: ['main-execution'],
      },
      { code: 'end # End of module', refs: ['module'] },
    ],
  },
}
