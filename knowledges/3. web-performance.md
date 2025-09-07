# Web Performance - Interview Guide

Refer: https://developer.mozilla.org/en-US/docs/Web/Performance

## What is Web Performance?

**Simple Answer**: Web performance is about making websites fast and responsive for users.

**Key Points to Remember**:

- **Loading Speed**: How quickly users see content
- **Responsiveness**: How fast the site reacts to user clicks/taps
- **Smooth Experience**: No lag, stuttering, or unexpected layout shifts

**Why It Matters**:

- Poor performance = users leave (3+ seconds = 53% bounce rate)
- Better performance = better SEO rankings
- Improved user satisfaction and conversion rates

## How Browsers Render Pages (Interview Essential)

**The 5-Step Process**:

1. **Parse HTML** → Build DOM tree
2. **Parse CSS** → Build style rules
3. **Combine** → Create render tree
4. **Layout** → Calculate positions
5. **Paint** → Draw pixels

**Common Performance Problems**:

- **Blocking Resources**: CSS/JS that stops rendering
- **Too Much JavaScript**: Large bundles slow download
- **Network Issues**: Slow server responses
- **Poor Animations**: Cause stuttering (jank)

**Interview Tip**: Mention "Critical Rendering Path" - shows you understand the fundamentals!

## Key Performance Numbers (Memorize These!)

**Essential Timing Thresholds**:

- **1 second**: Show loading indicator
- **2-3 seconds**: Page should be interactive
- **50ms**: Response to user input
- **16.7ms**: Each animation frame (60 FPS)

**Google's Core Web Vitals**:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Interview Gold**: Mention these numbers to show you know current standards!

## Quick Optimization Wins (Easy Interview Answers)

### 1. **Reduce Bundle Size**

```javascript
// Code splitting example
import('./heavy-component').then((module) => {
  // Load only when needed
});
```

### 2. **Lazy Loading**

```html
<img loading="lazy" src="image.jpg" alt="description" />
```

### 3. **Resource Hints**

```html
<link rel="preload" href="critical.css" as="style" />
<link rel="dns-prefetch" href="//api.example.com" />
```

### 4. **Critical CSS**

- Inline styles for above-the-fold content
- Load non-critical CSS asynchronously

**Interview Tip**: Always mention specific techniques with code examples!

## Animation Performance (Common Interview Topic)

### **CSS vs JavaScript Animations**

- **CSS**: Faster, runs on GPU, use for simple animations
- **JavaScript**: More control, use for complex interactions

### **Fast Properties** (GPU Accelerated):

```css
/* ✅ GOOD - No layout recalculation */
transform: translateX(100px);
opacity: 0.5;
```

### **Slow Properties** (Avoid These):

```css
/* ❌ BAD - Triggers layout */
width: 200px;
height: 100px;
margin-left: 50px;
```

**Interview Answer**: "I use transform and opacity for animations because they're GPU-accelerated and don't trigger layout recalculations."

## Performance Monitoring (Show You Know Tools)

### **Two Main Approaches**:

1. **Real User Monitoring (RUM)**: Track actual users
2. **Synthetic Testing**: Controlled lab tests

### **Essential Metrics to Know**:

- **FCP**: First content appears
- **LCP**: Main content loads (most important!)
- **FID**: Input responsiveness
- **CLS**: Layout stability
- **TTI**: Fully interactive

### **Tools You Should Mention**:

- **Chrome DevTools**: Built-in performance profiler
- **Lighthouse**: Automated audits
- **WebPageTest**: Detailed analysis
- **Google Analytics**: Real user data

**Interview Tip**: "I use Lighthouse for quick audits and Chrome DevTools for detailed debugging."

## Performance Budgets (Advanced Topic)

**What Are They?**: Limits you set to prevent performance regressions.

**Common Budget Types**:

- **Bundle Size**: "JavaScript < 200KB"
- **Load Time**: "Page loads < 3 seconds"
- **Image Size**: "Images < 500KB each"

**Implementation**:

```json
// webpack-bundle-analyzer example
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    }
  ]
}
```

**Interview Answer**: "Performance budgets help catch regressions early by setting automated limits in our build process."

## Interview Checklist - What to Mention

### **1. Loading Optimization**

- ✅ "I minimize bundle sizes with code splitting"
- ✅ "I use lazy loading for images and components"
- ✅ "I inline critical CSS for faster rendering"

### **2. Runtime Performance**

- ✅ "I use transform/opacity for smooth animations"
- ✅ "I avoid layout-triggering CSS properties"
- ✅ "I debounce expensive operations"

### **3. Monitoring & Tools**

- ✅ "I use Lighthouse for performance audits"
- ✅ "I track Core Web Vitals in production"
- ✅ "I set performance budgets in CI/CD"

### **4. Modern Techniques**

- ✅ "I use service workers for caching"
- ✅ "I implement resource hints (preload, prefetch)"
- ✅ "I optimize images with modern formats (WebP, AVIF)"

### **5. Network Optimization**

- ✅ "I use CDNs for static assets"
- ✅ "I implement proper HTTP caching headers"
- ✅ "I minimize HTTP requests"

**Pro Tip**: Always give specific examples from your experience!

## Common Interview Questions & Answers

### **Q: "How do you optimize a slow website?"**

**A**: "First, I audit with Lighthouse to identify bottlenecks. Then I focus on the biggest wins: reducing bundle size, optimizing images, and eliminating render-blocking resources."

### **Q: "What's the difference between FCP and LCP?"**

**A**: "FCP is when any content appears, LCP is when the largest content element loads. LCP is more important for user experience."

### **Q: "How do you handle large JavaScript bundles?"**

**A**: "Code splitting, tree shaking, and lazy loading. I load only what's needed initially and defer the rest."

### **Q: "What causes layout thrashing?"**

**A**: "Repeatedly changing CSS properties that trigger layout recalculation, like width, height, or margin. I use transform instead."

### **Q: "How do you measure performance in production?"**

**A**: "I use Real User Monitoring to track Core Web Vitals, plus synthetic testing with tools like Lighthouse CI for regression detection."

---

## Quick Reference Tools

- **Chrome DevTools**: Performance tab for profiling
- **Lighthouse**: Built into Chrome, automated audits
- **WebPageTest**: Detailed waterfall analysis
- **Bundle Analyzer**: Visualize JavaScript bundle sizes
