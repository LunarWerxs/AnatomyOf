import type { LanguageDef } from '../lib/types'

export const matlab: LanguageDef = {
  id: 'matlab',
  popularity: 18,
  name: 'MATLAB',
  titleWord: 'MATLAB',
  article: 'a',
  extensions: ['.m'],
  accentHex: '#e16737',
  officialUrl: 'https://www.mathworks.com/products/matlab.html',
  shikiLang: 'matlab',
  note: 'MATLAB is a high-performance language for technical computing, integrating computation, visualization, and programming in an easy-to-use environment.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (%) or block (%{ ... %}), ignored by the interpreter.',
      details:
        "A `%` marks the rest of a line as a comment. For longer explanations, a block comment opens with `%{` and closes with `%}`, each delimiter alone on its own line, and everything between is ignored regardless of length.\n\nA comment placed immediately after `function` on the next line or two doubles as the entry for MATLAB's `help` command: typing `help analyzeData` at the prompt prints that leading comment block, so many files treat it as informal documentation rather than just an aside.",
      learnMore: 'https://www.mathworks.com/help/matlab/matlab_prog/add-help-for-your-program.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'function-def',
      title: 'Function Definition (Main)',
      body: 'Declares the primary function; the file name must match.',
      details:
        'A script file that begins with `function` is a function file, and MATLAB requires the file name (`analyzeData.m`) to match the function name exactly, call the file anything else and MATLAB either refuses to find it or silently runs the wrong thing. This is different from most languages, where the file name is cosmetic.\n\nOlder MATLAB versions required exactly one function per file (with `local functions` as the exception covered below); modern MATLAB relaxed this so scripts can define multiple functions too, but the one-file-one-name rule for the primary function still holds.',
      learnMore: 'https://www.mathworks.com/help/matlab/ref/function.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'io-args',
      title: 'Input/Output Arguments',
      body: 'Variables passed into and returned by the function.',
      details:
        'Inputs are listed in parentheses after the function name; outputs are listed in brackets before the `=`. A function can define more outputs than a caller actually asks for. MATLAB tracks how many were requested via `nargout`, and unrequested outputs are simply never computed if the code checks for that.\n\nUnlike languages with a single return value, `[output1, output2] = analyzeData(input1, input2)` is ordinary syntax, not tuple-unpacking bolted on afterward. Multiple return values have been part of MATLAB since its earliest versions, reflecting its numerical-computing roots where a function commonly needs to hand back both a result and its error estimate.',
      learnMore: 'https://www.mathworks.com/help/matlab/ref/nargout.html',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'section-break',
      title: 'Section Break (%%)',
      body: 'Divides code into executable sections for publishing/running.',
      details:
        'A comment line starting with `%%` marks a "code section" boundary. The Live Editor and desktop MATLAB editor recognize these and let you run just the section the cursor sits in (Ctrl+Enter) rather than the whole file, which is invaluable for iterating on a long analysis without re-running expensive earlier steps.\n\nSections also structure `publish()` output: each `%%`-delimited chunk becomes its own block in the generated HTML/PDF report, with the comment text on the same line rendered as that block\'s heading.',
      learnMore: 'https://www.mathworks.com/help/matlab/matlab_prog/create-and-run-sections.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'variable-matrix',
      title: 'Variable Assignment & Matrix',
      body: 'Defines variables and matrices using [].',
      details:
        "MATLAB (MATrix LABoratory) treats every value as a matrix; a scalar is just a 1-by-1 matrix. Square brackets build one literally: commas or spaces separate elements within a row, semicolons start a new row, so `[1, 2, 3; 4, 5, 6; 7, 8, 9]` is a 3-by-3 matrix.\n\nA trailing semicolon on the statement suppresses echoing the result to the command window; leaving it off is a common debugging trick since MATLAB will print the variable's name and value immediately, no `disp` required.",
      learnMore: 'https://www.mathworks.com/help/matlab/learn_matlab/matrices-and-arrays.html',
      color: 'green',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control Flow (Conditional)',
      body: 'Executes code based on conditions (if, elseif, else).',
      details:
        '`if`/`elseif`/`else` blocks are closed with a matching `end`, not indentation or braces. Indentation in MATLAB is purely cosmetic (the editor auto-indents it, but the parser does not care). Conditions are typically scalar logical expressions; if you hand `if` a non-scalar array it is only true when *every* element is nonzero, which surprises newcomers coming from element-wise languages.\n\n`disp(...)` prints a value without echoing the variable name, making it the go-to for user-facing status messages inside conditionals, as opposed to leaving a bare unsuppressed expression to auto-print.',
      learnMore: 'https://www.mathworks.com/help/matlab/ref/if.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control Flow (Loop)',
      body: 'Executes code repeatedly (for, while).',
      details:
        '`for i = 1:length(processedData)` iterates `i` over each value of the range `1:length(...)`, and (like every block in MATLAB) the loop is terminated with `end` rather than a closing brace. Ranges use `start:stop` (step 1 implied) or `start:step:stop`, and are themselves ordinary row-vector values you can inspect or reuse.\n\nBecause MATLAB is built around whole-array operations, an explicit `for` looping over individual elements is often a sign the same work could be "vectorized" into a single matrix expression instead. Vectorized code is idiomatic and usually faster, so seasoned MATLAB developers reach for loops mainly when the per-element logic cannot be expressed as one.',
      learnMore: 'https://www.mathworks.com/help/matlab/ref/for.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'matrix-op',
      title: 'Matrix Operation',
      body: 'Efficient mathematical operations on whole matrices.',
      details:
        'Bare arithmetic operators default to linear-algebra semantics: `*` is matrix multiplication and `/` is matrix right-division, not element-by-element. Prefixing with a dot (`.*`, `./`, `.^`) switches to element-wise operation, and mixing the two up is one of the most common bugs for anyone new to the language.\n\n`dataMatrix * scaleFactor + input2` multiplies every element of the matrix by the scalar `scaleFactor` (scalar-times-matrix is always element-wise regardless of the operator) and adds `input2`, which MATLAB broadcasts across the matrix if the shapes are compatible.',
      learnMore:
        'https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'plotting',
      title: 'Plotting Command',
      body: 'Built-in functions for creating visualizations.',
      details:
        "`figure` opens a new figure window, `plot(processedData)` draws the data on it, and `title(...)` labels it: no import or plotting library setup required, since visualization is a first-class, built-in part of the language. Calling `plot` again without a new `figure` normally overwrites the current axes unless `hold on` is used first.\n\nThis batteries-included graphics stack is one of MATLAB's signature conveniences for technical computing: a scientist can go from a raw matrix to a labeled, publication-ready chart in three lines, which is exactly what this snippet does.",
      learnMore: 'https://www.mathworks.com/help/matlab/ref/plot.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'local-function',
      title: 'Local Function Definition',
      body: 'Helper function visible only within this file.',
      details:
        'A function file may define additional `function` blocks after the primary one; these "local functions" are callable from anywhere else in the same file but are invisible to any other file, giving you private helpers without a separate namespace mechanism. They still each end with their own `end`.\n\n`calculateMean` here is a small local function like this: it takes a vector, sums it, divides by its length, and returns the mean: utility logic factored out of the main function purely for readability, with no risk of colliding with a same-named function elsewhere in a larger project.',
      learnMore: 'https://www.mathworks.com/help/matlab/matlab_prog/local-functions.html',
      color: 'purple',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      {
        code: '%{\nQuick demo: MATLAB, proving since 1984 that real programmers\ndo use semicolons -- just to hide the output, not end the line.\n%}',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: 'function result = clamp(values, lo, hi)',
        refs: ['function-def', 'io-args'],
      },
      {
        code: "    % Vectorized clamp -- no loop in sight, and that's the point\n    result = values;",
        refs: ['comment', 'variable-matrix'],
      },
      { code: '' },
      {
        code: "    if any(result > hi)\n        disp('Clipping values above the ceiling.');\n        result(result > hi) = hi;\n    end",
        refs: ['conditional'],
      },
      { code: '' },
      {
        code: '    for i = 1:length(result)\n        if result(i) < lo\n            result(i) = lo;\n        end\n    end',
        refs: ['loop'],
      },
      { code: 'end' },
    ],
    verbose: [
      { code: '% This is a single-line comment', refs: ['comment'] },
      {
        code: "%{\nThis is a multi-line block comment\ndescribing the function's purpose.\n%}",
        refs: ['comment'],
      },
      { code: '' },
      {
        code: 'function [output1, output2] = analyzeData(input1, input2)',
        refs: ['function-def', 'io-args'],
      },
      {
        code: "    % Main function definition, filename must match 'analyzeData.m'",
        refs: ['comment'],
      },
      { code: '' },
      {
        code: '    %% Section Break: Data Initialization\n    % Variable assignment & matrix definition\n    dataMatrix = [1, 2, 3; 4, 5, 6; 7, 8, 9];\n    threshold = 5;',
        refs: ['section-break', 'comment', 'variable-matrix'],
      },
      { code: '' },
      {
        code: "    % Control flow (conditional)\n    if input1 > threshold\n        disp('Input 1 is above threshold.');\n        scaleFactor = 1.5;\n    elseif input1 == threshold\n        disp('Input 1 is equal to threshold. Truly a MATLAB miracle of exactness.');\n        scaleFactor = 1.0;\n    else\n        disp('Input 1 is below threshold.');\n        scaleFactor = 0.5;\n    end",
        refs: ['comment', 'conditional'],
      },
      { code: '' },
      {
        code: '    %% Section Break: Processing & Visualization\n    % Process data using matrix operations (vectorized, as the ancestors intended)\n    processedData = dataMatrix * scaleFactor + input2;',
        refs: ['section-break', 'comment', 'matrix-op'],
      },
      { code: '' },
      {
        code: '    % Control flow (loop)\n    for i = 1:length(processedData)\n        processedData(i) = sqrt(processedData(i));\n    end',
        refs: ['comment', 'loop'],
      },
      { code: '' },
      {
        code: '    % Call a local function\n    output1 = calculateMean(processedData);',
        refs: ['comment', 'local-function'],
      },
      { code: '' },
      {
        code: "    % Plotting command\n    figure;\n    plot(processedData);\n    title('Processed Data Plot (or: how I learned to stop worrying and love the colon operator)');",
        refs: ['comment', 'plotting'],
      },
      { code: '' },
      {
        code: '    output2 = processedData; % Assign second output',
        refs: ['io-args', 'comment'],
      },
      { code: 'end' },
      { code: '' },
      {
        code: '% Local function definition (only visible within this file)\nfunction m = calculateMean(v)\n    m = sum(v) / length(v); % Reinventing mean() since every intro course ever\nend',
        refs: ['comment', 'local-function'],
      },
    ],
  },
}
