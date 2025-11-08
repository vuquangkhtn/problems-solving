# JavaScript

[[toc]]

### What is the Document Object Model (DOM)?

<!-- id: Tm9i!mbr$?, noteType: Basic-66869 -->

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document as a tree of objects, where each object corresponds to a part of the document (e.g., elements, attributes, text). The DOM allows developers to access and manipulate the content, structure, and style of a web page using JavaScript.

### How do you add an event listener to an element?

<!-- id: =C10XTq[%+, noteType: Basic-66869 -->

To add an event listener on an element, first get that element through one of the `document` methods (e.g. `getElementById`).
Then use the element’s `addEventListener` method.
The method receives the event name (e.g. `click`, `keyup`, `mouseup`), the event handler function, and optionally options such as `capture`.

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

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

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

Event propagation has two phases when an event fires on a target with ancestors:

- Capturing (top-down): The event travels from `document` → ancestors → target.
- Bubbling (bottom-up, default): The event travels from target → ancestors → `document`.

Practical notes

- Choose the phase via `addEventListener` options: `{ capture: true }` for capturing; omit for bubbling.
- Use bubbling for event delegation (attach one listener on a container to handle many children).
- Call `event.stopPropagation()` to stop further propagation in the current phase.
- Some events don’t bubble (e.g., `focus`, `blur`, `load`). Use capturing or `focusin`/`focusout`.

Example

```html
<div id="outer">
  <button id="inner">Click</button>
  <!-- click me -->
</div>
<script>
  const outer = document.getElementById('outer');
  const inner = document.getElementById('inner');

  outer.addEventListener('click', () => console.log('outer capture'), { capture: true });
  outer.addEventListener('click', () => console.log('outer bubble'));
  inner.addEventListener('click', (e) => {
    console.log('inner target');
    // e.stopPropagation(); // uncomment to prevent bubbling to outer
  });
  // Logs order: outer capture → inner target → outer bubble
</script>
```

Reference: https://javascript.info/bubbling-and-capturing

### [Array] iterative methods and empty slots

<!-- id: mQQ}XK2yh$, noteType: Basic-66869 -->

Sparse arrays can contain empty slots (holes), which are different from elements whose value is `undefined`.

Key behaviors

- Most iterative methods skip holes: `forEach`, `map`, `filter`, `some`, `every`, `find` (callbacks are not invoked for holes).
- `reduce`/`reduceRight` skip holes but still compute over existing elements.
- Iteration utilities like `for...of` and spread (`[...]`) skip holes.
- `Array.from` converts holes to `undefined` (normalizes the array).
- `flat` removes holes; they are treated as empty entries.
- `index in arr` distinguishes holes from `undefined` values.

Examples

```js
const a = [, 2, , 4]; // holes at 0 and 2

a.map((x) => x * 2); // [ , 4, , 8 ] — holes preserved
a.forEach((x) => console.log(x)); // logs 2, 4 — holes skipped
a.filter(Boolean); // [2, 4] — holes skipped
Array.from(a); // [undefined, 2, undefined, 4]
[...a]; // [2, 4] — holes skipped
a.flat(); // [2, 4] — holes removed
0 in a; // false (hole)
a[0] = undefined;
0 in a; // true (present element with undefined)
```

Reference: MDN — Array methods and empty slots
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots

### CommonJS vs ESM

<!-- id: c3{N:m-cw/, noteType: Basic-66869 -->

Quick differences

- Syntax: CJS uses `require`/`module.exports`; ESM uses `import`/`export`.
- Loading: CJS is synchronous; ESM is asynchronous and supports top‑level `await`.
- Analysis: ESM enables static analysis (tree‑shaking, bundling optimizations) and live bindings.
- Environment: CJS is the legacy Node.js format; ESM is the official JS standard, native in browsers and modern Node.

Examples

```js
// CommonJS
const fs = require('fs');
function sum(a, b) {
  return a + b;
}
module.exports = { sum };

// ECMAScript Modules
import fs from 'node:fs';
export function sum(a, b) {
  return a + b;
}
export default sum;
```

Node.js interop notes

- Use `"type": "module"` in `package.json` or `.mjs` files for ESM in Node.
- In ESM, use `import.meta.url`; `__dirname`/`__filename` are not defined.
- From ESM, load CJS via `createRequire` or a compatible import; from CJS, load ESM via dynamic `import()`.

When to use

- Choose ESM for modern apps, browsers, and code that benefits from tree‑shaking.
- Use CJS for older Node projects or when a dependency only supports CJS.

### var vs let vs const

<!-- id: E>Br&4AKXa, noteType: Basic-66869 -->

Core differences

- Scope: `var` is function/global scoped; `let`/`const` are block scoped.
- Redeclare/reassign: `var` can redeclare; `let` cannot redeclare; `const` cannot reassign.
- Hoisting: `var` hoists and initializes to `undefined`; `let`/`const` hoist into the Temporal Dead Zone (ReferenceError until declared).
- Global binding: `var` at top level creates a property on `window` (browsers); `let`/`const` do not.

Examples

```js
console.log(x); // undefined — var hoisted
var x = 1;

// console.log(y); // ReferenceError — TDZ
let y = 2;

if (true) {
  let a = 10; // block-scoped
  var b = 20; // function-scoped
}
// a is not accessible here; b is

// Loop closures
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 3, 3, 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j), 0); // 0, 1, 2
```

Best practice

- Prefer `const` by default; use `let` when you need reassignment.
- Avoid `var` in modern code to reduce scoping/hoisting pitfalls.

### What is window object in JavaScript?

The `window` is the global object in browsers. It represents the current browser window or tab and acts as the top‑level scope for non‑module scripts. It owns the `document` and exposes the Browser Object Model (BOM): navigation, history, storage, timers, and more.

Key responsibilities

- Global scope for scripts (`var` declarations attach to `window`).
- Owns the DOM via `window.document`.
- Provides BOM APIs: `location`, `history`, `navigator`, `screen`, `console`.
- Manages timers and rendering: `setTimeout`, `setInterval`, `requestAnimationFrame`.
- Exposes storage and events: `localStorage`, `sessionStorage`, `addEventListener`.

Notes

- In ES modules, top‑level `this` is `undefined`; use `globalThis` if you need a global reference.
- In Node.js there is no `window`; `globalThis` is the cross‑platform alias.
- Avoid polluting `window` with globals; prefer module scope or namespaces.

Example

```js
// BOM and global scope examples
window.addEventListener('resize', () => {
  console.log('width:', window.innerWidth);
});
console.log(window.document.title);
console.log(window.location.href);
setTimeout(() => console.log('tick'), 100);
```

### Global Scopes for var vs let/const

- In non‑module scripts, top‑level `var` and function declarations create `window` properties; `let`/`const` create global bindings that do not attach to `window`.
- In ES modules, no top‑level declarations (including `var`) attach to `window` — use `window.foo = ...` or `globalThis.foo = ...` if you need a global property.
- ES module variables attach to the module’s own scope (module environment record) and are accessible outside only via `export`/`import`.

- Global binding: a top‑level `let`/`const` name lives in the global lexical environment; it’s accessible as an identifier but is not a `window` property and cannot be removed with `delete`.
- Global lexical environment: is the outermost scope in which code is executed. It is created when a script begins execution and represents the top-level environment for all variables, functions, and objects defined in the global scope.

Example

```

// Global bindings vs window properties
var a = 1;
let b = 2;
const c = 3;
console.log(window.a); // 1
console.log(window.b); // undefined
console.log('c' in window); // false

// ES module scope (module.js and other.js)
// module.js
export const x = 1;
// Not on window: window.x === undefined

// other.js
import { x } from './module.js';
console.log(x); // 1

```
