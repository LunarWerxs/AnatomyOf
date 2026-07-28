import type { LanguageDef } from '../lib/types'

export const perl: LanguageDef = {
  id: 'perl',
  popularity: 22,
  name: 'Perl',
  titleWord: 'Perl',
  article: 'a',
  extensions: ['.pl', '.pm'],
  accentHex: '#39457e',
  officialUrl: 'https://www.perl.org/',
  shikiLang: 'perl',
  note: 'Perl is a highly capable, feature-rich programming language with strong text processing powers, often used for system administration, web development, and network programming.',
  annotations: [
    {
      id: 'shebang',
      title: 'Shebang',
      body: 'Specifies the interpreter path.',
      details:
        'The shebang (`#!`) must be the first line of the file. On Unix-like systems the kernel reads the bytes after `#!` to decide which interpreter runs the script, so `#!/usr/bin/perl` (or the more portable `#!/usr/bin/env perl`) hands the rest of the file to the Perl interpreter when the script is invoked directly, e.g. `./script.pl` after `chmod +x`.\n\nThe shebang line can also carry interpreter flags, such as `-w` to enable warnings, though modern Perl favors the `use warnings` pragma for that. Like other scripting languages, Windows ignores the shebang and instead relies on file associations or an explicit `perl script.pl` invocation.',
      learnMore: 'https://en.wikipedia.org/wiki/Shebang_(Unix)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'pragma',
      title: 'Pragma/Module (use)',
      body: 'Loads pragmas or modules for compile-time hints and features.',
      details:
        '`use` runs at compile time and can load two kinds of things: pragmas, which are special modules like `strict` and `warnings` that change how the compiler behaves, and ordinary modules such as `List::Util` that export subroutines or classes into the current namespace. `use strict` forbids symbolic references and bareword filehandles and, most usefully, requires every variable to be declared with `my`, catching typos that would otherwise silently create new globals.\n\n`use warnings` turns on a large family of diagnostics for questionable constructs (uninitialized values, numeric comparisons on strings, and more) without making them fatal. The two are almost always paired at the top of every Perl file written after 1999, to the point that omitting them is treated as a code smell by every style guide and linter (`perlcritic`) in the ecosystem.',
      learnMore: 'https://perldoc.perl.org/functions/use',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`#`) or a POD block (`=pod` ... `=cut`), ignored by execution.',
      details:
        'A `#` starts a comment that runs to the end of the line, exactly like in shell scripts. For longer documentation, Perl repurposes its own parser for POD ("Plain Old Documentation"): any line beginning with `=` (such as `=pod`, `=head1`, or `=item`) starts a documentation block that continues until a line reading `=cut`, and the Perl compiler skips the whole span as if it were a comment.\n\nBecause POD is parsed by dedicated tools (`perldoc`, `pod2html`, `pod2man`), it is the standard way to document modules for CPAN: the same `.pm` file that ships the code can also ship its own manual page, interleaved with the subroutines it describes.',
      learnMore: 'https://perldoc.perl.org/perlpod',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'scalar',
      title: 'Scalar Variable ($)',
      body: 'Holds a single value (number, string, or reference).',
      details:
        'A scalar, sigiled with `$`, holds exactly one thing: a number, a string, or a reference to another data structure. Perl scalars are dynamically typed and interconvert freely (`"5" + 1` yields `6` because the string is coerced to a number in numeric context) which is exactly the kind of implicit conversion the `strict`/`warnings` pair exists to keep from silently producing garbage.\n\nDeclaring a scalar with `my $greeting = "Hello"` gives it lexical scope, meaning it is visible only within the enclosing block, file, or `eval`. This is the idiomatic way to create variables in modern Perl, replacing the older, scarier `local` and package-global styles.',
      learnMore: 'https://perldoc.perl.org/perldata#Scalar-values',
      color: 'green',
      side: 'left',
    },
    {
      id: 'array',
      title: 'Array Variable (@)',
      body: 'Holds an ordered list of scalars.',
      details:
        'An array, sigiled with `@`, holds an ordered, indexable list of scalars. `my @numbers = (1, 2, 3, 4, 5)` creates one; despite the `@` sigil on the array itself, accessing a single element switches to the scalar sigil (`$numbers[0]`) because you are now asking for one scalar out of the array, not the whole array. This sigil-swap rule trips up nearly every Perl beginner exactly once.\n\nArrays support push, pop, shift, unshift, slicing (`@numbers[1..3]`), and interpolate directly inside double-quoted strings, which is why `"@numbers"` prints `1 2 3 4 5` with spaces automatically inserted between elements.',
      learnMore: 'https://perldoc.perl.org/perldata#Array-values',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'hash',
      title: 'Hash Variable (%)',
      body: 'Holds unordered key-value pairs.',
      details:
        "A hash, sigiled with `%`, stores unordered key-value pairs, declared with the fat comma `=>` for readability: `my %config = ('debug' => 1, 'version' => '1.0.0')`. The fat comma is functionally identical to a plain comma but also auto-quotes a bareword on its left, so `debug => 1` and `'debug' => 1` mean the same thing.\n\nAs with arrays, a single value pulled out of a hash reverts to the scalar sigil: `$config{'debug'}`, using curly braces instead of an array's square brackets. Iterating a hash with `keys` or `each` makes no promise about ordering: if you need a stable order, sort the keys yourself.",
      learnMore: 'https://perldoc.perl.org/perldata#Hash-values',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'subroutine-def',
      title: 'Subroutine Definition (sub)',
      body: 'Defines a reusable block of code.',
      details:
        "`sub say_hello { ... }` defines a named subroutine. Classic Perl subroutines declare no formal parameter list in the signature; instead, every argument passed by the caller arrives packed into the special array `@_`, and the idiom `my ($name) = @_;` unpacks it into named lexicals at the top of the body. Because `@_` is just an array, a sub can happily accept a variable number of arguments.\n\nModern Perl (5.20+) also supports real signatures, `sub say_hello($name) { ... }`: behind the `use feature 'signatures'` pragma, but the `@_`-unpacking style remains the most common idiom in code written for maximum portability across Perl versions.",
      learnMore: 'https://perldoc.perl.org/perlsub',
      color: 'red',
      side: 'left',
    },
    {
      id: 'interpolation',
      title: 'String Interpolation',
      body: 'Embeds variables directly inside double-quoted strings.',
      details:
        'Double-quoted strings in Perl interpolate: `"$greeting, $name!\\n"` substitutes the current values of `$greeting` and `$name` and expands the escape sequence `\\n` into a newline. Single-quoted strings do neither (`\'$greeting\'` prints the four characters `$`, `g`, `r`, `e`, literally) so the choice of quote style is itself a piece of syntax that changes behavior, not just a stylistic preference.\n\nComplex expressions, including array and hash element access, interpolate too: `"Debug mode is enabled (v$config{\'version\'})."` embeds a hash lookup directly in the string. For anything more elaborate than a simple variable, wrapping the expression in `@{[ ... ]}` forces arbitrary code to interpolate, though most style guides reserve that trick for when `sprintf` would be more trouble than it is worth.',
      learnMore: 'https://perldoc.perl.org/perlop#Quote-and-Quote-like-Operators',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'subroutine-call',
      title: 'Subroutine Call',
      body: 'Executes a subroutine.',
      details:
        "Calling a subroutine by its bare name, `say_hello($target);`, passes the argument list into the callee's `@_`. Perl also permits calling with an explicit `&` sigil (`&say_hello($target)`), an older style now mostly seen when a sub deliberately wants to see the caller's own `@_` rather than a fresh copy, a corner of the language most style guides steer new code away from.\n\nBecause subroutines are ordinary package-scoped names, a call must textually follow the `sub` definition unless the sub was pre-declared or the whole file is compiled before execution begins (which, in practice, it is. Perl compiles the entire file before running any of it, so calling a sub defined later in the same file works fine).",
      learnMore: 'https://perldoc.perl.org/perlsub#Subroutines',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'loop',
      title: 'Control Flow (Loop)',
      body: 'Executes code repeatedly (`foreach`, `while`, `for`).',
      details:
        '`foreach my $num (@numbers) { ... }` (often shortened to just `for`) aliases `$num` to each element of the list in turn, so assigning to `$num` inside the loop actually mutates the underlying array, a sharp edge worth knowing about. `while` repeats as long as a condition remains true, and the C-style `for (my $i = 0; $i < 10; $i++)` is also available for index-driven iteration.\n\n`last` exits a loop early, `next` skips to the next iteration, and `redo` restarts the current iteration without re-checking the condition; all three can target an outer loop via a loop label like `OUTER: while (...) { ... last OUTER; }`.',
      learnMore: 'https://perldoc.perl.org/perlsyn#Compound-Statements',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'conditional',
      title: 'Control Flow (Conditional)',
      body: 'Executes code based on a condition (`if`, `elsif`, `else`, `unless`).',
      details:
        "`if`/`elsif`/`else` branch on truthiness; Perl treats `0`, `''`, `'0'`, and `undef` as false, and essentially everything else (including the string `\"0.0\"`) as true, which is a famous gotcha for anyone coming from a language with cleaner falsy rules. `unless` is `if`'s photographic negative, reading naturally for guard clauses like `unless ($debug) { ... }`.\n\nPerl also offers statement modifiers that put the condition after the action, so `print \"even\\n\" if $num % 2 == 0;` says the same thing as a full `if` block in a single terse line. A construct that shows up constantly in idiomatic Perl and famously nowhere else.",
      learnMore: 'https://perldoc.perl.org/perlsyn#Statement-Modifiers',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'access',
      title: 'Hash/Array Access',
      body: "Accessing elements using `$hash{'key'}` or `$array[index]`.",
      details:
        "Reaching into a container for a single element always uses the `$` sigil, because you are retrieving one scalar, regardless of which sigil the container itself uses: `$config{'debug'}` reads a hash entry with curly braces, while `$numbers[0]` reads an array entry with square braces. This is one of the most consistent rules in Perl once it clicks, even though it looks inconsistent at first glance.\n\nThe same bracket-vs-brace distinction extends to references: `$href->{key}` and `$aref->[0]` dereference a hash or array reference to reach a single element, and the arrow can be omitted between consecutive subscripts (`$aref->[0][1]` instead of `$aref->[0]->[1]`) for chained structures.",
      learnMore: 'https://perldoc.perl.org/perlreftut',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '#!/usr/bin/perl', refs: ['shebang'] },
      {
        code: 'use strict;\nuse warnings;  # the closest thing Perl has to a seatbelt',
        refs: ['pragma'],
      },
      { code: '' },
      { code: 'my @lines = ("Line noise", "is a feature,", "not a bug.");', refs: ['array'] },
      { code: '' },
      {
        code: 'foreach my $line (@lines) {\n    print "$line\\n";  # interpolated, not concatenated -- we have some dignity\n}',
        refs: ['loop', 'interpolation'],
      },
      { code: '' },
      {
        code: 'print "TIMTOWTDI: There Is More Than One Way To Do It.\\n" unless $ENV{QUIET};',
        refs: ['conditional'],
      },
    ],
    verbose: [
      { code: '#!/usr/bin/perl', refs: ['shebang'] },
      { code: 'use strict;    # Pragma to enforce strict variable declaration', refs: ['pragma'] },
      { code: 'use warnings;  # Pragma to enable optional warnings', refs: ['pragma'] },
      { code: '' },
      { code: '# This is a single-line comment', refs: ['comment'] },
      { code: '' },
      {
        code: "=pod\n\nThis is a multi-line documentation block (POD)\ndescribing the script's purpose -- and, per Perl tradition,\nquietly daring you to read it.\n\n=cut",
        refs: ['comment'],
      },
      { code: '' },
      { code: '# Scalar variable (starts with $)', refs: ['scalar'] },
      { code: 'my $greeting = "Hello";', refs: ['scalar'] },
      { code: 'my $target = "World";', refs: ['scalar'] },
      { code: '' },
      { code: '# Array variable (starts with @)', refs: ['array'] },
      { code: 'my @numbers = (1, 2, 3, 4, 5);', refs: ['array'] },
      { code: '' },
      { code: '# Hash variable (starts with %)', refs: ['hash'] },
      {
        code: "my %config = (\n    'debug'   => 1,\n    'version' => '1.0.0',\n);",
        refs: ['hash'],
      },
      { code: '' },
      { code: '# Subroutine definition', refs: ['subroutine-def'] },
      {
        code: 'sub say_hello {\n    my ($name) = @_;  # Unpack arguments -- @_ giveth, and @_ taketh away\n    # String interpolation\n    print "$greeting, $name!\\n";\n}',
        refs: ['subroutine-def', 'interpolation'],
      },
      { code: '' },
      { code: '# Main execution block', refs: ['subroutine-call'] },
      { code: 'say_hello($target);  # Subroutine call', refs: ['subroutine-call'] },
      { code: '' },
      { code: '# Control flow (loop)', refs: ['loop'] },
      {
        code: 'foreach my $num (@numbers) {\n    # Control flow (conditional)\n    if ($num % 2 == 0) {\n        print "$num is even.\\n";\n    }\n}',
        refs: ['loop', 'conditional', 'interpolation'],
      },
      { code: '' },
      { code: '# Accessing hash element', refs: ['access'] },
      {
        code: "if ($config{'debug'}) {\n    print \"Debug mode is enabled (v$config{'version'}). Perl: the Swiss Army chainsaw.\\n\";\n}",
        refs: ['access', 'interpolation'],
      },
    ],
  },
}
