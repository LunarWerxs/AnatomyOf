import type { LanguageDef } from '../lib/types'

export const lua: LanguageDef = {
  id: 'lua',
  popularity: 34,
  name: 'Lua',
  titleWord: 'Lua',
  article: 'a',
  extensions: ['.lua'],
  accentHex: '#2c2d72',
  officialUrl: 'https://www.lua.org/',
  shikiLang: 'lua',
  note: 'Lua is a powerful, efficient, lightweight, embeddable scripting language common in game development and embedded systems.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`--`) or block (`--[[...]]`), ignored by the interpreter.',
      details:
        '`--` starts a comment that runs to the end of the line, the most common form in everyday Lua code. A `--[[` / `]]` pair brackets a block comment that can span many lines, which is handy for a file-level overview or for temporarily disabling a chunk of code.\n\nBoth forms are stripped before execution and have no effect on the running program. Because the block form uses the same long-bracket syntax as multi-line strings, some editors and linters get confused if a `]]` appears inside the commented-out text, so nested block comments are best avoided.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.1',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'variable-global',
      title: 'Variable declaration (global)',
      body: 'Variables not declared with `local` are global by default.',
      details:
        'Simply writing `appName = "My Lua App"` at any scope creates or assigns a global variable, stored in a shared global table (`_G` in standard Lua). This is the opposite default from most languages, where a bare assignment is local unless declared otherwise.\n\nGlobals are visible everywhere, including inside functions and other files running in the same interpreter state, which makes them convenient but easy to collide or leak by accident. Idiomatic Lua reserves globals for a small, deliberate set of names and pushes everything else into `local` variables or tables.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.3.7',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable-local',
      title: 'Variable declaration (local)',
      body: "`local` limits a variable's scope to the current block.",
      details:
        'The `local` keyword declares a variable that only exists from that point to the end of the enclosing block (a function, loop, `do...end`, or the file itself). `local version = 1.2` shadows any global of the same name and is cleaned up automatically once the block ends.\n\nLua encourages `local` over globals for two reasons: it avoids accidental name collisions, and local variable access compiles to a fast register lookup rather than a table lookup, which matters in a language often embedded in performance-sensitive hosts like games.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.3.7',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'table',
      title: 'Table (data structure)',
      body: 'An associative array used for maps, lists, and objects (`{}`).',
      details:
        'The table is Lua\'s only built-in data structure, and it does the job of arrays, dictionaries, records, and objects all at once. `{ debug = true, max_users = 100 }` creates a table with string keys, but the same braces also build a list: `{"/usr/bin", "/usr/local/bin"}` implicitly keys its entries `1`, `2`, `3`, ... Unlike most languages, Lua sequences are 1-indexed, not 0-indexed.\n\nBecause tables can mix named fields and numeric entries, and can even hold functions or other tables as values, they double as the mechanism Lua uses for modules, namespaces, and prototype-based objects (with help from `metatables`). A key that is never assigned simply reads back as `nil`.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.4.9',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field (table element)',
      body: 'A key-value pair within a table.',
      details:
        '`debug = true` and `max_users = 100` are fields: each associates a key (here, a string used as an identifier) with a value inside the enclosing table literal. Fields can be read or written afterward with dot syntax (`config.debug`) when the key is a valid identifier, or bracket syntax (`config["debug"]`) for arbitrary keys.\n\nA field can hold any Lua value, including another table, which is how `paths = {"/usr/bin", "/usr/local/bin"}` nests a list inside `config`, accessed later as `config.paths`. Assigning `nil` to a field removes it from the table entirely.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.4.9',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'A reusable block of code (`function ... end`).',
      details:
        '`local function greetUser(name) ... end` binds a function value to a name, scoped like any other `local`. Functions are first-class values in Lua: they can be stored in variables or table fields, passed as arguments, and returned from other functions, which is what makes callbacks and event handlers so natural in the language.\n\nA function with no explicit `return` yields `nil` when called. Lua also supports variadic parameters (`...`) and multiple return values (`return a, b`), both of which are used throughout the standard library.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.4.11',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'concat',
      title: 'String concatenation',
      body: 'Joins strings using the `..` operator.',
      details:
        '`"Hello, " .. name .. "!"` builds a new string by concatenating each operand with the `..` operator. Lua has no `+` overload for strings and no built-in interpolation syntax, so concatenation (or `string.format`) is the standard way to build a message out of pieces.\n\nNumbers are coerced to their string form automatically when used with `..`, so `"v" .. version` works without an explicit conversion. Chaining many `..` calls to build a large string in a loop is relatively slow, since each one allocates a new string; `table.concat` is the idiomatic alternative for joining many pieces at once.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.4.6',
      color: 'red',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly (`for`, `while`, `repeat`).',
      details:
        "`for i, path in ipairs(config.paths) do ... end` is a generic `for` loop: `ipairs` returns an iterator that walks a table's array part in order, yielding an index and value each pass. Lua also has a numeric `for i = 1, 10 do ... end` form, a `while` that tests before each pass, and a `repeat ... until` that tests after, guaranteeing at least one iteration.\n\n`pairs(t)` is the counterpart to `ipairs` for visiting every key in a table, including non-numeric ones, though the order is unspecified. `break` exits a loop early; Lua has no `continue` keyword, so the usual workaround is wrapping the remaining body in an `if`.",
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.3.5',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `elseif`, `else`).',
      details:
        '`if config.debug then ... else ... end` branches on truthiness. Lua\'s notion of falsy is narrow: only `false` and `nil` are falsy, so `0` and `""` (unlike in many other languages) both count as true. Every `if` must be closed with a matching `end`.\n\n`elseif` chains additional conditions without nesting a nested `if` inside each `else`. Because `if` is a statement rather than an expression, Lua code that needs a conditional expression typically reaches for `condition and a or b`, which works as a ternary as long as `a` is never `false` or `nil`.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.3.4',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Executing a function, such as `print(...)` or a user-defined one.',
      details:
        '`print(message)` and `greetUser("Alice")` both call a function by following its name with parentheses containing the arguments. `print` is part of the small set of global functions the standard library installs, writing its arguments to standard output separated by tabs: the everyday debugging tool in Lua, much like `console.log` elsewhere.\n\nA call can be used as a statement on its own (`greetUser("Alice")`) or as an expression whose result feeds something else, and since functions can return multiple values, a call like `return true` at the end of a function simply hands that value back to whoever called it.',
      learnMore: 'https://www.lua.org/manual/5.4/manual.html#3.4.10',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '-- A minimal Lua script (indices start at 1, no take-backs)', refs: ['comment'] },
      { code: '' },
      { code: 'local Counter = {}', refs: ['variable-local', 'table'] },
      { code: 'Counter.value = 0', refs: ['field'] },
      { code: '' },
      {
        code: 'local function increment(amount)\n  Counter.value = Counter.value + amount\n  return Counter.value\nend',
        refs: ['function'],
      },
      { code: '' },
      {
        code: 'for i = 1, 3 do\n  print("Total: " .. increment(i)) -- table.concat would scale better, but shh\nend',
        refs: ['loop', 'concat', 'function-call'],
      },
    ],
    verbose: [
      { code: '-- This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "--[[\nThis is a multi-line comment\ndescribing the file's purpose,\nwhich is mostly to prove that\n_G.tostring(nil) == 'nil' and not a crash.\n]]",
        refs: ['comment'],
      },
      { code: '' },
      { code: '-- Global variable', refs: ['comment'] },
      { code: 'appName = "My Lua App"', refs: ['variable-global'] },
      { code: '' },
      { code: '-- Local variable declaration', refs: ['comment'] },
      { code: 'local version = 1.2', refs: ['variable-local'] },
      { code: '' },
      { code: '-- Table definition (associative array)', refs: ['comment'] },
      {
        code: 'local config = {\n  debug = true,\n  max_users = 100,\n  paths = {"/usr/bin", "/usr/local/bin"} -- Nested table (list)\n}',
        refs: ['table', 'field'],
      },
      { code: '' },
      { code: '-- Function definition', refs: ['comment'] },
      {
        code: 'local function greetUser(name)\n  -- String concatenation',
        refs: ['function'],
      },
      {
        code: '  local message = "Hello, " .. name .. "!"',
        refs: ['function', 'concat'],
      },
      {
        code: '  print(message) -- Function call',
        refs: ['function', 'function-call'],
      },
      {
        code: '  return true\nend',
        refs: ['function', 'function-call'],
      },
      { code: '' },
      { code: '-- Main execution block', refs: ['comment'] },
      {
        code: 'print("Starting " .. appName .. " v" .. version)',
        refs: ['concat', 'function-call'],
      },
      { code: '' },
      { code: '-- Control flow (loop over a list in a table)', refs: ['comment'] },
      {
        code: 'for i, path in ipairs(config.paths) do\n  print("Path " .. i .. ": " .. path)\nend',
        refs: ['loop', 'concat', 'function-call'],
      },
      { code: '' },
      { code: '-- Control flow (conditional)', refs: ['comment'] },
      {
        code: 'if config.debug then\n  print("Debug mode is ON. May the odds be ever in your favor.")\nelse\n  print("Debug mode is OFF.")\nend',
        refs: ['conditional', 'function-call'],
      },
      { code: '' },
      { code: '-- Call the defined function', refs: ['comment'] },
      { code: 'greetUser("Alice")', refs: ['function-call'] },
    ],
  },
}
