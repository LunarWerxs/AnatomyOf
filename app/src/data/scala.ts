import type { LanguageDef } from '../lib/types'

export const scala: LanguageDef = {
  id: 'scala',
  popularity: 49,
  name: 'Scala',
  titleWord: 'Scala',
  article: 'a',
  extensions: ['.scala'],
  accentHex: '#dc322f',
  officialUrl: 'https://www.scala-lang.org/',
  shikiLang: 'scala',
  note: 'Scala is a statically typed, multi-paradigm language that combines object-oriented and functional programming, most commonly targeting the JVM.',
  annotations: [
    {
      id: 'package',
      title: 'Package declaration',
      body: "Defines the namespace a file's contents belong to.",
      details:
        'A `package` declaration at the top of a file places every top-level definition below it into that namespace, mirroring the directory structure convention inherited from Java (`com.example.scala` typically lives under `com/example/scala/`). Unlike Java, a single file can declare multiple nested packages with curly-brace syntax, though the one-package-per-file style shown here is far more common.\n\nScala also supports package objects (`package object scala { ... }`) for holding values and functions that do not belong inside any single class, giving a package its own top-level members the way a module would in other languages.',
      learnMore: 'https://docs.scala-lang.org/tour/packages-and-imports.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Brings classes or packages into scope.',
      details:
        "`import java.time.LocalDate` brings a single class into scope, but Scala imports are more flexible than Java's: `import java.time._` wildcard-imports everything in a package, `import java.time.{LocalDate, LocalTime}` selects several names at once, and `import java.time.{LocalDate => LD}` renames a name on the way in to dodge a collision.\n\nImports can also appear anywhere a statement can, not just at the top of the file: scoping an import to a single method or block keeps its effect local, which is handy when two libraries export a colliding name.",
      learnMore: 'https://docs.scala-lang.org/tour/packages-and-imports.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* */`), ignored by the compiler.',
      details:
        'Scala inherits C-family comment syntax: `//` runs to the end of the line, and `/* ... */` spans multiple lines and can nest, which is a small but genuinely useful departure from Java and C, where nesting block comments is illegal. Comments have zero effect on the compiled bytecode.\n\nScaladoc comments (`/** ... */`) placed directly above a definition are extracted into HTML API documentation, similar to Javadoc, and support tags like `@param` and `@return` plus inline links to other symbols.',
      learnMore: 'https://docs.scala-lang.org/style/scaladoc.html',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'object',
      title: 'Object definition (singleton)',
      body: 'Defines a singleton object. Exactly one instance ever exists.',
      details:
        'An `object` declares a class and its sole instance in one step; the runtime lazily creates that instance the first time it is referenced. This is how Scala gets rid of Java\'s `static` keyword entirely. Anything you would have made static in Java becomes a member of an `object` instead.\n\nA common pattern pairs an `object` with a `class` of the same name (a "companion object"), which gets privileged access to the class\'s private members and is the idiomatic home for factory methods and constants related to that type.',
      learnMore: 'https://docs.scala-lang.org/tour/singleton-objects.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration',
      body: '`val` (immutable) or `var` (mutable).',
      details:
        '`val` binds a name to a value permanently: closer to a Java `final` variable than a constant, since the value itself can still be a mutable object. `var` allows reassignment, but idiomatic Scala reaches for `val` by default and treats `var` as the exception that needs a reason.\n\nType annotations (`val version: String = "1.0.0"`) are usually optional thanks to type inference, but are common on public members and constructor parameters to keep the inferred API stable as an implementation changes.',
      learnMore: 'https://docs.scala-lang.org/tour/basics.html#variables',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'Blueprint for objects; constructor params can be fields (`val`/`var`).',
      details:
        "Scala folds the constructor directly into the class signature: `class Person(val name: String, var age: Int)` declares two fields and a primary constructor in one line, with no separate constructor method or manual field assignment needed. Prefixing a parameter with `val` or `var` (or nothing, for a private, unexposed parameter) controls whether it becomes a public field at all.\n\nClasses can extend at most one other class but mix in any number of traits (`class Dog extends Animal with Loud with Trainable`), which is Scala's answer to multiple inheritance without the diamond-inheritance ambiguity of true multiple class inheritance.",
      learnMore: 'https://docs.scala-lang.org/tour/classes.html',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'method',
      title: 'Method definition (def)',
      body: 'Defines a reusable block of code.',
      details:
        'The `def` keyword introduces a method; its return type can usually be inferred, though recursive methods require an explicit annotation. A method body that is a single expression can skip the braces entirely: `def greet(): String = s"Hello, $name"` is complete without a `return` statement, since the last expression evaluated is the value produced.\n\nMethods can take multiple parameter lists (`def add(a: Int)(b: Int): Int`), which enables partial application and is the mechanism behind Scala\'s curried functions and DSL-style syntax.',
      learnMore: 'https://docs.scala-lang.org/tour/basics.html#methods',
      color: 'red',
      side: 'right',
    },
    {
      id: 'string-interp',
      title: 'String interpolation',
      body: 'Embeds expressions in strings using `$` or `${}`.',
      details:
        'An `s"..."` string lets `$name` splice in a simple identifier, while `${expression}` handles anything more complex, including method calls and field access like `${AppConfig.version}`. The `s` prefix is itself just a method call desugared by the compiler, Scala also ships `f"..."` for `printf`-style formatting and `raw"..."` for strings that skip escape processing.\n\nBecause interpolators are ordinary macros, libraries define custom ones too; the same `$`/`${}` splicing syntax can back things like SQL query builders or JSON literals with compile-time checking of the interpolated types.',
      learnMore: 'https://docs.scala-lang.org/overviews/core/string-interpolation.html',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'main-object',
      title: 'Main method',
      body: 'An explicit `main` method provides a cross-version executable entry point.',
      details:
        '`def main(args: Array[String]): Unit` inside a singleton `object` uses the conventional JVM entry signature and works across Scala 2 and Scala 3. The runtime calls it with the command-line arguments after loading the object.\n\nScala 3 also offers the concise `@main` annotation. The older `extends App` style has only limited support in Scala 3, no longer provides its previous delayed-initialization behavior, and is not the recommended cross-version entry pattern.',
      learnMore:
        'https://docs.scala-lang.org/scala3/reference/changed-features/main-functions.html',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'instantiation',
      title: 'Object instantiation',
      body: 'Creating a new instance using `new`.',
      details:
        '`new Person("Alice", 30)` allocates a new instance and runs the primary constructor with the given arguments, exactly as `new` does in Java. Scala keeps `new` mandatory for ordinary classes, though case classes (declared with `case class`) get a compiler-generated companion factory so they can be constructed without it, e.g. `Person("Alice", 30)`.\n\nCase classes also get free structural equality, `hashCode`, `toString`, and a `copy` method out of the box, which is why they, rather than `new`-instantiated plain classes, are the idiomatic choice for simple data-holding types in Scala.',
      learnMore: 'https://docs.scala-lang.org/tour/case-classes.html',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'control-flow',
      title: 'Control flow (expression & loop)',
      body: '`if` is an expression; `for` loops or comprehends.',
      details:
        'Because `if`/`else` is an expression rather than a statement, `val status = if (alice.age > 25) "Adult" else "Young"` needs no ternary operator. The branch that runs supplies the value directly, and both branches must produce compatible types. `for (i <- 1 to 3) { ... }` iterates a `Range`, with `<-` reading as "drawn from."\n\nThe same `for` syntax is sugar for chained `map`/`flatMap`/`filter` calls, so a `for` loop with a `yield` clause becomes a comprehension that builds a new collection rather than just looping for side effects: a distinction worth knowing since the two look nearly identical.',
      learnMore: 'https://docs.scala-lang.org/tour/for-comprehensions.html',
      color: 'indigo',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      { code: 'import scala.util.Random // for embracing chaos responsibly', refs: ['imports'] },
      { code: '' },
      {
        code: 'object Dice { // an object of one, the loneliest instance',
        refs: ['object'],
      },
      {
        code: '  val sides: Int = 20 // no save throws in production code',
        refs: ['variable'],
      },
      {
        code: '  def roll(): Int = Random.nextInt(sides) + 1',
        refs: ['method'],
      },
      { code: '}' },
      { code: '' },
      {
        code: 'object Main {\n  def main(args: Array[String]): Unit = {',
        refs: ['main-object'],
      },
      {
        code: '    val result = Dice.roll()',
        refs: ['instantiation'],
      },
      {
        code: '    val verdict = if (result > 10) "critical hit" else "critical miss" // it is always a miss',
        refs: ['control-flow'],
      },
      {
        code: '    println(s"You rolled $result: $verdict")',
        refs: ['string-interp'],
      },
      { code: '  }\n}', refs: ['main-object'] },
    ],
    verbose: [
      { code: 'package com.example.scala // Package declaration', refs: ['package'] },
      { code: '' },
      { code: 'import java.time.LocalDate // Import statement', refs: ['imports'] },
      { code: '' },
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "/*\n  This is a multi-line comment\n  describing the file's purpose, in case the code is not self-explanatory enough.\n*/",
        refs: ['comment'],
      },
      { code: '' },
      { code: '// Singleton object definition', refs: ['object'] },
      {
        code: 'object AppConfig {\n  val version: String = "1.0.0" // Immutable variable (val)',
        refs: ['object', 'variable'],
      },
      { code: '}', refs: ['object'] },
      { code: '' },
      { code: '// Class definition with constructor parameters (become fields)', refs: ['class'] },
      {
        code: 'class Person(val name: String, var age: Int) {',
        refs: ['class'],
      },
      { code: '  // Method definition', refs: ['class', 'method'] },
      {
        code: '  def greet(): String = {',
        refs: ['class', 'method'],
      },
      {
        code: '    // String interpolation (s-interpolator)',
        refs: ['class', 'method', 'string-interp'],
      },
      {
        code: '    s"Hello, my name is $name and I am $age years old, which is entirely mutable thanks to var."',
        refs: ['class', 'method', 'string-interp'],
      },
      { code: '  }', refs: ['class', 'method'] },
      { code: '}', refs: ['class'] },
      { code: '' },
      {
        code: '// Explicit main method: portable across Scala 2 and Scala 3',
        refs: ['main-object'],
      },
      {
        code: 'object Main {\n  def main(args: Array[String]): Unit = {',
        refs: ['main-object'],
      },
      { code: '    // Variable declaration', refs: ['main-object'] },
      {
        code: '    val alice = new Person("Alice", 30) // Object instantiation',
        refs: ['main-object', 'instantiation'],
      },
      { code: '' },
      { code: '    // Method call', refs: ['main-object'] },
      {
        code: '    println(alice.greet()) // Built-in function call',
        refs: ['main-object'],
      },
      { code: '' },
      {
        code: '    // Control flow (conditional expression)',
        refs: ['main-object', 'control-flow'],
      },
      {
        code: '    val status = if (alice.age > 25) "Adult" else "Young" // no ternary operator needed here',
        refs: ['main-object', 'control-flow'],
      },
      { code: '' },
      { code: '    // Control flow (loop over a range)', refs: ['main-object', 'control-flow'] },
      {
        code: '    for (i <- 1 to 3) {\n      println(s"Count: $i") // Scala counts, unlike some of my coworkers, inclusively',
        refs: ['main-object', 'control-flow', 'string-interp'],
      },
      { code: '    }', refs: ['main-object', 'control-flow'] },
      { code: '' },
      {
        code: '    println(s"App Version: ${AppConfig.version}") // Accessing singleton object field',
        refs: ['main-object', 'string-interp', 'object'],
      },
      { code: '  }\n}', refs: ['main-object'] },
    ],
  },
}
