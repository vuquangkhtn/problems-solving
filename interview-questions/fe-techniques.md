# FE Techniques

[[toc]]

### Pagination

- Pagination divides large datasets into smaller chunks or pages to improve performance, UX, and resource usage.
- Common strategies differ by API support, dataset volatility, and UX needs (page numbers vs infinite scroll).

**Cursor-based pagination (a.k.a. keyset)**

- How it works: Use a stable sort key (e.g., `created_at` + unique `id`) and return a cursor token to fetch the next page.
- Pros:
  - Stable under inserts/deletes; avoids duplicate/missing items.
  - Consistent performance (`O(page_size)`), good for infinite scrolling and feeds.
  - Works well with real-time/chronological lists.
- Cons:
  - Requires server support and a stable ordering key.
  - Hard to jump to arbitrary page N; cursors are typically opaque.
  - More complex to implement and debug than simple offsets.

Example (REST)

```
GET /api/feed?limit=20&cursor=eyJjcmVhdGVkX2F0IjoiMjAyNS0xMC0xMVQxMDozMDozMFoiLCJpZCI6IjEyMzQifQ

Response:
{
  "items": [/* 20 posts */],
  "nextCursor": "eyJjcmVhdGVkX2F0IjoiMjAyNS0xMC0xMVQxMDo0MDozMFoiLCJpZCI6IjEyNDUifQ"
}
```

Example (SQL keyset)

```
SELECT * FROM table WHERE id > cursor LIMIT 20
```

Real-world usage

- Facebook, Instagram, Twitter timelines (feeds with infinite scroll).
- GitHub GraphQL API (`connections` with `edges`/`pageInfo` cursors).
- Stripe API (`starting_after`/`ending_before` cursor parameters).

**Offset-based pagination**

- How it works: Use `offset` + `limit` to fetch page slices.
- Pros:
  - Simple to implement; maps naturally to page-number UX.
  - Easy to jump to arbitrary pages (e.g., `page=10`).
  - Works with legacy systems and basic SQL.
- Cons:
  - Performance degrades with large offsets; may scan many rows.
  - Susceptible to duplicates/misses when data changes between requests.
  - Ideal for page number navigation; not ideal for infinite scroll or high-churn datasets.

Example (REST)

```
GET /api/items?offset=200&limit=50

Response:
{
  "items": [/* 50 items */],
  "offset": 200,
  "limit": 50,
  "total": 12345
}
```

Example (SQL)

```
SELECT *
FROM products
ORDER BY created_at DESC
LIMIT :limit OFFSET :offset;
```

Real-world usage

- Many admin dashboards and reporting UIs with page numbers.
- GitHub REST API uses `page`/`per_page` parameters for lists.
- E-commerce category pages where jumping to page N is common.

**Page-number pagination**

- Pros:
  - Familiar UI and SEO-friendly canonical URLs.
  - Deterministic navigation and shareable links.
- Cons:
  - Often implemented via offset; inherits offset’s performance pitfalls.
  - Not great for real-time feeds where order shifts frequently.

Example (REST)

```
GET /blog?page=3&perPage=10

Response:
{
  "items": [/* posts 21-30 */],
  "page": 3,
  "perPage": 10,
  "totalPages": 42
}
```

Real-world usage

- Blogs, documentation sites, and search results with numbered pages.
- News sites and CMS-driven lists where SEO-friendly URLs matter.

**Client-side pagination**

- How it works: Fetch all data (or a large chunk) once, paginate in the browser.
- Pros:
  - Instant page transitions; minimal server calls after initial load.
  - Simple implementation when datasets are small and static.
- Cons:
  - Large payloads and memory usage; slow initial load.
  - Not viable for large or frequently changing datasets.
  - Harder to keep URLs canonical and pages linkable without extra logic.

Example (frontend)

```
// Fetch once, then paginate client-side
const data = await fetch('/api/reports?range=Q1').then(r => r.json());
const pageSize = 25;
const page = 2;
const visible = data.items.slice((page - 1) * pageSize, page * pageSize);
```

Real-world usage

- Analytics dashboards for small, static datasets.
- CSV viewers and internal tools where data size is bounded.

**Infinite scrolling**

- How it works: Load more items automatically as the user approaches the end.
- Pros:
  - Seamless UX; increases engagement for feeds.
  - Can be used with cursor-based pagination and lazy loading to provide a smooth scrolling experience.
  - Preserve cursor position on remounting can improve user experience.
  - Pre-fetching next pages can reduce perceived loading times.
- Cons:
  - Accessibility and navigation challenges; reaching footer becomes harder.
  - Back/forward navigation and scroll restoration can be tricky.
  - Potential memory growth as more items accumulate in the viewport.

Example (frontend)

```
// Load next page when user nears the bottom
const observer = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting && hasNext) {
    const res = await fetch(`/api/feed?limit=20&cursor=${nextCursor}`);
    const { items, nextCursor: nc } = await res.json();
    append(items);
    nextCursor = nc;
  }
});

observer.observe(document.querySelector('#sentinel'));
```

Real-world usage

- Facebook, Twitter, Instagram, LinkedIn, Pinterest feeds.
- YouTube Data API uses `pageToken` for successive pages.

### List / Table Optimization

**Virtualized List**

- How it works: Render only visible items, load more as needed.
- Pros:
  - Efficient memory usage; handles large datasets.
  - Seamless scrolling; no perceivable loading delays.
- Cons:
  - Complex implementation; requires careful handling of edge cases.
  - Potential performance issues with very high item counts.

**Shimmer loading effect**

- How it works: Display a placeholder or skeleton while content is loading.
- Pros:
  - Provides visual feedback; improves perceived performance.
  - Reduces bounce rate; increases user engagement.
- Cons:
  - May mislead users; overuse can be jarring.
  - Requires careful implementation to match the content’s loading time.

**Stale data**

- How it works: Display cached data while fetching new data in the background.
- Pros:
  - Improves perceived performance; reduces loading times.
  - Reduces server load; minimizes network requests.
- Cons:
  - May display outdated information; requires careful cache invalidation.
  - Can lead to stale data if not implemented properly.
  - Forces refresh to ensure accuracy for long idle periods.

### UX Improvements

**Optimistic updates**

- How it works: Update the UI instantly assuming success, then roll back if it fails.
- Pros:
  - Provides immediate feedback; increases user trust.
  - Improves perceived performance; reduces perceived loading times.
- Cons:
  - Complex implementation; requires careful handling of edge cases.
  - Potential for data inconsistencies if not implemented properly.

**Multi size image loading**

- How it works: Load different image sizes based on the user's device and network conditions.
- Pros:
  - Improves loading times; reduces bandwidth usage.
  - Saves resources; prevents loading of offscreen images.
  - <img> srcset attribute: Allows specifying multiple image sizes and resolutions.
- Cons:
  - Potential for data inconsistencies if not implemented properly.
  - Need to prepare multiple image sizes.

**Lazy loading**

- How it works: Load images only when they enter the viewport.
- Pros:
  - Improves initial page load time; reduces bandwidth usage.
  - Saves resources; prevents loading of offscreen images.
- Cons:
  - May cause layout shifts; requires careful implementation.
  - Can lead to jarring UX if images load too slowly.

Non-crucial features where the code can be lazy loaded on demand:

- Image uploader
- GIF picker
- Emoji picker
- Sticker picker
- Background images

### Live Updates

Live updates keep UIs synchronized with backend changes. Choose the simplest approach that meets latency, scale, and interaction needs.

**Short polling**

- How it works: Client fetches at fixed intervals (e.g., every 10s).
- Pros:
  - Easiest to implement; uses standard HTTP GET.
  - Works behind proxies/CDNs; no special infra.
- Cons:
  - Wastes cycles when no updates; higher network/server load.
  - Latency equals polling interval; not real-time.
- Example

```
setInterval(async () => {
  const res = await fetch('/api/notifications?since=lastSeen');
  const data = await res.json();
  render(data);
}, 10000);
```

- Use cases: Low-frequency updates, dashboards, simple status checks.

**Long polling**

- How it works: Client opens a request; server holds until data is available or times out, then client immediately reopens.
- Pros:
  - Near real-time without persistent connections.
  - Compatible with HTTP infra; good fallback to WebSockets.
- Cons:
  - Connection churn and holding threads/resources server-side.
  - Needs robust timeouts, backoff, and retry logic.
- Example

```
async function subscribe() {
  while (true) {
    const res = await fetch('/api/events?timeout=30000');
    const data = await res.json();
    handle(data);
  }
}
subscribe();
```

- Use cases: Chat/message updates when WebSockets aren’t feasible.

**Server-Sent Events (SSE)**

- How it works: One-way stream from server to client over HTTP (`text/event-stream`).
- Pros:
  - Simple API: `EventSource` in browsers; auto-reconnect.
  - Plays well with HTTP, load balancers, and auth cookies.
- Cons:
  - Downstream only (client can’t send messages on same channel).
  - Limited binary support; some enterprise proxies may buffer.
- Example

```
// Client
const es = new EventSource('/stream');
es.onmessage = (e) => update(JSON.parse(e.data));

// Server (Node/Express)
app.get('/stream', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
  res.write(`data: ${JSON.stringify({ type: 'tick', ts: Date.now() })}\n\n`);
});
```

- Use cases: Live dashboards, notifications, stock/score updates.

**WebSockets**

- How it works: Full-duplex, persistent connection for low-latency bidirectional messaging.
- Pros:
  - Lowest latency; supports real-time collaboration and interactive apps.
  - Efficient framing for frequent small messages.
- Cons:
  - Requires WS-capable infra and sticky sessions for stateful servers.
  - More complex: reconnect, heartbeat, and backpressure handling.
- Example

```
// Client
const ws = new WebSocket('wss://example.com/ws');
ws.onmessage = (e) => handle(JSON.parse(e.data));
ws.onopen = () => ws.send(JSON.stringify({ type: 'join', room: 'feed' }));

// Server (Node/ws)
wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'welcome' }));
});
```

- Use cases: Chat, collaborative editors, multiplayer, live feeds.

**HTTP/2 server push (legacy/limited)**

- How it works: Server pushes resources preemptively with HTTP/2.
- Pros:
  - Can reduce round-trips for predictable resources.
- Cons:
  - Deprecated/disabled in many browsers/servers; poor cache interaction.
  - Not suitable for arbitrary data updates; prefer SSE/WebSockets.
- Use cases: Rare today; consider `Preload` headers instead.

**Best practices**

- Implement retries with exponential backoff; detect connectivity changes.
- Use heartbeats/keep-alive (ping/pong) and close idle connections.
- Ensure idempotent message handling; include `messageId` for deduplication.
- Gate access with auth; prefer token refresh without reconnect storms.
- Provide fallbacks: try WebSockets → SSE → long polling.

### Caching Strategies

Caching reduces network calls and latency by reusing previously fetched data. Choose cache layers and policies based on freshness needs, mutation patterns, and scale.

**HTTP cache headers**

- `Cache-Control`: Controls max-age, `s-maxage` (CDN), `no-store`, `no-cache` (revalidate).
- `ETag` / `Last-Modified`: Enables conditional requests; server returns `304 Not Modified` when unchanged.
- `Vary`: Splits caches by header values (e.g., `Accept-Language`, `Authorization` for public/private variants).
- Patterns: Static assets long-lived (`Cache-Control: public, max-age=31536000, immutable`), dynamic data short-lived or revalidated.

Example

```
GET /api/items
If-None-Match: "abc123"

// Server: 304 Not Modified when body unchanged
```

**Client cache tiers**

- In-memory cache: Fastest; cleared on reload. Use for hot data and component lifecycles.
- Service Worker cache (`CacheStorage`): Offline support and request interception; good for assets and GET API responses.
- IndexedDB/localStorage: Persistent data store for larger payloads, user settings, and offline queues.

**Stale-While-Revalidate (SWR)**

- Serve cached data immediately; fetch in background to refresh.
- Great UX for lists/dashboards; pair with revalidation triggers (focus, network reconnect).
- Libraries: React Query/SWR provide cache keys, stale times, automatic refetch.

**Cache keys and TTLs**

- Derive keys from request parameters and auth context (e.g., `items?category=shoes&page=2&user=42`).
- Set TTLs per endpoint based on data volatility; shorter for feeds, longer for reference data.
- Use `staleTime` vs `cacheTime` (React Query) to tune refetch vs garbage collection.

**Invalidation strategies**

- Time-based (TTL): Expire after N seconds.
- Event-based: Invalidate on mutation (create/update/delete) via tags or topic notifications.
- Version-based: Include `version`/`updatedAt` to detect staleness; bust when changed.
- Keyed invalidation: Group cache entries by tag (e.g., `items:*`) to clear selectively.

**CDN caching**

- Push static assets to CDN with long TTL and `immutable`.
- Use `s-maxage` for CDN, `max-age` for browser; `Cache-Control: public` for cacheable GETs.
- `Vary: Authorization` or separate public/private endpoints to avoid cache poisoning.

**Prefetching and hydration**

- Prefetch likely-next pages on hover/idle using `requestIdleCallback`.
- SSR/SSG: Embed initial data to avoid waterfall; hydrate into client cache for reuse.

**Cache busting**

- Asset fingerprinting (content hash in filename) to invalidate CDNs safely.
- API: use `?v=hash` only for immutable resources; prefer headers for cache control.

Example (React Query)

```
const query = useQuery({
  queryKey: ['items', { category, page }],
  queryFn: () => fetch(`/api/items?category=${category}&page=${page}`).then(r => r.json()),
  staleTime: 30_000,
  cacheTime: 5 * 60_000,
});
```

### Normalized store

Normalize relational data in the frontend store to avoid duplication, enable referential stability, and make updates predictable.

**What and why**

- Store entities by `id` in maps (e.g., `users`, `posts`) and keep arrays of ids for lists.
- Benefits: Easier updates (`upsert`/`merge`), efficient re-renders, and consistent references for memoization.

**Schema design**

- Entities: `{ byId: Record<ID, Entity>, allIds: ID[] }` per type.
- Relationships: store foreign keys (e.g., `post.authorId`); denormalize at selector time.
- Use stable IDs; avoid embedding full nested objects in many places.

**Operations**

- Upsert: insert or update entity in `byId`; maintain `allIds` uniqueness.
- Replace vs merge: choose based on server semantics; prefer merge for partial updates.
- Delete: remove from `byId`, drop id from `allIds`, and clean references in lists.

**Selectors and denormalization**

- Build selectors that map ids to entities and join relationships.
- Memoize per id to maintain referential stability and reduce re-renders.
- Avoid returning new arrays/objects when inputs unchanged.

**Optimistic updates and versioning**

- Apply optimistic writes, track `pending`/`version` to reconcile server responses.
- Roll back or patch with server diff when conflicts occur.

Example structure

```
const store = {
  users: { byId: {}, allIds: [] },
  posts: { byId: {}, allIds: [] },
  lists: { feed: { ids: [], nextCursor: null } },
};

function upsert(entityType, entity) {
  const byId = store[entityType].byId;
  byId[entity.id] = { ...(byId[entity.id] || {}), ...entity };
  const ids = store[entityType].allIds;
  if (!ids.includes(entity.id)) ids.push(entity.id);
}
```

### Fuzzy Search

Handle imprecise queries and typos by scoring candidate matches and returning the best-ranked results.

**Preprocessing**

- Tokenize and normalize: lowercasing, diacritics removal, stemming/lemmatization as needed.
- Field weighting: assign importance to title, tags, description.

**Algorithms**

- Levenshtein / Damerau-Levenshtein: edit distance for typos and transpositions.
- Jaro-Winkler: good for short strings like names.
- Trigram/`n`-gram: overlap-based similarity; efficient indexing.
- TF-IDF + cosine similarity: bag-of-words relevance for longer text.
- BK-tree (metric tree): fast nearest-neighbor search by edit distance.
- Trie + prefix search: quick autocompletion for exact/prefix queries.

**Libraries**

- Client-side: `fuse.js`, `minisearch` for fuzzy matching with field weights.
- Server-side: Postgres `pg_trgm` (`%`, `similarity()`), Elastic/Lucene for full-text.

**UX and performance**

- Debounce input (150–300ms); cancel inflight requests on new keystrokes.
- Show highlighted matches; explain scoring when results look non-obvious.
- For large datasets, move search to a Web Worker or server and paginate.

Example (Fuse.js)

```
import Fuse from 'fuse.js';
const fuse = new Fuse(items, { keys: ['title', 'tags'], threshold: 0.3 });
const results = fuse.search(query).map(r => r.item);
```

### Handling Concurrent Requests

Common hazards: race conditions (stale responses overwrite fresh data), duplicate work, and overloaded backends. Use these patterns to control concurrency safely.

**Latest-wins guard**

- What: Only apply the most recent request’s result; ignore stale responses.
- How: Track a monotonic `requestId`/timestamp; compare on response.
- Pair with cancellation: abort previous requests to free resources.

Example (latest-wins + cancel)

```
let currentId = 0;
let currentController = null;

async function search(query) {
  const id = ++currentId;
  if (currentController) currentController.abort();
  currentController = new AbortController();

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: currentController.signal });
  const data = await res.json();
  if (id === currentId) render(data);
}
```

**In-flight deduplication (singleflight)**

- What: Reuse a single promise for identical inflight requests to the same resource.
- Why: Prevent duplicate calls under bursts, save bandwidth.

Example (singleflight)

```
const inflight = new Map();

function fetchOnce(key, fn) {
  if (inflight.has(key)) return inflight.get(key);
  const p = Promise.resolve().then(fn).finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}

// Usage
fetchOnce(`item:${id}`, () => fetch(`/api/items/${id}`).then(r => r.json()));
```

**Concurrency limits**

- What: Cap simultaneous requests to avoid saturating network/backend.
- How: Semaphore or small library (`p-limit`).

Example (semaphore)

```
class Semaphore {
  constructor(n) { this.n = n; this.q = []; }
  async acquire() { return new Promise(res => { this.q.push(res); this._drain(); }); }
  release() { this.n++; this._drain(); }
  _drain() { while (this.n > 0 && this.q.length) { this.n--; this.q.shift()(); } }
}

const sem = new Semaphore(4);
async function limitedFetch(url) {
  await sem.acquire();
  try { return await fetch(url); } finally { sem.release(); }
}
```

**Batching**

- What: Combine multiple small requests into one call to reduce overhead.
- How: Aggregate keys for a brief window (e.g., 10–30ms) and hit a batch endpoint.

Example (micro-batcher)

```
function createBatcher(send) {
  let queue = [];
  let timer = null;
  return (key) => new Promise((resolve, reject) => {
    queue.push({ key, resolve, reject });
    if (!timer) timer = setTimeout(async () => {
      const keys = queue.map(x => x.key);
      const pending = queue; queue = []; timer = null;
      try {
        const res = await send(keys); // POST /api/items/batch { keys }
        const map = new Map(res.map(r => [r.key, r.value]));
        pending.forEach(x => x.resolve(map.get(x.key)));
      } catch (e) {
        pending.forEach(x => x.reject(e));
      }
    }, 20);
  });
}
```

**Debounce/throttle**

- Debounce: delay until input stabilizes; ideal for typeahead.
- Throttle: limit rate; ideal for scroll/resize-driven requests.

**Parallel aggregation**

- Use `Promise.all` / `Promise.allSettled` for fan-out/fan-in patterns.
- Prefer `allSettled` when partial failures are acceptable.

**Fastest win**

- Use `Promise.any` / `Promise.race` when multiple sources can satisfy the request.
- Apply guardrails to avoid inconsistent results (e.g., prefer freshest source).

**Backpressure and priority**

- Queue non-urgent work; pause and respect `Retry-After` on 429/503.
- Prioritize user-critical requests over prefetch/background tasks.

**Idempotency and write safety**

- Include idempotency keys for POST/PUT to prevent duplicate side effects.
- Make writes idempotent server-side; dedupe by `Idempotency-Key` or natural keys.

**Timeouts and deadlines**

- Apply per-request timeouts and an overall deadline across retries.
- Fail fast and surface clear messages to the user.

Checklist

- Latest-wins guard with cancellation
- Singleflight for identical inflight calls
- Concurrency limit (semaphore/p-limit)
- Debounce/throttle for user-driven bursts
- Batching for small, frequent lookups
- Backpressure, priority lanes, respect Retry-After
- Use `Promise.allSettled` for partial success; `Promise.any` for fastest
- Idempotency keys for safe retries on writes; timeouts

### Failed requests and retries

Build resilient networking by combining smart retries, cancellation, and respectful rate limiting.

**Retries with exponential backoff and jitter**

- Why: Avoid thundering herds and give servers time to recover.
- How: Increase delay exponentially and randomize (full jitter). Cap attempts and total deadline.
- Respect server hints: use `Retry-After` when provided.

Example

```
async function withRetry(fn, {
  attempts = 5,
  base = 300, // ms
  deadlineMs = 10_000
} = {}) {
  let err, start = Date.now();
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) {
      err = e;
      const remaining = deadlineMs - (Date.now() - start);
      if (remaining <= 0) break;
      const sleep = Math.min(remaining, base * 2 ** i * (0.5 + Math.random() * 0.5));
      await new Promise(r => setTimeout(r, sleep));
    }
  }
  throw err;
}
```

**Cancellation and timeouts**

- Abort in-flight requests when no longer needed (navigation, new input).
- Enforce per-request timeout; surface friendly errors.
- Compose with retries by creating a fresh `AbortController` per attempt.

Example

```
async function fetchWithTimeout(url, { timeout = 5000, init } = {}) {
  const ac = new AbortController();
  const id = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(url, { ...init, signal: ac.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}
```

**Rate limiting and quotas**

- Client-side: throttle bursts; cap concurrency; exponential backoff on 429/503.
- Server-side: token bucket/leaky bucket; per-user/IP quotas; respond with `429` and `Retry-After`.
- Be polite: honor `Retry-After`, back off progressively, and avoid retry storms.

Example (client limiter)

```
class TokenBucket {
  constructor({ capacity = 10, refillRate = 5, intervalMs = 1000 }) {
    this.capacity = capacity; this.tokens = capacity;
    setInterval(() => { this.tokens = Math.min(this.capacity, this.tokens + refillRate); }, intervalMs);
  }
  async run(task) {
    while (this.tokens <= 0) await new Promise(r => setTimeout(r, 50));
    this.tokens--; return task();
  }
}

const bucket = new TokenBucket({ capacity: 8, refillRate: 4, intervalMs: 1000 });
bucket.run(() => fetch('/api/data'));
```

**Error classification**

- Transient: timeouts, 429, 503, network drops → retryable.
- Permanent: 4xx auth/validation errors → don’t retry; surface to user.

**Retry policies**

- Exponential backoff with full jitter: `base * 2^attempt * rand(0,1)`.
- Respect `Retry-After` header when present.
- Max attempts per endpoint; stop early on user navigation changes.

**Timeouts and deadlines**

- Set per-request timeout; abort and report gracefully.
- End-to-end deadline across retries to prevent unbounded wait.

**Circuit breaker**

- Open circuit on repeated failures; fail fast and try after cool-down.
- Isolate failing dependencies to prevent cascading failures.

**Fallbacks and offline**

- Serve cached/stale data when online fetch fails; mark data freshness.
- Queue write operations (outbox) for retry when connectivity restores.

Example (backoff + jitter)

```
async function withRetry(fn, { attempts = 5, base = 300 } = {}) {
  let err;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) {
      err = e;
      const sleep = base * Math.pow(2, i) * (0.5 + Math.random() * 0.5);
      await new Promise(r => setTimeout(r, sleep));
    }
  }
  throw err;
}

// Usage
withRetry(() => fetch('/api/data').then(r => {
  if (!r.ok) throw new Error(r.statusText);
  return r.json();
}));
```

### References

**Books**

- High Performance Browser Networking (Ilya Grigorik): https://hpbn.co/
- Designing Data-Intensive Applications (Martin Kleppmann): https://dataintensive.net/
- Release It! (Michael Nygard): https://pragprog.com/titles/mnee2/release-it-second-edition/
- Web Performance in Action (Jeremy Wagner): https://www.manning.com/books/web-performance-in-action
- Front-End Architecture: A Modern Blueprint (Micah Godbolt): https://www.oreilly.com/library/view/front-end-architecture/9781491926783/
- Building Micro-Frontends (Luca Mezzalira): https://www.oreilly.com/library/view/building-micro-frontends/9781492096782/

**Frameworks & Libraries**

- TanStack Query (React Query): https://tanstack.com/query/latest/docs/react/overview
- SWR: https://swr.vercel.app/
- Redux Toolkit Query: https://redux-toolkit.js.org/rtk-query/overview
- Apollo GraphQL (React): https://www.apollographql.com/docs/react/
- TanStack Virtual: https://tanstack.com/virtual/latest
- RxJS: https://rxjs.dev/
- Fuse.js: https://fusejs.io/
- Minisearch: https://lucaong.github.io/minisearch/
- Workbox (Service Worker caching): https://developer.chrome.com/docs/workbox/
