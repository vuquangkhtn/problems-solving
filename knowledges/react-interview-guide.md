# React Interview Guide - Software Engineer

## Core React Concepts

### What is React?

**Perfect Answer**: "React is a JavaScript library for building user interfaces, particularly web applications. It uses a component-based architecture with a virtual DOM for efficient updates, and follows a declarative programming paradigm where you describe what the UI should look like rather than how to manipulate it."

**Key Features**:
- **Virtual DOM**: Efficient diffing and reconciliation
- **Component-based**: Reusable, composable UI pieces
- **Unidirectional data flow**: Predictable state management
- **JSX**: JavaScript syntax extension for writing HTML-like code

---

## React and Node.js Relationship

### **Q: "Does React use Node.js?"**

**Perfect Answer**: "React itself doesn't require Node.js to run - it's a client-side library that runs in the browser. However, Node.js is essential for React development workflows: we use it for package management with npm, build tools like Webpack, JSX compilation with Babel, and development servers. For advanced patterns like SSR with Next.js, Node.js runs on the server to pre-render React components."

### **The Complete Picture**:

**Development Time** (Node.js Required ✅):
```bash
# Package management
npm install react react-dom

# Build tools
npx create-react-app my-app
npm run build

# Development server
npm start
```

**Runtime - Browser** (Node.js Not Required ❌):
```javascript
// React runs in browser JavaScript engine
ReactDOM.render(<App />, document.getElementById('root'));
```

**Server-Side Rendering** (Node.js Required ✅):
```javascript
// Next.js server-side rendering
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  // Runs on Node.js server
  return { props: { data: 'server-rendered' } };
};
```

**Interview Tip**: "Understanding this distinction shows you know the difference between development tooling and runtime environments."

---

## Component Fundamentals

### Functional vs Class Components

**Modern Approach** (Functional with Hooks):
```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>Hello, {user.name}!</div>;
}
```

**Legacy Approach** (Class Components):
```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }

  componentDidMount() {
    fetchUser(this.props.userId)
      .then(user => this.setState({ user, loading: false }));
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    return <div>Hello, {user.name}!</div>;
  }
}
```

**Interview Answer**: "I prefer functional components with hooks because they're more concise, easier to test, and align with React's modern patterns. Hooks provide the same lifecycle capabilities as class components but with better reusability."

---

## React Hooks Deep Dive

### Essential Hooks

**useState** - State Management:
```javascript
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// Functional updates for complex state
setUser(prevUser => ({ ...prevUser, name: 'John' }));
```

**useEffect** - Side Effects:
```javascript
// Component mount/unmount
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []); // Empty dependency array = mount only

// Dependency-based effects
useEffect(() => {
  fetchUserData(userId);
}, [userId]); // Runs when userId changes
```

**useCallback** - Function Memoization:
```javascript
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);

// Prevents unnecessary re-renders of child components
<ChildComponent onClick={handleClick} />
```

**useMemo** - Value Memoization:
```javascript
const expensiveValue = useMemo(() => {
  return items.filter(item => item.category === selectedCategory)
               .sort((a, b) => a.price - b.price);
}, [items, selectedCategory]);
```

**useContext** - Context Consumption:
```javascript
const ThemeContext = React.createContext();

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme.buttonClass}>Click me</button>;
}
```

---

## State Management

### Local State vs Global State

**Local State** (useState):
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Context API** (Global State):
```javascript
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

**Redux** (Complex Global State):
```javascript
// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

// Component
const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
};
```

**Interview Answer**: "I use local state for component-specific data, Context API for app-wide state like themes or user info, and Redux for complex state with multiple components needing the same data."

---

## Performance Optimization

### React.memo

```javascript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => <Item key={item.id} item={item} />)}
    </div>
  );
});

// Custom comparison function
const MyComponent = React.memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
```

### Code Splitting

```javascript
// Route-based splitting
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// Component-based splitting
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### Virtual DOM Optimization

```javascript
// Good: Stable keys
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li> // Stable ID
    ))}
  </ul>
);

// Bad: Index as key (causes re-renders)
const BadTodoList = ({ todos }) => (
  <ul>
    {todos.map((todo, index) => (
      <li key={index}>{todo.text}</li> // Unstable index
    ))}
  </ul>
);
```

---

## Event Handling

### Synthetic Events

```javascript
function Button() {
  const handleClick = (event) => {
    event.preventDefault(); // Synthetic event
    event.stopPropagation();
    
    // Access native event if needed
    const nativeEvent = event.nativeEvent;
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Event delegation (automatic in React)
function TodoList({ todos, onToggle }) {
  return (
    <ul onClick={(e) => {
      if (e.target.tagName === 'LI') {
        const id = e.target.dataset.id;
        onToggle(id);
      }
    }}>
      {todos.map(todo => (
        <li key={todo.id} data-id={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## Forms and Controlled Components

### Controlled vs Uncontrolled

**Controlled Components**:
```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Uncontrolled Components**:
```javascript
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Interview Answer**: "I prefer controlled components for most forms because they provide better validation, real-time feedback, and predictable state. I use uncontrolled components for simple forms or when integrating with third-party libraries."

---

## Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}
```

---

## Testing React Components

### React Testing Library

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter when button is clicked', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  
  const button = screen.getByRole('button', { name: /increment/i });
  const counter = screen.getByText('Count: 0');
  
  await user.click(button);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

test('loads and displays user data', async () => {
  const mockUser = { id: 1, name: 'John Doe' };
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockUser)
  });
  
  render(<UserProfile userId={1} />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  global.fetch.mockRestore();
});
```

---

## Common Interview Questions

### **Q: "What is the Virtual DOM and how does it work?"**

**Perfect Answer**: "The Virtual DOM is a JavaScript representation of the real DOM kept in memory. When state changes, React creates a new virtual DOM tree, compares it with the previous tree (diffing), calculates the minimum changes needed (reconciliation), and updates only the changed parts of the real DOM. This makes updates much faster than manipulating the DOM directly."

### **Q: "Explain React's reconciliation process."**

**Perfect Answer**: "Reconciliation is React's diffing algorithm that compares the new virtual DOM tree with the previous one. It uses heuristics like comparing elements by type and key props. When it finds differences, it updates only those specific DOM nodes. This process is what makes React efficient - instead of re-rendering the entire page, it updates only what changed."

### **Q: "What are React keys and why are they important?"**

**Perfect Answer**: "Keys help React identify which list items have changed, been added, or removed. They should be stable, predictable, and unique among siblings. Using array indices as keys can cause performance issues and bugs when the list order changes. Good keys enable React to reuse DOM elements efficiently during reconciliation."

### **Q: "How do you handle side effects in React?"**

**Perfect Answer**: "I use the useEffect hook for side effects like API calls, subscriptions, or DOM manipulation. The dependency array controls when effects run - empty array for mount-only effects, specific dependencies for conditional effects, and cleanup functions for preventing memory leaks."

### **Q: "What's the difference between props and state?"**

**Perfect Answer**: "Props are read-only data passed from parent to child components, while state is mutable data managed within a component. Props enable component communication and reusability, while state handles dynamic data that changes over time. Props flow down the component tree, state is local to the component that declares it."

---

## Modern React Patterns

### Custom Hooks

```javascript
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Hello, {user.name}!</div>;
}
```

### Compound Components

```javascript
const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child, { activeTab, setActiveTab, index })
      )}
    </div>
  );
};

const TabList = ({ children, activeTab, setActiveTab }) => (
  <div className="tab-list">
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, { 
        isActive: activeTab === index,
        onClick: () => setActiveTab(index)
      })
    )}
  </div>
);

const Tab = ({ children, isActive, onClick }) => (
  <button 
    className={`tab ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabPanels = ({ children, activeTab }) => (
  <div className="tab-panels">
    {React.Children.toArray(children)[activeTab]}
  </div>
);

// Usage
<Tabs defaultTab={0}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <div>Panel 1 content</div>
    <div>Panel 2 content</div>
  </TabPanels>
</Tabs>
```

---

## Interview Checklist

**Core Concepts**:
- ✅ Virtual DOM and reconciliation
- ✅ Component lifecycle and hooks
- ✅ Props vs state
- ✅ Event handling and synthetic events

**Advanced Topics**:
- ✅ Performance optimization (memo, useMemo, useCallback)
- ✅ Code splitting and lazy loading
- ✅ Error boundaries
- ✅ Custom hooks

**Ecosystem Knowledge**:
- ✅ React vs Node.js relationship
- ✅ Build tools and development workflow
- ✅ Testing strategies
- ✅ State management options

**Best Practices**:
- ✅ Component composition patterns
- ✅ Accessibility considerations
- ✅ Performance monitoring
- ✅ Code organization

**Interview Gold**: "React's strength lies in its predictable component model, efficient updates through the virtual DOM, and rich ecosystem. Understanding both the fundamentals and modern patterns like hooks enables building scalable, maintainable applications."

---

## Quick Reference

**Essential Hooks**:
- `useState`: Local state management
- `useEffect`: Side effects and lifecycle
- `useContext`: Context consumption
- `useCallback`: Function memoization
- `useMemo`: Value memoization
- `useRef`: DOM references and mutable values

**Performance Tips**:
- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize re-renders with useCallback/useMemo
- Use proper keys in lists
- Avoid inline objects/functions in JSX

**Common Patterns**:
- Controlled components for forms
- Custom hooks for reusable logic
- Error boundaries for error handling
- Context for global state
- Compound components for flexible APIs