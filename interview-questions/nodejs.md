## NodeJS

### What is Node.js? / How does Node.js work?

<!-- id: Os!i<T1O?9, noteType: Basic-66869 -->

Node.js is an open-source server side runtime environment built on Chrome's V8 JavaScript engine. It provides an event driven, non-blocking (asynchronous) I/O and cross-platform runtime environment for building server-side applications using JavaScript.

### Node.js vs Browser JavaScript

Node.js is a runtime environment for executing JavaScript code on the server-side, while browser JavaScript is a runtime environment for executing JavaScript code in web browsers.

Node.js runs in a single thread, while browser JavaScript runs in multiple threads.

- Runtime
  - Node.js runs JavaScript on the server; browsers run it in the client.
  - Both execute JavaScript on a single main thread.
- Event loop
  - Node: Powered by libuv . Offloads I/O (FS, DNS, zlib, some crypto) to the kernel or the libuv thread pool (default 4 threads), then queues callbacks back to the main JS thread. This makes I/O appear concurrent without multithreaded JS.
  - Browser: Event loop is integrated with rendering and input queues. Long-running JS blocks rendering and user interactions, causing UI freezes.
- “Multithreading”
  - Node: JS itself is single-threaded, but the runtime uses extra threads for I/O under the hood. For CPU-bound work, use worker_threads .
  - Browser: Main JS thread is single-threaded; other threads handle rendering, networking, and GC. Use Web Workers for heavy computation off the main thread.
- Practical implications
  - Node: Never block the event loop; use async I/O (callbacks, promises, async / await ) and offload CPU-bound work to workers.
  - Browser: Keep tasks small to maintain UI responsiveness; rely on async APIs and Web Workers for heavy tasks.
- Summary
  - Node: Single-threaded JS + libuv thread pool for I/O → efficient concurrency for I/O-heavy workloads.
  - Browser: Single main JS thread + rendering/UI constraints → prioritize non-blocking code and off-main-thread computation for smooth UX.

### What is Node.js Single Process Model?

<!-- id: n==/`?wf|k, noteType: Basic-66869 -->

Node.js runs in a single process and the application code runs in a single thread and thereby needs less resources than other platforms. This single thread doesn't have to wait for the request to complete and is free to handle the next request.

### What are the data types in Node.js?

<!-- id: F|xw,Dj$}*, noteType: Basic-66869 -->

Just like JS, there are two categories of data types in Node: Primitives and Objects. PrimitivesStringNumberBigintBooleanUndefinedNullSymbol Objects Function Array Buffer: Node.js includes an additional data type called Buffer (not available in browser's JavaScript). Buffer is mainly used to store binary data, while reading from a file or receiving packets over the network. Buffer is a class. other regular objects

### How to create a simple server in Node.js that returns Hello World?

<!-- id: O$6KfOi?mb, noteType: Basic-66869 -->

Step 01: Create a project directory mkdir myapp cd myapp Step 02: Initialize project and link it to npm npm init This creates a package.json file in your myapp folder. The file contains references for all npm packages you have downloaded to your project. The command will prompt you to enter a number of things. You can enter your way through all of them EXCEPT this one: entry point: (index.js) Rename this to: app.js Step 03: Install Express in the myapp directory npm install express --save Step 04: app.js var express = require('express'); var app = express(); app.get('/', function (req, res) { res.send('Hello World!'); }); app.listen(3000, function () { console.log('Example app listening on port 3000!'); }); Step 05: Run the app node app.js

### What does the runtime environment mean in Node.js?

<!-- id: bOVw[uO?5`, noteType: Basic-66869 -->

The Node.js runtime is the software stack responsible for installing your web service's code and its dependencies and running your service. The runtime environment is literally just the environment your application is running in. This can be used to describe both the hardware and the software that is running your application. How much RAM, what version of node, what operating system, how much CPU cores, can all be referenced when talking about a runtime environment.

### Explain usage of NODE_ENV?

<!-- id: kDoIQ1/>X,, noteType: Basic-66869 -->

NODE_ENV is an environment variable made popular by the express web server framework. When a node application is run, it can check the value of the environment variable and do different things based on the value.

### What are the core modules of Node.js?

<!-- id: IOJrD=O3%#, noteType: Basic-66869 -->

They are defined within the Node.js source and are located in the lib/ folder, and Node.js has several modules compiled into the binary such as fs, os, path, util, http

### What is callback function in Node.js?

<!-- id: q45q2r`Kir, noteType: Basic-66869 -->

In node.js, we basically use callbacks for handling asynchronous operations like — making any I/O request, database operations or calling an API to fetch some data. Callback allows our code to not get blocked when a process is taking a long time.

### How assert works in Node.js?

<!-- id: ufeuyTT.qs, noteType: Basic-66869 -->

In Node.js, assert is used to write tests. It only provides feedback only when any of the running test cases fails. This module was built to be used internally by Node.js.

### What is an error-first callback?

<!-- id: P@l8LiU[Y3, noteType: Basic-66869 -->

"fs.readFile( ""file.json"", function ( err, data ) { if ( err ) { console.error( err ); } console.log( data ); }); Error-first callbacks in Node.js are used to pass errors and data. The very first parameter you need to pass to these functions has to be an error object while the other parameters represent the associated data. Thus you can pass the error object for checking if anything is wrong and handle it. In case there is no issue, you can just go ahead and with the subsequent arguments."

### List down the major benefits of using Node.js?

<!-- id: QTRuLUy^0O, noteType: Basic-66869 -->

### What is package.json?

<!-- id: LGZq=`VN|4, noteType: Basic-66869 -->

The package.json file in Node.js is the heart of the entire application. It is basically the manifest file that contains the metadata of the project where we define the properties of a package.

### What do you understand by Event-driven programming?

<!-- id: sdl{VQt)i~, noteType: Basic-66869 -->

That means instead of waiting for a response javascript will keep executing while listening for other events.

### What is an Event loop in Node.js and how does it work?

<!-- id: vefp?mfIG*, noteType: Basic-66869 -->

"The Node.js event loop is a core mechanism that allows it to handle asynchronous operations efficiently using a single thread, enabling non-blocking I/O. Instead of waiting for a task to finish, Node.js offloads it to the system kernel (via the libuv library) and continues with the rest of its code. When the task is complete, its callback is placed in a queue to be executed by the event loop. Core componentsCall Stack: A last-in, first-out (LIFO) stack that keeps track of the functions currently being executed. When synchronous code runs, functions are pushed onto the stack and popped off when they are completed.libuv: A C++ library that gives Node.js access to the underlying operating system and manages asynchronous tasks like file system operations, networking, and timers in the background.Callback Queues: Where asynchronous operation callbacks are placed once their associated task has completed. There are different queues for different types of callbacks.Microtask Queue: A high-priority queue that holds callbacks for Promise.then(), Promise.catch(), Promise.finally(), queueMicrotask(), and process.nextTick().Event Loop: A continuous process that checks if the call stack is empty. If it is, the event loop takes callbacks from the queues and pushes them onto the call stack for execution, in a specific order. Event loop phases and their order The event loop cycles continuously through several phases, executing callbacks from each phase's queue before moving to the next. After each phase, it processes the microtask queues completely before moving on. Timers: This phase executes setTimeout() and setInterval() callbacks whose specified time has elapsed.Pending Callbacks: This phase executes certain system-related callbacks, like deferred I/O callbacks from the previous loop iteration.Idle, Prepare: This is an internal phase used for housekeeping by libuv.Poll: This is the most important phase for processing I/O events.It retrieves new I/O events and executes their callbacks.If the poll queue is empty, the loop will either wait for new events or move to the next phase if setImmediate() callbacks are scheduled.Check: This phase executes all setImmediate() callbacks.Close Callbacks: This phase handles callbacks for closing handles, such as socket.on('close'). How microtasks are prioritized Microtasks have a higher priority than the callbacks in the main event loop phases. This ensures that promises and process.nextTick() are executed as quickly as possible. The high-level flow is: Execute all synchronous code in the call stack.Process all items in the microtask queues (process.nextTick() and Promises).Move to the first phase of the event loop (Timers).Execute all callbacks in the Timers queue.After clearing the Timers queue, process the microtask queues again.Move to the next phase (Pending Callbacks).Repeat this process until all phases and queues are empty. Example walkthrough javascript console.log('Start'); setTimeout(() => { console.log('setTimeout'); }, 0); Promise.resolve().then(() => { console.log('Promise'); }); setImmediate(() => { console.log('setImmediate'); }); console.log('End'); Use code with caution. Output:Start: Synchronous code is executed immediately.End: Synchronous code is executed immediately.Promise: The microtask queue is drained completely after the initial synchronous code finishes.setTimeout: The event loop moves to the ""timers"" phase and runs the setTimeout callback.setImmediate: The event loop moves to the ""check"" phase and runs the setImmediate callback. Note: While setTimeout(fn, 0) is a timer, the setImmediate() callback is specifically designed to execute in the ""check"" phase. In many cases, the exact order between setTimeout(fn, 0) and setImmediate() can be non-deterministic, but setImmediate will always run after the Poll phase, while setTimeout runs in the Timers phase."

### Explain REPL in the context of Node.js.

<!-- id: Q`~d`4(wBr, noteType: Basic-66869 -->

REPL in Node.js stands for Read, Eval, Print, and Loop. It represents a computer environment such as a window console or Unix/Linux shell where any command can be entered and then the system can respond with an output. Node.js comes bundled with a REPL environment by default. REPL can perform the below-listed tasks:Read: Reads the user’s input, parses it into JavaScript data-structure and then stores it in the memory.Eval: Receives and evaluates the data structure.Print: Prints the final result.Loop: Loops the provided command until CTRL+C is pressed twice.

### What is module in Node.js?

<!-- id: O8t&HxGM3m, noteType: Basic-66869 -->

Modules refer to small units of independent, reusable code. It is used to encapsulate all the related codes or functions into a single file.

### Explain libuv.

<!-- id: dhvn/6eO_k, noteType: Basic-66869 -->

Libuv is a multi-platform support library of Node.js which majorly is used for asynchronous I/O. A few of the important features of libuv are event loop, Asynchronous file & network operations. FYI, it also supports to handle the child processes

### Explain the purpose of ExpressJS package?

<!-- id: o66NWX}9(8, noteType: Basic-66869 -->

Express.js is a framework built on top of Node.js that facilitates the management of the flow of data between server and routes in the server-side applications. Express.js is developed on the middleware module of Node.js called connect. The connect module further makes use of http module to communicate with Node.js.

### Differentiate between process.nextTick() and setImmediate()?

<!-- id: v~cVm*8B`d, noteType: Basic-66869 -->

Same: both are functions of the Timers module which help in executing the code after a predefined period of time. Diff: setImmediate – Used to execute code at the end of the current event loop cycleprocess.nextTick – Used to schedule a callback function that needs to be invoked in the next iteration of the Event Loop

### How does Node.js handle the child threads?

<!-- id: GD*SDh?Cn4, noteType: Basic-66869 -->

In general, Node.js is a single threaded process and doesn’t expose the child threads or thread management methods. But you can still make use of the child threads for some specific asynchronous I/O tasks which execute in the background.

### Explain stream in Node.js along with its various types.

<!-- id: DdL6]^9eKy, noteType: Basic-66869 -->

Streams in Node.js are the collection of data similar to arrays and strings. They are objects using which you can read data from a source or write data to a destination in a continuous manner. It might not be available at once and need not to have fit in the memory. These streams are especially useful for reading and processing a large set of data. In Node.js, there are four fundamental types of streams:Readable: Used for reading large chunks of data from the source.Writeable: Use for writing large chunks of data to the destination.Duplex: Used for both the functions; read and write.Transform: It is a duplex stream that is used for modifying the data.

### List down the various timing features of Node.js.

<!-- id: x+qX={hW:, noteType: Basic-66869 -->

https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick Node.js provides a Timers module which contains various functions for executing the code after a specified period of time. Below I have listed down the various functions provided by this module:setTimeout/clearTimeout – Used to schedule code execution after a designated amount of millisecondssetInterval/clearInterval – Used to execute a block of code multiple timessetImmediate/clearImmediate – Used to execute code at the end of the current event loop cycleprocess.nextTick – Used to schedule a callback function that needs to be invoked in the next iteration of the Event Loop

### What do you understand by an Event Emitter in Node.js?

<!-- id: nh{/j`:{h2, noteType: Basic-66869 -->

EventEmitter is a Node.js class that includes all the objects that are capable of emitting events. These objects contain an eventEmitter.on() function which can attach more than one function to the named events that are emitted by the object. Whenever an EventEmitter object throws an event (use evenEmitter.emit()), all the attached functions to that specific event are invoked synchronously.

### The priority of require('something') module

<!-- id: AU>a>ZW8!w, noteType: Basic-66869 -->

"•

### Scanning for node_modules

<!-- id: ck!%(J[b<<, noteType: Basic-66869 -->

"Ex: If a file /home/ryo/project/foo.js has a require call require('bar'), Node.js scans the file system for node_modules in the following order: •

### File-Based Module characteristic

<!-- id: JTrq&Lbe,S, noteType: Basic-66869 -->

Conditionally Load a Module Blocking: The require function blocks further code execution until the module has been loaded. Cached: after the first time a require call is made to a particular file, the module.exports is cached. The next time a call made, the module.exports variable of the destination file is returned from memory, keeping things fast.

### Types of modules? The require order?

<!-- id: iUMzXO(8Ml, noteType: Basic-66869 -->

- Core module: require('fs') - File-based module: require('../foo') - Folder-based module: require('../foo'), require('../foo/index'); - File/Folder in node_module: require('foo') - Folder with package.json and main property - Folder with index.js file -> If more than 1 case matched, the priority is based on the above order

### main vs exports in package.json

<!-- id: Jop|IV]kWN, noteType: Basic-66869 -->

In a package.json file, main, module, browser, types, and exports are fields used to define how a package is consumed in different environments and contexts. main: This field specifies the primary entry point for a CommonJS module. When a package is `require()`d in a Node.js environment, the file specified in main is loaded. It's a legacy field, primarily for CommonJS. module: This field specifies the primary entry point for an ES module (ESM). Bundlers and tools that understand ESM will use this field to resolve imports when a package is consumed as an ES module. This is particularly relevant for client-side applications that use bundlers like Webpack or Rollup. browser: This field allows you to specify a different entry point or even substitute specific files when your package is used in a browser environment. It can be a string pointing to a browser-specific entry file, or an object mapping Node.js-specific files to browser-compatible alternatives or false to exclude them. types (or typings): This field specifies the path to the TypeScript declaration file (.d.ts) for your package. This allows TypeScript projects consuming your package to benefit from type checking and autocompletion. exports: This is a modern and more powerful field that defines the package's entry points and subpath exports for different environments and module formats (CommonJS, ESM, browser, Node.js). It allows for conditional exports, enabling a single package to provide optimized versions for various consumers. The exports field takes precedence over main and module when present. It offers features like:Conditional Exports: Specifying different files for different environments (e.g., node, browser, import, require).Subpath Exports: Exposing specific internal files or directories as public entry points.Encapsulation: Limiting access to internal files not explicitly defined in exports. In essence, main and module define the main entry points for CommonJS and ESM respectively, browser handles browser-specific overrides, types provides TypeScript definitions, and exports offers a comprehensive and flexible way to manage entry points and module resolution across diverse environments and module systems. fallback priority: exports > browser > module > main In summary, the priority is generally: exports: If present, it dictates all entry point and type resolution.types (within exports conditions): Takes precedence for type resolution when exports is used.types (top-level): Used if exports is not present or does not specify types for a given condition.browser: When in a browser environment and exports is not used.module: For ESM consumption when exports is not used and browser doesn't apply.main: The fallback entry point for CommonJS consumption when exports is not used and browser or module don't apply.
