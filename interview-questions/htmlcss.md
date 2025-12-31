# HTML/CSS

[[toc]]

### What is HTML5? Differences between HTML4 and HTML5?

<!-- id: fzUOe;T$e$, noteType: Basic-66869 -->

HTML5 is the latest version of the Hypertext Markup Language (HTML), which is used to structure and present content on the web. It introduces new features and improvements over its predecessor version.
Some key differences between HTML4 and HTML5 include:

1. New Semantic Elements: HTML5 introduces new semantic elements like `<header>`, `<footer>`, `<article>`, `<section>`, and `<nav>` to provide better structure and meaning to web content.
2. Multimedia Support: HTML5 includes native support for audio and video elements (`<audio>` and `<video>`) without the need for third-party plugins like Flash.
3. Canvas Element: HTML5 introduces the `<canvas>` element, which allows for dynamic, scriptable rendering of 2D shapes and images.
4. Form Enhancements: HTML5 adds new input types (e.g., `email`, `date`, `number`) and attributes (e.g., `placeholder`, `required`) to improve form usability and validation.
5. Improved Accessibility: HTML5 includes features that enhance accessibility for users with disabilities, such as ARIA (Accessible Rich Internet Applications) roles and attributes.

Overall, HTML5 represents a significant advancement in web development, providing developers with more tools and capabilities to create rich, interactive, and user-friendly web experiences.

### What is the difference between an id and a class in HTML/CSS?

<!-- id: 0et0}@IR,], noteType: Basic-66869 -->

An id is a unique identifier for a single HTML element.
A class is a reusable identifier that can be applied to multiple elements.

In CSS, an id is selected using the `#` symbol, while a class is selected using the `.` symbol.

### What is CSS

<!-- id: d:7nK*Ymy9, noteType: Basic-66869 -->

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. It allows developers to separate content from design, making it easier to maintain and update styles across a website.

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

CSS specificity is a set of rules that determine which CSS rule is applied to an element when multiple rules could apply. It is calculated based on the types of selectors used in the CSS rules.
The specificity hierarchy is as follows (from highest to lowest):

1. Inline styles (e.g., `style="color: red;"`) - specificity value of 1000
2. IDs (e.g., `#header`) - specificity value of 100
3. Classes, attributes, and pseudo-classes (e.g., `.nav`, `[type
="text"]`, `:hover`) - specificity value of 10
4. Elements and pseudo-elements (e.g., `div`, `p`, `::before`) - specificity value of 1
5. Universal selector (`*`), combinators (`+`, `>`, `~`, ` `), and negation pseudo-class (`:not()`) - specificity value of 0

When multiple CSS rules apply to the same element, the rule with the highest specificity takes precedence. If two rules have the same specificity, the one that appears last in the CSS file will be applied.

### What are media queries?

<!-- id: Sqtsume:j!, noteType: Basic-66869 -->

Media queries are a CSS technique used to apply different styles to a web page based on the characteristics of the device or viewport, such as screen size, resolution, orientation, and more. They enable responsive web design, allowing websites to adapt their layout and appearance to provide an optimal user experience across various devices, including desktops, tablets, and smartphones.

### Explain some of the pros and cons for CSS animations versus JavaScript animations.

<!-- id: wS1usH;.%,, noteType: Basic-66869 -->

Use CSS animations for simpler “one-shot” transitions, like toggling UI element states.
Use JavaScript animations when you want advanced effects like bouncing, stop, pause, rewind, or slowing down.
If you choose to animate with JavaScript, use the Web Animations API or a modern framework you’re comfortable with.

CSS animations are generally more performant than JavaScript animations because they can be optimized by the browser's rendering engine with GPU acceleration.

### "Css Selector: ~, >, +, #, ."

<!-- id: I=(rs!mcK2, noteType: Basic-66869 -->

`div p`: Selects all <p> elements inside <div> elements
`p.intro`: Selects all <p> elements with class="intro"
`#firstname`: Selects the element with id="firstname"
`.name1.name2`: Selects elements with both name1 and name2 classes
`.name1 .name2`: Selects descendants with name2 under an element with name1
`div > p`: Selects <p> elements whose parent is a <div>
`div + p`: Selects the first <p> immediately after a <div>
`p ~ ul`: Selects all <ul> elements placed after a <p>

Reference: [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.php)

### What is CSS-in-JS?

CSS-in-JS is a styling approach where CSS is written using JavaScript. It allows developers to define styles within JavaScript files, often using libraries like styled-components or Emotion. This approach enables dynamic styling based on component state, props, or themes, and promotes component-based architecture by encapsulating styles with the components they belong to.

### tailwindcss vs Bootstrap

<!-- id: zWjYlzDs.H, noteType: Basic-66869 -->

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. It allows developers to compose styles directly in their HTML or JSX, promoting a more atomic approach to styling.
Bootstrap is a component-based CSS framework that provides pre-designed UI components and layout utilities. It offers a set of ready-to-use styles and components, making it easier to create responsive and consistent designs quickly.

### What is Sass?

<!-- id: BU66(j|7Q6, noteType: Basic-66869 -->

Sass is a CSS preprocessor that extends CSS with features like variables, nested rules, mixins, and functions. It allows developers to write more maintainable and reusable stylesheets. Sass files are typically written in `.scss` or `.sass` formats and need to be compiled into standard CSS before being used in a web project.

We can compile Sass using build tools like Gulp or Webpack.

### What is PostCSS?

<!-- id: tLzW9X$e9bY$, noteType: Basic-66869 -->

PostCSS is a tool for transforming CSS with JavaScript plugins. It allows developers to use various plugins to automate tasks such as autoprefixing, minification, linting, and adding future CSS features that may not yet be supported by all browsers. PostCSS processes CSS files and applies the specified transformations, resulting in optimized and compatible stylesheets for web projects.

PostCSS is used over traditional CSS preprocessors like Sass or LESS when developers want more flexibility in choosing specific plugins for their workflow, rather than relying on a single preprocessor's features.

### What is Accessibility?

<!-- id: x!|n9IYH$!, noteType: Basic-66869 -->

Accessibility refers to the design and development of websites, applications, and digital content in a way that ensures they can be used by people with disabilities.
The goal of accessibility is to create an inclusive digital environment where everyone, regardless of their abilities, can access and interact with online content effectively. This involves following best practices, guidelines (such as the Web Content Accessibility Guidelines - WCAG), and using semantic HTML, proper ARIA (Accessible Rich Internet Applications) attributes, and ensuring keyboard navigability, among other techniques.

### Some important interface considerations for Accessibility

<!-- id: vL!|X$e9bY$, noteType: Basic-66869 -->

Some important interface considerations for Accessibility include:

1. Keyboard Accessibility: Ensure that all interactive elements can be accessed and operated using a keyboard alone.
2. Screen Reader Compatibility: Use semantic HTML and ARIA roles to ensure that screen readers can accurately interpret and convey the content.
3. Color Contrast: Ensure sufficient contrast between text and background colors to make content readable for users with visual impairments.
4. Text Alternatives: Provide alternative text for images, icons, and other non-text content to convey their meaning to users who cannot see them.
5. Responsive Design: Ensure that the interface is usable on various devices and screen sizes, including mobile devices.

### What are Landmark regions?

<!-- id: H9zYk$e!u$, noteType: Basic-66869 -->

Landmark regions are specific areas of a web page that are defined using ARIA (Accessible Rich Internet Applications) roles to help users with assistive technologies navigate the content more easily. These regions provide a way to identify and label different sections of a web page, such as the main content, navigation, header, footer, and complementary content.
HTML5 provides several semantic elements that automatically define landmark regions, such as `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`. Additionally, ARIA roles like `role="banner"`, `role="navigation"`, `role="main"`, `role="complementary"`, and `role="contentinfo"` can be used to explicitly define these regions.
See [here](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) for Common landmark regions

### What are structural roles?

<!-- id: o!|X$e9bY$, noteType: Basic-66869 -->

ARIA provides a set of roles that convey the accessibility semantics of structures on a page. These roles express the meaning that is conveyed by the layout and appearance of elements that organize and structure content, such as headings, lists, and tables.

See [here](https://www.w3.org/WAI/ARIA/apg/practices/structural-roles/) for a list of ARIA structural roles.

### List some common Accessibility patterns

<!-- id: bZL$e9bY$, noteType: Basic-66869 -->

Some common accessibility patterns include:
https://www.w3.org/WAI/ARIA/apg/patterns/

| Pattern              | ARIA Roles                                                     | Keyboard Interaction                                                                 | HTML Structure                                                                                                                                          |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion            | `button`, `region`                                             | `Enter` or `Space` to toggle sections, `Tab` to navigate between headers             | Use `<button>` for headers and `<div>` or `<section>` for content panels                                                                                |
| Alert                | `alert`                                                        | Automatically announced by screen readers                                            | Use a `<div>` or `<section>` with `role="alert"` for important messages                                                                                 |
| Alert Dialog         | `alertdialog`                                                  | `Tab` to navigate, `Escape` to close                                                 | Use a `<div>` or `<section>` with `role="alertdialog"` for modal dialogs                                                                                |
| Breadcrumb           | `navigation`, `list`, `listitem`                               | `Tab` to navigate through breadcrumb links                                           | Use a `<nav>` element with an ordered list `<ol>` for breadcrumb items                                                                                  |
| Button               | `button`                                                       | `Enter` or `Space` to activate                                                       | Use a `<button>` element or a `<div>`/`<span>` with `role="button"` and appropriate keyboard event handlers                                             |
| Carousel             | `region`, `button`, `tabpanel`                                 | `Arrow Left/Right` to navigate slides, `Tab` to focus on controls                    | Use a `<div>` or `<section>` for the carousel container and `<button>` elements for navigation controls                                                 |
| Checkbox             | `checkbox`                                                     | `Space` to toggle, `Tab` to navigate                                                 | Use an `<input type="checkbox">` element                                                                                                                |
| Combobox             | `combobox`, `listbox`, `option`                                | `Arrow Down/Up` to navigate options, `Enter` to select                               | Use an `<input>` for the text field and a `<ul>` or `<div>` for the dropdown list                                                                       |
| Dialog (Modal)       | `dialog`                                                       | `Tab` to navigate, `Escape` to close                                                 | Use a `<div>` or `<section>` with `role="dialog"` for modal dialogs                                                                                     |
| Disclosure           | `button`, `region`                                             | `Enter` or `Space` to toggle visibility, `Tab` to navigate                           | Use a `<button>` for the trigger and a `<div>` or `<section>` for the content                                                                           |
| Feed                 | `feed`, `article`                                              | `Tab` to navigate through articles                                                   | Use a `<div>` or `<section>` with `role="feed"` for the feed container and `<article>` elements for individual posts                                    |
| Grid                 | `grid`, `row`, `gridcell`                                      | `Arrow Keys` to navigate cells, `Tab` to move between rows                           | Use a `<div>` or `<section>` with `role="grid"` for the grid container and nested `<div>` or `<span>` elements for rows and cells                       |
| Landmark Regions     | `banner`, `navigation`, `main`, `complementary`, `contentinfo` | `Landmark Navigation` shortcuts in screen readers                                    | Use semantic HTML5 elements like `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` or corresponding ARIA roles                                   |
| Link                 | `link`                                                         | `Enter` to activate, `Tab` to navigate                                               | Use an `<a>` element for links                                                                                                                          |
| Listbox              | `listbox`, `option`                                            | `Arrow Down/Up` to navigate options, `Enter` to select                               | Use a `<ul>` or `<div>` for the listbox container                                                                                                       |
| Menu and Menubar     | `menu`, `menuitem`, `menubar`                                  | `Arrow Keys` to navigate menu items, `Enter` to activate                             | Use a `<nav>` element with nested `<ul>` and `<li>` elements for menu items                                                                             |
| Menu Button          | `button`, `menu`, `menuitem`                                   | `Enter` or `Space` to open/close menu, `Arrow Keys` to navigate                      | Use a `<button>` for the trigger and a `<ul>` or `<div>` for the menu                                                                                   |
| Meter                | `meter`                                                        | `Tab` to navigate                                                                    | Use a `<meter>` element for displaying a scalar measurement                                                                                             |
| Radio Group          | `radiogroup`, `radio`                                          | `Arrow Keys` to navigate options, `Space` to select                                  | Use `<input type="radio">` elements grouped within a container                                                                                          |
| Slider               | `slider`                                                       | `Arrow Left/Right` to adjust value, `Tab` to navigate                                | Use a `<div>` or `<input type="range">` for the slider control                                                                                          |
| Slider (Multi-thumb) | `slider`                                                       | `Arrow Left/Right` to adjust value, `Tab` to navigate                                | Use a `<div>` or `<input type="range">` for the slider control with multiple thumbs                                                                     |
| Spinbutton           | `spinbutton`                                                   | `Arrow Up/Down` to increment/decrement value, `Tab` to navigate                      | Use an `<input type="number">` or a custom control with appropriate ARIA attributes                                                                     |
| Switch               | `switch`                                                       | `Space` to toggle, `Tab` to navigate                                                 | Use a `<button>` or a custom control with `role="switch"`                                                                                               |
| Table                | `table`, `row`, `columnheader`, `rowheader`, `cell`            | `Tab` to navigate cells, `Arrow Keys` for cell navigation                            | Use `<table>`, `<tr>`, `<th>`, and `<td>` elements for tabular data                                                                                     |
| Tabs                 | `tablist`, `tab`, `tabpanel`                                   | `Arrow Left/Right` to navigate tabs, `Tab` to focus on tab panels                    | Use a `<div>` or `<section>` for the tab container, `<button>` elements for tabs, and `<div>` or `<section>` for tab panels                             |
| Toolbar              | `toolbar`, `button`                                            | `Tab` to navigate buttons, `Enter` or `Space` to activate                            | Use a `<div>` or `<section>` with `role="toolbar"` for the toolbar container and `<button>` elements for individual tools                               |
| Tooltip              | `tooltip`                                                      | `Tab` to focus on the element with the tooltip, `Escape` to dismiss                  | Use a `<div>` or `<span>` with `role="tooltip"` for the tooltip content                                                                                 |
| Tree View            | `tree`, `treeitem`, `group`                                    | `Arrow Keys` to navigate tree items, `Enter` or `Space` to expand/collapse           | Use a `<div>` or `<section>` with `role="tree"` for the tree container and nested `<div>` or `<span>` elements for tree items and groups                |
| Tree Grid            | `treegrid`, `row`, `gridcell`, `treeitem`                      | `Arrow Keys` to navigate cells and tree items, `Enter` or `Space` to expand/collapse | Use a `<div>` or `<section>` with `role="treegrid"` for the tree grid container and nested `<div>` or `<span>` elements for rows, cells, and tree items |
| Window Splitter      | `separator`                                                    | `Arrow Keys` to adjust the splitter position, `Tab` to navigate                      | Use a `<div>` or `<section>` with `role="separator"` for the splitter control                                                                           |
