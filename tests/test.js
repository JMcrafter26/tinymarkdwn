// Test suite for tinymarkdwn. Run with `node tests/test.js` (src build)
// or `node tests/test.js --dist` (minified build).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const isDist = process.argv.includes('--dist');
const entry = path.join(root, isDist ? 'dist/md.min.js' : 'src/index.js');
const tinymarkdwn = require(entry).tinymarkdwn;

let passed = 0;
let failed = 0;

function assert(name, actual, expected) {
  if (actual === expected) {
    passed++;
    console.log(`✓ ${name}`); // some fancy ascii, cool huh?
  } else {
    failed++;
    console.log(`✗ ${name}`);
    console.log(`  expected: ${JSON.stringify(expected)}`);
    console.log(`  actual:   ${JSON.stringify(actual)}`);
  }
}

// --- Case-by-case checks -------------------------------------------------
// Add new cases here as plain { name, input, expected } entries; no other
// bookkeeping (counters, etc.) needs to change.
const cases = [
  {
    name: 'heading + paragraph, no blank line between',
    input: '# Hello World\nThis is a **bold** text.',
    expected: '<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> text.</p>',
  },
];

for (const { name, input, expected } of cases) {
  assert(name, tinymarkdwn(input), expected);
}

// --- Smoke test: convert a real markdown file end-to-end -----------------
// This doesn't assert exact output (real-world markdown is too varied for
// a fixed expected string) — it just confirms the function runs on a
// larger, realistic input without throwing, and saves the result so you
// can eyeball it.

const testFiles = ['test.md', 'gh_test.md', 'xss.md'];

for (const testFile of testFiles) {
  const sampleFile = path.join(__dirname, testFile);
  // const sampleFile = path.join(__dirname, 'gh_test.md');
  if (fs.existsSync(sampleFile)) {
    try {
      const markdown = fs.readFileSync(sampleFile, 'utf8');
      const html = tinymarkdwn(markdown);
      if (!fs.existsSync(path.join(__dirname, 'test_output'))) {
        fs.mkdirSync(path.join(__dirname, 'test_output'));
      }
      fs.writeFileSync(path.join(path.join(__dirname, 'test_output'), `${testFile.replace('.md', '')}.html`), html, 'utf8');
      passed++;
      console.log(`✓ converts ${testFile} without throwing (see tests/output.html)`);
    } catch (err) {
      failed++;
      console.log(`✗ converting ${testFile} threw: ${err.message}`);
    }
  } else {
    console.log(`… skipped ${testFile} smoke test (file not found)`);
  }
}
// --- Summary ---------------------------------------------------------------
console.log(`\n${passed}/${passed + failed} passed`);

process.exit(failed === 0 ? 0 : 1);