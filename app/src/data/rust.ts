import type { LanguageDef } from '../lib/types'

export const rust: LanguageDef = {
  id: 'rust',
  popularity: 10,
  name: 'Rust',
  titleWord: 'Rust',
  article: 'a',
  extensions: ['.rs'],
  accentHex: '#ce422b',
  officialUrl: 'https://www.rust-lang.org/',
  shikiLang: 'rust',
  note: 'Rust is a systems programming language focused on safety, speed, and concurrency, with a strong emphasis on memory safety without a garbage collector.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (//) or block (/* ... */), ignored by the compiler.',
      details:
        'A double slash starts a comment that runs to the end of the line. A block comment opens with a slash-star and closes with a star-slash, and unlike C or Go, Rust block comments are allowed to nest inside one another.\n\nA comment written with three slashes becomes a doc comment: tools like rustdoc collect it and render it as documentation for the item immediately below it, and doctests inside a doc comment are compiled and run by cargo test.',
      learnMore: 'https://doc.rust-lang.org/reference/comments.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Use declaration',
      body: 'Brings symbols from modules into scope with use.',
      details:
        'A use declaration lets you refer to an item by a short name instead of its full path. use std::fmt brings the fmt module itself into scope, while a path like use std::collections::HashMap brings a single type in directly; braces group several imports from the same path on one line.\n\nThe standard library, third-party crates pulled in through Cargo.toml, and your own modules are all reached the same way. An unused import produces a compiler warning, not an error, which is why cargo fix can safely prune them automatically.',
      learnMore: 'https://doc.rust-lang.org/reference/items/use-declarations.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'struct',
      title: 'Struct definition',
      body: 'Defines a custom data structure with named fields.',
      details:
        'A struct groups related values into a single named type. The common form shown here, with named fields inside braces, is the most frequent shape, but Rust also supports tuple structs with positional fields and unit structs with no fields at all, often used as markers.\n\nA struct only describes data; behavior is added separately in one or more impl blocks. By default a struct and its fields are private to the module that defines them, and each must be marked pub individually to be visible from outside.',
      learnMore: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field',
      body: 'A component of a struct with a specific type.',
      details:
        'Each field pairs a name with a type, such as x: i32 for a signed 32-bit integer. Rust requires every field to have an explicit type annotation since the compiler does not infer struct shapes the way it infers local variable types.\n\nFields are accessed with dot notation, like point.x, and can only be reassigned if the binding that owns the struct was declared mut. Rust has no field-level default values in the struct definition itself; construction must supply every field, though the ..Default::default() syntax can fill in the rest from a default instance.',
      learnMore: 'https://doc.rust-lang.org/std/default/trait.Default.html',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'impl',
      title: 'Impl block',
      body: 'Defines methods and associated functions for a type.',
      details:
        "An impl block attaches functions to a type without editing the type's own definition. A function inside the block that takes no self parameter, like new, is called an associated function and is invoked with the double-colon path Point::new; a function that takes self, &self, or &mut self is a method and is invoked with dot notation instead.\n\nA single type can have several impl blocks, and traits are implemented separately with impl TraitName for Type, which is how Rust achieves shared behavior across unrelated types without classical inheritance.",
      learnMore: 'https://doc.rust-lang.org/book/ch05-03-method-syntax.html',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'function',
      title: 'Function/method definition',
      body: 'Defines a reusable block of code with fn.',
      details:
        "The fn keyword introduces a function. Parameters are written name: Type, and the return type follows an arrow, as in fn new(x: i32, y: i32) -> Point; a function with no arrow implicitly returns the unit type. The final expression in the body is returned automatically when it has no trailing semicolon, so return is often optional.\n\nA method's first parameter describes how it borrows the instance: &self borrows it immutably, &mut self borrows it mutably, and a bare self takes ownership and consumes the value. Which form a method uses determines what the caller is allowed to do with the value afterward.",
      learnMore: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
      color: 'red',
      side: 'right',
    },
    {
      id: 'main-function',
      title: 'Main function',
      body: 'The entry point for an executable.',
      details:
        'Every Rust binary begins execution in a function named main, which takes no arguments in its simplest form and returns nothing. The compiler enforces that exactly one main function exists in the crate that produces the executable; library crates do not need one at all.\n\nmain can also return a Result, typically Result<(), Box<dyn Error>>, in which case returning Err prints the error with the Debug trait and exits with a nonzero status, which is a convenient way to use the question-mark operator for error handling directly at the top level.',
      learnMore: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration (let)',
      body: 'let for immutable, let mut for mutable.',
      details:
        'let binds a value to a name. Bindings are immutable by default, so let p1 = Point::new(10, 20) cannot be reassigned or have its fields changed later; adding mut, as in let mut p2, opts back into mutation for that one binding.\n\nThis default is deliberate: it means a reader never has to search a function for reassignments to know a value is stable, and the compiler catches accidental mutation at compile time instead of it surfacing as a runtime bug. A new let with the same name can also shadow an earlier binding, which is different from mutating it, since the old value and the new one can even have different types.',
      learnMore: 'https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'macro',
      title: 'Macro call (!)',
      body: 'Invokes a macro (code generator), ending with !.',
      details:
        'A trailing exclamation mark marks a macro invocation, such as println!, distinguishing it from an ordinary function call. Macros like println! and format! expand at compile time into code that validates the format string against the arguments supplied, catching mismatched placeholders before the program ever runs.\n\nBecause macros operate on syntax rather than on already-typed values, they can accept a variable number of arguments and generate code a regular function could not, such as vec![1, 2, 3] expanding into the calls needed to build and populate a Vec.',
      learnMore: 'https://doc.rust-lang.org/book/ch19-06-macros.html',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'control-flow',
      title: 'Control flow (conditional & loop)',
      body: 'Expressions (if/else) and loops (for, while, loop).',
      details:
        'An if is an expression in Rust, not just a statement, so let status = if p1.x > p2.x { "p1 is further" } else { "p2 is further" } assigns whichever branch runs; both branches must produce the same type, and an else is required whenever the result is used as a value. Conditions need no surrounding parentheses, but the branch bodies always need braces.\n\nfor i in 0..3 iterates a range where the upper bound is exclusive; 0..=3 would include it. while repeats as long as a condition holds, and the bare loop keyword repeats forever until a break, which can itself carry a value out of the loop as its result.',
      learnMore: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'ownership',
      title: 'Ownership & borrowing',
      body: 'Rust tracks who owns a value and enforces borrowing rules at compile time.',
      details:
        'Every value in Rust has exactly one owner, and when that owner goes out of scope the value is dropped automatically, which is how Rust frees memory deterministically without a garbage collector. Passing a non-Copy value by itself, rather than by reference, moves ownership to the callee, and the original binding can no longer be used afterward.\n\nA reference such as &self borrows a value instead of taking it, and the borrow checker enforces that a value has either any number of immutable borrows or exactly one mutable borrow at a time, never both. This rule, checked entirely at compile time, is what lets Rust rule out data races and use-after-free bugs without runtime overhead.',
      learnMore: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html',
      color: 'sky',
      side: 'left',
    },
  ],
  // Borrow-checker errors are complaints about time: two things overlapped that
  // were not allowed to. Code is a poor medium for showing overlap, so the rules
  // become obvious the moment the same scope is drawn on an axis.
  visual: {
    panels: [
      {
        template: 'timeline',
        caption: 'One owner, and who may look at the value when (by line)',
        max: 12,
        unit: '',
        bars: [
          {
            id: 'own',
            ref: 'ownership',
            label: 's owns the String',
            start: 0,
            end: 11,
            note: 'freed here, automatically',
          },
          {
            id: 'shared',
            ref: 'ownership',
            label: '&s shared borrow',
            start: 2,
            end: 4,
            note: 'any number at once',
          },
          {
            id: 'unique',
            ref: 'ownership',
            label: '&mut s unique borrow',
            start: 5,
            end: 7,
            note: 'exactly one, overlapping nothing',
          },
          {
            id: 'moved',
            ref: 'function',
            label: 'consume(s) takes ownership',
            start: 9,
            end: 11,
            note: 's is unusable after this',
          },
        ],
        markers: [{ at: 11, ref: 'variable', label: 'scope ends' }],
      },
    ],
  },
  examples: {
    minimal: [
      { code: 'use std::fmt;', refs: ['imports'] },
      { code: '' },
      {
        code: 'struct Greeting {\n    text: String,\n}',
        refs: ['struct', 'field'],
      },
      { code: '' },
      {
        code: 'impl Greeting {\n    // Borrows self, not the borrow checker\'s patience\n    fn shout(&self) -> String {\n        format!("{}!", self.text)\n    }\n}',
        refs: ['impl', 'function', 'ownership'],
      },
      { code: '' },
      {
        code: 'fn main() {\n    let g = Greeting { text: String::from("hello") };\n    println!("{}", g.shout()); // it compiled, ship it\n}',
        refs: ['main-function', 'variable', 'macro'],
      },
    ],
    verbose: [
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "/*\n  This is a multi-line comment\n  describing the file's purpose.\n  (The borrow checker approved this comment. Eventually.)\n*/",
        refs: ['comment'],
      },
      { code: '' },
      { code: 'use std::fmt; // Import a module', refs: ['imports'] },
      { code: '' },
      { code: '// Struct definition', refs: ['struct'] },
      {
        code: 'struct Point {\n    x: i32, // Signed 32-bit integer field\n    y: i32,\n}',
        refs: ['struct', 'field'],
      },
      { code: '' },
      { code: '// Implementation block for method definitions', refs: ['impl'] },
      { code: 'impl Point {', refs: ['impl'] },
      {
        code: '    // Associated function (like a static method)\n    fn new(x: i32, y: i32) -> Point {\n        Point { x, y }\n    }',
        refs: ['impl', 'function'],
      },
      { code: '', refs: ['impl'] },
      {
        code: '    // Method (takes &self)\n    fn display(&self) {\n        println!("Point is at ({}, {}), still owned and loved", self.x, self.y); // Macro call\n    }',
        refs: ['impl', 'function', 'macro', 'ownership'],
      },
      { code: '}', refs: ['impl'] },
      { code: '' },
      { code: '// Main function -- entry point', refs: ['main-function'] },
      { code: 'fn main() {', refs: ['main-function'] },
      {
        code: '    // Immutable variable declaration\n    let p1 = Point::new(10, 20);',
        refs: ['main-function', 'variable'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Mutable variable declaration\n    let mut p2 = Point { x: 5, y: 5 };\n    p2.y = 15; // Modifying a mutable variable',
        refs: ['main-function', 'variable'],
      },
      { code: '', refs: ['main-function'] },
      { code: '    // Method call', refs: ['main-function'] },
      {
        code: '    p1.display();',
        refs: ['main-function', 'ownership'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Control flow (conditional expression)',
        refs: ['main-function', 'control-flow'],
      },
      {
        code: '    let status = if p1.x > p2.x { "p1 is further" } else { "p2 is further" };\n    println!("Status: {}", status);',
        refs: ['main-function', 'control-flow', 'macro'],
      },
      { code: '', refs: ['main-function'] },
      { code: '    // Control flow (loop)', refs: ['main-function', 'control-flow'] },
      {
        code: '    for i in 0..3 {\n        println!("Count: {}", i);\n    }',
        refs: ['main-function', 'control-flow', 'macro'],
      },
      { code: '}', refs: ['main-function'] },
    ],
  },
}
