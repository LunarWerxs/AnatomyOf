import type { LanguageDef } from '../lib/types'

export const haskell: LanguageDef = {
  id: 'haskell',
  popularity: 46,
  name: 'Haskell',
  titleWord: 'Haskell',
  article: 'a',
  extensions: ['.hs'],
  accentHex: '#5e5086',
  officialUrl: 'https://www.haskell.org/',
  shikiLang: 'haskell',
  note: 'Haskell is a standardized, general-purpose purely functional programming language, with non-strict semantics and strong static typing.',
  annotations: [
    {
      id: 'module-declaration',
      title: 'Module declaration',
      body: 'Defines the module name and optionally exported functions.',
      details:
        "Every Haskell file belongs to a module, declared with `module Name (exports) where` at the top of the file. The parenthesized export list controls what other modules can see; anything left out stays private to the module, which is Haskell's main tool for encapsulation.\n\nOmitting the export list (`module Main where`) exports everything defined in the file. By convention the module name mirrors the file path, so `Data.Map` lives in `Data/Map.hs`. The compiler enforces this for anything beyond a simple `Main` module.",
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch5.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'import',
      title: 'Import statement',
      body: 'Brings in functions and types from other modules.',
      details:
        '`import Data.List (sort)` pulls specific names into scope, while a bare `import Data.List` brings in everything the module exports. `qualified` imports, as in `import qualified Data.Map as Map`, require every use to be prefixed (`Map.lookup`), which avoids name clashes between modules that export similarly-named functions.\n\nHaskell resolves imports at compile time, and the standard library (`base`) plus packages from Hackage are typically managed through Cabal or Stack rather than being bundled with the compiler.',
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch5.html#x11-1000005.3',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`--`) or block (`{- ... -}`), ignored by compiler.',
      details:
        "A line comment starts with `--` and runs to the end of the line. Block comments are delimited with `{-` and `-}`, can span multiple lines, and (unlike C-style block comments) nest properly, so commenting out a chunk of code that already contains a block comment is safe.\n\nHaddock, Haskell's documentation tool, repurposes comment syntax with a leading `|` or `^` (e.g. `-- | Describes this function`) to generate API documentation directly from source comments.",
      learnMore: 'https://en.wikipedia.org/wiki/Comment_(computer_programming)',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'type-alias',
      title: 'Type alias',
      body: 'Creates a new name for an existing type (`type ...`).',
      details:
        '`type Radius = Double` introduces a synonym: `Radius` and `Double` are completely interchangeable to the compiler and to type inference. Aliases exist purely to make signatures more readable and self-documenting, they carry no runtime cost and no extra type safety.\n\nBecause a type alias is not a distinct type, it cannot be used to prevent mixing up a `Radius` and a plain `Double` by accident. When that distinction matters, Haskell offers `newtype`, which wraps a value in a genuinely new type that is erased at compile time but still checked separately.',
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch4.html#x10-790004.2',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'adt',
      title: 'Algebraic data type (ADT)',
      body: 'Defines a composite data type (`data ...`).',
      details:
        '`data Shape = Circle Radius | Rectangle Double Double` declares a type with two constructors: a value of type `Shape` is either a `Circle` holding one `Radius`, or a `Rectangle` holding two `Double`s. The `|` separates alternative constructors, making `Shape` a sum type, while the fields carried by each constructor make it a product type, hence "algebraic."\n\nADTs are the backbone of data modeling in Haskell. Combined with pattern matching, they let the compiler check exhaustiveness: if a function forgets to handle one of `Shape`\'s constructors, GHC can warn about it at compile time, before the program ever runs.',
      learnMore: 'https://en.wikipedia.org/wiki/Algebraic_data_type',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'type-signature',
      title: 'Type signature',
      body: "Specifies the types of a function's arguments and result (`::`).",
      details:
        '`calculateArea :: Shape -> Double` reads as "calculateArea is a function from Shape to Double." Signatures are optional (Hindley-Milner type inference can determine most types on its own) but they are considered essential style: a signature documents intent and turns a whole class of mistakes into compile errors instead of runtime surprises.\n\nBecause Haskell is purely functional, a signature also tells you a lot about what a function can and cannot do. A function typed `Int -> Int` cannot perform IO or throw a checked exception; any side effect has to show up in the type, usually via `IO` somewhere in the signature.',
      learnMore: 'https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system',
      color: 'green',
      side: 'left',
    },
    {
      id: 'function-pattern',
      title: 'Function definition & pattern matching',
      body: 'Defines function behavior based on input patterns.',
      details:
        "Haskell functions are often defined as a series of equations, one per pattern: `calculateArea (Circle r) = ...` matches only when the argument was built with the `Circle` constructor, binding `r` to its field. `calculateArea (Rectangle w h)` matches the other constructor and binds both fields in one step, replacing the manual field access other languages need.\n\nPattern matching works on any data structure, not just custom ADTs: matching directly on lists, tuples, and literal values is common. Clauses are tried top to bottom, and GHC's exhaustiveness checking can flag patterns that were never covered.",
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch3.html#x8-580003.17',
      color: 'red',
      side: 'left',
    },
    {
      id: 'guard',
      title: 'Guard',
      body: 'Boolean condition (`|`) to select a function definition clause.',
      details:
        "A guard attaches a boolean condition to a pattern-matched clause: `| w > 0 && h > 0 = w * h` only fires when both the pattern matches and the condition holds. Guards are tried in order, and the catch-all `otherwise` (simply defined as `True`) is the idiomatic way to write a default case.\n\nGuards read like a cleaned-up if/else-if chain but stay inside the equational style of the rest of the function, and they can appear alongside `where` bindings that are shared across all of a clause's guards.",
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch4.html#x10-830004.4.3',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'list-comprehension',
      title: 'List comprehension',
      body: 'Concise syntax for creating lists (`[ expression | pattern <- list ]`).',
      details:
        '`[calculateArea s | s <- shapes]` reads as "the list of `calculateArea s` for each `s` drawn from `shapes`." The part after `|` can include multiple generators and boolean filters, e.g. `[x * y | x <- xs, y <- ys, x /= y]`, giving a compact notation borrowed directly from set-builder notation in mathematics.\n\nList comprehensions are syntactic sugar over `map`, `filter`, and `concatMap`: the compiler desugars them into ordinary function calls, so there is no performance difference, only a difference in how readable the intent is at the call site.',
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch3.html#x8-260003.11',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'main-function',
      title: 'Main function',
      body: 'The entry point for an executable, with type `IO ()`.',
      details:
        '`main :: IO ()` is the program\'s entry point; the `()` ("unit") return type means main is run for its effects, not its result. Because Haskell is purely functional, all interaction with the outside world (printing, reading input, file access) is threaded through the `IO` type, which marks a computation as impure right in its signature.\n\nThe `do` block is syntactic sugar for chaining `IO` actions (and other monadic values) sequentially. `let` inside a `do` block binds a local name without needing `in`, and each subsequent line runs after the previous action completes.',
      learnMore: 'https://www.haskell.org/onlinereport/haskell2010/haskellch7.html',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: 'module Main (main) where -- Module declaration', refs: ['module-declaration'] },
      { code: '' },
      { code: 'import Data.List (sort) -- Import specific symbols', refs: ['import'] },
      { code: '' },
      { code: 'type Name = String -- Type alias', refs: ['type-alias'] },
      { code: '' },
      { code: 'greeting :: Name -> String -- Type signature', refs: ['type-signature'] },
      {
        code: 'greeting name = "Hello, " ++ name -- Function definition',
        refs: ['function-pattern'],
      },
      { code: '' },
      { code: 'main :: IO ()', refs: ['main-function'] },
      { code: 'main = do', refs: ['main-function'] },
      {
        code: '    let names = ["Bob", "Alice"]\n    mapM_ (putStrLn . greeting) (sort names) -- a monad is just a burrito, don\'t worry about it',
        refs: ['main-function'],
      },
    ],
    verbose: [
      {
        code: 'module Main (main, calculateArea) where -- Module declaration & exports',
        refs: ['module-declaration'],
      },
      { code: '' },
      {
        code: 'import qualified Data.Map as Map -- Qualified import',
        refs: ['import'],
      },
      {
        code: 'import Data.List (sort) -- Import specific symbols',
        refs: ['import'],
      },
      { code: '' },
      { code: '-- This is a single-line comment', refs: ['comment'] },
      {
        code: '{-\n  This is a multi-line comment describing the module.\n  It is, notably, purely descriptive and has no side effects.\n-}',
        refs: ['comment'],
      },
      { code: '' },
      { code: 'type Radius = Double -- Type alias', refs: ['type-alias'] },
      {
        code: 'data Shape = Circle Radius | Rectangle Double Double -- Algebraic data type',
        refs: ['adt'],
      },
      { code: '' },
      { code: '-- Type signature for a function', refs: ['type-signature'] },
      { code: 'calculateArea :: Shape -> Double', refs: ['type-signature'] },
      {
        code: 'calculateArea (Circle r) = pi * r^2 -- Pattern matching',
        refs: ['function-pattern'],
      },
      { code: 'calculateArea (Rectangle w h)', refs: ['function-pattern'] },
      {
        code: '    | w > 0 && h > 0 = w * h -- Guard expression',
        refs: ['function-pattern', 'guard'],
      },
      {
        code: '    | otherwise = 0 -- otherwise is just True wearing a nicer hat',
        refs: ['function-pattern', 'guard'],
      },
      { code: '' },
      { code: 'main :: IO () -- Main entry point', refs: ['main-function'] },
      { code: 'main = do', refs: ['main-function'] },
      {
        code: '    let shapes = [Circle 5.0, Rectangle 4.0 3.0, Rectangle (-1) 2]',
        refs: ['main-function'],
      },
      {
        code: '    let areas = [calculateArea s | s <- shapes] -- List comprehension',
        refs: ['main-function', 'list-comprehension'],
      },
      {
        code: "    print (sort areas) -- Function call & IO action (it compiled, so it's probably correct)",
        refs: ['main-function'],
      },
    ],
  },
}
