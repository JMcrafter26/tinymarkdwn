// Just a simple test to make sure the javascript file does what it should
let tests = 2;
let passed = 0;
function passTest() {
    console.log(`Passed! ${++passed}/${tests}`);
}

// Load the tinymarkdwn function from the src/index.js file
const tinymarkdwn = require('../src/index.js');

// Test the tinymarkdwn function with a simple markdown string
const markdownString = `# Hello World\nThis is a **bold** text.`;
const expectedHtml = '<h1>Hello World</h1>\nThis is a <strong>bold</strong> text.';

try {
const result = tinymarkdwn(markdownString);
if (result !== expectedHtml) {
    throw new Error(`Expected: ${expectedHtml}, but got: ${result}`);
}
} catch (err) {
    throw new Error(`Error processing markdown string: ${err.message}`);
}
passTest();

// Load actual markdown from a file and convert it to HTML
const fs = require('fs');
const path = require('path');

const markdownFilePath = path.join(__dirname, 'test.md');
try {
    const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
    const htmlContent = tinymarkdwn(markdownContent);
    // Save for inspection if needed
    const outputFilePath = path.join(__dirname, 'output.html');
    fs.writeFileSync(outputFilePath, htmlContent, 'utf8');
} catch (err) {
    throw new Error(`Error processing markdown file: ${err.message}`);
}
passTest();
