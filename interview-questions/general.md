# General

[[toc]]

### How does the browser render a website?

<!-- id: 5Bv7_9IB[3, noteType: Basic-66869 -->

**Phase 1: Network operations**

- **DNS lookup:** The browser checks caches, then resolves the hostname if needed.
- **Connection:** Establish TCP, or QUIC for HTTP/3. The exact number of round trips depends on protocol, caching, and connection reuse.
- **TLS handshake:** Negotiates encryption for HTTPS; TLS 1.3 commonly needs fewer round trips than older versions.
- **HTTP request/response:** The browser requests HTML. **TTFB** measures time until the first response byte.

**Phase 2: Browser rendering**

- **Parse HTML:** Build the DOM; the preload scanner discovers resources in parallel.
- **Parse CSS:** Build the CSSOM; render-blocking styles must be available before a reliable first render.
- **Execute JavaScript:** Scripts can pause parsing and may trigger additional style/layout work.
- **Build the render tree:** Combine visible DOM nodes with their computed styles.
- **Layout:** Calculate each element's size and position.
- **Paint:** Draw text, colors, borders, and images.
- **Composite:** Combine layers, often using GPU acceleration.

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

### Webpack 4 vs Webpack 5

<!-- id: webpack4-vs-webpack5, noteType: Basic-66869 -->

Webpack 5 is the successor to Webpack 4. It keeps the same core bundling model, but improves build performance, caching, browser-platform support, and long-term maintainability.

| Area | Webpack 4 | Webpack 5 |
| --- | --- | --- |
| Build performance | Uses traditional caching; repeated builds can be slower. | Adds persistent filesystem caching and improved incremental builds. |
| Caching | Primarily memory-based or configured through plugins. | Built-in filesystem cache with better cache invalidation. |
| Module Federation | Not built in. | Built-in support for sharing modules between separately deployed applications. |
| Node.js core modules | Automatically polyfills many Node.js modules for browser builds. | No automatic polyfills; browser-compatible fallbacks must be configured explicitly. |
| Asset modules | Usually requires loaders such as `file-loader`, `url-loader`, or `raw-loader`. | Built-in asset module types such as `asset/resource`, `asset/inline`, and `asset/source`. |
| Tree shaking | Supported, but less effective in some cases. | Improved analysis and tree shaking, including better handling of nested and concatenated modules. |
| Output | CommonJS-style output is common. | Supports modern output options such as `output.module` and improved chunk loading. |
| Configuration | Often needs more plugins and loaders for common use cases. | Provides more functionality out of the box, reducing configuration in some projects. |

Important migration differences:

- Replace deprecated loaders with Webpack 5 asset modules where appropriate.
- Add explicit fallbacks for Node.js modules such as `buffer`, `stream`, or `crypto` if browser code still depends on them.
- Review caching configuration and remove plugins that Webpack 5 now provides natively.
- Check plugins and loaders for Webpack 5 compatibility before upgrading.

In short, use Webpack 4 mainly for legacy projects that depend on its existing plugin ecosystem. Prefer Webpack 5 for new projects because it has better caching, modern features, and fewer built-in assumptions about Node.js polyfills.

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

### React vs Angular

<!-- id: QGo2Qir#W_, noteType: Basic-66869 -->

- React is a UI library; Angular is a full-featured framework with more built-in conventions.
- React commonly uses JSX, one-way data flow, and an ecosystem of separately selected libraries.
- Angular provides an integrated framework with templates, dependency injection, routing, forms, and RxJS conventions.
- Avoid oversimplifying the comparison as “Virtual DOM versus real DOM” or “one-way versus two-way binding”; both ecosystems support multiple rendering and data-flow patterns.

### Client-side rendering (CSR), server-side rendering (SSR), and static-site generation (SSG)

<!-- id: c,l~8(c`.7, noteType: Basic-66869 -->

- **CSR:** The browser receives JavaScript and builds or updates the UI on the client.
  - Useful for highly interactive applications such as dashboards.
  - Initial content may be delayed until JavaScript loads.
- **SSR:** The server generates HTML for a request, then the client hydrates it with JavaScript.
  - Useful for dynamic pages that need fast initial content or SEO.
  - Requires hydration correctness and server-rendering infrastructure.
- **SSG:** HTML is generated at build time and served as static assets.
  - Useful for content that changes infrequently and benefits from CDN caching.
  - Dynamic content may require client fetching or regeneration.
- Modern frameworks can combine these strategies per route or component.

### What is Next.js and what are its major features?

<!-- id: NGBh@8n]?, noteType: Basic-66869 -->

- Next.js is a React framework with routing, server/client rendering, data fetching, and deployment conventions.
- Features depend on the selected router and version; server rendering is not always the default for every component or route.
- Modern areas include the App Router, React Server Components, Suspense, streaming, route handlers, image/font optimization, and automatic code splitting.

### Next.js and Astro

<!-- id: J0~8W6;Q*@, noteType: Basic-66869 -->

- Next.js is a React-focused application framework with integrated routing, server rendering, and React Server Components.
- Astro is a content-focused framework that can render mostly static HTML and add interactivity through isolated “islands”; it can use React components alongside other UI frameworks.
- Choose based on application needs, rendering strategy, ecosystem, and team familiarity.
- Reference: Next.js to Astro: more control = faster sites - YouTube

### What are end-to-end tests?

<!-- id: LY)5dv7=b:, noteType: Basic-66869 -->

- End-to-end tests validate complete user workflows in a real or browser-like environment.
- They can cover navigation, rendering, API calls, sessions, cookies, and backend side effects.
- Use them for critical workflows such as checkout, sign-up, login, and payments.
- Keep unit and integration tests for fast feedback; E2E tests are slower and more environment-dependent.

### What do Webpack properties mean?

<!-- id: o?*gFk]U-l, noteType: Basic-66869 -->

- `entry`: The module or modules where bundling begins.
- `output`: The generated bundle location and naming strategy.
- `resolve`: How Webpack finds modules, aliases, and file extensions.
- `module.rules`: How loaders and parsers handle JavaScript, CSS, images, and other assets.
- `plugins`: Build-wide extensions for tasks such as HTML generation, environment injection, and asset analysis.

### What are common Babel packages used with Webpack?

<!-- id: Ir#)rPdX<J, noteType: Basic-66869 -->

- `@babel/core`: The Babel transformation engine.
- `@babel/preset-env`: Transforms modern JavaScript according to target environments.
- `@babel/preset-react`: Transforms JSX and React-specific syntax.
- `@babel/plugin-transform-runtime`: Reuses Babel helper code and can reduce duplication.
- Webpack uses `babel-loader` to run Babel transformations during bundling.
