import type { LanguageDef } from '../lib/types'

export const groovy: LanguageDef = {
  id: 'groovy',
  popularity: 54,
  name: 'Groovy',
  titleWord: 'Groovy',
  article: 'a',
  extensions: ['.groovy'],
  accentHex: '#4298b8',
  officialUrl: 'https://groovy-lang.org/',
  shikiLang: 'groovy',
  note: 'Groovy is an agile, dynamic language for the Java Platform with features like closures, optional typing, and scripting capabilities.',
  annotations: [
    {
      id: 'package',
      title: 'Package declaration',
      body: 'Defines the namespace for the file.',
      details:
        "A `package` statement, when present, is conventionally the first line of the file (comments aside). As with Java, it should match the directory the file lives in, though Groovy will not stop you from breaking that convention. It is far more forgiving about ceremony in general.\n\nBecause Groovy compiles to JVM bytecode, packages interoperate directly with Java's package system: a Groovy class and a Java class in the same package see each other with no translation layer, no wrapper, and no import required.",
      learnMore: 'https://groovy-lang.org/structure.html#_package_definition',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Brings a class or function into scope.',
      details:
        '`import java.time.LocalDate` works exactly as it does in Java. Groovy runs on the JVM and can import any class from the Java standard library or a third-party JAR with no adapter code. A handful of packages (`java.lang`, `java.util`, `java.io`, `groovy.lang`, and a few others) are imported automatically, so common types are already in scope.\n\nGroovy also supports static imports (`import static Math.PI`) and wildcard imports (`import java.util.*`), letting a file pull in exactly the surface area it needs.',
      learnMore: 'https://groovy-lang.org/structure.html#_imports',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'A blueprint for objects, declared with `class`.',
      details:
        '`class` declares a new type much like Java, but with less boilerplate: Groovy auto-generates a public no-arg constructor (when none is written), getters and setters for every property, and a sensible `toString()` unless you override them yourself. Fields default to `public` unless you add an explicit modifier.\n\nGroovy classes compile to ordinary `.class` files, so a Groovy class can extend a Java class, implement a Java interface, or be extended by Java code in the same project: the two languages coexist in the same build without friction.',
      learnMore: 'https://groovy-lang.org/objectorientation.html#_class',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field (property)',
      body: 'Data stored in an object, optionally typed.',
      details:
        'A field declared with an explicit type, like `String name`, behaves as it would in Java, except Groovy also generates the accessor methods automatically. `person.name` reads through the generated getter even though you never wrote one. A field declared with `def` instead, like `def age = 30`, is dynamically typed: its declared type is effectively `Object`, and it can hold anything at runtime.\n\nBecause Groovy treats fields as properties by default, `person.name = "Bob"` and `person.setName("Bob")` are interchangeable. The dot-assignment form is just syntax sugar over the generated setter.',
      learnMore: 'https://groovy-lang.org/objectorientation.html#_properties',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'method',
      title: 'Method definition',
      body: 'A reusable block of code, with optional parameter and return types.',
      details:
        'Methods may declare explicit types (`String greet(String greeting = "Hello")`) or use `def` to leave the return type dynamic. Parameters can carry default values directly in the signature, so callers may omit trailing arguments entirely, no overloads required.\n\nGroovy also makes the `return` keyword optional: a method\'s last expression is returned implicitly, a small convenience that shows up constantly once you get used to leaving it off.',
      learnMore: 'https://groovy-lang.org/objectorientation.html#_methods',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'string-interpolation',
      title: 'String interpolation (GString)',
      body: 'Embeds expressions in strings using `${}`.',
      details:
        'A double-quoted Groovy string is actually a `GString`, not a plain `java.lang.String`. It lazily evaluates any `${expression}` (or bare `$name`) placeholders it contains when the string is used. Single-quoted strings, by contrast, are always plain Java strings with no interpolation at all, which is the detail that trips up nearly everyone coming from another scripting language.\n\nTriple-quoted strings (`"""..."""`) support the same interpolation across multiple lines, making them a natural fit for templated text blocks, SQL snippets, or multi-line log messages.',
      learnMore: 'https://groovy-lang.org/syntax.html#_string_interpolation',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration (def)',
      body: 'Declares a variable with dynamic typing.',
      details:
        "`def` declares a variable without committing to a static type. The runtime type is whatever value is currently assigned, and it can change later. This is Groovy leaning into its scripting roots: quick to write, forgiving to refactor, and popular for exactly that reason in Gradle build files and Jenkins pipelines.\n\nStatic typing remains available side by side: writing `LocalDate today = LocalDate.now()` instead of `def` gets compile-time checks, and `@TypeChecked` or `@CompileStatic` on a class or method escalates that checking (and performance) closer to Java's.",
      learnMore: 'https://groovy-lang.org/semantics.html#_optional_typing',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'closure',
      title: 'Closure',
      body: 'An anonymous function that can be assigned to a variable.',
      details:
        "A closure (`{ int currentAge -> today.year - currentAge }`) is a block of code treated as a first-class value: it can be stored in a variable, passed as an argument, and invoked later with `()` or `.call()`. Closures capture variables from their enclosing scope by reference, so they can read and modify state defined outside themselves.\n\nClosures are Groovy's workhorse for collection methods (`list.each { println it }`, `list.collect { it * 2 }`) and for DSLs like Gradle's build scripts, where nearly every configuration block is secretly a closure being handed to a method.",
      learnMore: 'https://groovy-lang.org/closures.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'object-instantiation',
      title: 'Object instantiation',
      body: 'Creating a new instance, often with named parameters.',
      details:
        "`new Person(name: 'Alice', age: 25)` uses Groovy's named-argument constructor: because a no-arg constructor is auto-generated, the map-like `name: value` pairs are applied as property assignments immediately after construction, in whatever order you list them. This sidesteps writing a matching constructor overload for every combination of fields you might want to set.\n\nA conventional positional constructor still works too if the class defines one explicitly, and both styles can coexist on the same class.",
      learnMore: 'https://groovy-lang.org/objectorientation.html#_named_parameters',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'data-structures',
      title: 'Data structures (Map/List)',
      body: 'Literals for maps (`[k:v]`) and lists (`[...]`).',
      details:
        "Groovy gives both core collections first-class literal syntax: `['apple', 'banana', 'cherry']` is a `List` (actually an `ArrayList` by default), and `[env: 'dev', version: 1.2]` is a `Map` (a `LinkedHashMap`, preserving insertion order). Bracket access, `config['env']` or the shorthand `config.env`, works on both.\n\nThese literals lean on Groovy's broader collection API: methods like `.each`, `.collect`, `.find`, and `.sort` are added onto every `List` and `Map`, so filtering or transforming a collection rarely needs an explicit loop.",
      learnMore: 'https://groovy-lang.org/core-syntax.html#_collections',
      color: 'green',
      side: 'right',
    },
    {
      id: 'control-flow',
      title: 'Control flow (loop & conditional)',
      body: 'Executes code based on logic (`for`, `if`).',
      details:
        'A Groovy `for (item in collection)` iterates any iterable, list, map, or range without indices, and reads almost identically to a Python `for`. `if`/`else` behaves as in Java but with Groovy truth: empty collections, empty strings, and `null` are all falsy, not just `false` itself.\n\nString methods like `.startsWith()` come from the underlying Java `String` class untouched, since GStrings and plain strings both ultimately implement `CharSequence`. Groovy adds convenience on top of Java rather than replacing it.',
      learnMore: 'https://groovy-lang.org/semantics.html#the-groovy-truth',
      color: 'red',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      {
        code: "def GREETING = 'Hello' // dynamic typing: the variable that keeps its options open",
        refs: ['variable'],
      },
      { code: '' },
      {
        code: 'class Robot {\n    String name\n    def battery = 100',
        refs: ['class', 'field'],
      },
      {
        code: '',
        refs: ['class'],
      },
      {
        code: '    String status() {\n        "${name} is at ${battery}% -- still more reliable than my WiFi"\n    }',
        refs: ['class', 'method', 'string-interpolation'],
      },
      { code: '}', refs: ['class'] },
      { code: '' },
      {
        code: 'def beep = { String label -> println "${label}: beep boop" } // a closure, Groovy\'s anonymous function',
        refs: ['closure', 'string-interpolation'],
      },
      { code: '' },
      {
        code: "def units = [new Robot(name: 'R2'), new Robot(name: 'C3')]",
        refs: ['object-instantiation', 'data-structures'],
      },
      {
        code: 'for (unit in units) {\n    println unit.status()\n    beep(unit.name)\n}',
        refs: ['control-flow'],
      },
    ],
    verbose: [
      { code: 'package com.example.groovy // Package declaration', refs: ['package'] },
      { code: '' },
      { code: 'import java.time.LocalDate // Import statement', refs: ['imports'] },
      { code: '' },
      {
        code: '/*\n  This is a multi-line comment.\n  Groovy: the language that has been "the next big JVM thing"\n  since roughly the time flip phones were cool.\n*/',
      },
      { code: '' },
      { code: '// Class definition with properties', refs: ['class'] },
      { code: 'class Person {', refs: ['class'] },
      {
        code: '    String name // Typed field\n    def age = 30 // Dynamically typed field (property)',
        refs: ['class', 'field'],
      },
      { code: '', refs: ['class'] },
      { code: '    // Method definition', refs: ['method'] },
      {
        code: '    String greet(String greeting = \'Hello\') {\n        // String interpolation (GString) -- the dollar sign does the heavy lifting\n        "${greeting}, my name is ${name} and I am ${age}."\n    }',
        refs: ['class', 'method', 'string-interpolation'],
      },
      { code: '}', refs: ['class'] },
      { code: '' },
      { code: '// Script-level execution' },
      {
        code: "def today = LocalDate.now() // Variable declaration with 'def'",
        refs: ['variable'],
      },
      { code: '' },
      { code: '// Closure definition', refs: ['closure'] },
      {
        code: 'def calculateYearOfBirth = { int currentAge ->\n    today.year - currentAge\n}',
        refs: ['closure'],
      },
      { code: '' },
      { code: '// Object instantiation & property access', refs: ['object-instantiation'] },
      {
        code: "def alice = new Person(name: 'Alice', age: 25)",
        refs: ['object-instantiation'],
      },
      { code: '' },
      {
        code: '// Method call & printing -- println: because System.out.println() was one keystroke too many',
      },
      {
        code: "println alice.greet('Hi')",
      },
      { code: '' },
      { code: '// Map literal', refs: ['data-structures'] },
      {
        code: "def config = [env: 'dev', version: 1.2]",
        refs: ['data-structures'],
      },
      { code: '' },
      { code: '// Control flow (loop over list literal)', refs: ['control-flow'] },
      {
        code: "for (item in ['apple', 'banana', 'cherry']) {",
        refs: ['control-flow', 'data-structures'],
      },
      {
        code: '    if (item.startsWith(\'b\')) {\n        println "Found a b-word: ${item}"\n    }',
        refs: ['control-flow', 'string-interpolation'],
      },
      { code: '}', refs: ['control-flow'] },
      { code: '' },
      {
        code: '// Semicolons are optional in Groovy, much like our commitment to static typing\nprintln "Born year: ${calculateYearOfBirth(alice.age)}"',
        refs: ['string-interpolation'],
      },
    ],
  },
}
