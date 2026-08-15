# Markdown Cheat Sheet 🗒
> A list of commonly used Markdown syntax.

If you want to expand this list with more extended syntax, feel free to add them in the comments of this gist! 😊  

For a more comprehensive tutorial on Markdown, follow this link -> [The Utlimate Markdown Guide](https://dev.to/soumikdhar/how-to-write-better-cleaner-markdown-the-definitive-guide-3fif)

---

# Basic Markdown Syntax

## 1. Headings

```
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
##### Level 5 Heading
###### Level 6 Heading
```
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
##### Level 5 Heading
###### Level 6 Heading

---

## 2. Paragraphs 

This is a paragraph. Insert a blank line to add another one!

This is another paragraph. Use two or more spaces after a line or paragraph to force a line break. It's that simple!

---

## 3. Horizontal Rules

Use `***`, `---` or `___`

---

## 4. Text Formatting - Emphasis

```
A **bold** text  
Another __bold__ text
```
A **bold** text  
Another __bold__ text

```
An *italicized* text  
Another _italicized_ text
```
An *italicized* text  
Another _italicized_ text

---

## 5. Blockquotes

```
>Fate whispers to the Warrior,   
>A storm is coming,  
>  
>>And the Warrior whispers back,  
>>I am the Storm.  
```
>Fate whispers to the Warrior,   
>A storm is coming,  
>  
>>And the Warrior whispers back,  
>>I am the Storm.  

---

## 6. Lists
  
  ### a. Unordered Lists
    
  ```
  * First list item
  * Second list item
  * Third list item

  - List item 1
  - List item 2
  - List item 3
```
  * First list item
  * Second list item
  * Third list item

  - List item 1
  - List item 2
  - List item 3
  
  ### b. Ordered Lists
  
  ```
  1. First list item
  1. Second list item
  1. Third list item
  ```
  1. First list item
  1. Second list item
  1. Third list item
  
---

## 7. Links 

```
[An inline-style Link](http://example.com/)

[A reference-style link][Example Reference] 

[Example Reference]: http://example.com/
```
[An inline-style Link](http://example.com/)

[A reference-style link][Example Reference]  

[Example Reference]: http://example.com/

---

## 8. Images

```
\![Markdown-mark](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)
```
![Markdown-mark](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

### Linked Images

```
Click this image!
[![Daftpunktocat-guy](https://octodex.github.com/images/daftpunktocat-guy.gif)](https://octodex.github.com/daftpunktocat-guy/)
```
Click this image!
[![Daftpunktocat-guy](https://octodex.github.com/images/daftpunktocat-guy.gif)](https://octodex.github.com/daftpunktocat-guy/)

---

# Extended Markdown Syntax

## 9. Tables

```
| First Name | Last Name | Age |  
| :--------- | :-------: | --: |  
| John       |    Doe    |  28 |  
| Jane       |    Doe    |  52 |  
```
| First Name | Last Name | Age |  
| :--------- | :-------: | --: |  
| John       |    Doe    |  28 |  
| Jane       |    Doe    |  52 |  

---

## 10. Extended Text Formatting

```
Strikethrough text ~~like this~~ using a pair of double tildes  

```
Strikethrough text ~~like this~~ using a pair of double tildes  

---

## 11. Task Lists

```
1. [ ] Unchecked list item
1. [x] Checked list item
1. [ ] Another unchecked list item

- [x] Research
- [x] Compose
- [ ] Publish
```
1. [ ] Unchecked list item
1. [x] Checked list item
1. [ ] Another unchecked list item

- [x] Research
- [x] Compose
- [ ] Publish

---

## 12. Code  

  ### a. Inline Code
  
  ```
  Run `npm install` to install all dependencies
  ```
  Run `npm install` to install all dependencies
      
  ### b. Fenced Code Blocks
  
  \`\`\`   
  // function to add two numbers and return the sum  
    function add(num1, num2) {  
      return num1 + num2  
    }  
  \`\`\`
  
  ```
  // function to add two numbers and return the sum
  function add(num1, num2) {
     return num1 + num2
  }
  ```
      
  ### c. Syntax Highlighting
  
  \`\`\`js   
  // function to add two numbers and return the sum using javascript  
    function add(num1, num2) {  
      return num1 + num2   
    }  
  \`\`\`

  \`\`\`c++   
  // function to add two numbers and return the sum using c++   
    double add (double num1, double num2) {  
      return (num1 + num2);   
    }   
  \`\`\`
  ```js
  // function to add two numbers and return the sum using javascript
  function add(num1, num2) {
     return num1 + num2
  }
  ```

  ```c++
  // function to add two numbers and return the sum using c++
  double add (double num1, double num2) {
     return (num1 + num2);
  }
  ```

---

#### Escaping Characters 

To use a literal character without having it formatted, prefix a backslash `\` before the character or wrap it inside a pair of backticks (like inline code)

---

> Gist by <https://gist.github.com/soumik-dhar/29c9be8431660f16bf1db5248367a23f>