import type { LanguageDef } from '../lib/types'

export const vbnet: LanguageDef = {
  id: 'vbnet',
  popularity: 7,
  name: 'VB.NET',
  titleWord: 'VB.NET',
  article: 'a',
  extensions: ['.vb'],
  accentHex: '#512bd4',
  officialUrl: 'https://learn.microsoft.com/en-us/dotnet/visual-basic/',
  shikiLang: 'vb',
  note: 'VB.NET is a modern, object-oriented programming language in the .NET family, known for its readable, English-like syntax.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: "Single-line (`'`), ignored by the compiler.",
      details:
        "A comment starts with an apostrophe (`'`) and runs to the end of the line; the compiler discards everything after it. There is no dedicated block-comment syntax. A multi-line explanation just means prefixing every line with its own apostrophe, which is very on-brand for a language descended from BASIC's `REM` statement.\n\nThe legacy keyword `REM` still works as a comment marker for historical compatibility, but essentially no VB.NET code written this century uses it; the apostrophe is the idiomatic form in every style guide and every IDE snippet.",
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/programming-guide/program-structure/comments-in-code',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Imports statement',
      body: 'Imports namespaces to use their types without full qualification.',
      details:
        '`Imports System` brings every public type in the `System` namespace into scope, so the rest of the file can write `Console.WriteLine` instead of `System.Console.WriteLine`. Imports are conventionally listed at the very top of the file, before any namespace or module declaration.\n\nA project can also declare project-level imports in its `.vbproj` file, which apply implicitly to every source file without an explicit `Imports` line: useful for namespaces like `System.Linq` that nearly every file in a project ends up needing.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/imports-statement-net-namespace-and-type',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'namespace',
      title: 'Namespace declaration',
      body: 'Organizes code into logical groups.',
      details:
        'A `Namespace` block groups related types under a dotted name, such as `MyConsoleApp`, so that two types named the same thing can coexist as long as they live in different namespaces. Namespaces are purely organizational and, like in C#, need not match the file or folder layout on disk.\n\nUnlike a `Module` or `Class` block, a `Namespace` cannot itself hold executable code or fields directly. It only contains further type declarations, closed with a matching `End Namespace`.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/namespace-statement',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'module',
      title: 'Module / Class definition',
      body: 'A container for code, data, and methods.',
      details:
        'A `Module` is a VB.NET-specific construct: a container whose members are implicitly `Shared` (static), so nothing inside it ever needs an instance created with `New`. Console applications traditionally put `Sub Main` inside a `Module` precisely because the entry point must be callable without instantiating anything first.\n\nA `Class` is the general-purpose, instantiable alternative, supporting fields, properties, constructors, and inheritance. Both are closed with their own matching `End Module` / `End Class`, and a single file may declare several of either.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/module-statement',
      color: 'green',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration (Dim/Const)',
      body: 'Declares variables (`Dim`) and constants (`Const`).',
      details:
        '`Dim greeting As String = "Hello, VB.NET!"` declares a variable with an explicit type using the `As` clause. With `Option Strict On` (recommended in every project template since VB 2005), the compiler enforces that type and disallows silent narrowing conversions; without it, VB.NET quietly falls back to its dynamically-typed `Variant`-like heritage, for better or worse.\n\n`Const MaxCount As Integer = 3` declares a compile-time constant that cannot be reassigned. Unlike `Dim`, a `Const` must be initialized at declaration and its value must be resolvable at compile time: no calling a function to produce it.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/dim-statement',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'sub',
      title: 'Subroutine definition (Sub)',
      body: 'Defines a procedure that does not return a value.',
      details:
        '`Sub` declares a procedure with no return value, the VB.NET equivalent of a `void` method. `Sub Main(args As String())` is the conventional entry point for a console application, discovered by the .NET runtime the same way `Main` is in C#.\n\nA `Sub` is invoked as a statement on its own line, never as part of an expression, since it produces nothing to use. Every `Sub` block closes with `End Sub`, and like most VB.NET block keywords this pairing is enforced by the compiler, not just a style convention.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/sub-statement',
      color: 'red',
      side: 'left',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'Defines a procedure that returns a value.',
      details:
        '`Function Add(a As Integer, b As Integer) As Integer` declares a procedure whose trailing `As Integer` names its return type, and whose body must produce that type via a `Return` statement (or, in older style, by assigning the function\'s own name as if it were a variable). `End Function` closes the block.\n\nFunctions and Subs together are called "procedures" in VB.NET terminology, and both support optional parameters (with default values), `ByRef` vs `ByVal` parameter passing, and overloading via the `Overloads` modifier.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/function-statement',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'method-call',
      title: 'Method call',
      body: 'Executing a subroutine or function.',
      details:
        '`Console.WriteLine(greeting)` calls the shared `WriteLine` method on the `Console` class, passing `greeting` as its argument. Parentheses around arguments are required when calling a `Function` for its value, and are conventional (though technically optional in some `Sub` call forms) for readability.\n\nVB.NET resolves overloaded calls by matching argument types at compile time, the same way C# does, and supports named arguments (`WriteLine(value:=greeting)`) so a caller can label which parameter each argument fills.',
      learnMore: 'https://learn.microsoft.com/en-us/dotnet/api/system.console.writeline',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly (`For`, `While`).',
      details:
        '`For i As Integer = 1 To MaxCount ... Next` counts a loop variable through an inclusive range, optionally with a `Step` clause to change the increment. `For Each element In collection` iterates any `IEnumerable`, and `While`/`Do While`/`Do Until` loops repeat based on a condition checked before or after the body.\n\nEvery loop form is closed by its own matching keyword (`Next`, `End While`, `Loop`), which is part of why VB.NET reads as unusually verbose next to brace languages: but it also means a stray closing brace can never silently close the wrong block.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/for-next-statement',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Selects which code to execute based on a condition (`If`, `Select Case`).',
      details:
        '`If ... Then ... Else ... End If` routes execution based on a `Boolean` condition. The single-line form (`If x Then y`) omits `End If` entirely, while the block form spanning multiple lines requires it, a frequent source of confusion for newcomers copy-pasting snippets between the two styles.\n\n`Select Case` handles multi-branch dispatch more cleanly than a chain of `ElseIf`s, supporting single values, ranges (`Case 1 To 5`), and comma-separated lists (`Case 1, 3, 5`) per `Case` clause.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/if-then-else-statement',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'string-interp',
      title: 'String interpolation ($"...")',
      body: 'Embeds expressions in double-quoted strings.',
      details:
        'Prefixing a string literal with `$`, as in `$"Even count: {i}"`, lets any expression inside `{ }` be evaluated and formatted directly into the resulting string. It was introduced in VB 14 (Visual Studio 2015), years after classic VB6-style concatenation with `&` had already calcified into muscle memory for a generation of developers.\n\nA literal brace inside an interpolated string is escaped by doubling it (`{{` / `}}`), and format specifiers work the same as with `String.Format`, e.g. `$"{price:C}"` for currency formatting.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/visual-basic/programming-guide/language-features/strings/interpolated-strings',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: "' A minimal VB.NET script -- yes, it really does need End Module",
        refs: ['comment'],
      },
      { code: 'Imports System', refs: ['imports'] },
      { code: '' },
      {
        code: 'Module Program',
        refs: ['module'],
      },
      {
        code: '    Const Greeting As String = "Hello from VB.NET, still verbose after all these years"',
        refs: ['variable'],
      },
      { code: '' },
      {
        code: '    Sub Main(args As String())',
        refs: ['sub'],
      },
      {
        code: '        For i As Integer = 1 To 3',
        refs: ['loop'],
      },
      {
        code: '            If i Mod 2 = 0 Then',
        refs: ['conditional'],
      },
      {
        code: '                Console.WriteLine($"{Greeting} ({i})")',
        refs: ['conditional', 'method-call', 'string-interp'],
      },
      { code: '            End If', refs: ['conditional'] },
      { code: '        Next', refs: ['loop'] },
      { code: '    End Sub', refs: ['sub'] },
      { code: 'End Module', refs: ['module'] },
    ],
    verbose: [
      { code: "' This is a single-line comment", refs: ['comment'] },
      { code: "Imports System ' Import a namespace", refs: ['imports', 'comment'] },
      { code: '' },
      {
        code: "Namespace MyConsoleApp ' Namespace declaration",
        refs: ['namespace', 'comment'],
      },
      {
        code: "    ' Module definition (can also be a Class)",
        refs: ['comment'],
      },
      {
        code: '    Module Program',
        refs: ['module'],
      },
      {
        code: "        ' Variable declaration",
        refs: ['comment'],
      },
      {
        code: '        Dim greeting As String = "Hello, VB.NET! Still compiling after all these years."',
        refs: ['variable'],
      },
      {
        code: "        Const MaxCount As Integer = 3 ' Constant",
        refs: ['variable', 'comment'],
      },
      { code: '' },
      {
        code: "        ' Main entry point subroutine",
        refs: ['comment'],
      },
      {
        code: '        Sub Main(args As String())',
        refs: ['sub'],
      },
      {
        code: "            Console.WriteLine(greeting) ' Method call",
        refs: ['sub', 'method-call', 'comment'],
      },
      { code: '', refs: ['sub'] },
      {
        code: "            ' Control flow (loop)",
        refs: ['sub', 'comment'],
      },
      {
        code: '            For i As Integer = 1 To MaxCount',
        refs: ['sub', 'loop'],
      },
      {
        code: "                ' Control flow (conditional)",
        refs: ['sub', 'loop', 'comment'],
      },
      {
        code: '                If i Mod 2 = 0 Then',
        refs: ['sub', 'loop', 'conditional'],
      },
      {
        code: '                    Console.WriteLine($"Even count: {i}") \' String interpolation',
        refs: ['sub', 'loop', 'conditional', 'string-interp', 'method-call', 'comment'],
      },
      { code: '                Else', refs: ['sub', 'loop', 'conditional'] },
      {
        code: '                    Console.WriteLine($"Odd count: {i}, an off-by-one joke waiting to happen")',
        refs: ['sub', 'loop', 'conditional', 'string-interp', 'method-call'],
      },
      { code: '                End If', refs: ['sub', 'loop', 'conditional'] },
      { code: '            Next', refs: ['sub', 'loop'] },
      { code: '        End Sub', refs: ['sub'] },
      { code: '' },
      {
        code: "        ' Function definition",
        refs: ['comment'],
      },
      {
        code: '        Function Add(a As Integer, b As Integer) As Integer',
        refs: ['function'],
      },
      {
        code: "            Return a + b ' No semicolon required, and no apology offered",
        refs: ['function', 'comment'],
      },
      { code: '        End Function', refs: ['function'] },
      { code: '    End Module', refs: ['module'] },
      { code: 'End Namespace', refs: ['namespace'] },
    ],
  },
}
