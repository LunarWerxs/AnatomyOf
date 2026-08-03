import type { LanguageDef } from '../lib/types'

export const javascript: LanguageDef = {
  id: 'javascript',
  popularity: 6,
  name: 'JavaScript',
  titleWord: 'JavaScript',
  article: 'a',
  extensions: ['.js', '.mjs'],
  accentHex: '#ca8a04',
  officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  shikiLang: 'javascript',
  note: 'JavaScript is a high-level, general-purpose language used across browsers, servers, command-line tools, and embedded runtimes; modern engines commonly combine interpretation with just-in-time compilation.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line `//` or multi-line `/* ... */`, ignored by the engine.',
      details:
        '`//` marks the rest of the current line as a comment; `/* ... */` spans multiple lines and cannot be nested. Comments are stripped before execution and have no runtime cost or effect on behavior.\n\nJSDoc-style block comments (`/** ... */`) immediately above a function or class are picked up by editors and tools like TypeScript for inline type hints and autocomplete, even in plain JavaScript files.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Brings in functionality from other modules.',
      details:
        "`import { calculateTax } from './utils.js'` pulls a named export into the current module's scope. ES module imports are static and hoisted: they are resolved and linked before any code in the file runs, which is what lets bundlers perform tree-shaking.\n\nA default export is imported without braces (`import utils from './utils.js'`), and `import * as ns from './utils.js'` gathers every export onto a namespace object. Node and modern browsers require either a `.mjs` extension, `\"type\": \"module\"` in `package.json`, or a `<script type=\"module\">` tag to treat a file as an ES module rather than CommonJS.",
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration',
      body: 'Declares variables using `const` (constant) or `let` (reassignable).',
      details:
        '`const` and `let` are block-scoped: the variable only exists within the nearest enclosing `{}`, and both sit in a "temporal dead zone" from the top of that block until their declaration line, so referencing them earlier throws a `ReferenceError` instead of silently yielding `undefined`. `const` prevents reassignment of the binding itself, though objects and arrays it points to remain mutable.\n\nThe older `var` keyword is function-scoped (or global) rather than block-scoped, and declarations are hoisted with an initial value of `undefined`, which historically caused bugs inside loops and conditionals. Modern JavaScript style favors `const` by default and `let` only when reassignment is needed, avoiding `var` entirely.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'Reusable block of code, defined with the `function` keyword.',
      details:
        'A `function` declaration is hoisted in full, so it can be called earlier in the file than where it is written. It gets its own `this`, determined by how it is called (as a method, standalone, or via `call`/`apply`/`bind`), and it can be used as a constructor with `new`.\n\nInside a function, `return` immediately produces a value and exits; without one the function implicitly returns `undefined`. Parameters can have default values (`function f(x = 1)`) and rest syntax (`function f(...args)`) to collect any remaining arguments into an array.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function',
      color: 'green',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly, e.g. `for...of`, `while`.',
      details:
        "`for (const item of items)` iterates the values of any iterable (arrays, strings, `Map`s, `Set`s) without exposing an index counter. `for...in` instead enumerates an object's enumerable property keys and is generally avoided for arrays. `while` and `do...while` repeat based on a condition checked before or after each pass, respectively.\n\n`break` exits the nearest loop immediately and `continue` skips to the next iteration. Because `for...of` and `.forEach()`/`.map()` create a fresh binding per iteration when the loop variable is declared with `let` or `const`, closures created inside the loop body correctly capture each iteration's own value.",
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition, e.g. `if`, `else`.',
      details:
        '`if`/`else if`/`else` branch on the truthiness of an expression. `0`, `""`, `null`, `undefined`, `NaN`, and `false` are all falsy, everything else (including `"0"` and empty objects/arrays) is truthy. The ternary operator (`cond ? a : b`) offers a compact expression form for simple branches.\n\n`switch` compares a value against several `case`s using strict equality (`===`) and falls through to subsequent cases unless each ends in `break`. Optional chaining (`?.`) and nullish coalescing (`??`) let common conditional-access patterns be written without an explicit `if`.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else',
      color: 'red',
      side: 'left',
    },
    {
      id: 'object-literal',
      title: 'Object literal',
      body: 'Key-value pairs enclosed in `{}`.',
      details:
        'An object literal like `{ total: 100, items: [] }` creates a plain object with the given keys and values in one expression. Shorthand syntax lets `{ name }` stand in for `{ name: name }`, and computed keys (`{ [key]: value }`) let a variable supply the property name.\n\nSpreading another object into a literal (`{ ...defaults, override: true }`) produces a shallow copy with selected properties overridden, a common pattern for immutable updates. Object literals are also the shape returned by functions that need to hand back multiple named values at once.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'arrow-function',
      title: 'Arrow function',
      body: 'Concise syntax for writing functions using `=>`.',
      details:
        'Arrow functions have no implicit parameters beyond what is listed and, crucially, no own `this`, `arguments`, or `super`: they capture `this` lexically from the enclosing scope, which avoids the classic `var self = this` workaround needed with regular functions inside callbacks. A single expression body (`(x) => x * 2`) implicitly returns that value; a block body (`(x) => { return x * 2 }`) requires an explicit `return`.\n\nBecause they lack their own `this`, arrow functions cannot be used as constructors (`new` throws) and are a poor fit for object methods that rely on the calling object. They shine as short callbacks passed to `.map()`, `.filter()`, event handlers, and Promise chains.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'function-call',
      title: 'Function call',
      body: 'Executing a function by using its name followed by `()`.',
      details:
        "A function call (`calculateTax(total, taxRate)`) evaluates its arguments left to right, binds them to the callee's parameters, and executes the function body, producing its return value (or `undefined` if none). JavaScript is dynamically typed, so no argument count or type checking happens at the call site itself.\n\nMethod calls (`invoice.total.toFixed(2)`) additionally set `this` to the object the method was accessed from. `Function.prototype.call`, `.apply`, and `.bind` let code invoke a function with an explicitly chosen `this` and argument list instead.",
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'export',
      title: 'Export statement',
      body: 'Makes functionality available to other modules.',
      details:
        "`export { createInvoice }` is a named export, re-imported elsewhere with the same name via `import { createInvoice } from '...'`. A module may also declare `export default` once to mark a single primary value imported without braces and under any local name.\n\nNamed exports are preferred when a module exposes several related bindings, since they support better static analysis, auto-import tooling, and tree-shaking than default exports. ES module exports (`export`/`import`) are statically analyzed at link time, unlike CommonJS's `module.exports`, which is a plain runtime object assignment.",
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
      color: 'teal',
      side: 'right',
    },
    // The five below describe the runtime rather than the syntax, so they carry
    // no line ranges and appear only on the Visual tab. Concurrency is the one
    // part of JavaScript you cannot read off the page: the code says what
    // happens, never when.
    {
      id: 'call-stack',
      title: 'Call stack',
      body: 'The one place JavaScript actually runs code, one frame at a time.',
      details:
        'JavaScript has a single call stack, and therefore does exactly one thing at a time. Calling a function pushes a frame; returning pops it. While any frame is on the stack, nothing else in the page can run, which is why a long synchronous loop freezes the UI completely rather than merely slowing it down.\n\nThis is the whole reason the rest of the machinery exists. Since the language cannot pause a function to go do something else, anything slow has to be handed off and picked up later, and "later" always means *after the stack is empty*.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#stack',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'async-api',
      title: 'Async APIs',
      body: 'Timers, network and I/O, which run outside the engine entirely.',
      details:
        '`setTimeout`, `fetch`, and file or socket I/O are not JavaScript. They are functions the host (a browser or Node) provides, implemented in the host\'s own code and often on other threads. Calling one registers the work, returns immediately, and takes the callback for safekeeping.\n\nSo `setTimeout(fn, 0)` does not run `fn` now and does not run it in zero milliseconds. It means "hand `fn` to the host, and let it queue it as soon as it can", which is a lower bound rather than a promise.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'task-queue',
      title: 'Task queue (macrotasks)',
      body: 'Finished host work waiting for its turn on the stack.',
      details:
        'When a timer elapses or a response arrives, the host does not interrupt your code. It puts the callback in the task queue, where it waits. Each turn of the event loop takes **one** task from this queue, runs it to completion, and only then looks again.\n\nThat "one per turn" rule is why a flood of events cannot starve rendering, and why two `setTimeout` callbacks never interleave: each runs start to finish before the next begins.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#queue',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'microtask',
      title: 'Microtask queue (promises)',
      body: 'Promise callbacks, which jump the queue.',
      details:
        '`.then()` callbacks, `await` resumptions, and `queueMicrotask` go into a separate, higher-priority queue. After every task, and after the currently running script finishes, the engine drains the microtask queue **completely** before taking another task.\n\nThis is the mechanism behind the classic ordering puzzle: a promise resolved immediately still runs after all synchronous code, but before a `setTimeout(fn, 0)` registered earlier. It also means a microtask that queues another microtask can loop forever and hang the page, because the drain never reaches the end.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
      color: 'green',
      side: 'right',
    },
    {
      id: 'event-loop',
      title: 'The event loop',
      body: 'The rule that decides what runs next, and when.',
      details:
        'The event loop is not a thread or a queue; it is a rule, applied forever: if the call stack is empty, drain every microtask, then take one task from the task queue and run it. Repeat.\n\nEverything people call "asynchronous JavaScript" falls out of that one sentence. Callbacks never interrupt running code, ordering between promises and timers is fixed rather than racy, and "non-blocking" means the stack empties quickly, not that anything ran in parallel.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
      color: 'red',
      side: 'left',
    },
  ],
  // Syntax is on the other two tabs; this one is about the runtime. The topology
  // shows that only the stack runs JavaScript, and the timeline settles the
  // ordering question every interview asks.
  visual: {
    panels: [
      {
        template: 'topology',
        caption: 'One thread, two queues, and a rule',
        zones: [
          {
            id: 'engine',
            label: 'the JavaScript engine',
            nodes: [
              {
                id: 'stack',
                ref: 'call-stack',
                title: 'Call stack',
                sub: 'one frame at a time',
                rows: [{ label: 'render()' }, { label: 'main()' }],
              },
              {
                id: 'micro',
                ref: 'microtask',
                title: 'Microtask queue',
                sub: 'drained completely, every turn',
              },
            ],
          },
          {
            id: 'host',
            label: 'the host (browser or Node)',
            nodes: [
              {
                id: 'api',
                ref: 'async-api',
                title: 'Timers, fetch, I/O',
                sub: 'not JavaScript, and not on this thread',
              },
              {
                id: 'macro',
                ref: 'task-queue',
                title: 'Task queue',
                sub: 'one taken per turn',
              },
            ],
          },
        ],
        edges: [
          { from: 'stack', to: 'micro', ref: 'microtask', label: '.then(fn)', bow: -62 },
          { from: 'micro', to: 'stack', ref: 'event-loop', label: 'drained first', bow: 62 },
          { from: 'stack', to: 'api', ref: 'async-api', label: 'setTimeout / fetch', bow: -16 },
          { from: 'api', to: 'macro', ref: 'task-queue', label: 'when it completes' },
          {
            from: 'macro',
            to: 'stack',
            ref: 'event-loop',
            label: 'only once the stack is empty',
            bow: 16,
          },
        ],
      },
      {
        template: 'timeline',
        caption: 'Why the output is 1, 2, promise, timeout',
        max: 9,
        unit: '',
        bars: [
          {
            id: 'sync',
            ref: 'call-stack',
            label: 'synchronous code',
            start: 0,
            end: 3,
            note: 'logs 1, then 2',
          },
          {
            id: 'mt',
            ref: 'microtask',
            label: 'microtasks drained',
            start: 3,
            end: 5,
            note: 'logs "promise"',
          },
          {
            id: 'task',
            ref: 'task-queue',
            label: 'first task',
            start: 5,
            end: 8,
            note: 'logs "timeout", registered first',
          },
        ],
        markers: [{ at: 3, ref: 'event-loop', label: 'stack empty' }],
      },
    ],
  },
  examples: {
    minimal: [
      { code: "import { formatPrice } from './format.js'", refs: ['imports'] },
      { code: '' },
      { code: 'const TAX_RATE = 0.08', refs: ['variable'] },
      { code: '' },
      {
        code: 'const applyTax = (price) => price * (1 + TAX_RATE)',
        refs: ['arrow-function'],
      },
      { code: '' },
      {
        code: "function describe(price) {\n  // NaN !== NaN, but rest assured this price is\n  if (price > 100) {\n    return 'Expensive item'\n  }\n  return 'Affordable item'\n}",
        refs: ['function', 'conditional'],
      },
      { code: '' },
      {
        code: 'const total = applyTax(120)\nconsole.log(describe(120), formatPrice(total))',
        refs: ['function-call'],
      },
      { code: '' },
      { code: 'export { applyTax, describe }', refs: ['export'] },
    ],
    verbose: [
      {
        code: '// This is a single-line comment (the other 90% of the iceberg is StackOverflow)',
        refs: ['comment'],
      },
      { code: "import { calculateTax } from './utils.js' // Import statement", refs: ['imports'] },
      { code: '' },
      { code: 'const subtotal = 100 // Variable declaration (constant)', refs: ['variable'] },
      { code: 'let taxRate = 0.08   // Variable declaration (reassignable)', refs: ['variable'] },
      { code: '' },
      {
        code: '/* Multi-line comment\n   describing the function.\n   ([] + []) is an empty string, but we will not\n   be needing that particular party trick here. */',
        refs: ['comment'],
      },
      {
        code: 'function createInvoice(items) {',
        refs: ['function'],
      },
      { code: '  // Function definition', refs: ['function', 'comment'] },
      { code: '  let total = 0', refs: ['function', 'variable'] },
      {
        code: '  for (const item of items) { // Control flow (loop)\n    total += item.price\n  }',
        refs: ['function', 'loop'],
      },
      { code: '', refs: ['function'] },
      {
        code: '  if (total > 500) { // Control flow (conditional)\n    taxRate = 0.05 // Modifying a let variable\n  }',
        refs: ['function', 'conditional'],
      },
      { code: '', refs: ['function'] },
      {
        code: '  const tax = calculateTax(total, taxRate)',
        refs: ['function', 'function-call'],
      },
      { code: '', refs: ['function'] },
      { code: '  // Returning an object literal', refs: ['function', 'comment'] },
      {
        code: '  return {\n    total: total + tax,\n    items: items,\n    date: new Date(), // Creating a new object instance\n  }',
        refs: ['function', 'object-literal'],
      },
      { code: '}', refs: ['function'] },
      { code: '' },
      { code: '// Arrow function syntax (fat arrow, thin ceremony)', refs: ['comment'] },
      {
        code: 'const logInvoice = (invoice) => {\n  console.log(`Invoice total: ${invoice.total.toFixed(2)} (plus 2 for shipping and handling my anxiety)`)\n}',
        refs: ['arrow-function', 'function-call'],
      },
      { code: '' },
      { code: 'const myItems = [{ price: 200 }, { price: 350 }]', refs: ['object-literal'] },
      { code: 'const finalInvoice = createInvoice(myItems)', refs: ['function-call'] },
      { code: 'logInvoice(finalInvoice)', refs: ['function-call'] },
      { code: '' },
      { code: 'export { createInvoice } // Export statement', refs: ['export'] },
    ],
  },
}
