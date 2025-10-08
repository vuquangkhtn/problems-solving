# Node.js vs Browser JavaScript

This document explains the fundamentals of Node.js and browser JavaScript, how their runtimes differ, and provides a practical comparison for interview prep.

---

## Overview

- Node.js: Server-side JavaScript runtime built on V8, with `libuv` providing an event loop, non-blocking I/O, and a thread pool for certain tasks.
- Browser JavaScript: Client-side runtime in a web browser, integrated with DOM, rendering, and user input queues; focuses on UI responsiveness and security sandboxing.

---

## Node.js Fundamentals

- Runtime
  - Single main JS thread; event loop via `libuv`.
  - Offloads I/O (FS, DNS, crypto, zlib) to kernel or `libuv` thread pool.
- Concurrency
  - Asynchronous I/O via callbacks, promises, `async`/`await`.
  - For CPU-bound tasks, use `worker_threads`.
- Modules & Globals
  - Supports CommonJS (`require`, `module.exports`) and ES Modules (`import`, `export`).
  - Globals: `global`, `process`, `Buffer`, `__dirname`, `__filename`.
- Built-in APIs
  - `fs`, `http/https`, `net`, `crypto`, `stream`, `events`.
- Security
  - Full system access: file system and network — secure via least privilege, environment hardening, input validation.
- Example: Non-blocking I/O and worker threads

```js
// Async file read
const fs = require('fs/promises');
async function readConfig() {
  const content = await fs.readFile('./config.json', 'utf8');
  return JSON.parse(content);
}

// CPU-bound work offloaded to workers
const { Worker } = require('worker_threads');
function runHeavyTask(payload) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', { workerData: payload });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

---

## Browser JavaScript Fundamentals

- Runtime
  - Single main JS thread integrated with rendering and input queues.
  - Event loop coordinates tasks, microtasks, painting, and layout.
- Concurrency
  - Asynchronous operations via promises, `async`/`await`, and Web APIs.
  - For CPU-bound tasks, use Web Workers to avoid UI freezes.
- Modules & Globals
  - ES Modules natively (`<script type="module">`); bundlers often used.
  - Globals: `window`, `document`, `location`, `navigator`, `localStorage`.
- Web APIs
  - DOM, Fetch, Canvas/WebGL, WebSockets, IndexedDB, Service Workers.
- Security
  - Sandboxed: no direct file system or arbitrary socket access.
  - Policies: Same-Origin, CORS, CSP; user-gesture requirements for certain APIs.
- Example: Web Worker for heavy computation

```js
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ n: 10_000_000 });
worker.onmessage = (e) => console.log('Result:', e.data);

// worker.js
self.onmessage = (e) => {
  const { n } = e.data;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  postMessage(sum);
};
```

---

## Event Loop & Threading

- Both runtimes execute JS on a single main thread.
- Node.js
  - Uses `libuv` for event loop and an internal thread pool to offload I/O.
  - Microtasks (promises) run before macrotasks between ticks.
- Browser
  - Event loop is tightly integrated with rendering; long tasks block paint.
  - Microtasks (promises) run before macrotasks (timers, I/O callbacks).

---

## Event Loop Comparison

- High-level
  - Both: single main JS thread; microtasks flush before the next macrotask.
  - Key difference: browser loop coordinates rendering; Node coordinates I/O phases via `libuv`.

- Node.js phases (simplified)
  - Timers: `setTimeout`/`setInterval` callbacks.
  - Pending callbacks: some system operations.
  - Idle/prepare: internal.
  - Poll: retrieve new I/O events; execute I/O callbacks.
  - Check: `setImmediate` callbacks.
  - Close callbacks: e.g., `socket.on('close')`.

- Microtasks priority
  - Node: `process.nextTick` runs before promise microtasks; use sparingly to avoid starvation.
  - Browser: promise microtasks (`then`/`catch`) run after the current task, before timers and other macrotasks.

- Ordering examples

```js
// Browser: promises before timers
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('end');
// start, end, microtask, timeout

// Node: setImmediate vs setTimeout can differ depending on context
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // Usually: immediate before timeout in I/O callbacks
});

// Node: nextTick vs promise
Promise.resolve().then(() => console.log('promise microtask'));
process.nextTick(() => console.log('nextTick'));
// nextTick, promise microtask
```

Tips

- Prefer promises/async–await; avoid excessive `process.nextTick` to prevent starving the event loop.
- In browsers, keep tasks short to allow rendering and input to proceed smoothly.

### Visual Diagrams

- Event loop overview:

  ![Event Loop in JavaScript](/interview-questions/resources/Event-Loop-in-JavaScript.jpg)

- Node.js libuv phases:

  ![Node.js Event Loop Phases](/interview-questions/resources/eventloop_nodejs.png)

### Further Reading

- [Node.js: Event loop, timers, and nextTick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [What is an event loop in JavaScript? (GeeksforGeeks)](https://www.geeksforgeeks.org/javascript/what-is-an-event-loop-in-javascript/)

---

## APIs & Capabilities Comparison

- File System
  - Node: Full access via `fs`.
  - Browser: Restricted; use File API with user permission, IndexedDB for storage.
- Networking
  - Node: Raw TCP/UDP via `net/dgram` and HTTP servers.
  - Browser: Fetch/XHR/WebSockets; no raw sockets.
- DOM & Rendering
  - Node: No DOM; use libraries (e.g., JSDOM) for HTML parsing.
  - Browser: Full DOM/CSSOM; rendering pipeline and layout.
- Storage
  - Node: Disk, environment, databases.
  - Browser: `localStorage`, `sessionStorage`, IndexedDB, Cache API.
- Crypto
  - Node: `crypto` module.
  - Browser: `SubtleCrypto` via Web Crypto API.

---

## Modules & Packaging

- Node: CommonJS and ESM; package management via `npm`/`yarn`; uses `package.json`.
- Browser: Native ESM; often bundled for production (Vite, Webpack, Rollup) to optimize loading.

---

## Security Model

- Node: Not sandboxed; adopt least privilege, sanitize inputs, handle secrets securely, audit dependencies.
- Browser: Sandboxed; enforce SOP, CORS, CSP; prevent XSS/CSRF; avoid blocking UI.

---

## Practical Tips

- Node
  - Avoid blocking the event loop; use async I/O.
  - Offload CPU-bound work to `worker_threads` or separate services.
- Browser
  - Keep tasks small; use Web Workers for heavy computation.
  - Optimize for UX: async rendering and non-blocking code.

---

## When to Use Which

- Use Node.js for: APIs, microservices, CLI tools, job processing, SSR.
- Use Browser JS for: interactive UIs, SPAs/MPAs, progressive web apps.

---

## Summary: Node.js vs Browser JS

- Environment
  - Node: Server-side runtime with system access.
  - Browser: Client-side runtime with UI and security constraints.
- Concurrency
  - Both single-threaded for JS; Node offloads I/O via `libuv`; browser integrates with rendering.
- Capabilities
  - Node: FS, networking, process control.
  - Browser: DOM, rendering, limited storage and network APIs.
- Design implications
  - Node: Prioritize non-blocking I/O; manage CPU work carefully.
  - Browser: Prioritize responsiveness; avoid long tasks on main thread.
