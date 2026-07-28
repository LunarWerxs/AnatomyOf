import type { LanguageDef } from '../lib/types'

export const php: LanguageDef = {
  id: 'php',
  popularity: 14,
  name: 'PHP',
  titleWord: 'PHP',
  article: 'a',
  extensions: ['.php'],
  accentHex: '#777bb4',
  officialUrl: 'https://www.php.net/',
  shikiLang: 'php',
  note: 'PHP is a widely-used open-source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.',
  annotations: [
    {
      id: 'opening-tag',
      title: 'Opening tag',
      body: '`<?php` switches the parser from HTML text into PHP code mode.',
      details:
        'Everything outside `<?php ... ?>` is sent to the output verbatim as plain text, which is what lets a `.php` file mix HTML markup and PHP logic in the same document. A template can drop in and out of PHP mode as many times as it needs. `<?php` (with the trailing space or newline) is the canonical form; the short echo tag `<?=` is also common for printing a single expression inline in a template.\n\nA shorthand `<?` tag exists but is disabled by default (`short_open_tag`) on most installations, so `<?php` is the only form that is guaranteed to work everywhere. Because the tag itself is what triggers execution, a stray `<?php` earlier in a file that was meant to stay HTML is a classic source of accidental code execution.',
      learnMore: 'https://www.php.net/manual/en/language.basic-syntax.phptags.php',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`, `#`) or block (`/* ... */`), ignored by the interpreter.',
      details:
        "`//` and `#` both start a comment that runs to the end of the line; `//` is the more idiomatic choice in most style guides, while `#` is more often seen in shell-style config or inline directives. A `/* ... */` block comments out everything between the delimiters, including multiple lines, but cannot be nested.\n\nDocumentation comments written as `/** ... */` (two asterisks) follow the same PHPDoc convention as Javadoc: tags like `@param` and `@return` describe a function's signature for humans and for IDE tooling, even though PHP itself never checks them at runtime.",
      learnMore: 'https://www.php.net/manual/en/language.basic-syntax.comments.php',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'namespace',
      title: 'Namespace declaration',
      body: 'Organizes code into logical groups and avoids name collisions.',
      details:
        "A `namespace MyProject\\Models;` statement, when present, must be the first statement in the file (aside from comments and the opening tag). It groups related classes, functions, and constants under a prefix, so two libraries can each define a class named `User` without colliding, as long as they live in different namespaces.\n\nNamespaces are separated with a backslash, mirroring the directory-like structure most autoloaders (including Composer's PSR-4 standard) expect: `MyProject\\Models\\User` typically resolves to a file at `src/Models/User.php`. Code outside the namespace refers back to it with a fully qualified name or a `use` import.",
      learnMore: 'https://www.php.net/manual/en/language.namespaces.rationale.php',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'use-statement',
      title: 'Use statement',
      body: '`use` imports a class, function, or namespace so it can be referenced by a short name.',
      details:
        '`use DateTime;` (or `use App\\Services\\Mailer;`) lets the rest of the file refer to `DateTime` instead of its fully qualified name. Without the import, code outside the global namespace would have to write `\\DateTime`, a leading backslash forcing PHP to look in the root namespace instead of the current one.\n\n`use ... as Alias` renames an imported symbol when two libraries export something with the same short name, and a single file can carry as many `use` statements as it needs, conventionally grouped just below the `namespace` line.',
      learnMore: 'https://www.php.net/manual/en/language.namespaces.importing.php',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'The blueprint for objects, defined with `class ... { }`.',
      details:
        'A `class` block defines a new type made up of properties (data) and methods (behavior). PHP is thoroughly object-oriented from PHP 5 onward, though unlike Java it does not require one class per file or a filename match. A single file can define several classes, functions, and top-level statements together.\n\nClasses support single inheritance (`class Admin extends User`) and can implement any number of interfaces (`implements Countable, ArrayAccess`). Traits (`use SomeTrait;` inside the class body) offer a form of horizontal code reuse for when inheritance alone will not fit.',
      learnMore: 'https://www.php.net/manual/en/language.oop5.basic.php',
      color: 'green',
      side: 'left',
    },
    {
      id: 'property',
      title: 'Property (class variable)',
      body: 'Data stored within an object, declared with a visibility modifier.',
      details:
        'A property declared in the class body, like `private DateTime $createdAt;`, holds state that belongs to each object created from the class. `public`, `protected`, and `private` control whether outside code, subclasses, or only the class itself can read and write the property directly.\n\nAs of PHP 7.4+, properties can carry an optional type declaration (`string $name`), which the engine enforces at assignment time, a mismatched type throws a `TypeError` rather than silently coercing. Marking a property `readonly` (PHP 8.1+) additionally forbids changing it after it is first set.',
      learnMore: 'https://www.php.net/manual/en/language.oop5.properties.php',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'constructor',
      title: 'Constructor method',
      body: '`__construct` runs automatically when a new object is created with `new`.',
      details:
        '`__construct` is a "magic method". Its double-underscore name is reserved by the engine and called for you rather than invoked directly. `new User("Alice")` allocates the object, then immediately calls `__construct("Alice")` on it, which is the conventional place to assign incoming arguments to properties, typically via `$this`.\n\nPHP 8 also supports constructor property promotion, letting `public function __construct(private string $name) {}` declare and assign a property in one line without a separate property declaration or an explicit `$this->name = $name;` body statement.',
      learnMore: 'https://www.php.net/manual/en/language.oop5.decon.php',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'method',
      title: 'Method / function definition',
      body: 'A reusable block of code defined with `function`, inside or outside a class.',
      details:
        "`function greet(): string { ... }` defines a function; the same syntax inside a class body defines a method, callable on an instance as `$alice->greet()`. An optional return type after the colon (here `string`) is enforced by the engine when strict typing is enabled with `declare(strict_types=1);` at the top of the file.\n\nMethods and functions can take typed parameters, default values, and a variadic `...$args` catch-all. Inside an instance method, `$this` refers to the object the method was called on and is how the body reaches the object's own properties, e.g. `$this->name`.",
      learnMore: 'https://www.php.net/manual/en/functions.user-defined.php',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable',
      body: 'Starts with `$`, dynamically typed, no declaration keyword needed.',
      details:
        "Every PHP variable name is prefixed with a sigil, `$`, which is what lets the engine tell a bare word like a function name apart from a variable reference at a glance. Variables need no declaration; assigning to `$alice` the first time creates it, and its type is whatever value it currently holds rather than something fixed up front.\n\nVariables are function-scoped by default: a variable created inside a function is invisible outside it, and a global variable is likewise invisible inside a function unless explicitly imported with `global $name;` or captured by a closure's `use (...)` clause.",
      learnMore: 'https://www.php.net/manual/en/language.variables.basics.php',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'object-instantiation',
      title: 'Object instantiation',
      body: 'Creates a new instance of a class with `new`.',
      details:
        '`new User("Alice")` allocates a new object, runs its constructor with the given arguments, and evaluates to a reference to that object. Every object lives on the heap and is accessed through a reference: assigning `$bob = $alice` copies the reference, so both variables point at the same underlying object, while `clone $alice` produces an independent copy.\n\nBuilt-in classes are instantiated the same way as user-defined ones, as in `new DateTime()` for the current date and time. PHP\'s garbage collector reclaims an object automatically once nothing references it any longer; there is no manual `free`.',
      learnMore: 'https://www.php.net/manual/en/language.oop5.basic.php#language.oop5.basic.new',
      color: 'red',
      side: 'right',
    },
    {
      id: 'string-interp',
      title: 'String interpolation',
      body: 'Embeds variables directly inside double-quoted strings.',
      details:
        'A double-quoted string like `"Hello, my name is $name."` substitutes `$name`\'s value directly into the text at runtime; single-quoted strings never interpolate and treat `$name` as literal characters. Reaching into an object property or array element needs the curly-brace form, `"{$this->name}"` or `"{$items[\'key\']}"`, so the parser knows exactly where the expression ends.\n\nInterpolation is generally preferred over concatenation with `.` for readability when mixing several variables into one string, though both compile to the same underlying operation and neither is meaningfully faster than the other in modern PHP.',
      learnMore:
        'https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '<?php', refs: ['opening-tag'] },
      { code: '' },
      { code: 'class Greeter', refs: ['class'] },
      { code: '{', refs: ['class'] },
      {
        code: '    private string $greeting;',
        refs: ['class', 'property'],
      },
      { code: '', refs: ['class'] },
      {
        code: '    public function __construct(string $greeting)\n    {\n        $this->greeting = $greeting;\n    }',
        refs: ['class', 'constructor', 'variable'],
      },
      { code: '', refs: ['class'] },
      {
        code: '    public function greet(string $name): string\n    {\n        return "$this->greeting, $name!";\n    }',
        refs: ['class', 'method', 'string-interp'],
      },
      { code: '}', refs: ['class'] },
      { code: '' },
      {
        code: '// To iterate is human, to recurse divine\n$greeter = new Greeter("Hello");',
        refs: ['object-instantiation', 'variable'],
      },
      { code: 'echo $greeter->greet("Alice");' },
    ],
    verbose: [
      { code: '<?php // Opening PHP tag', refs: ['opening-tag'] },
      { code: '' },
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "/*\n  This is a multi-line comment\n  describing the file's purpose.\n  (needle, haystack -- please, for the love of\n  consistent argument order, someone check the docs)\n*/",
        refs: ['comment'],
      },
      { code: '' },
      { code: 'namespace MyProject\\Models; // Namespace declaration', refs: ['namespace'] },
      { code: '' },
      { code: 'use DateTime; // Import statement (using a class)', refs: ['use-statement'] },
      { code: '' },
      { code: '// Class definition', refs: ['class'] },
      { code: 'class User', refs: ['class'] },
      { code: '{', refs: ['class'] },
      {
        code: '    // Class property (variable with visibility modifier)',
        refs: ['class', 'property'],
      },
      {
        code: '    public string $name;\n    private DateTime $createdAt;',
        refs: ['class', 'property'],
      },
      { code: '', refs: ['class'] },
      { code: '    // Constructor method', refs: ['class', 'constructor'] },
      {
        code: '    public function __construct(string $name)\n    {',
        refs: ['class', 'constructor'],
      },
      {
        code: '        $this->name = $name; // Accessing property via $this',
        refs: ['class', 'constructor', 'variable', 'property'],
      },
      {
        code: '        $this->createdAt = new DateTime(); // Object instantiation',
        refs: ['class', 'constructor', 'object-instantiation'],
      },
      { code: '    }', refs: ['class', 'constructor'] },
      { code: '', refs: ['class'] },
      { code: '    // Method definition', refs: ['class', 'method'] },
      {
        code: '    public function greet(): string\n    {',
        refs: ['class', 'method'],
      },
      { code: '        // String interpolation', refs: ['class', 'method', 'string-interp'] },
      {
        code: '        return "Hello, my name is {$this->name}.";',
        refs: ['class', 'method', 'string-interp', 'property'],
      },
      { code: '    }', refs: ['class', 'method'] },
      { code: '}', refs: ['class'] },
      { code: '' },
      { code: '// Script-level execution (outside the class)', refs: ['variable'] },
      {
        code: '$alice = new User("Alice"); // Object instantiation',
        refs: ['variable', 'object-instantiation'],
      },
      { code: '' },
      { code: '// Method call' },
      { code: 'echo $alice->greet();' },
      { code: '' },
      { code: '// Control flow (conditional)' },
      { code: 'if (isset($alice)) {' },
      {
        code: '    echo "\\nUser object is set. isset() agrees, for once.";',
        refs: ['string-interp'],
      },
      { code: '}' },
      { code: '' },
      {
        code: '?> <!-- Closing PHP tag (optional at end of file, and rarely used -- the tag that launched a thousand style-guide debates) -->',
      },
    ],
  },
}
