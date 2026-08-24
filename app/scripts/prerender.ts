/**
 * Writes a real HTML file for every language and concept, after `vite build`.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 * This site's whole asset is a written, annotated tour per language, and until
 * now every one of them lived at the same URL. The router used hash history, so
 * `#/python` and `#/rust` are one page to a crawler: a fragment is never sent to
 * a server and has not been indexed as a distinct URL since Google retired the
 * hash-bang scheme in 2015. Fifty-five tours, one indexable page, and an
 * assistant asked what is inside a Rust file had nothing of ours to cite.
 *
 * Hash history was not a mistake when it was chosen. GitHub Pages has no SPA
 * fallback, so it was the only way a refreshed deep link survived. This removes
 * the reason rather than the guardrail: if `/python/` is a FILE that exists,
 * nothing needs rewriting, the URL answers 200 on its own, and the app boots
 * over the top exactly as before.
 *
 * ── What each page carries ───────────────────────────────────────────────
 * The shell alone would give every URL the same title and an identical body,
 * which is worse than one page: it reads as fifty-five duplicates. So each file
 * gets that entry's own title, description, canonical, social tags, TechArticle
 * JSON-LD, and a `<noscript>` body carrying the real prose, the language's note,
 * its file extensions, and every callout's heading and explanation. That block
 * is what a crawler and an answer engine actually read, and it is the same text
 * a reader sees once the tour loads.
 *
 * Variant URLs (`/python/verbose`) are written too, so a shared link still
 * resolves, but they canonicalize to the base page: same tour, different example
 * size, and asking search to hold three near-identical copies of each language
 * helps nobody.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { LanguageDef } from '../src/lib/types'

const ORIGIN = 'https://anatomyof.lunarwerx.com'
const DIST = resolve(import.meta.dirname, '..', 'dist')
const DATA_DIR = resolve(import.meta.dirname, '..', 'src', 'data')
const LASTMOD = new Date().toISOString().slice(0, 10)

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** `details` is prose with `backticks` and blank-line paragraphs. Flatten it. */
const plain = (s: string): string =>
  s
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

async function loadDefs(): Promise<LanguageDef[]> {
  const files = readdirSync(DATA_DIR).filter(
    (f) => f.endsWith('.ts') && !f.includes('.generated.') && f !== 'index.ts',
  )
  const defs: LanguageDef[] = []
  for (const file of files) {
    const mod = (await import(pathToFileURL(join(DATA_DIR, file)).href)) as Record<string, unknown>
    for (const value of Object.values(mod)) {
      if (value && typeof value === 'object' && 'id' in value && 'annotations' in value) {
        defs.push(value as LanguageDef)
      }
    }
  }
  return defs.sort((a, b) => a.id.localeCompare(b.id))
}

/** "Anatomy of a Python file" / "Anatomy of a Website" — the page's real H1. */
function headline(def: LanguageDef): string {
  const noun = def.titleNoun === undefined ? 'file' : def.titleNoun
  return `Anatomy of ${def.article} ${def.titleWord}${noun ? ` ${noun}` : ''}`.replace(/\s+/g, ' ')
}

/**
 * A 120-160 character description, built to be DIFFERENT per entry.
 *
 * The length band is the easy half. The half that matters is that fifty-five
 * pages must not share a sentence: a set of near-identical descriptions is read
 * as duplicate content and is exactly the failure this prerender exists to undo.
 * So the entry's own `note` leads, since it is the one line written about that
 * language specifically, and the generic tour sentence only fills what is left.
 */
function describe(def: LanguageDef): string {
  const note = plain(def.note)
  const exts = def.extensions.length ? ` (${def.extensions.join(', ')})` : ''
  const tail = `${headline(def)}${exts}: ${def.annotations.length} annotated callouts.`

  if (note.length >= 120 && note.length <= 160) return note
  if (note.length > 160) {
    const cut = note.slice(0, 157)
    return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 0)).replace(/[,;:.]$/, '')}...`
  }
  const combined = `${tail} ${note}`
  if (combined.length <= 160) return combined
  // Trim the note at a word boundary so the sentence never ends mid-word.
  const room = 160 - tail.length - 1
  if (room >= 40) {
    let cut = note.slice(0, room)
    cut = cut.slice(0, Math.max(cut.lastIndexOf(' '), 0)).replace(/[,;:.]$/, '')
    return `${tail} ${cut}...`
  }
  return tail.length <= 160 ? tail : `${tail.slice(0, 157)}...`
}

/**
 * A link to every other tour, in each page's `<noscript>`.
 *
 * Without this the fifty-five new pages are orphans. The sidebar is built from
 * Reka UI's TabsTrigger, which renders a `<button>`, so there is not one
 * crawlable link between languages anywhere in the interface; a sitemap tells a
 * crawler the URLs exist, but internal links are what tell it they matter and
 * are how it reaches them in the first place.
 *
 * This is the no-JS fallback doing its actual job rather than a trick: the
 * destinations are real pages carrying the same content a reader gets, which is
 * the difference between progressive enhancement and cloaking.
 */
function indexLinks(all: LanguageDef[], currentId: string): string {
  const link = (d: LanguageDef) => `<li><a href="${ORIGIN}/${d.id}/">${esc(headline(d))}</a></li>`
  const langs = all.filter((d) => d.category !== 'concept' && d.id !== currentId)
  const concepts = all.filter((d) => d.category === 'concept' && d.id !== currentId)
  return (
    `<nav aria-label="All tours">
          <h2>Every language on AnatomyOf</h2>
          <ul>${langs.map(link).join('')}</ul>` +
    (concepts.length
      ? `\n          <h2>Concept tours</h2>\n          <ul>${concepts.map(link).join('')}</ul>`
      : '') +
    `\n        </nav>`
  )
}

function noscriptFor(def: LanguageDef, all: LanguageDef[]): string {
  const h1 = esc(headline(def))
  const exts = def.extensions.length
    ? `<p>File extensions: ${def.extensions.map((e) => `<code>${esc(e)}</code>`).join(', ')}</p>`
    : ''
  const callouts = def.annotations
    .map(
      (a) =>
        `<section><h3>${esc(a.title)}</h3><p>${esc(plain(a.body))}</p>` +
        `<p>${esc(plain(a.details).slice(0, 600))}</p></section>`,
    )
    .join('\n        ')
  return `<noscript>
      <main>
        <h1>${h1}</h1>
        <p>${esc(plain(def.note))}</p>
        ${exts}
        <p>Every part of the example below is labelled and explained. This page is one of ${'{{TOTAL}}'} annotated tours on AnatomyOf, a free, open-source project by <a href="https://lunarwerx.com/">LunarWerx Studios</a>.</p>
        <h2>What is inside ${esc(def.article)} ${esc(def.titleWord)} ${def.titleNoun === undefined ? 'file' : esc(def.titleNoun || 'page')}</h2>
        ${callouts}
        <p><a href="${esc(def.officialUrl)}">Official ${esc(def.titleWord)} site</a> &middot; <a href="${ORIGIN}/">All languages on AnatomyOf</a></p>
        ${indexLinks(all, def.id)}
        <p>The interactive tour needs JavaScript. Enable it to hover a callout and trace it into the code.</p>
      </main>
    </noscript>`
}

function jsonLdFor(def: LanguageDef, url: string): string {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: headline(def),
        description: describe(def),
        url,
        inLanguage: 'en',
        // The tours are written by the studio, not user-submitted, and an
        // answer engine weighs a named publisher.
        author: { '@id': 'https://lunarwerx.com/#org' },
        publisher: { '@id': 'https://lunarwerx.com/#org' },
        isPartOf: { '@id': `${ORIGIN}/#site` },
        about: { '@type': 'ComputerLanguage', name: def.titleWord, url: def.officialUrl },
        articleSection: def.category === 'concept' ? 'Concepts' : 'Languages',
      },
      {
        '@type': 'Organization',
        '@id': 'https://lunarwerx.com/#org',
        name: 'LunarWerx Studios',
        url: 'https://lunarwerx.com/',
        logo: 'https://lunarwerx.com/logowhite.webp',
        sameAs: ['https://github.com/LunarWerxs'],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AnatomyOf', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: headline(def), item: url },
        ],
      },
    ],
  }
  return `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n    </script>`
}

/**
 * Rewrites the built shell for one entry.
 *
 * Replacements are anchored on the exact strings the shell ships rather than a
 * loose regex: if the shell's head is restyled and a marker stops matching, this
 * throws instead of quietly emitting fifty-five pages that all still say
 * "AnatomyOf". A prerender that silently degrades to duplicates is the failure
 * this whole script exists to end.
 */
function buildPage(
  shell: string,
  def: LanguageDef,
  url: string,
  canonical: string,
  all: LanguageDef[],
): string {
  const title = `${headline(def)} | AnatomyOf`
  const desc = describe(def)
  let html = shell

  const swap = (from: string, to: string, label: string) => {
    if (!html.includes(from)) throw new Error(`prerender: shell no longer contains ${label}`)
    html = html.replace(from, to)
  }

  swap('<title>AnatomyOf</title>', `<title>${esc(title)}</title>`, '<title>')
  swap(
    `<link rel="canonical" href="${ORIGIN}/" />`,
    `<link rel="canonical" href="${canonical}" />`,
    'canonical link',
  )
  swap(
    `<meta property="og:url" content="${ORIGIN}/" />`,
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  )
  swap(
    '<meta property="og:title" content="AnatomyOf" />',
    `<meta property="og:title" content="${esc(title)}" />`,
    'og:title',
  )
  swap(
    '<meta name="twitter:title" content="AnatomyOf" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    'twitter:title',
  )

  // The three descriptions are distinct blocks in the shell; replace each.
  const shellDesc =
    'Interactive, annotated tours of source files, one language at a time. Hover a callout to trace it into the code; click for the full story.'
  const shellShortDesc = 'Interactive, annotated tours of source files, one language at a time.'
  html = html.replace(shellDesc, esc(desc)).replaceAll(shellShortDesc, esc(desc))

  // Replace the site-wide JSON-LD graph with this page's article graph.
  const ldStart = html.indexOf('<script type="application/ld+json">')
  const ldEnd = html.indexOf('</script>', ldStart)
  if (ldStart === -1 || ldEnd === -1) throw new Error('prerender: shell has no JSON-LD block')
  html = html.slice(0, ldStart) + jsonLdFor(def, canonical) + html.slice(ldEnd + '</script>'.length)

  // Replace the site-wide noscript with this page's own prose.
  const nsStart = html.indexOf('<noscript>')
  const nsEnd = html.indexOf('</noscript>', nsStart)
  if (nsStart === -1 || nsEnd === -1) throw new Error('prerender: shell has no <noscript> block')
  const ns = noscriptFor(def, all).replace('{{TOTAL}}', String(all.length))
  html = html.slice(0, nsStart) + ns + html.slice(nsEnd + '</noscript>'.length)

  return html
}

function write(dir: string, html: string): void {
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

const defs = await loadDefs()
if (!existsSync(join(DIST, 'index.html'))) {
  throw new Error('prerender: dist/index.html is missing; run vite build first')
}
const shell = readFileSync(join(DIST, 'index.html'), 'utf8')

let pages = 0
const urls: Array<{ loc: string; priority: string }> = [{ loc: `${ORIGIN}/`, priority: '1.0' }]

for (const def of defs) {
  const canonical = `${ORIGIN}/${def.id}/`
  write(join(DIST, def.id), buildPage(shell, def, canonical, canonical, defs))
  urls.push({ loc: canonical, priority: '0.8' })
  pages += 1

  // Variant URLs resolve rather than 404, but point search back at the base.
  const variants = new Set<string>(['minimal', 'verbose'])
  if (def.visual) variants.add('visual')
  for (const variant of variants) {
    const url = `${ORIGIN}/${def.id}/${variant}`
    write(join(DIST, def.id, variant), buildPage(shell, def, url, canonical, defs))
    pages += 1
  }
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  ),
  '</urlset>',
  '',
].join('\n')
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

/**
 * llms.txt gains the full list of tours, generated rather than hand-kept.
 *
 * An assistant reads this file to find out what a domain offers, and until now
 * it was told "dozens of languages" with a single link to the front page, which
 * is the truth stated in the least useful possible form. Naming each tour and
 * its URL is the difference between knowing this site exists and being able to
 * answer "what is inside a COBOL file" with a link.
 *
 * Generated here, from the same catalogue that produced the pages, so a new
 * language cannot appear on the site and be missing from the file an assistant
 * actually reads.
 */
const llmsPath = join(DIST, 'llms.txt')
if (existsSync(llmsPath)) {
  let llms = readFileSync(llmsPath, 'utf8')
  const listing = [
    '',
    `## Every tour (${defs.length})`,
    'Each is a standalone page with its own annotated walkthrough of a real example.',
    '',
    ...defs
      .filter((d) => d.category !== 'concept')
      .map((d) => `- [${headline(d)}](${ORIGIN}/${d.id}/): ${plain(d.note)}`),
    '',
    '### Concept tours',
    ...defs
      .filter((d) => d.category === 'concept')
      .map((d) => `- [${headline(d)}](${ORIGIN}/${d.id}/): ${plain(d.note)}`),
    '',
  ].join('\n')
  // Insert before the trailing Links section so that stays last.
  const marker = '\n## Links'
  llms = llms.includes(marker) ? llms.replace(marker, `${listing}${marker}`) : llms + listing
  writeFileSync(llmsPath, llms)
}

console.log(
  `prerender: ${pages} pages for ${defs.length} entries, sitemap lists ${urls.length} canonical URLs,` +
    ' llms.txt lists every tour',
)
