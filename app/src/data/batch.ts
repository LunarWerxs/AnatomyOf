import type { LanguageDef } from '../lib/types'

export const batch: LanguageDef = {
  id: 'batch',
  popularity: 58,
  name: 'Batch',
  titleWord: 'Batch',
  article: 'a',
  extensions: ['.bat', '.cmd'],
  accentHex: '#d97706',
  officialUrl:
    'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd',
  shikiLang: 'bat',
  note: 'Batch files are script files for the Windows command interpreter (cmd.exe), used to automate tasks and run sequences of commands.',
  annotations: [
    {
      id: 'echo-off',
      title: 'Echo off',
      body: 'Prevents commands from being displayed in the console.',
      details:
        'By default, `cmd.exe` echoes every command it executes to the console before running it, which clutters output meant for the user. `@echo off` disables that echoing for the rest of the script, and the leading `@` additionally suppresses echo of the `echo off` command itself.\n\nWithout the leading `@`, the line `echo off` would still print once before taking effect. Any individual line can override the current echo state by prefixing it with `@`, regardless of the script-wide setting.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/echo',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment (REM / ::)',
      body: 'Lines ignored by the interpreter.',
      details:
        '`REM` is the documented comment command; anything after it on the line is ignored. `::` is a widely used trick that works because it is parsed as a malformed label, which `cmd.exe` silently skips when not the target of a `goto`.\n\nThe two are not fully interchangeable: `::` cannot appear inside a parenthesized block like an `if` or `for` body without breaking parsing, whereas `REM` can. Trailing `&` command separators after `REM` are also treated as part of the comment, while `::` does not support that.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rem',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable set & expansion',
      body: 'Defines and uses variables (set VAR=... / %VAR%).',
      details:
        '`set VAR=value` defines an environment variable, and `%VAR%` expands it at parse time, before the line executes. This normal expansion breaks down inside loops and blocks whose body is parsed all at once, since every `%VAR%` on the block is substituted before any of it runs.\n\nDelayed expansion fixes that: `setlocal EnableDelayedExpansion` turns on `!VAR!` syntax, which is resolved at execution time instead, line by line. `setlocal` also scopes variable changes to the current script so they do not leak into the parent shell once it exits.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1',
      color: 'green',
      side: 'left',
    },
    {
      id: 'command-args',
      title: 'Command & arguments',
      body: 'Built-in or external commands (echo, set, etc.).',
      details:
        "`echo` and `set` are built-in shell commands implemented directly by `cmd.exe`, unlike external commands such as `robocopy.exe` which are separate executables resolved via `PATH`. Built-ins run without spawning a new process, so they are cheaper and unaffected by the current directory's executable search order.\n\nArguments are separated by whitespace and `%VARIABLE%` references are expanded before the command runs. Special characters like `&`, `|`, `^`, and `%` often need escaping or quoting to be passed through literally.",
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'command-line-arg',
      title: 'Command-line argument',
      body: 'Accesses arguments passed to the script (%1, %2, ...).',
      details:
        '`%1` through `%9` refer to the first nine arguments passed to the script; `%0` holds the script\'s own path. `%*` expands to all arguments at once, which is useful for forwarding them unchanged to another command.\n\nThe `shift` command shifts every positional parameter down by one, so `%1` takes on the value that used to be `%2`, which lets a script step through more than nine arguments in a loop. Argument values are substituted as raw text, so testing them against an empty string is usually written as `if "%1"=="" (...)` to avoid a syntax error when no argument was supplied.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shift',
      color: 'red',
      side: 'left',
    },
    {
      id: 'conditional-flow',
      title: 'Conditional flow',
      body: 'Executes code based on a condition (if ... ( ... ) goto ...).',
      details:
        '`if` tests a condition and, when true, runs the parenthesized block that follows; `cmd.exe` parses the whole block as a single unit before executing any of it. Comparisons are done with `==` for strings (optionally case-insensitively with `/i`), or with switches like `/exist` for files and `errorlevel` for exit codes.\n\nThere is no `elif`; additional branches are chained with `) else if ... (` or nested `if` statements. Because the entire block is parsed up front, variables that change inside it need delayed expansion (`!VAR!`) to be read reliably within the same block.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/if',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Loop (for)',
      body: 'Executes a command repeatedly.',
      details:
        '`for /L %%i in (start,step,end) do (...)` counts from `start` to `end` in increments of `step`, similar to a numeric `for` loop in other languages. In a script file the loop variable uses a doubled percent sign, `%%i`, whereas typed directly at an interactive prompt a single `%i` is used.\n\nOther `for` variants iterate over different sources: plain `for %%f in (*.txt) do` walks a set of files, and `for /F` parses lines of output from a command or file, splitting them into tokens. Like `if`, the loop body is parsed as one block, so delayed expansion is often needed to see updated variable values on each iteration.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/for',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'label-goto',
      title: 'Label & goto',
      body: 'Marks a point in the script (:label) and jumps to it.',
      details:
        'A line starting with a single colon, such as `:end`, defines a label, a named jump target that `cmd.exe` does not execute as a command. `goto :end` transfers control directly to that label, skipping everything in between, which is commonly used to implement early exits or simple error handling.\n\nLabels also double as subroutine entry points: `call :label` jumps to the label and, unlike a plain `goto`, returns to the line after the `call` once the subroutine reaches `exit /b` or falls off the end of the script. This makes `call`/label pairs the closest thing batch has to functions.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/goto',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'pause-exit',
      title: 'Pause & exit',
      body: 'Pauses execution and exits with a status code.',
      details:
        '`pause` prints "Press any key to continue . . ." and halts the script until a key is pressed, which is often used so a console window opened by double-clicking a `.bat` file does not close immediately. `exit /b 0` ends the script and sets the process exit code to 0.\n\nThe `/b` flag is significant: without it, `exit` closes the entire `cmd.exe` process (including an interactive shell that invoked the script), whereas `/b` exits only the current batch script or subroutine. The value passed to `exit /b` becomes `%ERRORLEVEL%` in the caller, which other scripts commonly check to detect success or failure.',
      learnMore:
        'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/exit',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '@echo off', refs: ['echo-off'] },
      {
        code: 'REM A minimal batch script. No dependencies, no npm install, no regrets.',
        refs: ['comment'],
      },
      { code: '' },
      { code: 'set GREETING=Hello', refs: ['variable'] },
      { code: '' },
      { code: 'echo %GREETING%, %1!', refs: ['command-args'] },
      { code: '' },
      { code: 'pause\nexit /b 0', refs: ['pause-exit'] },
    ],
    verbose: [
      { code: '@echo off', refs: ['echo-off'] },
      {
        code: 'REM This is a comment using REM.\n:: This is another type of comment.',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: 'set APP_NAME=My Batch Script\nset VERSION=1.0',
        refs: ['variable'],
      },
      { code: '' },
      { code: 'echo Welcome to %APP_NAME% v%VERSION%!', refs: ['command-args'] },
      { code: '' },
      {
        code: 'REM Check for command-line argument (quote it, or %1 will "helpfully" eat your spaces)',
      },
      { code: 'if "%1"=="" (', refs: ['command-line-arg', 'conditional-flow'] },
      {
        code: '    echo No argument provided. Usage: script.bat [name]',
        refs: ['conditional-flow'],
      },
      { code: '    goto :end', refs: ['conditional-flow', 'label-goto'] },
      { code: ')', refs: ['conditional-flow'] },
      { code: '' },
      { code: 'set USER_NAME=%1' },
      { code: 'echo Hello, %USER_NAME%!', refs: ['command-args'] },
      { code: '' },
      { code: 'REM Simple loop (yes, the percent sign really does need a stunt double: %%i)' },
      { code: 'echo Counting to 3:' },
      {
        code: 'for /L %%i in (1,1,3) do (\n    echo %%i\n)',
        refs: ['loop'],
      },
      { code: '' },
      { code: ':end', refs: ['label-goto'] },
      { code: 'echo Script finished. It compiled, which in batch is basically a passing grade.' },
      { code: 'pause\nexit /b 0', refs: ['pause-exit'] },
    ],
  },
}
