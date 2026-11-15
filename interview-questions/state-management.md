# State Management

[[toc]]

### What is Flux?

<!-- id: JTC4IS2r3U, noteType: Basic-66869 -->

- Flux is an architecture based on unidirectional data flow.
- User actions are dispatched, stores update their state, and views consume the new state.
- It influenced Redux and other state-management approaches.

### What is Redux?

<!-- id: D%yTdeOz31, noteType: Basic-66869 -->

- Redux is a predictable state container that can be used with React or other UI libraries.
- Modern Redux applications should generally use Redux Toolkit.
- React-Redux commonly exposes state with `useSelector` and dispatch with `useDispatch`.

### What are the core principles of Redux?

<!-- id: L?3|K^p;nZ, noteType: Basic-66869 -->

- **Single source of truth:** Application state is held in a store.
- **State is read-only:** Components dispatch actions instead of mutating state directly.
- **Pure updates:** Reducers calculate the next state from the previous state and an action.

### What is the difference between `mapStateToProps()` and `mapDispatchToProps()`?

<!-- id: nT}{UKCH@y, noteType: Basic-66869 -->

- `mapStateToProps()` selects values from the Redux store and passes them as props.
- `mapDispatchToProps()` provides dispatching functions or action creators as props.
- These APIs belong to the older `connect()` pattern; modern React-Redux code commonly uses typed hooks.

### Can I dispatch an action in a reducer?

<!-- id: cW0lc`wjNe, noteType: Basic-66869 -->

- No. A reducer should calculate and return the next state without side effects.
- Dispatching from a reducer can create recursive updates and unpredictable state transitions.
- Dispatch follow-up actions from middleware, a thunk, a listener, or the component that initiated the operation.

### What is the difference between React Context and React Redux?

<!-- id: O|C$F95Ya-, noteType: Basic-66869 -->

- Context is built into React and is useful for values such as themes, locale, and authentication.
- Redux provides a centralized state model, reducers, middleware, selectors, DevTools, and predictable update conventions.
- Context is not automatically a replacement for Redux; the right choice depends on update frequency, state complexity, and debugging needs.

### How do you make an asynchronous request in Redux?

<!-- id: cO*hTP`t{X, noteType: Basic-66869 -->

- Use a thunk, RTK Query, listener middleware, or another middleware-based approach.
- Keep request lifecycle state explicit: idle, loading, succeeded, and failed.
- Prefer RTK Query for server-cache concerns such as fetching, caching, invalidation, and deduplication.

### What is the difference between a component and a container in React Redux?

<!-- id: h[:7?W`BQ;, noteType: Basic-66869 -->

- A presentational component focuses on rendering UI from props.
- A container connects to the store, selects state, dispatches actions, and passes data to presentational components.
- This distinction is an older architectural convention; hooks now let any function component select state and dispatch actions directly.

### What is Redux Saga and what are its benefits?

<!-- id: yhp:KT%)!|, noteType: Basic-66869 -->

- Redux Saga manages complex side effects with generator functions.
- Benefits include cancellation, concurrency, sequencing, racing, and testable effect descriptions.
- It is powerful but adds conceptual and runtime complexity; use it when the workflow justifies that complexity.

### What are the differences between `call()` and `put()` in Redux Saga?

<!-- id: ltnzbOZ4mz, noteType: Basic-66869 -->

- `call(fn, args)` describes calling a function or Promise-returning operation.
- `put(action)` describes dispatching an action to the Redux store.
- Both return effect descriptions for the Saga middleware to execute.

### What is Redux Thunk?

<!-- id: E))z6dtXj3, noteType: Basic-66869 -->

- Redux Thunk allows an action creator to return a function instead of a plain action object.
- The thunk receives `dispatch` and `getState` and can perform asynchronous work before dispatching ordinary actions.
- Redux Toolkit includes thunk middleware by default in its standard store setup.

### What are the differences between Redux Saga and Redux Thunk?

<!-- id: h3pZ0Tf[Zs, noteType: Basic-66869 -->

- Thunk uses ordinary functions and Promises and is usually simpler to adopt.
- Saga uses generators and declarative effects and is useful for complex cancellation or concurrency workflows.
- Neither is automatically better; choose based on workflow complexity and team familiarity.

### What are Redux selectors and why use them?

<!-- id: D&@%=.daPO, noteType: Basic-66869 -->

- A selector reads state and returns the value a component or feature needs.
- Selectors hide the store shape and keep components from depending on internal state structure.
- Memoized selectors avoid recomputing derived data when their inputs have not changed.

### What is an action in Redux?

<!-- id: lQR+]!`<bS, noteType: Basic-66869 -->

- An action is a plain object describing an event or requested state change.
- It must have a `type` property and may include a payload.
- Actions describe what happened; reducers decide how state changes.

### What is Reselect and how does it work?

<!-- id: K>1*eOxf5&, noteType: Basic-66869 -->

- Reselect is a library for creating memoized Redux selectors.
- An output selector recomputes only when its input-selector results change.
- It is useful for filtering, sorting, aggregating, or deriving view data without storing duplicate state.

### Do I need to keep all state in Redux?

<!-- id: s<_LqmJ_tz, noteType: Basic-66869 -->

- No. Keep temporary UI state local when only one component or feature needs it.
- Consider shared state when multiple areas need the same data, the state must survive navigation, or updates require centralized workflows and debugging.
- Server data often belongs in a server-cache tool such as RTK Query rather than handwritten global state.

### What are Recoil's core state-management concepts?

<!-- id: Gyhl*=HSc`, noteType: Basic-66869 -->

- Recoil models state as a graph of **atoms**, **selectors**, and components.
- Atoms are writable units of shared state.
- Selectors derive computed or asynchronous values from atoms or other selectors.
- `RecoilRoot` provides the state context; `useRecoilState()` reads and writes an atom; `useRecoilValue()` reads an atom or selector.
- Treat Recoil as a library-specific option and verify its maintenance status before choosing it for a new application.
