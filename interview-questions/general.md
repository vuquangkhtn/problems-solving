# General

[[toc]]

### How does the browser render a website?

<!-- id: 5Bv7_9IB[3, noteType: Basic-66869 -->

Phase 1: Network operations

1. DNS lookup: go through multiple cache levels. If not found, it processes DNS lookup
2. TCP Connection: 3 round trips
3. TLS Handshake: 3 + 5 = 8 round trips. connection reuse and keep alive headers are good for perf
4. HTTP Request/Reponse: get HTML content. TTFB measures how long server responds

Phase 2: Browser rendering

1. HTML Parsing to DOM Tree: parse the HTML code in the document and create a DOM Tree while preload scanner find the CSS and JS files to download in parallel.
2. CSS Parsing to CSSOM Tree: block the rendering of the document.
3. Javascript Execution: parse and execute the javascript code in the document. block HTML parsing.
4. Render Tree Construction: combine the DOM Tree and CSSOM Tree to form the Render Tree.
5. Layout: calculate the position and size of each element in the document.
6. Painting: draw the pixels on the screen.
7. Compositing: combine the layers to form the final image. Leverage GPU acceleration.

Critical Rendering Path: is the sequence of steps the browser takes to render a website as mentioned above.

### Semantic Versioning

<!-- id: eY:H2@%.4, noteType: Basic-66869 -->

Semantic versioning means versioning your software in a way that the version numbers have significant meaning.
Node.js developers follow a three-digit versioning scheme: `MAJOR.MINOR.PATCH`.

MAJOR: For breaking changes
MINOR: For new features without breaking changes
PATCH: For bug fixes without breaking changes

### Optimistic UI Design

<!-- id: hN8B`-(Jk+, noteType: Basic-66869 -->

Updates the UI based on predictable states immediately, without waiting for the data response.
The response time should be less than 2 seconds.

### Atomic design methodology

<!-- id: N^VAY=#;8?, noteType: Basic-66869 -->

Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner.

The five stages of atomic design are:

- Atoms: elemental UI building blocks.
- Molecules: collections of atoms forming simple UI components.
- Organisms: complex UI components composed of groups of molecules and/or atoms and/or other organisms.
- Templates: place components into a layout and demonstrate the design’s underlying content structure.
- Pages: apply real content to templates to demonstrate the final UI and test.

### What are Micro Frontends? Pros and cons

<!-- id: xl$L(ll3{<, noteType: Basic-66869 -->

Micro frontends are a pattern where web application UIs are composed from semi-independent fragments.
Fragments can be built by different teams using different technologies.

Advantages:

- Team scalability.
- Strategic vs tactical focus.
- Reusability.
- Multiple frameworks.

Disadvantages:

- Complexity (communication, development, deployment).
- No standards.
- Increased payloads.

### Monorepo vs MultiRepo

<!-- id: oWn$-@C,-u, noteType: Basic-66869 -->

- **Monorepo**: Single repository containing multiple packages; Dependencies can be linked together; easier dependency management, atomic commits, code sharing, but can be dependent and become complex at scale.
- **MultiRepo**: Separate repositories per package; better isolation, independent versioning, easier to manage permissions, but requires coordination across repos and duplicated dependencies.

Should my component library be a monorepo? | Mae Capozzi's Blog

### How to write effective unit test

<!-- id: lyg>gf8Nk-, noteType: Basic-66869 -->

- Test small pieces of code in isolation.
- Follow Arrange–Act–Assert.
- Keep tests short and simple.
- Cover happy path first, then test edge cases.
- Write tests before fixing bugs.
- Make them performant.
- Keep them stateless and consistent.
- Use descriptive names.

### Test Driven Development (TDD) Cycle

<!-- id: dL.QS0ur6j, noteType: Basic-66869 -->

1. Add a test.
2. Run all tests; the new test should fail for expected reasons.
3. Write the simplest code that passes the new test.
4. Run all tests; they should now pass.
5. Refactor as needed, using tests after each refactor to ensure functionality is preserved.
6. Repeat from step 1.

Development cycle:

- Write tests first.
- Each test case fails initially.

### CommonJS vs RequireJS (AMD) vs ES6 module

<!-- id: C0,[2LZ@7Q, noteType: Basic-66869 -->

- CommonJS: synchronous module loading; browsers cannot use directly without transpiling.
- AMD (RequireJS): asynchronous module loading; usable in browsers.
- ES6 modules: native JS modules; both sync and async loading; older browsers need a transpiler like Babel.

### What is Bundler? Webpack vs Rollup vs Parcel

<!-- id: ifN|rI<[%Q, noteType: Basic-66869 -->

A bundler is a tool that takes multiple JavaScript files and their dependencies, combines them into one or more optimized files (bundles) for deployment.

Bundlers improve performance by reducing HTTP requests, enabling code splitting, minification, and dead code elimination (tree shaking).

Key bundlers:

- **Webpack**: Use for large, complex applications requiring fine-grained control;
- **Rollup**: Use for libraries and optimized production bundles;
- **Parcel**: Use for quick prototypes and small to medium projects;

### What is tree shaking, and how does it help with the performance of a web application?

<!-- id: |0!0CpBzT_, noteType: Basic-66869 -->

Tree shaking is a technique used in JavaScript module bundlers, to remove unused code from the final bundled output.

Main benefits include:

- Reduced bundle size: removes unused code, improves load times and reduces bandwidth usage.
- Improved performance: smaller bundles parse and execute faster, improving responsiveness.
- Better resource utilization: write modular code without unused dependencies bloating the final bundle.

### How do you handle state management in single-page applications?

<!-- id: x33bnAGIDa, noteType: Basic-66869 -->

State management in single-page applications can be handled through several approaches:

**Without frameworks:**

- Global variables or objects for centralized state (simple but difficult to scale)
- Module pattern to encapsulate state with a clear API
- Pub/Sub pattern for event-driven, decoupled state changes
- Observer pattern for reactive state updates and subscriptions
- Decorator pattern for adding behavior to objects dynamically without modifying their structure (HOC, HOF)

**With frameworks:**

- Use built-in state management (React hooks, Vue reactivity)
- Implement state management libraries (Redux, Zustand, RxJS, React Query)

Key considerations: scalability, predictability, debugging capability, and team familiarity.

### Popular State Managements

<!-- id: t@x*lA5n0K, noteType: Basic-66869 -->

- **Redux**: Use for complex, large-scale applications with intricate state logic and middleware needs.
- **Zustand**: Use for simple to medium projects requiring lightweight state management without provider boilerplate.
- **RxJS**: Use for event-driven architectures and complex async operations with reactive streams.
- **React Query**: Use for server state management, caching, and synchronization in data-fetching scenarios.

### Pure function

Every time we call the function with the same input, we always get the same output.

The function does not affect anything outside of itself and never modifies the input that passes in

### Functional Programming

<!-- id: pI8_%h25(#, noteType: Basic-66869 -->

Functional programming builds software by composing pure functions, avoiding shared state, mutable data, and side effects.
It is declarative rather than imperative, and application state flows through pure functions.

Used when: building systems that require immutability, composability, and predictable behavior; common in data processing, UI frameworks (React), and functional languages (JavaScript, Haskell).

Reference: https://blog.logrocket.com/fundamentals-functional-programming-react/

### OOP (Object-oriented programming)

<!-- id: L<`X3^^)Qq, noteType: Basic-66869 -->

OOP (Object-oriented programming) is a programming paradigm that organizes software around objects (instances of classes) rather than functions.

Key concepts:

- **Encapsulation**: Bundle data and methods together; hide internal details.
- **Inheritance**: Create class hierarchies; child classes inherit from parent classes.
- **Polymorphism**: Objects can take multiple forms; same method works differently based on context.
- **Abstraction**: Simplify complex systems by modeling classes appropriately.

Used when: building large systems with complex relationships, need code reusability, or require clear structure and maintainability.

### Refactoring/Code Review

<!-- id: nHvEZ*!+FP, noteType: Basic-66869 -->

- Move code to where it most logically belongs.
- Remove duplicate code.
- Make names self-documenting.
- Split methods into smaller pieces.
- Re-arrange inheritance hierarchies.
  Reference: Refactoring: clean your code.

### What is API gateway?

<!-- id: IL>ndQ?-Zf, noteType: Basic-66869 -->

An API gateway is an API management tool that sits between a client and a collection of backend services.
It acts as a reverse proxy to accept all API calls, aggregate the various services required to fulfill them, and return the appropriate result.
When a client makes a request, the API gateway breaks it into multiple requests, routes them to the right places, produces a response, and keeps track of everything.
Reference: What does an API gateway do? (redhat.com).

### SQL vs noSQL database

<!-- id: BajKzoY8*c, noteType: Basic-66869 -->

SQL is the programming language used to interface with relational databases. NoSQL is a class of DBMs that are non-relational and generally do not use SQL.

### Consistency, Availability and Partition Tolerance Trade offs

<!-- id: kUN[}Z<I0M, noteType: Basic-66869 -->

Tradeoff between consistency, availability, and latency exists even when there are no network partitions.
Reason for the tradeoff is that a high availability requirement implies that the system must replicate data.

### Code Review checklist

<!-- id: HTyE=OQv5s, noteType: Basic-66869 -->

Should:

- Identify obvious bugs.
- Look for possible security issues.
- Look for “clever” code that reduces readability or maintainability.
- Check for code duplication.
- Check for adherence to the team’s standardized process.
- Check whether names are descriptive enough.
- Look for possible performance improvements (expensive operations inside loops, excessive object allocations, inefficient string concatenations, inefficient logging).
- Check the presence and quality of tests:
  - Presence: Did the author create tests for their change?
  - Quality: Do the tests effectively exercise the system under test and follow best practices?
  - Readability: Tests are documentation; they should be simple and easy to understand.
  - Naming: Are tests named according to the team’s convention and easy to understand?
- Explain your changes.
- Optional: add code documentation.

Should not:

- Focus on cosmetic concerns.
- Rely on manual testing alone.
- Mismatch standardized processes between different team members.

Reference: What You Need in a Code Review Checklist (& What You Don't) - LinearB.
