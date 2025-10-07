## React

### What are the features of React?
<!-- id: CXyf=jKNW+, noteType: Basic-66869 -->

It uses the virtual DOM instead of the real DOM. It uses server-side rendering. It follows uni-directional data flow or data binding. It build the reusable/composable UI components to develop the view

### What do you know about the Virtual DOM?
<!-- id: FoyA}$T9QX, noteType: Basic-66869 -->

- The Virtual DOM (VDOM) is an in-memory representation of Real DOM. - It starts as a copy of the real DOM. 3 Steps of Virtual DOM:

1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
2. A diff is performed between the previous DOM and current DOM.
3. Real DOM is updated with just the new changes.

### Differentiate between Real DOM and Virtual DOM
<!-- id: x7v|@{%0DI, noteType: Basic-66869 -->



### What do you understand from “In React, everything is a component.”
<!-- id: cC3W]O5b<X, noteType: Basic-66869 -->

Components are the building blocks of a React application’s UI. These components split up the entire UI into small independent and reusable pieces. Then it renders each of these components independent of each other without affecting the rest of the UI.

### Explain the purpose of render() in React.
<!-- id: x!BVn-%YPh, noteType: Basic-66869 -->

Each React component must have a render() mandatorily. It returns a single React element which is the representation of the native DOM component.

### How can you embed two or more components into one?
<!-- id: xP@n:Hci!/, noteType: Basic-66869 -->

class MyComponent extends React.Component{ render(){ return( <div> <h1>Hello</h1> <Header/> </div> ); } } class Header extends React.Component{ render(){ return <h1>Header Component</h1> }; } ReactDOM.render( <MyComponent/>, document.getElementById('content') );

### What are Props?
<!-- id: tD#fA>`[%T, noteType: Basic-66869 -->

Props are short hand for Properties in React. They are read-only components which must be kept pure i.e. immutable. They are always passed down from the parent to the child components throughout the application. A child component can never send a prop back to the parent component. This help in maintaining the unidirectional data flow and are generally used to render the dynamically generated data.

### What is a state in React and how is it used?
<!-- id: bLvjjlaMiO, noteType: Basic-66869 -->

State of a component is an object that holds some information that may change over the lifetime of the component. State is similar to props, but it is private, mutable, and fully controlled by the component.

### What are the different phases of React component’s lifecycle?
<!-- id: s|1Jjpm@vg, noteType: Basic-66869 -->

Mounting: The component is ready to mount in the browser DOM. This phase covers initialization from constructor(), getDerivedStateFromProps(), render(), and componentDidMount() lifecycle methods. Updating: In this phase, the component gets updated in two ways, sending the new props and updating the state either from setState() or forceUpdate(). This phase covers getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods. Unmounting: In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes componentWillUnmount() lifecycle method.

### Explain the lifecycle method componentWillMount()
<!-- id: j)Q37W1S~;, noteType: Basic-66869 -->

Executed just before rendering takes place both on the client as well as server-side.

### Explain the lifecycle method componentDidMount()
<!-- id: N>f,)5@dr3, noteType: Basic-66869 -->

Executed on the client side only after the first render.

### Explain the lifecycle method componentWillReceiveProps()
<!-- id: ho>RBCRWF0, noteType: Basic-66869 -->

Invoked as soon as the props are received from the parent class and before another render is called.

### Explain the lifecycle method shouldComponentUpdate()
<!-- id: vh)e2!`1]i, noteType: Basic-66869 -->

Returns true or false value based on certain conditions. If you want your component to update, return true else return false. By default, it returns true.

### Explain the lifecycle method componentWillUpdate()
<!-- id: d5&3Sa#z}z, noteType: Basic-66869 -->

Called just before rendering takes place in the DOM.

### Explain the lifecycle method componentDidUpdate()
<!-- id: NQ2y}4fy!;, noteType: Basic-66869 -->

Called immediately after rendering takes place.

### Explain the lifecycle method componentWillUnmount()
<!-- id: bDPgrPkhAj, noteType: Basic-66869 -->

Called after the component is unmounted from the DOM. It is used to clear up the memory spaces.

### What is a synthetic event?
<!-- id: m<ZO3o7eUB, noteType: Basic-66869 -->

Synthetic events are the objects which act as a cross-browser wrapper around the browser’s native event. They combine the behavior of different browsers into one API. This is done to make sure that the events show consistent properties across different browsers. examples: onClick, onBlur, etc.

### What are Higher Order Components(HOC)?
<!-- id: p|p^V2r_Zd, noteType: Basic-66869 -->

Put simply: just a React Component that wraps another one.Detailed explanation: Higher Order Component is an advanced way of reusing the component logic. Basically, it’s a pattern that is derived from React’s compositional nature. HOC are custom components which wraps another component within it. They can accept any dynamically provided child component but they won’t modify or copy any behavior from their input components. HOC are pure components and enable: 1. Code reuse, logic and bootstrap abstraction 2. Render Highjacking 3. State abstraction and manipulation 4. Props manipulation

### In which lifecycle event do you make AJAX requests and why?
<!-- id: z)(}a@a$=*, noteType: Basic-66869 -->

AJAX requests should go in the componentDidMount lifecycle event. Reason: You can’t guarantee the AJAX request won’t resolve before the component mounts. If it did, that would mean that you’d be trying to setState on an unmounted component, which not only won’t work, but React will yell at you for. Doing AJAX in componentDidMount will guarantee that there’s a component to update.

### How do you tell React to build in Production mode and what will that do?
<!-- id: uJ}BIoh[@B, noteType: Basic-66869 -->

Typically you’d use Webpack’s DefinePlugin method to set NODE_ENV to production. This will strip out things like propType validation and extra warnings. On top of that, it’s also a good idea to minify your code because React uses Uglify’s dead-code elimination to strip out development only code and comments, which will drastically reduce the size of your bundle.

### What is JSX (JS XML)?
<!-- id: xq?sv-se$N, noteType: Basic-66869 -->

Basically it provides syntactic sugar for the React.createElement() function, giving us the simple ways to create React components with HTML like template syntax.

### What is React?
<!-- id: OL!DT=<3S=, noteType: Basic-66869 -->

React is an open-source front-end JavaScript library that is used for building user interfaces, especially for single-page applications. It is used for handling view layer for web and mobile apps.

### What is the difference between state and props?
<!-- id: L$ga}WG3v[, noteType: Basic-66869 -->

Props get passed to the component similar to function parameters whereas state is managed within the component similar to variables declared within a function.

### "What is ""key"" prop?"
<!-- id: Ik1K8!QFj`, noteType: Basic-66869 -->

A key is a special string attribute you should include when creating arrays of elements. It helps React identify which items have changed, are added, or are removed.

### What is context?
<!-- id: s09rc`.>(;, noteType: Basic-66869 -->

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### What is reconciliation?
<!-- id: Ll)X1;&(:*, noteType: Basic-66869 -->

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called reconciliation.

### What are fragments?
<!-- id: Ix{-[~VBNX, noteType: Basic-66869 -->

It's a common pattern in React which is used for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

### What are error boundaries in React v16?
<!-- id: jrI~R6S+um, noteType: Basic-66869 -->

Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. A class component becomes an error boundary if it defines a new lifecycle method called componentDidCatch(error, info) or static getDerivedStateFromError()

### What is the use of react-dom package?
<!-- id: NS#J5g]Rh2, noteType: Basic-66869 -->

The react-dom package provides DOM-specific methods that can be used at the top level of your app. Some of the methods of this package are:render(): Render a React element into the DOM in the supplied container and return a reference to the component (or returns null for stateless components).hydrate(): Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.unmountComponentAtNode(): Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.findDOMNode(): If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.createPortal(child, container): Creates a portal. Portals provide a way to render children into a DOM node that exists outside the hierarchy of the parent component.

### What is ReactDOMServer?
<!-- id: fI:#fODmB`, noteType: Basic-66869 -->

The ReactDOMServer object enables you to render components to static markup (typically used on node server). This object is mainly used for server-side rendering (SSR). The following methods can be used in both the server and browser environments:renderToString()renderToStaticMarkup() For example, you call renderToString to render your root component to a string, which you then send as response.

### Why is a component constructor called only once?
<!-- id: QnC1mCl>/., noteType: Basic-66869 -->

React's reconciliation algorithm assumes that if a custom component appears in the same place on subsequent renders, it's the same component as before, so reuses the previous instance rather than creating a new one.

### What are the common folder structures for React?
<!-- id: x4PNquO)-1, noteType: Basic-66869 -->

- Grouping by features or routes - Grouping by file type

### What is the benefit of styles modules?
<!-- id: IEl=a.8`Zy, noteType: Basic-66869 -->

It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules.

### What is React Router?
<!-- id: yX93pYzyV(, noteType: Basic-66869 -->

React Router is a routing-specific library that helps you add new screens and flows to your application quickly, while keeping the URL in sync with what's being displayed on the page. Some hook methods this library provides are useHistory, useLocation, useParams. It covers: Configuring RoutesNavigating with LinkUsing Nested Routes for LayoutNavigating programmaticallyUsing URL params and Search params

### How React Router is different from history library?
<!-- id: BHB7^Vf4qD, noteType: Basic-66869 -->

React Router is a wrapper around the history library which handles interaction between the browser's window.history with its browser and hash histories. It also provides memory history which is useful for environments that don't have global history, such as mobile app development (React Native) and unit testing with Node.

### What is React Interalization?
<!-- id: HZ`|B1)+3~, noteType: Basic-66869 -->

is part of FormatJS which provides bindings to React. It helps to format strings, dates, numbers, or pluralization

### What is Flux?
<!-- id: JTC4IS2r3U, noteType: Basic-66869 -->

Flux is an application design paradigm used as a replacement for the traditional MVC pattern. It is not a framework or a library but a new kind of architecture that complements React and the concept of Unidirectional Data Flow. Facebook uses this pattern internally when working with React.

### What is Redux?
<!-- id: D%yTdeOz31, noteType: Basic-66869 -->

Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with React, or with any other view library. Hook functions: useSelector, useDispatch

### What are the core principles of Redux?
<!-- id: L?3|K^p;nZ, noteType: Basic-66869 -->

Redux follows three fundamental principles:Single source of truth: The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.State is read-only: The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.Changes are made with pure functions: To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.

### What is the difference between mapStateToProps() and mapDispatchToProps()?
<!-- id: nT}{UKCH@y, noteType: Basic-66869 -->

mapStateToProps() is a utility which helps your component get updated state (which is updated by some other components) mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state)

### Can I dispatch an action in reducer?
<!-- id: cW0lc`wjNe, noteType: Basic-66869 -->

Your reducer should simply digest the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.

### What is the difference between React context and React Redux?
<!-- id: O|C$F95Ya-, noteType: Basic-66869 -->

Context is built in tool with React and required minimal setup, whereas Redux requires additional installation and extensive setup to integrate it with a React Application. Context is specifically designed for static data, that is not often refreshed or updated, whereas Redux is better in the high-frequency update data field. Context used for UI logic and State Management Logic are in the same component, whereas Redux has better code organization with separate UI logic and State Management Logic Redux ease to debug with Redux Dev Tool

### How to make AJAX request in Redux?
<!-- id: cO*hTP`t{X, noteType: Basic-66869 -->

You can use redux-thunk middleware which allows you to define async actions.

### What is the difference between component and container in React Redux?
<!-- id: h[:7?W`BQ;, noteType: Basic-66869 -->

Component is a class or function component that describes the presentational part of your application. Container is an informal term for a component that is connected to a Redux store. Containers subscribe to Redux state updates and dispatch actions, and they usually don't render DOM elements; they delegate rendering to presentational child components.

### What is redux-saga and its benifits?
<!-- id: yhp:KT%)!|, noteType: Basic-66869 -->

redux-saga is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better. Benifits: - make asynchronous flows easy to read, write, and test - enable numerous approaches to tackling parallel execution, task concurrency, task racing, task cancellation, and more

### What are the differences between call() and put() in redux-saga?
<!-- id: ltnzbOZ4mz, noteType: Basic-66869 -->

Both call() and put() are effect creator functions. call() function is used to create effect description, which instructs middleware to call the promise. put() function creates an effect, which instructs middleware to dispatch an action to the store.

### What is Redux Thunk?
<!-- id: E))z6dtXj3, noteType: Basic-66869 -->

Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch() and getState() as parameters.

### What are the differences between redux-saga and redux-thunk?
<!-- id: h3pZ0Tf[Zs, noteType: Basic-66869 -->

Both Redux Thunk and Redux Saga take care of dealing with side effects. In most of the scenarios, Thunk uses Promises to deal with them, whereas Saga uses Generators. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.

### What are Redux selectors and why to use them?
<!-- id: D&@%=.daPO, noteType: Basic-66869 -->

Selectors are functions that take Redux state as an argument and return some data to pass to the component. These selectors have two main benefits,The selector can compute derived data, allowing Redux to store the minimal possible stateThe selector is not recomputed unless one of its arguments changes

### What is an action in Redux?
<!-- id: lQR+]!`<bS, noteType: Basic-66869 -->

Actions are plain JavaScript objects or payloads of information that send data from your application to your store. Actions must have a type property that indicates the type of action being performed.

### What is reselect and how it works?
<!-- id: K>1*eOxf5&, noteType: Basic-66869 -->

Reselect is a selector library (for Redux) which uses same concept with Redux Selector. It was originally written to compute derived data from Redux-like applications state, and not recomputed unless one of it arguments changed. It supports to create a new selector which receive other selectors as argument.

### What are Styled Components?
<!-- id: kI2bdErp*~, noteType: Basic-66869 -->

styled-components is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.

### Do I need to keep all my state into Redux? Should I ever use react internal state?
<!-- id: s<_LqmJ_tz, noteType: Basic-66869 -->

It is up to the developer's decision. There are the some rules to determine what kind of data should be put into Redux Is the same data existed in store?Do other parts of the application care about this data?Do you need to be able to create further derived data based on this original data?

### What is the purpose of registerServiceWorker in React?
<!-- id: tZuNHD4?q@, noteType: Basic-66869 -->

React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on a slow network, he/she can still see results on the screen, as such, it helps you build a better user experience. It's all about adding offline capabilities to your site.

### What is React memo function?
<!-- id: C&Ugl6PT|A, noteType: Basic-66869 -->

Class components can be restricted from re-rendering when their input props are the same using PureComponent or shouldComponentUpdate. Now you can do the same with function components by wrapping them in React.memo.

### What is React lazy function?
<!-- id: sdfVTRnIMW, noteType: Basic-66869 -->

The React.lazy function lets you render a dynamic import as a regular component. It will automatically load the seperated bundle containing the imported component when the component gets rendered. The module must be a default export containing a React component.

### What are hooks? What rules need to be followed for hooks?
<!-- id: Qv$v0hsu4H, noteType: Basic-66869 -->

Hooks is a new feature(React 16.8) that lets you use state and other React features without writing a class. You need to follow two rules in order to use hooks,Call Hooks only at the top level of your react functions. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions.Call Hooks from React Functions or another hooks only.The naming convention of hooks should start with the prefix use

### In which scenarios error boundaries do not catch errors?
<!-- id: d9>c:-w]`Y, noteType: Basic-66869 -->

Below are the cases in which error boundaries doesn't work:Inside Event handlers Asynchronous code using setTimeout or requestAnimationFrame callbacks During Server side rendering When errors thrown in the error boundary code itself

### What is the proper placement for error boundaries?
<!-- id: kN0oYYZvfJ, noteType: Basic-66869 -->

- You can wrap top-level route components to display a generic error message for the entire application. - You can also wrap individual components in an error boundary to protect them from crashing the rest of the application and create the error state for each of components independently

### What is the methods order when component re-rendered?
<!-- id: 9E/elaX9], noteType: Basic-66869 -->

An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.static getDerivedStateFromProps()shouldComponentUpdate()render()getSnapshotBeforeUpdate()componentDidUpdate()

### What are the methods invoked during error handling?
<!-- id: Mm_cR69)FD, noteType: Basic-66869 -->

Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.static getDerivedStateFromError()componentDidCatch()

### What is the purpose of unmountComponentAtNode method?
<!-- id: Hep+>5!.c>, noteType: Basic-66869 -->

This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

### What is NextJS and major features of it?
<!-- id: NGBh@8n]?, noteType: Basic-66869 -->

Next.js is a popular and lightweight framework for static and server‑rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS,Server-rendered by defaultAutomatic code splitting for faster page loadsSimple client-side routing (page based)Webpack-based dev environment which supports (HMR)Able to implement with Express or any other Node.js HTTP serverCustomizable with your own Babel and Webpack configurations

### Optimizing performance in a React application? List the React hook functions
<!-- id: gA2?HOKfQ$, noteType: Basic-66869 -->

Keeping component state local where necessary. (useState, useEffect)Split component to small ones if it becomes more complex.Avoid pass props down in many levels (State management: React-redux, useContext, useReducer)Memoizing React components to prevent unnecessary re-renders. (React.memo)Memoizing expensive React states or methods to reduce recomputation. (useMemo, useCallback)Building a custom hook to extract a logic into a reusable function Use refs to store mutable values without re-rendering the entire component.use debounce & throttle to avoid send multiple requests in a short time. Code-splitting in React using dynamic import()Windowing or list virtualizationLazy loading images

### React vs Angular
<!-- id: QGo2Qir#W_, noteType: Basic-66869 -->

React is a library, but Angular is a Full-featured Framework. The virtual DOM and one-way data binding are used by React.js, but the real DOM and two-way data binding are used by Angular.

### How to write unit tests for custom hooks?
<!-- id: ENY(b|8)-X, noteType: Basic-66869 -->

We would use react-hooks-testing-library write the unit test. There are two methods we need to know: renderHook: The renderHook can render custom hook, you can operations the custom hook like in the component.act: The act can execute the methods return from custom hook that makes sure all updates have been processed Reference: React | Write a unit test for custom hooks in ten minutes - DEV Community

### What is React Testing Library?
<!-- id: Mh[jf[d7|q, noteType: Basic-66869 -->

React Testing Library is a set of helpers builds on top of DOM Testing Library that let you test React components. This allows you to get your tests closer to using your components the way a user will It's supported by CRA as default. Sample test steps: - Arrange (render): The method renders a React element into the DOM. - Act (fireEvent): The method allows you to fire events to simulate user actions. - Assert: assert that the test case is correct

### Testing Recipes in React components
<!-- id: h!$Xko2UDE, noteType: Basic-66869 -->

Setup/Teardown (Arrange): setup a DOM element as a render target (beforeEach) or “clean up” and unmount the tree on exiting (afterEach) act / assert: makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions Rendering: test whether a component renders correctly for given props. Data Fetching: mock requests with dummy data Mocking Modules: Mocking out modules (ex: 3rd libraries) with dummy replacements Events: dispatching real DOM events on DOM elements Timers: You can use fake timers only in some tests Snapshot Testing: you save “snapshots” of the rendered component output ensure that a change is correct

### What are end-to-end tests?
<!-- id: LY)5dv7=b:, noteType: Basic-66869 -->

End-to-end tests are useful for testing longer workflows, especially when they’re critical to your business (such as payments or signups). For these tests, you’d probably want to test how a real browser renders the whole app, fetches data from the real API endpoints, uses sessions and cookies, navigates between different links. We can assert on side effects not just in the browser, but potentially on the backend as well.

### Recoil State management core concepts
<!-- id: Gyhl*=HSc`, noteType: Basic-66869 -->

Recoil is a state management library for React. Recoil lets you create a data-flow graph that flows from atoms (shared state) through selectors (pure functions) and down into your React components. Atoms are units of state that components can subscribe to. When an atom is updated, each subscribed component is re-rendered with the new value. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state. Selectors is a pure function that accepts atoms or other selectors as input. When these upstream atoms or selectors are updated, the selector function will be re-evaluated. Components can subscribe to selectors just like atoms, and will then be re-rendered when the selectors change. Popular components: - RecoilRoot​: Components that use recoil state need RecoilRoot to appear somewhere in the parent tree. A good place to put this is in your root component - Atom​: An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom - Selector​: A selector represents a piece of derived state. Derived state is a transformation of state. You can think of derived state as the output of passing state to a pure function that modifies the given state in some way - Components that need to read from and write to an atom should use useRecoilState() - We can use the useRecoilValue() hook to read the value of selector Getting Started | Recoil (recoiljs.org)

### Client Site Rendering (CSR), Server Site Rendering (SSR) and SSG (Static Site Generation)
<!-- id: c,l~8(c`.7, noteType: Basic-66869 -->

- CSR: Server sending HTML and JS files -> Browser downloads JS -> Browser executes React -> Page full dynamic (loaded) - SSR: Server built out HTML page and sends to the browser -> Static HTML is rendered and Browser downloads JS in background (loaded) -> Loaded React adds interactivity to the page -> Page full dynamic - SSG: HTML files are generated on build time -> Static HTML is rendered and Browser downloads JS in background-> Loaded React adds interactivity to the page -> Page full dynamic Usage: - CSR: Login page, dashboard page, ... and the pages don't need SEO - SSR: page with dynamic data but still have SEO and expect super fast initial loading - SSG: for pages which don't need to be updated frequently and expect super fast initial loading

### How to Create a React Component Library
<!-- id: ukjH*S<[!,, noteType: Basic-66869 -->

InitCreating ComponentsAdding TypescriptAdding RollupBuilding Your LibraryMore advances: Adding CSSOptimizingAdding TestsAdding StorybookAdding SCSS

### When should you memoize in React?
<!-- id: O^J|aZOs#P, noteType: Basic-66869 -->

When should you memoize in React (prateeksurana.me)

### What is React Fiber?
<!-- id: gEdvk}bCx<, noteType: Basic-66869 -->

Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM. Fiber improves the Virtual DOM and comparation steps of reconcilation algo

### useState hook
<!-- id: q(a+%30cl2, noteType: Basic-66869 -->

- Returns a stateful value, and a function to update it. - During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState). - Lazy initial state: The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded. If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render - The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component. - If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. - During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates. - React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list. - Bailing out of a state update: If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects (React uses the Object.is comparison algorithm.) - Batching of state updates: React may group several state updates into a single re-render to improve performance.

### useRef
<!-- id: o[>+!Bp3;=, noteType: Basic-66869 -->

useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component. The only difference between useRef() and creating a {current: ...} object yourself is that useRef will give you the same ref object on every render. Keep in mind that useRef doesn’t notify you when its content changes. Mutating the .current property doesn’t cause a re-render

### React Profiler API
<!-- id: Nz8&|&mPsU, noteType: Basic-66869 -->

The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.

### When exactly does React clean up an effect?
<!-- id: kd9Bf6FSN3, noteType: Basic-66869 -->

React performs the cleanup when the component unmounts. However, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.

### useEffect
<!-- id: A<}Q3=<z&e, noteType: Basic-66869 -->

- By default, effects run after every completed render - Allow us Cleaning up an effect before the component is removed from the UI - if a component renders multiple times (as they typically do), the previous effect is cleaned up before executing the next effect - Timing: useEffect is deferred until after the browser has painted (rendered) - Conditionally firing an effect + only be recreated when deps changes + If you pass an empty deps array, only be created after the intial rendered Practice challenge: https://www.greatfrontend.com/questions/javascript/use-query?framework=react&tab=coding https://react.dev/learn/synchronizing-with-effects

### useEffect vs useLayoutEffect
<!-- id: 0nio)!l~N, noteType: Basic-66869 -->

useEffect runs asynchronously after the browser paints, making it ideal for side effects that don't affect layout. useLayoutEffect runs synchronously before painting, perfect for DOM measurements or preventing visual flicker, but should be used sparingly as it blocks the browser's painting process

### NextJS + Astro
<!-- id: J0~8W6;Q*@, noteType: Basic-66869 -->

NextJS to Astro: more control = faster sites - YouTube

### useEffect called twice in react 18
<!-- id: PHP~2a$F~o, noteType: Basic-66869 -->

amazing features that Identifying unsafe lifecycles => we shouldn't disable it
