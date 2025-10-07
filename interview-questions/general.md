## General

### Semantic Versioning
<!-- id: eY:H2@%.4, noteType: Basic-66869 -->

"Semantic versioning means versioning your software in a way that the version numbers have significant meaning. Node.js developers follow a three-digit versioning: •

### Optimistic UI Design
<!-- id: hN8B`-(Jk+, noteType: Basic-66869 -->

Basically, It update the UI base on the predictable states immediately without waiting for the data response (The response time should be less than 2s)

### Atomic design methodology
<!-- id: N^VAY=#;8?, noteType: Basic-66869 -->

Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner. The five stages of atomic design are:Atoms: The UI Elements that serve as the elemental building blocks of an interface.Molecules: are collections of atoms that form relatively simple UI components.Organisms: complex UI components composed of groups of molecules and/or atoms and/or other organismsTemplates: place components into a layout and demonstrate the design’s underlying content structurePages: apply real content to templates to demonstrate the final UI and test

### What are Micro Frontends? Pros and cons
<!-- id: xl$L(ll3{<, noteType: Basic-66869 -->

Micro frontends are a new pattern where web application UIs (front ends) are composed from semi-independent fragments that can be built by different teams using different technologies. Advantages: - Team Scalability - Strategic vs Tatical Focus - Reusability - Multiple frameworks Disavantages: - Complexity (Communication, Develop and deploy) - No Standards - Increased Payloads

### SQL vs noSQL database
<!-- id: BajKzoY8*c, noteType: Basic-66869 -->

SQL is the programming language used to interface with relational databases. NoSQL is a class of DBMs that are non-relational and generally do not use SQL.

### Consistency, Availability and Partition Tolerance Trade offs
<!-- id: kUN[}Z<I0M, noteType: Basic-66869 -->

Tradeoff between consistency, availability and latency exists even when there are no network partitions. Reason for tradeoff is that a high availability requirement implies that the system must replicate data.

### Monolith Repo?
<!-- id: IrHPS@zxIm, noteType: Basic-66869 -->

An app architecture for managing multiple packages from your local files system within a singular top-level, root package. Dependencies can be linked together, which is also a better mechanism than yarn link All your project dependencies will be installed together

### How do you handle state management in single-page applications?
<!-- id: x33bnAGIDa, noteType: Basic-66869 -->

Without a full framework or library like React or Vue.js, properly handling state management is not a trivial task.

Some options available through the language itself are:

Global Variables: You can use global variables, or perhaps a global object to centralize state. The problem with this approach is that it can become quite unmanageable for large applications. It’s also a lot harder to maintain local state inside single components.

Module Pattern: You can use this pattern to encapsulate state and provide a clear API to manage it. You would have to instantiate local instances of these modules for individual components.

Pub/Sub Pattern: This option is more sophisticated, and it decouples state changes using event-driven architecture. It’s a more complex solution, but it provides a bigger flexibility.

State Management Libraries: You can always use something like Redux or similar libraries without frameworks.

### Popular State Managements
<!-- id: t@x*lA5n0K, noteType: Basic-66869 -->

- Redux: Predictable state container - Zustand: state-management solution using simplified flux principles. The store is a hook which can be used anywhere, no provider needed. - RxJS: a library for reactive programming using Observables - React-query: data-fetching library for React. it makes fetching, caching, synchronizing and updating server state in React applications easier

### How to write effective unit test
<!-- id: lyg>gf8Nk-, noteType: Basic-66869 -->

Test Small Pieces of Code in Isolation Follow Arrange, Act, Assert Keep Tests Short and simple Cover Happy Path First then Test Edge Cases Write Tests Before Fixing Bugs Make Them Performant Keep Them Stateless and consistent Use Descriptive Names

### What is Bundler? Webpack vs Rollup vs Parcel
<!-- id: ifN|rI<[%Q, noteType: Basic-66869 -->



### CommonJS vs RequireJS (AMD) vs ES6 module
<!-- id: C0,[2LZ@7Q, noteType: Basic-66869 -->

- — — — — CommonJS vs AMD vs RequireJS vs ES6 Modules — — — — - | by Mohanesh Sridharan | Computed Comparisons | Medium - CommonJS: sync module loading, browsers cannot use directly without transpiling - AMD: async module loading, can be used in browser - ES6: native JS, both sync and async module loading, need a transpiler like Babel for old browsers

### Webpack properties: entry, output, resolve, module, plugins
<!-- id: o?*gFk]U-l, noteType: Basic-66869 -->

npx webpack takes entry script as entry point and generate output as output value - resolve: Configure how modules are resolved. + alias: Instead of using relative paths when importing, you can use the alias + extensions: Attempt to resolve these extensions in order. This will override the default array -> you can use '...' to access the default extensions - modules: determine how the different types of modules within a project will be treated. + rules: modify how the module is created. They can apply loaders to the module, or modify the parser. - plugins: array of webpack plugins which allowing different behavior between development builds and release builds.

### Babel webpack plugins: @babel/core, @babel/plugin-transform-runtime, @babel/preset-env, @babel/preset-react
<!-- id: Ir#)rPdX<J, noteType: Basic-66869 -->



### TypeScript configurations
<!-- id: z|37yN*TyO, noteType: Basic-66869 -->



### Monorepo vs MultiRepo
<!-- id: oWn$-@C,-u, noteType: Basic-66869 -->

Should my component library be a monorepo? | Mae Capozzi's Blog

### What is tree shaking, and how does it help with the performance of a web application?
<!-- id: |0!0CpBzT_, noteType: Basic-66869 -->

Tree shaking is a technique used in JavaScript module bundlers, like Webpack or Vite, to remove unused code from the final bundled output.

Main benefits include:

Reduced Bundle Size: Removing unused code reduces the size of the JavaScript bundle sent to the client, improving load times and reducing bandwidth usage.

Improved Performance: Smaller bundle sizes can lead to faster parsing and execution times, resulting in improved performance and responsiveness of the web application.

Better Resource Utilization: Developers can write modular code without worrying about unused dependencies bloating the final bundle size.

### Functional Programming
<!-- id: pI8_%h25(#, noteType: Basic-66869 -->

Functional programming is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions Fundamentals of functional programming with React - LogRocket Blog

### OOP (Object-oriented programming)
<!-- id: L<`X3^^)Qq, noteType: Basic-66869 -->



### Refactoring/Code Review
<!-- id: nHvEZ*!+FP, noteType: Basic-66869 -->

moving code to where it most logically belongsremoving duplicate codemaking names self-documentingsplitting methods into smaller piecesre-arranging inheritance hierarchies Refactoring: clean your code

### Code Review checklist
<!-- id: HTyE=OQv5s, noteType: Basic-66869 -->

Should - Try to Identify Obvious Bugs - Look for Possible Security Issues - Look for “Clever” Code - Check for Code Duplication - Check for Code following a standardized process of the team - Check Whether Names Are Descriptive Enough - Look for Possible Performance Improvements an expensive operation inside a loopexcessive allocations of objectsinefficient string concatenationsinefficient logging - Check the Presence and Quality of Tests The presence of tests: Did the author create tests for their change?The quality of tests: Do the tests created seem to effectively exercise the system under test? Do they follow agreed-upon best practices?Readability: Remember tests are also documentation. They should be simple and easy to understand.Naming: Are the tests named according to the team’s convention? Is it easy to understand what they’re about? - Explain Your Changes - Optional: Code Documentation Should not - Cosmetic Concerns - Manual Testing - Mismatch standardized process of the team between different members What You Need in a Code Review Checklist (& What You Don't) - LinearB

### Test Driven Development (TDD) Cycle
<!-- id: dL.QS0ur6j, noteType: Basic-66869 -->

1. Add a test 2. Run all tests. The new test should fail for expected reasons 3. Write the simplest code that passes the new test 4. All tests should now pass 5. Refactor as needed, using tests after each refactor to ensure that functionality is preserved 6. Repeat from step 1 Development Cycle - Writing the tests first - Each test case fails initially

### What is API gateway?
<!-- id: IL>ndQ?-Zf, noteType: Basic-66869 -->

An API gateway is an API management tool that sits between a client and a collection of backend services. An API gateway acts as a reverse proxy to accept all application programming interface (API) calls, aggregate the various services required to fulfill them, and return the appropriate result. When a client makes a request, the API gateway breaks it into multiple requests, routes them to the right places, produces a response, and keeps track of everything. What does an API gateway do? (redhat.com)
