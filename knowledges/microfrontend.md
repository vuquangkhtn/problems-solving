# Micro-Frontends with Webpack Entry Points + LitElement

## Core Architecture

**Key Concept**: Multiple independent applications sharing a single codebase through Webpack's multi-entry configuration.

### Core Concepts
- **Bundle Separation**: Each micro-frontend gets its own entry point and bundle
- **Web Components**: LitElement creates framework-agnostic, encapsulated components
- **Independent Deployment**: Teams can deploy micro-frontends separately
- **Shared Dependencies**: Common libraries optimized through Webpack's splitting
- **Runtime Isolation**: Each micro-frontend runs in its own execution context
- **Event-Driven Communication**: Loose coupling through custom events and event bus
- **CSS Encapsulation**: Shadow DOM prevents style conflicts between micro-frontends
- **Lazy Loading**: Micro-frontends load on-demand to optimize initial page load
- **Version Independence**: Different micro-frontends can use different library versions
- **Team Autonomy**: Independent development, testing, and deployment cycles

### Webpack Multi-Entry Deep Dive

**Entry Point Strategy**: Each micro-frontend has its own entry point, creating separate dependency graphs and bundles.

```javascript
// Advanced multi-entry configuration
module.exports = {
  entry: {
    // Main application shell
    shell: './src/shell/index.js',
    // Individual micro-frontends
    header: './src/apps/header/index.js',
    dashboard: './src/apps/dashboard/index.js',
    profile: './src/apps/profile/index.js'
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Shared vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true
        },
        // Common utilities across micro-frontends
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

**Key Benefits**:
- **Parallel Development**: Teams work on separate entry points without conflicts
- **Selective Loading**: Load only required micro-frontends per page
- **Cache Optimization**: Shared chunks cached across micro-frontends
- **Build Independence**: Each entry can have different build configurations

### LitElement Deep Dive

**Framework-Agnostic Architecture**: LitElement creates standard web components that work with any framework or vanilla JavaScript.

```javascript
// Advanced LitElement micro-frontend base
import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class BaseMicroFrontend extends LitElement {
  // CSS encapsulation through Shadow DOM
  static styles = css`
    :host {
      display: block;
      isolation: isolate;
      contain: layout style paint;
    }
  `;

  @property({ type: String }) appName = '';
  @state() private _isLoaded = false;

  // Lifecycle management
  connectedCallback() {
    super.connectedCallback();
    this._initializeMicroFrontend();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupMicroFrontend();
  }

  // Inter-micro-frontend communication
  emitGlobalEvent(eventName, data) {
    window.dispatchEvent(new CustomEvent(`mf:${eventName}`, {
      detail: { source: this.appName, data }
    }));
  }

  // State synchronization
  syncWithGlobalState(statePath, value) {
    window.microFrontendBus?.publish('state:update', {
      path: statePath,
      value,
      source: this.appName
    });
  }

  private _initializeMicroFrontend() {
    // Register with global micro-frontend registry
    window.microFrontendRegistry?.register(this.appName, this);
    this._isLoaded = true;
  }

  private _cleanupMicroFrontend() {
    // Cleanup global references
    window.microFrontendRegistry?.unregister(this.appName);
  }
}
```

**Key LitElement Features for Micro-Frontends**:
- **Shadow DOM Encapsulation**: Prevents CSS and DOM conflicts
- **Reactive Properties**: Automatic re-rendering on state changes
- **Lifecycle Hooks**: Proper initialization and cleanup
- **Small Bundle Size**: ~5KB gzipped, minimal runtime overhead
- **Standards-Based**: Uses native web component APIs
- **TypeScript Support**: Full type safety and IntelliSense
- **Server-Side Rendering**: Compatible with SSR solutions

```javascript
// webpack.config.js - Multi-entry setup
module.exports = {
  entry: {
    header: './src/apps/header/index.js',
    dashboard: './src/apps/dashboard/index.js',
    profile: './src/apps/profile/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## LitElement Base Component

```javascript
// Base micro-frontend class
import { LitElement, html, css } from 'lit';

export class BaseMicroFrontend extends LitElement {
  static styles = css`
    :host {
      display: block;
      isolation: isolate; /* CSS isolation */
    }
  `;

  // Event-driven communication
  emitToParent(eventName, data) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      composed: true
    }));
  }
}
```

## Inter-App Communication

```javascript
// Event Bus Pattern
class MicroFrontendBus {
  constructor() {
    this.events = new Map();
  }

  subscribe(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }

  publish(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => callback(data));
    }
  }
}

// Global instance
window.microFrontendBus = new MicroFrontendBus();
```

## Deployment Strategy

```javascript
// Build configuration for independent deployment
const config = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

## Performance Optimization

```javascript
// Lazy loading micro-frontends
const loadMicroFrontend = async (appName) => {
  const module = await import(`./apps/${appName}/index.js`);
  return module.default;
};

// Usage
document.addEventListener('DOMContentLoaded', async () => {
  if (document.querySelector('#dashboard-container')) {
    await loadMicroFrontend('dashboard');
  }
});
```

## Interview Gold Points

### Architecture Benefits
- **Independent Development**: Teams can work autonomously
- **Technology Flexibility**: Each micro-frontend can use different tech stacks
- **Deployment Independence**: Deploy individual apps without affecting others
- **Scalability**: Add new features as separate micro-frontends

### Technical Challenges & Solutions
- **Bundle Size**: Use shared chunks for common dependencies
- **CSS Isolation**: LitElement's Shadow DOM provides natural encapsulation
- **State Management**: Event-driven architecture with custom events
- **Testing**: Each micro-frontend can be tested independently

### Key Talking Points
1. **Why Webpack Entry Points?** Simple, no additional runtime overhead
2. **Why LitElement?** Framework-agnostic, small footprint, native web components
3. **Communication Strategy**: Event bus pattern for loose coupling
4. **Performance**: Lazy loading and shared vendor chunks
5. **Deployment**: Independent CI/CD pipelines per micro-frontend

### Quick Technical Summary
- **Architecture**: Multi-entry Webpack + LitElement web components
- **Communication**: Custom events + event bus pattern
- **Isolation**: Shadow DOM + CSS scoping
- **Performance**: Code splitting + lazy loading
- **Deployment**: Independent builds with shared dependencies