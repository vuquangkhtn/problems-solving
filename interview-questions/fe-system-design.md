## FE System Design

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
