import type { LanguageDef } from '../lib/types'

export const python: LanguageDef = {
  id: 'python',
  popularity: 1,
  name: 'Python',
  titleWord: 'Python',
  article: 'a',
  extensions: ['.py'],
  accentHex: '#3776ab',
  officialUrl: 'https://www.python.org/',
  shikiLang: 'python',
  note: 'Python is an interpreted, high-level, general-purpose programming language emphasizing code readability.',
  annotations: [
    {
      id: 'shebang',
      title: 'Shebang',
      body: 'Specifies the interpreter path (optional, for Unix-like systems).',
      details:
        'The shebang (`#!`) must be the very first bytes of the file. On Unix-like systems the kernel reads it to find which interpreter runs the script. `/usr/bin/env python3` asks `env` to locate `python3` on the current `PATH`, which is more portable than hard-coding a path like `/usr/bin/python3`.\n\nWindows ignores the shebang (though the `py.exe` launcher can read it), and it is entirely optional when you invoke the script explicitly with `python script.py`. It only matters when the file is executed directly, e.g. `./script.py` after `chmod +x`.',
      learnMore: 'https://en.wikipedia.org/wiki/Shebang_(Unix)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'docstring',
      title: 'Docstring',
      body: 'Module, class, or function documentation in triple quotes.',
      details:
        'A string literal placed as the first statement of a module, class, or function becomes its docstring: it is stored at runtime in the `__doc__` attribute and shown by `help()`. Triple quotes (`"""`) let it span multiple lines.\n\nConvention (PEP 257): a one-line summary, then a blank line, then details. Tools like Sphinx, pydoc, and IDE tooltips surface docstrings as documentation, so they are worth writing well.',
      learnMore: 'https://peps.python.org/pep-0257/',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'imports',
      title: 'Import statements',
      body: 'Imports external modules or functions.',
      details:
        '`import os` binds the whole module to a name, while `from datetime import datetime` pulls a single attribute into the current namespace. Imported modules are cached in `sys.modules`, so importing the same module twice is cheap.\n\nStyle (PEP 8): imports live at the top of the file, grouped as standard library, third-party, then local imports: one blank line between groups.',
      learnMore: 'https://docs.python.org/3/reference/import.html',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable definition',
      body: 'Assigns a value to a name.',
      details:
        'Assignment (`=`) binds a name to an object. Names carry no declared type. A module-level name written in `ALL_CAPS` signals a constant by convention only; Python does not enforce immutability, it is a contract between programmers.\n\nType hints such as `GLOBAL_CONSTANT: int = 42` make intent explicit and let static checkers like mypy or pyright verify usage without changing runtime behavior.',
      learnMore: 'https://docs.python.org/3/reference/simple_stmts.html#assignment-statements',
      color: 'green',
      side: 'right',
    },
    {
      id: 'class',
      title: 'Class definition',
      body: 'Defines a blueprint for objects using `class`.',
      details:
        '`class` creates a new type. Methods are functions defined in the class body whose first parameter (`self`) receives the instance. `__init__` runs right after an object is created and typically assigns instance attributes like `self.name`.\n\nPython also supports inheritance (`class Child(Parent):`), multiple inheritance, and "dunder" protocol methods like `__repr__` and `__eq__` that hook instances into built-in behavior.',
      learnMore: 'https://docs.python.org/3/tutorial/classes.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'function',
      title: 'Function/method definition',
      body: 'Defines a reusable block of code using `def`.',
      details:
        '`def` binds a function object to a name. The body is indented. Whitespace is the block syntax in Python. Functions accept positional and keyword arguments, defaults, and `*args`/`**kwargs`, and return `None` unless a `return` statement says otherwise.\n\nThe same syntax inside a class body defines a method; the instance arrives as the first parameter, conventionally named `self`. f-strings like `f"Hello, {self.name}!"` interpolate expressions directly into string literals.',
      learnMore: 'https://docs.python.org/3/reference/compound_stmts.html#function-definitions',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `elif`, `else`).',
      details:
        '`if`/`elif`/`else` route execution based on truthiness: empty containers, `0`, `None`, and `""` all count as false. Conditions need no surrounding parentheses, and comparisons chain naturally (`0 < x < 10`).\n\nSince Python 3.10, structural pattern matching (`match`/`case`) covers the multi-branch cases a switch statement would handle in other languages.',
      learnMore: 'https://docs.python.org/3/reference/compound_stmts.html#the-if-statement',
      color: 'red',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Repeats code (`for`, `while`).',
      details:
        "`for` iterates over any iterable (lists, strings, dicts, generators, or `range(...)`) rather than counting indices; `while` repeats as long as a condition holds. `break` exits early, `continue` skips to the next pass, and a loop's optional `else` clause runs only when it finishes without `break`.\n\n`range(3)` yields 0, 1, 2. The stop value is exclusive. Use `enumerate(items)` when you need the index alongside each element.",
      learnMore: 'https://docs.python.org/3/reference/compound_stmts.html#the-for-statement',
      color: 'rose',
      side: 'left',
    },
    {
      id: 'main-block',
      title: 'Main execution block',
      body: 'Ensures code runs only when executed as a script.',
      details:
        'Every module has a `__name__` variable: it equals `"__main__"` when the file is executed directly, but the module\'s own name when imported. Guarding the entry point this way lets one file serve as both a runnable script and an importable library without side effects at import time.\n\nThe guard also matters on Windows for `multiprocessing`, which re-imports the main module in child processes and would otherwise re-run top-level code.',
      learnMore: 'https://docs.python.org/3/library/__main__.html',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '"""A minimal Python script. Batteries included, semicolons not."""',
        refs: ['docstring'],
      },
      { code: '' },
      { code: 'import os', refs: ['imports'] },
      { code: '' },
      { code: 'GREETING = "Hello"', refs: ['variable'] },
      { code: '' },
      {
        code: 'def main():\n    print(f"{GREETING} from {os.name}!")  # it works on my machine',
        refs: ['function'],
      },
      { code: '' },
      {
        code: 'if __name__ == "__main__":\n    main()',
        refs: ['main-block'],
      },
    ],
    verbose: [
      { code: '#!/usr/bin/env python3', refs: ['shebang'] },
      {
        code: `"""
This is a module docstring.
It provides an overview of the file's purpose.
There should be one-- and preferably only one --obvious way to do it.
"""`,
        refs: ['docstring'],
      },
      { code: '' },
      {
        code: 'import os  # Import a standard library module\nfrom datetime import datetime  # for pretending we manage time instead of the reverse',
        refs: ['imports'],
      },
      { code: '' },
      {
        code: '# Global variable definition (a promise, not a law -- Python trusts you)\nGLOBAL_CONSTANT = 42',
        refs: ['variable'],
      },
      { code: '' },
      { code: '' },
      {
        code: 'class Greeter:\n    """A simple greeter class."""',
        refs: ['class'],
      },
      { code: '', refs: ['class'] },
      {
        code: '    def __init__(self, name):\n        self.name = name  # Instance variable',
        refs: ['class', 'function'],
      },
      { code: '', refs: ['class'] },
      {
        code: '    def greet(self):\n        """Method to print a greeting."""\n        print(f"Hello, {self.name}! Indentation is load-bearing here.")',
        refs: ['class', 'function'],
      },
      { code: '' },
      { code: '' },
      {
        code: 'def main():\n    """Main function to execute script logic."""\n    current_time = datetime.now()\n    print(f"Execution started at: {current_time}")',
        refs: ['function'],
      },
      { code: '' },
      {
        code: '    # Conditional logic\n    if GLOBAL_CONSTANT > 40:\n        print("Constant is greater than 40")',
        refs: ['conditional'],
      },
      { code: '' },
      {
        code: '    # Loop example\n    for i in range(3):\n        greeter = Greeter(f"User{i}")\n        greeter.greet()',
        refs: ['loop'],
      },
      { code: '' },
      { code: '' },
      {
        code: '# Main execution block\nif __name__ == "__main__":\n    main()',
        refs: ['main-block'],
      },
    ],
  },
}
