# TinyMarkDwn

TinyMarkDwn is a lightweight (`<1.5kb gzip`) Markdown parser and renderer written in JavaScript. It is designed to be fast, efficient, secure and easy to use, making it ideal for web applications that need to render Markdown content.

## Features

It supports a wide range of Markdown features:

- Headers
- Paragraphs
- Bold / Italic / Strikethrough
- Horizontal rules
- Links / Auto-links
- Images
- Lists (ordered and unordered)
- Checklists (Checkboxes)
- Blockquotes
- Code blocks
- inline code
- Tables

It's also tiny, has no external dependencies, and even comes with basic sanitization features to prevent XSS attacks when rendering user-generated content.[*](#sanitization)

All of this is done with a single function call, and no configuration is required. Just pass in your Markdown string, and get back the corresponding HTML string.

> If you want to know whether TinyMarkDwn is the right choice for your project, check out the [Why TinyMarkDwn?](#why-tinymarkdwn) section below.

## Installation

TinyMarkDwn supports multiple installation methods.

Use npm/pnpm/yarn to install TinyMarkDwn.

```bash
npm install tinymarkdwn
```

### ES Modules / Bundlers

E.g. with Webpack, Vite, Rollup, etc.

```js
import { tinymarkdwn } from 'tinymarkdwn';
```

### CommonJS

E.g. with Node.js, Browserify, Webpack, etc.

```js
const { tinymarkdwn } = require('tinymarkdwn');
```

### CDN / Plain `<script>` Tag

E.g. in a browser without a bundler, just include the following script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/tinymarkdwn@1/dist/tinymarkdwn.min.js"></script>
```

## Usage

It's really simple to use TinyMarkDwn. Just call the `tinymarkdwn` function with your Markdown string as an argument, and it will return the corresponding HTML string.

```js
const html = tinymarkdwn('# Hello, World!');
```

That's it! You can now use the `html` variable in your application!

## Why TinyMarkDwn?

You might be wondering why you should use TinyMarkDwn instead of other (tiny) Markdown libraries like `snackdown`, `marked`, or `markdown-it`. Here are some reasons:

- TinyMarkDwn is tiny (`<1.5kb gzip`) and fast, with a small footprint and no external dependencies.
- Designed to be secure, with built-in sanitization features to prevent XSS attacks.[*](#sanitization)
- Easy to use, with a simple API and no configuration required.
- Works in many environments, including Node.js and the browser
- Provides most of the common Markdown features you need, without the bloat of unnecessary features. (It supports tables, yay!)

However, if you need a more feature-rich Markdown parser, or one that supports extensions, you might want to consider other libraries like `markdown-it` or `marked`.

But why not give TinyMarkDwn a [try](#installation) first?

## Online Demo

You can try it here: [tinymarkdwn-editor](https://jmcrafter26.github.io/tinymarkdwn-editor/), it uses tinymarkdwn under the hood

## Sanitization

TinyMarkDwn applies built-in, best-effort sanitization when rendering user-generated content:

- Raw HTML is escaped before processing, so literal tags such as `<script>` are treated as text.
- Link and image URLs are allowlisted; dangerous schemes like `javascript:` and `data:` are rewritten to `#`.
- Code spans and code blocks are protected so Markdown syntax inside them is not reinterpreted.

These measures reduce common XSS risk, but TinyMarkDwn is a small regex-based Markdown parser, **not a security library**. For untrusted input, add a dedicated HTML sanitizer such as DOMPurify before inserting output into the DOM.

## Contributing

We welcome contributions to TinyMarkDwn! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

TinyMarkDwn is licensed under the MIT License.
