import type { LanguageDef } from '../lib/types'

export const css: LanguageDef = {
  id: 'css',
  popularity: 6.2,
  name: 'CSS',
  titleWord: 'CSS',
  article: 'a',
  extensions: ['.css'],
  accentHex: '#2965f1',
  officialUrl: 'https://www.w3.org/Style/CSS/',
  shikiLang: 'css',
  note: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Written as /* ... */; ignored by the browser.',
      details:
        'CSS has only one comment syntax, `/* ... */`, and it can span multiple lines since there is no single-line `//` form. Comments are stripped before the browser builds the CSSOM, so they carry zero runtime cost.\n\nThey are commonly used to label sections of a large stylesheet, leave TODOs, or temporarily disable a declaration during debugging. Nesting comments is not allowed: the first `*/` closes the comment.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'at-rule-import',
      title: 'At-rule (@import)',
      body: 'Instructs the browser to load an external resource.',
      details:
        "`@import` pulls in rules from another stylesheet, optionally gated by a media query, e.g. `@import url('print.css') print;`. Any `@import` statements must appear before all other rules (only `@charset` can precede them), or the browser ignores them.\n\nEach imported file blocks parsing until it is fetched, which can hurt page load performance, especially when imports chain. For that reason a `<link>` tag in the HTML `<head>` is usually preferred. It lets the browser discover and fetch stylesheets in parallel instead of serially.",
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@import',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'selector',
      title: 'Selector',
      body: 'Targets HTML elements to apply styles to, e.g. :root, body, .class, #id.',
      details:
        'A selector is the part of a rule before the `{`, describing which elements the declaration block applies to. Simple selectors (`body`, `.class`, `#id`) can be combined into compound and complex selectors using combinators like descendant (space), child (`>`), and sibling (`~`, `+`).\n\nWhen multiple rules target the same element, specificity decides which wins: id selectors beat class/attribute/pseudo-class selectors, which beat type selectors and pseudo-elements. Equal specificity falls back to source order, with the later rule winning.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'declaration-block',
      title: 'Declaration block',
      body: 'Enclosed in {}, contains one or more declarations.',
      details:
        'The declaration block is everything between `{` and `}` following a selector: a set of `property: value;` pairs that together describe how matched elements should be rendered. Order among declarations in the same block generally does not matter unless two declarations set the same property, in which case the later one wins.\n\nBlocks can be empty, hold a single declaration, or contain dozens; whitespace and line breaks inside them are insignificant to the parser and exist purely for readability.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax',
      color: 'green',
      side: 'left',
    },
    {
      id: 'pseudo-class',
      title: 'Pseudo-class (:hover)',
      body: 'Specifies a special state of an element.',
      details:
        'A pseudo-class like `:hover`, `:focus`, or `:nth-child()` selects an element based on state or position rather than its attributes or content. `:hover` matches while the pointer rests over the element, letting a stylesheet react to interaction without any JavaScript.\n\nPseudo-classes are written with a single colon and can be chained (`a:hover:not(.disabled)`); this distinguishes them from pseudo-elements like `::before`, which use a double colon and target a sub-part of an element rather than a state.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes',
      color: 'pink',
      side: 'left',
    },
    {
      id: 'at-rule-media',
      title: 'At-rule (@media)',
      body: 'Applies styles based on conditions, such as a media query.',
      details:
        'A media query wraps a block of ordinary rules in a condition; the browser only applies the nested rules when the condition matches, and re-evaluates it live as the viewport or environment changes. Common features include `max-width`/`min-width` for responsive breakpoints, `orientation`, and `prefers-color-scheme` for detecting dark mode.\n\nBecause `@media` blocks can contain full selectors and declaration blocks, they let a single stylesheet adapt layout, typography, or colors for different devices without duplicating the whole file.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'css-variable',
      title: 'CSS variable (custom property)',
      body: 'Defined with a -- prefix and read elsewhere with var().',
      details:
        'A custom property is any declaration whose name starts with `--`, such as `--primary-color: #007bff;`. Unlike a preprocessor variable, it is a real runtime value in the CSSOM: it inherits down the DOM tree like any other inherited property, so nested elements can override it for just their subtree.\n\nCustom properties are read with `var(--name, fallback)`, where the optional second argument supplies a value to use if the property is unset or invalid. Because they resolve at compute time, they can also be changed dynamically from JavaScript or animated, which static preprocessor variables cannot do.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'declaration',
      title: 'Declaration (property: value;)',
      body: 'A single style rule pairing a property with a value.',
      details:
        'A declaration is a single `property: value;` pair: the smallest unit of styling instruction, ending in a semicolon (optional on the last declaration in a block, but conventional to include). Declaring the same property twice in one block simply lets the later occurrence win.\n\nSome properties, called shorthands, set several related longhand properties at once, e.g. `font: italic 1em/1.5 sans-serif;` expands to `font-style`, `font-size`, `line-height`, and `font-family` in one line.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'property',
      title: 'Property',
      body: 'The style attribute being changed, such as justify-content or font-size.',
      details:
        'The property names the aspect of rendering being controlled: layout (`display`, `justify-content`), box model (`padding`, `margin`), or typography (`font-size`, `color`), among hundreds of others defined across the CSS specifications. Browsers ignore declarations whose property name they do not recognize, which is what makes progressive enhancement with new CSS features safe.\n\nVendor-prefixed properties like `-webkit-appearance` once let browsers ship experimental features before standardization; most mainstream properties no longer need a prefix, but some still appear in compatibility-focused codebases.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_properties_reference',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'value',
      title: 'Value',
      body: 'The setting assigned to the property, such as var(--primary-color) or 2em.',
      details:
        "The value supplies the actual setting for a property, and its accepted forms depend on the property: keywords (`flex`, `pointer`), lengths (`2em`, `20px`), colors (`white`, `#f4f4f4`), or functions like `var(--primary-color)` and `calc(100% - 20px)`.\n\nLength units come in absolute forms like `px` and relative forms like `em` (relative to the element's font size), `rem` (relative to the root font size), and `%` (relative to a containing value), which is why relative units are generally preferred for responsive layouts.",
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '/* A minimal stylesheet. To center a div, see: the rest of your career. */',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: ':root {\n  --gap: 1rem;\n}',
        refs: ['selector', 'declaration-block', 'css-variable'],
      },
      { code: '' },
      {
        code: 'p {\n  margin: var(--gap);\n  color: #222;\n}',
        refs: ['selector', 'declaration-block', 'declaration'],
      },
      { code: '' },
      {
        code: '@media (prefers-color-scheme: dark) {\n  p {\n    color: #eee;\n  }\n}',
        refs: ['at-rule-media'],
      },
    ],
    verbose: [
      {
        code: '/* This is a multi-line comment.\n   !important note: we do not talk about !important. */',
        refs: ['comment'],
      },
      {
        code: "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');",
        refs: ['at-rule-import'],
      },
      { code: '' },
      { code: ':root {', refs: ['selector'] },
      {
        code: '  --primary-color: #007bff; /* CSS Custom Property (Variable) */',
        refs: ['css-variable'],
      },
      { code: '}' },
      { code: '' },
      { code: 'body {', refs: ['selector', 'declaration-block'] },
      {
        code: "  font-family: 'Roboto', sans-serif;",
        refs: ['declaration', 'declaration-block'],
      },
      {
        code: '  margin: 0;\n  background-color: #f4f4f4;',
        refs: ['declaration-block'],
      },
      { code: '}', refs: ['declaration-block'] },
      { code: '' },
      { code: '/* Header Styles (works on my machine, i.e. every browser but one) */' },
      { code: '.header-container {', refs: ['selector', 'declaration-block'] },
      { code: '  display: flex;', refs: ['declaration-block'] },
      {
        code: '  justify-content: space-between;',
        refs: ['property', 'declaration-block'],
      },
      { code: '  padding: 20px;', refs: ['declaration-block'] },
      {
        code: '  background-color: var(--primary-color);',
        refs: ['value', 'declaration-block'],
      },
      { code: '}', refs: ['declaration-block'] },
      { code: '' },
      { code: '#main-title {', refs: ['selector'] },
      { code: '  color: white;', refs: ['value'] },
      { code: '  font-size: 2em;', refs: ['property', 'value'] },
      { code: '}' },
      { code: '' },
      { code: '/* Button Styles with pseudo-class (hover responsibly) */' },
      { code: '.btn:hover {', refs: ['selector', 'pseudo-class'] },
      {
        code: '  background-color: darkblue;\n  cursor: pointer; /* the only cursor CSS ever gave us */',
      },
      { code: '}' },
      { code: '' },
      {
        code: '@media (max-width: 600px) {\n  .header-container {\n    flex-direction: column;\n    text-align: center;\n  }\n}',
        refs: ['at-rule-media'],
      },
    ],
  },
}
