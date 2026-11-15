# React

[[toc]]

### What are the features of React?

<!-- id: CXyf=jKNW+, noteType: Basic-66869 -->

- Uses a virtual DOM instead of manipulating the real DOM directly.
- Supports server-side rendering (SSR) with hydration.
- Follows unidirectional data flow.
- Encourages reusable, composable UI components.

### What do you know about the Virtual DOM?

<!-- id: FoyA}$T9QX, noteType: Basic-66869 -->

- The Virtual DOM (VDOM) is an in-memory representation of the real DOM.
- It starts as a copy of the real DOM and updates are computed against it.

- Update steps:
  - When data changes, React re-renders the UI into the Virtual DOM.
  - React diffs the previous and current Virtual DOM trees.
  - React applies minimal changes to the real DOM.

### Differentiate between Real DOM and Virtual DOM

<!-- id: x7v|@{%0DI, noteType: Basic-66869 -->

|                     | Real DOM                                                            | Virtual DOM                                                     |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| What it is          | The browser's actual page object tree                               | Lightweight in-memory JS copy of the real DOM                   |
| Update cost         | Expensive; every update can trigger layout/reflow and repaint       | Cheap; updates happen on plain JS objects, then get diffed      |
| Update granularity  | Updates the whole node even for small changes                       | Diffs old vs. new trees and applies only the minimal changes    |
| Performance         | Slower with frequent updates                                        | Faster: batching + diffing minimize real DOM work               |
| Memory              | Lower (single source of truth)                                      | Higher (keeps extra trees/copies in memory)                     |
| Direct manipulation | Can be manipulated directly with APIs like `document.createElement` | Cannot act on the page directly; React syncs it to the real DOM |

- In short, React renders to the Virtual DOM, diffs it against the previous version (reconciliation), and applies only the necessary changes to the Real DOM.
- This trades some memory for much less expensive DOM manipulation.

### What do you understand from “In React, everything is a component.”

<!-- id: cC3W]O5b<X, noteType: Basic-66869 -->

- Components are the building blocks of a React UI.
- They split the UI into small, independent, reusable pieces.
- Each component renders independently without affecting other parts of the UI.

### Explain the purpose of render() in React.

<!-- id: x!BVn-%YPh, noteType: Basic-66869 -->

- Class components implement `render()` to return a React element.
- The returned element describes what should appear in the DOM.

### How can you embed two or more components into one?

<!-- id: xP@n:Hci!/, noteType: Basic-66869 -->

```jsx
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Header />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <h1>Header Component</h1>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('content'));
```

### What are Props?

<!-- id: tD#fA>`[%T, noteType: Basic-66869 -->

- Props are read-only and should be treated as immutable.
- They are passed from a parent component to a child component.
- A child component cannot send props back to its parent.
- This creates a one-way data flow from parent to child.
- Props are commonly used to render dynamic data such as API results or user input.

### What is a state in React and how is it used?

<!-- id: bLvjjlaMiO, noteType: Basic-66869 -->

- State is a component-owned object that holds information that changes over time.
- Unlike props, state is private, mutable, and controlled by the component.

### What are the different phases of React component’s lifecycle?

<!-- id: s|1Jjpm@vg, noteType: Basic-66869 -->

- Mounting: `constructor`, `getDerivedStateFromProps`, `render`, `componentDidMount`.
- Updating: `getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`.
- Unmounting: `componentWillUnmount`.

### Explain the lifecycle method componentWillMount()

<!-- id: j)Q37W1S~;, noteType: Basic-66869 -->

- Executes just before rendering on both the client and server.

### Explain the lifecycle method componentDidMount()

<!-- id: N>f,)5@dr3, noteType: Basic-66869 -->

- Executes on the client only, after the first render.

### Explain the lifecycle method componentWillReceiveProps()

<!-- id: ho>RBCRWF0, noteType: Basic-66869 -->

- Invoked when props are received from the parent and before another render.

### Explain the lifecycle method shouldComponentUpdate()

<!-- id: vh)e2!`1]i, noteType: Basic-66869 -->

- Returns `true` or `false` based on conditions to determine whether the component should update.
- Returns `true` by default.

### Explain the lifecycle method componentWillUpdate()

<!-- id: d5&3Sa#z}z, noteType: Basic-66869 -->

- Called just before rendering takes place in the DOM.

### Explain the lifecycle method componentDidUpdate()

<!-- id: NQ2y}4fy!;, noteType: Basic-66869 -->

- Called immediately after rendering takes place.

### Explain the lifecycle method componentWillUnmount()

<!-- id: bDPgrPkhAj, noteType: Basic-66869 -->

- Called after the component is unmounted from the DOM.
- Used to clean up resources.

### What is a synthetic event?

<!-- id: m<ZO3o7eUB, noteType: Basic-66869 -->

- Synthetic events wrap browser-native events to provide a consistent, cross-browser API.
- Examples include `onClick` and `onBlur`.

### What are Higher Order Components(HOC)?

<!-- id: p|p^V2r_Zd, noteType: Basic-66869 -->

- A HOC is a component that wraps another component to reuse logic.
- It’s a pattern leveraging React’s compositional nature.
- HOCs don’t modify the input component’s behavior; they compose it.
- Benefits include:
  - Code reuse and logic abstraction
  - Render hijacking
  - State abstraction/manipulation
  - Props manipulation

### In which lifecycle event do you make AJAX requests and why?

<!-- id: z)(}a@a$=*, noteType: Basic-66869 -->

- Perform data fetching in `componentDidMount` (or `useEffect` in function components).
- Ensures the component is mounted before calling `setState`.
- Avoids updates on unmounted components.

### How do you tell React to build in Production mode and what will that do?

<!-- id: uJ}BIoh[@B, noteType: Basic-66869 -->

- Configure your bundler to set `process.env.NODE_ENV = 'production'`.
- Enables production optimizations and removes development warnings.
- Minify code to leverage dead-code elimination and reduce bundle size.

### What is JSX (JS XML)?

<!-- id: xq?sv-se$N, noteType: Basic-66869 -->

- JSX is syntax sugar for `React.createElement()`.
- It lets you write component templates in HTML-like syntax that compile to JavaScript.

### What is React?

<!-- id: OL!DT=<3S=, noteType: Basic-66869 -->

- React is an open-source front-end JavaScript library for building user interfaces, especially single-page applications.
- It handles the view layer for web and mobile apps.

### What is the difference between state and props?

<!-- id: L$ga}WG3v[, noteType: Basic-66869 -->

- Props are inputs passed to a component (like function parameters).
- State is managed within the component (like local variables) and can change over time.

### "What is ""key"" prop?"

<!-- id: Ik1K8!QFj`, noteType: Basic-66869 -->

- `key` is a special string attribute used in lists to help React identify items.
- Improves diffing by tracking inserted, removed, or changed elements.

### What is context?

<!-- id: s09rc`.>(;, noteType: Basic-66869 -->

- Context lets you pass data through the component tree without prop drilling.

### What is reconciliation?

<!-- id: Ll)X1;&(:*, noteType: Basic-66869 -->

- When props/state change, React compares the new element with the previous.
- If different, React updates the DOM minimally — this is reconciliation.

### What are fragments?

<!-- id: Ix{-[~VBNX, noteType: Basic-66869 -->

- Fragments let components return multiple children without extra DOM nodes.
- Use `<>...</>` or `<React.Fragment>...</React.Fragment>`.

### What are error boundaries in React v16?

<!-- id: jrI~R6S+um, noteType: Basic-66869 -->

- Error boundaries catch errors in child components and render fallback UI.
- Implement with `componentDidCatch(error, info)` and/or `static getDerivedStateFromError()`.

### What is the use of react-dom package?

<!-- id: NS#J5g]Rh2, noteType: Basic-66869 -->

- Provides DOM-specific methods for React apps:
  - `render(element, container)`
  - `hydrate(element, container)` (for SSR hydration)
  - `unmountComponentAtNode(container)`
  - `findDOMNode(instance)` (prefer refs instead)
  - `createPortal(child, container)`

### What is ReactDOMServer?

<!-- id: fI:#fODmB`, noteType: Basic-66869 -->

- Enables rendering components to static markup for SSR.
- Common methods:
  - `renderToString(component)`
  - `renderToStaticMarkup(component)`

Example:

```js
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(<App />);
// send html as response
```

### Why is a component constructor called only once?

<!-- id: QnC1mCl>/., noteType: Basic-66869 -->

- React's reconciliation algorithm assumes that a custom component in the same place on subsequent renders is the same component.
- It reuses the previous instance rather than creating a new one.

### What are the common folder structures for React?

<!-- id: x4PNquO)-1, noteType: Basic-66869 -->

- Grouping by feature or route (co-locate components, hooks, tests).
- Grouping by file type (components, hooks, styles, tests in separate dirs).

### What is the benefit of styles modules?

<!-- id: IEl=a.8`Zy, noteType: Basic-66869 -->

- Avoid hard-coding style values in components.
- Extract values that are reused across UI components into their own modules.

### What is React Router?

<!-- id: yX93pYzyV(, noteType: Basic-66869 -->

- A routing library that keeps the UI in sync with the URL.
- Hooks: `useNavigate` (v6), `useLocation`, `useParams`.
- Covers:
  - Configuring routes
  - Navigating with `Link`
  - Nested routes/layouts
  - Programmatic navigation
  - URL params and search params

### How React Router is different from history library?

<!-- id: BHB7^Vf4qD, noteType: Basic-66869 -->

- React Router wraps the `history` library, managing browser and hash histories.
- Adds declarative routing components and React integration.
- Provides memory history for non-browser environments (React Native, tests).

### What is React Interalization?

<!-- id: HZ`|B1)+3~, noteType: Basic-66869 -->

- React Intl is part of FormatJS, which provides bindings to React.
- It helps format strings, dates, numbers, and pluralization.

### What is Flux?

<!-- id: JTC4IS2r3U, noteType: Basic-66869 -->

- Flux is an architectural pattern favoring unidirectional data flow over MVC.
- Complements React; used internally at Facebook.

### What is Redux?

<!-- id: D%yTdeOz31, noteType: Basic-66869 -->

- Redux is a predictable state container inspired by Flux.
- Works with React or other view libraries.
- Hooks: `useSelector`, `useDispatch`.

### What are the core principles of Redux?

<!-- id: L?3|K^p;nZ, noteType: Basic-66869 -->

- Single source of truth: entire app state in one store.
- State is read-only: only actions describe state changes.
- Changes via pure functions: reducers transform state based on actions.

### What is the difference between mapStateToProps() and mapDispatchToProps()?

<!-- id: nT}{UKCH@y, noteType: Basic-66869 -->

- `mapStateToProps()` provides a component with state from the store.
- `mapDispatchToProps()` lets a component dispatch actions that may change application state.

### Can I dispatch an action in reducer?

<!-- id: cW0lc`wjNe, noteType: Basic-66869 -->

- A reducer should process the action payload and return a new state object.
- Avoid adding listeners or dispatching actions in a reducer; this can cause chained actions and other side effects.

### What is the difference between React context and React Redux?

<!-- id: O|C$F95Ya-, noteType: Basic-66869 -->

- Context is built into React and requires minimal setup; Redux requires an additional installation and more setup.
- Context is suitable for data that changes infrequently; Redux is often a better fit for frequently updated data.
- Context can colocate UI and state-management logic, while Redux separates them.
- Redux can be debugged with Redux DevTools.

### How to make AJAX request in Redux?

<!-- id: cO*hTP`t{X, noteType: Basic-66869 -->

- Use Redux Thunk middleware to define asynchronous actions.

### What is the difference between component and container in React Redux?

<!-- id: h[:7?W`BQ;, noteType: Basic-66869 -->

- A component describes the presentational part of an application and can be a class or function component.
- A container is an informal term for a component connected to a Redux store.
- Containers subscribe to Redux state updates and dispatch actions.
- They usually delegate rendering to presentational child components.

### What is redux-saga and its benifits?

<!-- id: yhp:KT%)!|, noteType: Basic-66869 -->

- Redux Saga helps manage side effects in React/Redux applications, such as data fetching or accessing the browser cache.
- Benefits:
  - Makes asynchronous flows easier to read, write, and test.
  - Supports parallel execution, task concurrency, task racing, and task cancellation.

### What are the differences between call() and put() in redux-saga?

<!-- id: ltnzbOZ4mz, noteType: Basic-66869 -->

- Both `call()` and `put()` are effect creator functions.
- `call()` creates an effect description instructing middleware to call a function or promise.
- `put()` creates an effect instructing middleware to dispatch an action to the store.

### What is Redux Thunk?

<!-- id: E))z6dtXj3, noteType: Basic-66869 -->

- Redux Thunk lets action creators return a function instead of an action.
- A thunk can delay dispatching an action or dispatch only when a condition is met.
- The inner function receives the store methods `dispatch()` and `getState()`.

### What are the differences between redux-saga and redux-thunk?

<!-- id: h3pZ0Tf[Zs, noteType: Basic-66869 -->

- Both Redux Thunk and Redux Saga handle side effects.
- Thunk commonly uses Promises; Saga uses Generators.
- Thunk is simpler and uses a familiar pattern, while Saga offers more powerful workflows but requires learning Generators.
- The middleware can coexist, so you can start with Thunk and introduce Saga if needed.

### What are Redux selectors and why to use them?

<!-- id: D&@%=.daPO, noteType: Basic-66869 -->

- Selectors take state and return derived data for components.
- Benefits:
  - Compute derived data to keep state minimal.
  - Memoize to avoid recomputation unless inputs change.

### What is an action in Redux?

<!-- id: lQR+]!`<bS, noteType: Basic-66869 -->

- Actions are plain JavaScript objects that send information from an application to its store.
- Each action must have a `type` property indicating the action being performed.

### What is reselect and how it works?

<!-- id: K>1*eOxf5&, noteType: Basic-66869 -->

- Reselect is a selector library for Redux that computes derived data from application state.
- It avoids recomputation unless an input changes.
- It lets you create selectors that receive other selectors as inputs.

### What are Styled Components?

<!-- id: kI2bdErp*~, noteType: Basic-66869 -->

- `styled-components` lets you style components using CSS-in-JS.
- Co-locates styles with components and removes CSS-to-component mapping.

### Do I need to keep all my state into Redux? Should I ever use react internal state?

<!-- id: s<_LqmJ_tz, noteType: Basic-66869 -->

- The choice depends on the data and how it is used.
- Consider putting data in Redux if:
  - The same data already exists in the store.
  - Other parts of the application need the data.
  - You need to derive additional data from it.

### What is the purpose of registerServiceWorker in React?

<!-- id: tZuNHD4?q@, noteType: Basic-66869 -->

- A service worker is a web API that can cache assets and other files.
- This can help users access the app when offline or on a slow network.
- Service workers add offline capabilities and can improve the user experience.

### What is React memo function?

<!-- id: C&Ugl6PT|A, noteType: Basic-66869 -->

- Class components can avoid re-rendering when their props are unchanged by using `PureComponent` or `shouldComponentUpdate`.
- Wrap a function component in `React.memo` for similar behavior.

### What is React lazy function?

<!-- id: sdfVTRnIMW, noteType: Basic-66869 -->

- `React.lazy` lets you render a dynamic import as a regular component.
- It loads the separate bundle containing the component when it is rendered.
- The imported module must have a default export that is a React component.

### What are hooks? What rules need to be followed for hooks?

<!-- id: Qv$v0hsu4H, noteType: Basic-66869 -->

- Hooks let you use state and other React features without writing a class (introduced in React 16.8).
- Follow these rules:
  - Call Hooks only at the top level of React functions, not inside loops, conditions, or nested functions.
  - Call Hooks from React functions or other Hooks.
  - Start custom Hook names with the `use` prefix.

### In which scenarios error boundaries do not catch errors?

<!-- id: d9>c:-w]`Y, noteType: Basic-66869 -->

- Error boundaries do not catch errors:
  - In event handlers.
  - In asynchronous code such as `setTimeout` or `requestAnimationFrame` callbacks.
  - During server-side rendering.
  - In the error boundary itself.

### What is the proper placement for error boundaries?

<!-- id: kN0oYYZvfJ, noteType: Basic-66869 -->

- Wrap top-level route components to display a generic error message for the application.
- Wrap individual components to prevent one from crashing the rest of the application and provide an isolated error state.

### What is the methods order when component re-rendered?

<!-- id: 9E/elaX9], noteType: Basic-66869 -->

- An update can be caused by changes to props or state.
- During a re-render, these methods are called in order:
  - `static getDerivedStateFromProps()`
  - `shouldComponentUpdate()`
  - `render()`
  - `getSnapshotBeforeUpdate()`
  - `componentDidUpdate()`

### What are the methods invoked during error handling?

<!-- id: Mm_cR69)FD, noteType: Basic-66869 -->

- These methods are called when an error occurs during rendering, in a lifecycle method, or in a child component's constructor:
  - `static getDerivedStateFromError()`
  - `componentDidCatch()`

### What is the purpose of unmountComponentAtNode method?

<!-- id: Hep+>5!.c>, noteType: Basic-66869 -->

- `unmountComponentAtNode()` is available from the `react-dom` package.
- It removes a mounted React component from the DOM and cleans up its event handlers and state.
- If no component is mounted in the container, it does nothing.
- Returns `true` if a component was unmounted and `false` if there was none.

### What is NextJS and major features of it?

<!-- id: NGBh@8n]?, noteType: Basic-66869 -->

- Next.js is a React framework for static and server-rendered applications.
- It also provides styling and routing solutions.
- Major features:
  - Server rendering by default.
  - Automatic code splitting for faster page loads.
  - Simple page-based client-side routing.
  - A Webpack-based development environment with HMR support.
  - Integration with Express or another Node.js HTTP server.
  - Customizable Babel and Webpack configurations.

### Optimizing performance in a React application? List the React hook functions

<!-- id: gA2?HOKfQ$, noteType: Basic-66869 -->

- Keep component state local when appropriate (`useState`, `useEffect`).
- Split complex components into smaller ones.
- Avoid passing props through many levels; consider React Redux, `useContext`, or `useReducer`.
- Memoize components to prevent unnecessary re-renders (`React.memo`).
- Memoize expensive calculations or callbacks (`useMemo`, `useCallback`).
- Extract reusable logic into custom Hooks.
- Use refs to store mutable values without triggering a re-render.
- Use debounce and throttle to avoid sending multiple requests in a short time.
- Use code splitting with dynamic `import()`.
- Use windowing or list virtualization.
- Lazy-load images.

### React vs Angular

<!-- id: QGo2Qir#W_, noteType: Basic-66869 -->

- React is a library, while Angular is a full-featured framework.
- React uses a virtual DOM and one-way data binding; Angular uses the real DOM and two-way data binding.

### How to write unit tests for custom hooks?

<!-- id: ENY(b|8)-X, noteType: Basic-66869 -->

- Use React Hooks Testing Library to write unit tests for custom Hooks.
- `renderHook` renders a custom Hook so you can exercise it as you would in a component.
- `act` executes methods returned by the Hook and ensures updates have been processed.
- Reference: React | Write a unit test for custom hooks in ten minutes - DEV Community

### What is React Testing Library?

<!-- id: Mh[jf[d7|q, noteType: Basic-66869 -->

- React Testing Library is a set of helpers built on DOM Testing Library for testing React components.
- It helps tests reflect how users interact with components and is supported by Create React App by default.
- Sample test steps:
  - Arrange (`render`): Render a React element into the DOM.
  - Act (`fireEvent`): Fire events to simulate user actions.
  - Assert: Verify the expected result.

### Testing Recipes in React components

<!-- id: h!$Xko2UDE, noteType: Basic-66869 -->

- Setup and teardown:
  - Use `beforeEach` to set up a DOM element as a render target.
  - Use `afterEach` to clean up and unmount the tree.
- `act` ensures updates are processed and applied to the DOM before assertions.
- Rendering: test whether a component renders correctly for given props.
- Data fetching: mock requests with dummy data.
- Mocking modules: replace third-party modules with dummy implementations.
- Events: dispatch real DOM events on elements.
- Timers: use fake timers when needed.
- Snapshot testing: save snapshots of rendered output to check for unexpected changes.

### What are end-to-end tests?

<!-- id: LY)5dv7=b:, noteType: Basic-66869 -->

- End-to-end tests cover longer, business-critical workflows such as payments or signups.
- They can test how a real browser renders the app, fetches data from real APIs, uses sessions and cookies, and navigates between links.
- Assertions can cover side effects in the browser and, when needed, on the backend.

### Recoil State management core concepts

<!-- id: Gyhl*=HSc`, noteType: Basic-66869 -->

- Recoil is a state-management library for React that creates a data-flow graph from atoms, through selectors, to components.
- Atoms:
  - Represent shared units of state that components can subscribe to.
  - Re-render subscribed components when updated.
  - Can be shared across components or used instead of local component state.
- Selectors:
  - Are pure functions that accept atoms or other selectors as inputs.
  - Recompute when upstream atoms or selectors change.
  - Can be subscribed to by components, which then re-render when selector values change.
- Common APIs:
  - `RecoilRoot`: Wraps components that use Recoil state; it is commonly placed near the app root.
  - `useRecoilState()`: Reads and writes an atom.
  - `useRecoilValue()`: Reads an atom or selector value.
- Reference: Getting Started | Recoil (recoiljs.org)

### Client Site Rendering (CSR), Server Site Rendering (SSR) and SSG (Static Site Generation)

<!-- id: c,l~8(c`.7, noteType: Basic-66869 -->

- CSR:
  - The server sends HTML and JavaScript files.
  - The browser downloads the JavaScript and runs React to make the page dynamic.
- SSR:
  - The server builds and sends the HTML page.
  - The browser renders the HTML and downloads JavaScript in the background.
  - React adds interactivity to the page.
- SSG:
  - HTML files are generated at build time.
  - The browser renders the HTML and downloads JavaScript in the background.
  - React adds interactivity to the page.
- Typical uses:
  - CSR: login and dashboard pages that do not need SEO.
  - SSR: pages with dynamic data that need SEO and fast initial loading.
  - SSG: pages that do not need frequent updates and need fast initial loading.

### How to Create a React Component Library

<!-- id: ukjH*S<[!,, noteType: Basic-66869 -->

- Initialize the project.
- Create components.
- Add TypeScript.
- Add Rollup.
- Build the library.
- Possible next steps:
  - Add CSS and SCSS.
  - Optimize the library.
  - Add tests and Storybook.

### When should you memoize in React?

<!-- id: O^J|aZOs#P, noteType: Basic-66869 -->

- Reference: When should you memoize in React (prateeksurana.me)

### What is React Fiber?

<!-- id: gEdvk}bCx<, noteType: Basic-66869 -->

- Fiber is the reconciliation engine introduced in React 16.
- Its main goal is to enable incremental rendering of the Virtual DOM.
- It improves the Virtual DOM comparison and reconciliation process.

### useState hook

<!-- id: q(a+%30cl2, noteType: Basic-66869 -->

- Returns a stateful value and a function to update it.
- On the initial render, the returned state is the value passed as `initialState`.
- Lazy initialization: pass a function to compute an expensive initial state; React calls it only on the initial render.
- The setter accepts a new state value and enqueues a re-render.
- To compute state from the previous value, pass a function to the setter.
- On subsequent renders, the returned state reflects the latest value after updates.
- React guarantees that the setter identity is stable across renders, so it can be omitted from Effect or callback dependency lists.
- If the new state is identical to the current state (using `Object.is`), React can skip rendering children and firing Effects.
- React may batch several state updates into one re-render for performance.

### useRef

<!-- id: o[>+!Bp3;=, noteType: Basic-66869 -->

- `useRef` returns a mutable ref object whose `.current` property is initialized to the passed value.
- The object persists for the lifetime of the component and remains the same across renders.
- Unlike a manually created `{ current: ... }` object, `useRef` returns the same ref object on every render.
- Changes to `.current` do not notify React or trigger a re-render.

### React Profiler API

<!-- id: Nz8&|&mPsU, noteType: Basic-66869 -->

- The Profiler measures how often an application renders and the cost of rendering.
- It helps identify slow parts of an application that may benefit from optimizations such as memoization.

### When exactly does React clean up an effect?

<!-- id: kd9Bf6FSN3, noteType: Basic-66869 -->

- React cleans up an Effect when its component unmounts.
- Effects can run after every render, not just once.
- Before running an Effect again, React cleans up the previous Effect.

### useEffect

<!-- id: A<}Q3=<z&e, noteType: Basic-66869 -->

- By default, Effects run after every completed render.
- Return a cleanup function to clean up before the component is removed from the UI.
- When a component renders again, React cleans up the previous Effect before running the next one.
- `useEffect` is deferred until after the browser paints.
- To control when an Effect runs:
  - Provide dependencies to re-run it when those values change.
  - Pass an empty dependency array to run it after the initial render only.
- Practice challenge: https://www.greatfrontend.com/questions/javascript/use-query?framework=react&tab=coding
- Reference: https://react.dev/learn/synchronizing-with-effects

### useEffect vs useLayoutEffect

<!-- id: 0nio)!l~N, noteType: Basic-66869 -->

- `useEffect` runs after the browser paints, making it suitable for side effects that do not affect layout.
- `useLayoutEffect` runs synchronously before painting, making it suitable for DOM measurements or preventing visual flicker.
- Use `useLayoutEffect` sparingly because it blocks painting.

### NextJS + Astro

<!-- id: J0~8W6;Q*@, noteType: Basic-66869 -->

- Reference: NextJS to Astro: more control = faster sites - YouTube

### useEffect called twice in react 18

<!-- id: PHP~2a$F~o, noteType: Basic-66869 -->

- React 18 Strict Mode runs Effects an extra time in development to help identify unsafe lifecycle behavior.
- This check should not be disabled.

### Webpack properties: entry, output, resolve, module, plugins

<!-- id: o?*gFk]U-l, noteType: Basic-66869 -->

- `npx webpack` takes an entry script as its entry point and generates output as configured.

- resolve: configure how modules are resolved.
  - alias: use aliases instead of relative import paths.
  - extensions: resolve extensions in order; use `'...'` to include defaults.
- module: determine how different types of modules are treated.
  - rules: apply loaders or modify the parser when creating modules.
- plugins: array of webpack plugins; allow different behavior between development and release builds.

### Babel webpack plugins: @babel/core, @babel/plugin-transform-runtime, @babel/preset-env, @babel/preset-react

<!-- id: Ir#)rPdX<J, noteType: Basic-66869 -->
