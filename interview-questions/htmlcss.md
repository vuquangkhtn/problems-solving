# HTML/CSS

[[toc]]

### What is the difference between an id and a class in HTML/CSS?

<!-- id: 0et0}@IR,], noteType: Basic-66869 -->

An id is a unique identifier for a single HTML element.
A class is a reusable identifier that can be applied to multiple elements.

In CSS, an id is selected using the `#` symbol, while a class is selected using the `.` symbol.

### Can you explain the box model in CSS?

<!-- id: a!hfOCYM!!, noteType: Basic-66869 -->

The CSS box model describes the rectangular boxes generated for elements in the DOM. The box model is composed of the following layers:

1. Content: The innermost part, where text and images appear.

2. Padding: The space between the content and the border.

3. Border: The outer edge of the padding, surrounding the element.

4. Margin: The space outside the border, separating the element from others.

### What is the difference between inline, inline-block, and block elements?

<!-- id: N!|Y0|U?|a, noteType: Basic-66869 -->

In CSS, the difference between inline, inline-block, and block elements is on the way they’re rendered in the web page:

Inline: Inline elements don’t have a width or height.
They don’t start on a new line and take up only the width that’s required (based on their content).
Examples: `<span>`, `<a>`.

Inline-block: Do not start on a new line, but allow you to set height and width.
Example: `<img>`.

Block: Elements start on a new line, taking up the full width available by default.
Their width and height can be set.
Examples: `<div>`, `<p>`.

### What is the difference between the em and rem units?

<!-- id: M{HCKbf4gg, noteType: Basic-66869 -->

They’re both relative units of measurement, however, they’re relative to different things:

“em” units are relative to the font size of their parent element. So if the parent element has a font size of 20px, then setting a “2em” font size, would equal to 40px.

“rem” units are “root em”, which means they’re relative to the web page’s root element (the `<html>` element).

### Flexbox vs Grid vs Box Layout

<!-- id: T.F]!|Pt]=, noteType: Basic-66869 -->

Flexbox is a one-dimensional layout model that arranges items in a row or a column. It’s best used for smaller layout changes, like aligning items in a navigation bar or a footer.

Grid is a two-dimensional layout model that arranges items in rows and columns. It’s best used for larger layout changes, like creating a responsive grid layout for a website.

Box Layout is the default layout model in CSS. It’s based on the box model, where each element is a rectangular box. It’s best used for simple layouts, like centering an element on the page.

### Can you explain CSS specificity and how it works?

<!-- id: 1;F_A1PB2H, noteType: Basic-66869 -->

### What are media queries?

<!-- id: Sqtsume:j!, noteType: Basic-66869 -->

### Explain some of the pros and cons for CSS animations versus JavaScript animations.

<!-- id: wS1usH;.%,, noteType: Basic-66869 -->

Use CSS animations for simpler “one-shot” transitions, like toggling UI element states.
Use JavaScript animations when you want advanced effects like bouncing, stop, pause, rewind, or slowing down.
If you choose to animate with JavaScript, use the Web Animations API or a modern framework you’re comfortable with.

### "Css Selector: ~, >, +, #, ."

<!-- id: I=(rs!mcK2, noteType: Basic-66869 -->

```css
div p        /* Selects all <p> elements inside <div> elements */
p.intro      /* Selects all <p> elements with class="intro" */
#firstname   /* Selects the element with id="firstname" */
.name1.name2 /* Selects elements with both name1 and name2 classes */
.name1 .name2/* Selects descendants with name2 under an element with name1 */
div > p      /* Selects <p> elements whose parent is a <div> */
div + p      /* Selects the first <p> immediately after a <div> */
p ~ ul       /* Selects all <ul> elements placed after a <p> */
```

Reference: CSS Selectors Reference (w3schools.com).

### css vs css-in-js

<!-- id: d:7nK*Ymy9, noteType: Basic-66869 -->

### tailwindcss vs css

<!-- id: zWjYlzDs.H, noteType: Basic-66869 -->

### sass vs postcss

<!-- id: BU66(j|7Q6, noteType: Basic-66869 -->
