import type { LanguageDef } from '../lib/types'

export const ocaml: LanguageDef = {
  id: 'ocaml',
  popularity: 36,
  name: 'OCaml',
  titleWord: 'OCaml',
  article: 'an',
  extensions: ['.ml', '.mli'],
  accentHex: '#ec6813',
  officialUrl: 'https://ocaml.org/',
  shikiLang: 'ocaml',
  note: 'OCaml is a general-purpose, industrial-strength functional programming language with a strong static type system and type inference.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Block `(* ... *)` or doc comment `(** ... *)`, ignored by the compiler.',
      details:
        'OCaml has only one comment syntax, `(* ... *)`, and it nests: a `(* commented-out (* nested *) block *)` closes correctly, unlike C-style `/* */`. There is no dedicated single-line comment token; a `(* ... *)` that happens to end before the newline reads the same as a line comment in practice.\n\nA comment opening with a second star, `(** ... *)`, is a documentation comment consumed by `ocamldoc` or `odoc` to generate API references. Comments are stripped entirely before compilation and carry zero runtime cost.',
      learnMore: 'https://v2.ocaml.org/manual/lex.html#sss:comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'open',
      title: 'Open statement',
      body: 'Makes the contents of another module available without a prefix.',
      details:
        "`open Printf` brings every value the `Printf` module exports into unqualified scope, so `printf` can be written instead of `Printf.printf`. Without the `open`, every reference to a module's contents needs the qualified form.\n\nBecause `open` can shadow existing names silently, style guides often prefer a local `let open Printf in ...` or the `Module.(expr)` syntax to scope the effect narrowly, reserving a top-level `open` for modules like `Printf` or `Stdlib` submodules that are used pervasively.",
      learnMore: 'https://v2.ocaml.org/manual/moduleexamples.html#sec78',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'type-definition',
      title: 'Type definition',
      body: 'Defines a new data type (record, variant, alias) with `type`.',
      details:
        "`type point = { x: float; y: float }` declares a record type: a fixed set of named, typed fields. OCaml also uses `type` for variants (`type shape = Circle of float | Rect of float * float`), tuples, and simple aliases, one keyword covers most of the type-level vocabulary.\n\nOCaml's type inference means annotations like `: float` are frequently optional elsewhere in the program, but a type definition itself must spell out its shape once so the compiler can check every later usage against it.",
      learnMore: 'https://v2.ocaml.org/manual/typedecl.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field (record member)',
      body: 'A named, typed component of a record type.',
      details:
        'Each field in a record declaration, like `x: float`, pairs a name with a type; fields are separated by semicolons inside the braces. Field names must be unique across a compilation unit unless disambiguated, since OCaml resolves a bare field name like `x` using the most recently defined record that declares it.\n\nFields are accessed with dot syntax (`p.x`) and are immutable by default. Writing to one requires declaring it `mutable` in the type definition and using the `<-` operator to update it.',
      learnMore: 'https://v2.ocaml.org/manual/typedecl.html#sec235',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'function-definition',
      title: 'Function definition (let)',
      body: '`let` defines a function or value; `rec` allows it to call itself.',
      details:
        '`let` binds a name to a value, and a function is just a value whose type happens to be an arrow (`int -> int`). Ordinary `let` bindings cannot refer to themselves. `let rec` is required whenever the definition needs to recurse, as in `let rec factorial n = ...`.\n\nBecause functions are ordinary values, they can be passed as arguments, returned from other functions, and partially applied by supplying fewer arguments than the function expects, which yields a new function waiting for the rest.',
      learnMore: 'https://en.wikipedia.org/wiki/Let_expression',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'pattern-matching',
      title: 'Pattern matching',
      body: 'Deconstructs a value against a series of patterns with `match ... with`.',
      details:
        '`match n with | 0 -> 1 | _ -> ...` compares `n` against each `|`-prefixed pattern in order and evaluates the branch of the first match; the underscore `_` is a wildcard that matches anything, conventionally used as the final catch-all. Patterns can destructure tuples, records, and variant constructors in one step, binding sub-values directly.\n\nThe compiler performs exhaustiveness checking: if a `match` fails to cover every possible constructor of a variant type, it emits a warning at compile time, turning a whole category of runtime crashes into a build-time signal instead.',
      learnMore: 'https://v2.ocaml.org/manual/patterns.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'local-binding',
      title: 'Local binding (let ... in)',
      body: 'Creates a name scoped to the expression that follows `in`.',
      details:
        "`let p = { x = 3.0; y = 4.0 } in ...` binds `p` only for the expression after `in`: once that expression finishes evaluating, the binding is gone. This is different from a top-level `let`, which extends to the rest of the file or module.\n\nBecause everything in OCaml is an expression, `let ... in` chains naturally: each binding's scope is exactly the rest of the enclosing expression, which is why deeply nested logic often reads as a sequence of small named steps rather than a block of statements.",
      learnMore: 'https://v2.ocaml.org/manual/expr.html#sec167',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'record-instantiation',
      title: 'Record instantiation',
      body: 'Creates a new value of a record type by supplying every field.',
      details:
        '`{ x = 3.0; y = 4.0 }` builds a new `point` value; the compiler infers which record type is meant from the field names in scope (or from an expected type at the call site). Every field must be given a value. There is no notion of a partially-initialized record.\n\nRecords are immutable values unless individual fields were declared `mutable`, and the `{ old_record with field = new_value }` syntax produces a fresh copy with just one field changed, leaving the original untouched.',
      learnMore: 'https://v2.ocaml.org/manual/expr.html#sec166',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Applies a function to its arguments, written with juxtaposition.',
      details:
        'Function application needs no parentheses or commas between arguments: `printf "%.1f" p.x` simply lists the function then each argument separated by whitespace, and `factorial 5` applies `factorial` to `5`. Parentheses are only needed to group a sub-expression, such as `(factorial 5)` when it appears as an argument to another call.\n\n`printf` is type-checked against its format string at compile time: a `%d` demands an `int` and a `%.1f` demands a `float`, so passing the wrong type is a compile error, not a runtime format-string bug.',
      learnMore: 'https://v2.ocaml.org/manual/expr.html#sec163',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'anonymous-function',
      title: 'Anonymous function (fun)',
      body: 'A function without a name, written `fun x -> ...`.',
      details:
        '`fun x -> x * x` is an unnamed function value, commonly passed directly to higher-order functions like `List.map`. It is interchangeable with a named `let` binding, `let square x = x * x` desugars to essentially the same underlying function value.\n\n`fun` supports pattern matching directly on its argument (`fun (a, b) -> a + b`) and multiple arguments via currying (`fun x y -> x + y`), and the `function` keyword is a shorthand for `fun x -> match x with ...` when the whole body is a single match.',
      learnMore: 'https://v2.ocaml.org/manual/expr.html#sec161',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'main-block',
      title: 'Main execution block',
      body: '`let () = ...` runs top-level side effects, matched against unit.',
      details:
        "OCaml has no dedicated `main` function. A compiled program simply executes every top-level `let` binding in order as the module loads. Writing `let () = ...` is a convention: the pattern `()` (of type `unit`) forces the expression to also have type `unit`, so the compiler warns if a meaningful result is silently discarded.\n\nMultiple such blocks can appear throughout a file, each running as it is reached, which is why library modules can define values and functions freely while an executable's entry point is just the last expression of consequence.",
      learnMore: 'https://v2.ocaml.org/manual/modules.html#sec105',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '(* A minimal OCaml file -- no semicolons were harmed, well, maybe a few *)\nopen Printf',
        refs: ['open'],
      },
      { code: '' },
      { code: 'type greeting = { text: string; volume: int }', refs: ['type-definition'] },
      { code: '' },
      {
        code: "let shout g = String.uppercase_ascii g.text ^ String.make g.volume '!'",
        refs: ['function-definition'],
      },
      { code: '' },
      {
        code: 'let () =\n  let g = { text = "hello"; volume = 3 } in',
        refs: ['main-block'],
      },
      {
        code: '  printf "%s\\n" (shout g) (* the type checker slept fine, so it must be correct *)',
        refs: ['function-call'],
      },
    ],
    verbose: [
      {
        code: "(* This is a multi-line comment\n   describing the module's purpose. It compiles, therefore it is. *)",
        refs: ['comment'],
      },
      { code: 'open Printf (* Open a module to bring its contents into scope *)', refs: ['open'] },
      { code: '' },
      { code: '(* Type definition (record) *)', refs: ['comment'] },
      { code: 'type point = { x: float; y: float }', refs: ['type-definition', 'field'] },
      { code: '' },
      {
        code: '(* Recursive function definition with pattern matching --\n   yes, "rec" is required, no, OCaml will not guess that you meant to loop *)',
        refs: ['comment'],
      },
      { code: 'let rec factorial n =', refs: ['function-definition'] },
      {
        code: '  match n with\n  | 0 -> 1\n  | _ -> n * factorial (n - 1)',
        refs: ['pattern-matching'],
      },
      { code: '' },
      {
        code: '(* Main execution block (often just a sequence of top-level definitions) *)',
        refs: ['comment'],
      },
      { code: 'let () =', refs: ['main-block'] },
      {
        code: '  let p = { x = 3.0; y = 4.0 } in (* Local variable and record instantiation *)',
        refs: ['local-binding', 'record-instantiation'],
      },
      {
        code: '  printf "Point: (%.1f, %.1f)\\n" p.x p.y; (* Function call and string formatting *)',
        refs: ['function-call'],
      },
      { code: '' },
      {
        code: '  (* Anonymous function and list operation -- List.map: because a for loop felt too imperative *)',
        refs: ['comment'],
      },
      {
        code: '  let squares = List.map (fun x -> x * x) [1; 2; 3; 4] in',
        refs: ['local-binding', 'anonymous-function', 'function-call'],
      },
      { code: '  List.iter (printf "%d ") squares;', refs: ['function-call'] },
      { code: '  print_newline ();', refs: ['function-call'] },
      { code: '' },
      {
        code: '  printf "Factorial of 5: %d\\n" (factorial 5)',
        refs: ['function-call'],
      },
    ],
  },
}
