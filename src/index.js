/**
 * tinymarkdwn(md) — tiny regex-based Markdown to HTML converter.
 *
 * Supports: headings, hr, blockquotes, flat ordered/unordered lists
 * (incl. GFM task-list checkboxes), GFM tables, fenced + inline code,
 * bold/italic/bold+italic, strikethrough, links, images, autolinks,
 * and paragraphs.
 *
 * SECURITY NOTE: This is a "best effort" Markdown parser, not a security library.
 * It is designed to be safe against XSS attacks, but it is not a formal
 * security review. Use at your own risk, and consider additional sanitization if you are
 * processing untrusted input.
 *  1. `esc()` runs ONCE, on the raw source, before anything else. That
 *     means any literal HTML the "author" typed (e.g. <script>) is
 *     already inert text by the time any markdown rule below runs —
 *     there is no later step that could accidentally un-escape it.
 *  2. Every <a href> and <img src> this function ever emits goes
 *     through safeUrl(), which allowlists http:, https:, mailto:, and
 *     relative/anchor links. javascript:, data:, vbscript:, etc. are
 *     all rewritten to '#'. Tables and lists funnel their cell/item
 *     text through the same inline() helper, so there's only one
 *     place in the whole file that builds links — keep it that way.
 *  3. Code spans/blocks are pulled out into `store` BEFORE any other
 *     rule runs, and restored only at the very end. This stops e.g.
 *     `# not a heading` inside a code block from being reinterpreted
 *     as a real heading by the regex rules further down.
 */

function tinymarkdwn(md) {
  if (typeof md !== 'string') return '';

  // Escape the 5 HTML-significant characters via a single lookup table
  // instead of 5 chained .replace() calls — smaller, same result.
  const esc = (t) => t.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Scheme allowlist for URLs — the main XSS guard for links/images.
  const safeUrl = (u) => /^(https?:|mailto:|\/|#|\.{1,2}\/)/i.test(u.trim()) ? u.trim() : '#';

  // Holds rendered HTML for code spans/blocks so later regexes can't
  // "see" or mangle their contents. stash() swaps a chunk of HTML for
  // a placeholder token; the token is put back in at the very end.
  const store = [];
  const stash = (h) => '\u0000' + (store.push(h) - 1) + '\u0000';

  // Formats inline markdown (emphasis, links, code, etc.) within one
  // already-escaped chunk of text. Called from every block type below
  // so link/emphasis handling only needs to exist in one place.
  const inline = (t) => t
    .replace(/`([^`\n]+)`/g, (_, c) => stash(`<code>${c}</code>`)) // inline code — stash first so `*` etc. inside it is left alone
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, a, u, ti) => `<img src="${safeUrl(u)}" alt="${a}"${ti ? ` title="${ti}"` : ''}>`) // images before links (shares the `[...]()` shape)
    .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, x, u, ti) => `<a href="${safeUrl(u)}"${ti ? ` title="${ti}"` : ''} rel="noopener noreferrer">${x}</a>`) // [text](url "title")
    .replace(/&lt;((?:https?|mailto):[^\s&]+)&gt;/g, (_, u) => `<a href="${safeUrl(u)}" rel="noopener noreferrer">${u}</a>`) // <https://...> autolinks (note: matched post-escape, so &lt;/&gt; not <, >)
    .replace(/(\*\*\*|___)(.+?)\1/g, '<strong><em>$2</em></strong>') // ***bold italic***
    .replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')             // **bold**
    .replace(/(\*|_)(.+?)\1/g, '<em>$2</em>')                        // *italic*
    .replace(/~~(.+?)~~/g, '<del>$1</del>');                         // ~~strikethrough~~

  // Escape the whole document first, THEN pull out fenced code blocks —
  // order matters: esc() must see the raw ``` fences too, and the code
  // block's own contents (`code`) are already escaped at this point
  // since esc() ran on the full string before this .replace().
  let s = esc(md).replace(/```(\S*)\n([\s\S]*?)```/g, (_, lang, code) =>
    stash(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${code}</code></pre>`));

  s = s
    // GFM table: header row, separator row (---|---), then body rows.
    .replace(/^(\|.+\|)\n\|[ :-|]+\|\n((?:\|.*\|\n?)*)/gm, (_, head, body) => {
      const row = (r, tag) => '<tr>' + r.replace(/^\||\|$/g, '').split('|').map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('') + '</tr>';
      const rows = body.trim().split('\n').filter(Boolean).map(r => row(r, 'td')).join('');
      return `<table><thead>${row(head, 'th')}</thead><tbody>${rows}</tbody></table>\n`;
    })
    // ATX headings: # through ######
    .replace(/^ {0,3}(#{1,6}) +(.*)$/gm, (_, h, t) => `<h${h.length}>${inline(t)}</h${h.length}>`)
    // Horizontal rule: a line of 3+ matching -, *, or _ (optionally spaced)
    .replace(/^ {0,3}([-*_])( *\1){2,} *$/gm, '<hr>')
    // Blockquote: merge consecutive "> " lines into one <blockquote>, joined by <br>
    .replace(/^(?: {0,3}>.*\n?)+/gm, b => `<blockquote>${b.replace(/^ {0,3}>\s?/gm, '').trim().split('\n').map(inline).join('<br>')}</blockquote>`)
    // Ordered list: merge consecutive "1. " lines (single level, no nesting)
    .replace(/^(?: {0,3}\d+\.\s+.*\n?)+/gm, b => `<ol>${b.trim().split('\n').map(l => `<li>${inline(l.replace(/^ {0,3}\d+\.\s+/, ''))}</li>`).join('')}</ol>`)
    // Unordered list: merge consecutive -/*/+ lines; also handles GFM task checkboxes [ ] / [x]
    .replace(/^(?: {0,3}[-*+]\s+.*\n?)+/gm, b => `<ul>${b.trim().split('\n').map(l => {
        const c = l.replace(/^ {0,3}[-*+]\s+/, '').replace(/^\[( |x|X)\]\s*/, (_, ch) => `<input type="checkbox" disabled${ch !== ' ' ? ' checked' : ''}> `);
        return `<li>${inline(c)}</li>`;
      }).join('')}</ul>`)
    // Paragraphs: split the document on blank lines into blocks, then
    // walk each block LINE BY LINE. Lines that are already block-level
    // HTML (headings/lists/tables/etc. from the rules above, or a
    // stashed code placeholder) pass through untouched; consecutive
    // plain-text lines are batched into a single <p>, with the "\n
    // inside a paragraph" case joined as <br> between them. This is
    // what lets e.g. "# Heading\nplain text" (no blank line between
    // them) still render the plain text as its own paragraph instead
    // of being swallowed into the heading's block.
    .split(/\n{2,}/)
    .map(block => {
      const isBlockTag = (l) => /^<(h\d|ul|ol|blockquote|hr|table)/.test(l) || /^\u0000\d+\u0000$/.test(l);
      let html = '', buf = [];
      const flush = () => { if (buf.length) { html += `<p>${buf.map(inline).join('<br>')}</p>\n`; buf = []; } };
      for (const line of block.split('\n')) {
        const t = line.trim();
        if (!t) continue;
        if (isBlockTag(t)) { flush(); html += t + '\n'; }
        else buf.push(t);
      }
      flush();
      return html.trim();
    })
    .join('\n');

  // Put the protected code blocks/spans back in, now that no further
  // rule can misinterpret their contents.
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => store[i]).trim();
}

// Works three ways with zero config changes needed by the consumer:
//  1. Plain <script src="md.js"> — creates window.tinymarkdwn (CDN use case, unchanged)
//  2. CommonJS: const { tinymarkdwn } = require('./md.js')
//  3. ES modules / bundlers (webpack, Vite, etc.) that understand CJS interop
//     can `import { tinymarkdwn } from './md.js'` against the module.exports below.
if (typeof module !== 'undefined' && module['exports']) {
  module['exports'] = tinymarkdwn;
  module['exports']['tinymarkdwn'] = tinymarkdwn;
} else if (typeof globalThis !== 'undefined') {
  globalThis['tinymarkdwn'] = tinymarkdwn;
}