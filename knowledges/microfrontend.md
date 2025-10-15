## Micro-frontend

### Frontend Landscape: Mechanisms, Pros & Cons

**Single-Page Applications (SPA)**

- Pros
  - Fast in-app navigation; no full-page reloads.
  - Rich interactions; offline-capable with Service Worker.
  - Decoupled from backend via APIs; good DX and tooling.
  - Flexible caching and optimistic UI on client.
- Cons
  - Large initial JS can hurt FCP/LCP; requires code-splitting.
  - SEO requires SSR/prerendering; dynamic rendering adds complexity.
  - Complex state, caching, and hydration concerns; more client CPU/memory.
  - Accessibility and performance regressions easier to introduce.

**Multi-Page Apps / Traditional Server-Rendered (SSR-only)**

- Pros
  - Immediate HTML delivery; excellent SEO and Core Web Vitals.
  - Simpler client; smaller JS footprint; progressive enhancement friendly.
  - Works well on low-end devices; strong security posture.
  - Straightforward caching via HTTP/CDN.
- Cons
  - Full-page reloads; less fluid UX for app-like experiences.
  - Harder to share client state across pages.
  - Frontend scaling tied to backend monolith; slower parallelization.
  - More server coupling; UI iteration may require backend deploys.

**Isomorphic/Universal (SSR + CSR hydration)**

- Pros
  - Best of both: fast first render + interactive after hydration.
  - Good SEO and performance; streaming SSR and ISR improve UX.
  - Route-level data fetching; can cache server HTML and API responses.
  - Suitable for content + application hybrids (e.g., Next.js/Nuxt).
- Cons
  - Higher complexity: hydration, duplicated fetch logic, boundary bugs.
  - Infra cost (servers/edge); build and deployment pipelines more involved.
  - Memory/CPU considerations on server; need observability and backpressure.
  - Shared dependencies and partial hydration require careful design.

**Static Site Generation (SSG)**

- Pros
  - Extremely fast via CDN; minimal origin traffic; high reliability.
  - Great SEO; simple architecture; low hosting costs.
  - Easy caching; safe by default (no server runtime).
  - Works well for documentation, blogs, marketing, and catalog pages.
- Cons
  - Rebuilds can be slow for large sites; invalidation complexity.
  - Real-time data and personalization limited; needs client-side JS or SSR.
  - Incremental static regeneration (ISR) adds pipeline complexity.
  - Complex editorial workflows require careful orchestration.

**Jamstack (SSG + CDN + APIs/Serverless)**

- Pros
  - Global CDN delivery; scales cheaply and reliably.
  - Content updates via ISR/webhooks; decoupled frontend and backend.
  - Smaller attack surface; good developer productivity with modern tooling.
  - Clear separation of concerns; easy A/B and canary at the edge.
- Cons
  - Pipeline coordination (CMS, builds, cache) can be intricate.
  - Dynamic features rely on serverless/APIs; latency and consistency concerns.
  - Complex auth/session patterns; edge/stateful needs may push SSR.
  - Observability across multiple services requires investment.

**Micro-Frontend Applications**

- Pros
  - Team autonomy; independent deploys and versioning per domain.
  - Domain-driven design; aligns product strategy with tech choices.
  - Failure isolation; canary and progressive rollout per micro-frontend.
  - Tech diversity (with guardrails); scale organizations in parallel.
  - Clear ownership boundaries; easier to evolve large products.
- Cons
  - Orchestration complexity: routing, composition, shared deps, runtime integration.
  - Design system consistency and UX cohesion require strong governance.
  - Bundle duplication and performance overhead if not coordinated.
  - Testing, observability, and end-to-end reliability become harder.

**Quick guidance**

- Choose `SPA` for highly interactive apps where SEO is secondary and you can invest in performance.
- Choose `SSR-only MPA` for content-heavy sites needing top-tier SEO and minimal JS.
- Choose `Isomorphic` when you need both SEO and app-like UX; adopt streaming SSR/partial hydration.
- Choose `SSG/Jamstack` for mostly static content at global scale with simple dynamic islands.
- Choose `Micro-frontends` when scaling teams and modules independently outweigh added orchestration complexity.

### Define Micro Frontends

- Definition
  - Independently owned, built, deployed, and executed UI slices aligned to a bounded business context.
  - Integrate at runtime or build-time to form a coherent product surface.
- Core characteristics
  - Clear domain ownership and accountability per micro-frontend.
  - Independent repos, pipelines, versioning, and release cadence.
  - Explicit contracts: UI primitives, events, and API schemas.
  - Shared design system and tokens for consistent UX.
  - Failure isolation and targeted rollbacks (e.g., canary per domain).
- When it fits
  - Many teams, high release velocity, and well-defined domain seams.
  - Need for isolation in reliability, security, or compliance.
- When to avoid
  - Small teams, tightly coupled features, or when orchestration cost exceeds value.

### Composition

Composition refers to how micro-frontends are assembled into a cohesive application. The approach you choose impacts performance, SEO, team autonomy, and user experience.

#### Client-side Composition

In client-side composition, the browser assembles micro-frontends at runtime, typically orchestrated by an application shell.

**Pros:**

- **High interactivity**: Rich, app-like experiences with seamless transitions
- **Team autonomy**: Each team can deploy independently without coordinating server changes
- **Progressive enhancement**: Can load critical content first, then enhance with additional features
- **Flexible integration**: Supports various techniques (Module Federation, Web Components, dynamic imports)
- **Simpler infrastructure**: No need for complex server-side orchestration

**Cons:**

- **Performance overhead**: Multiple JavaScript bundles can impact initial load time and metrics like LCP
- **Bundle duplication**: Risk of shipping the same dependencies multiple times
- **SEO challenges**: Requires additional effort for search engine optimization
- **Complex state management**: Coordinating state across independently loaded fragments
- **Higher client resource usage**: More JavaScript parsing, execution, and memory usage

#### Server-side Composition

Server-side composition assembles micro-frontends on the server before sending HTML to the client.

**Pros:**

- **Better performance**: Faster First Contentful Paint and Largest Contentful Paint
- **Excellent SEO**: Search engines receive complete HTML content
- **Reduced client-side JavaScript**: Less parsing and execution on client devices
- **Works well on low-end devices**: Less demanding on client CPU and memory
- **Progressive enhancement**: Can deliver working content even before JS loads

**Cons:**

- **Infrastructure complexity**: Requires orchestration servers or edge functions
- **Deployment coordination**: Changes to composition may require server updates
- **Higher server costs**: Increased compute resources for rendering
- **Potential single point of failure**: Server issues affect all micro-frontends
- **Hydration complexity**: Ensuring client-side interactivity aligns with server-rendered HTML

#### Edge-side Composition

Edge-side composition moves the assembly process closer to users by leveraging CDN edge nodes or edge computing platforms.

**Pros:**

- **Global performance**: Reduced latency by composing near the user
- **Scalability**: Distributed composition reduces origin server load
- **Caching efficiency**: Can cache fragments and compositions separately
- **Personalization at the edge**: Tailor experiences without origin roundtrips
- **Resilience**: Can continue serving cached fragments even if some origins are down

**Cons:**

- **Emerging technology**: Less mature tooling and patterns
- **Limited computing resources**: Edge functions have stricter limits than servers
- **Debugging challenges**: Distributed system makes tracing issues more complex
- **Cold starts**: First requests may experience latency if edge functions need to initialize
- **Vendor lock-in**: Often tied to specific CDN or cloud provider capabilities

#### Integration Techniques

- **Module Federation**: Share dependencies and mount remotes for pages/components; excellent for React/Vue/Angular ecosystems
- **Web Components**: Framework-agnostic encapsulation with CSS scoping and event-based APIs; best for technology-diverse teams
- **iframes**: Strongest isolation and security; good for integrating legacy applications or third-party content
- **Islands Architecture**: Hydrate discrete interactive islands on mostly static pages; optimal for content-heavy sites with targeted interactivity
- **ESI/SSI**: Server-side includes for fragment composition; works well with existing CDN infrastructure

#### Implementation Considerations

- **Design system cohesion**: Ensure consistent UI/UX across independently developed fragments
- **Performance optimization**: Implement code-splitting, prefetching, skeletons, and error boundaries
- **Dependency management**: Establish governance to prevent duplication and version conflicts
- **CSS isolation**: Prevent style leakage between micro-frontends
- **Observability**: Implement logging, tracing, and user-impact metrics for each micro-frontend

### Routing

Routing in micro-frontends determines how navigation works across different domains and fragments. The routing approach must balance user experience, SEO, and team autonomy.

#### Client-side Routing

Client-side routing handles navigation entirely in the browser, typically using the History API or hash-based routing.

**Pros:**

- **Seamless transitions**: No full page reloads, creating a fluid app-like experience
- **Preserved client state**: Maintains in-memory state during navigation
- **Independent deployment**: Teams can update their routes without coordinating with others
- **Granular code-splitting**: Load only the code needed for the current route
- **Rich navigation patterns**: Supports nested routes, route guards, and transitions

**Cons:**

- **SEO challenges**: Requires special handling for search engine crawlers
- **Initial load performance**: May require loading router code before rendering content
- **Complex coordination**: Needs clear contracts between shell and micro-frontend routers
- **History management**: Requires careful handling of browser history and back/forward navigation
- **Accessibility concerns**: Client-side navigation can break focus management and screen readers

#### Server-side Routing

Server-side routing resolves URLs on the server and delivers pre-composed pages for each route.

**Pros:**

- **SEO-friendly**: Search engines receive complete HTML for each route
- **Faster initial render**: No need to wait for JS to load before showing content
- **Simpler mental model**: Traditional web navigation patterns
- **Reduced client-side complexity**: Less router code in the browser
- **Better for low-end devices**: Less JavaScript processing required

**Cons:**

- **Full page reloads**: Can create a less fluid user experience
- **Server coordination**: Changes to routing may require server-side updates
- **Shared state challenges**: Harder to preserve state across page navigations
- **Deployment coupling**: Route changes may require coordinated deployments
- **Higher server load**: Each navigation generates a server request

#### Edge-side Routing

Edge-side routing leverages CDN edge nodes or edge computing to handle routing decisions closer to users.

**Pros:**

- **Reduced latency**: Routing decisions made closer to the user
- **Geo-specific routing**: Can route to different implementations based on user location
- **Caching efficiency**: Can cache different routes independently
- **Traffic management**: Easier to implement A/B testing or canary releases
- **Resilience**: Can provide fallbacks when origin servers are unavailable

**Cons:**

- **Configuration complexity**: Edge routing rules can be complex to manage
- **Limited logic capabilities**: Edge functions have constraints on execution time and complexity
- **Debugging difficulty**: Distributed nature makes tracing issues challenging
- **Cache invalidation**: Requires careful management when routes or content change
- **Vendor-specific implementations**: Often tied to specific CDN or cloud provider capabilities

#### Implementation Patterns

- **Hierarchical routing**: Shell router handles top-level routes, micro-frontends manage their internal routes
- **Path-based delegation**: Map URL patterns to specific micro-frontends (e.g., `/account/*` → account micro-frontend)
- **Query parameter routing**: Use query parameters to control which micro-frontends are active
- **Deep linking**: Ensure direct URLs work for any page in the application
- **Hybrid approaches**: Combine server-side routing for initial page load with client-side routing for subsequent navigation

#### Best Practices

- **Consistent URL structure**: Establish conventions for route naming and parameters
- **Preserve browser functionality**: Ensure back/forward buttons and bookmarking work as expected
- **Performance optimization**: Implement route prefetching and code-splitting
- **Error handling**: Provide fallbacks for missing routes or failed micro-frontend loads
- **Analytics integration**: Track route changes for user journey analysis

### Communication

- Patterns
  - Event-based: `CustomEvent` on `window`/`EventTarget` for decoupled Pub/Sub.
  - API-based: BFF/REST/GraphQL contracts as the primary integration layer.
  - Shared state (limited): global session/theme; prefer explicit events over shared stores.
  - Cross-frame: `postMessage` for iframe integration with origin checks.
  - Real-time: WebSocket/SSE channels per domain; broadcast via `BroadcastChannel` when needed.
- Guidelines
  - Treat events and contracts as public APIs: version them and maintain backward compatibility.
  - Keep payloads minimal, typed, and validated; enforce schema via OpenAPI/GraphQL SDL.
  - Avoid direct imports across micro-frontends; use boundary interfaces.
  - Implement error classification, timeouts, retries, and circuit breakers for remote calls.
  - Security: validate origins, sanitize inputs, and apply least privilege for cross-app comms.

### What is Application Shell in Micro Frontend?

The Application Shell (or App Shell) is a critical architectural pattern in micro-frontend implementations that serves as the container and orchestrator for all micro-frontend components. It provides the foundation for loading, rendering, and coordinating multiple independent micro-frontends within a unified application experience.

**Key responsibilities of the Application Shell:**

- **Bootstrapping the application**: Initializes the core application framework and loads essential resources.
- **Routing and navigation**: Manages the top-level routing to determine which micro-frontend(s) should be loaded based on the current URL.
- **Layout management**: Provides the overall page structure and layout containers where micro-frontends will be mounted.
- **Authentication and authorization**: Often handles user authentication and maintains session state that can be shared with micro-frontends.
- **Micro-frontend loading**: Dynamically loads and unloads micro-frontends as users navigate through the application.
- **Communication coordination**: Establishes the event bus or communication mechanisms that allow micro-frontends to interact with each other.
- **Shared dependencies**: Manages common dependencies and shared libraries to avoid duplication.
- **Error boundaries**: Provides fallback UI and error handling when micro-frontends fail to load or crash during execution.
- **Global state management**: Maintains application-wide state that needs to be accessible across micro-frontends.

**Implementation approaches:**

1. **Lightweight shell**: Minimal shell that primarily handles routing and composition, with most functionality delegated to micro-frontends.
2. **Feature-rich shell**: More comprehensive shell that provides shared services, state management, and UI components to micro-frontends.
3. **Server-side shell**: Composition happens on the server, with the shell rendering the initial HTML structure before sending to the client.

**Best practices:**

- Keep the shell as thin as possible to maintain the autonomy of micro-frontends.
- Clearly define the contract between the shell and micro-frontends.
- Implement proper error boundaries to prevent a failing micro-frontend from breaking the entire application.
- Consider performance implications when loading multiple micro-frontends.
- Design the shell to be framework-agnostic if micro-frontends use different technologies.

The Application Shell pattern is essential for creating a cohesive user experience while maintaining the independence and isolation benefits of micro-frontends.

### Microfrontend Principles and applying to MFEs

Micro-frontends apply microservice principles to frontend development, enabling teams to work independently while delivering a cohesive user experience. These principles are derived from microservices architecture but adapted for frontend challenges.

#### Core Microservice Principles Applied to Micro-frontends

1. **Modeled Around Business Domains**
   - **Principle**: Organize teams and code around business capabilities rather than technical layers
   - **Application to MFEs**: Each micro-frontend represents a distinct business domain or user journey
   - **Implementation**: Use Domain-Driven Design (DDD) to identify bounded contexts that translate to micro-frontends

2. **Culture of Automation**
   - **Principle**: Automate repetitive tasks to improve efficiency and reduce errors
   - **Application to MFEs**: Implement CI/CD pipelines specific to each micro-frontend
   - **Implementation**: Automated testing, building, and deployment for each micro-frontend independently

3. **Hide Implementation Details**
   - **Principle**: Encapsulate internal workings behind well-defined interfaces
   - **Application to MFEs**: Each team chooses their own tech stack without affecting others
   - **Implementation**: Define clear contracts for communication between micro-frontends

4. **Decentralized Governance**
   - **Principle**: Teams make autonomous decisions about their services
   - **Application to MFEs**: Frontend teams own their entire development lifecycle
   - **Implementation**: Teams select frameworks, libraries, and patterns that best suit their domain needs

5. **Deploy Independently**
   - **Principle**: Services can be deployed without affecting other services
   - **Application to MFEs**: Update individual parts of the UI without rebuilding the entire application
   - **Implementation**: Separate build pipelines and deployment artifacts for each micro-frontend

6. **Isolate Failure**
   - **Principle**: Failures in one service shouldn't cascade to others
   - **Application to MFEs**: Errors in one micro-frontend don't break the entire application
   - **Implementation**: Error boundaries, fallback UIs, and resilient loading strategies

7. **Highly Observable**
   - **Principle**: Monitor and understand system behavior in production
   - **Application to MFEs**: Track performance and errors at the micro-frontend level
   - **Implementation**: Distributed tracing, centralized logging, and performance monitoring

#### Benefits of Applying These Principles

- **Team Autonomy**: Teams can work and deploy independently
- **Technology Flexibility**: Different parts of the application can use different frameworks
- **Incremental Upgrades**: Modernize the application piece by piece
- **Scalable Development**: Multiple teams can work in parallel without conflicts
- **Focused Expertise**: Teams become domain experts in their business area

#### Challenges When Applying Principles

- **Consistency**: Maintaining consistent UX across independently developed components
- **Performance**: Managing bundle sizes and avoiding duplicate dependencies
- **Complexity**: Increased operational complexity in building and deployment
- **Integration Testing**: Ensuring micro-frontends work together correctly
- **Learning Curve**: Teams need to adapt to distributed frontend architecture

Micro-frontend principles should be applied pragmatically, considering the specific needs of your organization and project. Not all applications benefit from this architecture, particularly smaller applications with limited team sizes.

### Client-side Integration Techniques Comparison

When implementing micro-frontends with a Horizontal Split Architecture on the client-side, there are several integration techniques to choose from. Here's a detailed comparison of the three most common approaches:

#### Module Federation (Webpack 5)

**Pros:**
- **Shared dependencies**: Efficiently shares common libraries to reduce bundle size and avoid duplication
- **Runtime integration**: Loads micro-frontends dynamically at runtime without page reloads
- **Native developer experience**: Feels like working with a monolithic codebase while maintaining separation
- **Granular control**: Can expose specific components, functions, or entire applications
- **TypeScript support**: Provides type safety across micro-frontend boundaries
- **Versioning**: Supports versioning of exposed modules for better dependency management
- **Framework agnostic**: Works with React, Vue, Angular, and other frameworks

**Cons:**
- **Webpack dependency**: Requires Webpack 5, limiting technology choices
- **Configuration complexity**: Setup can be complex and requires deep Webpack knowledge
- **Build-time coupling**: Changes to shared dependencies may require coordinated rebuilds
- **Learning curve**: Concepts like remote and host applications need time to master
- **Debugging challenges**: Runtime errors can be harder to trace across module boundaries
- **Limited isolation**: Less isolation than iframes, potentially allowing CSS/JS conflicts

#### iFrames

**Pros:**
- **Strong isolation**: Complete JavaScript and CSS isolation between micro-frontends
- **Security**: Robust security boundaries with cross-origin restrictions
- **Technology independence**: Each micro-frontend can use completely different tech stacks
- **Simplicity**: Conceptually simple to implement and understand
- **Stability**: Changes in one micro-frontend cannot break others
- **Legacy support**: Excellent for integrating legacy applications or third-party content
- **Independent deployment**: Each frame can be deployed without affecting others

**Cons:**
- **Performance overhead**: Each iframe has its own JavaScript context and DOM
- **UX limitations**: Challenges with responsive design, focus management, and scrolling
- **Communication complexity**: Cross-frame communication requires postMessage API
- **Duplicate resources**: Each iframe loads its own copy of shared libraries
- **SEO challenges**: Search engines may not properly index content in iframes
- **Accessibility issues**: Screen readers and keyboard navigation can be problematic
- **History/routing complications**: Browser history management becomes more complex

#### Web Components

**Pros:**
- **Browser standard**: Based on web standards (Custom Elements, Shadow DOM, HTML Templates)
- **Framework agnostic**: Works with any JavaScript framework or vanilla JS
- **CSS encapsulation**: Shadow DOM provides style isolation
- **Reusability**: Components can be used across different applications
- **Progressive enhancement**: Can work without JavaScript in some cases
- **Longevity**: Less susceptible to JavaScript framework churn
- **Lightweight**: Minimal overhead compared to full framework solutions

**Cons:**
- **Browser support**: May require polyfills for older browsers
- **Limited ecosystem**: Fewer tools and libraries compared to popular frameworks
- **State management**: No built-in state management solution
- **Styling complexity**: Shadow DOM boundaries can make theming challenging
- **Learning curve**: Requires understanding web component specifications
- **Integration friction**: Some frameworks have challenges integrating with web components
- **Testing maturity**: Testing tools and patterns less established than React/Angular

#### Selection Criteria

When choosing between these approaches, consider:

1. **Team structure**: How independent do teams need to be?
2. **Security requirements**: How strict are your isolation needs?
3. **Performance goals**: What are your bundle size and loading time targets?
4. **Technology diversity**: Do teams need to use different frameworks?
5. **Developer experience**: What's the learning curve your teams can handle?
6. **User experience**: How seamless should the integration feel?
7. **Deployment strategy**: How independent should deployments be?

The best approach often depends on your specific organizational context, technical requirements, and team structure. Many successful micro-frontend implementations use a combination of these techniques for different parts of their application.
