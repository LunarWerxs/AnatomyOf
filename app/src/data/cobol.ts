import type { LanguageDef } from '../lib/types'

export const cobol: LanguageDef = {
  id: 'cobol',
  popularity: 23,
  name: 'COBOL',
  titleWord: 'COBOL',
  article: 'a',
  extensions: ['.cbl', '.cob'],
  accentHex: '#1f6f8b',
  officialUrl: 'https://en.wikipedia.org/wiki/COBOL',
  shikiLang: 'cobol',
  note: 'COBOL (Common Business-Oriented Language) is one of the oldest high-level programming languages, designed for business, finance, and administrative systems.',
  annotations: [
    {
      id: 'identification-division',
      title: 'Identification Division',
      body: 'Identifies the program (name, author, etc.).',
      details:
        'Every COBOL source unit opens with the `IDENTIFICATION DIVISION`, the mandatory first of the four divisions (`IDENTIFICATION`, `ENVIRONMENT`, `DATA`, `PROCEDURE`). It exists purely for bookkeeping: it names the program and can optionally record author, install date, and remarks, none of which affect runtime behavior.\n\nHistorically this division carried paragraphs like `AUTHOR.` and `DATE-WRITTEN.` for shop documentation standards. Modern compilers still accept them but treat them as comments in all but name. The only clause with teeth is `PROGRAM-ID`.',
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'program-id',
      title: 'PROGRAM-ID',
      body: 'Declares the program name used to call or link this unit.',
      details:
        'The `PROGRAM-ID.` paragraph gives the compilation unit a name, which becomes the external entry point other programs use to `CALL` it, and often becomes the name of the compiled load module. Traditionally this name was limited to 8 characters to match old operating-system dataset naming rules, a legacy constraint that still shapes naming conventions in mainframe shops today.\n\nBecause COBOL predates the idea of a single "main" function, `PROGRAM-ID` is the closest analogue: whatever name it declares is what a job control language (JCL) step or another COBOL program invokes to start execution here.',
      learnMore: 'https://en.wikipedia.org/wiki/COBOL#Structure',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'environment-division',
      title: 'Environment Division',
      body: 'Specifies the computer environment (source/object computer, file assignments).',
      details:
        "The `ENVIRONMENT DIVISION` is where COBOL admits that hardware exists. Its `CONFIGURATION SECTION` records the `SOURCE-COMPUTER` (where the program is compiled) and `OBJECT-COMPUTER` (where it runs), vestiges of an era when compiling and running happened on genuinely different machines.\n\nA larger `INPUT-OUTPUT SECTION` (not shown here) uses `FILE-CONTROL` to bind logical file names in the program to physical datasets or paths, decoupling the `DATA DIVISION`'s view of a file from wherever the operating system actually stores it.",
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#Environment-Division',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'data-division',
      title: 'Data Division',
      body: 'Defines all data items processed by the program.',
      details:
        "The `DATA DIVISION` is COBOL's answer to variable declarations: every piece of storage the program will touch (files, records, working variables, screen layouts) must be described here before `PROCEDURE DIVISION` can reference it. There is no equivalent to declaring a variable inline at first use.\n\nIts major sections include `FILE SECTION` (record layouts for files opened via `FILE-CONTROL`), `WORKING-STORAGE SECTION` (program variables), and `LINKAGE SECTION` (parameters passed in from a caller). Declaring data this exhaustively up front is part of why COBOL programs read as verbose but are famously explicit about memory layout.",
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#Data-Division',
      color: 'green',
      side: 'left',
    },
    {
      id: 'working-storage',
      title: 'Working-Storage Section',
      body: "Allocates memory for variables and constants that persist for the program's run.",
      details:
        'Items declared in `WORKING-STORAGE SECTION` are allocated once and retain their values across the whole run (or, in a called subprogram, across calls unless it terminates), closer in spirit to static storage than to stack locals. Each item is a fixed-width field whose size is fully determined at compile time by its `PICTURE` clause.\n\nBecause COBOL has no dynamic heap allocation in the C sense, `WORKING-STORAGE` is where nearly all of a traditional program\'s "variables" live, initialized with `VALUE` clauses rather than assignment statements executed at runtime.',
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#Working_002dStorage-Section',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'level-pic',
      title: 'Level Number & PICTURE Clause',
      body: 'Defines hierarchy (01, 05, ...) and data type/format (`PIC X`, `PIC 9`).',
      details:
        "The level number (`01`, `05`, `10`, ...) establishes a data item's place in a hierarchy, letting a group item (like a customer record) contain elementary items (like name and balance) the way a struct contains fields. `01` always marks a top-level record or standalone item. Numbers need not be consecutive; the gaps conventionally leave room to insert fields later without renumbering everything.\n\nThe `PICTURE` clause (abbreviated `PIC`) is COBOL's type system: `X` marks alphanumeric characters, `9` marks a numeric digit, and `V` marks an implied decimal point that consumes no storage. So `PIC 9(5)` is five digits and `PIC X(12)` is twelve characters of text, with `VALUE` optionally supplying an initial literal.",
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#PICTURE-Clause',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'procedure-division',
      title: 'Procedure Division',
      body: 'Contains the executable instructions (paragraphs, statements).',
      details:
        "The `PROCEDURE DIVISION` is where the actual logic lives. Everything before it is declaration. It is organized into paragraphs (optionally grouped into sections), which are executed either by falling through from the previous paragraph or by explicit `PERFORM`, COBOL's primary mechanism for structured control transfer without an unstructured `GOTO`.\n\nA `PROCEDURE DIVISION` can also declare `USING` parameters when the program is meant to be `CALL`ed as a subprogram, mirroring the parameter list a function would take in more modern languages.",
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#Procedure-Division',
      color: 'red',
      side: 'left',
    },
    {
      id: 'paragraph',
      title: 'Paragraph',
      body: 'A named section of code within the Procedure Division.',
      details:
        'A paragraph is simply a user-defined name followed by a period, after which any number of statements run until the next paragraph header or end of division. There is no explicit "end paragraph" marker. Paragraphs are COBOL\'s original unit of reusable logic, invoked with `PERFORM paragraph-name` and returning control automatically when the paragraph finishes.\n\nBefore structured programming conventions took hold, paragraphs were often chained with `GO TO`, producing famously tangled control flow; modern style favors `PERFORM` almost exclusively, and many shops ban `GO TO` outright in their coding standards.',
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#PERFORM-Statement',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'statement',
      title: 'Statement / Sentence',
      body: 'An executable instruction, often starting with a verb (DISPLAY, MOVE, ADD).',
      details:
        "COBOL statements read like stilted English sentences built around verbs: `DISPLAY` writes output, `MOVE` copies a value from one data item to another (COBOL's closest analogue to assignment), and `ADD ... TO ...` performs arithmetic in place. A sentence is one or more statements terminated by a period, though modern style favors scope terminators like `END-IF` over relying on the period's effect.\n\nThis verb-first, prose-like syntax was a deliberate design goal from COBOL's 1959 CODASYL specification: management was meant to be able to read the code even without knowing how to write it.",
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#MOVE-Statement',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'An asterisk (*) in column 7 (or a leading `*>` in free-format) indicates a comment line.',
      details:
        'In classic fixed-format COBOL, source lines are divided into columns with specific meaning: columns 1-6 are a sequence number area (a holdover from punch-card ordering), column 7 is an indicator area, and an asterisk there marks the entire line as a comment. Code proper starts in the "Area A/B" columns beyond that.\n\nFree-format COBOL (COBOL 2002 and later, widely supported by modern compilers like GnuCOBOL) relaxes these column rules and adds an inline `*>` comment marker that can start anywhere on a line, much like `//` in C-family languages.',
      learnMore: 'https://gnucobol.sourceforge.io/doc/gnucobol.html#Reference-Format',
      color: 'slate',
      side: 'left',
    },
  ],
  examples: {
    minimal: [
      {
        code: '      * Small program, big ceremony -- COBOL doesn\'t do "quick scripts".',
        refs: ['comment'],
      },
      {
        code: '       IDENTIFICATION DIVISION.\n       PROGRAM-ID.  Greeter.',
        refs: ['identification-division', 'program-id'],
      },
      { code: '' },
      {
        code: "       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01  WS-GREETING   PIC X(20) VALUE 'Hello, mainframe'.",
        refs: ['data-division', 'working-storage', 'level-pic'],
      },
      { code: '' },
      {
        code: '       PROCEDURE DIVISION.\n       MAIN-PARA.\n           DISPLAY WS-GREETING.\n           STOP RUN.',
        refs: ['procedure-division', 'paragraph', 'statement'],
      },
    ],
    verbose: [
      {
        code: '       IDENTIFICATION DIVISION.                    *> Division header',
        refs: ['identification-division'],
      },
      {
        code: '       PROGRAM-ID.    HelloWorld.                  *> Program name',
        refs: ['program-id'],
      },
      { code: '' },
      {
        code: '       ENVIRONMENT DIVISION.        *> Describes the computer environment',
        refs: ['environment-division'],
      },
      {
        code: '       CONFIGURATION SECTION.',
        refs: ['environment-division'],
      },
      {
        code: '       SOURCE-COMPUTER.  IBM-Z.',
        refs: ['environment-division'],
      },
      { code: '' },
      {
        code: '       DATA DIVISION.                        *> Defines data structures',
        refs: ['data-division'],
      },
      {
        code: '       WORKING-STORAGE SECTION.              *> Memory for variables',
        refs: ['data-division', 'working-storage'],
      },
      {
        code: "       01  WS-GREETING  PIC X(12)  VALUE 'Hello, World'.",
        refs: ['working-storage', 'level-pic'],
      },
      {
        code: '       01  WS-NUMBER    PIC 9(4)   VALUE 1234.',
        refs: ['working-storage', 'level-pic'],
      },
      {
        code: '       01  WS-RESULT    PIC 9(5).',
        refs: ['working-storage', 'level-pic'],
      },
      { code: '' },
      {
        code: '       PROCEDURE DIVISION.               *> Contains the executable code',
        refs: ['procedure-division'],
      },
      {
        code: '       MAIN-PROCEDURE.',
        refs: ['paragraph'],
      },
      {
        code: '           DISPLAY WS-GREETING.              *> Statement with verb',
        refs: ['statement'],
      },
      {
        code: '           MOVE WS-NUMBER TO WS-RESULT.       *> Data manipulation verb',
        refs: ['statement'],
      },
      {
        code: '           ADD 50 TO WS-RESULT.               *> Arithmetic verb',
        refs: ['statement'],
      },
      {
        code: "           DISPLAY 'New result is: ' WS-RESULT.",
        refs: ['statement'],
      },
      {
        code: "           DISPLAY 'Compiles clean, ships in Q3 -- some things never change.'.",
        refs: ['statement'],
      },
      {
        code: '           STOP RUN.                            *> End of program',
        refs: ['statement'],
      },
      { code: '' },
      {
        code: '      * This is a comment line (asterisk in column 7)',
        refs: ['comment'],
      },
      {
        code: '      * Legacy code review policy: if it still runs, it\'s "legacy-certified", not "outdated".',
        refs: ['comment'],
      },
    ],
  },
}
