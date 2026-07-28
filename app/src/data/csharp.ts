import type { LanguageDef } from '../lib/types'

export const csharp: LanguageDef = {
  id: 'csharp',
  popularity: 5,
  name: 'C#',
  titleWord: 'C#',
  article: 'a',
  extensions: ['.cs'],
  accentHex: '#68217a',
  officialUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  shikiLang: 'csharp',
  note: 'C# is a modern, object-oriented, type-safe programming language in the C-family, designed for the .NET platform.',
  annotations: [
    {
      id: 'using',
      title: 'Using directive',
      body: 'Imports namespaces for use in the file.',
      details:
        '`using System;` brings every public type in the `System` namespace (`Console`, `String`, `Int32`, and so on) into scope so the rest of the file can refer to them by their short name instead of the fully qualified `System.Console`. Using directives are conventionally listed at the very top of the file, before the namespace declaration.\n\nModern C# (10+) also supports implicit usings, where the compiler silently adds the most common `using` directives for a project type, and `global using` declarations that apply a directive to every file in the project from one place.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'namespace',
      title: 'Namespace declaration',
      body: 'Organizes code into logical, hierarchical groups.',
      details:
        'A `namespace` groups related types under a dotted name such as `CSharpAnatomyDemo` so that two classes named the same thing can coexist as long as they live in different namespaces. Namespaces are purely organizational and, unlike Java packages, do not need to match the file or folder layout on disk.\n\nModern C# (10+) also allows a file-scoped form, `namespace CSharpAnatomyDemo;` with no braces, which applies to everything below it and removes one level of indentation from the whole file.',
      learnMore: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/namespaces',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'xmldoc',
      title: 'XML documentation comment',
      body: 'Triple-slash comments (`///`) used to generate API documentation.',
      details:
        'A comment starting with `///` is an XML documentation comment. Placed directly above a type or member, tags like `<summary>` and `<param name="...">` describe what it does and what its parameters mean; tools can extract these comments into IntelliSense tooltips and generated reference documentation.\n\nThis differs from an ordinary `//` or `/* ... */` comment, which the compiler discards entirely. With XML doc comments, enabling the `<GenerateDocumentationFile>` MSBuild setting turns them into a `.xml` file shipped alongside the compiled assembly.',
      learnMore: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'The blueprint for objects, declared with `class`.',
      details:
        'C# is thoroughly object-oriented: essentially all executable code, including `Main`, lives inside a class or struct. `public class Program` declares a class named `Program` that can be instantiated with `new` and can hold fields, properties, methods, and nested types.\n\nUnlike Java, a single `.cs` file may declare any number of public classes, and the file name has no required relationship to any type name inside it. Classes support single inheritance from one base class plus any number of interfaces.',
      learnMore: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field (class variable)',
      body: 'Stores data for the class or its instances.',
      details:
        "A field declared directly in the class body, like `private static int _counter = 0;`, holds state. Without `static` each instance gets its own copy; with `static` the field belongs to the class itself and every instance shares one copy. Access modifiers (`private`, `public`, `protected`, `internal`) control visibility.\n\nC# is strongly and statically typed, so a field's type is fixed at declaration and checked by the compiler. Convention prefixes private fields with an underscore, as in `_counter`, to distinguish them from parameters and properties at a glance.",
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'main-method',
      title: 'Main method',
      body: 'The entry point for a C# application (`static void Main(string[] args)`).',
      details:
        'The .NET runtime starts an executable by looking for a `Main` method. `static` means it runs without an instance of the class, `void` (or `int`, to return an exit code) describes what it hands back to the operating system, and the optional `string[] args` parameter receives command-line arguments.\n\nBefore any of this runs, the C# compiler (`csc`/Roslyn) translates the source into Intermediate Language (IL) stored in an assembly; the Common Language Runtime (CLR) then JIT-compiles that IL to native code at run time. Since C# 9, "top-level statements" let a file skip the explicit `Main` declaration entirely for simple programs.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/main-command-line',
      color: 'red',
      side: 'right',
    },
    {
      id: 'method',
      title: 'Method definition',
      body: 'A reusable block of code declared with a return type and parameter list.',
      details:
        'A method declares an access modifier, a return type, a name, and a parenthesized parameter list, e.g. `public int Add(int a, int b)`. `void` means the method returns nothing; any other return type obliges every reachable code path through the method to return a value of that type.\n\nMethods are invoked on an instance (`calculator.Add(5, 10)`) unless declared `static`, in which case they belong to the class itself and are called through the class name, like `IncrementCounter()` inside `Program`. C# supports overloading (multiple methods with the same name but different parameter lists) resolved at compile time.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'method-call',
      title: 'Method call',
      body: 'Executing a method on an object or class.',
      details:
        '`Console.WriteLine("Hello, C# World!");` invokes the static `WriteLine` method on the `Console` class, and `calculator.Add(5, 10);` invokes an instance method on the object referenced by `calculator`. The compiler resolves overloads by matching the argument types at the call site.\n\nMethod calls can chain and nest freely, and C# supports optional and named arguments (`Add(a: 5, b: 10)`), letting a caller skip parameters that have defaults or clarify which value maps to which parameter.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly (e.g., `for`, `while`, `foreach`).',
      details:
        "The classic three-clause `for (int i = 0; i < 3; i++) { ... }` declares a loop variable, a continuation condition checked before each pass, and an update executed after each pass. C# also has `while` (checked up front), `do...while` (checked after the first pass), and `foreach`, which iterates directly over any `IEnumerable<T>` without manual indexing.\n\n`break` exits the nearest loop immediately, and `continue` skips straight to the next iteration's check. `foreach` is idiomatic for collections since it also disposes iterator resources correctly when the sequence implements `IDisposable`.",
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `else if`, `else`).',
      details:
        '`if`/`else if`/`else` route execution based on a `bool` expression: unlike C or JavaScript, C# does not allow integers or other types to stand in for a condition, which rules out a whole class of accidental-assignment bugs (`if (x = 1)` is a compile error, not a silent truth value).\n\nC# also offers a `switch` statement and, since C# 8, `switch` expressions with pattern matching, which can match on type, value ranges, and destructured properties in a single concise expression.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'object-creation',
      title: 'Object instantiation',
      body: 'Creates a new instance of a class with `new`.',
      details:
        "`new Calculator()` allocates memory for a fresh object on the managed heap, runs the matching constructor, and evaluates to a reference to that object. Since C# 9, target-typed `new` lets the type be inferred from context, as in `Calculator calculator = new();`.\n\nBecause objects are accessed through references, assigning one variable to another copies the reference, not the object, both variables then point at the same instance. The CLR's garbage collector reclaims unreachable objects automatically; C# has no manual `free` or `delete`.",
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/new-operator',
      color: 'pink',
      side: 'left',
    },
    {
      id: 'string-interp',
      title: 'String interpolation',
      body: 'Embeds expressions directly inside a string with `$"..."`.',
      details:
        'Prefixing a string literal with `$`, as in `$"Counter value: {_counter}"`, lets any expression inside `{ }` be evaluated and formatted into the resulting string at that position. It compiles down to a call to `string.Format` (or, for simple cases, direct string concatenation), but reads far more clearly than either.\n\nInterpolated strings can include format specifiers, e.g. `{price:C}` for currency, and can be combined with verbatim strings as `$@"..."` to also disable escape-sequence processing for things like file paths.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'return',
      title: 'Return statement',
      body: 'Exits a method and, optionally, sends a value back to the caller.',
      details:
        '`return a + b;` immediately ends execution of the enclosing method and hands the given value back to the caller, which must match the method\'s declared return type. A method declared `void` can still use a bare `return;` to exit early without producing a value.\n\nThe compiler enforces that every reachable code path through a non-`void` method ends in a `return` (or throws), a static guarantee that catches a large class of "forgot to handle this branch" bugs before the program ever runs.',
      learnMore:
        'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements#the-return-statement',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: 'using System; // and System.Linq, and System.Threading.Tasks, and...', refs: [] },
      { code: '' },
      {
        code: 'public class Counter\n{\n    private int _total;',
        refs: ['class'],
      },
      {
        code: '    public void Add(int value) => _total += value;',
        refs: ['method'],
      },
      { code: '' },
      {
        code: '    static void Main(string[] args)\n    {\n        var counter = new Counter();',
        refs: ['main-method', 'object-creation'],
      },
      {
        code: '        for (int i = 0; i < 3; i++)\n            counter.Add(i);',
        refs: ['loop', 'method-call'],
      },
      { code: '        Console.WriteLine(counter._total);', refs: ['method-call'] },
      { code: '    }', refs: ['main-method'] },
      { code: '}', refs: ['class'] },
    ],
    verbose: [
      { code: 'using System; // Import namespace', refs: ['using'] },
      { code: '' },
      { code: 'namespace CSharpAnatomyDemo', refs: ['namespace'] },
      { code: '{', refs: ['namespace'] },
      {
        code: '    /// <summary>\n    /// This is an XML documentation comment for the class.\n    /// Four slashes deep and still not a joke -- IntelliSense reads these.\n    /// </summary>',
        refs: ['xmldoc'],
      },
      { code: '    public class Program // Class definition', refs: ['class'] },
      { code: '    {', refs: ['class'] },
      { code: '        // Class-level variable (field)', refs: ['field'] },
      { code: '        private static int _counter = 0;', refs: ['field'] },
      { code: '' },
      {
        code: '        /// <summary>\n        /// The entry point of the program.\n        /// </summary>\n        /// <param name="args">Command-line arguments.</param>',
        refs: ['xmldoc', 'main-method'],
      },
      { code: '        static void Main(string[] args)', refs: ['main-method'] },
      { code: '        {', refs: ['main-method'] },
      {
        code: '            Console.WriteLine("Hello, C# World!"); // Method call, nine keystrokes shorter than Java\'s System.out.println',
        refs: ['main-method', 'method-call'],
      },
      { code: '', refs: ['main-method'] },
      {
        code: '            /* Multi-line comment\n               demonstrating a loop.\n               "It works on my machine" -- ancient .NET proverb */',
        refs: ['main-method'],
      },
      {
        code: '            for (int i = 0; i < 3; i++)\n            {\n                IncrementCounter(); // Call a static method\n            }',
        refs: ['main-method', 'loop', 'method-call'],
      },
      { code: '            // Conditional logic', refs: ['main-method'] },
      {
        code: '            if (_counter > 2)\n            {',
        refs: ['main-method', 'conditional'],
      },
      {
        code: '                Console.WriteLine($"Counter value: {_counter}");',
        refs: ['main-method', 'conditional', 'method-call', 'string-interp'],
      },
      { code: '            }', refs: ['main-method', 'conditional'] },
      {
        code: '            var calculator = new Calculator(); // Object instantiation',
        refs: ['main-method', 'object-creation'],
      },
      {
        code: '            int result = calculator.Add(5, 10);',
        refs: ['main-method', 'method-call'],
      },
      {
        code: '            Console.WriteLine("Result: " + result); // definitely not a NullReferenceException today',
        refs: ['main-method', 'method-call'],
      },
      { code: '        }', refs: ['main-method'] },
      { code: '        // A static method', refs: ['method'] },
      { code: '        static void IncrementCounter()', refs: ['method'] },
      { code: '        {', refs: ['method'] },
      { code: '            _counter++;', refs: ['method'] },
      { code: '        }', refs: ['method'] },
      { code: '    }', refs: ['class'] },
      { code: '' },
      { code: '    public class Calculator // Another class', refs: ['class'] },
      { code: '    {', refs: ['class'] },
      {
        code: '        public int Add(int a, int b) // Method definition',
        refs: ['method'],
      },
      { code: '        {', refs: ['method'] },
      { code: '            return a + b; // Return statement', refs: ['method', 'return'] },
      { code: '        }', refs: ['method'] },
      { code: '    }', refs: ['class'] },
      { code: '}', refs: ['namespace'] },
    ],
  },
}
