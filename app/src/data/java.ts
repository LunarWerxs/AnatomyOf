import type { LanguageDef } from '../lib/types'

export const java: LanguageDef = {
  id: 'java',
  popularity: 4,
  name: 'Java',
  titleWord: 'Java',
  article: 'a',
  extensions: ['.java'],
  accentHex: '#f89820',
  officialUrl: 'https://docs.oracle.com/en/java/',
  shikiLang: 'java',
  note: 'Java is a statically-typed, object-oriented programming language designed to have as few implementation dependencies as possible ("write once, run anywhere").',
  annotations: [
    {
      id: 'package',
      title: 'Package declaration',
      body: 'Defines the namespace for the class.',
      details:
        'A `package` statement, when present, must be the first non-comment declaration in the file. It groups related classes under a dotted namespace such as `com.example.anatomy`. Source trees conventionally mirror that name as `com/example/anatomy/JavaAnatomy.java`, and build tools generally expect the layout, though `javac` itself can compile an explicitly named source file from another location.\n\nClasses in the same package can reference each other without an import. Omitting the package statement entirely places the class in the unnamed "default package," which works for small experiments but is avoided by most real projects because named packages cannot import from it.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/package/packages.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Import statements',
      body: 'Brings in classes from other packages.',
      details:
        '`import java.util.List;` lets the rest of the file refer to `List` instead of writing the fully qualified `java.util.List` every time. A wildcard form like `import java.util.*;` imports every public type in that package, though most style guides discourage it because it obscures where a name comes from and can create ambiguity if two packages export a type with the same name.\n\nEverything in `java.lang` (`String`, `Object`, `System`, and friends) is imported automatically and never needs its own `import` line. Classes in the same package are likewise visible without an import.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/package/usepkgs.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'javadoc',
      title: 'Javadoc comment',
      body: 'Documentation for classes, methods, and fields (`/** ... */`).',
      details:
        "A comment opened with `/**` (two asterisks, not one) is a Javadoc comment. Placed directly above a class, method, or field with no blank line in between, it becomes that member's official documentation, extracted by the `javadoc` tool into browsable HTML pages like the ones at docs.oracle.com.\n\nTags such as `@param`, `@return`, and `@throws` document a method's parameters, return value, and exceptions in a structured way that IDEs also read to power autocomplete tooltips. An ordinary `/* ... */` block comment (single leading asterisk) compiles identically but is invisible to `javadoc`.",
      learnMore: 'https://docs.oracle.com/en/java/javase/26/javadoc/javadoc-tool.html',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'The blueprint for objects; must match the filename (`public class ...`).',
      details:
        'Java is thoroughly object-oriented: essentially all code, including `main`, must live inside a class. A `public` top-level class named `JavaAnatomy` must be declared in a file named exactly `JavaAnatomy.java`. The compiler enforces this one-public-class-per-file rule, unlike languages that let any file define any number of top-level constructs.\n\nA class defines the fields and methods that describe a kind of object; `new` creates individual instances from that blueprint. A file may also contain additional non-public (package-private) classes alongside its single public one.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'field',
      title: 'Field (class variable)',
      body: 'Stores data for the class or its objects.',
      details:
        "A field declared directly in the class body, like `private String name;`, holds state that belongs to each object created from the class. Every instance gets its own copy unless the field is also `static`. Access modifiers (`private`, `public`, `protected`, or none/package-private) control which other code can read or write the field directly.\n\nAdding `static` makes a field belong to the class itself rather than any one instance, so all objects share a single copy, commonly paired with `final` for a compile-time constant such as `private static final int MAX_COUNT = 100;`. Java is statically typed, so every field's type is fixed at declaration and checked by the compiler.",
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/variables.html',
      color: 'green',
      side: 'right',
    },
    {
      id: 'constructor',
      title: 'Constructor',
      body: 'Special method called when an object is instantiated.',
      details:
        'A constructor shares its name with the class and has no return type, not even `void`. `public JavaAnatomy(String name) { this.name = name; }` runs once, at the moment `new JavaAnatomy(...)` creates an object, and is typically used to assign initial values to fields.\n\n`this` inside a constructor refers to the object currently being built, and disambiguates a parameter from a field of the same name, as in `this.name = name;`. If a class defines no constructor at all, the compiler silently supplies a no-argument default constructor; that default disappears as soon as any constructor is written explicitly.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'method',
      title: 'Method definition',
      body: 'A reusable block of code that performs an action.',
      details:
        'A method declares an access modifier, a return type, a name, and a parenthesized parameter list, e.g. `public void printGreeting()`. `void` means the method returns nothing; any other return type obliges every code path through the method to return a value of that type.\n\nMethods are invoked on an instance (`demo.printGreeting()`) unless declared `static`, in which case they belong to the class itself and are called through the class name. Java supports overloading (multiple methods with the same name but different parameter lists) resolved at compile time by the argument types used at the call site.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'main-method',
      title: 'Main method',
      body: 'The entry point for a Java application (`public static void main(String[] args)`).',
      details:
        'The JVM starts a program by looking for exactly this signature: `public static void main(String[] args)`. Every keyword is load-bearing. `public` so the JVM launcher can reach it from outside the class, `static` so it can be invoked without first constructing an instance, `void` because it returns nothing to the operating system beyond its exit code, and `String[] args` to receive command-line arguments.\n\nBefore any of this runs, the source file is compiled by `javac` into platform-independent bytecode (a `.class` file), which the JVM then interprets or JIT-compiles at runtime: the basis of Java\'s "write once, run anywhere" promise. A program can technically define `main` in more than one class, but only the class named on the command line (or in the JAR manifest) is used as the entry point.',
      learnMore: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.1.4',
      color: 'red',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration (local)',
      body: 'Declares variables within a method or block.',
      details:
        "A local variable such as `List<Integer> numbers = new ArrayList<>();` must state its type (`List<Integer>`) because Java resolves types at compile time rather than inferring them dynamically at run time. The `<Integer>` part is a generic type parameter that tells the compiler this list may only ever hold `Integer` values, catching type mismatches before the program runs.\n\nSince Java 10, the `var` keyword lets the compiler infer an obvious local variable's type from its initializer (`var numbers = new ArrayList<Integer>();`), saving typing without giving up static typing. The inferred type is still fixed and checked, `var` is purely a source-level shorthand.",
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/generics/types.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'object-creation',
      title: 'Object instantiation',
      body: 'Creates a new instance of a class with `new`.',
      details:
        '`new JavaAnatomy("Java Learner")` allocates memory for a fresh object on the heap, then runs the matching constructor to initialize it, and finally evaluates to a reference to that new object. `new` is the normal explicit construction syntax for classes and arrays, while factories, literals, reflection, deserialization, and boxing can also produce object references without showing `new` at the call site.\n\nBecause objects live on the heap and are accessed through references rather than copied by value, assigning one variable to another (`JavaAnatomy a = demo;`) copies the reference, not the object, both variables then point at the same instance. Unused objects are reclaimed automatically by the JVM\'s garbage collector; Java has no manual `free` or `delete`.',
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly (e.g., `for`, `while`).',
      details:
        "The classic three-clause `for (int i = 0; i < 3; i++) { ... }` declares a loop variable, a continuation condition checked before each pass, and an update executed after each pass. Java also has `while` (condition checked up front) and `do...while` (condition checked after the first pass, guaranteeing at least one iteration).\n\nThe enhanced for-loop, `for (Integer n : numbers) { ... }`, iterates directly over any array or `Iterable` without manual indexing. `break` exits the nearest loop immediately, and `continue` skips straight to the next iteration's check.",
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'method-call',
      title: 'Method call',
      body: 'Executing a method on an object or class.',
      details:
        "`demo.printGreeting();` invokes the `printGreeting` method on the object referenced by `demo`, and `numbers.add(i);` calls `add` on the `ArrayList` instance `numbers`. The compiler resolves which method to run by matching the receiver's type and the argument types against the available overloads.\n\n`System.out.println(...)` is likewise a method call: `System.out` is a `static` field of type `PrintStream` on the `System` class, and `println` is invoked on that object. Calling a `static` method looks similar but goes through the class name instead of an instance, e.g. `Math.max(a, b)`.",
      learnMore: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html#methods',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: 'package com.example.demo;', refs: ['package'] },
      { code: '' },
      { code: 'import java.util.ArrayList;', refs: ['imports'] },
      { code: '' },
      {
        code: 'public class Counter {\n    private int total; // one int, guarded by an entire class. Java.',
        refs: ['class', 'field'],
      },
      { code: '' },
      {
        code: '    public Counter() {\n        this.total = 0;\n    }',
        refs: ['constructor'],
      },
      { code: '' },
      {
        code: '    public void addAll(ArrayList<Integer> values) {\n        for (int value : values) {\n            total += value;\n        }\n    }',
        refs: ['method', 'loop'],
      },
      { code: '' },
      {
        code: '    public static void main(String[] args) {\n        // AbstractFactoryFactory not required for this one\n        Counter counter = new Counter();\n        ArrayList<Integer> values = new ArrayList<>();\n        values.add(5);\n        counter.addAll(values);\n        System.out.println(counter.total); // 5 lines to add one number\n    }\n}',
        refs: ['class', 'main-method', 'variable', 'object-creation', 'method-call'],
      },
    ],
    verbose: [
      { code: 'package com.example.anatomy; // Package declaration', refs: ['package'] },
      { code: '' },
      {
        code: 'import java.util.List; // Import statement\nimport java.util.ArrayList;',
        refs: ['imports'],
      },
      { code: '' },
      {
        code: '/**\n * This is a Javadoc comment for the class.\n * It explains the purpose of the JavaAnatomy class,\n * in roughly the same number of words the class itself uses.\n */',
        refs: ['javadoc'],
      },
      { code: 'public class JavaAnatomy { // Class definition', refs: ['class'] },
      { code: '' },
      { code: '    // Class-level variable (field)', refs: ['field'] },
      {
        code: '    private String name;\n    private static final int MAX_COUNT = 100; // Constant',
        refs: ['field'],
      },
      { code: '' },
      {
        code: '    /**\n     * Constructor with a parameter.\n     * @param name The name to initialize.\n     */',
        refs: ['javadoc', 'constructor'],
      },
      {
        code: '    public JavaAnatomy(String name) {\n        this.name = name; // Assigning value to field\n    }',
        refs: ['constructor'],
      },
      { code: '' },
      { code: '    // A simple method', refs: ['method'] },
      {
        code: '    public void printGreeting() {\n        System.out.println("Hello, " + this.name + "! Now let\'s talk about NullPointerExceptions.");\n    }',
        refs: ['method', 'method-call'],
      },
      { code: '' },
      {
        code: '    /**\n     * The main method - entry point of the application.\n     * @param args Command-line arguments.\n     */',
        refs: ['javadoc', 'main-method'],
      },
      { code: '    public static void main(String[] args) {', refs: ['main-method'] },
      {
        code: '        /*\n         * Multi-line comment inside main method.\n         * Creating an instance of the class.\n         * (No AbstractSingletonProxyFactoryBean needed, we promise.)\n         */',
        refs: ['main-method'],
      },
      {
        code: '        JavaAnatomy demo = new JavaAnatomy("Java Learner");',
        refs: ['main-method', 'variable', 'object-creation'],
      },
      {
        code: '        demo.printGreeting(); // Method call',
        refs: ['main-method', 'method-call'],
      },
      { code: '', refs: ['main-method'] },
      { code: '        // Local variable & loop', refs: ['main-method'] },
      {
        code: '        List<Integer> numbers = new ArrayList<>();',
        refs: ['main-method', 'variable', 'object-creation'],
      },
      {
        code: '        for (int i = 0; i < 3; i++) {\n            numbers.add(i);\n        }',
        refs: ['main-method', 'loop', 'method-call'],
      },
      { code: '    }', refs: ['main-method'] },
      { code: '}', refs: ['class'] },
    ],
  },
}
