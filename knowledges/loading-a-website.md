# Website Loading Process - Interview Guide

## The Big Picture Question: "What happens when you type a URL?"

**This is THE classic interview question!** Here's how to structure your answer:

**Two Main Phases**:

1. **Network Phase**: Getting the data (DNS → TCP → HTTP)
2. **Browser Phase**: Rendering the page (Parse → Render → Layout → Paint)

**Key Challenges to Mention**:

- **Latency**: Network delays (especially mobile)
- **Single-threaded browsers**: Main thread blocking affects user experience

**Interview Tip**: Start with the big picture, then dive into details based on interviewer interest!

## Phase 1: Network Operations ("Getting the Data")

### Step 1: DNS Lookup

**What happens**: Browser converts `google.com` → IP address

**Cache Check Order** (mention this!):

1. Browser cache
2. OS cache
3. Router cache
4. ISP cache

**Interview Answer**: "First, the browser checks multiple cache levels for the IP address. If not found, it performs a DNS lookup, which can be slow on mobile networks."

### Step 2: TCP Connection (3-Way Handshake)

```
Client → Server: SYN ("Can I connect?")
Server → Client: SYN-ACK ("Yes, acknowledged")
Client → Server: ACK ("Great, let's talk")
```

**Cost**: 3 round trips before any data transfer

### Step 3: TLS Handshake (HTTPS)

**What it does**: Establishes secure encryption
**Cost**: 5 additional round trips
**Total**: 8 round trips before actual content!

**Interview Gold**: "HTTPS requires 8 round trips total - 3 for TCP, 5 for TLS - which is why connection reuse and HTTP/2 are so important."

### Step 4: HTTP Request/Response

- Browser sends GET request
- Server responds with HTML
- **TTFB (Time to First Byte)**: Key metric to mention!

## Phase 2: Browser Processing ("Building the Page")

### Step 5: HTML Parsing → DOM

**What happens**: HTML text becomes a tree structure (DOM)

**Key Point**: Browser has a **preload scanner** that finds resources early!

**Interview Answer**: "The browser parses HTML into a DOM tree while the preload scanner identifies critical resources like CSS and JavaScript to fetch in parallel."

### Step 6: CSS Processing → CSSOM

**What happens**: CSS becomes style rules (CSSOM)
**Important**: CSS blocks rendering! (render-blocking resource)

### Step 7: JavaScript Execution

**Default behavior**: Blocks HTML parsing
**Solutions to mention**:

```html
<script async src="script.js"></script>
<!-- Non-blocking -->
<script defer src="script.js"></script>
<!-- Wait for DOM -->
```

**Interview Tip**: "I use async for independent scripts and defer for scripts that need the DOM."

### Step 8: Render Tree Creation

**Formula**: DOM + CSSOM = Render Tree
**What it excludes**: Hidden elements (`display: none`)

**Interview Answer**: "The render tree combines DOM structure with CSSOM styling, excluding invisible elements to optimize rendering."

## Phase 3: Browser Rendering ("Drawing the Page")

### Step 9: Layout (Reflow)

**What it does**: Calculates exact positions and sizes
**Triggers**: DOM changes, window resize, CSS changes
**Performance tip**: Batch DOM changes to avoid multiple reflows

### Step 10: Paint & Composite

**Paint**: Fill in the pixels
**Composite**: Layer everything together (GPU accelerated!)

**Interview Answer**: "Modern browsers use GPU acceleration for compositing, which is why CSS transforms and opacity are faster than changing layout properties."

### The Critical Rendering Path

**Complete sequence**: HTML → DOM → CSSOM → Render Tree → Layout → Paint

**Interview Gold**: "Understanding the critical rendering path helps identify bottlenecks - CSS blocks rendering, JavaScript blocks parsing, and layout changes are expensive."

## Key Performance Metrics (Memorize These!)

### **Core Web Vitals** (Google's Standards):

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Other Important Metrics**:

- **TTFB (Time to First Byte)**: Server response time
- **FCP (First Contentful Paint)**: When content appears
- **TTI (Time to Interactive)**: When page responds to clicks

**Interview Tip**: "I focus on Core Web Vitals because they directly impact user experience and SEO rankings."

## Common Optimization Strategies

### **Network Optimizations**:

- ✅ Reduce DNS lookups (fewer domains)
- ✅ Use HTTP/2 multiplexing
- ✅ Enable compression (gzip/brotli)
- ✅ Implement proper caching headers

### **Rendering Optimizations**:

- ✅ Inline critical CSS
- ✅ Use async/defer for JavaScript
- ✅ Minimize layout thrashing
- ✅ Optimize images (WebP, lazy loading)

**Interview Answer**: "I optimize the critical rendering path by inlining critical CSS, using async JavaScript, and minimizing render-blocking resources."

## Interview Questions & Perfect Answers

### **Q: "What happens when you type a URL and press Enter?"**

**A**: "There are two main phases: network and browser. First, DNS resolves the domain to an IP, then TCP and TLS establish a secure connection - that's 8 round trips total. Once we get the HTML, the browser parses it into a DOM, processes CSS into CSSOM, combines them into a render tree, calculates layout, and finally paints pixels to screen."

### **Q: "Why is HTTPS slower than HTTP?"**

**A**: "HTTPS requires an additional TLS handshake that adds 5 round trips to establish encryption. However, HTTP/2 and connection reuse minimize this impact in practice."

### **Q: "What's the critical rendering path?"**

**A**: "It's the sequence browsers follow to render pages: HTML parsing → DOM construction → CSS parsing → CSSOM → Render tree → Layout → Paint. Optimizing this path is key to performance."

### **Q: "How do you optimize page loading?"**

**A**: "I focus on the critical rendering path: inline critical CSS, use async/defer for JavaScript, optimize images, minimize DNS lookups, and leverage browser caching. I also monitor Core Web Vitals to ensure good user experience."

### **Q: "What's the difference between async and defer?"**

**A**: "Async downloads and executes immediately without blocking, good for independent scripts. Defer downloads in parallel but waits to execute until DOM is complete, better for scripts that need the DOM."

---

## Quick Reference Checklist

**Network Phase** (8 round trips):

1. DNS lookup (check caches first)
2. TCP handshake (3 round trips)
3. TLS handshake (5 round trips)
4. HTTP request/response

**Browser Phase**:

1. HTML → DOM
2. CSS → CSSOM
3. DOM + CSSOM → Render Tree
4. Layout (calculate positions)
5. Paint (draw pixels)

**Performance Wins**:

- Inline critical CSS
- Async/defer JavaScript
- Optimize images
- Minimize DNS lookups
- Use HTTP/2
- Monitor Core Web Vitals
