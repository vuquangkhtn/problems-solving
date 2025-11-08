# NodeJS

[[toc]]

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

Just like in JavaScript, Node.js has two broad categories of data types:

- Primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.
- Objects: `Object`, `Function`, `Array`, and Node-specific `Buffer`.

Node.js includes an additional data type called `Buffer` (not available in browser JavaScript). Buffers store binary data, commonly used for file I/O and network packets.

Example:

```js
const buf = Buffer.from('hello');
console.log(buf); // <Buffer 68 65 6c 6c 6f>
```

### How to create a simple server in Node.js that returns Hello World?

<!-- id: O$6KfOi?mb, noteType: Basic-66869 -->

1. Create a project directory and enter it:

```bash
mkdir myapp
cd myapp
```

2. Initialize the project:

```bash
npm init -y
```

Optionally set the entry point to `app.js`.

3. Install Express:

```bash
npm install express
```

4. Create `app.js`:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

5. Run the app:

```bash
node app.js
```

### What does the runtime environment mean in Node.js?

<!-- id: bOVw[uO?5`, noteType: Basic-66869 -->

The Node.js runtime is the software stack responsible for installing your web service's code and its dependencies and running your service. The runtime environment is literally just the environment your application is running in. This can be used to describe both the hardware and the software that is running your application. How much RAM, what version of node, what operating system, how much CPU cores, can all be referenced when talking about a runtime environment.

### Explain usage of NODE_ENV?

<!-- id: kDoIQ1/>X,, noteType: Basic-66869 -->

`NODE_ENV` is an environment variable commonly used to control configuration (e.g., `development`, `production`). Your app can check its value and change behavior accordingly.

Example:

```bash
NODE_ENV=production node app.js
```

```js
if (process.env.NODE_ENV === 'production') {
  // enable production optimizations
}
```

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

Error-first callbacks use the signature `(err, data)`. If an error occurs, `err` is non-null and should be handled; otherwise `data` contains the result.

Example:

```js
const fs = require('fs');

fs.readFile('file.json', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

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

The Node.js event loop enables non-blocking I/O on a single thread. Async tasks are offloaded (via `libuv`) and their callbacks are queued for later execution.

- Core components:
  - Call Stack: executes synchronous code (LIFO).
  - `libuv`: handles OS-level async I/O, timers, thread-pool work.
  - Callback queues: separate queues per phase (timers, I/O, check, close).
  - Microtask queues: `process.nextTick` and Promise callbacks (higher priority).

- Event loop phases (simplified order):
  - Timers: `setTimeout`, `setInterval`.
  - Pending Callbacks: system-level callbacks from previous cycle.
  - Idle/Prepare: internal.
  - Poll: I/O events; may block waiting for new events.
  - Check: `setImmediate` callbacks.
  - Close Callbacks: e.g., `socket.on('close')`.

- Microtasks priority:
  - After each phase and after initial sync code, drain `process.nextTick` and Promise microtasks completely before moving on.

Example:

```js
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

setImmediate(() => {
  console.log('setImmediate');
});

console.log('End');
```

Typical output:

- `Start`
- `End`
- `Promise` (microtask)
- `setTimeout` (timers phase) or `setImmediate` (check phase) — order can vary depending on system conditions; `setImmediate` always runs in the check phase.

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

Similarities:

- Both schedule callbacks asynchronously.

Differences:

- `process.nextTick`: runs before the next event loop phase (microtask queue), often immediately after current operation finishes.
- `setImmediate`: runs in the "check" phase, after I/O events in the current loop iteration.

### How does Node.js handle the child threads?

<!-- id: GD*SDh?Cn4, noteType: Basic-66869 -->

In general, Node.js is a single threaded process and doesn’t expose the child threads or thread management methods. But you can still make use of the child threads for some specific asynchronous I/O tasks which execute in the background.

### Explain stream in Node.js along with its various types.

<!-- id: DdL6]^9eKy, noteType: Basic-66869 -->

Streams let you process data chunk-by-chunk without loading it all into memory. Useful for large files and network data.

Types:

- Readable: read from a source.
- Writable: write to a destination.
- Duplex: both read and write.
- Transform: duplex that transforms data as it passes through.

### List down the various timing features of Node.js.

<!-- id: x+qX={hW:, noteType: Basic-66869 -->

Reference: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

Timing APIs:

- `setTimeout` / `clearTimeout`: run after N milliseconds.
- `setInterval` / `clearInterval`: run repeatedly every N milliseconds.
- `setImmediate` / `clearImmediate`: run in the event loop "check" phase.
- `process.nextTick`: run before the next event loop phase (microtask queue).

### What do you understand by an Event Emitter in Node.js?

<!-- id: nh{/j`:{h2, noteType: Basic-66869 -->

EventEmitter is a Node.js class that includes all the objects that are capable of emitting events. These objects contain an eventEmitter.on() function which can attach more than one function to the named events that are emitted by the object. Whenever an EventEmitter object throws an event (use evenEmitter.emit()), all the attached functions to that specific event are invoked synchronously.

### Module resolution and node_modules scanning

<!-- id: ck!%(J[b<<, noteType: Basic-66869 -->

For `require('foo')`, Node.js searches `node_modules` directories starting from the current folder up through parent directories until the filesystem root.

Example search order for `/home/user/project/app.js` requiring `bar`:

- `/home/user/project/node_modules/bar`
- `/home/user/node_modules/bar`
- `/home/node_modules/bar`
- `/node_modules/bar`

### File-Based Module characteristic

<!-- id: JTrq&Lbe,S, noteType: Basic-66869 -->

Characteristics:

- Conditional loading: `require` can be called inside code paths.
- Blocking: `require` is synchronous; it blocks until the module loads.
- Caching: modules are cached by resolved path after first load; subsequent `require` returns the cached `module.exports`.

### Types of modules? The require order?

<!-- id: iUMzXO(8Ml, noteType: Basic-66869 -->

- Core module: `require('fs')`
- File-based module: `require('../foo')`
- Folder-based module: `require('../foo')`, `require('../foo/index')`
- Module in `node_modules`: `require('foo')`
- Folder with `package.json` and `main` field
- Folder with `index.js`

If more than one case matches, the priority follows the above order.

### main vs exports in package.json

<!-- id: Jop|IV]kWN, noteType: Basic-66869 -->

In `package.json`, these fields define how consumers resolve your package:

- `main`: CommonJS entry point (`require()` in Node).
- `module`: ES module entry (used by bundlers supporting ESM).
- `browser`: browser-specific entry or file map overrides.
- `types` (or `typings`): TypeScript declaration file path.
- `exports`: modern field for conditional and subpath exports; takes precedence over `main`/`module` when present.

Highlights of `exports`:

- Conditional exports: different files for `node`, `browser`, `import`, `require`.
- Subpath exports: expose controlled internal files.
- Encapsulation: hide files not exported.

Fallback/priority (simplified):

- `exports` > `browser` > `module` > `main`
- `types` resolution may be specified in `exports` conditions; otherwise top-level `types` applies.
