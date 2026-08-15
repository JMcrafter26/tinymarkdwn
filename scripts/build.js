// Build, minify, and test the tinymarkdwn library for distribution.

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const root = path.resolve(__dirname, '..');
const srcFile = path.join(root, 'src', 'index.js');
const outFile = path.join(root, 'dist', 'tinymarkdwn.min.js');
const testFile = path.join(root, 'tests', 'test.js');

async function build() {
  const source = fs.readFileSync(srcFile, 'utf8');

  const { code } = await minify(source, { compress: true, mangle: true, module: false });
  // Wrap in an IIFE so no helper names leak onto window/global when
  // this file is loaded as a plain <script> tag alongside other libraries.
  const wrapped = `(function(){\n${code}\n})();`;

  // add short header comment to the top of the minified file, from package.json
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const headerComment = `/*! ${packageJson.name} v${packageJson.version} | ${packageJson.license} License | ${packageJson.homepage} */\n`;
  const finalOutput = headerComment + wrapped;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, finalOutput, 'utf8');

  const originalSize = Buffer.byteLength(source, 'utf8');
  const minifiedSize = Buffer.byteLength(finalOutput, 'utf8');
  const reduction = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(2);
  
  import('zlib').then(zlib => {
    const gzippedSize = (zlib.gzipSync(finalOutput).length / 1024).toFixed(2);
    console.log(`Minified: ${originalSize} -> ${minifiedSize} bytes (-${reduction}%)`);
    console.log(`Gzipped: ${gzippedSize} kb`);
    console.log(`Output written to ${path.relative(root, outFile)}`);
  });
}

async function runTests() {
  const { stdout, stderr } = await execAsync(`node "${testFile}" --dist`);
  if (stderr) console.error(stderr);
  console.log(stdout);
}

(async () => {
  try {
    await build();
    await runTests();
    console.log('All tests passed successfully.');
  } catch (err) {
    console.error('Build failed:', err.message);
    process.exit(1);
  }
})();