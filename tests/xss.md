# XSS test payloads

> IMPORTANT: These are not meant to be exhaustive, just a few examples of the kinds of things that should be escaped. This is for sanity-checking the library, not for security auditing and should never be used as a comprehensive test suite for XSS vulnerabilities. If you find a payload that is not escaped, please report it to the author.

## 1. Raw HTML injection
<script>alert(document.cookie)</script>
<!-- EXPECTED: literal escaped text, no real <script> element -->

<img src=x onerror=alert(1)>
<!-- EXPECTED: literal escaped text, no onerror -->

<svg onload=alert(1)></svg>
<!-- EXPECTED: literal escaped text, no <svg> element -->

<iframe src="javascript:alert(1)"></iframe>
<!-- EXPECTED: literal escaped text -->

## 2. Markdown links with dangerous URLs
[click me](javascript:alert(1))
<!-- EXPECTED: <a href="#">click me</a> -->

[click me](JaVaScRiPt:alert(1))
<!-- EXPECTED: href="#" -->

[click me](javascript:alert(1) "title")
<!-- EXPECTED: href="#" -->

[click me](data:text/html,<script>alert(1)</script>)
<!-- EXPECTED: href="#" -->

[click me](vbscript:msgbox(1))
<!-- EXPECTED: href="#" -->

[click me](file:///etc/passwd)
<!-- EXPECTED: href="#" -->

[click me](ftp://evil.com)
<!-- EXPECTED: href="#" -->

## 3. Markdown images with dangerous URLs
![alt](javascript:alert(1))
<!-- EXPECTED: <img src="#" alt="alt"> -->

![alt](data:image/svg+xml,<svg onload=alert(1)>)
<!-- EXPECTED: <img src="#" alt="alt"> -->

![alt](https://example.com/image" onerror="alert(1))
<!-- EXPECTED: no onerror attribute; raw quotes escaped -->

## 4. Autolinks
<javascript:alert(1)>
<!-- EXPECTED: literal escaped text, no anchor -->

<JAVASCRIPT:ALERT(1)>
<!-- EXPECTED: literal escaped text -->

<https://example.com>
<!-- EXPECTED: safe <a href="https://example.com"> -->

<mailto:user@example.com>
<!-- EXPECTED: safe mailto link -->

## 5. Raw HTML in block elements
# <script>alert(1)</script>
<!-- EXPECTED: heading text escaped -->

> <script>alert(1)</script>
<!-- EXPECTED: blockquote text escaped -->

- <img src=x onerror=alert(1)>
<!-- EXPECTED: list item text escaped -->

1. [click](javascript:alert(1))
<!-- EXPECTED: <li><a href="#">click</a></li> -->

- [x] <script>alert(1)</script>
<!-- EXPECTED: checkbox plus escaped text -->

## 6. GFM tables
| col1 | col2 |
|---|---|
| <script>alert(1)</script> | [x](javascript:alert(1)) |
<!-- EXPECTED: cell 1 escaped text, cell 2 link href="#" -->

| a | b |
|---|---|
| \| | [click](data:text/html,<b>x</b>) |
<!-- EXPECTED: cell 1 literal pipe, cell 2 href="#" -->

## 7. Code blocks and spans with HTML
```html
<script>alert(1)</script>