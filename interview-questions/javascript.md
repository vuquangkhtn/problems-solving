## JavaScript

### What is the Document Object Model (DOM)?

<!-- id: Tm9i!mbr$?, noteType: Basic-66869 -->

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document as a tree of objects, where each object corresponds to a part of the document (e.g., elements, attributes, text). The DOM allows developers to access and manipulate the content, structure, and style of a web page using JavaScript.

### How do you add an event listener to an element?

<!-- id: =C10XTq[%+, noteType: Basic-66869 -->

To add an event listener on an element, first get that element through one of the `document` methods (e.g. `getElementById`).
Then use the element’s `addEventListener` method.

The method receives the event name (e.g. `click`, `keyup`, `mouseup`), the event handler function, and optionally options such as `capture`.

```js
const button = document.getElementById('submit');
function handleClick(e) {
  console.log('Clicked!', e.target);
}
button.addEventListener('click', handleClick, { capture: false });
```

### What is the difference between null and undefined?

<!-- id: 1VAu-op2HU, noteType: Basic-66869 -->

In JavaScript, “undefined” is the default value new variables take, and it means the variable has been defined but it hasn’t been assigned any value just yet.

And “null” is actually a value that signals “no value” or “no object”, it is specifically assigned to the variable by the developer.

### What is the difference between cookies, sessionStorage, and localStorage?

<!-- id: d>3F?Xx3:1, noteType: Basic-66869 -->

When choosing between these three storage mechanisms, consider the following factors: persistence, security, and server access.

For persistence:

- Cookies: Data is sent to the server with every HTTP request, but can be limited in size (4KB). great for authentication and personalization.
- sessionStorage: Data is stored only for the duration of the page session until the browser or tab is closed. perfect for temporary data like form inputs, multiple-step processes, multiple tabs, etc.
- localStorage: Data is stored indefinitely, even after the browser is closed, unless explicitly deleted. Perfect for storing user preferences and settings like theme, language, etc.

For security:

- Cookies: are most secure with HTTP-only flag set, which prevents client-side scripts from accessing the cookie. Used for sensitive data.
- sessionStorage and localStorage: are vulnerable to XSS attacks, so it is important to sanitize user input before storing it in these mechanisms. Used for non-sensitive data.

For server access:

- Cookies: Data is sent to the server with every HTTP request. Essential when the server needs the data.
- sessionStorage and localStorage: are client-side only - perfect for UI state or cached data.

In practice, I use cookies for authentication and server-required data, sessionStorage for temporary data and localStorage for persistent data. The key is matching the storage mechanism to your specific use case while keeping security and performance in mind.

### How does the browser render a website?

<!-- id: 5Bv7_9IB[3, noteType: Basic-66869 -->

### What are closures, and how/why would you use them?

<!-- id: M^wUK1Tr?l, noteType: Basic-66869 -->

A closure is a function that has access to the variables in its outer scope, even after the outer function has returned. In other words, a closure allows a function to “remember” the environment in which it was created.

Closures are commonly used in JavaScript for things like creating private variables and functions, implementing currying, and avoiding memory leaks.

### Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?

<!-- id: xIt4%CGGz8, noteType: Basic (and reversed card)-1cc8b -->

IIFE (Immediately Invoked Function Expression)

Definition

- An IIFE is a function expression that runs immediately after it is created. It creates a private scope and avoids polluting the global scope.

Why `function foo(){}();` throws

- `function foo(){}` is parsed as a function declaration.
- The trailing `();` tries to call a function but there is no expression to call, resulting in `Uncaught SyntaxError: Unexpected token )`.

Correct syntax

```js
(function foo() {
  // code
})();
// or
(function foo() {
  // code
})();
// or using arrow functions
(() => {
  // code
})();
```

Why parentheses matter

- Wrapping the function in `()` turns the declaration into a function expression, which can then be immediately invoked with the trailing `()`.
- The function does not leak into the global scope; you may omit the name unless self-reference is needed.

Using `void` (and its caveat)

```js
const result = void (function bar() {
  return 'foo';
})();
console.log(result); // undefined
```

- `void` forces the expression to evaluate to `undefined`, so you cannot use the function’s return value. Prefer the parentheses form if you need the returned value.

Typical use cases

- Create a one-off initialization.
- Encapsulate variables and avoid globals.
- Implement module patterns or set up event listeners with private state.

### Explain how **this** works in JavaScript

<!-- id: lSIl-tvZ<*, noteType: Basic (and reversed card)-1cc8b -->

The value of `this` depends on how the function is called.

Rules:

- Called with `new`: `this` is a brand new object.
- Called via `apply`, `call`, or `bind`: `this` is the object passed as the first argument.
- Called as a method (e.g., `obj.method()`): `this` is the object owning the method.
- Called as a plain function: `this` is the global object (`window` in browsers). In strict mode, `this` is `undefined`.
- If multiple rules apply, precedence determines `this`.
- Arrow functions ignore all above and capture `this` from the enclosing lexical scope at creation.

ES6 changes:

- Arrow functions use enclosing lexical `this`. This is convenient but prevents callers from controlling context via `.call` or `.apply`.
- Be mindful when refactoring legacy code relying on dynamic `this` binding.

References:

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

### Explain how prototypal inheritance works

<!-- id: sSRksn3Lj>, noteType: Basic (and reversed card)-1cc8b -->

All JavaScript objects have a `prototype` property that references another object.
When a property is accessed on an object and is not found, the engine looks up the prototype chain until it finds the property or reaches the end.
This behavior simulates classical inheritance but is more accurately delegation.

Example: polyfill for `Object.create`

```js
if (typeof Object.create !== 'function') {
  Object.create = function (parent) {
    function Tmp() {}
    Tmp.prototype = parent;
    return new Tmp();
  };
}
```

Example: inheritance via prototypes

```js
function Parent() {
  this.name = 'Parent';
}
Parent.prototype.greet = function () {
  console.log('hello from Parent');
};

const child = Object.create(Parent.prototype);
child.cry = function () {
  console.log('waaaaaahhhh!');
};

child.cry(); // waaaaaahhhh!
child.greet(); // hello from Parent
```

Notes:

- `.greet` is not defined on `child`, so the engine goes up the prototype chain and finds it on `Parent.prototype`.
- Use `Object.create(Parent.prototype)` for prototype methods to be inherited.
- `child.constructor` points to `Parent` by default.

Correcting `constructor` with a subtype

```js
function Child() {
  Parent.call(this);
  this.name = 'child';
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const c = new Child();
c.cry = function () {
  console.log('waaaaaahhhh!');
};
c.cry(); // waaaaaahhhh!
c.greet(); // hello from Parent
console.log(c.constructor.name); // 'Child'
```

References:

- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects
- https://crockford.com/javascript/prototypal.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

### What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?

<!-- id: uxIl-AwVOe, noteType: Basic (and reversed card)-1cc8b -->

Undeclared

- Created when assigning to an identifier not previously declared with `var`, `let`, or `const`.
- Defined globally (outside current scope). In strict mode, a `ReferenceError` is thrown on assignment.
- Avoid at all costs. To detect, wrap usage in `try/catch`.

```js
function foo() {
  x = 1;
} // ReferenceError in strict mode
try {
  foo();
} catch (e) {
  console.error(e);
}
```

Undefined

- Declared but not assigned a value; type is `undefined`.
- Functions without a return value evaluate to `undefined`.
- Check using strict equality or `typeof`. Do not use `==` which also matches `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true
console.log(foo == null); // true (wrong check)

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

Null

- Explicitly assigned `null` represents no value; different from `undefined`.
- Check using strict equality; avoid `==` which matches `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true
console.log(foo == undefined); // true (wrong check)
```

Personal habit: explicitly assign `null` if a variable is declared but not yet used.
Linters will help catch references to undeclared variables.

References:

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

### What is a closure, and how/why would you use one?

<!-- id: B#B(?XiGcl, noteType: Basic (and reversed card)-1cc8b -->

A closure gives you access to an outer function's scope from an inner function.
It combines a function and the lexical environment in which it was declared.

Closure scope chains:

1. Own scope (variables defined within the function).
2. Outer function variables.
3. Global variables.

Why use closures?

- Data privacy / emulate private methods (module pattern).
- Partial application or currying.

Reference: Closures - JavaScript | MDN (mozilla.org).

### Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?

<!-- id: L3n$_#_Xnp, noteType: Basic (and reversed card)-1cc8b -->

To understand the differences, consider what each function does.

`.forEach`

- Iterates through array elements.
- Executes a callback for each element.
- Does not return a value.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index
});
console.log(doubled); // undefined
```

`.map`

- Iterates through array elements.
- Maps each element to a new element by calling a function on each element, creating a new array.

```js
const a = [1, 2, 3];
const doubled = a.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]
```

Main difference:

- `.map()` returns a new array. If you need the result and do not wish to mutate the original array, `.map()` is the clear choice.
- If you simply need to iterate over an array, `.forEach` is fine.

### What's the difference between host objects and native objects?

<!-- id: j&fIguVlLP, noteType: Basic (and reversed card)-1cc8b -->

Native objects are part of the JavaScript language defined by the ECMAScript specification (e.g., `String`, `Math`, `RegExp`, `Object`, `Function`).
Host objects are provided by the runtime environment (browser or Node), such as `window`, `XMLHttpRequest`, etc.

### What's the difference between .bind, .call and .apply?

<!-- id: u$0(Ek&Zf2, noteType: Basic (and reversed card)-1cc8b -->

`call` and `apply` invoke a function immediately and set `this`.

- `call(thisArg, a, b)` — comma-separated arguments.
- `apply(thisArg, [a, b])` — arguments as an array.
  `bind` returns a new function with `this` (and optionally leading args) fixed.

```js
function add(a, b) {
  return a + b;
}
console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3

function Temp() {
  this.c = 1;
}
Temp.prototype.add = function (a, b) {
  return (this.c || 0) + a + b;
};

const temp = new Temp();
console.log(temp.add(1, 2)); // 4
console.log(temp.add.call({ c: 2 }, 1, 2)); // 5
console.log(temp.add.apply({ c: 3 }, [1, 2])); // 6

const bound = temp.add.bind({ c: 4 });
console.log(bound(1, 2)); // 7
```

### Explain Function.prototype.bind.

<!-- id: d=D4Joc)~F, noteType: Basic (and reversed card)-1cc8b -->

Definition

- `bind(thisArg, ...args)` returns a new function with `this` fixed to `thisArg` and optionally prepends `args`.

Why use it

- Preserve method `this` when passing as a callback.
- Partially apply leading arguments.

Example

```js
const module = {
  x: 42,
  getX() {
    return this.x;
  },
};

const unbound = module.getX;
console.log(unbound()); // undefined in strict mode

const bound = module.getX.bind(module);
console.log(bound()); // 42

function add(a, b, c) {
  return a + b + c;
}
const add5 = add.bind(null, 5);
console.log(add5(1, 2)); // 8
```

### Have you ever used JavaScript templating? If so, what libraries have you used?

<!-- id: P_L+L6Fx^f, noteType: Basic (and reversed card)-1cc8b -->

Libraries used

- Handlebars, Underscore/Lodash templates, AngularJS, JSX.

Notes

- JSX is concise and type-friendly; AngularJS string-heavy templates are prone to typos.
- ES2015 template literals work for simple templates but do not escape by default.

Example

```js
const name = 'Ada';
const template = `<div>My name is: ${name}</div>`;
// Beware: interpolation is not escaped — sanitize user input to prevent XSS.
```

### "Explain ""hoisting""."

<!-- id: NO?|xWO8/f, noteType: Basic (and reversed card)-1cc8b -->

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Remember that JavaScript only hoists declarations, not initialisation.

Example

```js
// Function declarations are hoisted
hoisted(); // works
function hoisted() {}

// var is hoisted (initialized to undefined)
console.log(a); // undefined
var a = 1;

// let/const are in the Temporal Dead Zone
// console.log(b); // ReferenceError
let b = 2;
```

### Describe event bubbling.

<!-- id: OvAxocDxWd, noteType: Basic (and reversed card)-1cc8b -->

When an event triggers on a DOM element, it is handled on that element and then bubbles up through ancestors to the document. Bubbling enables event delegation.

```html
<ul id="list">
  <li>Item</li>
</ul>
<script>
  document.getElementById('list').addEventListener('click', (e) => {
    // Delegate: handle clicks on child <li> elements
    if (e.target.tagName === 'LI') {
      console.log('Clicked:', e.target.textContent);
    }
  });
</script>
```

### "What's the difference between an ""attribute"" and a ""property""?"

<!-- id: t#z{vItZ[o, noteType: Basic (and reversed card)-1cc8b -->

Attributes are defined in HTML markup; properties are defined on the DOM node.
Example:

```html
<input type="text" value="Hello" />
```

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello

// After changing the field value to "World!"
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

### What is the difference between == and ===?

<!-- id: GPr)]um6Aa, noteType: Basic (and reversed card)-1cc8b -->

`==` is the abstract equality operator; `===` is the strict equality operator.
`==` compares after type conversion; `===` does not convert types.

Examples of `==` pitfalls:

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

Advice: avoid `==` except when comparing against `null` or `undefined` for convenience.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

### Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?

<!-- id: Di;q&0JI2e, noteType: Basic (and reversed card)-1cc8b -->

Every script has access to the global scope, and if everyone uses the global scope to define their variables, collisions will likely occur

### Explain what a single page app is and how to make one SEO-friendly.

<!-- id: QR/fx-@j4R, noteType: Basic (and reversed card)-1cc8b -->

Definition

- A Single Page Application (SPA) uses client-side rendering; navigation updates the URL without full page reloads.

Benefits

- Responsive navigation without flash between pages.
- Fewer repeated asset downloads; clearer client/server separation.

Downsides

- Heavier initial load.
- Requires server routing to a single entry point.
- Content relies on JS execution, which can hurt SEO if crawlers don’t run JS.

SEO-friendly approaches

- Server-Side Rendering (SSR) or Static Site Generation (SSG).
- Pre-rendering services (e.g., Prerender.io) to serve HTML to crawlers.
- Ensure metadata: dynamic `<title>`, `<meta>` tags, canonical links.
- Generate sitemap and use structured data where appropriate.

### What are the pros and cons of using Promises instead of callbacks?

<!-- id: Gro(j1-0.P, noteType: Basic (and reversed card)-1cc8b -->

Pros

- Avoids callback hell; supports readable chaining via `.then()`.
- Easy parallelism with `Promise.all`.
- Safer semantics: avoids early/late/multiple callback invocation and error swallowing.

Cons

- Slightly more complex semantics for beginners.
- Requires polyfills in older environments.

### What is Promises?

<!-- id: f4B<J6Zi=J, noteType: Basic (and reversed card)-1cc8b -->

Definition

- A Promise represents a future value: `pending` → `fulfilled` or `rejected`.
- `then`/`catch` return new promises, enabling chaining.

Example

```js
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('data'), 100);
  });

fetchData()
  .then((v) => v.toUpperCase())
  .catch((err) => console.error(err));
```

### What tools and techniques do you use for debugging JavaScript code?

<!-- id: xOaFh|/qlF, noteType: Basic (and reversed card)-1cc8b -->

Tools

- Chrome DevTools (sources, network, performance)
- React DevTools, Redux DevTools; Vue DevTools

Techniques

- `debugger` statements to pause execution.
- Structured `console.*` logging; log levels and grouping.
- Narrow repro cases; isolate async flows and side effects.

### Explain the difference between mutable and immutable objects.

<!-- id: h[x>(Ez0c~, noteType: Basic (and reversed card)-1cc8b -->

Definitions

- Mutable: state can change after creation.
- Immutable: state cannot change after creation.

Built-in

- Primitives like numbers and strings are immutable; regular objects are mutable.

Approaches

```js
// Constant property
const myObject = {};
Object.defineProperty(myObject, 'number', {
  value: 42,
  writable: false,
  configurable: false,
});

// Prevent extensions
const obj = { a: 2 };
Object.preventExtensions(obj);
obj.b = 3; // ignored or TypeError in strict mode

// Seal
const sealed = Object.seal({ a: 1 }); // no adding/removing, can change values

// Freeze
const frozen = Object.freeze({ a: 1 }); // no adding/removing/changing
```

### Explain the difference between synchronous and asynchronous functions.

<!-- id: nVy)4CLX9l, noteType: Basic (and reversed card)-1cc8b -->

Synchronous

- Blocks until work completes; code runs in order.

Asynchronous

- Returns immediately; completion handled via callbacks/promises/async-await.
- Keeps UI responsive in browsers.

Example

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Output: A, C, B
```

### What is event loop? What is the difference between call stack and task queue?

<!-- id: P-jr#X^8>., noteType: Basic (and reversed card)-1cc8b -->

Event loop

- Monitors the call stack; when empty, dequeues tasks from queues to execute.

Queues

- Macro-task queue: `setTimeout`, I/O callbacks.
- Micro-task queue: promises (`then`/`catch`), `queueMicrotask` — runs before macro-tasks between ticks.

Example

```js
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('end');
// start, end, microtask, timeout
```

### What are the differences between variables created using let, var or const?

<!-- id: pTgUpHtFDS, noteType: Basic (and reversed card)-1cc8b -->

Scope

- `var`: function-scoped.
- `let`/`const`: block-scoped.

```js
function foo() {
  var a = 1;
  let b = 2;
  const c = 3;
}
// a,b,c not accessible outside
```

Hoisting

- `var` is hoisted and initialized to `undefined`.
- `let`/`const` are hoisted but in Temporal Dead Zone until declared.

```js
console.log(v); // undefined
var v = 'v';
// console.log(l); // ReferenceError
let l = 'l';
```

Redeclaration & reassignment

- `var` allows redeclaration; `let`/`const` do not.
- `let` allows reassignment; `const` does not.

```js
var x = 'x';
var x = 'x2'; // ok
let y = 'y'; // let y = 'y2'; // SyntaxError
const z = 'z'; // z = 'z2'; // TypeError
```

### JavaScript (ES5) vs ES6

<!-- id: l`fNWr-H@K, noteType: Basic-66869 -->

Summary

- ES6 (2015) introduced major features atop ES5: `let`/`const`, arrow functions, classes, template literals, destructuring, spread/rest, modules (`import`/`export`), promises, default parameters.
- Largely backward compatible; improves scoping, async handling, and code organization.

### What is the Temporal Dead Zone

<!-- id: F#r]86%E*(, noteType: Basic-66869 -->

The Temporal Dead Zone is a behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. The time span between the creation of a variable’s binding and its declaration, is called the temporal dead zone.

Example

```js
// Access before declaration throws
// console.log(a); // ReferenceError
let a = 1;
```

### What is heap

<!-- id: A9v{;c}-dj, noteType: Basic-66869 -->

Heap(Or memory heap) is the memory location where objects are stored when we define variables.

### What is a microTask queue

<!-- id: mckQna;YlZ, noteType: Basic-66869 -->

Microtask queue processes tasks (e.g., promise callbacks) before the macrotask/callback queue between event loop ticks.

```js
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
// Output: micro, macro
```

### What is babel

<!-- id: go^E&z*,T9, noteType: Basic-66869 -->

Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments

### What is the difference between Function constructor (new Function) and function declaration

<!-- id: nZqel6X)2V, noteType: Basic-66869 -->

`new Function` creates functions in the global scope and does not close over local variables; declarations/expressions do close over outer scopes.

```js
function outer() {
  const secret = 1;
  const f1 = function () {
    return secret;
  }; // closes over secret
  const f2 = new Function('return typeof secret'); // 'undefined'
  return [f1(), f2()];
}
console.log(outer()); // [1, 'undefined']
```

### What is the difference between function and class declaration

<!-- id: G~0z.k{&dh, noteType: Basic-66869 -->

Hoisting

- Function declarations are hoisted.
- Class declarations are hoisted but not initialized; accessing before definition throws.

```js
foo(); // ok
function foo() {}

// new Bar(); // ReferenceError: Cannot access 'Bar' before initialization
class Bar {}
```

### What are the different kinds of generators

<!-- id: i]I,Q{rAlj, noteType: Basic-66869 -->

Kinds

- Generator function declaration
- Generator function expression
- Generator method in object literal
- Generator method in class
- Computed property generator (e.g., `Symbol.iterator`)

```js
function* decl() {
  yield 1;
  yield 2;
}
const expr = function* () {
  yield 1;
  yield 2;
};
const obj = {
  *gen() {
    yield 1;
    yield 2;
  },
};
class C {
  *gen() {
    yield 1;
    yield 2;
  }
}
const iterObj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  },
};
console.log(Array.from(iterObj)); // [1, 2]
```

### What is the difference between setTimeout, setImmediate and process.nextTick?

<!-- id: s<_},]>oRd, noteType: Basic-66869 -->

Node.js

- `setTimeout(cb, ms)`: schedule after delay (macrotask).
- `setImmediate(cb)`: schedule after current poll phase completes (macrotask, often after I/O).
- `process.nextTick(cb)`: schedule microtask; runs before other queued work — use sparingly to avoid starvation.

### debounce vs throttle

<!-- id: OT)=[.-|$s, noteType: Basic-66869 -->

Definitions

- Debounce: delay execution until events stop for `n` ms.
- Throttle: execute at most once every `n` ms during a burst of events.

```js
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}
```

### """1"" + true - ""1"""

<!-- id: j<cP[%<ZSO, noteType: Basic-66869 -->

```js
'1' + true; // '1true' (string concatenation)
'1true' - '1'; // NaN (numeric subtraction on non-numeric string)
```

### "const a = ""abc"" a[2] = ""d"" console.log(a);"

<!-- id: idh*]GpS!<, noteType: Basic-66869 -->

```js
const a = 'abc';
a[2] = 'd';
console.log(a); // 'abc' — strings are immutable
```

### const obj = { name: 'Quang', // showName: function () {} showName(age) { // method console.log(`123 ${this.name} ${age}`); } } const showName = obj.showName; showName();

<!-- id: jUcLeHGnnA, noteType: Basic-66869 -->

```js
const person = { name: 'Anna' };
const obj = {
  name: 'Quang',
  showName(age) {
    console.log(`123 ${this.name} ${age}`);
  },
};
const showName = obj.showName;
showName(); // 123 undefined undefined — plain call, undefined this

showName.call(person, 23); // 123 Anna 23
showName.apply(person, [23]); // 123 Anna 23
```

### Arrow function vs function declaration. Give Example

<!-- id: is?vWdm;EP, noteType: Basic-66869 -->

Key differences

- Arrow functions: lexical `this`, no `arguments`, not constructible.
- Regular functions: own `this`, have `arguments`, constructible with `new`.

```js
const arrow = (...args) => args.length;
function regular() {
  return arguments.length;
}

console.log(arrow(1, 2)); // 2
console.log(regular(1, 2)); // 2

// new arrow(); // TypeError: arrow is not a constructor
function C() {}
new C(); // ok
```

### Bubbling and Capturing

<!-- id: Ncgx-}+!hR, noteType: Basic-66869 -->

"Bubbling and capturing (javascript.info) Bubbling and capturing describe the two phases of event propagation in the DOM when an event occurs on an element with ancestors. Bubbling (default): The event starts at the target element and then ""bubbles"" upwards through its parent elements in the DOM hierarchy, triggering event listeners attached to those ancestors along the way. Capturing: The event starts at the root of the DOM and ""captures"" downwards through the ancestors to the target element, triggering event listeners attached to those ancestors before reaching the target. Capturing is enabled by passing true as the third argument to addEventListener(). Both phases contribute to the event flow, allowing for flexible event handling and techniques like event delegation. Capturing happens before bubbling in Event Propagation If event.stopPropagation() is called during the capturing phase, then the event travel stops, no bubbling will occur. Non-bubbling events such as focus, blur, load can be handled by Capturing"

### [Array] iterative methods and empty slots

<!-- id: mQQ}XK2yh$, noteType: Basic-66869 -->

"iterative methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods iterative methods behave differently with empty slots sparse arrays: Arrays can contain ""empty slots"" -> Array methods and empty slots: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots"

### CommonJS vs ESM

<!-- id: c3{N:m-cw/, noteType: Basic-66869 -->

CommonJS (CJS) uses synchronous require() and module.exports syntax, designed for Node.js, while ECMAScript Modules (ESM) use asynchronous import and export syntax, serving as the official JavaScript standard and supporting native browser environments and Node.js. The main distinctions are their syntax, synchronous vs. asynchronous module loading, and compatibility with different environments. ESM is the future standard, offering benefits like tree shaking and better performance, while CommonJS is still prevalent in the existing Node.js ecosystem. CommonJS (CJS) Syntax: Uses require() to import modules and module.exports to export them. Loading: Loads modules synchronously, which can block execution until the module is loaded. Environment: Primarily used in Node.js. Characteristics: Has been the long-standing standard for server-side JavaScript in Node.js. Provides Node-specific variables like **dirname and **filename. ECMAScript Modules (ESM) Syntax: Uses import and export keywords for module management. Loading: Supports asynchronous loading, enabling better parallelism. Environment: Natively supported in modern web browsers and modern Node.js environments. Characteristics: The official, standardized module system for JavaScript. Enables static analysis of dependencies, leading to more efficient tree shaking (dead code elimination). More suitable for modern web applications due to native browser support and performance benefits. Key Differences at a Glance Feature CommonJS (CJS) ECMAScript Modules (ESM) Syntax require() and module.exports import and export Loading Synchronous Asynchronous Standard De facto standard for Node.js Official JavaScript standard Browser Support Not native Native When to Use Which Use CommonJS for: Older Node.js projects or environments where it's the established standard and you prioritize simplicity. Use ESM for: Modern web applications, new Node.js projects, and situations where you need better performance, native browser support, and advanced features like tree shaking.

### var vs let vs const

<!-- id: E>Br&4AKXa, noteType: Basic-66869 -->

"In JavaScript, var, let, and const are keywords used to declare variables, each with distinct characteristics regarding scope, reassignment, and hoisting. 1. Scope: var: Variables declared with var have function scope or global scope. This means they are accessible throughout the entire function in which they are declared, or globally if declared outside any function.let: Variables declared with let have block scope. They are only accessible within the specific block (e.g., if statements, for loops, or any curly braces {}) where they are defined.const: Similar to let, const also provides block scope. 2. Reassignment: var: Variables declared with var can be reassigned and redeclared within the same scope. let: Variables declared with let can be reassigned, but they cannot be redeclared within the same block scope. const: Variables declared with const cannot be reassigned after their initial assignment. They are used to declare constants or read-only references. However, if a const variable holds an object or array, its properties or elements can be modified, but the variable itself cannot be pointed to a different object or array. 3. Hoisting: var: Variables declared with var are hoisted to the top of their function or global scope. This means they can be accessed before their declaration, though their value will be undefined until the actual assignment. let and const: Variables declared with let and const are also hoisted, but they are subject to the ""Temporal Dead Zone"" (TDZ). This means accessing them before their declaration will result in a ReferenceError. In summary: Use const for values that should not change throughout the program's execution.Use let for variables whose values might need to be reassigned later in the code.Avoid using var in modern JavaScript development due to its less predictable scoping behavior, which can lead to unexpected bugs. let and const offer more controlled and intuitive variable declaration."

Event capturing goes top-down (document → target); bubbling goes bottom-up (target → document). You can choose phase with the third parameter of `addEventListener`:

```js
el.addEventListener('click', handler, { capture: true }); // capture phase
el.addEventListener('click', handler); // bubble phase (default)
```
