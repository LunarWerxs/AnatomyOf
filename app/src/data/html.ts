import type { LanguageDef } from '../lib/types'

export const html: LanguageDef = {
  id: 'html',
  popularity: 6.1,
  name: 'HTML',
  titleWord: 'HTML',
  article: 'an',
  extensions: ['.html', '.htm'],
  accentHex: '#e34c26',
  officialUrl: 'https://html.spec.whatwg.org/',
  shikiLang: 'html',
  note: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Ignored by the browser, used for notes (<!-- ... -->).',
      details:
        'An HTML comment starts with `<!--` and ends with `-->`; anything between them is parsed but never rendered or executed. Comments can span multiple lines and are stripped from the accessibility tree and rendered output entirely, though they remain visible to anyone who views the page source.\n\nThey are commonly used to label sections of a long document, leave notes for other developers, or temporarily disable a block of markup while debugging. Unlike server-side templating comments, HTML comments are still sent to the client, so they are not a place to hide sensitive information.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'doctype',
      title: 'Document type declaration',
      body: 'Instructs the browser about the HTML version (<!DOCTYPE html>).',
      details:
        '`<!DOCTYPE html>` must be the very first line of an HTML5 document. It is not an HTML tag but an instruction to the browser to render the page in standards mode rather than quirks mode, which older, doctype-less documents triggered for backward compatibility with pre-CSS layouts.\n\nQuirks mode changes box-model math, table sizing, and other layout behaviors in ways that are hard to predict, so omitting or misplacing the doctype can silently break a modern layout. The HTML5 doctype is deliberately short compared to the versioned, DTD-referencing doctypes required by HTML 4.01 and XHTML.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Glossary/Doctype',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'root-element',
      title: 'Root element',
      body: 'The container for all other HTML elements (<html>).',
      details:
        '`<html>` is the single top-level element that wraps the entire document; every other element, including `<head>` and `<body>`, nests inside it. Its `lang` attribute (e.g. `lang="en"`) declares the document\'s primary language, which screen readers use to choose pronunciation rules and browsers use for features like spell-check and translation prompts.\n\nA document with more than one `<html>` element, or markup outside it, is invalid; browsers will still attempt to recover and render something reasonable, but validators and some tooling will flag it. The closing `</html>` tag marks the end of the parsed document.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'head',
      title: 'Head element',
      body: 'Container for metadata, title, and links to external resources.',
      details:
        '`<head>` holds information about the document rather than content the user sees directly: character encoding, viewport configuration, the page title, linked stylesheets, and `<script>` or `<meta>` tags used by browsers, search engines, and social media crawlers. Almost nothing inside `<head>` renders visibly on the page itself.\n\nBecause the browser reads `<head>` before it can safely start painting `<body>`, large synchronous resources referenced there (like blocking scripts) can delay first render. That is why stylesheets are typically linked in `<head>` but non-critical scripts are often deferred or moved before `</body>`.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'metadata',
      title: 'Metadata elements',
      body: 'Information about the document, not displayed directly (<meta>, <title>, <link>).',
      details:
        '`<meta charset="UTF-8">` declares the character encoding so the browser decodes bytes into text correctly; it should appear within the first 1024 bytes of the file. `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tells mobile browsers to render at the device\'s actual width instead of faking a desktop-sized layout and zooming out, which is essential for responsive design. `<title>` sets the text shown in the browser tab and used as the default bookmark or search-result headline.\n\n`<link rel="stylesheet" href="styles.css">` attaches an external CSS file to the document; `<link>` is also used for favicons (`rel="icon"`) and preconnect/preload hints. All of these elements normally live in `<head>` and, aside from the tab title, produce no visible output on their own.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'body',
      title: 'Body element',
      body: 'Contains all the visible content of the page.',
      details:
        'Everything a visitor actually sees or interacts with (text, images, links, forms, and embedded media) lives inside `<body>`. A document has exactly one `<body>`, and it must come after `<head>` closes.\n\nThe browser begins painting as `<body>` streams in, incrementally laying out and rendering elements as they arrive, which is why placing render-blocking `<script>` tags late in `<body>` (or marking them `defer`) is a common performance practice.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body',
      color: 'green',
      side: 'left',
    },
    {
      id: 'attribute',
      title: 'Attribute',
      body: 'Provides additional information about an element (name="value").',
      details:
        'An attribute is a name/value pair written inside an opening tag, such as `href="styles.css"` on a `<link>` or `<a>` element. Values are conventionally quoted with double quotes, and most attributes are optional with sensible defaults; a few, like `alt` on `<img>`, are effectively required for accessibility even though the parser will not reject their absence.\n\nSome attributes are boolean and need no value at all. Their mere presence turns the behavior on, e.g. `<input disabled>` or `<script defer>`. Global attributes like `class`, `id`, and `data-*` are valid on virtually any element, while others, like `href`, only make sense on specific elements such as `<a>` or `<link>`.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'semantic-elements',
      title: 'Semantic elements',
      body: 'Elements with meaning, defining page structure (<header>, <main>, <footer>, ...).',
      details:
        'Semantic elements describe the role a section of content plays rather than just how it looks: `<header>` for introductory content, `<main>` for the single primary content area of the page, `<footer>` for trailing content like copyright notices, plus siblings like `<nav>`, `<article>`, `<section>`, and `<aside>`. Before HTML5, developers approximated all of these with generic `<div id="header">`-style markup that carried no inherent meaning.\n\nUsing the correct semantic element gives screen readers and other assistive technology landmarks to jump between, and gives search engines stronger signals about page structure, at no cost to how the element looks by default (they render essentially like `<div>` unless styled).',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'nested-elements',
      title: 'Nested elements',
      body: 'Elements placed inside a parent element, forming a tree structure.',
      details:
        'HTML documents form a tree: `<ul>` contains one or more `<li>` children, `<main>` contains `<header>`-adjacent sections, and so on, with each element fully opening and closing before or after its siblings. Proper nesting means closing tags in the reverse order they were opened: overlapping tags like `<b><i>text</b></i>` are invalid, even though browsers often recover from the mistake silently.\n\nSome parent/child relationships are enforced by the HTML spec rather than left to convention: a `<ul>` or `<ol>` may only directly contain `<li>` elements (plus scripting elements), so browsers will silently relocate or drop stray text and other tags placed directly inside a list.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'block-level',
      title: 'Block-level defaults',
      body: 'Elements whose default CSS layout starts a new block, such as `<h1>`, `<p>`, and `<ul>`.',
      details:
        'A block-level element, by default, starts on its own line and stretches to fill the width of its container, stacking vertically with its siblings. Headings (`<h1>`-`<h6>`), paragraphs (`<p>`), lists (`<ul>`, `<ol>`, `<li>`), and container elements like `<div>` and the semantic elements are all block-level by default.\n\nThis is CSS `display` behavior, not a fixed HTML property. `display: inline` or `display: flex` can change how any element lays out regardless of its default. The block/inline distinction is nonetheless a useful mental model for predicting how unstyled markup will flow.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'inline-elements',
      title: 'Inline defaults',
      body: 'Elements whose default CSS layout flows within surrounding text, such as `<a>`, `<span>`, and `<img>`.',
      details:
        "An inline element flows within the surrounding text instead of breaking onto its own line, taking up only as much width as its content needs. `<a>` (links), `<img>` (images), `<span>`, `<strong>`, and `<em>` are all inline by default, which is why a sentence can contain a link in the middle without disrupting the paragraph's line breaks.\n\nInline elements generally ignore top/bottom `margin` and `height` in ways block elements do not, since they are meant to sit inside a line box rather than define one. `<img>` is a notable exception in that it behaves like inline content but still respects width and height for the image's intrinsic dimensions.",
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'void-element',
      title: 'Void element',
      body: 'An element that does not have a closing tag or content (<img>, <meta>, <link>, ...).',
      details:
        'A void element cannot have children and is written without a matching closing tag: `<img>`, `<meta>`, `<link>`, `<br>`, `<hr>`, and `<input>` are the common examples. In HTML5 syntax, a trailing slash like `<img />` is permitted but purely cosmetic. It has no effect and is not required, unlike in XHTML where self-closing syntax was mandatory.\n\nBecause void elements never contain content, all of their data is expressed through attributes: `<img src="image.jpg" alt="A descriptive image">` conveys everything about the image through `src` and `alt` rather than through child nodes.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Glossary/Void_element',
      color: 'pink',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '<!DOCTYPE html>', refs: ['doctype'] },
      { code: '<html lang="en">', refs: ['root-element'] },
      { code: '  <head>', refs: ['head'] },
      {
        code: '    <meta charset="UTF-8">\n    <title>Minimal Page</title>',
        refs: ['metadata', 'void-element'],
      },
      { code: '  </head>', refs: ['head'] },
      { code: '  <body>' },
      {
        code: '    <h1>Hello, world!</h1>',
        refs: ['block-level'],
      },
      {
        code: '    <p>A link to <a href="https://example.com">example.com</a>.</p>',
        refs: ['block-level', 'inline-elements', 'attribute'],
      },
      { code: '  </body>' },
      { code: '</html>' },
    ],
    verbose: [
      {
        code: "<!DOCTYPE html> <!-- Document type declaration: pinky promise this isn't quirks mode -->",
        refs: ['doctype', 'comment'],
      },
      {
        code: '<html lang="en"> <!-- Root element with language attribute -->',
        refs: ['root-element', 'comment', 'attribute'],
      },
      { code: '  <head>', refs: ['head'] },
      {
        code: '    <meta charset="UTF-8"> <!-- Metadata: character encoding -->',
        refs: ['metadata', 'void-element', 'comment'],
      },
      {
        code: '    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Metadata: viewport, so mobile stops pretending it\'s a desktop -->',
        refs: ['metadata', 'void-element', 'comment', 'attribute'],
      },
      {
        code: '    <title>My First HTML Page</title> <!-- Document title: still not a div -->',
        refs: ['metadata', 'comment'],
      },
      {
        code: '    <link rel="stylesheet" href="styles.css"> <!-- Link to external stylesheet -->',
        refs: ['metadata', 'void-element', 'comment', 'attribute'],
      },
      { code: '  </head>', refs: ['head'] },
      { code: '  <body>', refs: ['body'] },
      { code: '    <!-- Main content of the page (not a div, I promise) -->', refs: ['comment'] },
      { code: '    <header>', refs: ['semantic-elements'] },
      {
        code: '      <h1>Welcome to My Website</h1> <!-- Main heading -->',
        refs: ['block-level', 'comment'],
      },
      { code: '    </header>', refs: ['semantic-elements'] },
      { code: '    <main>', refs: ['semantic-elements'] },
      {
        code: '      <p>This is a paragraph of text with a <a href="https://example.com">link</a>.</p>',
        refs: ['block-level', 'inline-elements', 'attribute'],
      },
      {
        code: '      <img src="image.jpg" alt="A descriptive image"> <!-- Image element (void element) -->',
        refs: ['void-element', 'inline-elements', 'attribute', 'comment'],
      },
      { code: '      <ul> <!-- Unordered list -->', refs: ['block-level', 'comment'] },
      {
        code: '        <li>List item one</li>\n        <li>List item two</li>',
        refs: ['block-level', 'nested-elements'],
      },
      { code: '      </ul>', refs: ['block-level'] },
      { code: '    </main>', refs: ['semantic-elements'] },
      { code: '    <footer>', refs: ['semantic-elements'] },
      {
        code: '      <p>&copy; 2026 My Website. View source at your own risk.</p>',
        refs: ['block-level'],
      },
      { code: '    </footer>', refs: ['semantic-elements'] },
      { code: '  </body>', refs: ['body'] },
      { code: '</html>' },
    ],
  },
}
