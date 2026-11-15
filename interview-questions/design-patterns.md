# Design Patterns

[[toc]]

### Singleton Pattern

<!-- id: O)gkj,qXu:, noteType: Basic-66869 -->

- **Intent:** Ensure that a class has one shared instance and provide a global access point.
- **Trade-off:** Global mutable state makes code harder to test and reason about.
- In React, prefer Context or a state-management library when shared state is needed; these are not automatically Singletons.

### Proxy Pattern

<!-- id: u_nwd~iW?V, noteType: Basic-66869 -->

- **Intent:** Intercept access to, or operations on, another object.
- Common uses include validation, formatting, logging, lazy loading, and access control.
- Common handler traps are `get` and `set`.

### Provider Pattern/Context API

<!-- id: pP3h4;;xo<, noteType: Basic-66869 -->

- **Intent:** Provide a value to many components without passing props through every intermediate layer.
- React Context is useful for low-frequency shared concerns such as themes, locale, and authentication.
- Avoid putting frequently changing, unrelated state into one context because it can trigger unnecessary re-renders.

### Export and Import in ES6

<!-- id: (Pgm]fGAa, noteType: Basic-66869 -->

- **Named export:** A module can have multiple; imports use braces and normally match the exported name.
- **Default export:** A module can have at most one; the importer may choose any local name.
- Prefer named exports in larger codebases when explicit, refactor-friendly imports are valuable.

Re-Export/Aggregating (Export From):

```js
export * from '…'; // does not set the default export
export * as name1 from '…'; // ECMAScript® 2020
export { name1, name2, nameN } from '…';
export { import1 as name1, import2 as name2, nameN } from '…';
export { default /* others */ } from '…';
```

### Hook vs HOC

<!-- id: m*1(H_^I<$, noteType: Basic-66869 -->

- **Use a HOC when:** the same cross-cutting behavior is shared by many components and should be applied consistently.
- **Use a Hook when:** behavior needs to be composed or customized inside function components.
- Hooks are generally easier to read and compose in modern React; HOCs remain useful for legacy integrations and wrappers.

Reference: HOC Pattern (patterns.dev)
