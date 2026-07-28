import type { LanguageDef } from '../lib/types'

// A "concept" entry: instead of code, it renders a live website mockup
// (see WebsiteMockup.vue). Each annotation id matches a `data-region` there.
export const website: LanguageDef = {
  id: 'website',
  name: 'Website',
  category: 'concept',
  titleWord: 'Website',
  titleNoun: '',
  article: 'a',
  extensions: ['.html'],
  accentHex: '#0ea5e9',
  officialUrl:
    'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure',
  shikiLang: 'html',
  mockup: 'website',
  note: 'Most web pages share the same regional skeleton (header, navigation, main content, sidebar, and footer) regardless of framework or styling.',
  annotations: [
    {
      id: 'header',
      title: 'Header',
      body: 'The bar across the top that identifies the site and holds navigation.',
      details:
        'The header is the introductory region at the top of the page, marked up with the `<header>` landmark. It usually persists across pages and contains the logo, primary navigation, and sometimes a search box or account menu.\n\nBecause it is a landmark, assistive technology lets users jump straight to it. A page can have more than one `<header>` (e.g. inside an `<article>`), but the top-level one describes the whole site.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'brand',
      title: 'Brand / logo',
      body: 'The site name or logo, usually linking back to the home page.',
      details:
        'The brand mark anchors the header and doubles as the "home" link, a near-universal convention users rely on. It is typically an `<a>` wrapping a logo image or the site name.\n\nKeep it in the same spot on every page so it stays a dependable escape hatch back to the top level. If it is an image, give it descriptive `alt` text (usually the company name).',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'nav',
      title: 'Primary navigation',
      body: 'The main set of links to the site’s top-level sections.',
      details:
        'Primary navigation lives in a `<nav>` landmark and lists the handful of most important destinations. Marking it up as a list of links makes the structure clear to screen readers and keyboards.\n\nHighlight the current section so users know where they are, and keep the set small. A long primary nav usually signals that the information architecture needs grouping.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'hero',
      title: 'Hero section',
      body: 'The large banner up top that states what the site is about.',
      details:
        'The hero is the first thing visitors see: a headline, a short supporting line, and usually a primary action. Its job is to answer "what is this and why should I care?" within seconds.\n\nIt is typically a `<section>` with a prominent heading. Resist stuffing it with detail: clarity and a single clear next step convert better than a wall of text.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'cta',
      title: 'Call to action',
      body: 'The primary button that drives the main conversion.',
      details:
        'A call-to-action (CTA) is the button or link you most want the visitor to click: "Get started", "Sign up", "Buy now". It should stand out visually and use an action verb.\n\nMost pages have one primary CTA and demote everything else to secondary styling, so attention is not split. Repeating the same CTA in the hero and again lower down is common and effective.',
      learnMore: 'https://en.wikipedia.org/wiki/Call_to_action_(marketing)',
      color: 'green',
      side: 'right',
    },
    {
      id: 'main',
      title: 'Main content',
      body: 'The unique, primary content of this particular page.',
      details:
        'The `<main>` landmark wraps the content that is unique to the page: not the header, nav, or footer that repeat across the site. There should be exactly one `<main>` per page.\n\nIt is the target of a "skip to content" link and a key landmark for assistive tech, letting users bypass the repeated chrome and get straight to what they came for.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'article',
      title: 'Article / content block',
      body: 'A self-contained piece of content, like a post or card.',
      details:
        'An `<article>` is a self-contained composition that would make sense on its own: a blog post, a product card, a comment. The test: could you syndicate it elsewhere and it still reads completely?\n\nUse `<section>` instead when the block is a thematic grouping within a larger whole rather than an independent unit. Each should generally start with a heading.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'aside',
      title: 'Sidebar (aside)',
      body: 'Secondary content tangential to the main content.',
      details:
        'The `<aside>` landmark holds content related to but separable from the main flow: related links, ads, author bios, a table of contents. Removing it should not break the meaning of the main content.\n\nVisually it is often a sidebar, but `<aside>` is about the *relationship* (supplementary), not the position, so it can appear anywhere in the layout.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'footer',
      title: 'Footer',
      body: 'The bottom region with legal, contact, and secondary links.',
      details:
        'The `<footer>` landmark closes the page with information about it: copyright, contact details, secondary navigation, and social links. It is where users instinctively look for "boring but important" links like privacy and terms.\n\nLike `<header>`, a `<footer>` can also appear scoped inside an `<article>` to describe just that content, but the page-level one describes the whole site.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer',
      color: 'rose',
      side: 'right',
    },
  ],
}
