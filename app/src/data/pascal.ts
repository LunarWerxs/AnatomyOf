import type { LanguageDef } from '../lib/types'

export const pascal: LanguageDef = {
  id: 'pascal',
  popularity: 11,
  name: 'Object Pascal',
  titleWord: 'Object Pascal',
  article: 'an',
  extensions: ['.pas', '.pp'],
  accentHex: '#2563eb',
  officialUrl: 'https://www.freepascal.org/',
  shikiLang: 'pascal',
  note: 'Object Pascal extends Pascal’s structured foundation with classes, interfaces, exceptions, and other object-oriented features; Delphi and Free Pascal are its best-known modern implementations.',
  annotations: [
    {
      id: 'program-heading',
      title: 'Program heading',
      body: 'Names an executable program with `program Name;`.',
      details:
        'A Pascal executable commonly starts with a `program` heading followed by an identifier and semicolon. The name documents the compilation unit and may be used by tooling, but it is not a function that the runtime calls.\n\nA unit uses `unit Name;` instead and exposes an `interface` plus an `implementation`. Libraries can use `library Name;`. The final punctuation also changes by role: a complete program or unit finishes with `end.`. The period is part of the syntax, not prose.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'compiler-directive',
      title: 'Compiler directive',
      body: 'A `{$...}` directive selects a language mode or changes compilation behavior.',
      details:
        'Compiler directives are instructions consumed during compilation rather than statements executed at runtime. `{$mode objfpc}` enables Free Pascal’s Object Pascal dialect, while `{$H+}` selects long `AnsiString` values for the unqualified `string` type.\n\nDirectives can also enable checks, define conditional symbols, or include files. Their exact set is implementation-specific, so portable code uses them sparingly and keeps dialect assumptions explicit near the top of the file.',
      learnMore: 'https://www.freepascal.org/docs-html/current/prog/prog.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'uses-clause',
      title: 'Uses clause',
      body: 'Imports units so their exported declarations are available.',
      details:
        '`uses SysUtils;` makes the public interface of the `SysUtils` unit visible to this program. A comma-separated list can import multiple units, and the compiler follows those dependencies before compiling or linking the current unit.\n\nUnlike a textual include, a unit has a compiled interface and its own initialization/finalization lifecycle. Name conflicts can be resolved with a qualified name such as `SysUtils.Format`.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'class-definition',
      title: 'Class definition',
      body: 'Declares an object type with fields, constructors, and methods.',
      details:
        '`TGreeter = class ... end;` defines a reference-type class. By convention, Pascal type names begin with `T`; the convention is widespread but not enforced by the compiler.\n\nClass instances live on the heap and variables hold references to them. In Free Pascal and Delphi-style code, creating an instance with a constructor is normally paired with an explicit `Free` call, often protected by `try...finally`.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'visibility',
      title: 'Visibility section',
      body: '`private` and `public` control which class members callers may access.',
      details:
        'Visibility labels divide a class declaration into sections. `private` hides implementation details such as `FName`, while `public` exposes the constructor and `Message` method to callers.\n\nObject Pascal also supports `protected`, `published`, and, depending on mode and placement, stricter unit-aware variants. The labels apply to every following member until another visibility label appears.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'method-declaration',
      title: 'Method declaration',
      body: 'Declares a constructor, procedure, or value-returning function on a class.',
      details:
        'The class body publishes each method’s signature. A `procedure` performs work without returning a value; a `function` declares a result type after its parameter list; and a `constructor` creates and initializes an instance.\n\nThe declaration ends with a semicolon because its executable body appears later. The qualified implementation name, such as `TGreeter.Message`, connects that later body back to this declaration.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'method-implementation',
      title: 'Method implementation',
      body: 'Provides a class method’s executable `begin ... end` body.',
      details:
        '`function TGreeter.Message: string;` qualifies the method with its owning class. Local declarations, if any, would appear between the signature and `begin`; executable statements follow inside the block.\n\nA function returns through the special `Result` variable in modern Object Pascal. Assigning `Result := ...` is clearer and safer than the older syntax that assigns to the function’s own name.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'variable-declaration',
      title: 'Variable declaration',
      body: 'Declares a typed name in a `var` section before executable statements.',
      details:
        '`var Greeter: TGreeter;` declares a variable whose type is known at compile time. Pascal groups declarations before the `begin` that opens the surrounding executable block rather than allowing every dialect to introduce variables freely among statements.\n\nA declaration does not construct a class instance. The reference receives an object only after the constructor call is assigned to it.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'assignment',
      title: 'Assignment (`:=`)',
      body: 'Stores a value with `:=`; plain `=` tests equality or appears in declarations.',
      details:
        'Pascal deliberately separates assignment (`:=`) from equality (`=`). `FName := AName` changes a field, while `FName = AName` is a Boolean expression that compares two values.\n\nThe same assignment operator stores the object reference returned by `TGreeter.Create`. Keeping mutation visually distinct from comparison is one of Pascal’s readability-first design choices.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'main-block',
      title: 'Main program block',
      body: 'The final `begin ... end.` block is the executable entry point.',
      details:
        'After all declarations, the outermost `begin` starts the statements executed when the program launches. Nested blocks end with `end;`, but the outer program closes with `end.` to mark the end of the source unit.\n\nSemicolons separate statements; they are not unconditional line terminators. In particular, placing one immediately before an `else` can accidentally end the preceding `if` statement.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'try-finally',
      title: 'Deterministic cleanup',
      body: '`try...finally` guarantees cleanup whether the protected code succeeds or raises.',
      details:
        'Statements in the `finally` block run when control leaves the `try` block normally or because of an exception. That makes it the conventional home for `Greeter.Free`, file closing, lock release, and similar cleanup.\n\nCalling `Free` is safe when an object reference is `nil`; it invokes the destructor only for a real instance. `try...except` is the sibling construct for handling an exception rather than merely guaranteeing cleanup.',
      learnMore: 'https://www.freepascal.org/docs-html/current/ref/ref.html',
      color: 'red',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: 'program Hello;\n\n// Minimal Pascal: even the final period has a job.',
        refs: ['program-heading'],
      },
      { code: 'begin', refs: ['main-block'] },
      { code: "  WriteLn('Hello, Object Pascal!');" },
      { code: 'end.', refs: ['main-block'] },
    ],
    verbose: [
      { code: 'program GreeterDemo;', refs: ['program-heading'] },
      {
        code: '{$mode objfpc}{$H+} // Tell the compiler which century of Pascal we mean.',
        refs: ['compiler-directive'],
      },
      { code: '' },
      { code: 'uses\n  SysUtils;', refs: ['uses-clause'] },
      { code: '' },
      {
        code: 'type\n  TGreeter = class',
        refs: ['class-definition'],
      },
      { code: '  private\n    FName: string;', refs: ['visibility'] },
      {
        code: '  public\n    constructor Create(const AName: string);\n    function Message: string;\n  end;',
        refs: ['visibility', 'method-declaration', 'class-definition'],
      },
      { code: '' },
      {
        code: 'constructor TGreeter.Create(const AName: string);\nbegin\n  inherited Create;\n  FName := AName;\nend;',
        refs: ['method-implementation', 'assignment'],
      },
      { code: '' },
      {
        code: "function TGreeter.Message: string;\nbegin\n  Result := Format('Hello, %s! The semicolons have unionized.', [FName]);\nend;",
        refs: ['method-implementation', 'assignment'],
      },
      { code: '' },
      { code: 'var\n  Greeter: TGreeter;', refs: ['variable-declaration'] },
      { code: 'begin', refs: ['main-block'] },
      {
        code: "  Greeter := TGreeter.Create('Object Pascal');",
        refs: ['assignment', 'method-declaration'],
      },
      { code: '  try', refs: ['try-finally'] },
      { code: '    WriteLn(Greeter.Message);' },
      {
        code: '  finally\n    Greeter.Free; // Manual cleanup, because garbage collection was deemed too casual.\n  end;',
        refs: ['try-finally'],
      },
      { code: 'end.', refs: ['main-block'] },
    ],
  },
}
