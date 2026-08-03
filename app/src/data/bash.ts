import type { LanguageDef } from '../lib/types'

export const bash: LanguageDef = {
  id: 'bash',
  popularity: 51,
  name: 'Shell (Bash)',
  titleWord: 'Bash',
  article: 'a',
  extensions: ['.sh'],
  accentHex: '#4eaa25',
  officialUrl: 'https://www.gnu.org/software/bash/',
  shikiLang: 'bash',
  note: 'Shell (Bash) is a command-line interpreter and scripting language used for task automation and system administration on Unix-like systems.',
  annotations: [
    {
      id: 'shebang',
      title: 'Shebang',
      body: 'Specifies the interpreter to execute the script.',
      details:
        'The shebang (`#!`) must be the very first bytes of the file. On Unix-like systems the kernel reads it to decide which interpreter runs the script: `#!/bin/bash` hard-codes the path to Bash, while `#!/usr/bin/env bash` asks `env` to locate `bash` on the current `PATH`, which is more portable across systems where Bash lives somewhere else.\n\nThe shebang only matters when the file is invoked directly, e.g. `./script.sh` after `chmod +x` has made it executable. Running it as `bash script.sh` ignores the shebang entirely, since the interpreter is already chosen by the command line.',
      learnMore: 'https://en.wikipedia.org/wiki/Shebang_(Unix)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Uses `#` for a real line comment; a quoted here-document fed to `:` is a common no-op workaround for blocks.',
      details:
        "A `#` starts a comment that runs to the end of the line; everything after it is ignored. Bash has no dedicated block-comment syntax, so multi-line comments are usually faked with a here-document attached to the no-op `:` builtin, e.g. `: <<'END_COMMENT' ... END_COMMENT`.\n\nQuoting the delimiter (`'END_COMMENT'` rather than `END_COMMENT`) prevents the shell from performing variable expansion or command substitution inside the block, so arbitrary text (including `$` and backticks) can sit there safely without being interpreted.",
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Here-Documents',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable assignment & expansion',
      body: 'Assigns with `NAME=value` (no spaces) and reads with `$NAME` or `${NAME}`.',
      details:
        'Assignment is `NAME=value` with no spaces around the `=`; a space would make the shell parse `NAME` as a command name instead. Reading a variable requires the `$` sigil: `$NAME` or the equivalent, more explicit `${NAME}`, which is needed when the name is immediately followed by other characters, e.g. `${NAME}_suffix`.\n\nUnquoted expansions are word-split and glob-expanded by the shell, which is rarely what you want. `echo $path` can break on spaces or expand `*` in the value. Wrapping expansions in double quotes, `"$NAME"`, disables both behaviors and is the safe default; single quotes disable expansion entirely.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion',
      color: 'green',
      side: 'left',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'A reusable block of commands, defined with `name() { ... }`.',
      details:
        "A function groups commands under a name using `name() { ... }` (the `function` keyword is an optional, non-POSIX alternative spelling). Inside the body, `$1`, `$2`, etc. refer to the function's own positional parameters (the arguments it was called with) not the script's, and `local` scopes a variable to the function instead of leaking it into the caller.\n\nFunctions must be defined before the point in the script where they are first called, since Bash executes top to bottom and has no forward-declaration mechanism. A function's exit status is the exit status of the last command it ran, unless it calls `return` explicitly.",
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Shell-Functions',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'command-exec',
      title: 'Command execution & variable expansion',
      body: 'Runs commands (`echo`, `date`) and expands variables (`$NAME`, `${NAME}`).',
      details:
        'Every non-blank line that is not a control-flow keyword is a command: a program name (or builtin like `echo`) followed by whitespace-separated arguments. Bash expands variables before running the command, substituting `$NAME`/`${NAME}` with their stored value as plain text.\n\nBecause expansion happens before word-splitting, an argument built from an unquoted variable can silently split into several arguments if its value contains spaces. Quoting the expansion (`echo "Hello, $name!"`) keeps it as a single argument regardless of what it contains.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions',
      color: 'red',
      side: 'right',
    },
    {
      id: 'command-sub',
      title: 'Command substitution',
      body: "Replaces `$(command)` with that command's output.",
      details:
        'The `$(command)` form runs `command` in a subshell and substitutes its standard output, with a trailing newline stripped, into the surrounding text, `current_date=$(date +"%Y-%m-%d")` captures the formatted date into a variable. The older backtick form, `` `command` ``, does the same thing but nests awkwardly, since embedding a substitution inside another requires escaping the inner backticks.\n\n`$(...)` is preferred in modern scripts because it nests cleanly (`$(cmd1 $(cmd2))`) and is easier to read. As with any expansion, wrap the result in double quotes when using it, e.g. `echo "Current date: $current_date"`, so embedded whitespace is not word-split.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Command-Substitution',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `elif`, `else`, `case`).',
      details:
        '`if condition; then ... elif ...; else ... fi` branches on the exit status of `condition`. Zero means true, anything else means false. The condition is often a call to `test`, more commonly written with brackets: `[ -f "config.conf" ]` checks that a file exists, `[ "$a" = "$b" ]` compares strings.\n\nBash\'s extended `[[ ... ]]` form is preferred over the POSIX `[ ... ]` when it is available: it supports `&&`/`||` and pattern matching directly, and (critically) does not word-split or glob-expand unquoted variables inside it, so `[[ $name = Alice ]]` is safe even without quotes, unlike `[ $name = Alice ]`.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Repeats commands (`for`, `while`, `until`).',
      details:
        '`for i in {1..3}; do ... done` iterates over a fixed list of values (here, a brace-expanded range); `while condition; do ... done` repeats as long as `condition` exits successfully, and `until` is its inverse. `break` exits a loop immediately and `continue` skips to the next iteration.\n\nBash also supports the C-style `for (( i=0; i<3; i++ )); do ... done`, and `for f in *.txt; do ... done` to iterate over glob-expanded filenames: a very common scripting pattern for batch-processing files.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Executing a defined function with arguments.',
      details:
        'A function is called exactly like any other command: its name followed by arguments, e.g. `greet_user "Alice"`. No parentheses, and arguments are separated by spaces rather than commas. Inside the function body those arguments become its positional parameters `$1`, `$2`, and so on, shadowing the script\'s own.\n\nA function must be defined earlier in the file (or sourced from another file) before it can be called; Bash has no notion of hoisting. Because a script executes top to bottom, calling a function before its definition simply fails with a "command not found" error.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Positional-Parameters',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'exit-status',
      title: 'Exit status',
      body: "Terminates the script and returns a status code (`exit N`); the last command's status is available as `$?`.",
      details:
        'Every command returns an exit status when it finishes: `0` means success, any value from `1` to `255` means failure, by convention. `exit N` terminates the running script immediately and sets that value as its own exit status, which a caller (another script, or the shell itself) can inspect.\n\nThe special variable `$?` holds the exit status of the most recently completed command, and is commonly checked right after a command runs: `command; if [ $? -ne 0 ]; then echo "failed"; fi`. `&&` and `||` chain commands based on this status directly, without naming `$?` at all.',
      learnMore: 'https://www.gnu.org/software/bash/manual/bash.html#Exit-Status',
      color: 'rose',
      side: 'right',
    },
  ],
  // `a | b | c` is one line of code and three simultaneous programs. The code
  // panel can show the syntax but not the plumbing, which is the part that
  // explains why a pipeline streams rather than waits, and why `$?` is the exit
  // status of the LAST command in it.
  visual: {
    panels: [
      {
        template: 'topology',
        caption: 'One line, three programs, two pieces of plumbing',
        zones: [
          {
            id: 'pipe',
            label: 'the pipeline',
            nodes: [
              {
                id: 'p1',
                ref: 'command-exec',
                title: 'grep "ERROR"',
                sub: 'reads stdin, writes stdout',
              },
              {
                id: 'p2',
                ref: 'command-exec',
                title: 'sort -u',
                sub: 'reads stdin, writes stdout',
              },
              { id: 'p3', ref: 'command-exec', title: 'wc -l', sub: 'writes one number' },
            ],
          },
          {
            id: 'script',
            label: 'your script',
            nodes: [
              {
                id: 'cap',
                ref: 'command-sub',
                title: 'count=$( ... )',
                sub: 'stdout captured as text',
                rows: [{ label: 'echo "$count"', ref: 'variable' }],
              },
              {
                id: 'status',
                ref: 'exit-status',
                title: '$?',
                sub: '0 is success, anything else is not',
                rows: [{ label: 'if [ "$count" -gt 0 ]', ref: 'conditional' }],
              },
            ],
          },
        ],
        edges: [
          { from: 'p1', to: 'p2', ref: 'command-exec', label: '|' },
          { from: 'p2', to: 'p3', ref: 'command-exec', label: '|' },
          { from: 'p3', to: 'cap', ref: 'command-sub', label: 'stdout', bow: -14 },
          { from: 'p3', to: 'status', ref: 'exit-status', label: 'exit code', bow: 14 },
        ],
      },
    ],
  },
  examples: {
    minimal: [
      { code: '#!/usr/bin/env bash', refs: ['shebang'] },
      { code: '' },
      { code: '# A minimal Bash script (it worked on my machine)', refs: ['comment'] },
      { code: 'greeting="Hello"', refs: ['variable'] },
      { code: '' },
      {
        code: 'greet() {\n  local name=$1\n  echo "$greeting, $name!"\n}',
        refs: ['function', 'variable', 'command-exec'],
      },
      { code: '' },
      {
        code: 'if [[ -n "$name" ]]; then\n  greet "$name"\nelse\n  greet "World"\nfi',
        refs: ['conditional', 'function-call'],
      },
      { code: '' },
      { code: 'exit $?', refs: ['exit-status'] },
    ],
    verbose: [
      { code: '#!/bin/bash', refs: ['shebang'] },
      { code: '# This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: ": <<'END_COMMENT'\nThis is a multi-line comment block\nusing a here-document, because Bash\nnever met a block comment it liked.\nEND_COMMENT",
        refs: ['comment'],
      },
      { code: '' },
      { code: '# Global variable', refs: ['comment'] },
      { code: 'APP_NAME="My Shell Script"', refs: ['variable'] },
      { code: '' },
      { code: '# Function definition', refs: ['comment'] },
      {
        code: 'greet_user() {',
        refs: ['function'],
      },
      {
        code: '  local name=$1 # Local variable, first argument',
        refs: ['function', 'variable'],
      },
      {
        code: '  echo "Hello, $name! Welcome to $APP_NAME."',
        refs: ['function', 'command-exec', 'variable'],
      },
      { code: '}', refs: ['function'] },
      { code: '' },
      { code: '# Main execution block', refs: ['comment'] },
      { code: 'echo "Starting script..."', refs: ['command-exec'] },
      { code: '' },
      { code: '# Command substitution', refs: ['comment'] },
      {
        code: 'current_date=$(date +"%Y-%m-%d")',
        refs: ['command-sub'],
      },
      {
        code: 'echo "Current date: $current_date"',
        refs: ['command-exec', 'variable'],
      },
      { code: '' },
      { code: '# Control flow (conditional)', refs: ['comment'] },
      {
        code: 'if [ -f "config.conf" ]; then\n  echo "Config file found."\nelse\n  echo "Config file not found. Using defaults, and vibes."\nfi',
        refs: ['conditional'],
      },
      { code: '' },
      { code: '# Control flow (loop)', refs: ['comment'] },
      {
        code: 'for i in {1..3}; do\n  echo "Processing item $i"\ndone',
        refs: ['loop'],
      },
      { code: '' },
      { code: '# Function call with argument', refs: ['comment'] },
      { code: 'greet_user "Alice"', refs: ['function-call'] },
      { code: '' },
      { code: '# Exit status: 0 means it worked, anything else is a surprise', refs: ['comment'] },
      { code: 'exit 0', refs: ['exit-status'] },
    ],
  },
}
