import type { LanguageDef } from '../lib/types'

export const powershell: LanguageDef = {
  id: 'powershell',
  popularity: 45,
  name: 'PowerShell',
  titleWord: 'PowerShell',
  article: 'a',
  extensions: ['.ps1'],
  accentHex: '#2671be',
  officialUrl: 'https://learn.microsoft.com/en-us/powershell/',
  shikiLang: 'powershell',
  note: 'PowerShell is a cross-platform task automation and configuration management framework, consisting of a command-line shell and scripting language.',
  annotations: [
    {
      id: 'shebang',
      title: 'Shebang',
      body: 'Specifies the interpreter path (for non-Windows systems).',
      details:
        'On Linux and macOS, `#!/usr/bin/pwsh` tells the kernel which interpreter should run the script when it is invoked directly, e.g. `./script.ps1` after `chmod +x`. PowerShell itself treats the line as an ordinary comment, so it has no effect on Windows.\n\nIt is entirely optional when the script is run explicitly with `pwsh ./script.ps1`, and Windows PowerShell/`powershell.exe` never looks for it at all: the shebang only matters for cross-platform `pwsh`-based execution.',
      learnMore: 'https://en.wikipedia.org/wiki/Shebang_(Unix)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`#`) or block (`<# ... #>`), ignored by interpreter.',
      details:
        'A `#` starts a comment that runs to the end of the line, just like in many shell languages. A block comment opens with `<#` and closes with `#>`, and can span multiple lines, which makes it the natural home for comment-based help.\n\nWhen a block comment sits at the very top of a script or function and contains keywords like `.SYNOPSIS`, `.DESCRIPTION`, and `.PARAMETER`, `Get-Help` parses it directly and displays it the same way it displays help for built-in cmdlets.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration ($)',
      body: 'Starts with `$`, dynamically typed.',
      details:
        'Every variable name is prefixed with `$` and requires no declared type. `$target = "World"` and `$target = 3.14` are both valid, and the underlying .NET type is inferred at assignment. Optional type constraints like `[int]$count = 0` add a static check without changing the dynamic-by-default model.\n\nVariables are scoped to the block or script that creates them by default, but scope modifiers such as `$script:name`, `$global:name`, and `$local:name` let a script explicitly reach outside or restrict access to the current scope.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_variables',
      color: 'green',
      side: 'left',
    },
    {
      id: 'param-block',
      title: 'Parameter block (param)',
      body: 'Defines input parameters for functions/scripts.',
      details:
        'A `param(...)` block, placed as the first statement in a script or function, declares the arguments callers can supply by name or position. Each parameter can carry a type constraint like `[string]`, a default value, and attributes such as `[Parameter(Mandatory)]` that make PowerShell prompt for the value if it is missing.\n\nBecause parameters are strongly described up front, PowerShell can generate parameter validation, tab completion, and help text automatically, without any extra parsing code in the function body.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters',
      color: 'red',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition (function)',
      body: 'Defines a reusable block of code.',
      details:
        'The `function` keyword binds a name and a script block together; the body executes each time the function is called. Function names conventionally follow the `Verb-Noun` pattern used by built-in cmdlets, drawn from a small set of approved verbs (`Get`, `Set`, `New`, `Remove`, and so on) that `Get-Verb` lists.\n\nFollowing that convention is not just style: it is what lets a custom function behave and discover like a real cmdlet, including showing up correctly in tab completion and `Get-Command` output alongside built-ins.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'cmdlet-call',
      title: 'Cmdlet call',
      body: 'Executing a built-in or custom command.',
      details:
        'Cmdlets are commands named in the same `Verb-Noun` form, such as `Get-Date` or `Write-Host`, implemented as .NET classes rather than standalone executables. Arguments are passed as named parameters, e.g. `-Format $Format`, which makes call sites self-documenting compared to positional flags.\n\nA custom function defined with `function` is invoked exactly the same way as a built-in cmdlet (`Get-FormattedDate -Format "..."`) because PowerShell does not distinguish the two at the call site.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/cmdlet-overview',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'string-interpolation',
      title: 'String interpolation',
      body: 'Embeds expressions/variables in double-quoted strings using $().',
      details:
        'Inside double-quoted strings, `$name` expands a simple variable directly, while `$(expression)` (the subexpression operator) evaluates an arbitrary expression, including a cmdlet call, and inserts its result. `"Current Date: $(Get-Date -Format $Format)"` runs `Get-Date` and splices its output into the string.\n\nSingle-quoted strings never interpolate: `\'$name\'` is inserted literally, which is why interpolation and variable expansion are one of the main reasons to prefer double quotes for user-facing text.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (Loop)',
      body: 'Executes code repeatedly (foreach, for, while, do).',
      details:
        '`foreach ($item in $collection) { ... }` walks each element of a collection or range, such as `1..3`; `for` and `while` support counter- and condition-driven iteration respectively. Unlike the `ForEach-Object` cmdlet used in a pipeline, the `foreach` statement loads the whole collection into memory before iterating.\n\n`break` exits a loop immediately and `continue` skips to the next iteration, matching the behavior familiar from C-style languages. Ranges like `1..3` are inclusive on both ends, producing `1, 2, 3`.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_foreach',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control flow (Conditional)',
      body: 'Executes code based on a condition (if, elseif, else, switch).',
      details:
        '`if`/`elseif`/`else` branch on a boolean expression, using comparison operators spelled as letter codes (`-eq`, `-ne`, `-lt`, `-gt`) rather than symbols like `==`, because `=` is reserved for assignment and `<`/`>` are reserved for redirection. Conditions are always parenthesized: `if ($i -eq 2) { ... }`.\n\nFor more than a couple of branches, `switch` compares a value against several patterns at once and supports wildcard, regex, and script-block conditions, often replacing a long `elseif` chain.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_if',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Executing a defined function.',
      details:
        'Calling a PowerShell function looks like calling any cmdlet: the function name followed by its parameters, e.g. `Get-FormattedDate -Format "dddd, MMMM dd, yyyy"`: no parentheses or commas separate the arguments, unlike a typical C-family method call.\n\nA function\'s output is whatever it writes to the pipeline, whether via an explicit `return` or simply by letting a value fall through unassigned; that output can be captured in a variable, piped into another command, or displayed directly.',
      learnMore:
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_return',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '<#\n.SYNOPSIS\n  A minimal PowerShell script.\n.NOTES\n  Verb-Noun or it never happened.\n#>',
        refs: ['comment'],
      },
      { code: '' },
      { code: '$Greeting = "Hello"', refs: ['variable'] },
      { code: '' },
      {
        code: 'function Get-Greeting {\n    param(\n        [string]$Name = "World"\n    )\n    return "$Greeting, $Name!"\n}',
        refs: ['function', 'param-block', 'string-interpolation'],
      },
      { code: '' },
      {
        code: 'if ($Greeting -eq "Hello") {\n    Write-Host (Get-Greeting -Name "PowerShell")\n}',
        refs: ['conditional', 'cmdlet-call', 'function-call'],
      },
    ],
    verbose: [
      { code: '#!/usr/bin/pwsh', refs: ['shebang'] },
      {
        code: "<#\n  This is a multi-line comment block\n  describing the script's purpose.\n#>",
        refs: ['comment'],
      },
      { code: '' },
      { code: '# This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: '# Variable declaration (no "var", no "let", just vibes and a dollar sign)\n$greeting = "Hello"\n$target = "World"',
        refs: ['variable'],
      },
      { code: '' },
      { code: '# Function definition with parameters' },
      {
        code: 'function Get-FormattedDate {',
        refs: ['function'],
      },
      {
        code: '    param(\n        [string]$Format = "yyyy-MM-dd HH:mm:ss"\n    )',
        refs: ['param-block'],
      },
      { code: '    # Cmdlet call & string interpolation' },
      {
        code: '    return "Current Date: $(Get-Date -Format $Format)"',
        refs: ['function', 'cmdlet-call', 'string-interpolation'],
      },
      { code: '}', refs: ['function'] },
      { code: '' },
      { code: '# Main execution block' },
      {
        code: 'Write-Host "$greeting, $target! (typed in twelve keystrokes, read back in forty)" # Cmdlet call with interpolation',
        refs: ['cmdlet-call', 'string-interpolation'],
      },
      { code: '' },
      { code: '# Control flow (loop over a range)' },
      {
        code: 'foreach ($i in 1..3) {',
        refs: ['loop'],
      },
      { code: '    # Control flow (conditional)' },
      {
        code: '    if ($i -eq 2) {',
        refs: ['loop', 'conditional'],
      },
      {
        code: '        Write-Host "Iteration $i is special. -eq got the memo that == was busy."',
        refs: ['loop', 'conditional', 'cmdlet-call', 'string-interpolation'],
      },
      { code: '    } else {', refs: ['loop', 'conditional'] },
      {
        code: '        Write-Host "Iteration $i"',
        refs: ['loop', 'conditional', 'cmdlet-call', 'string-interpolation'],
      },
      { code: '    }', refs: ['loop', 'conditional'] },
      { code: '}', refs: ['loop'] },
      { code: '' },
      { code: '# Call the defined function (no parens, no commas, no regrets)' },
      {
        code: '$currentDateMsg = Get-FormattedDate -Format "dddd, MMMM dd, yyyy"',
        refs: ['variable', 'function-call'],
      },
      { code: 'Write-Host $currentDateMsg', refs: ['cmdlet-call', 'variable'] },
    ],
  },
}
