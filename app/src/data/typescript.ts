import type { LanguageDef } from '../lib/types'

export const typescript: LanguageDef = {
  id: 'typescript',
  popularity: 47,
  name: 'TypeScript',
  titleWord: 'TypeScript',
  article: 'a',
  extensions: ['.ts'],
  accentHex: '#3178c6',
  officialUrl: 'https://www.typescriptlang.org/',
  shikiLang: 'typescript',
  note: 'TypeScript is a strict syntactical superset of JavaScript that adds optional static typing, designed for development of large applications and transpiles to JavaScript.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* ... */`), ignored by the compiler.',
      details:
        'A block comment starts with `/*` and ends at the first `*/`, and may span any number of lines in between; a single-line `//` comment is also available and runs to the end of the line. Both are stripped during compilation and have zero effect on the emitted JavaScript or on runtime behavior.\n\nBlock comments cannot be nested, the first `*/` closes the comment even if another `/*` appears inside it. A `/** ... */` doc comment placed directly above a declaration is picked up by editors as JSDoc, surfacing parameter hints and descriptions in autocomplete even though TypeScript itself ignores the tags for type-checking.',
      learnMore: 'https://jsdoc.app/',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'interface',
      title: 'Interface definition',
      body: 'Defines the shape of an object, for static type checking.',
      details:
        'An `interface` names a set of properties (and their types) that a value must have to satisfy it. It exists purely at compile time and is erased entirely from the emitted JavaScript. TypeScript uses structural typing: any object with a compatible shape satisfies `Person`, whether or not it was ever declared to `implement` it, unlike the nominal typing of languages such as Java.\n\nInterfaces can extend other interfaces (`interface Employee extends Person`), be reopened later in the same scope to add more members (declaration merging), and are generally preferred over `type` aliases for object shapes that a class might `implement` or that library consumers might extend.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'type-annotation',
      title: 'Type annotation',
      body: 'Explicitly specifies the type of a variable, parameter, or return value (`: Type`).',
      details:
        "A type annotation follows a colon after a name (`name: string`, `age: number`) and tells the compiler exactly what type is allowed there. The compiler checks every assignment and usage against the annotation and reports an error before the code ever runs, catching mismatches that would otherwise surface only as bugs in production JavaScript.\n\nAnnotations are purely a compile-time construct: `tsc` strips every `: Type` when it emits JavaScript, so there is no runtime cost and no way to inspect a variable's declared type at runtime. This is what makes TypeScript a strict superset rather than a different language. Valid JavaScript is (almost always) valid TypeScript with the types simply left off.",
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'Blueprint for objects, can implement interfaces (`class ... implements ...`).',
      details:
        '`class Employee implements Person` declares a class whose instances must satisfy the `Person` interface, the compiler checks that every property `Person` requires is actually declared and initialized somewhere in `Employee`. A class can implement several interfaces at once, separated by commas, and can also `extend` exactly one base class to inherit its members.\n\nUnlike an interface, a class produces real runtime code: fields become properties on `this`, and methods are shared through the prototype chain exactly as in plain JavaScript. `implements` is checked only at compile time and leaves no trace in the emitted output: it never appears in the compiled JavaScript.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'constructor',
      title: 'Constructor',
      body: 'Special method for initializing objects; parameter properties can declare and assign fields.',
      details:
        'The `constructor` runs once when a class is instantiated with `new`, receiving whatever arguments the call site provides. Each parameter is itself type-annotated, so passing the wrong argument types to `new Employee(...)` is a compile error rather than a runtime surprise.\n\nTypeScript also supports "parameter properties": prefixing a constructor parameter with `public`, `private`, `readonly`, or a combination automatically declares a field of that name and assigns it from the argument, without a separate declaration or an explicit `this.x = x` line. The verbose example spells the assignments out explicitly for clarity, but parameter properties are the more idiomatic, shorter form.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'method',
      title: 'Method definition',
      body: 'A function defined within a class.',
      details:
        'A method is a function declared directly in a class body, such as `greet(): string { ... }`. Its return type is annotated after the parameter list, and the compiler verifies every `return` statement inside actually produces a value of that type. A mismatched or missing return is caught before the code runs.\n\nInside a method, `this` refers to the instance the method was called on, same as in plain JavaScript, and TypeScript adds no special syntax for that binding. Methods can carry their own visibility modifiers (`public`, `private`, `protected`) to control whether they are callable from outside the class.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/classes.html#methods',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'template-literal',
      title: 'Template literal',
      body: 'String interpolation using backticks and interpolation placeholders.',
      details:
        'A template literal is delimited by backticks instead of quotes, and any embedded interpolation placeholder is evaluated and converted to a string, then spliced into the result. This is identical to the JavaScript feature TypeScript compiles down to, template literals add no type-checking behavior of their own beyond checking that the interpolated expressions are well-typed.\n\nTemplate literals can also span multiple lines without escape sequences, unlike ordinary quoted strings. TypeScript separately offers "template literal types" (a type-level feature using the same backtick syntax) for building string literal types out of unions, but that is a distinct, compile-time-only concept from the runtime string interpolation shown here.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'A standalone function with type annotations.',
      details:
        "`function logPerson(person: Person): void { ... }` annotates both the parameter's type and the function's return type. `void` signals the function returns no usable value; calling it for its return value is a type error, though the function may still execute a `return;` with no expression.\n\nBecause `person` is typed as `Person`, the compiler accepts any object with a compatible shape at the call site: an `Employee` instance qualifies automatically thanks to structural typing, with no explicit conversion or upcast needed. Optional parameters (`age?: number`) and default values (`age: number = 0`) can further refine a function's accepted arguments.",
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Variable declaration',
      body: 'Declares variables (`const`/`let`); type can be explicit or inferred.',
      details:
        '`const` and `let` behave exactly as they do in JavaScript (block-scoped, with `const` preventing reassignment of the binding) but TypeScript layers static typing on top. `const employees: Employee[] = [...]` explicitly annotates the array element type, so pushing anything other than an `Employee` into it is a compile error.\n\nAn explicit annotation is not always necessary: TypeScript can often determine the type from the initializer alone, in which case adding one is redundant. Explicit annotations still earn their keep on empty arrays, function parameters, and public API boundaries, where there is no initializer for the compiler to infer from, or where being explicit documents intent.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly (`for...of`, `for`, `while`).',
      details:
        "`for (const employee of employees)` iterates the values of an array (or any iterable), and because `employees` is typed `Employee[]`, the compiler already knows `employee` is an `Employee` inside the loop body. No manual cast is needed to call `employee.greet()`. `for`, `while`, and `do...while` are also available and behave exactly as in JavaScript.\n\n`break` exits the nearest loop and `continue` skips to the next iteration, identically to JavaScript. Iterating with `for...in` instead enumerates an object's keys as `string`s and is rarely used with typed arrays, since `for...of` already gives typed access to the elements themselves.",
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'type-inference',
      title: 'Type inference',
      body: 'The compiler automatically determines the type when not explicitly specified.',
      details:
        '`const message = "TypeScript is a superset of JavaScript."` has no annotation, yet the compiler still infers `message` has the literal-widened type `string` from its initializer, and will flag any later attempt to assign a number to it. Inference also flows through function return types, array literals, and generic type arguments when they are not written explicitly.\n\nUnder `strict` mode (the recommended baseline, enabled via `"strict": true` in `tsconfig.json`), inference becomes stricter still: variables with no initializer and no annotation are treated as implicitly `any` only if `noImplicitAny` is off, and `strictNullChecks` means `null`/`undefined` are not silently assignable to other inferred types. Relying on inference for local variables is idiomatic TypeScript; explicit annotations are reserved for places inference cannot reach.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/type-inference.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'generics',
      title: 'Generics',
      body: 'Parameterize a type, function, or class over another type (`<T>`).',
      details:
        'A generic like `function firstOf<T>(items: T[]): T` introduces a type parameter `T` that is filled in per call site, `firstOf(employees)` infers `T` as `Employee` without it being written explicitly. This lets a single function, interface, or class stay fully type-safe while working over many different element types, instead of duplicating the logic per type or falling back to `any`.\n\nGenerics can be constrained (`<T extends Person>`) to require the type argument satisfy some shape, and given defaults (`<T = string>`) for when no argument is supplied. Like all TypeScript types, generic parameters are erased at compile time. There is no runtime representation of `T`, so patterns like `new T()` or `typeof T` inside a generic function are not allowed.',
      learnMore: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: 'interface Shape {\n  area(): number\n}', refs: ['interface'] },
      { code: '' },
      {
        code: 'class Circle implements Shape {\n  constructor(private radius: number) {}\n  area(): number {\n    return Math.PI * this.radius ** 2\n  }\n}',
        refs: ['class', 'constructor'],
      },
      { code: '' },
      {
        code: "// any would compile too, but then what were we even doing here\nfunction describeArea<T extends Shape>(shape: T): string {\n  return 'Area: ' + shape.area().toFixed(2)\n}",
        refs: ['function', 'generics'],
      },
      {
        code: 'const shapes: Shape[] = [new Circle(2), new Circle(5)]\nconsole.log(shapes.map(describeArea))',
        refs: ['variable'],
      },
    ],
    verbose: [
      {
        code: '/*\n  This is a multi-line comment\n  demonstrating TypeScript features.\n  Types are a lie we tell the compiler to feel safe.\n*/',
        refs: ['comment'],
      },
      { code: '' },
      { code: '// Interface definition', refs: ['interface'] },
      { code: 'interface Person {', refs: ['interface'] },
      {
        code: '  name: string; // Type annotation (string)',
        refs: ['interface', 'type-annotation'],
      },
      {
        code: '  age: number; // Type annotation (number)',
        refs: ['interface', 'type-annotation'],
      },
      { code: '}', refs: ['interface'] },
      { code: '' },
      { code: '// Class definition implementing an interface', refs: ['class'] },
      { code: 'class Employee implements Person {', refs: ['class'] },
      { code: '  name: string;', refs: ['class', 'type-annotation'] },
      { code: '  age: number;', refs: ['class', 'type-annotation'] },
      {
        code: '  readonly id: number; // Read-only, unlike my opinion on tabs vs spaces',
        refs: ['class'],
      },
      { code: '', refs: ['class'] },
      { code: '  // Constructor with parameter properties', refs: ['class', 'constructor'] },
      {
        code: '  constructor(name: string, age: number, id: number) {',
        refs: ['class', 'constructor'],
      },
      { code: '    this.name = name;', refs: ['class', 'constructor'] },
      { code: '    this.age = age;', refs: ['class', 'constructor'] },
      { code: '    this.id = id;', refs: ['class', 'constructor'] },
      { code: '  }', refs: ['class', 'constructor'] },
      { code: '', refs: ['class'] },
      { code: '  // Method definition', refs: ['class', 'method'] },
      { code: '  greet(): string {', refs: ['class', 'method'] },
      {
        code: '    // Template literal (string interpolation)',
        refs: ['class', 'method', 'template-literal'],
      },
      {
        code: '    return `Hello, my name is ${this.name} and my ID is ${this.id}. No, I am not an "any".`;',
        refs: ['class', 'method', 'template-literal'],
      },
      { code: '  }', refs: ['class', 'method'] },
      { code: '}', refs: ['class'] },
      { code: '' },
      { code: '// Function definition with type annotations', refs: ['function'] },
      {
        code: 'function logPerson(person: Person): void {',
        refs: ['function', 'type-annotation'],
      },
      {
        code: '  console.log(`Logging: ${person.name}`);',
        refs: ['function', 'template-literal'],
      },
      { code: '}', refs: ['function'] },
      { code: '' },
      { code: '// Top-level execution block', refs: ['comment'] },
      {
        code: 'const employees: Employee[] = [ // Array type annotation',
        refs: ['variable', 'type-annotation'],
      },
      { code: '  new Employee("Alice", 30, 101),', refs: ['variable'] },
      { code: '  new Employee("Bob", 25, 102)', refs: ['variable'] },
      { code: '];', refs: ['variable'] },
      { code: '' },
      { code: '// Control flow (loop)', refs: ['loop'] },
      { code: 'for (const employee of employees) {', refs: ['loop'] },
      {
        code: '  console.log(employee.greet()); // Method call',
        refs: ['loop'],
      },
      { code: '}', refs: ['loop'] },
      { code: '' },
      { code: '// Type inference', refs: ['type-inference'] },
      {
        code: 'const message = "TypeScript is a superset of JavaScript, and of my patience.";',
        refs: ['type-inference'],
      },
      { code: 'console.log(message); // inferred as string, no cap needed' },
    ],
  },
}
