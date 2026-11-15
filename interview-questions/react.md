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
// Legacy React 17 and earlier:
// ReactDOM.render(<MyComponent />, document.getElementById('content'));

// React 18/19:
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

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('content'));
root.render(<MyComponent />);
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

### Explain `componentWillMount()`

<!-- id: j)Q37W1S~;, noteType: Basic-66869 -->

- **Deprecated/unsafe legacy lifecycle:** use `componentDidMount` or an Effect in a function component instead.
- The old method could run more than once in development or concurrent rendering and should not be used for side effects.
- **Historical behavior:** it executed just before rendering on both the client and server.

### Explain the lifecycle method componentDidMount()

<!-- id: N>f,)5@dr3, noteType: Basic-66869 -->

- Executes on the client only, after the first render.

### Explain `componentWillReceiveProps()`

<!-- id: ho>RBCRWF0, noteType: Basic-66869 -->

- **Deprecated/unsafe legacy lifecycle:** use derived values during render, `componentDidUpdate`, or an Effect when synchronization is genuinely needed.
- Do not copy props into state unless there is a clear synchronization requirement.
- **Historical behavior:** it ran when a parent supplied new props, before the next render.

### Explain the lifecycle method shouldComponentUpdate()

<!-- id: vh)e2!`1]i, noteType: Basic-66869 -->

- Returns `true` or `false` based on conditions to determine whether the component should update.
- Returns `true` by default.

### Explain `componentWillUpdate()`

<!-- id: d5&3Sa#z}z, noteType: Basic-66869 -->

- **Deprecated/unsafe legacy lifecycle:** use `getSnapshotBeforeUpdate` for DOM snapshots or `componentDidUpdate` for post-update work.
- **Historical behavior:** it ran immediately before React updated the DOM.

### Explain the lifecycle method componentDidUpdate()

<!-- id: NQ2y}4fy!;, noteType: Basic-66869 -->

- Called immediately after rendering takes place.

### Explain the lifecycle method componentWillUnmount()

<!-- id: bDPgrPkhAj, noteType: Basic-66869 -->

- Called after the component is unmounted from the DOM.
- Used to clean up resources.

### What is a synthetic event?

<!-- id: m<ZO3o7eUB, noteType: Basic-66869 -->

- React provides `SyntheticEvent` objects to event handlers such as `onClick` and `onBlur`.
- They expose a consistent API across browsers, including `preventDefault()`, `stopPropagation()`, `target`, and `nativeEvent`.
- React DOM removed event pooling in React 17, so event properties are no longer cleared after the handler finishes.
- In React DOM, `event.persist()` is no longer necessary and does nothing; it may still matter in React Native.

### In which lifecycle event do you make AJAX requests and why?

<!-- id: z)(}a@a$=*, noteType: Basic-66869 -->

- In class components, perform client-side data fetching in `componentDidMount`.
- In function components, use an Effect only for synchronization with an external system; framework loaders or a data library are often better for route/API data.
- Abort or ignore stale requests in cleanup to avoid race conditions.
- **Older explanation:** fetching in `componentDidMount` ensured the component was mounted before calling `setState`.

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

### What are error boundaries in modern React?

<!-- id: jrI~R6S+um, noteType: Basic-66869 -->

- Error boundaries catch rendering errors in descendant components and render fallback UI.
- The built-in API is still class-based: implement `static getDerivedStateFromError()` for fallback state and/or `componentDidCatch(error, info)` for logging.

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}
```

- They do not catch event-handler errors, most asynchronous errors, server-rendering errors, or errors thrown by the boundary itself.

### What is the use of the `react-dom` package?

<!-- id: NS#J5g]Rh2, noteType: Basic-66869 -->

- Provides browser-DOM integrations for React applications:
  - `createRoot(container)` and `root.render()` for client rendering.
  - `hydrateRoot(container, element)` for hydrating server-rendered HTML.
  - `createPortal(children, container)` for rendering into another DOM node.
  - `flushSync(callback)` for rare cases that require a synchronous flush.
- **Removed in React 19:** `ReactDOM.render`, `ReactDOM.hydrate`, `unmountComponentAtNode`, and `findDOMNode`.
- Use `root.unmount()` and refs instead of the removed APIs.
- **Legacy React 17 and earlier:** applications commonly used `render`, `hydrate`, `unmountComponentAtNode`, and `findDOMNode` from `react-dom`.

### What is ReactDOMServer?

<!-- id: fI:#fODmB`, noteType: Basic-66869 -->

- Provides server-rendering APIs from `react-dom/server`.
- Common APIs:
  - `renderToString(element)` for a non-streaming HTML string.
  - `renderToStaticMarkup(element)` when React-specific attributes are not needed.
  - `renderToPipeableStream(element, options)` for streaming SSR in Node.js.
  - `renderToReadableStream(element, options)` for Web Streams environments.
- Prefer streaming APIs for new SSR systems that need Suspense and progressive output.
- **Older non-streaming approach:** call `renderToString` or `renderToStaticMarkup` and send the complete HTML response before hydration.

Example:

```js
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(<App />);
// send html as response
```

### Why is a component constructor usually called only once?

<!-- id: QnC1mCl>/., noteType: Basic-66869 -->

- A class component’s constructor runs once for each mounted component instance.
- During ordinary updates, React reuses that instance and calls `render()` again.
- If the component is unmounted, its type changes, or its `key` changes, React creates a new instance and runs the constructor again.

### What are the common folder structures for React?

<!-- id: x4PNquO)-1, noteType: Basic-66869 -->

- **Feature-based structure — usually recommended:** Keep the components, hooks, tests, styles, and API logic for one business feature together.

```text
src/
  features/
    checkout/
      CheckoutPage.jsx
      CheckoutForm.jsx
      useCheckout.js
      checkoutApi.js
      CheckoutForm.test.jsx
```

- Benefits:
  - Related code is easy to find and change together.
  - Features can be developed, tested, and removed with less cross-folder movement.
  - Works well for large applications and team ownership by domain.

- **Type-based structure:** Group files by technical role.

```text
src/
  components/
  hooks/
  pages/
  services/
  styles/
  tests/
```

- Benefits:
  - Simple for small applications.
  - Easy to discover all components or hooks in one place.
- Drawback: A single feature's files become spread across many folders as the application grows.

- **Practical approach:** Use feature-based folders for business logic and shared folders for truly reusable code such as `components/ui`, `hooks`, `lib`, and `utils`.

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

### What is the purpose of `registerServiceWorker` in React?

<!-- id: tZuNHD4?q@, noteType: Basic-66869 -->

- **Not a React API:** `registerServiceWorker` was a Create React App template helper.
- A service worker is a browser API that can cache assets, intercept requests, and support offline behavior.
- Configure service workers with the chosen build tool or PWA strategy; do not assume the helper exists in a React 18/19 project.

### What is React memo function?

<!-- id: C&Ugl6PT|A, noteType: Basic-66869 -->

- Class components can avoid re-rendering when their props are unchanged by using `PureComponent` or `shouldComponentUpdate`.
- Wrap a function component in `React.memo` for similar behavior.

### What is `React.lazy`?

<!-- id: sdfVTRnIMW, noteType: Basic-66869 -->

- `React.lazy` lets you render a dynamic import as a regular component.
- It loads the separate bundle containing the component when it is rendered.
- The imported module must have a default export that is a React component.
- Wrap it in `<Suspense fallback={...}>` while the module is loading.

### What are hooks? What rules need to be followed for hooks?

<!-- id: Qv$v0hsu4H, noteType: Basic-66869 -->

- Hooks let you use state and other React features without writing a class (introduced in React 16.8).
- Follow these rules:
  - Call Hooks only at the top level of React functions, not inside loops, conditions, or nested functions.
  - Call Hooks from React functions or other Hooks.
  - Start custom Hook names with the `use` prefix.

### In which scenarios error boundaries do not catch errors?

<!-- id: d9>c:-w]`Y, noteType: Basic-66869 -->

- Error boundaries do not catch errors in event handlers. Handle them with `try/catch` or an error state:

```jsx
function SaveButton() {
  const [error, setError] = useState(null);

  function handleClick() {
    try {
      saveData();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Save</button>
      {error && <p>Save failed</p>}
    </>
  );
}
```

- Error boundaries do not catch most errors from asynchronous callbacks. Handle the error where the async work runs:

```jsx
function Timer() {
  const [error, setError] = useState(null);

  function startTimer() {
    setTimeout(() => {
      try {
        riskyOperation();
      } catch (error) {
        setError(error);
      }
    }, 1000);
  }

  return <button onClick={startTimer}>{error ? 'Failed' : 'Start'}</button>;
}
```

- Error boundaries do not provide a fallback during server-side rendering. Catch server-rendering failures at the server boundary:

```js
try {
  const html = renderToString(<App />);
  sendHtml(html);
} catch (error) {
  sendServerErrorResponse(error);
}
```

- An error boundary cannot catch an error thrown by its own fallback or lifecycle methods. Put an outer boundary around it if that failure also needs protection:

```jsx
<OuterErrorBoundary>
  <InnerErrorBoundary>
    <App />
  </InnerErrorBoundary>
</OuterErrorBoundary>
```

- **Important:** Errors thrown while rendering a child component are the cases Error Boundaries are designed to catch. `try/catch` around JSX in the parent is not a replacement for an Error Boundary.

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

### What is the purpose of `unmountComponentAtNode()`?

<!-- id: Hep+>5!.c>, noteType: Basic-66869 -->

- **Removed in React 19; deprecated since React 18.**
- With `createRoot`, keep the root reference and call `root.unmount()`:

```js
const root = createRoot(container);
root.render(<App />);
root.unmount();
```

- **Legacy behavior:** `unmountComponentAtNode(container)` removed a mounted tree, cleaned it up, and returned `true` or `false` depending on whether a tree was found.

### Optimizing performance in a React application? List the React hook functions

<!-- id: gA2?HOKfQ$, noteType: Basic-66869 -->

- Keep component state local when appropriate (`useState`, `useReducer`).
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
- Use `useTransition` or `startTransition` for non-urgent updates.
- Use `useDeferredValue` when a derived value can lag behind urgent input.
- Measure with the React Profiler before adding memoization.

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
- With a React 18 `createRoot`, React automatically batches updates from promises, timers, native events, and React events.
- Use functional updates when the next state depends on the previous state.

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

### Why does an Effect appear to run twice in React 18?

<!-- id: PHP~2a$F~o, noteType: Basic-66869 -->

- In development, `<StrictMode>` may mount, clean up, and re-mount Effects to expose missing cleanup and impure logic.
- This does not represent two production requests by itself.
- Make Effects resilient and idempotent; do not disable Strict Mode just to hide the warning.
- **Older shorthand:** “React 18 calls Effects twice in development.” The more precise explanation is the mount-cleanup-remount check above.

### What changed in React 18?

- **Automatic batching:** With `createRoot`, updates from timers, promises, native events, and React events are batched.
- **Transitions:** `startTransition` and `useTransition` mark non-urgent updates so urgent interactions remain responsive.
- **Deferred values:** `useDeferredValue` lets an expensive derived value lag behind urgent input.
- **Stable IDs:** `useId` generates IDs that are consistent between server and client rendering.
- **Suspense and streaming SSR:** React 18 expanded Suspense support for server rendering and introduced streaming APIs.
- **Concurrent rendering:** Rendering can be interrupted and resumed; components must remain pure during render.

### What are `createRoot()` and `hydrateRoot()`?

- `createRoot(container)` creates a React 18+ client root:

```tsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

- `hydrateRoot(container, element)` attaches React to HTML generated by the server:

```tsx
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root')!, <App />);
```

- `createRoot` and `hydrateRoot` enable React 18 concurrent features; legacy `ReactDOM.render` and `ReactDOM.hydrate` do not.

### What are React Actions in React 19?

- An **Action** is a function, often async, passed to a transition or form action to coordinate pending state, errors, and updates.
- React 19 supports functions in `<form action={...}>`, `<button formAction={...}>`, and related form APIs.
- Actions can be combined with `useActionState`, `useOptimistic`, and `useFormStatus`.
- Successful form Actions reset uncontrolled form fields automatically; use `requestFormReset` when an explicit reset is needed.

### What is `useActionState`?

- `useActionState(action, initialState)` returns the latest action result, a wrapped action, and a pending flag.
- It is useful for form submissions that need validation or server-response state.

```tsx
import { useActionState } from 'react';

function ProfileForm() {
  const [error, submit, isPending] = useActionState(async (_previousState, formData) => {
    return updateProfile(formData); // return the next state or error
  }, null);

  return (
    <form action={submit}>
      <input name="displayName" />
      <button disabled={isPending}>Save</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
```

### What is `useOptimistic`?

- `useOptimistic(value)` provides a temporary optimistic value while an Action is pending.
- The UI updates immediately and automatically returns to the source value when the Action completes or fails.
- Use it for interactions such as likes, comments, toggles, or optimistic form submissions.

### What is the React 19 `use` API?

- `use(resource)` reads a Promise or Context during render.
- When passed a Promise, React suspends the component until the Promise resolves or rejects.
- It must still be called from a component or custom Hook, but unlike ordinary Hooks it may be used inside conditions and loops.
- Use a `<Suspense>` boundary and an error boundary around asynchronous resources.

```tsx
import { use } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((comment) => <p key={comment.id}>{comment.text}</p>);
}
```

### What changed for refs in React 19?

- Function components can receive `ref` as a normal prop:

```tsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

- `forwardRef` still works for compatibility, but it is legacy for new function components and is expected to be deprecated in a future version.
- Ref callbacks may return a cleanup function that runs when the element is removed.
- Avoid returning the DOM node accidentally from an implicitly returned ref callback.

### What changed for Context in React 19?

- React 19 allows a context object to be rendered directly as a provider:

```tsx
const ThemeContext = createContext('light');

function App() {
  return <ThemeContext value="dark">...</ThemeContext>;
}
```

- `<ThemeContext.Provider>` remains supported for compatibility but is the legacy form for new React 19 code.

### Which React APIs were removed or deprecated in React 19?

- **Removed:** `ReactDOM.render`, `ReactDOM.hydrate`, `unmountComponentAtNode`, and `findDOMNode`.
- **Removed:** function-component `propTypes` checks and `defaultProps`; use TypeScript or another type system and JavaScript default parameters.
- **Legacy/unsafe:** `componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate`; use modern lifecycle methods or function components.
- **Legacy:** `forwardRef` for new function components; use `ref` as a prop when React 19 is the minimum supported version.
- **Legacy:** `<Context.Provider>` for new React 19 code; render `<Context value={...}>` instead.
