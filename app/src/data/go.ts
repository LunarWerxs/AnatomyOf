import type { LanguageDef } from '../lib/types'

export const go: LanguageDef = {
  id: 'go',
  popularity: 13,
  name: 'Go',
  titleWord: 'Go',
  article: 'a',
  extensions: ['.go'],
  accentHex: '#00add8',
  officialUrl: 'https://go.dev/',
  shikiLang: 'go',
  note: 'Go is a statically typed, compiled programming language designed for simplicity, concurrency, and performance.',
  annotations: [
    {
      id: 'package',
      title: 'Package declaration',
      body: 'Defines the package name (e.g., `main` for executables).',
      details:
        "Every Go source file starts with a `package` clause. Files sharing a package name in the same directory form a single compilation unit that can freely reference each other's identifiers without imports. The special package name `main` marks an executable rather than a reusable library.\n\nA `main` package must additionally provide a `func main()`: the combination of `package main` and `func main()` is what makes `go build` produce a runnable binary instead of just compiling importable code.",
      learnMore: 'https://go.dev/ref/spec#Package_clause',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* ... */`), ignored by the compiler.',
      details:
        "`//` comments run to the end of the line; `/* ... */` block comments can span multiple lines but do not nest. Both are stripped before compilation and have no effect on the compiled binary.\n\nA comment placed directly above a top-level declaration with no blank line in between becomes that identifier's \"doc comment\": `go doc` and pkg.go.dev render it as the item's documentation, so convention asks the comment to start with the identifier's own name, e.g. `// Area returns ...`.",
      learnMore: 'https://go.dev/doc/comment',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Brings in external packages.',
      details:
        'A parenthesized `import ( ... )` block lists one package path per line; a single import can also be written as `import "fmt"` without parentheses. Every imported package must be used somewhere in the file, or the compiler refuses to build. Go treats unused imports as an error, not a warning.\n\nImported identifiers are referenced through the package name, such as `fmt.Printf` or `math.Pi`. Tools like `goimports` automatically add missing imports and remove unused ones, and group standard-library imports separately from third-party ones by convention.',
      learnMore: 'https://go.dev/ref/spec#Import_declarations',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'struct',
      title: 'Struct definition',
      body: 'Defines a custom data type with fields using `type ... struct`.',
      details:
        "A `struct` groups related fields into a single composite type. `type Circle struct { Radius float64 }` declares a new named type `Circle` whose values each carry their own `Radius`. Structs are Go's primary way to model records, since the language has no classes.\n\nStruct values are copied by default on assignment or when passed to a function; pointers (`*Circle`) are used when shared mutation or avoiding a copy is desired. Struct literals like `Circle{Radius: r}` construct a value directly, and field names may be omitted if every field is supplied positionally in order.",
      learnMore: 'https://go.dev/ref/spec#Struct_types',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field (struct member)',
      body: 'Data stored within a struct.',
      details:
        "Each line inside a `struct` body declares a field: a name followed by its type, such as `Radius float64`. Fields are accessed with dot notation (`c.Radius`) and can be read or reassigned directly unless the struct is accessed through an interface that hides them.\n\nA field name starting with an uppercase letter, like `Radius`, is exported and visible to other packages; a lowercase name such as `radius` would be unexported and package-private. This capitalization rule is Go's only visibility mechanism. There is no `public`/`private` keyword.",
      learnMore: 'https://go.dev/ref/spec#Exported_identifiers',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'method',
      title: 'Method definition (with receiver)',
      body: 'A function associated with a type, declared with a receiver.',
      details:
        "Writing `func (c Circle) Area() float64` attaches `Area` to the `Circle` type through the receiver `(c Circle)`, which sits between `func` and the method name. Inside the method body, `c` refers to the specific `Circle` value the method was called on, similar to `self` or `this` in other languages.\n\nA value receiver like `(c Circle)` operates on a copy of the struct, so mutations inside the method do not affect the caller's original; a pointer receiver `(c *Circle)` operates on the original and is required if the method needs to modify fields or avoid copying a large struct.",
      learnMore: 'https://go.dev/ref/spec#Method_declarations',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'return',
      title: 'Return statement',
      body: 'Exits the function and returns a value.',
      details:
        "`return` immediately ends execution of the current function and sends the given expression back to the caller. A function's return type(s) are declared after its parameter list, such as the `float64` in `func (c Circle) Area() float64`, and every code path through the function must return a value of that type.\n\nGo functions can return multiple values, most commonly a result paired with an `error`, e.g. `func divide(a, b float64) (float64, error)`. Named return values can also be declared in the signature and returned with a bare `return`, which fills them in from whatever the named variables currently hold.",
      learnMore: 'https://go.dev/ref/spec#Return_statements',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'main-function',
      title: 'Main function',
      body: 'The entry point for a Go application (`func main`).',
      details:
        'When a program is built from `package main`, execution begins at `func main()`. It takes no parameters and returns nothing; the process exits with status 0 when `main` returns normally, or a nonzero status if the program calls `os.Exit` with another value or panics.\n\nThe main package declares one package-level `main` function. It is syntactically callable like another function, but doing so simply invokes it again and does not create a second entry point. Startup logic such as flag parsing and dependency wiring typically lives in `main` or in `init` functions that run before it.',
      learnMore: 'https://go.dev/ref/spec#Program_execution',
      color: 'red',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration (short)',
      body: 'Declares and initializes variables with `:=`.',
      details:
        "The short variable declaration `r := 5.0` declares `r` and infers its type from the initializer in a single step; it is only valid inside a function body, not at package scope. The longer form `var r float64 = 5.0` (or `var r float64` with a later assignment) works anywhere and is required when you want a type different from what would be inferred, or a zero-valued variable with no initializer.\n\n`:=` can also declare several names at once, such as `c := Circle{Radius: r}`, and is idiomatic for the common pattern of capturing a function's result alongside its error: `area, err := compute()`. At least one variable on the left must be new, or the compiler rejects the statement as redundant.",
      learnMore: 'https://go.dev/ref/spec#Short_variable_declarations',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'method-call',
      title: 'Method/function call',
      body: 'Executing a function or method.',
      details:
        'A call expression like `c.Area()` looks up the `Area` method on the value `c` and executes it, here assigning its single return value to `area` via `:=`. Calling a regular function follows the same syntax without a receiver, e.g. `add(1, 2)`.\n\nGo evaluates arguments left to right before the call happens, and (because the language has no method overloading) each method or function name resolves to exactly one signature per type. `fmt.Printf(...)` in the same example is itself a function call, taking a format string and the values to substitute into it.',
      learnMore: 'https://go.dev/ref/spec#Calls',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `else`).',
      details:
        '`if area > 50 { ... } else { ... }` branches on a boolean expression; unlike C or Java, the condition needs no parentheses, but the braces are mandatory even for a single statement. `if` can also include a short init statement, as in `if err := doWork(); err != nil { ... }`, scoping `err` to just the `if`/`else` chain.\n\nThe `(err != nil)` idiom shown there is the standard way Go signals failure: rather than exceptions, most functions return an `error` as their last value, and callers check it explicitly right after the call. `else` is optional, and `else if` chains additional conditions.',
      learnMore: 'https://go.dev/ref/spec#If_statements',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: "Repeats code: `for` is Go's only loop keyword.",
      details:
        '`for i := 0; i < 3; i++ { ... }` is the classic three-clause form: init, condition, post-statement. Go has no separate `while` or `do...while` keyword, dropping the init and post clauses (`for condition { ... }`) gives while-loop behavior, and omitting everything (`for { ... }`) produces an infinite loop.\n\n`for ... range` iterates over arrays, slices, strings, maps, and channels, yielding an index/key and value pair each pass. `break` exits the loop immediately and `continue` skips to the next iteration; both can target an outer loop when combined with a label.',
      learnMore: 'https://go.dev/ref/spec#For_statements',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'Defines a reusable block of code with `func`.',
      details:
        'A top-level function like `func add(a, b int) int { return a + b }` declares its parameters and their types, followed by its return type. Consecutive parameters that share a type can drop the repeated annotation, so `a, b int` means both `a` and `b` are `int`.\n\nA capitalized function name such as `Add` would be exported and callable from other packages that import this one; the lowercase `add` here is unexported and only reachable from within its own package. Functions are values in Go. They can be assigned to variables, passed as arguments, and returned from other functions.',
      learnMore: 'https://go.dev/ref/spec#Function_declarations',
      color: 'blue',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      { code: 'package main', refs: ['package'] },
      { code: '' },
      { code: 'import "fmt"', refs: ['imports'] },
      { code: '' },
      {
        code: 'type Greeting struct {\n\tText string\n}',
        refs: ['struct', 'field'],
      },
      { code: '' },
      {
        code: 'func (g Greeting) Shout() string {\n\treturn g.Text + "!"\n}',
        refs: ['method', 'return'],
      },
      { code: '' },
      {
        code: 'func main() {\n\tg := Greeting{Text: "hello"}\n\tfmt.Println(g.Shout()) // no exceptions were harmed in this call\n}',
        refs: ['main-function', 'variable', 'method-call'],
      },
    ],
    verbose: [
      {
        code: 'package main // gofmt already has opinions about this file',
        refs: ['package', 'comment'],
      },
      { code: '' },
      {
        code: 'import (\n\t"fmt" // Import external package\n\t"math"\n)',
        refs: ['imports'],
      },
      { code: '' },
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: '/* This is a\n   multi-line comment */',
        refs: ['comment'],
      },
      { code: '' },
      { code: '// Struct definition', refs: ['struct'] },
      {
        code: 'type Circle struct {\n\tRadius float64 // Struct field\n}',
        refs: ['struct', 'field'],
      },
      { code: '' },
      { code: '// Method definition (with receiver)', refs: ['method'] },
      {
        code: 'func (c Circle) Area() float64 {\n\treturn math.Pi * c.Radius * c.Radius\n}',
        refs: ['method', 'return'],
      },
      { code: '' },
      { code: '// Main function -- entry point', refs: ['main-function'] },
      { code: 'func main() {', refs: ['main-function'] },
      {
        code: '\t// Variable declaration with short declaration operator\n\tr := 5.0',
        refs: ['main-function', 'variable'],
      },
      {
        code: '\tc := Circle{Radius: r} // Struct instantiation',
        refs: ['main-function', 'variable'],
      },
      { code: '', refs: ['main-function'] },
      { code: '\t// Method call', refs: ['main-function'] },
      {
        code: '\tarea := c.Area()',
        refs: ['main-function', 'method-call'],
      },
      { code: '', refs: ['main-function'] },
      { code: '\t// Print to console (gophers do not do exceptions)', refs: ['main-function'] },
      {
        code: '\tfmt.Printf("Circle with radius %.2f has area: %.2f\\n", r, area)',
        refs: ['main-function'],
      },
      { code: '', refs: ['main-function'] },
      { code: '\t// Control flow (conditional)', refs: ['main-function', 'conditional'] },
      {
        code: '\tif area > 50 {\n\t\tfmt.Println("This is a large circle.")\n\t} else {\n\t\tfmt.Println("This is a small circle.")\n\t}',
        refs: ['main-function', 'conditional'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '\t// Control flow (loop) -- yes, "for" really is the only loop keyword',
        refs: ['main-function', 'loop'],
      },
      {
        code: '\tfor i := 0; i < 3; i++ {\n\t\tfmt.Println("Loop iteration:", i)\n\t}',
        refs: ['main-function', 'loop'],
      },
      { code: '}', refs: ['main-function'] },
      { code: '' },
      { code: '// Regular function definition', refs: ['function'] },
      { code: 'func add(a, b int) int {', refs: ['function'] },
      {
        code: '\treturn a + b // Return statement',
        refs: ['function', 'return'],
      },
      { code: '}', refs: ['function'] },
    ],
  },
}
