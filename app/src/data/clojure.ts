import type { LanguageDef } from '../lib/types'

export const clojure: LanguageDef = {
  id: 'clojure',
  popularity: 53,
  name: 'Clojure',
  titleWord: 'Clojure',
  article: 'a',
  extensions: ['.clj', '.cljs'],
  accentHex: '#5881d8',
  officialUrl: 'https://clojure.org/',
  shikiLang: 'clojure',
  note: 'Clojure is a dialect of Lisp, hosted on the JVM, emphasizing functional programming and immutable data structures.',
  annotations: [
    {
      id: 'namespace',
      title: 'Namespace (ns)',
      body: 'Defines the module and its dependencies.',
      details:
        'The `ns` macro declares a namespace and, in the same breath, pulls in everything the file needs: `:require` loads other Clojure namespaces (optionally aliased with `:as`), `:import` brings in Java classes, and `:refer` pulls specific symbols into the current namespace so they can be used unqualified. A namespace usually maps one-to-one with a file path (`my-app.core` lives at `my_app/core.clj`, underscored per JVM classloader rules).\n\nBecause the JVM is the host, namespaces are ultimately just Java packages/classes under the hood, but you rarely think about that when writing idiomatic Clojure. Convention keeps `ns` as the very first form in the file, since almost everything below depends on what it requires.',
      learnMore: 'https://clojure.org/reference/namespaces',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'docstring',
      title: 'Docstring',
      body: 'Documentation for a namespace or function.',
      details:
        "A string literal placed right after the name in `ns`, `def`, or `defn` becomes that var's docstring, retrievable at the REPL with `(doc my-fn)` or by inspecting the var's metadata map under the `:doc` key. Multi-line docstrings are just regular Clojure strings, so newlines are written literally between the quotes.\n\nDocstrings are metadata, not comments. They are compiled into the running program and available for tooling like `clojure.repl/doc`, cider, or generated API docs, whereas a `;` comment is stripped before the reader ever sees it.",
      learnMore: 'https://clojure.org/reference/vars#_var_metadata',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Uses `;` for line comments; `(comment ...)` is a read but unevaluated scratch form, not true comment syntax.',
      details:
        'A semicolon `;` starts a line comment that runs to the end of the line; everything after it is invisible to the reader, the part of Clojure that turns text into data before evaluation even begins. Two or three semicolons are a style convention for emphasis, not a different syntax.\n\nThe `(comment ...)` special form is a different beast: it is a real form the reader parses like any other, but it macro-expands to `nil` and never evaluates its body. That makes it a popular "rich comment block" for stashing scratch expressions you want to `eval` individually at the REPL without them running when the file loads.',
      learnMore: 'https://clojure.org/reference/reader#_comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'variable',
      title: 'Def (variable)',
      body: 'Defines a global var (variable).',
      details:
        "`def` creates a top-level var and binds it to a name in the current namespace. Vars in Clojure are mutable containers by design (`def` again to change one, or reach for `alter-var-root`) but idiomatic code treats top-level `def`s as effectively constant values, favoring immutable data and local bindings for anything that actually changes.\n\nBecause Clojure has no static types, a `def`'d value can be any of the built-in persistent data structures (maps, vectors, lists, sets) or a plain scalar; the reader and the data structure literals below do the heavy lifting of describing shape.",
      learnMore: 'https://clojure.org/reference/vars',
      color: 'green',
      side: 'left',
    },
    {
      id: 'map',
      title: 'Map (data structure)',
      body: 'Key-value pairs in `{}`.',
      details:
        'Curly braces `{}` construct a persistent hash map: an immutable, structurally-shared collection of key-value pairs. Commas are optional whitespace in Clojure (`{:a 1, :b 2}` and `{:a 1 :b 2}` read identically) so they are used only where they help human eyes group pairs.\n\nMaps are themselves functions of their keys, so `(:env config)` and `(config :env)` both look up the `:env` entry; combined with keywords as first-class, self-evaluating values, this makes maps Clojure\'s default answer to "I need a record type."',
      learnMore: 'https://clojure.org/reference/data_structures#Maps',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'vector',
      title: 'Vector (data structure)',
      body: 'Ordered collection in `[]`.',
      details:
        'Square brackets `[]` construct a persistent vector: an indexed, ordered collection with near-constant-time access and update via structural sharing, unlike a linked list. Vectors show up constantly outside of "data" too: function argument lists (`[name]`) and `let` binding pairs (`[greeting (str ...)]`) are both vectors.\n\nBecause vectors are ordered and lists are not treated as code by default, Clojure uses the bracket shape itself as a signal: `[1 2 3]` is inert data, while `(1 2 3)` would be read as an attempt to call `1` as a function.',
      learnMore: 'https://clojure.org/reference/data_structures#Vectors',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'keyword',
      title: 'Keyword',
      body: 'Starts with `:`, a self-evaluating identifier.',
      details:
        'A keyword like `:env` or `:wip` starts with a colon and evaluates to itself: no lookup, no quoting needed, unlike a symbol. Keywords are interned, so equality checks between them are a cheap identity comparison, which is part of why they are the idiomatic choice for map keys.\n\nDouble-colon keywords (`::foo`) are namespace-qualified automatically to the current namespace, which helps avoid key collisions when merging maps from different parts of a program, a common pattern in larger Clojure codebases.',
      learnMore: 'https://clojure.org/reference/data_structures#Keywords',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Defn (function)',
      body: 'Defines a named function.',
      details:
        '`defn` is sugar over `(def name (fn [...] ...))`: it names a function, optionally attaches a docstring, and takes a vector of parameters followed by a body. The last expression in the body is the return value. There is no `return` keyword, because everything in Clojure is an expression.\n\n`defn` also supports arity overloading (multiple `[params] body` pairs in one function) and variadic args via `&`, e.g. `[x & rest]`, letting one function name handle several call shapes.',
      learnMore: 'https://clojure.org/reference/special_forms#fn',
      color: 'red',
      side: 'left',
    },
    {
      id: 'let',
      title: 'Let (local binding)',
      body: 'Creates local scope for variables.',
      details:
        '`let` takes a vector of alternating name/value pairs and a body, introducing local bindings that are visible only within that body. Bindings are evaluated left to right, so a later binding in the same vector can refer to an earlier one. `[a 1 b (inc a)]` is perfectly legal.\n\nLike everything else in Clojure, these locals are immutable once bound: there is no reassignment, only shadowing a name in a nested scope or threading a new value through a recursive call with `loop`/`recur`.',
      learnMore: 'https://clojure.org/reference/special_forms#let',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'form',
      title: 'List / form (expression)',
      body: 'Code to be evaluated: a function or macro call in `()`.',
      details:
        'Parentheses `()` construct a list, and a list in "code position" is evaluated as a call: the first element is resolved as a function, macro, or special form, and the rest are its arguments. This uniform "operator first" shape is what people mean by Lisp\'s S-expressions. `(str greeting ", " name "!")` calls `str` with three arguments.\n\nBecause code and data share the same list/vector/map literal syntax, Clojure programs are themselves data structures a program can construct and manipulate before evaluation: the basis for its macro system, though everyday code mostly just enjoys the uniform, deeply-nestable syntax.',
      learnMore: 'https://en.wikipedia.org/wiki/S-expression',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'symbol',
      title: 'Symbol',
      body: 'An identifier that refers to a var or function.',
      details:
        'A symbol like `greet` or `str/capitalize` is an identifier that resolves to a var, a local binding, or a special form, depending on context. Symbols can be namespace-qualified with a slash (`str/capitalize` means "the `capitalize` var in the `str`-aliased namespace"), which is how required namespaces are actually used after `:require ... :as str`.\n\nUnlike a keyword, a symbol does not evaluate to itself, evaluating the symbol `greet` looks up whatever `greet` is bound to. Quoting a symbol with a leading apostrophe (e.g. `\'greet`) suppresses that lookup and yields the symbol itself as data, which is central to how macros manipulate code.',
      learnMore: 'https://clojure.org/reference/reader#_symbols',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: ';; A minimal Clojure script. No loops, no problem -- just recursion all the way down.',
        refs: ['comment'],
      },
      { code: '' },
      { code: '(def greeting "Hello")', refs: ['variable', 'form'] },
      { code: '' },
      {
        code: '(defn greet\n  "Greets whoever wandered into the REPL."\n  [name]',
        refs: ['function', 'docstring', 'vector'],
      },
      {
        code: '  (let [message (str greeting ", " name "!")]',
        refs: ['let', 'form'],
      },
      { code: '    (println message)  ; side effect, the REPL forgives you', refs: ['comment'] },
      { code: '    message))', refs: ['symbol'] },
    ],
    verbose: [
      {
        code: '(ns my-app.core ; Namespace declaration',
        refs: ['namespace'],
      },
      {
        code: '  "This is a namespace docstring.\nIt describes the purpose of this module."',
        refs: ['docstring'],
      },
      {
        code: '  (:require [clojure.string :as str] ; Import another namespace\n            [my-app.utils :refer [helper-fn]]))',
        refs: ['namespace', 'symbol'],
      },
      { code: '' },
      { code: ';; This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: '(def global-config ; Define a global variable',
        refs: ['variable'],
      },
      {
        code: '  {:env "dev"',
        refs: ['map'],
      },
      {
        code: '   :version "1.0.1"',
        refs: ['keyword'],
      },
      {
        code: '   :tags [:wip :experimental]}) ; Map with keywords and vector',
        refs: ['vector', 'keyword', 'map'],
      },
      { code: '' },
      {
        code: '(defn greet',
        refs: ['function'],
      },
      {
        code: '  "A function that greets a user.\nTakes a name string as input."',
        refs: ['docstring'],
      },
      {
        code: '  [name] ; Function arguments (vector)',
        refs: ['vector'],
      },
      {
        code: '  (let [greeting (str/capitalize "hello") ; Local binding (let)',
        refs: ['let', 'form'],
      },
      {
        code: '        message (str greeting ", " name "!")] ; Function call (str)',
        refs: ['let', 'form'],
      },
      {
        code: '    (println message) ; Side effect (printing)',
        refs: ['form'],
      },
      {
        code: '    message)) ; Return value (last expression)',
        refs: ['symbol'],
      },
      { code: '' },
      {
        code: '(comment ; Rich scratch form: read normally, body not evaluated, result is nil\n  (greet "World") ; => "Hello, World! -- works on every machine, including production"\n  (helper-fn 42))',
        refs: ['comment'],
      },
    ],
  },
}
