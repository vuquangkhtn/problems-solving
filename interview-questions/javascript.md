## JavaScript

### What is the Document Object Model (DOM)?
<!-- id: Tm9i!mbr$?, noteType: Basic-66869 -->

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document as a tree of objects, where each object corresponds to a part of the document (e.g., elements, attributes, text). The DOM allows developers to access and manipulate the content, structure, and style of a web page using JavaScript.

### How do you add an event listener to an element?
<!-- id: =C10XTq[%+, noteType: Basic-66869 -->

To add an event listener on an element, you have to first “get” that element through one of the many methods of the document object (i.e. getElementById, etc) and then use the addEventListener method of the obtained object.

The method will receive the event name (i.e. ‘click’, ‘keyup’, ‘mouseup’, etc), the event handler function and, optionally, a boolean indicating whether the event should be captured during the capturing phase.

### What is the difference between null and undefined?
<!-- id: 1VAu-op2HU, noteType: Basic-66869 -->

In JavaScript, “undefined” is the default value new variables take, and it means the variable has been defined but it hasn’t been assigned any value just yet.

And “null” is actually a value that signals “no value” or “no object”, it is specifically assigned to the variable by the developer.

### What is the difference between cookies, sessionStorage, and localStorage?
<!-- id: d>3F?Xx3:1, noteType: Basic-66869 -->



### How does the browser render a website?
<!-- id: 5Bv7_9IB[3, noteType: Basic-66869 -->



### What are closures, and how/why would you use them?
<!-- id: M^wUK1Tr?l, noteType: Basic-66869 -->



### Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?
<!-- id: xIt4%CGGz8, noteType: Basic (and reversed card)-1cc8b -->

IIFE stands for Immediately Invoked Function Expressions. The JavaScript parser reads function foo(){ }(); as function foo(){ } and ();, where the former is a function declaration and the latter (a pair of parentheses) is an attempt at calling a function but there is no name specified, hence it throws Uncaught SyntaxError: Unexpected token ).Here are two ways to fix it that involves adding more parentheses: (function foo(){ })() and (function foo(){ }()). Statements that begin with function are considered to be function declarations; by wrapping this function within (), it becomes a function expression which can then be executed with the subsequent (). These functions are not exposed in the global scope and you can even omit its name if you do not need to reference itself within the body.You might also use void operator: void function foo(){ }();. Unfortunately, there is one issue with such approach. The evaluation of given expression is always undefined, so if your IIFE function returns anything, you can't use it. An example:// Don't add JS syntax to this code block to prevent Prettier from formatting it. const foo = void function bar() { return 'foo'; }(); console.log(foo); // undefined Referenceshttp://lucybain.com/blog/2014/immediately-invoked-function-expression/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

### Explain how this works in JavaScript
<!-- id: lSIl-tvZ<*, noteType: Basic (and reversed card)-1cc8b -->

Basically, the value of this depends on how the function is called.The following rules are applied:If the new keyword is used when calling the function, this inside the function is a brand new object.If apply, call, or bind are used to call/create a function, this inside the function is the object that is passed in as the argument.If a function is called as a method, such as obj.method() — this is the object that the function is a property of.If a function is invoked without any of the conditions present above, this is the global object. In a browser, it is the window object. If in strict mode ('use strict'), this will be undefined instead of the global object.If multiple of the above rules apply, the rule that is higher wins and will set the this value.If the function is an ES2015 arrow function, it ignores all the rules above and receives the this value of its surrounding scope at the time it is created.For an in-depth explanation, do check out his article on Medium.Can you give an example of one of the ways that working with this has changed in ES6?ES6 allows you to use arrow functions which uses the enclosing lexical scope. This is usually convenient, but does prevent the caller from controlling context via .call or .apply—the consequences being that a library such as jQuery will not properly bind this in your event handler functions. Thus, it's important to keep this in mind when refactoring large legacy applications.Referenceshttps://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3https://stackoverflow.com/a/3127440/1751946

### Explain how prototypal inheritance works
<!-- id: sSRksn3Lj>, noteType: Basic (and reversed card)-1cc8b -->

"All JavaScript objects have a prototype property, that is a reference to another object. When a property is accessed on an object and if the property is not found on that object, the JavaScript engine looks at the object's prototype, and the prototype's prototype and so on, until it finds the property defined on one of the prototypes or until it reaches the end of the prototype chain. This behavior simulates classical inheritance, but it is really more of delegation than inheritance.Example of Prototypal InheritanceWe already have a build-in Object.create, but if you were to provide a polyfill for it, that might look like:if (typeof Object.create !== 'function') { Object.create = function (parent) { function Tmp() {} Tmp.prototype = parent; return new Tmp(); }; } const Parent = function() { this.name = ""Parent""; } Parent.prototype.greet = function() { console.log(""hello from Parent""); } const child = Object.create(Parent.prototype); child.cry = function() { console.log(""waaaaaahhhh!""); } child.cry(); // Outputs: waaaaaahhhh! child.greet(); // Outputs: hello from ParentThings to note are:.greet is not defined on the child, so the engine goes up the prototype chain and finds .greet off the inherited from Parent.We need to call Object.create in one of following ways for the prototype methods to be inherited:Object.create(Parent.prototype);Object.create(new Parent(null));Object.create(objLiteral);Currently, child.constructor is pointing to the Parent:child.constructor ƒ () { this.name = ""Parent""; } child.constructor.name ""Parent""If we'd like to correct this, one option would be to do:function Child() { Parent.call(this); this.name = 'child'; } Child.prototype = Parent.prototype; Child.prototype.constructor = Child; const c = new Child(); c.cry(); // Outputs: waaaaaahhhh! c.greet(); // Outputs: hello from Parent c.constructor.name; // Outputs: ""Child""Referenceshttps://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpsonhttps://davidwalsh.name/javascript-objectshttps://crockford.com/javascript/prototypal.htmlhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"

### What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?
<!-- id: uxIl-AwVOe, noteType: Basic (and reversed card)-1cc8b -->

Undeclared variables are created when you assign a value to an identifier that is not previously created using var, let or const. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a ReferenceError will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a try/catch block.function foo() { x = 1; // Throws a ReferenceError in strict mode } foo(); console.log(x); // 1A variable that is undefined is a variable that has been declared, but not assigned a value. It is of type undefined. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of undefined. To check for it, compare using the strict equality (===) operator or typeof which will give the 'undefined' string. Note that you should not be using the abstract equality operator to check, as it will also return true if the value is null.var foo; console.log(foo); // undefined console.log(foo === undefined); // true console.log(typeof foo === 'undefined'); // true console.log(foo == null); // true. Wrong, don't use this to check! function bar() {} var baz = bar(); console.log(baz); // undefinedA variable that is null will have been explicitly assigned to the null value. It represents no value and is different from undefined in the sense that it has been explicitly assigned. To check for null, simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (==) to check, as it will also return true if the value is undefined.var foo = null; console.log(foo === null); // true console.log(typeof foo === 'object'); // true console.log(foo == undefined); // true. Wrong, don't use this to check!As a personal habit, I never leave my variables undeclared or unassigned. I will explicitly assign null to them after declaring if I don't intend to use it yet. If you use a linter in your workflow, it will usually also be able to check that you are not referencing undeclared variables.Referenceshttps://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variableshttps://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

### What is a closure, and how/why would you use one?
<!-- id: B#B(?XiGcl, noteType: Basic (and reversed card)-1cc8b -->

Closures - JavaScript | MDN (mozilla.org) a closure gives you access to an outer function's scope from an inner function. A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was createdThe closure has three scope chains:1. Own scope where variables defined between its curly brackets2. Outer functions' variables3. Global variables Why would you use one?Data privacy / emulating private methods with closures. Commonly used in the module pattern.Partial applications or currying function: a function that takes a function with multiple parameters and returns a function with fewer parameters

### Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?
<!-- id: L3n$_#_Xnp, noteType: Basic (and reversed card)-1cc8b -->

"To understand the differences between the two, let's look at what each function does.forEachIterates through the elements in an array.Executes a callback for each element.Does not return a value.const a = [1, 2, 3]; const doubled = a.forEach((num, index) => { // Do something with num and/or index. }); // doubled = undefinedmapIterates through the elements in an array.""Maps"" each element to a new element by calling the function on each element, creating a new array as a result.const a = [1, 2, 3]; const doubled = a.map(num => { return num \* 2; }); // doubled = [2, 4, 6]The main difference between .forEach and .map() is that .map() returns a new array. If you need the result, but do not wish to mutate the original array, .map() is the clear choice. If you simply need to iterate over an array, forEach is a fine choice."

### What's the difference between host objects and native objects?
<!-- id: j&fIguVlLP, noteType: Basic (and reversed card)-1cc8b -->

Native objects are objects that are part of the JavaScript language defined by the ECMAScript specification, such as String, Math, RegExp, Object, Function, etc.Host objects are provided by the runtime environment (browser or Node), such as window, XMLHTTPRequest, etc.

### What's the difference between .bind, .call and .apply?
<!-- id: u$0(Ek&Zf2, noteType: Basic (and reversed card)-1cc8b -->

Both .call and .apply are used to invoke functions and the first parameter will be used as the value of thiswithin the function. However, .call takes in comma-separated arguments as the next arguments while .applytakes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.function add(a, b) { return a + b; } console.log(add.call(null, 1, 2)); // 3 console.log(add.apply(null, [1, 2])); // 3 const Temp = function() { this.c = 1; } Temp.prototype.add = function (a,b) { return (this.c || 0) + a + b; } const temp = new Temp(); console.log(temp.add(1,2)); // 4 console.log(temp.add.call({ c:2 }, 1, 2)); // 5 console.log(temp.add.apply({ c:3 }, [1, 2])); // 6 const bindFunc = temp.add.bind({ c: 4 }); console.log(bindFunc(1,2)); // 7

### Explain Function.prototype.bind.
<!-- id: d=D4Joc)~F, noteType: Basic (and reversed card)-1cc8b -->

Taken word-for-word from MDN:The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.In my experience, it is most useful for binding the value of this in methods of classes that you want to pass into other functions. This is frequently done in React components.

### Have you ever used JavaScript templating? If so, what libraries have you used?
<!-- id: P_L+L6Fx^f, noteType: Basic (and reversed card)-1cc8b -->

Yes. Handlebars, Underscore, Lodash, AngularJS, and JSX. I disliked templating in AngularJS because it made heavy use of strings in the directives and typos would go uncaught. JSX is my new favorite as it is closer to JavaScript and there is barely any syntax to learn. Nowadays, you can even use ES2015 template string literals as a quick way for creating templates without relying on third-party code.const template = `<div>My name is: ${name}</div>`;However, do be aware of a potential XSS in the above approach as the contents are not escaped for you, unlike in templating libraries.

### "Explain ""hoisting""."
<!-- id: NO?|xWO8/f, noteType: Basic (and reversed card)-1cc8b -->

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Remember that JavaScript only hoists declarations, not initialisation.

### Describe event bubbling.
<!-- id: OvAxocDxWd, noteType: Basic (and reversed card)-1cc8b -->

When an event triggers on a DOM element, it will attempt to handle the event if there is a listener attached, then the event is bubbled up to its parent and the same thing happens. This bubbling occurs up the element's ancestors all the way to the document. Event bubbling is the mechanism behind event delegation.

### "What's the difference between an ""attribute"" and a ""property""?"
<!-- id: t#z{vItZ[o, noteType: Basic (and reversed card)-1cc8b -->

"Attributes are defined on the HTML markup but properties are defined on the DOM. To illustrate the difference, imagine we have this text field in our HTML: <input type=""text"" value=""Hello"">.const input = document.querySelector('input'); console.log(input.getAttribute('value')); // Hello console.log(input.value); // HelloBut after you change the value of the text field by adding ""World!"" to it, this becomes:console.log(input.getAttribute('value')); // Hello console.log(input.value); // Hello World!"

### What is the difference between == and ===?
<!-- id: GPr)]um6Aa, noteType: Basic (and reversed card)-1cc8b -->

== is the abstract equality operator while === is the strict equality operator. The == operator will compare for equality after doing any necessary type conversions. The === operator will not do type conversion, so if two values are not the same type === will simply return false. When using ==, funky things can happen, such as:1 == '1'; // true 1 == [1]; // true 1 == true; // true 0 == ''; // true 0 == '0'; // true 0 == false; // trueMy advice is never to use the == operator, except for convenience when comparing against null or undefined, where a == null will return true if a is null or undefined.var a = null; console.log(a == null); // true console.log(a == undefined); // true

### Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
<!-- id: Di;q&0JI2e, noteType: Basic (and reversed card)-1cc8b -->

Every script has access to the global scope, and if everyone uses the global scope to define their variables, collisions will likely occur

### Explain what a single page app is and how to make one SEO-friendly.
<!-- id: QR/fx-@j4R, noteType: Basic (and reversed card)-1cc8b -->

"Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response to their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML to the new page. This is called server-side rendering.However, in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the HTML5 History API. New data required for the new page, usually in JSON format, is retrieved by the browser via AJAX requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.The benefits:The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.Fewer HTTP requests are made to the server, as the same assets do not have to be downloaded again for each page load.Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.The downsides:Heavier initial page load due to the loading of framework, app code, and assets required for multiple pages.There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the Search Engine Optimization (SEO) of your app. However, most of the time, when you are building apps, SEO is not the most important factor, as not all the content needs to be indexable by search engines. To overcome this, you can either server-side render your app or use services such as Prerender to ""render your javascript in a browser, save the static HTML, and return that to the crawlers""."

### What are the pros and cons of using Promises instead of callbacks?
<!-- id: Gro(j1-0.P, noteType: Basic (and reversed card)-1cc8b -->

ProsAvoid callback hell which can be unreadable.Makes it easy to write sequential asynchronous code that is readable with .then().Makes it easy to write parallel asynchronous code with Promise.all().With promises, these scenarios which are present in callbacks-only coding, will not happen:Call the callback too earlyCall the callback too late (or never)Call the callback too few or too many timesFail to pass along any necessary environment/parametersSwallow any errors/exceptions that may happenConsSlightly more complex code (debatable).In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

### What is Promises?
<!-- id: f4B<J6Zi=J, noteType: Basic (and reversed card)-1cc8b -->

A promise is an object that may produce a single value sometime in the future: either a resolved value or a reason that it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection. As the Promise.prototype.then() and Promise.prototype.catch() methods return promises, they can be chained.

### What tools and techniques do you use for debugging JavaScript code?
<!-- id: xOaFh|/qlF, noteType: Basic (and reversed card)-1cc8b -->

React and ReduxReact DevtoolsRedux DevtoolsVueVue DevtoolsJavaScriptChrome Devtoolsdebugger statementGood old console.log debugging

### Explain the difference between mutable and immutable objects.
<!-- id: h[x>(Ez0c~, noteType: Basic (and reversed card)-1cc8b -->

"Immutability is a core principle in functional programming, and has lots to offer to object-oriented programs as well. A mutable object is an object whose state can be modified after it is created. An immutable object is an object whose state cannot be modified after it is created.What is an example of an immutable object in JavaScript?In JavaScript, some built-in types (numbers, strings) are immutable, but custom objects are generally mutable.Some built-in immutable JavaScript objects are Math, Date.Here are a few ways to add/simulate immutability on plain JavaScript objects.Object Constant PropertiesBy combining writable: false and configurable: false, you can essentially create a constant (cannot be changed, redefined or deleted) as an object property, like:let myObject = {}; Object.defineProperty(myObject, 'number', { value: 42, writable: false, configurable: false, }); console.log(myObject.number); // 42 myObject.number = 43; console.log(myObject.number); // 42Prevent ExtensionsIf you want to prevent an object from having new properties added to it, but otherwise leave the rest of the object's properties alone, call Object.preventExtensions(...):var myObject = { a: 2 }; Object.preventExtensions(myObject); myObject.b = 3; myObject.b; // undefined In non-strict mode, the creation of b fails silently. In strict mode, it throws a TypeError.SealObject.seal() creates a ""sealed"" object, which means it takes an existing object and essentially calls Object.preventExtensions() on it, but also marks all its existing properties as configurable: false.So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you can still modify their values).FreezeObject.freeze() creates a frozen object, which means it takes an existing object and essentially calls Object.seal() on it, but it also marks all ""data accessor"" properties as writable:false, so that their values cannot be changed.This approach is the highest level of immutability that you can attain for an object itself, as it prevents any changes to the object or to any of its direct properties (though, as mentioned above, the contents of any referenced other objects are unaffected).var immutable = Object.freeze({});Freezing an object does not allow new properties to be added to an object and prevents from removing or altering the existing properties. Object.freeze() preserves the enumerability, configurability, writability and the prototype of the object. It returns the passed object and does not create a frozen copy."

### Explain the difference between synchronous and asynchronous functions.
<!-- id: nVy)4CLX9l, noteType: Basic (and reversed card)-1cc8b -->

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case, the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.Asynchronous functions usually accept a callback as a parameter and execution continue on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

### What is event loop? What is the difference between call stack and task queue?
<!-- id: P-jr#X^8>., noteType: Basic (and reversed card)-1cc8b -->

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed. Whenever functions like setTimeout, http.get, and fs.readFile are called, Node.js executed the event loop and then proceeds with the further code without waiting for the output. Call Stack is a data structure for javascript interpreters to keep track of function calls in the program. It has two major actions. - Whenever you call a function for its execution, you are pushing it to the stack.- Whenever the execution is completed, the function is popped out of the stack.

### What are the differences between variables created using let, var or const?
<!-- id: pTgUpHtFDS, noteType: Basic (and reversed card)-1cc8b -->

"Variables declared using the var keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. let and const are block scoped, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).function foo() { // All variables are accessible within functions. var bar = 'bar'; let baz = 'baz'; const qux = 'qux'; console.log(bar); // bar console.log(baz); // baz console.log(qux); // qux } console.log(bar); // ReferenceError: bar is not defined console.log(baz); // ReferenceError: baz is not defined console.log(qux); // ReferenceError: qux is not definedif (true) { var bar = 'bar'; let baz = 'baz'; const qux = 'qux'; } // var declared variables are accessible anywhere in the function scope. console.log(bar); // bar // let and const defined variables are not accessible outside of the block they were defined in. console.log(baz); // ReferenceError: baz is not defined console.log(qux); // ReferenceError: qux is not definedvar allows variables to be hoisted, meaning they can be referenced in code before they are declared. let and const will not allow this, instead throwing an error.console.log(foo); // undefined var foo = 'foo'; console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization let baz = 'baz'; console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization const bar = 'bar';Redeclaring a variable with var will not throw an error, but 'let' and 'const' will.var foo = 'foo'; var foo = 'bar'; console.log(foo); // ""bar"" let baz = 'baz'; let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declaredlet and const differ in that let allows reassigning the variable's value while const does not.// This is fine. let foo = 'foo'; foo = 'bar'; // This causes an exception. const baz = 'baz'; baz = 'qux';"

### JavaScript (ES5) vs ES6
<!-- id: l`fNWr-H@K, noteType: Basic-66869 -->

"JavaScript is the programming language, while ES6 (ECMAScript 2015) is a specific version of the ECMAScript standard that JavaScript implements. ECMAScript is the specification that defines the core features and syntax of the JavaScript language. The key differences between ""JavaScript"" (referring to older versions or the general concept of the language) and ES6 are primarily in the features and syntax introduced in ES6: Variable Declarations: ES6 introduced let and const for block-scoped variable declarations, addressing issues with var's function-scoping and hoisting behavior. Arrow Functions: A concise syntax for writing functions, especially useful for anonymous functions and maintaining this context. Classes: Syntactic sugar for creating constructor functions and managing inheritance, making object-oriented programming in JavaScript more intuitive. Template Literals: String literals allowing embedded expressions and multi-line strings using backticks (` `` `). Destructuring Assignment: A convenient way to extract values from arrays or properties from objects into distinct variables. Spread and Rest Operators: The spread operator (...) expands iterables (like arrays or strings) into individual elements, while the rest operator collects multiple arguments into an array. Modules (Import/Export): A standardized way to organize and reuse code across different files, providing better modularity than older methods like CommonJS. Promises: A built-in mechanism for handling asynchronous operations, improving upon callback-based patterns. Default Parameters: Allows functions to have default values for parameters if no value is provided during the function call. Backward Compatibility: ES6 is largely backward compatible with previous versions of JavaScript (like ES5). This means that most code written in ES5 will still function correctly in an environment that supports ES6. In essence, ES6 significantly enhanced JavaScript by introducing modern syntax, improved features for handling asynchronous operations, better variable scoping, and more organized code structures. While older JavaScript code still runs, ES6 provides more powerful and readable ways to write JavaScript."

### What is the Temporal Dead Zone
<!-- id: F#r]86%E*(, noteType: Basic-66869 -->

The Temporal Dead Zone is a behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. The time span between the creation of a variable’s binding and its declaration, is called the temporal dead zone.

### What is heap
<!-- id: A9v{;c}-dj, noteType: Basic-66869 -->

Heap(Or memory heap) is the memory location where objects are stored when we define variables.

### What is a microTask queue
<!-- id: mckQna;YlZ, noteType: Basic-66869 -->

Microtask Queue is the new queue where all the tasks initiated by promise objects get processed before the callback queue.

### What is babel
<!-- id: go^E&z*,T9, noteType: Basic-66869 -->

Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments

### What is the difference between Function constructor (new Function) and function declaration
<!-- id: nZqel6X)2V, noteType: Basic-66869 -->

The functions which are created with Function constructor do not create closures to their creation contexts but they are always created in the global scope. i.e, the function can access its own local variables and global scope variables only. Whereas function declarations can access outer function variables(closures)

### What is the difference between function and class declaration
<!-- id: G~0z.k{&dh, noteType: Basic-66869 -->

The main difference between function declarations and class declarations is hoisting. The function declarations are hoisted but not class declarations.

### What are the different kinds of generators
<!-- id: i]I,Q{rAlj, noteType: Basic-66869 -->

There are five kinds of generators, Generator function declaration: function* myGenFunc() { yield 1; yield 2; yield 3; } const genObj = myGenFunc(); Generator function expressions: const myGenFunc = function* () { yield 1; yield 2; yield 3; }; const genObj = myGenFunc(); Generator method definitions in object literals: const myObj = { _ myGeneratorMethod() { yield 1; yield 2; yield 3; } }; const genObj = myObj.myGeneratorMethod(); Generator method definitions in class: class MyClass { _ myGeneratorMethod() { yield 1; yield 2; yield 3; } } const myObject = new MyClass(); const genObj = myObject.myGeneratorMethod(); Generator as a computed property: const SomeObj = { \*[Symbol.iterator] () { yield 1; yield 2; yield 3; } } console.log(Array.from(SomeObj)); // [ 1, 2, 3 ]

### What is the difference between setTimeout, setImmediate and process.nextTick?
<!-- id: s<_},]>oRd, noteType: Basic-66869 -->

Set Timeout: setTimeout() is to schedule execution of a one-time callback after delay milliseconds.Set Immediate: The setImmediate function is used to execute a function right before the current event loop finishes.Process NextTick: If process.nextTick() is called in a given phase, all the callbacks passed to process.nextTick() will be resolved before the event loop continues. This will block the event loop and create I/O Starvation if process.nextTick() is called recursively.

### debounce vs throttle
<!-- id: OT)=[.-|$s, noteType: Basic-66869 -->

The major difference between debouncing and throttling is that debounce calls a function when a user hasn't carried out an event in a specific amount of time, while throttle calls a function at intervals of a specified amount of time while the user is carrying out an event.

### """1"" + true - ""1"""
<!-- id: j<cP[%<ZSO, noteType: Basic-66869 -->

"= NaN ""1"" + true = ""1true"" ""1true"" - ""1"" = NaN"

### "const a = ""abc"" a[2] = ""d"" console.log(a);"
<!-- id: idh*]GpS!<, noteType: Basic-66869 -->

"""abc"" -> String is immutable"

### const obj = { name: 'Quang', // showName: function () {} showName(age) { // method console.log(`123 ${this.name} ${age}`); } } const showName = obj.showName; showName();
<!-- id: jUcLeHGnnA, noteType: Basic-66869 -->

//123 undefined => because this is a regular function, not a method -> this keyword point to undefined // solutions showName.call(person, 23); // Anna 23 // -> call the showName method with this keyword set to person showName.apply(person, [23]); // do the same thing as call method

### Arrow function vs function declaration. Give Example
<!-- id: is?vWdm;EP, noteType: Basic-66869 -->

The Difference Between Regular Functions and Arrow Functions | by Ashutosh Verma | Better Programming - Different syntax - Arrow functions do not have an arguments binding. - Arrow functions do not have their own this - Regular functions created using function declarations or expressions are constructible. Hence, they can be called using the new keyword. Whereas, the arrow functions are only callable and not constructible and cannot use the new keyword - No duplicate named parameters

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
