import type { LanguageDef } from '../lib/types'

export const cpp: LanguageDef = {
  id: 'cpp',
  popularity: 3,
  name: 'C++',
  titleWord: 'C++',
  article: 'a',
  extensions: ['.cpp', '.hpp'],
  accentHex: '#00599c',
  officialUrl: 'https://isocpp.org/',
  shikiLang: 'cpp',
  note: 'C++ is a powerful, high-performance, compiled programming language that supports procedural, object-oriented, and generic programming.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Block (`/* ... */`) or single-line (`//`), ignored by the compiler.',
      details:
        'A `/* ... */` block comment can span multiple lines but does not nest, so the compiler stops at the first `*/` it finds. `//` single-line comments run to the end of the physical line and are the more common style in modern C++ for short, local notes.\n\nBoth forms are removed during translation before the compiler ever sees C++ syntax proper, so they have zero effect on the generated machine code. Because C++ offers no built-in doc-comment format, tools like Doxygen instead scan specially formatted `//!` or `/** */` comments to generate reference documentation.',
      learnMore: 'https://en.cppreference.com/w/cpp/comment.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'preprocessor',
      title: 'Preprocessor directive',
      body: 'Processed before compilation (starts with `#`).',
      details:
        "`#include <iostream>` runs through the preprocessor, a text-substitution pass that copy-pastes the named header's declarations into the file before the compiler proper runs. Angle brackets search the standard/system include paths; quotes search the local project directory first.\n\nC++ inherits the preprocessor from C, but modern C++ leans on it far less: templates, `constexpr`, and (since C++20) modules replace many of the macro tricks C code relies on. Headers like `<iostream>` and `<string>` pull in the standard library facilities used throughout this file.",
      learnMore: 'https://en.cppreference.com/w/cpp/preprocessor/include.html',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'namespace',
      title: 'Using directive',
      body: 'Makes names from a namespace available without qualification.',
      details:
        'The entire standard library lives inside the `std` namespace, so `cout` is really `std::cout`. `using namespace std;` imports every name from `std` into the current scope, letting the rest of the file write `cout` and `string` instead of spelling out the prefix each time.\n\nIt is convenient for short programs and teaching examples, but real-world C++ code and header files generally avoid a blanket `using namespace std;` because it can silently introduce naming collisions as the standard library grows; a targeted `using std::cout;` or an explicit `std::` prefix is the safer habit.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/namespace.html',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'The blueprint for objects (`class ...`).',
      details:
        '`class Greeter { ... };` defines a new type: a bundle of data (member variables) and behavior (member functions) that objects of that type will share. Note the semicolon after the closing brace: unlike a function body, a class definition is a declaration and must be terminated.\n\nClasses are the foundation of object-oriented C++ and also enable RAII (Resource Acquisition Is Initialization): a constructor acquires a resource and the destructor releases it automatically when the object goes out of scope, which is how C++ manages memory and handles without a garbage collector.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/classes.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'access-specifier',
      title: 'Access specifier',
      body: 'Controls visibility (`public`, `private`, `protected`).',
      details:
        "`private:` and `public:` are labels, not blocks. Every member declared after one applies until the next specifier appears. Private members are only reachable from inside the class's own member functions; public members form the class's external interface that other code is allowed to call.\n\nA third specifier, `protected`, behaves like `private` but also stays visible to derived classes. Classes default to `private` access when no specifier is given (the `struct` keyword defines the same kind of type but defaults to `public`), so `Greeter` states `private:` explicitly for its data.",
      learnMore: 'https://en.cppreference.com/w/cpp/language/access.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'member-variable',
      title: 'Member variable (field)',
      body: 'Data stored within an object.',
      details:
        '`string greeting;` declares a per-object field: every `Greeter` instance gets its own independent copy of `greeting`. Because it sits under `private:`, only `Greeter`\'s own member functions can read or write it directly. Outside code must go through a public method.\n\nMember variables are typically initialized in the constructor, as `greeting` is here via the constructor\'s parameter. Modern C++ also allows default member initializers written directly at the declaration (e.g. `string greeting = "Hi";`), which apply whenever a constructor does not override them.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/data_members.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'constructor',
      title: 'Constructor',
      body: 'Special method to initialize an object.',
      details:
        'A constructor shares its name with the class and has no return type. `Greeter(string g) { greeting = g; }` runs automatically whenever a `Greeter` is created, giving the new object a chance to set up its member variables before any other code can touch it.\n\nConstructors can be overloaded (multiple constructors with different parameter lists), and C++11 added member initializer lists (`Greeter(string g) : greeting(g) {}`) as the preferred way to initialize fields, since they initialize directly rather than assigning after default construction.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/constructor.html',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'member-method',
      title: 'Member method',
      body: 'A function defined within a class.',
      details:
        "`void greet(string name) { ... }` is a function that belongs to `Greeter` and can freely read the object's own member variables, here it reaches `greeting` without needing it passed in as a parameter. Every non-static member function implicitly receives a pointer to the calling object, accessible explicitly as `this`.\n\nMember functions can be marked `const` to promise they will not modify the object, `virtual` to allow derived classes to override them, or `static` to belong to the class itself rather than any particular instance.",
      learnMore: 'https://en.cppreference.com/w/cpp/language/member_functions.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'main-function',
      title: 'Main function',
      body: 'The entry point for a C++ application (`int main()...`).',
      details:
        "Every standalone C++ program has exactly one `main` function, and execution begins there. Its `int` return type is the process's exit status handed back to the operating system: `0` conventionally means success, and any nonzero value signals an error.\n\n`main` may also be written to accept command-line arguments as `int main(int argc, char* argv[])`. Reaching the closing brace without an explicit `return` is a special case C++ allows only for `main`, implicitly returning `0`.",
      learnMore: 'https://en.cppreference.com/w/cpp/language/main_function.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'local-variable',
      title: 'Local variable',
      body: 'A variable declared inside a function.',
      details:
        '`string userName = "World";` declares a variable scoped to the block it appears in: here, the body of `main`. It is constructed when execution reaches the declaration and destroyed automatically when that scope ends, which for a `std::string` means its destructor frees any heap memory it allocated.\n\nC++ favors this kind of automatic, stack-managed lifetime (RAII) over manual allocation: because the object\'s destructor runs deterministically at scope exit, resources are released without needing a garbage collector or explicit `free`.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/storage_duration.html',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'object-instantiation',
      title: 'Object instantiation',
      body: 'Creating an instance of a class.',
      details:
        '`Greeter myGreeter("Hello");` constructs a new `Greeter` object on the stack, passing `"Hello"` to its constructor, which stores it as `greeting`. No `new` keyword is needed here because the object\'s lifetime is tied to the enclosing scope rather than the heap.\n\nHeap allocation is still available via `new Greeter("Hello")`, which returns a pointer and requires an explicit `delete` (or, in modern C++, a smart pointer like `std::unique_ptr` that deletes automatically). Stack construction like this example is preferred whenever the object does not need to outlive its scope.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/object.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'method-call',
      title: 'Method call',
      body: 'Executing a method on an object.',
      details:
        '`myGreeter.greet(userName);` invokes the `greet` member function on the specific object `myGreeter`, using the dot operator. Inside `greet`, `this` implicitly refers back to `myGreeter`, which is how the method can reach its own `greeting` field.\n\nThe dot operator (`.`) is used for objects and references; when calling a method through a pointer to an object, C++ uses the arrow operator (`->`) instead, which is shorthand for dereferencing the pointer and then applying `.`.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/operator_member_access.html',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'console-output',
      title: 'Console output',
      body: 'Writing to standard out (`cout` with `<<`).',
      details:
        '`cout` is the standard output stream declared in `<iostream>`, and `<<` is the stream insertion operator: `cout << greeting << ", " << name << "!" << endl;` chains several values onto the stream in sequence. Because `<<` is overloaded for every built-in type and for `std::string`, the same syntax works whether you are printing numbers, text, or custom types that define their own overload.\n\n`endl` writes a newline and flushes the stream\'s buffer; `"\\n"` also writes a newline but without the forced flush, so it is typically cheaper in output-heavy code. The matching input stream, `cin`, reads from standard input using the extraction operator `>>`.',
      learnMore: 'https://en.cppreference.com/w/cpp/io/cout.html',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `else`, `switch`).',
      details:
        '`if (userName == "World") { ... }` runs its block only when the parenthesized expression evaluates to `true`. `std::string` overloads `==` to compare contents rather than pointer identity, so this compares the actual characters rather than memory addresses.\n\n`else` and `else if` chain additional branches, and `switch` dispatches on an integral or enum value across `case` labels. Since C++17, `if` can also carry an init-statement (`if (auto it = find(...); it != end)`), scoping a helper variable to the condition and its branches.',
      learnMore: 'https://en.cppreference.com/w/cpp/language/if.html',
      color: 'green',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '#include <iostream>', refs: ['preprocessor'] },
      { code: 'using namespace std;', refs: ['namespace'] },
      { code: '' },
      {
        code: 'class Counter {\nprivate:\n    int value; // Member variable',
        refs: ['class', 'access-specifier', 'member-variable'],
      },
      { code: 'public:', refs: ['class', 'access-specifier'] },
      {
        code: '    Counter() {\n        value = 0;\n    }',
        refs: ['class', 'constructor'],
      },
      { code: '' },
      {
        code: '    void increment() {\n        value = value + 1;\n        cout << "Value: " << value << endl; // undefined behavior not included\n    }',
        refs: ['class', 'member-method', 'console-output'],
      },
      { code: '};', refs: ['class'] },
      { code: '' },
      {
        code: 'int main() {\n    Counter myCounter;\n    myCounter.increment();\n    myCounter.increment();\n    return 0;\n}',
        refs: ['main-function', 'object-instantiation', 'method-call'],
      },
    ],
    verbose: [
      {
        code: "/* This is a multi-line comment\n   describing the C++ program.\n   Remember: C++ makes it hard to shoot yourself in the foot;\n   if you do, you'll blow off your whole leg. */",
        refs: ['comment'],
      },
      {
        code: '#include <iostream> // Preprocessor directive for I/O (50 years old and still not import std;)',
        refs: ['preprocessor', 'comment'],
      },
      { code: '#include <string>', refs: ['preprocessor'] },
      { code: '' },
      { code: '// Using directive to avoid std:: prefix', refs: ['comment'] },
      { code: 'using namespace std;', refs: ['namespace'] },
      { code: '' },
      { code: '// Class definition', refs: ['comment'] },
      { code: 'class Greeter {', refs: ['class'] },
      { code: 'private:', refs: ['class', 'access-specifier'] },
      {
        code: '    string greeting; // Member variable (private)',
        refs: ['class', 'access-specifier', 'member-variable', 'comment'],
      },
      { code: 'public:', refs: ['class', 'access-specifier'] },
      { code: '    // Constructor', refs: ['class', 'comment'] },
      {
        code: '    Greeter(string g) {\n        greeting = g;\n    }',
        refs: ['class', 'constructor'],
      },
      { code: '', refs: ['class'] },
      { code: '    // Member method', refs: ['class', 'comment'] },
      {
        code: '    void greet(string name) {\n        cout << greeting << ", " << name << "!" << endl; // Console output (no garbage collector was harmed)\n    }',
        refs: ['class', 'member-method', 'console-output', 'comment'],
      },
      { code: '};', refs: ['class'] },
      { code: '' },
      { code: '// Main function - entry point', refs: ['comment'] },
      { code: 'int main() {', refs: ['main-function'] },
      {
        code: '    // Local variable\n    string userName = "World";',
        refs: ['main-function', 'local-variable', 'comment'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Object instantiation\n    Greeter myGreeter("Hello");',
        refs: ['main-function', 'object-instantiation', 'comment'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Method call\n    myGreeter.greet(userName);',
        refs: ['main-function', 'method-call', 'comment'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Control flow (conditional)\n    if (userName == "World") {',
        refs: ['main-function', 'conditional', 'comment'],
      },
      {
        code: '        cout << "A standard greeting was given. Compiles clean, zero warnings (this time)." << endl;',
        refs: ['main-function', 'conditional', 'console-output'],
      },
      { code: '    }', refs: ['main-function', 'conditional'] },
      { code: '', refs: ['main-function'] },
      {
        code: '    return 0; // Return statement indicating success',
        refs: ['main-function', 'comment'],
      },
      { code: '}', refs: ['main-function'] },
    ],
  },
}
