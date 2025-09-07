# Website Loading Process: From URL to Screen

This document describes the complete process from typing a website's URL to it finishing loading on your screen, including both network operations and browser rendering.

## Overview

Web performance involves two major challenges:
- **Latency**: The time it takes to transmit data over networks
- **Single-threaded nature**: Browsers execute tasks sequentially, making render time critical for smooth interactions

## Phase 1: Navigation and Network Operations

### 1. URL Entry
You type `maps.google.com` into the address bar of your browser.

### 2. DNS Resolution
The browser checks caches for a DNS record to find the corresponding IP address:

**Cache hierarchy:**
- First: Browser cache
- Second: OS cache  
- Third: Router cache
- Fourth: ISP (Internet Service Provider) cache

If not cached, the ISP's DNS server initiates a DNS query from root domain to final domains. On mobile networks, DNS lookups can add significant latency due to the distance between phone, cell tower, and name server.

### 3. TCP Connection Establishment
The browser initiates a TCP connection using the three-way handshake:

- **SYN**: Client sends a SYN packet asking if the server accepts new connections
- **SYN-ACK**: Server responds with acknowledgment if ports are available
- **ACK**: Client acknowledges the server's response

This process requires three round trips before any data transmission.

### 4. TLS Negotiation (HTTPS)
For secure connections, an additional handshake occurs:
- Determines encryption cipher
- Verifies server identity
- Establishes secure connection
- Requires **five additional round trips**

Total: **8 round trips** before the actual content request.

### 5. HTTP Request/Response
- Browser sends HTTP GET request
- Server processes and responds with HTML content
- **Time to First Byte (TTFB)**: Measures time from request to first data packet

## Phase 2A: Browser Processing

Once the browser receives the HTML response, it begins parsing and processing the content.

### 6. HTML Parsing and DOM Construction
- Browser parses HTML markup into a Document Object Model (DOM)
- Creates a tree structure representing the page content
- Identifies and processes additional resources (CSS, JavaScript, images)

### 7. Resource Loading
- Browser discovers additional resources referenced in HTML
- Initiates parallel downloads for:
  - CSS stylesheets
  - JavaScript files
  - Images and other media
  - Fonts
- Each unique hostname requires separate DNS lookups

### 8. CSS Processing and CSSOM
- Parses CSS files to create CSS Object Model (CSSOM)
- Combines with DOM to determine final styling
- Blocks rendering until critical CSS is processed

### 9. JavaScript Execution
- Executes JavaScript that may modify DOM or CSSOM
- Can block HTML parsing (unless async/defer attributes used)
- May trigger additional resource requests

### 10. Render Tree Construction
- Combines DOM and CSSOM into render tree
- Determines which elements are visible and their styling
- Excludes hidden elements (display: none)

## Phase 2B: Browser Rendering

After processing is complete, the browser renders the visual representation.

### 11. Layout (Reflow)
- Calculates exact position and size of each element
- Determines geometric properties based on viewport
- Can be triggered by DOM changes or window resizing

### 12. Paint and Composite
- Converts render tree into actual pixels on screen
- Handles layering, transparency, and visual effects
- Modern browsers use GPU acceleration for compositing

## Performance Considerations

### Single-Threaded Limitations
- Browsers are largely single-threaded for DOM operations
- Long-running tasks can block user interactions
- Goal: Keep main thread available for smooth user experience

### Optimization Strategies
- Minimize DNS lookups by reducing unique hostnames
- Use HTTP/2 for multiplexed connections
- Implement critical CSS inlining
- Optimize JavaScript execution timing
- Leverage browser caching mechanisms

## References

- [What happens when you type a URL in the browser](https://medium.com/@maneesa/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a)
- [How browsers work - MDN Performance Guide](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)
