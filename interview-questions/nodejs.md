# NodeJS

[[toc]]

### What is Node.js? / How does Node.js work?

<!-- id: Os!i<T1O?9, noteType: Basic-66869 -->

- Node.js is a cross-platform JavaScript runtime built on Google's V8 engine.
- It uses an event loop and non-blocking I/O APIs, making it effective for I/O-heavy services.
- JavaScript runs on one main thread by default, while the runtime can use the OS and libuv worker pool for some operations.

### Node.js vs Browser JavaScript

- **Runtime:** Node.js provides server-side APIs and browsers provide web-platform APIs; both execute application JavaScript on a main thread by default.
- **Event loop:**
  - Node.js runs JavaScript on the server; browsers run it in the client.
  - Node uses libuv and the OS to handle asynchronous I/O, then runs callbacks on the JavaScript thread.
  - Browsers integrate the event loop with rendering, input, and Web APIs.
- **Parallelism:** Node can use `worker_threads` for CPU-bound JavaScript and `child_process` or `cluster` for process isolation.
- **Practical rule:** Keep synchronous work short; long CPU-bound tasks block the Node.js event loop and delay all requests on that process.
- **Older shorthand:** “Node.js is single-threaded and browsers are multi-threaded.” The useful part is that application JavaScript normally runs on one main thread; the runtime and browser can both use additional threads internally.

### What is Node.js Single Process Model?

<!-- id: n==/`?wf|k, noteType: Basic-66869 -->

- A Node.js process normally runs application JavaScript on one main thread.
- The event loop can accept other work while asynchronous I/O is pending.
- CPU-heavy synchronous work still blocks that process; use `worker_threads`, separate processes, or a job queue when appropriate.

### What are the data types in Node.js?

<!-- id: F|xw,Dj$}*, noteType: Basic-66869 -->

- Node.js uses JavaScript's primitive and object types.

- Primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.
- Objects: `Object`, `Function`, `Array`, and Node-specific `Buffer`.

- `Buffer` is a Node.js class for binary data. It is available in some browser tooling, but is not a standard browser global.

- **Older explanation:** Node.js was often described as having primitives plus objects, with `Buffer` called an additional Node-specific data type. More precisely, `Buffer` is a Node.js class built on typed-array memory for binary data.

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

3. Install Express if you want an HTTP framework:

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

- A runtime environment is the combination of software and hardware in which the application executes.
- For Node.js, this includes the Node version, V8, operating system, CPU, memory, environment variables, dependencies, and available permissions.
- **Older explanation:** A runtime environment was described as the hardware and software used to install dependencies and run a service, including RAM, CPU, OS, and Node version.

### Explain usage of NODE_ENV?

<!-- id: kDoIQ1/>X,, noteType: Basic-66869 -->

- `NODE_ENV` is a conventional environment variable, not a Node.js runtime mode that Node sets or enforces.
- Applications and libraries may use it to choose configuration such as logging or caching behavior.
- Prefer explicit configuration for security-sensitive behavior and do not trust client-provided environment values.

- **Older explanation:** Applications commonly checked `NODE_ENV` for values such as `development` and `production` to select configuration.

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

- Core modules ship with Node.js and do not need to be installed from npm.
- Prefer the explicit `node:` prefix in new code:

```js
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
```

- Examples include `node:fs`, `node:path`, `node:http`, `node:crypto`, `node:stream`, `node:test`, and `node:assert`.

- **Older import style:** `require('fs')`, `require('path')`, and `require('http')` remain valid CommonJS forms; the `node:` prefix is the clearer modern form and avoids ambiguity with packages.

### What is callback function in Node.js?

<!-- id: q45q2r`Kir, noteType: Basic-66869 -->

- A callback is a function passed to be invoked after an operation completes.
- Node.js still supports callbacks, but new code commonly uses Promises and `async`/`await`.
- Asynchronous APIs prevent waiting for I/O from blocking the event loop; they do not make CPU-heavy JavaScript non-blocking.

- **Older explanation:** Callbacks were presented as the standard way to handle I/O, database calls, and API requests without blocking while a long operation completed.

### How assert works in Node.js?

<!-- id: ufeuyTT.qs, noteType: Basic-66869 -->

- `node:assert` provides assertion functions for tests and runtime invariants.
- It throws an `AssertionError` when an assertion fails; it is not itself a test runner.
- For built-in tests, combine it with `node:test`.

- **Older explanation:** `assert` was described as an internal testing module that only produced feedback when a test failed.

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

### What are the major benefits of using Node.js?

- Efficient I/O concurrency through the event loop and asynchronous APIs.
- One language across frontend and backend teams.
- A large npm ecosystem and built-in web-compatible APIs such as `fetch`, `URL`, `AbortController`, and Web Streams.
- Good fit for APIs, streaming services, real-time applications, CLIs, and tooling.
- CPU-heavy workloads require workers or separate services; Node.js is not automatically faster for every workload.

<!-- id: QTRuLUy^0O, noteType: Basic-66869 -->

### What is package.json?

<!-- id: LGZq=`VN|4, noteType: Basic-66869 -->

- `package.json` is a project or package manifest.
- It can define metadata, scripts, dependencies, dev dependencies, package type, export maps, engines, and publish settings.
- `scripts` can be run with `npm run <name>` or, in Node 22+, `node --run <name>`.

- **Older explanation:** `package.json` was described as the project manifest containing package metadata and properties.

### What do you understand by Event-driven programming?

<!-- id: sdl{VQt)i~, noteType: Basic-66869 -->

- Event-driven programming reacts to events such as requests, timers, stream data, and messages.
- The application registers listeners or callbacks, continues other work, and handles the event when it is emitted.

- **Older shorthand:** JavaScript continues executing while it listens for other events instead of waiting synchronously for each response.

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
- Node drains the `process.nextTick` queue before the Promise microtask queue; both run before the event loop continues to the next phase.

- **Older explanation:** The event loop was summarized as a single-thread mechanism that offloads async work through libuv and later queues callbacks.

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

### Explain the REPL in Node.js.

<!-- id: Q`~d`4(wBr, noteType: Basic-66869 -->

- REPL means **Read, Eval, Print, Loop**.
- Start it with `node` to evaluate JavaScript interactively.
- It is useful for inspecting APIs, testing expressions, and experimenting with modules.
- Exit with `.exit` or press `Ctrl+C` twice.

- **Older expansion:** REPL means Read input, Eval it, Print the result, and Loop until the user exits.

### What is module in Node.js?

<!-- id: O8t&HxGM3m, noteType: Basic-66869 -->

Modules refer to small units of independent, reusable code. It is used to encapsulate all the related codes or functions into a single file.

### What is libuv?

<!-- id: dhvn/6eO_k, noteType: Basic-66869 -->

- libuv is the cross-platform library behind Node.js's event loop and many asynchronous operations.
- It coordinates timers, network I/O, filesystem work, child processes, and its worker pool.
- JavaScript callbacks still execute on the Node.js thread after the underlying work completes.

- **Older explanation:** libuv was described as the cross-platform support library responsible mainly for the event loop and asynchronous file, network, and child-process operations.

### Explain the purpose of ExpressJS package?

<!-- id: o66NWX}9(8, noteType: Basic-66869 -->

- Express.js is a third-party web framework built on Node.js HTTP primitives.
- It provides routing, middleware composition, request/response helpers, and error-handling conventions.
- Node.js itself can create HTTP servers with `node:http`; Express is optional.

- **Older explanation:** Express was described as middleware built over Connect and the Node.js `http` module for managing routes and server data flow.

### Differentiate between process.nextTick() and setImmediate()?

<!-- id: v~cVm*8B`d, noteType: Basic-66869 -->

Similarities:

- Both schedule callbacks asynchronously.

Differences:

- `process.nextTick`: runs before Promise microtasks and before the event loop continues; excessive use can starve I/O.
- `setImmediate`: runs in the "check" phase, after I/O events in the current loop iteration.

- **Older shorthand:** `process.nextTick()` was described as running immediately after the current operation, while `setImmediate()` runs in the check phase.

### How does Node.js handle the child threads?

<!-- id: GD*SDh?Cn4, noteType: Basic-66869 -->

- Node.js exposes parallel execution through `node:worker_threads`.
- Use `Worker` for CPU-bound JavaScript that should run outside the main event loop.
- Use `node:child_process` when process isolation, a separate executable, or independent memory is needed.
- The libuv worker pool handles some Node operations internally, but it is not a replacement for application workers.

- **Older explanation:** Node.js was described as not exposing child-thread management and only using background threads for selected asynchronous I/O. Modern Node exposes `worker_threads` directly.

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
- `process.nextTick`: run before Promise microtasks and before the next event-loop phase; avoid recursive use that starves I/O.

### What do you understand by an Event Emitter in Node.js?

<!-- id: nh{/j`:{h2, noteType: Basic-66869 -->

- `EventEmitter` is a class for objects that publish named events.
- Register listeners with `.on()` or `.once()` and emit events with `.emit()`.
- Listeners run synchronously in registration order unless the listener explicitly schedules asynchronous work.
- Handle the special `'error'` event to avoid an unhandled process error.

- **Older explanation:** Event listeners attached with `.on()` were described as being invoked synchronously when `.emit()` was called.

### Module resolution and node_modules scanning

<!-- id: ck!%(J[b<<, noteType: Basic-66869 -->

- For a CommonJS bare specifier such as `require('foo')`, Node searches package locations according to the package and module-resolution rules.
- ESM uses package `exports`, `imports`, URL-based resolution, and package `type` rules; it is not simply the old `node_modules` scan.
- Prefer package `exports` maps and explicit file extensions for portable modern packages.

Example search order for `/home/user/project/app.js` requiring `bar`:

- `/home/user/project/node_modules/bar`
- `/home/user/node_modules/bar`
- `/home/node_modules/bar`
- `/node_modules/bar`

- **Legacy CommonJS model:** this upward `node_modules` scan was commonly taught as the complete resolution algorithm. It remains useful for bare CommonJS imports, but it does not describe ESM package exports or import maps.

### File-Based Module characteristic

<!-- id: JTrq&Lbe,S, noteType: Basic-66869 -->

- CommonJS characteristics:
  - Conditional loading: `require()` can be called inside code paths.
  - Synchronous loading: `require()` blocks while the module is loaded.
  - Caching: modules are cached by resolved filename after the first load.
- ESM is statically analyzable and uses asynchronous loading semantics; use `import()` when dynamic loading is needed.

- **Older explanation:** `require()` was described as conditional, synchronous, and cached by resolved path; those characteristics still apply to CommonJS.

### Types of modules? The require order?

<!-- id: iUMzXO(8Ml, noteType: Basic-66869 -->

- Core module: `require('node:fs')`
- File-based module: `require('../foo')`
- Folder-based module: `require('../foo')`, `require('../foo/index')`
- Module in `node_modules`: `require('foo')`
- Folder with `package.json` and `main` field
- Folder with `index.js`

- The exact rules differ between CommonJS and ESM; package `exports` can restrict or redefine public entry points.

- **Older simplified order:** core module, file module, folder module, package in `node_modules`, `package.json` `main`, then `index.js`.

### main vs exports in package.json

<!-- id: Jop|IV]kWN, noteType: Basic-66869 -->

In `package.json`, these fields influence how consumers resolve your package:

- `main`: CommonJS entry point (`require()` in Node).
- `module`: a bundler convention, not a universal Node.js resolution field.
- `browser`: browser-specific entry or file map overrides.
- `types` (or `typings`): TypeScript declaration file path.
- `exports`: modern field for conditional and subpath exports; takes precedence over `main`/`module` when present.

Highlights of `exports`:

- Conditional exports: different files for `node`, `browser`, `import`, `require`.
- Subpath exports: expose controlled internal files.
- Encapsulation: hide files not exported.

- In modern Node.js packages, treat `exports` as the public contract and define explicit `import`, `require`, `node`, `default`, and/or `types` conditions as needed.
- Do not rely on a universal `exports` > `browser` > `module` > `main` order; tools and conditions differ.

- **Older bundler-oriented guidance:** `exports` was summarized as taking priority over `browser`, `module`, and `main`, with top-level `types` used for TypeScript when no conditional type export existed.

### What new features were added in Node.js 22?

- **Stable watch mode:** `node --watch app.js` restarts the process when imported files change.
- **`node --run`:** Runs a script from `package.json` without requiring npm:

```bash
node --run test
```

- **Built-in WebSocket client:** Use the browser-compatible global `WebSocket` for client connections without an extra dependency.
- **`fs.glob()` and `fs.globSync()`:** Match file paths using glob patterns from the built-in filesystem module.
- **Improved `node:test`:** Use the built-in test runner, subtests, coverage support, watch mode, and mocking APIs.
- **Synchronous `require()` of eligible ESM:** Node 22.12+ can load synchronous ESM graphs from CommonJS; modules containing top-level `await` still cannot be loaded this way.

### What new features were added in Node.js 24?

- Node.js 24 includes V8 13.6 and npm 11.
- `URLPattern` is available as a global for matching structured URLs.
- The permission model uses `--permission` with flags such as `--allow-fs-read` and `--allow-fs-write`.
- `node:test` includes improved subtest handling, global setup/teardown support, and stable timer mocking from supported versions.
- `AsyncLocalStorage` uses the newer `AsyncContextFrame` implementation by default.
- Test the application and native addons against Node 24 before upgrading because runtime validation, OpenSSL, platform support, and V8 behavior may change.

### Can Node.js execute TypeScript directly?

- Node.js 22.6 introduced experimental type stripping; later Node 22 releases enabled it by default.
- Node.js 24.12 made type stripping stable.
- It removes erasable TypeScript syntax but does not type-check the program or apply `tsconfig.json` path aliases and transformations.
- Features that require JavaScript generation, such as enums and namespaces, need a TypeScript transform or a tool such as `tsx`.

```bash
node app.ts
```

### What is the modern Node.js test runner?

- Import `test` from `node:test` and assertions from `node:assert/strict`.
- It supports nested tests, lifecycle hooks, subtests, mocking, watch mode, and built-in reporters.
- Use it when a project wants a built-in test runner without adding Jest or another test framework.

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';

test('addition works', () => {
  assert.equal(2 + 2, 4);
});
```

### Which Node.js APIs are deprecated or removed in Node.js 22/24?

- **Removed in Node.js 23:** `process.assert`; use `node:assert` instead.
- **Runtime-deprecated in Node.js 24:** `url.parse()`; use the WHATWG `URL` API.
- **Runtime-deprecated in Node.js 24:** `SlowBuffer`; use `Buffer.allocUnsafeSlow()` only when that behavior is specifically required.
- **Deprecated:** passing `args` to `child_process.spawn()` and `execFile()` options; pass arguments through the dedicated arguments parameter.
- **Legacy:** CommonJS-only module-resolution examples that ignore ESM, package `exports`, and the `node:` prefix.
