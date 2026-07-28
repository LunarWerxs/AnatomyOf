import type { LanguageDef } from '../lib/types'

export const r: LanguageDef = {
  id: 'r',
  popularity: 9,
  name: 'R',
  titleWord: 'R',
  article: 'an',
  extensions: ['.r', '.R'],
  accentHex: '#276dc3',
  officialUrl: 'https://www.r-project.org/',
  shikiLang: 'r',
  note: 'R is a language and environment for statistical computing and graphics, widely used among statisticians and data miners for data analysis.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`#`). R has no native block comment syntax.',
      details:
        'Everything from a `#` to the end of the line is ignored by the parser. There is no `/* ... */` equivalent: every line of a "block" comment needs its own `#`, which is why long-time R users eventually invent workarounds for multi-line notes.\n\nA common trick wraps prose in an `if (FALSE) { ... }` block: the body is parsed (so it must still be syntactically valid R) but never executed, letting you stash old code or scratch notes without deleting them. RStudio\'s "Insert Section" (`# Section ---- `) is a lighter-weight convention for the same itch.',
      learnMore: 'https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'library',
      title: 'Library/package loading',
      body: 'Loads an installed package so its functions become available.',
      details:
        '`library(ggplot2)` attaches an already-installed package to the search path so you can call `ggplot()` and friends without qualifying them. It throws an error if the package was never installed with `install.packages("ggplot2")` first: `library()` only attaches, it never fetches.\n\n`require(ggplot2)` behaves similarly but returns `FALSE` instead of erroring, which is occasionally used inside functions to conditionally handle a missing dependency. CRAN, the default package repository, currently hosts upwards of 20,000 packages, which is either R\'s greatest strength or the reason your dependency tree looks like a fern.',
      learnMore: 'https://stat.ethz.ch/R-manual/R-devel/library/base/html/library.html',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable assignment',
      body: 'Assigns values to names, conventionally with the `<-` arrow.',
      details:
        '`<-` is the idiomatic assignment operator in R, though `=` also works at the top level. The arrow reads like data flowing into a name. `x_vals <- 1:10` creates the integer sequence `1, 2, ..., 10` and binds it to `x_vals`. Vectors are the fundamental data type; even a single number is a length-one vector.\n\n`data.frame(x = x_vals, y = y_vals)` builds a table-like structure from named vectors of equal length, the workhorse container for tabular data before tidyverse alternatives like tibbles entered the picture. `rnorm(10)` draws 10 values from a standard normal distribution: handy for generating fake noise, or for explaining to a stats professor why your simulated results look suspiciously clean.',
      learnMore: 'https://stat.ethz.ch/R-manual/R-devel/library/base/html/assignOps.html',
      color: 'green',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'Creates a reusable block of code with `function() { }`.',
      details:
        "Functions are ordinary values in R: `calculate_stats <- function(df) { ... }` assigns an anonymous function object to a name, the same way any other assignment would. The last evaluated expression in the body is returned implicitly, though an explicit `return()` call is common for clarity.\n\nArguments can have default values (`function(df, digits = 2)`), and R's scoping is lexical: a function sees the environment where it was defined, not where it was called. This makes closures straightforward and is part of why functional-programming idioms feel native in R.",
      learnMore: 'https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Closures',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `else`).',
      details:
        '`if (nrow(df) > 5) { ... } else { ... }` branches on a single logical value; the condition must evaluate to a length-one `TRUE`/`FALSE` (a vector condition triggers a warning or error depending on R version). Curly braces group the branch bodies, though single statements can omit them.\n\nR also has a vectorized cousin, `ifelse(condition, yes, no)`, which applies element-wise across a whole vector instead of branching once: reaching for `if` when you meant `ifelse` is a classic way to silently process only the first element.',
      learnMore: 'https://stat.ethz.ch/R-manual/R-devel/library/base/html/Control.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Repeats code with `for`, `while`, or `repeat`.',
      details:
        '`for (col in names(df)) { ... }` iterates directly over the elements of a vector or list (here, the column names of a data frame) rather than counting indices. `while` repeats as long as a condition holds, and `repeat` loops until an explicit `break`.\n\nLoops are the readable choice for side effects like printing, but R rewards vectorizing numeric work instead: functions like `sapply()`, `vapply()`, and `Map()` apply a function across a vector without an explicit loop, and usually run faster because they avoid growing an R-level object one iteration at a time.',
      learnMore: 'https://stat.ethz.ch/R-manual/R-devel/library/base/html/Control.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Executes a user-defined or built-in function.',
      details:
        '`calculate_stats(data)` invokes the function bound to that name, passing `data` as the argument `df`. R resolves the call by looking up `calculate_stats` in the current environment and walking outward through enclosing scopes if it is not found locally.\n\n`print(stats_summary)` is itself a function call: in fact, typing a bare value at the console implicitly calls `print()` on it via R\'s auto-printing mechanism. Almost everything in R, including control structures like `if` and `for`, is "just" a function call under the hood, which is a fun fact right up until you try to explain it to someone on their first day.',
      learnMore: 'https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Function-calls',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'plotting',
      title: 'Plotting command',
      body: 'Builds a graphic, often layer by layer with ggplot2.',
      details:
        '`ggplot(data, aes(x = x, y = y))` initializes a plot and maps data columns to visual properties (aesthetics), then `+ geom_point()` and `+ geom_smooth(method = "lm")` add layers (points and a fitted regression line) on top. This "grammar of graphics" approach composes complex figures from small, orthogonal pieces instead of one monolithic plotting call.\n\nBase R ships its own plotting system (`plot()`, `hist()`, `barplot()`) that predates ggplot2 and remains faster for quick, throwaway looks at data. ggplot2, part of the tidyverse, trades a steeper initial learning curve for far more consistent and customizable output: the eternal R holy war of base graphics versus ggplot2 has claimed many a Friday afternoon on Stack Overflow.',
      learnMore: 'https://ggplot2-book.org/mastery.html',
      color: 'teal',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      {
        code: '# A minimal R script. No semicolons were harmed in the making of this file.',
        refs: ['comment'],
      },
      { code: '' },
      { code: 'library(stats)  # Load a package (this one ships with base R)', refs: ['library'] },
      { code: '' },
      { code: 'nums <- c(4, 8, 15, 16, 23, 42)', refs: ['variable'] },
      { code: '' },
      {
        code: 'describe <- function(x) {\n  if (mean(x) > 10) {\n    cat("Above average, whatever \\"average\\" means.\\n")\n  } else {\n    cat("Below average.\\n")\n  }\n}',
        refs: ['function', 'conditional'],
      },
      { code: '' },
      { code: 'for (n in nums) {\n  cat("Value:", n, "\\n")\n}', refs: ['loop'] },
      { code: '' },
      { code: 'describe(nums)  # Function call', refs: ['function-call'] },
    ],
    verbose: [
      { code: '# This is a single-line comment', refs: ['comment'] },
      {
        code: '# R has no native block comment syntax.\n# This is a common workaround using an `if (FALSE)` block, beloved by developers who miss /* */.\nif (FALSE) {\n  "This block is not executed. Schrodinger\'s code: both present and absent."\n}',
        refs: ['comment'],
      },
      { code: '' },
      { code: 'library(ggplot2)  # Load an external package', refs: ['library'] },
      { code: '' },
      { code: '# Variable assignment & data frame creation', refs: ['variable'] },
      {
        code: 'x_vals <- 1:10\ny_vals <- x_vals^2 + rnorm(10)  # add noise, then pretend you did not\ndata <- data.frame(x = x_vals, y = y_vals)',
        refs: ['variable'],
      },
      { code: '' },
      { code: '# Function definition', refs: ['function'] },
      { code: 'calculate_stats <- function(df) {', refs: ['function'] },
      {
        code: '  # Control flow (conditional)\n  if (nrow(df) > 5) {\n    cat("Data has more than 5 rows.\\n")\n  } else {\n    cat("Data has 5 or fewer rows. A rare and precious dataset.\\n")\n  }',
        refs: ['function', 'conditional'],
      },
      { code: '', refs: ['function'] },
      {
        code: '  # Control flow (loop)\n  for(col in names(df)) {\n    cat("Mean of", col, ":", mean(df[[col]]), "\\n")\n  }',
        refs: ['function', 'loop'],
      },
      { code: '', refs: ['function'] },
      { code: '  return(summary(df))  # Return value, no rowing required', refs: ['function'] },
      { code: '}', refs: ['function'] },
      { code: '' },
      { code: '# Main execution block' },
      { code: 'stats_summary <- calculate_stats(data)  # Function call', refs: ['function-call'] },
      { code: '' },
      {
        code: '# Plotting command\nggplot(data, aes(x = x, y = y)) +\n  geom_point() +\n  geom_smooth(method = "lm") +\n  ggtitle("X vs Y Plot (trust the line, not the noise)")',
        refs: ['plotting'],
      },
      { code: '' },
      { code: 'print(stats_summary)  # Function call', refs: ['function-call'] },
    ],
  },
}
