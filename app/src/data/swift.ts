import type { LanguageDef } from '../lib/types'

export const swift: LanguageDef = {
  id: 'swift',
  popularity: 15,
  name: 'Swift',
  titleWord: 'Swift',
  article: 'a',
  extensions: ['.swift'],
  accentHex: '#f05138',
  officialUrl: 'https://www.swift.org/',
  shikiLang: 'swift',
  note: 'Swift is a powerful, general-purpose, multi-paradigm programming language for Apple platforms and beyond, known for its safety, speed, and expressive syntax.',
  annotations: [
    {
      id: 'import',
      title: 'Import statement',
      body: 'Brings in modules, frameworks, or libraries.',
      details:
        "`import Foundation` makes an entire module's types and functions available in the current file. The standard library itself (`Swift`) is imported implicitly everywhere, so an explicit `import` is only needed for additional modules like `Foundation`, `UIKit`, or a third-party package pulled in through Swift Package Manager.\n\nImports are file-scoped: a module imported in one file is not automatically visible in another file of the same target. Xcode and `swiftc` resolve module names against build settings and package dependencies, and an unused import produces only a compiler warning, not an error.",
      learnMore: 'https://docs.swift.org/swift-book/',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* ... */`), ignored by the compiler.',
      details:
        'A double slash starts a comment that runs to the end of the line. A block comment opens with `/*` and closes with `*/`, and unlike C, Swift block comments can nest inside one another, which makes it safe to comment out a region that already contains a block comment.\n\nA comment written with three slashes (`///`) or in `/** ... */` form becomes documentation markup: Xcode renders it in Quick Help and jump-to-definition popovers, and it supports lightweight markup like `- Parameter` and `- Returns` fields.',
      learnMore:
        'https://www.swift.org/documentation/api-design-guidelines/#documentation-comments',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'protocol',
      title: 'Protocol definition',
      body: 'Defines a blueprint of methods and properties a type can adopt.',
      details:
        'A `protocol` declares requirements (properties, methods, or initializers) without providing an implementation. `var greeting: String { get }` requires a readable `greeting` property; any type that conforms must supply one, whether stored or computed. Any type can conform to any number of protocols, which is how Swift shares behavior across unrelated `struct`, `class`, and `enum` types without single inheritance.\n\nProtocol extensions can supply default implementations for a requirement, so conforming types only need to override the parts that differ. This "protocol-oriented" style is idiomatic Swift: code is commonly written against a protocol type rather than a concrete class, keeping call sites decoupled from any one implementation.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols',
      color: 'green',
      side: 'left',
    },
    {
      id: 'struct',
      title: 'Struct definition',
      body: 'Defines a value type with properties and methods.',
      details:
        "`struct Person: Greetable` declares a new value type that conforms to the `Greetable` protocol; the colon introduces the conformance list the same way it would list a superclass for a `class`. Structs bundle stored properties and methods together, and Swift automatically synthesizes a memberwise initializer when no custom `init` is defined.\n\nBecause a struct is a value type, assigning it to another variable or passing it to a function copies its value rather than sharing a reference, mutating the copy never affects the original. This is a deliberate contrast with `class`, a reference type; Apple's guidance favors structs by default and reserves classes for cases that need shared, mutable identity or Objective-C interoperability.",
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'property',
      title: 'Property',
      body: 'Stored (`let`/`var`) or computed variables within a type.',
      details:
        'A stored property holds a value directly, declared with `let` for a constant or `var` for one that can change after initialization; `let name: String` can never be reassigned once set, while `var age: Int` can. Type annotations like `: String` are often optional (Swift infers the type from an initial value) but are required here because these properties get their values later, from an initializer.\n\nA computed property such as `var greeting: String { ... }` has no storage of its own; instead its body runs every time the property is read and returns a freshly computed value. Computed properties can also expose a `set` block to react to new values, and both stored and computed properties may appear side by side in the same type.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'string-interpolation',
      title: 'String interpolation',
      body: 'Embeds expressions in strings using `\\(...)`.',
      details:
        'A backslash followed by parentheses, `\\(name)`, evaluates the expression inside and inserts its textual representation directly into the surrounding string literal. Any expression is allowed, not just a simple variable, `\\(alice.age >= 18 ? "adult" : "minor")` works just as well as `\\(name)`.\n\nInterpolation calls the same `description` machinery used by `String(describing:)`, so a custom type can control how it appears in interpolated strings by conforming to `CustomStringConvertible`. Because the escape sequence is `\\(...)` rather than a `$`-prefixed marker, a literal dollar sign never needs special escaping inside a Swift string.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters/#String-Interpolation',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Method definition (func)',
      body: 'Defines a reusable block of code within a type.',
      details:
        "The `func` keyword introduces a function or, when written inside a type, a method. `func greet() { print(greeting) }` takes no parameters and returns nothing; a method with a return value declares it after an arrow, as in `func greet() -> String`. Parameters can carry an external argument label distinct from the internal name used in the body, which is why Swift call sites often read like natural language.\n\nMethods that need to mutate a struct's own stored properties must be marked `mutating`, since methods are non-mutating by default on value types. This restriction does not apply to classes, whose methods can always modify instance state through the shared reference.",
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions',
      color: 'red',
      side: 'left',
    },
    {
      id: 'extension',
      title: 'Extension',
      body: 'Adds functionality to an existing type.',
      details:
        "`extension Person { ... }` adds new methods, computed properties, or protocol conformances to `Person` without touching its original declaration or needing access to its source. Extensions work on types you don't own too, including types from the standard library or a third-party framework.\n\nA common pattern splits a type's protocol conformances into separate extensions, one per protocol, so each block reads as a self-contained implementation of that requirement. Extensions cannot add new stored properties, since that would change the type's memory layout after the fact: only computed properties, methods, initializers, and nested types are allowed.",
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/extensions',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration (let/var)',
      body: '`let` for constants, `var` for variables.',
      details:
        'Outside of a type, `let` and `var` declare local or global bindings the same way they declare stored properties: `let` fixes a name to a value permanently, while `var` allows reassignment. Swift infers the type from the assigned expression, so `var alice = Person(name: "Alice", age: 30)` needs no explicit type annotation.\n\nSwift strongly favors `let`. A variable should only be declared `var` when the code genuinely reassigns it later, and the compiler emits a warning when a `var` is never mutated, nudging it back to a constant. This default-to-immutable habit catches accidental reassignment at compile time rather than at runtime.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Constants-and-Variables',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'instantiation',
      title: 'Object instantiation & method call',
      body: 'Creating an instance and executing its methods.',
      details:
        '`Person(name: "Alice", age: 30)` calls the memberwise initializer Swift synthesized for the struct, supplying a value for every stored property by its argument label. Once `alice` exists, dot syntax reaches its members: `alice.greet()` calls a method, and a call like `alice.celebrateBirthday()` can just as easily invoke a method added later through an extension. The caller cannot tell the difference.\n\nBecause `Person` is a struct, `alice` owns its own independent copy of the data; assigning `alice` to another variable would copy it, and mutating one copy would never be visible through the other. A class instance behaves differently. Multiple variables can refer to the same underlying object, so a mutation through one is visible through all of them.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'control-flow',
      title: 'Control flow (conditional & loop)',
      body: 'Executes code based on logic (`if`, `guard`, `switch`) or repeatedly (`for`, `while`).',
      details:
        '`if`/`else` branches on a `Bool` condition with no parentheses required around it, though the branch bodies always need braces. `guard` is Swift\'s complementary form: `guard condition else { return }` states a requirement up front and exits early when it fails, which keeps the "happy path" unindented for the rest of the function. `switch` must be exhaustive over its input and supports rich pattern matching, including ranges and tuples, well beyond simple equality checks.\n\n`for i in 1...3` iterates the closed range `1...3`, which includes both endpoints. The half-open operator `..<` would exclude the upper bound. `while` repeats as long as its condition holds, and `repeat...while` guarantees the body runs at least once before the condition is even checked.',
      learnMore:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow',
      color: 'pink',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      { code: 'import Foundation', refs: ['import'] },
      { code: '' },
      {
        code: 'struct Greeting {\n    let name: String // Constant (immutable)\n}',
        refs: ['struct', 'property', 'variable'],
      },
      { code: '' },
      {
        code: 'extension Greeting {\n    func shout() -> String {\n        "HELLO, \\(name.uppercased())!"\n    }\n}',
        refs: ['extension', 'function', 'string-interpolation'],
      },
      { code: '' },
      {
        code: 'let greeting = Greeting(name: "Alice")\nprint(greeting.shout())',
        refs: ['variable', 'instantiation'],
      },
      { code: '' },
      {
        code: 'for i in 1...3 {\n    print("Attempt \\(i)")\n}',
        refs: ['control-flow', 'string-interpolation'],
      },
    ],
    verbose: [
      { code: 'import Foundation // Import standard library framework', refs: ['import'] },
      { code: '' },
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "/*\n  This is a multi-line comment\n  describing the file's purpose and content.\n  (No force-unwraps were harmed in the making of this file.)\n*/",
        refs: ['comment'],
      },
      { code: '' },
      { code: '// Protocol definition', refs: ['protocol'] },
      {
        code: 'protocol Greetable {\n    var greeting: String { get }\n    func greet()\n}',
        refs: ['protocol'],
      },
      { code: '' },
      { code: '// Struct definition conforming to a protocol', refs: ['struct'] },
      { code: 'struct Person: Greetable {', refs: ['struct'] },
      { code: '    // Stored properties', refs: ['struct', 'property'] },
      {
        code: '    let name: String // Constant (immutable)\n    var age: Int // Variable (mutable)',
        refs: ['struct', 'property', 'variable'],
      },
      { code: '', refs: ['struct'] },
      { code: '    // Computed property', refs: ['struct', 'property'] },
      {
        code: '    var greeting: String {\n        "Hello, my name is \\(name) and I am \\(age) years old."\n    }',
        refs: ['struct', 'property', 'string-interpolation'],
      },
      { code: '', refs: ['struct'] },
      { code: '    // Method definition', refs: ['struct', 'function'] },
      {
        code: '    func greet() {\n        print(greeting) // Function call\n    }',
        refs: ['struct', 'function'],
      },
      { code: '}', refs: ['struct'] },
      { code: '' },
      { code: '// Extension to add functionality to an existing type', refs: ['extension'] },
      { code: 'extension Person {', refs: ['extension'] },
      {
        code: '    func celebrateBirthday() {\n        // age is a var, so mutating it here is totally legal\n        print("Happy Birthday, \\(name)! Still a value type, still no memory leaks.")\n    }',
        refs: ['extension', 'function', 'string-interpolation'],
      },
      { code: '}', refs: ['extension'] },
      { code: '' },
      { code: '// Main execution block (top-level code)' },
      { code: 'print("Starting Swift script... it compiled, so it must be correct.")' },
      { code: '' },
      {
        code: '// Variable declaration & object instantiation',
        refs: ['variable', 'instantiation'],
      },
      {
        code: 'var alice = Person(name: "Alice", age: 30)',
        refs: ['variable', 'instantiation'],
      },
      { code: '' },
      { code: '// Method calls', refs: ['instantiation'] },
      {
        code: 'alice.greet()\nalice.celebrateBirthday()',
        refs: ['instantiation'],
      },
      { code: '' },
      { code: '// Control flow (conditional)', refs: ['control-flow'] },
      {
        code: 'if alice.age >= 18 {\n    print("\\(alice.name) is an adult.")\n} else {\n    print("\\(alice.name) is a minor.")\n}',
        refs: ['control-flow', 'string-interpolation'],
      },
      { code: '' },
      { code: '// Control flow (loop over a range)', refs: ['control-flow'] },
      {
        code: 'for i in 1...3 {\n    print("Count: \\(i)") // three whole attempts, living dangerously\n}',
        refs: ['control-flow', 'string-interpolation'],
      },
    ],
  },
}
