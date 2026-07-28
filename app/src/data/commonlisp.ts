import type { LanguageDef } from '../lib/types'

export const commonLisp: LanguageDef = {
  id: 'commonlisp',
  popularity: 33,
  name: 'Common Lisp',
  titleWord: 'Common Lisp',
  article: 'a',
  extensions: ['.lisp', '.lsp', '.cl'],
  accentHex: '#7c3aed',
  officialUrl: 'https://lisp-lang.org/',
  shikiLang: 'common-lisp',
  note: 'Common Lisp is a standardized, multi-paradigm Lisp with interactive development, native compilation, macros, an object system, and a powerful condition-and-restart system.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'A semicolon starts a line comment; more semicolons conventionally mark broader scope.',
      details:
        'One or more semicolons comment out the remainder of a line. By convention, `;` annotates a nearby expression, `;;` explains a local section, and `;;;` introduces a top-level definition or file section.\n\nCommon Lisp also has reader comments: `#| ... |#` nests for blocks, and `#;` tells the reader to skip the next complete form: useful when temporarily disabling a balanced expression.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'package-definition',
      title: 'Package definition',
      body: 'Creates a namespace and declares what it uses and exports.',
      details:
        '`defpackage` creates or updates a package at compile/load time. `(:use :cl)` makes the standardized Common Lisp symbols accessible, and `(:export :main)` marks `MAIN` as part of this package’s public interface.\n\nPackages organize symbol names, not source files or object modules. A system definition tool such as ASDF separately describes which files make up a larger program.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'in-package',
      title: 'Package selection',
      body: 'Makes a package the reader’s current namespace for following forms.',
      details:
        '`in-package` changes the value of `*package*`, controlling where unqualified symbols read later in the file are interned or resolved. It does not import a file and it does not wrap following forms in a lexical block.\n\nPlacing it near the top prevents definitions from accidentally landing in the implementation’s default `CL-USER` package.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'special-variable',
      title: 'Global special variable',
      body: '`defparameter` defines a dynamically scoped global and assigns its value.',
      details:
        '`defparameter` always assigns the supplied initial value when the form is evaluated. The surrounding asterisks are a naming convention that warns readers the variable is special (dynamically bindable) rather than an ordinary lexical local.\n\n`defvar` differs by preserving an existing bound value, which makes it useful for user-configurable state during interactive development.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'structure-definition',
      title: 'Structure definition',
      body: '`defstruct` defines a record-like type plus constructor and accessor functions.',
      details:
        '`(defstruct greeting text enthusiasm)` creates the type `greeting`, a constructor named `make-greeting`, a predicate, a copier, and accessors such as `greeting-text`.\n\nThis generated protocol is ordinary Common Lisp functionality, so code calls the accessors like any other functions. More elaborate object models use the Common Lisp Object System (`defclass` and generic functions).',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'green',
      side: 'left',
    },
    {
      id: 'function-definition',
      title: 'Function definition (`defun`)',
      body: 'Binds a named function with a parameter list and one or more body forms.',
      details:
        '`defun` installs a global function definition. Its body evaluates from left to right, and the value of the final form becomes the function’s return value. No dedicated `return` statement is required.\n\nCommon Lisp keeps a symbol’s function binding separate from its variable binding, which is why the same printed symbol can name both without conflict.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'lambda-list',
      title: 'Lambda list',
      body: 'Describes required, optional, rest, and keyword parameters.',
      details:
        '`(&optional (name *default-name*))` makes `name` optional and supplies an expression for its default. Common Lisp lambda lists can also use `&rest` to gather extra arguments, `&key` for named arguments, and `&aux` for auxiliary bindings.\n\nThe same vocabulary appears in anonymous `lambda` functions, methods, and many macro definitions, with specialized additions for those contexts.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'lexical-binding',
      title: 'Lexical binding (`let`)',
      body: 'Creates local variable bindings for the forms in its body.',
      details:
        '`let` evaluates each initializer, establishes the local bindings in parallel, and evaluates its body in that lexical environment. `let*` is the sequential variant, allowing each later initializer to refer to earlier bindings.\n\nA local name declared special, including the conventional `*earmuffed*` globals, receives a dynamic binding instead, visible to functions called during the binding’s lifetime.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'loop-macro',
      title: 'LOOP macro',
      body: 'Expresses iteration with a rich clause-oriented mini-language.',
      details:
        '`loop repeat 2 do ...` expands at macro-expansion time into lower-level control forms. The extended `loop` language supports collection, destructuring, stepping, filtering, and aggregation without requiring explicit recursion.\n\nBecause `loop` is a macro, its syntax is not evaluated like an ordinary function call. Lisp macros receive source forms and produce new forms for the compiler to process.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'condition-handler',
      title: 'Condition handler',
      body: '`handler-case` handles signaled conditions and selects a recovery expression.',
      details:
        '`handler-case` evaluates a protected form and, if a matching condition is signaled, transfers control to the corresponding clause. The caught condition is an object that can be inspected or reported.\n\nCommon Lisp’s broader condition system separates signaling, handling, and recovery. Restartable protocols can offer recovery choices without forcing the low-level signaling code to decide which choice is appropriate.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'red',
      side: 'right',
    },
    {
      id: 'function-call',
      title: 'Function call and prefix notation',
      body: 'Places the operator first, followed by its arguments inside one list.',
      details:
        '`(format t "~A~%" message)` calls `format` with three arguments. The first position of an evaluated list selects a function, macro, or special operator; remaining forms supply arguments according to that operator’s rules.\n\nParentheses are therefore structural syntax rather than optional decoration. Data uses the same list notation, but quoting (`\'(...)`) prevents evaluation and yields the list itself.',
      learnMore: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: ';;; A tiny Lisp file: the parentheses are load-bearing.',
        refs: ['comment'],
      },
      {
        code: '(defun greet (name)\n  (format t "Hello, ~A!~%" name))',
        refs: ['function-definition', 'function-call'],
      },
      { code: '' },
      { code: '(greet "Common Lisp")', refs: ['function-call'] },
    ],
    verbose: [
      {
        code: '(defpackage :anatomy.greeter\n  (:use :cl)\n  (:export :main))',
        refs: ['package-definition'],
      },
      {
        code: '(in-package :anatomy.greeter)',
        refs: ['in-package'],
      },
      { code: '' },
      {
        code: ';;; Dynamic by design; the earmuffs are traditional safety equipment.',
        refs: ['comment'],
      },
      {
        code: '(defparameter *default-name* "Lisp")',
        refs: ['special-variable'],
      },
      {
        code: '(defstruct greeting\n  text\n  (enthusiasm 1))',
        refs: ['structure-definition'],
      },
      { code: '' },
      {
        code: "(defun render-greeting (item)\n  (concatenate 'string\n               (greeting-text item)\n               (make-string (greeting-enthusiasm item) :initial-element #\\!)))",
        refs: ['function-definition', 'function-call'],
      },
      { code: '' },
      {
        code: '(defun greet (&optional (name *default-name*))',
        refs: ['function-definition', 'lambda-list'],
      },
      {
        code: '  (let ((message\n          (render-greeting\n           (make-greeting :text (format nil "Hello, ~A" name)\n                          :enthusiasm 3))))',
        refs: ['lexical-binding', 'function-call', 'structure-definition'],
      },
      {
        code: '    (format t "~A~%" message)))',
        refs: ['function-call'],
      },
      { code: '' },
      {
        code: '(defun main ()',
        refs: ['function-definition'],
      },
      {
        code: '  (handler-case\n      (loop repeat 2\n            do (greet "Common Lisp"))',
        refs: ['condition-handler', 'loop-macro', 'function-call'],
      },
      {
        code: '    (error (condition)\n      (format *error-output* "The REPL requests another parenthesis: ~A~%" condition))))',
        refs: ['condition-handler', 'function-call'],
      },
      { code: '' },
      {
        code: '(main) ; In production this would obviously become an image with a debugger attached.',
        refs: ['function-call', 'comment'],
      },
    ],
  },
}
