# Micro-Frontends

[[toc]]

### What is Application Shell in Micro Frontend?

- **Definition:** The Application Shell is the container and orchestrator for independently delivered micro-frontends.
- It provides the foundation for loading, rendering, routing, and coordinating fragments in one user experience.

Shell is responsible for:

- **Bootstrapping the application**: Initializes the core application framework and loads essential resources.
- **Routing and navigation**: Manages the top-level routing to determine which micro-frontend(s) should be loaded based on the current URL.
- **Layout management**: Provides the overall page structure and layout containers where micro-frontends will be mounted.
- **Micro-frontend loading**: Dynamically loads and unloads micro-frontends as users navigate through the application.
- **Communication coordination**: Establishes the event bus or communication mechanisms that allow micro-frontends to interact with each other.
- **Shared dependencies**: Manages common dependencies and shared libraries to avoid duplication.
- **Error boundaries**: Provides fallback UI and error handling when micro-frontends fail to load or crash during execution.
- **Global state management**: Maintains application-wide state that needs to be accessible across micro-frontends.

- Common implementation approaches:

  - **Lightweight shell:** Primarily handles routing and composition.
  - **Feature-rich shell:** Also provides shared services, state management, and UI components.
  - **Server-side shell:** Composes the initial HTML on the server.

Best practices for Application Shell:

- Keep the shell as thin as possible to maintain the autonomy of micro-frontends.
- Clearly define the contract between the shell and micro-frontends.
- Implement proper error boundaries to prevent a failing micro-frontend from breaking the entire application.
- Consider performance implications when loading multiple micro-frontends.
- Design the shell to be framework-agnostic if micro-frontends use different technologies.

The Application Shell pattern is essential for creating a cohesive user experience while maintaining the independence and isolation benefits of micro-frontends.

### What is Web Components? Describe Web Components technologies

- **Definition:** Web Components are browser-standard APIs for reusable, encapsulated custom elements.
- They use standard HTML, CSS, and JavaScript and can be consumed by different frameworks.

Web Components consist of three main technologies:

- **Custom Elements:** Define new HTML tags with lifecycle callbacks, properties, methods, and events via `customElements.define()`.
- **Shadow DOM:** Encapsulates a component's DOM and styles via `attachShadow()`.
- **HTML Templates:** Store inert, reusable markup in `<template>` and clone it through the `content` property.

### What is LitElement?

- LitElement is the older base class from the Lit project for building reactive Web Components.
- Modern Lit applications typically extend `LitElement` from the `lit` package and use reactive properties plus a `render()` method.

### Why is it recommended to use unidirectional data flow in micro-frontends?

- **Definition:** State and events move through explicit, predictable contracts rather than arbitrary two-way mutation.
- Each micro-frontend owns its local state; shared data should cross boundaries through documented props, events, or APIs.
- Benefits include easier debugging, fewer hidden side effects, and clearer ownership.

### BFF in Micro-Frontends

- **Definition:** A Backend for Frontend is a server-side adapter tailored to one frontend or user experience.
- It aggregates backend calls, reshapes data, handles frontend-specific concerns, and hides internal service details.
- A separate BFF per micro-frontend is optional; use it when the frontend has distinct data or security needs.

### API Gateway in Micro-Frontends

- **Definition:** An API Gateway is a controlled entry point that routes client requests to backend services.
- Typical responsibilities include routing, authentication, authorization, rate limiting, observability, and response aggregation.
- A gateway is not automatically one-per-micro-frontend, and it can become a bottleneck or single point of failure without scaling and redundancy.

### What is Domain-Driven Design (DDD)? Describe the Concepts of Domain-Driven Design

- **Definition:** Domain-Driven Design models software around the business domain and its language.
- Key concepts:

  - **Bounded context:** A boundary within which a domain model and terminology have a specific meaning.
  - **Focus on the domain:** Build around business rules and processes, not only technical structure.
  - **Collaboration:** Domain experts and developers refine the model together.
  - **Ubiquitous language:** Shared terminology is used consistently in conversations, code, and documentation.
