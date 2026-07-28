import type { LanguageDef } from '../lib/types'

export const wasm: LanguageDef = {
  id: 'wasm',
  popularity: 101,
  name: 'WebAssembly',
  titleWord: 'WebAssembly',
  article: 'a',
  extensions: ['.wat', '.wasm'],
  accentHex: '#654ff0',
  officialUrl: 'https://webassembly.org/',
  shikiLang: 'wasm',
  note: 'WebAssembly (Wasm) is a portable binary instruction format for a stack machine; these examples use its equivalent human-readable WebAssembly Text (WAT) representation.',
  annotations: [
    {
      id: 'module',
      title: 'Module definition',
      body: "The top-level container for all of a Wasm binary's components.",
      details:
        'Every Wasm file is a single `module`: the root s-expression in the text format (WAT), or the `\\0asm` magic-number-prefixed binary it compiles to. A module bundles together its types, imports, functions, memories, tables, globals, and exports as ordered sections.\n\nModules are the unit of validation and instantiation: the host (a browser, `wasmtime`, `wasmer`, etc.) parses and validates the whole module before a single instruction runs, which is why Wasm has a reputation for failing fast and loud rather than corrupting memory quietly.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/modules.html',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'type',
      title: 'Type definition',
      body: 'Declares a function signature: its parameter and result types.',
      details:
        'A `type` entry names a function signature so it can be referenced by multiple functions or call sites without repeating it: `(type $add_t (func (param i32 i32) (result i32)))` describes "takes two i32s, returns one i32." Wasm has exactly four core value types: `i32`, `i64`, `f32`, `f64` (plus newer additions like `v128` and reference types).\n\nThis is also the backbone of `call_indirect`, which checks the callee\'s actual signature against the expected `type` at runtime. The closest thing Wasm has to a vtable check, and the reason a mismatched function-pointer call traps instead of jumping into the weeds.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/types.html',
      color: 'green',
      side: 'right',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Text ignored by the assembler: single-line (`;;`) or block (`(; ... ;)`).',
      details:
        'WAT supports line comments starting with `;;` that run to the end of the line, and block comments delimited by `(;` and `;)` that can nest, handy for temporarily commenting out an s-expression that itself contains comments. Comments exist only in the text format; they carry no meaning to the binary format or the validator.\n\nBecause WAT is essentially assembly with parentheses, comments are doing a lot of load-bearing work explaining *why* a sequence of stack operations adds up to something meaningful, since the instructions themselves are famously terse.',
      learnMore: 'https://webassembly.github.io/spec/core/text/lexical.html#comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'import',
      title: 'Import definition',
      body: 'Declares a function, memory, table, or global provided by the host.',
      details:
        '`(import "env" "log" (func $log (param i32)))` asks the host to supply a function named `log` from a module namespace named `env` before instantiation can complete. Imports are how a sandboxed Wasm module talks to the outside world at all. There is no ambient syscall table, no filesystem, no network; if it isn\'t imported, it doesn\'t exist to the module.\n\nThis all-imports-explicit design is Wasm\'s capability-based security model in miniature: a host embeds a module and hands it exactly the functions it chooses to, nothing more.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/modules.html#imports',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: "Defines a function's parameters, result, locals, and instruction body.",
      details:
        '`func` defines a callable unit: parameters and result come from its `type`, and the body is a flat sequence of instructions (plus any `local` declarations for scratch variables). Functions are referenced by index or, in WAT, by a friendlier `$name` identifier that the assembler resolves to an index for you.\n\nUnlike most assembly, a Wasm function body is structured: `block`, `loop`, and `if` provide control flow instead of arbitrary jumps, which is precisely what lets validators check a module in a single linear pass instead of needing full control-flow-graph analysis like a native disassembler does.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/modules.html#functions',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'instruction',
      title: 'Instruction',
      body: 'A single operation executed by the stack machine.',
      details:
        'Instructions like `local.get`, `i32.add`, or `call` are the atoms of a Wasm program. Most are named `type.operation` (`i32.const`, `f64.mul`), which keeps the instruction set small, dense, and mechanically easy to decode, a deliberate tradeoff for fast parsing and JIT compilation over human readability.\n\nInstructions are validated for type-correctness against the operand stack ahead of time, so a Wasm engine never discovers a type error mid-execution the way a dynamically typed language might; it either validates cleanly or is rejected before instantiation.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/instructions.html',
      color: 'red',
      side: 'right',
    },
    {
      id: 'stack',
      title: 'Stack operations',
      body: 'Wasm is a stack machine; instructions implicitly push and pop values.',
      details:
        'There are no general-purpose registers in Wasm: `local.get $lhs` pushes a value onto an implicit operand stack, and `i32.add` pops the top two values, adds them, and pushes the sum back. This stack-machine design (borrowed from JVM bytecode and predecessors like Forth) makes the bytecode compact and the validator simple, at the cost of needing more instructions to shuffle values around than a register machine would.\n\nEngines are free to compile stack code down to registers internally (and every serious one does). The stack model is a portable *interchange* representation, not a mandate about how the CPU actually executes it.',
      learnMore: 'https://en.wikipedia.org/wiki/Stack_machine',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'export',
      title: 'Export definition',
      body: "Makes a module's function, memory, table, or global visible to the host.",
      details:
        '`(export "add" (func $add))` gives the host-visible name `"add"` to an internal function, which is how JavaScript\'s `WebAssembly.instantiate` (or any other embedder) gets a handle to call into the module after instantiation. Memories, tables, and globals can be exported the same way.\n\nExports are the mirror image of imports: together they define a module\'s entire public surface area. A function that is never exported and never called via `start` is effectively dead code from the host\'s perspective, even though the validator will happily accept it.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/modules.html#exports',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'start',
      title: 'Start function',
      body: 'Specifies a function to run automatically upon instantiation.',
      details:
        'The optional `(start $main)` section names a function (taking no parameters and returning nothing) that the host runs immediately after the module finishes instantiating, before any exported function is callable by user code. It\'s the closest thing Wasm has to a "main," useful for one-time setup like initializing globals from imported values.\n\nMost toolchains (Emscripten, wasm-bindgen) skip `start` in favor of an explicit exported `_initialize` or `main` that the host calls deliberately, since an implicit auto-run function is easy to forget about when debugging module load order.',
      learnMore: 'https://webassembly.github.io/spec/core/syntax/modules.html#start-function',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'identifier',
      title: 'Identifier',
      body: 'A symbolic `$name` for a function, type, local, or parameter.',
      details:
        'WAT lets you write `$add` or `$lhs` instead of raw numeric indices, purely a text-format convenience the assembler resolves at compile time. The binary format has no idea `$add` ever existed; it only ever sees index `0`, `1`, `2`, and so on.\n\nThis is why disassembling a `.wasm` straight to WAT without a name section gives you an anonymous, faintly menacing forest of `$func_12`-style placeholders. The human-readable names are metadata the compiler chose to keep (or strip for size), not something the format requires.',
      learnMore: 'https://webassembly.github.io/spec/core/text/values.html#text-id',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: ';; A minimal Wasm module. No garbage collector was harmed making this.',
        refs: ['comment'],
      },
      { code: '(module', refs: ['module'] },
      {
        code: '  (type $double_t (func (param i32) (result i32)))',
        refs: ['type'],
      },
      { code: '' },
      {
        code: '  (func $double (type $double_t) (param $n i32) (result i32)\n    local.get $n        ;; push n\n    i32.const 2         ;; push 2\n    i32.mul             ;; pop, pop, multiply, push -- no registers were consulted\n  )',
        refs: ['function', 'instruction', 'stack'],
      },
      { code: '' },
      { code: '  (export "double" (func $double))', refs: ['export'] },
      { code: ')', refs: ['module'] },
    ],
    verbose: [
      { code: '(module ;; The root container for a Wasm binary', refs: ['module'] },
      { code: '' },
      { code: '  ;; Type section: Defines function signatures', refs: ['comment'] },
      {
        code: '  (type $add_t (func (param i32 i32) (result i32)))',
        refs: ['type'],
      },
      { code: '' },
      { code: '  ;; Import section: Imports functions from the host', refs: ['comment'] },
      {
        code: '  (import "env" "log" (func $log (param i32)))',
        refs: ['import'],
      },
      { code: '' },
      { code: '  ;; Function section: Defines a function body', refs: ['comment'] },
      {
        code: '  (func $add (type $add_t) (param $lhs i32) (param $rhs i32) (result i32)\n    local.get $lhs      ;; Push lhs onto stack\n    local.get $rhs      ;; Push rhs onto stack\n    i32.add             ;; Pop two i32s, add, push result -- "it works on my machine" now means "it works on every machine"\n  )',
        refs: ['function', 'instruction', 'stack'],
      },
      { code: '' },
      { code: '  ;; Export section: Exports functions to the host', refs: ['comment'] },
      { code: '  (export "add" (func $add))', refs: ['export'] },
      { code: '' },
      { code: '  ;; Start function: Executed on module instantiation', refs: ['comment'] },
      { code: '  (start $main)', refs: ['start'] },
      { code: '' },
      { code: '  ;; Another function definition', refs: ['comment'] },
      {
        code: '  (func $main\n    i32.const 42        ;; Push constant 42, the most reasonable of all constants\n    i32.const 10        ;; Push constant 10\n    call $add           ;; Call $add function\n    call $log           ;; Call imported $log function -- console.log, but you brought your own console\n  )',
        refs: ['function', 'instruction', 'identifier'],
      },
      { code: ')', refs: ['module'] },
    ],
  },
}
