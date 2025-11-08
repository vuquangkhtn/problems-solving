# Design Patterns

[[toc]]

### Singleton Pattern

<!-- id: O)gkj,qXu:, noteType: Basic-66869 -->

Share a single global instance throughout our application.

In React, we often rely on a global state through state management tools such as Redux or React Context instead of using Singletons.
Although their global state behavior might seem similar to that of a Singleton, these tools provide a read-only state rather than the mutable state of the Singleton.

### Proxy Pattern

<!-- id: u_nwd~iW?V, noteType: Basic-66869 -->

Intercept and control interactions to target objects.
Proxy can help with validation, formatting, notifications, or debugging.
The two most common methods of Proxy handler are `get` and `set`.

### Provider Pattern/Context API

<!-- id: pP3h4;;xo<, noteType: Basic-66869 -->

Makes it possible to pass data to many components, without having to manually pass it through each component layer.

### Export and Import in ES6

<!-- id: (Pgm]fGAa, noteType: Basic-66869 -->

There are two different types of export: named and default.
You can have multiple named exports per module but only one default export.
Named exports are useful to export several values.
During the import, it is mandatory to import them within curly braces with the same name of the corresponding object.
But a default export can be imported with any name.

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

Best use-cases for a HOC:
The same, uncustomized behavior needs to be used by many components throughout the application.
The component can work standalone, without the added custom logic.

Best use-cases for Hooks:
The behavior has to be customized for each component that uses it.
The behavior is not spread throughout the application; only one or a few components use the behavior.
The behavior adds many properties to the component.

Reference: HOC Pattern (patterns.dev)
