import type { LanguageDef } from '../lib/types'

export const awk: LanguageDef = {
  id: 'awk',
  popularity: 57,
  name: 'AWK',
  titleWord: 'AWK',
  article: 'an',
  extensions: ['.awk'],
  accentHex: '#1e8449',
  officialUrl: 'https://en.wikipedia.org/wiki/AWK',
  shikiLang: 'awk',
  note: 'Awk is a powerful domain-specific language designed for text processing and data extraction, structured around a data-driven pattern-action framework.',
  annotations: [
    {
      id: 'shebang',
      title: 'Shebang',
      body: 'Specifies the interpreter path (optional, for executable scripts).',
      details:
        'The shebang (`#!`) must be the very first bytes of the file. On Unix-like systems the kernel reads it to pick the interpreter, so `#!/usr/bin/awk -f` hands the rest of the file to `awk` as a `-f` script when it is invoked directly, e.g. `./report.awk` after `chmod +x`.\n\nIt is entirely optional when you instead run `awk -f report.awk data.txt`, and it is skipped over as an ordinary comment if the interpreter is invoked explicitly. AWK predates most of the languages that borrowed its shebang convention, having shipped with Unix since 1977. It was extracting fields out of text files before "data engineering" was a job title.',
      learnMore: 'https://en.wikipedia.org/wiki/Shebang_(Unix)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line comments, ignored by Awk.',
      details:
        "A `#` starts a comment that runs to the end of the line; there is no block-comment syntax, so every explanatory line needs its own `#`. Comments can trail real code on the same line, which is the idiomatic place to explain a terse one-liner before someone (often you, in six months) has to reverse-engineer it.\n\nBecause classic AWK programs are prized for fitting on one line at a shell prompt, comments are also where most of the language's actual documentation ends up living, since the code itself is optimized for brevity over readability.",
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Comments.html',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'begin-block',
      title: 'BEGIN block',
      body: 'Executed once before any input is read. Used for initialization.',
      details:
        'A `BEGIN { ... }` block runs exactly once, before AWK reads the first line of input, before the field separator is even applied to anything. It is the natural place to set up variables like counters, print a report header, or reconfigure built-ins such as `FS`.\n\nA program may have multiple `BEGIN` blocks; AWK concatenates them in the order they appear, as if they were one block. If a program consists of only a `BEGIN` block, AWK never opens the input file at all, which is a handy trick for using `awk` as a plain calculator.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/BEGIN_002fEND.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'print-statement',
      title: 'Print statement',
      body: 'Outputs text or variable values.',
      details:
        '`print` writes its comma-separated arguments to standard output, joined by the value of `OFS` (a single space by default) and terminated by `ORS`, the output record separator, a newline by default. Arguments are concatenated positionally: `print "Total: " total` glues a string literal directly to a variable with no operator, since adjacency itself means string concatenation in AWK.\n\nFor anything fancier than default spacing, `printf` gives C-style format control (`printf "%-10s %5d\\n", name, count`) without the automatic separators `print` adds. Both write to stdout by default but can be redirected with `>`, `>>`, or piped with `|` straight from the statement.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Printing.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'builtin-variables',
      title: 'Built-in variables',
      body: 'Special variables like `FS` (Field Separator), `NR` (Number of Records).',
      details:
        'AWK maintains a set of built-in variables that update automatically as it reads input: `NR` is the total record count seen so far, `NF` is the number of fields in the current record, and `FS`/`OFS` control how fields are split on input and joined on output (`FS = ","` switches from the default whitespace-splitting to CSV-style parsing). `FILENAME` and `RS` (record separator) round out the most commonly tuned ones.\n\nBecause these are ordinary global variables rather than read-only constants, a program can reassign `FS` mid-run (for instance after a `BEGIN` block, or partway through processing a file whose format changes) and every subsequent record split uses the new value.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Built_002din-Variables.html',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'pattern',
      title: 'Pattern (condition)',
      body: 'Controls if the action block is executed. If empty, action runs for every record.',
      details:
        'AWK\'s core structure is `pattern { action }`: for every input record, each pattern is tested, and its action runs only if the pattern matches. A pattern can be a comparison like `$1 == "data"`, a regular expression like `/error/` (implicitly tested against the whole record, `$0`), a range `/start/,/end/`, or omitted entirely: an empty pattern matches every record, which is how `{ print }` becomes a one-line `cat` replacement.\n\nThe special patterns `BEGIN` and `END` are the only ones not tied to a record; every other pattern is re-evaluated once per line of input, in the order the pattern-action pairs appear in the source.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Pattern-Overview.html',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'action',
      title: 'Action (block)',
      body: 'Commands to execute when the pattern is matched.',
      details:
        "The `{ ... }` following a pattern is a block of statements executed once per matching record: assignments, `print`/`printf`, control flow, or calls to user-defined functions. Statements are typically separated by newlines or semicolons, and the block shares AWK's implicit global scope, so a variable like `total` accumulates naturally across every record that matches.\n\nIf a pattern has no action at all, AWK assumes `{ print }` (printing the whole matched record verbatim) which is why grep-like one-liners such as `awk '/error/'` need no braces to work.",
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'field-access',
      title: 'Field access ($N)',
      body: 'Accesses fields in the current record (`$0` is the whole record, `$1` is first field, etc.).',
      details:
        'Every input record is automatically split into fields on `FS`, addressable as `$1`, `$2`, ... `$NF`, while `$0` refers to the entire, unsplit record. Fields can be reassigned (`$2 = "redacted"`), which rebuilds `$0` by rejoining every field with `OFS`; assigning past `NF` (e.g. `$(NF+2) = "x"`) extends the record with empty fields in between.\n\nField numbers need not be literals (`$NF` is the last field and `$(i+1)` computes an index at runtime) which lets a single action generalize across records with a varying number of columns instead of hardcoding positions.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/Fields.html',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'end-block',
      title: 'END block',
      body: 'Executed once after all input is read. Used for finalization and reporting.',
      details:
        'An `END { ... }` block runs exactly once, after the last input record has been processed, making it the natural place for summary output like totals, averages, or a closing banner. Variables set during the main pattern-action pairs (like an accumulator built up across every matching record) are still in scope here, since AWK variables are global by default.\n\nCrucially, `END` still has access to the final values of built-ins like `NR`, so `print "Records Processed: " NR` inside `END` reports exactly how many records the whole run consumed, even though no new record triggers it.',
      learnMore: 'https://www.gnu.org/software/gawk/manual/html_node/BEGIN_002fEND.html',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '#!/usr/bin/awk -f\n# One-liners: the only language feature AWK really needs for its resume',
        refs: ['shebang', 'comment'],
      },
      { code: '' },
      {
        code: 'BEGIN { FS = ":"; users = 0 }  # /etc/passwd walked so /bin/passwd could run',
        refs: ['begin-block', 'builtin-variables'],
      },
      { code: '' },
      {
        code: '$3 >= 1000 { users++; print "Human:", $1 }  # UID 1000+ is probably a person',
        refs: ['pattern', 'action', 'field-access'],
      },
      { code: '' },
      {
        code: 'END { print "Total humans:", users, "(NR was " NR " all along)" }',
        refs: ['end-block', 'print-statement', 'builtin-variables'],
      },
    ],
    verbose: [
      { code: '#!/usr/bin/awk -f', refs: ['shebang'] },
      { code: '# This is a comment', refs: ['comment'] },
      { code: '' },
      { code: '# BEGIN block: executed once before processing input', refs: ['comment'] },
      { code: 'BEGIN {', refs: ['begin-block'] },
      {
        code: '    print "--- Starting Processing ---"  # narrator: processing had not, in fact, started',
        refs: ['begin-block', 'print-statement'],
      },
      {
        code: '    FS = ","          # Set Field Separator to comma',
        refs: ['begin-block', 'builtin-variables'],
      },
      {
        code: '    total = 0         # Initialize variable (AWK: no declarations, only vibes)',
        refs: ['begin-block'],
      },
      { code: '}', refs: ['begin-block'] },
      { code: '' },
      { code: '# Main body: executed for each input record (line)', refs: ['comment'] },
      {
        code: '$1 == "data" {        # Pattern (condition)',
        refs: ['pattern', 'field-access'],
      },
      {
        code: '    print "Processing Record " NR ": " $2',
        refs: ['action', 'print-statement', 'field-access'],
      },
      {
        code: '    total += $3       # Action (block of commands, and yes that is real syntax)',
        refs: ['action', 'field-access'],
      },
      { code: '}', refs: ['action', 'pattern'] },
      { code: '' },
      { code: '# END block: executed once after processing all input', refs: ['comment'] },
      { code: 'END {', refs: ['end-block'] },
      {
        code: '    print "--- Final Results ---"',
        refs: ['end-block', 'print-statement'],
      },
      {
        code: '    print "Total Value: " total',
        refs: ['end-block', 'print-statement'],
      },
      {
        code: '    print "Records Processed: " NR  # older than most of your other dependencies',
        refs: ['end-block', 'print-statement', 'builtin-variables'],
      },
      { code: '}', refs: ['end-block'] },
    ],
  },
}
