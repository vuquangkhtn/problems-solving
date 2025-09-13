# Authentication vs Authorization

## Overview

Authentication and Authorization are two fundamental security concepts that are often confused but serve distinct purposes in application security:

- **Authentication** (AuthN): "Who are you?" - The process of verifying the identity of a user or system
- **Authorization** (AuthZ): "What can you do?" - The process of determining what actions or resources an authenticated user is allowed to access

## Key Differences

| Aspect | Authentication | Authorization |
|--------|----------------|---------------|
| **Purpose** | Verify identity | Control access |
| **Question** | Who are you? | What can you do? |
| **Process** | Login credentials, biometrics, tokens | Permissions, roles, policies |
| **Timing** | Happens first | Happens after authentication |
| **Example** | Username/password login | Admin can delete users, regular users can only view |

## Real-World Analogy

Think of entering a secure building:
- **Authentication**: Showing your ID card to prove who you are
- **Authorization**: The security system checking if your ID grants access to specific floors or rooms

## Common Authentication Methods

### 1. Password-Based Authentication
- Username and password combinations
- Most common but vulnerable to attacks
- Should be combined with other factors

### 2. Multi-Factor Authentication (MFA)
- Something you know (password)
- Something you have (phone, token)
- Something you are (biometrics)

### 3. Token-Based Authentication
- JWT (JSON Web Tokens)
- OAuth tokens
- API keys

### 4. Certificate-Based Authentication
- Digital certificates
- Public/private key pairs
- Common in enterprise environments

## Common Authorization Models

### 1. Role-Based Access Control (RBAC)
- Users assigned to roles
- Roles have specific permissions
- Example: Admin, Editor, Viewer roles

### 2. Attribute-Based Access Control (ABAC)
- Access based on attributes (user, resource, environment)
- More flexible than RBAC
- Example: Allow access only during business hours

### 3. Access Control Lists (ACL)
- Direct assignment of permissions to users
- Simple but can become complex to manage

### 4. Policy-Based Access Control
- Rules-based access decisions
- Often used in enterprise environments

## Security Best Practices

### Authentication Security
- Use strong password policies
- Implement account lockout mechanisms
- Enable multi-factor authentication
- Use secure password storage (hashing + salting)
- Implement session timeouts

### Authorization Security
- Follow principle of least privilege
- Implement proper role hierarchies
- Regular access reviews and audits
- Use centralized authorization services
- Implement proper error handling (don't leak information)

## Common Vulnerabilities

### Authentication Vulnerabilities
- Weak passwords
- Brute force attacks
- Session hijacking
- Credential stuffing
- Insecure password recovery

### Authorization Vulnerabilities
- Privilege escalation
- Insecure direct object references
- Missing function-level access control
- Confused deputy attacks
- Race conditions in access checks

---

## Detailed Topics

- [ ] **Authentication vs Authorization** ✅
  - [ ] Master JWT structure and validation
  - [ ] Understand OAuth 2.0 flow
  - [ ] Learn session management best practices
  - [ ] Learn Authorization for micro-frontends architecture

*Continue reading the sections below for detailed implementation guides and best practices.*

## JWT (JSON Web Tokens) Structure and Validation

### What is JWT?

JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It's commonly used for authentication and information exchange in web applications.

### JWT Structure

A JWT consists of three parts separated by dots (.):

```
header.payload.signature
```

#### 1. Header
Contains metadata about the token:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg`: Algorithm used for signing (HS256, RS256, etc.)
- `typ`: Token type (always "JWT")

#### 2. Payload
Contains the claims (statements about an entity):

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "role": "admin"
}
```

**Standard Claims:**
- `iss` (issuer): Who issued the token
- `sub` (subject): Who the token is about
- `aud` (audience): Who the token is intended for
- `exp` (expiration): When the token expires
- `iat` (issued at): When the token was issued
- `nbf` (not before): When the token becomes valid

#### 3. Signature
Used to verify the token hasn't been tampered with:

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

### JWT Validation Process

#### 1. Structure Validation
```javascript
function validateJWTStructure(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT structure');
  }
  return parts;
}
```

#### 2. Signature Verification
```javascript
const jwt = require('jsonwebtoken');

function verifyJWT(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
}
```

#### 3. Claims Validation
```javascript
function validateClaims(payload) {
  const now = Math.floor(Date.now() / 1000);
  
  // Check expiration
  if (payload.exp && payload.exp < now) {
    throw new Error('Token has expired');
  }
  
  // Check not before
  if (payload.nbf && payload.nbf > now) {
    throw new Error('Token not yet valid');
  }
  
  // Check audience
  if (payload.aud && !validateAudience(payload.aud)) {
    throw new Error('Invalid audience');
  }
  
  return true;
}
```

### Complete JWT Validation Example

```javascript
class JWTValidator {
  constructor(secret, options = {}) {
    this.secret = secret;
    this.options = {
      issuer: options.issuer,
      audience: options.audience,
      clockTolerance: options.clockTolerance || 0
    };
  }
  
  validate(token) {
    try {
      // 1. Verify signature and decode
      const decoded = jwt.verify(token, this.secret, {
        issuer: this.options.issuer,
        audience: this.options.audience,
        clockTolerance: this.options.clockTolerance
      });
      
      // 2. Additional custom validations
      this.validateCustomClaims(decoded);
      
      return {
        valid: true,
        payload: decoded
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
  
  validateCustomClaims(payload) {
    // Custom business logic validations
    if (payload.role && !['admin', 'user', 'guest'].includes(payload.role)) {
      throw new Error('Invalid role');
    }
    
    if (payload.permissions && !Array.isArray(payload.permissions)) {
      throw new Error('Permissions must be an array');
    }
  }
}

// Usage
const validator = new JWTValidator('your-secret-key', {
  issuer: 'your-app',
  audience: 'your-api'
});

const result = validator.validate(token);
if (result.valid) {
  console.log('User:', result.payload.sub);
  console.log('Role:', result.payload.role);
} else {
  console.error('Validation failed:', result.error);
}
```

### JWT Security Best Practices

#### 1. Use Strong Secrets
```javascript
// Bad - weak secret
const secret = 'secret';

// Good - strong random secret
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
```

#### 2. Set Appropriate Expiration
```javascript
// Short-lived access tokens
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });

// Longer-lived refresh tokens
const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' });
```

#### 3. Use Asymmetric Algorithms for Distributed Systems
```javascript
// Generate key pair
const { generateKeyPairSync } = require('crypto');
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Sign with private key
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Verify with public key
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

#### 4. Implement Token Blacklisting
```javascript
class TokenBlacklist {
  constructor() {
    this.blacklistedTokens = new Set();
  }
  
  blacklist(tokenId, expirationTime) {
    this.blacklistedTokens.add(tokenId);
    // Remove from blacklist after expiration
    setTimeout(() => {
      this.blacklistedTokens.delete(tokenId);
    }, expirationTime * 1000);
  }
  
  isBlacklisted(tokenId) {
    return this.blacklistedTokens.has(tokenId);
  }
}

// Usage in validation
function validateToken(token, blacklist) {
  const decoded = jwt.verify(token, secret);
  
  if (blacklist.isBlacklisted(decoded.jti)) {
    throw new Error('Token has been revoked');
  }
  
  return decoded;
}
```

### Common JWT Vulnerabilities

#### 1. Algorithm Confusion Attack
```javascript
// Vulnerable - accepts any algorithm
const decoded = jwt.verify(token, secret);

// Secure - specify allowed algorithms
const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
```

#### 2. None Algorithm Attack
```javascript
// Always specify algorithms to prevent 'none' algorithm
const decoded = jwt.verify(token, secret, { 
  algorithms: ['HS256', 'RS256'] // Never include 'none'
});
```

#### 3. Weak Secret Attack
```javascript
// Use environment variables for secrets
const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
  throw new Error('JWT secret must be at least 32 characters');
}
```

### JWT vs Session Tokens

| Aspect | JWT | Session Tokens |
|--------|-----|----------------|
| **Storage** | Client-side | Server-side |
| **Scalability** | Stateless, highly scalable | Requires shared storage |
| **Security** | Vulnerable if compromised | Can be revoked immediately |
| **Size** | Larger (contains data) | Smaller (just identifier) |
| **Expiration** | Built-in | Server-controlled |
| **Revocation** | Difficult | Easy |

### When to Use JWT

**Good Use Cases:**
- Microservices architecture
- Single Sign-On (SSO)
- API authentication
- Stateless applications
- Cross-domain authentication

**Avoid JWT When:**
- Need immediate token revocation
- Storing sensitive data
- Session management for web apps
- High-security requirements

## Session Management Best Practices

### What is Session Management?

Session management is the process of securely handling user sessions from creation to destruction. Unlike stateless JWT tokens, sessions maintain state on the server side, providing better security control and immediate revocation capabilities.

### Session Lifecycle

#### 1. Session Creation
```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 // lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: 'strict' // CSRF protection
  }
}));
```

#### 2. Session Validation Middleware
```javascript
function validateSession(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'No valid session' });
  }
  
  // Check session expiration
  if (req.session.expiresAt && new Date() > req.session.expiresAt) {
    req.session.destroy();
    return res.status(401).json({ error: 'Session expired' });
  }
  
  // Update last activity
  req.session.lastActivity = new Date();
  next();
}
```

#### 3. Session Renewal
```javascript
function renewSession(req, res, next) {
  const now = new Date();
  const sessionAge = now - new Date(req.session.createdAt);
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  // Renew session if it's more than half expired
  if (sessionAge > maxAge / 2) {
    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      }
      
      // Restore session data
      req.session.userId = req.user.id;
      req.session.role = req.user.role;
      req.session.createdAt = now;
      req.session.save(next);
    });
  } else {
    next();
  }
}
```

#### 4. Session Destruction
```javascript
// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    
    res.clearCookie('connect.sid'); // Clear session cookie
    res.json({ message: 'Logged out successfully' });
  });
});

// Cleanup expired sessions (run periodically)
function cleanupExpiredSessions() {
  const expiredTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  // For MongoDB store
  db.collection('sessions').deleteMany({
    expires: { $lt: expiredTime }
  });
}
```

### Session Storage Options

#### 1. Memory Store (Development Only)
```javascript
// Default memory store - DO NOT use in production
app.use(session({
  secret: 'dev-secret',
  resave: false,
  saveUninitialized: false
  // No store specified = MemoryStore
}));
```

#### 2. Redis Store (Recommended for Production)
```javascript
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));
```

#### 3. Database Store
```javascript
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
```

### Session Security Best Practices

#### 1. Secure Cookie Configuration
```javascript
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  name: 'sessionId', // Don't use default name
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only
    httpOnly: true, // Prevent JavaScript access
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
    sameSite: 'strict' // CSRF protection
  }
};
```

#### 2. Session Fixation Prevention
```javascript
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await authenticateUser(username, password);
    
    // Regenerate session ID to prevent fixation
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session error' });
      }
      
      // Set session data
      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.loginTime = new Date();
      
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: 'Session save error' });
        }
        res.json({ message: 'Login successful' });
      });
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

#### 3. CSRF Protection
```javascript
const csrf = require('csurf');

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

app.use(csrfProtection);

// Provide CSRF token to client
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

#### 4. Concurrent Session Management
```javascript
class SessionManager {
  constructor() {
    this.userSessions = new Map(); // userId -> Set of sessionIds
    this.maxSessionsPerUser = 3;
  }
  
  addSession(userId, sessionId) {
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, new Set());
    }
    
    const sessions = this.userSessions.get(userId);
    
    // Remove oldest session if limit exceeded
    if (sessions.size >= this.maxSessionsPerUser) {
      const oldestSession = sessions.values().next().value;
      this.removeSession(userId, oldestSession);
    }
    
    sessions.add(sessionId);
  }
  
  removeSession(userId, sessionId) {
    const sessions = this.userSessions.get(userId);
    if (sessions) {
      sessions.delete(sessionId);
      if (sessions.size === 0) {
        this.userSessions.delete(userId);
      }
    }
  }
  
  invalidateAllUserSessions(userId) {
    const sessions = this.userSessions.get(userId);
    if (sessions) {
      sessions.forEach(sessionId => {
        // Destroy session in store
        sessionStore.destroy(sessionId);
      });
      this.userSessions.delete(userId);
    }
  }
}
```

### Session vs JWT Comparison

| Feature | Sessions | JWT |
|---------|----------|-----|
| **Storage** | Server-side | Client-side |
| **Scalability** | Requires shared storage | Stateless |
| **Security** | Can be revoked immediately | Difficult to revoke |
| **Performance** | Database lookup required | No server lookup |
| **Size** | Small cookie (session ID) | Large token |
| **Expiration** | Server-controlled | Built-in |
| **CSRF Protection** | Built-in with proper config | Requires additional measures |
| **Memory Usage** | Server memory/storage | Client storage |

### Advanced Session Patterns

#### 1. Rolling Sessions
```javascript
function rollingSession(req, res, next) {
  const now = Date.now();
  const lastActivity = req.session.lastActivity || now;
  const timeSinceActivity = now - lastActivity;
  
  // Extend session if user is active
  if (timeSinceActivity < 30 * 60 * 1000) { // 30 minutes
    req.session.cookie.maxAge = 2 * 60 * 60 * 1000; // Reset to 2 hours
    req.session.lastActivity = now;
  }
  
  next();
}
```

#### 2. Session Data Encryption
```javascript
const crypto = require('crypto');

class EncryptedSessionStore {
  constructor(store, encryptionKey) {
    this.store = store;
    this.key = encryptionKey;
  }
  
  encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', this.key);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }
  
  decrypt(encryptedData) {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipher('aes-256-cbc', this.key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }
  
  set(sid, session, callback) {
    const encryptedSession = this.encrypt(session);
    this.store.set(sid, encryptedSession, callback);
  }
  
  get(sid, callback) {
    this.store.get(sid, (err, encryptedSession) => {
      if (err || !encryptedSession) {
        return callback(err, null);
      }
      
      try {
        const session = this.decrypt(encryptedSession);
        callback(null, session);
      } catch (decryptError) {
        callback(decryptError, null);
      }
    });
  }
}
```

### Common Session Vulnerabilities

#### 1. Session Hijacking Prevention
```javascript
function sessionSecurityMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    // Check IP address (optional, can break with proxies)
    if (req.session.ipAddress && req.session.ipAddress !== req.ip) {
      req.session.destroy();
      return res.status(401).json({ error: 'Session security violation' });
    }
    
    // Check User-Agent (basic fingerprinting)
    if (req.session.userAgent && req.session.userAgent !== req.get('User-Agent')) {
      req.session.destroy();
      return res.status(401).json({ error: 'Session security violation' });
    }
    
    // Store security info on first request
    if (!req.session.ipAddress) {
      req.session.ipAddress = req.ip;
      req.session.userAgent = req.get('User-Agent');
    }
  }
  
  next();
}
```

#### 2. Session Timeout Implementation
```javascript
function sessionTimeoutMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    const now = Date.now();
    const lastActivity = req.session.lastActivity || now;
    const inactiveTime = now - lastActivity;
    
    // 30 minutes of inactivity
    if (inactiveTime > 30 * 60 * 1000) {
      req.session.destroy((err) => {
        if (err) console.error('Session destruction error:', err);
      });
      return res.status(401).json({ 
        error: 'Session expired due to inactivity',
        code: 'SESSION_TIMEOUT'
      });
    }
    
    // Update last activity
    req.session.lastActivity = now;
  }
  
  next();
}
```

### Session Management Best Practices Summary

1. **Use HTTPS**: Always use secure cookies in production
2. **Regenerate Session IDs**: Prevent session fixation attacks
3. **Set Appropriate Timeouts**: Balance security and user experience
4. **Use Secure Storage**: Redis or database, never memory in production
5. **Implement CSRF Protection**: Use tokens and SameSite cookies
6. **Monitor Sessions**: Track concurrent sessions and suspicious activity
7. **Encrypt Sensitive Data**: Encrypt session data if storing sensitive information
8. **Regular Cleanup**: Remove expired sessions to prevent storage bloat
9. **Implement Proper Logout**: Destroy sessions completely on logout
10. **Use Rolling Sessions**: Extend active user sessions automatically

## Authorization Patterns for Micro-frontends Architecture

### What are Micro-frontends?

Micro-frontends extend the microservices concept to frontend development, where a single application is composed of multiple independent frontend applications. Each micro-frontend can be developed, deployed, and maintained by different teams.

### Authorization Challenges in Micro-frontends

1. **Distributed Authorization**: Multiple frontends need consistent authorization decisions
2. **Token Sharing**: Secure sharing of authentication tokens across micro-frontends
3. **Cross-Origin Communication**: Secure communication between different domains
4. **Consistent User Experience**: Unified login/logout across all micro-frontends
5. **Permission Synchronization**: Real-time permission updates across applications

### Authorization Patterns

#### 1. Centralized Authorization with Shell Application

**Pattern**: A shell application handles authentication and shares authorization context with child micro-frontends.

```javascript
// Shell Application - Main Container
class ShellAuthManager {
  constructor() {
    this.authState = {
      user: null,
      permissions: [],
      token: null,
      isAuthenticated: false
    };
    this.subscribers = new Set();
  }
  
  async login(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const { user, token, permissions } = await response.json();
      
      this.authState = {
        user,
        permissions,
        token,
        isAuthenticated: true
      };
      
      // Store token securely
      this.storeToken(token);
      
      // Notify all micro-frontends
      this.notifySubscribers('AUTH_SUCCESS', this.authState);
      
      return this.authState;
    } catch (error) {
      this.notifySubscribers('AUTH_ERROR', error);
      throw error;
    }
  }
  
  logout() {
    this.authState = {
      user: null,
      permissions: [],
      token: null,
      isAuthenticated: false
    };
    
    this.clearToken();
    this.notifySubscribers('AUTH_LOGOUT', this.authState);
  }
  
  subscribe(callback) {
    this.subscribers.add(callback);
    
    // Return unsubscribe function
    return () => this.subscribers.delete(callback);
  }
  
  notifySubscribers(event, data) {
    this.subscribers.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Subscriber error:', error);
      }
    });
  }
  
  storeToken(token) {
    // Use secure storage
    sessionStorage.setItem('auth_token', token);
    
    // Also broadcast to other tabs/windows
    localStorage.setItem('auth_event', JSON.stringify({
      type: 'TOKEN_UPDATE',
      token,
      timestamp: Date.now()
    }));
  }
  
  clearToken() {
    sessionStorage.removeItem('auth_token');
    localStorage.setItem('auth_event', JSON.stringify({
      type: 'TOKEN_CLEAR',
      timestamp: Date.now()
    }));
  }
  
  hasPermission(permission) {
    return this.authState.permissions.includes(permission);
  }
  
  hasRole(role) {
    return this.authState.user?.roles?.includes(role) || false;
  }
}

// Initialize global auth manager
window.authManager = new ShellAuthManager();
```

#### 2. Micro-frontend Authorization Client

```javascript
// Micro-frontend Authorization Client
class MicrofrontendAuthClient {
  constructor(microfrontendId) {
    this.microfrontendId = microfrontendId;
    this.authState = null;
    this.eventHandlers = new Map();
    
    this.initializeAuth();
  }
  
  initializeAuth() {
    // Listen for auth events from shell
    if (window.authManager) {
      this.unsubscribe = window.authManager.subscribe(
        (event, data) => this.handleAuthEvent(event, data)
      );
      
      // Get current auth state
      this.authState = window.authManager.authState;
    } else {
      // Fallback: listen for postMessage events
      window.addEventListener('message', this.handlePostMessage.bind(this));
      
      // Request current auth state
      this.requestAuthState();
    }
    
    // Listen for storage events (cross-tab sync)
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }
  
  handleAuthEvent(event, data) {
    switch (event) {
      case 'AUTH_SUCCESS':
        this.authState = data;
        this.emit('authenticated', data);
        break;
      case 'AUTH_LOGOUT':
        this.authState = null;
        this.emit('logout');
        break;
      case 'AUTH_ERROR':
        this.emit('error', data);
        break;
    }
  }
  
  handlePostMessage(event) {
    // Verify origin for security
    if (!this.isValidOrigin(event.origin)) {
      return;
    }
    
    const { type, data } = event.data;
    
    switch (type) {
      case 'AUTH_STATE_UPDATE':
        this.authState = data;
        this.emit('stateUpdate', data);
        break;
      case 'AUTH_STATE_RESPONSE':
        this.authState = data;
        this.emit('initialized', data);
        break;
    }
  }
  
  handleStorageEvent(event) {
    if (event.key === 'auth_event') {
      const authEvent = JSON.parse(event.newValue);
      
      switch (authEvent.type) {
        case 'TOKEN_UPDATE':
          this.refreshAuthState();
          break;
        case 'TOKEN_CLEAR':
          this.authState = null;
          this.emit('logout');
          break;
      }
    }
  }
  
  requestAuthState() {
    // Request auth state from parent/shell
    window.parent.postMessage({
      type: 'AUTH_STATE_REQUEST',
      microfrontendId: this.microfrontendId
    }, '*');
  }
  
  async refreshAuthState() {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      this.authState = null;
      return;
    }
    
    try {
      const response = await fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const authData = await response.json();
        this.authState = authData;
        this.emit('stateUpdate', authData);
      } else {
        this.authState = null;
        this.emit('logout');
      }
    } catch (error) {
      console.error('Auth state refresh failed:', error);
    }
  }
  
  isAuthenticated() {
    return this.authState?.isAuthenticated || false;
  }
  
  hasPermission(permission) {
    return this.authState?.permissions?.includes(permission) || false;
  }
  
  hasRole(role) {
    return this.authState?.user?.roles?.includes(role) || false;
  }
  
  getToken() {
    return this.authState?.token || sessionStorage.getItem('auth_token');
  }
  
  getUser() {
    return this.authState?.user;
  }
  
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);
  }
  
  off(event, handler) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }
  
  emit(event, data) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Event handler error for ${event}:`, error);
        }
      });
    }
  }
  
  isValidOrigin(origin) {
    // Define allowed origins
    const allowedOrigins = [
      'https://main-app.example.com',
      'https://shell.example.com',
      'http://localhost:3000' // Development
    ];
    
    return allowedOrigins.includes(origin);
  }
  
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    window.removeEventListener('message', this.handlePostMessage);
    window.removeEventListener('storage', this.handleStorageEvent);
    this.eventHandlers.clear();
  }
}

// Usage in micro-frontend
const authClient = new MicrofrontendAuthClient('user-management-mf');

// Listen for auth events
authClient.on('authenticated', (authData) => {
  console.log('User authenticated:', authData.user);
  // Update UI, enable features, etc.
});

authClient.on('logout', () => {
  console.log('User logged out');
  // Redirect to login, clear local state, etc.
});
```

#### 3. Token-Based Authorization with API Gateway

```javascript
// API Gateway Authorization Middleware
class APIGatewayAuth {
  constructor() {
    this.permissionCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }
  
  async authorize(req, res, next) {
    try {
      const token = this.extractToken(req);
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      // Verify token
      const payload = await this.verifyToken(token);
      
      // Check permissions for the requested resource
      const hasPermission = await this.checkPermission(
        payload.userId,
        req.method,
        req.path
      );
      
      if (!hasPermission) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      // Add user context to request
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
  
  extractToken(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
  
  async verifyToken(token) {
    // Verify JWT token
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  
  async checkPermission(userId, method, path) {
    const cacheKey = `${userId}:${method}:${path}`;
    
    // Check cache first
    const cached = this.permissionCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.hasPermission;
    }
    
    // Fetch from permission service
    const hasPermission = await this.fetchPermission(userId, method, path);
    
    // Cache result
    this.permissionCache.set(cacheKey, {
      hasPermission,
      timestamp: Date.now()
    });
    
    return hasPermission;
  }
  
  async fetchPermission(userId, method, path) {
    try {
      const response = await fetch(`${process.env.PERMISSION_SERVICE_URL}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, method, path })
      });
      
      const result = await response.json();
      return result.hasPermission;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false; // Fail closed
    }
  }
}
```

#### 4. React Hook for Micro-frontend Authorization

```javascript
// React Hook for Authorization
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, microfrontendId }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    permissions: [],
    loading: true
  });
  
  const [authClient] = useState(() => 
    new MicrofrontendAuthClient(microfrontendId)
  );
  
  useEffect(() => {
    // Set up auth event listeners
    authClient.on('authenticated', (data) => {
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        permissions: data.permissions,
        loading: false
      });
    });
    
    authClient.on('logout', () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
        permissions: [],
        loading: false
      });
    });
    
    authClient.on('initialized', (data) => {
      setAuthState({
        isAuthenticated: data?.isAuthenticated || false,
        user: data?.user || null,
        permissions: data?.permissions || [],
        loading: false
      });
    });
    
    // Cleanup
    return () => authClient.destroy();
  }, [authClient]);
  
  const value = {
    ...authState,
    hasPermission: (permission) => authClient.hasPermission(permission),
    hasRole: (role) => authClient.hasRole(role),
    getToken: () => authClient.getToken()
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function usePermission(permission) {
  const { hasPermission, loading } = useAuth();
  return { hasPermission: hasPermission(permission), loading };
}

export function useRole(role) {
  const { hasRole, loading } = useAuth();
  return { hasRole: hasRole(role), loading };
}

// Protected Route Component
export function ProtectedRoute({ 
  children, 
  permission, 
  role, 
  fallback = <div>Access Denied</div> 
}) {
  const { isAuthenticated, loading } = useAuth();
  const { hasPermission } = usePermission(permission);
  const { hasRole } = useRole(role);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  if (permission && !hasPermission) {
    return fallback;
  }
  
  if (role && !hasRole) {
    return fallback;
  }
  
  return children;
}

// Usage Example
function UserManagementApp() {
  return (
    <AuthProvider microfrontendId="user-management">
      <div className="app">
        <ProtectedRoute permission="users.read">
          <UserList />
        </ProtectedRoute>
        
        <ProtectedRoute permission="users.write">
          <CreateUserButton />
        </ProtectedRoute>
        
        <ProtectedRoute role="admin">
          <AdminPanel />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}
```

### Security Considerations for Micro-frontends

#### 1. Cross-Origin Resource Sharing (CORS)

```javascript
// CORS Configuration for Micro-frontends
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://shell.example.com',
      'https://user-mf.example.com',
      'https://product-mf.example.com',
      'https://order-mf.example.com'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

#### 2. Content Security Policy (CSP)

```javascript
// CSP for Micro-frontends
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Only if absolutely necessary
    "https://shell.example.com",
    "https://user-mf.example.com",
    "https://product-mf.example.com"
  ],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "https:"],
  connectSrc: [
    "'self'",
    "https://api.example.com",
    "wss://notifications.example.com"
  ],
  frameSrc: [
    "https://user-mf.example.com",
    "https://product-mf.example.com"
  ],
  frameAncestors: ["'self'", "https://shell.example.com"]
};

app.use(helmet.contentSecurityPolicy({ directives: cspDirectives }));
```

#### 3. Token Validation Middleware

```javascript
// Micro-frontend Token Validation
class MicrofrontendTokenValidator {
  constructor(options = {}) {
    this.trustedIssuers = options.trustedIssuers || [];
    this.audience = options.audience;
    this.clockTolerance = options.clockTolerance || 60; // seconds
  }
  
  async validateToken(token) {
    try {
      // Decode without verification first
      const decoded = jwt.decode(token, { complete: true });
      
      if (!decoded) {
        throw new Error('Invalid token format');
      }
      
      // Check issuer
      if (!this.trustedIssuers.includes(decoded.payload.iss)) {
        throw new Error('Untrusted issuer');
      }
      
      // Get public key for verification
      const publicKey = await this.getPublicKey(decoded.payload.iss);
      
      // Verify token
      const verified = jwt.verify(token, publicKey, {
        audience: this.audience,
        issuer: this.trustedIssuers,
        clockTolerance: this.clockTolerance
      });
      
      return {
        valid: true,
        payload: verified
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
  
  async getPublicKey(issuer) {
    // Fetch public key from issuer's JWKS endpoint
    const jwksUrl = `${issuer}/.well-known/jwks.json`;
    const response = await fetch(jwksUrl);
    const jwks = await response.json();
    
    // Return appropriate key (simplified)
    return jwks.keys[0].x5c[0];
  }
}
```

### Best Practices for Micro-frontend Authorization

1. **Centralized Authentication**: Use a single authentication service
2. **Distributed Authorization**: Each micro-frontend handles its own authorization logic
3. **Token Sharing**: Use secure methods to share tokens between micro-frontends
4. **Permission Caching**: Cache permissions to reduce API calls
5. **Graceful Degradation**: Handle authorization failures gracefully
6. **Audit Logging**: Log all authorization decisions for security monitoring
7. **Regular Token Refresh**: Implement automatic token refresh mechanisms
8. **Cross-Tab Synchronization**: Sync authentication state across browser tabs
9. **Secure Communication**: Use HTTPS and validate origins for postMessage
10. **Principle of Least Privilege**: Grant minimal necessary permissions

### Common Pitfalls and Solutions

#### 1. Token Leakage
**Problem**: Tokens exposed in URLs or logs
**Solution**: Use POST requests and secure headers

#### 2. Inconsistent State
**Problem**: Auth state differs between micro-frontends
**Solution**: Implement event-driven state synchronization

#### 3. Performance Issues
**Problem**: Too many permission checks
**Solution**: Implement intelligent caching and batching

#### 4. Cross-Origin Issues
 **Problem**: Blocked requests between micro-frontends
 **Solution**: Proper CORS configuration and origin validation

## Common Interview Questions

### Basic Concepts

**Q1: What's the difference between authentication and authorization?**

**Answer**: Authentication is the process of verifying "who you are" (identity verification), while authorization determines "what you can do" (access control). Authentication happens first and establishes identity, then authorization uses that identity to grant or deny access to resources. For example, logging in with username/password is authentication, but checking if you can delete a file is authorization.

**Q2: Explain the structure of a JWT token.**

**Answer**: A JWT consists of three Base64-encoded parts separated by dots:
1. **Header**: Contains algorithm and token type (`{"alg": "HS256", "typ": "JWT"}`)
2. **Payload**: Contains claims about the user (`{"sub": "123", "name": "John", "exp": 1234567890}`)
3. **Signature**: Ensures token integrity using the algorithm specified in header

The final token looks like: `header.payload.signature`

**Q3: What are the main OAuth 2.0 grant types?**

**Answer**: 
- **Authorization Code**: Most secure, used by web applications with backend
- **Implicit**: For SPAs (deprecated in OAuth 2.1)
- **Client Credentials**: For machine-to-machine communication
- **Resource Owner Password**: Direct username/password exchange (discouraged)
- **Authorization Code with PKCE**: Enhanced security for mobile/SPA applications

### Security Questions

**Q4: How would you prevent session hijacking?**

**Answer**: 
- Use HTTPS to encrypt session cookies
- Set `HttpOnly` flag to prevent XSS access
- Use `Secure` flag for HTTPS-only cookies
- Implement `SameSite` attribute for CSRF protection
- Regenerate session IDs after login
- Validate session fingerprints (IP, User-Agent)
- Implement session timeouts
- Use secure session storage (Redis, database)

**Q5: What are common JWT vulnerabilities and how to prevent them?**

**Answer**:
- **Algorithm Confusion**: Always specify allowed algorithms in verification
- **None Algorithm Attack**: Never allow 'none' algorithm
- **Weak Secrets**: Use strong, random secrets (>256 bits)
- **Token Leakage**: Never expose tokens in URLs or logs
- **No Expiration**: Always set appropriate expiration times
- **Sensitive Data**: Don't store sensitive data in JWT payload

**Q6: How would you implement secure password storage?**

**Answer**:
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

// Hashing
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verification
const isValid = await bcrypt.compare(password, hashedPassword);
```
Key points: Use bcrypt/scrypt/Argon2, never store plain text, use salt, appropriate cost factor.

### Architecture Questions

**Q7: How would you design authentication for a microservices architecture?**

**Answer**:
- **Centralized Authentication Service**: Single service handles login/token issuance
- **API Gateway**: Validates tokens and forwards user context
- **Service-to-Service**: Use service accounts with JWT or mutual TLS
- **Token Propagation**: Forward user context through request headers
- **Caching**: Cache user permissions to reduce latency

**Q8: Explain the difference between stateful and stateless authentication.**

**Answer**:
- **Stateful (Sessions)**: Server stores session data, client holds session ID
  - Pros: Easy revocation, smaller cookies, server control
  - Cons: Requires shared storage, less scalable
- **Stateless (JWT)**: All data in token, no server storage
  - Pros: Highly scalable, no server storage needed
  - Cons: Difficult revocation, larger tokens, potential security risks

**Q9: How would you implement Single Sign-On (SSO)?**

**Answer**:
- Use protocols like SAML, OAuth 2.0, or OpenID Connect
- Central Identity Provider (IdP) handles authentication
- Service Providers (SP) trust the IdP
- Token-based approach with JWT for user context
- Implement proper logout (single logout)

### Implementation Questions

**Q10: How would you implement role-based access control (RBAC)?**

**Answer**:
```javascript
class RBACManager {
  constructor() {
    this.roles = new Map();
    this.userRoles = new Map();
  }
  
  defineRole(roleName, permissions) {
    this.roles.set(roleName, new Set(permissions));
  }
  
  assignRole(userId, roleName) {
    if (!this.userRoles.has(userId)) {
      this.userRoles.set(userId, new Set());
    }
    this.userRoles.get(userId).add(roleName);
  }
  
  hasPermission(userId, permission) {
    const userRoles = this.userRoles.get(userId) || new Set();
    for (const role of userRoles) {
      const permissions = this.roles.get(role) || new Set();
      if (permissions.has(permission)) {
        return true;
      }
    }
    return false;
  }
}
```

**Q11: How would you handle token refresh in a SPA?**

**Answer**:
```javascript
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.refreshPromise = null;
  }
  
  async getValidToken() {
    if (this.isTokenValid(this.accessToken)) {
      return this.accessToken;
    }
    
    // Prevent multiple refresh calls
    if (!this.refreshPromise) {
      this.refreshPromise = this.refreshAccessToken();
    }
    
    return await this.refreshPromise;
  }
  
  async refreshAccessToken() {
    try {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.refreshToken}` }
      });
      
      const { accessToken } = await response.json();
      this.accessToken = accessToken;
      return accessToken;
    } finally {
      this.refreshPromise = null;
    }
  }
}
```

**Q12: How would you implement API rate limiting with authentication?**

**Answer**:
```javascript
class RateLimiter {
  constructor() {
    this.userLimits = new Map();
    this.limits = {
      guest: { requests: 100, window: 3600000 }, // 1 hour
      user: { requests: 1000, window: 3600000 },
      premium: { requests: 10000, window: 3600000 }
    };
  }
  
  async checkLimit(userId, userType = 'guest') {
    const limit = this.limits[userType];
    const key = `${userId}:${Math.floor(Date.now() / limit.window)}`;
    
    const current = this.userLimits.get(key) || 0;
    if (current >= limit.requests) {
      throw new Error('Rate limit exceeded');
    }
    
    this.userLimits.set(key, current + 1);
    return true;
  }
}
```

### Advanced Questions

**Q13: How would you implement authorization in a micro-frontend architecture?**

**Answer**:
- **Shell Application**: Handles authentication and shares context
- **Event-Driven Communication**: Use postMessage or custom events
- **Token Sharing**: Secure token distribution across micro-frontends
- **Permission Caching**: Cache permissions to reduce API calls
- **Graceful Degradation**: Handle authorization failures gracefully

**Q14: Explain OAuth 2.0 PKCE and when to use it.**

**Answer**:
PKCE (Proof Key for Code Exchange) adds security to OAuth flows:
- Client generates random `code_verifier`
- Creates `code_challenge` using SHA256 hash
- Authorization server stores challenge
- Client proves ownership with verifier
- Prevents authorization code interception attacks
- Essential for mobile apps and SPAs

**Q15: How would you design a permission system that scales to millions of users?**

**Answer**:
- **Hierarchical Permissions**: Use tree structure for inheritance
- **Caching Strategy**: Multi-level caching (Redis, application cache)
- **Database Optimization**: Proper indexing, denormalization
- **Lazy Loading**: Load permissions on-demand
- **Permission Aggregation**: Pre-compute common permission sets
- **Horizontal Scaling**: Shard by user ID or tenant

### Troubleshooting Questions

**Q16: A user reports they're randomly logged out. How would you debug this?**

**Answer**:
1. Check session/token expiration settings
2. Verify session storage (Redis connectivity, memory limits)
3. Look for session fixation prevention triggering incorrectly
4. Check for concurrent session limits
5. Verify CORS and cookie settings
6. Review server logs for session destruction events
7. Check for load balancer session affinity issues

**Q17: API calls are failing with 401 errors intermittently. What could be wrong?**

**Answer**:
1. **Clock Skew**: JWT exp/iat claims affected by server time differences
2. **Token Refresh Race Conditions**: Multiple requests trying to refresh simultaneously
3. **Load Balancer Issues**: Session affinity problems
4. **Token Storage**: Tokens being cleared by browser/app
5. **Network Issues**: Requests failing during token validation
6. **Rate Limiting**: Authentication service being rate limited

### Best Practices Questions

**Q18: What are the security considerations for storing tokens in a browser?**

**Answer**:
- **localStorage**: Vulnerable to XSS, persists across sessions
- **sessionStorage**: Vulnerable to XSS, cleared on tab close
- **Cookies**: Can be HttpOnly (XSS protection), but vulnerable to CSRF
- **Memory**: Most secure but lost on refresh
- **Best Practice**: Use HttpOnly cookies for refresh tokens, memory for access tokens

**Q19: How would you implement logout in a distributed system?**

**Answer**:
- **Token Blacklisting**: Maintain blacklist of revoked tokens
- **Short Token Expiry**: Use short-lived access tokens
- **Refresh Token Revocation**: Invalidate refresh tokens immediately
- **Event Broadcasting**: Notify all services of logout events
- **Session Cleanup**: Clear all related session data
- **Client-Side**: Clear all stored tokens and redirect to login

**Q20: What metrics would you track for authentication and authorization?**

**Answer**:
- **Authentication**: Login success/failure rates, MFA adoption, password reset frequency
- **Authorization**: Permission check latency, access denied rates, privilege escalation attempts
- **Security**: Failed login attempts, suspicious activity patterns, token validation failures
- **Performance**: Authentication latency, session lookup times, cache hit rates
- **Business**: User engagement post-login, feature adoption by role, session duration

## OAuth 2.0 Flow

### What is OAuth 2.0?

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account.

### Key Concepts

- **Resource Owner**: The user who authorizes an application to access their account
- **Client**: The application that wants to access the user's account
- **Resource Server**: The server hosting the protected resources (API)
- **Authorization Server**: The server that authenticates the resource owner and issues access tokens

### OAuth 2.0 Grant Types

#### 1. Authorization Code Flow (Most Secure)

**Use Case**: Web applications with a backend server

**Flow Diagram:**
```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client    │    │  Authorization  │    │  Authorization  │    │   Resource      │
│ Application │    │     Server      │    │     Server      │    │    Server       │
└─────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
       │                     │                       │                       │
       │ 1. Authorization    │                       │                       │
       │    Request          │                       │                       │
       │────────────────────▶│                       │                       │
       │                     │                       │                       │
       │ 2. Authorization    │                       │                       │
       │    Grant            │                       │                       │
       │◀────────────────────│                       │                       │
       │                     │                       │                       │
       │ 3. Authorization    │                       │                       │
       │    Grant            │                       │                       │
       │─────────────────────┼──────────────────────▶│                       │
       │                     │                       │                       │
       │ 4. Access Token     │                       │                       │
       │◀────────────────────┼───────────────────────│                       │
       │                     │                       │                       │
       │ 5. Protected Resource Request                │                       │
       │─────────────────────┼───────────────────────┼──────────────────────▶│
       │                     │                       │                       │
       │ 6. Protected Resource                        │                       │
       │◀────────────────────┼───────────────────────┼───────────────────────│
```

**Implementation Example:**

```javascript
// Step 1: Redirect user to authorization server
function initiateOAuth() {
  const authUrl = new URL('https://auth-server.com/oauth/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', 'your-client-id');
  authUrl.searchParams.set('redirect_uri', 'https://your-app.com/callback');
  authUrl.searchParams.set('scope', 'read write');
  authUrl.searchParams.set('state', generateRandomState());
  
  window.location.href = authUrl.toString();
}

// Step 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state parameter
  if (!verifyState(state)) {
    return res.status(400).send('Invalid state parameter');
  }
  
  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://auth-server.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://your-app.com/callback'
      })
    });
    
    const tokens = await tokenResponse.json();
    
    // Store tokens securely
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;
    
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Token exchange failed');
  }
});
```

#### 2. Implicit Flow (Legacy, Not Recommended)

**Use Case**: Single-page applications (deprecated for security reasons)

```javascript
// Implicit flow (avoid in production)
function implicitFlow() {
  const authUrl = new URL('https://auth-server.com/oauth/authorize');
  authUrl.searchParams.set('response_type', 'token');
  authUrl.searchParams.set('client_id', 'your-client-id');
  authUrl.searchParams.set('redirect_uri', 'https://your-app.com/callback');
  authUrl.searchParams.set('scope', 'read');
  
  window.location.href = authUrl.toString();
}

// Handle token from URL fragment
function handleImplicitCallback() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    // Store token (insecure in localStorage)
    sessionStorage.setItem('access_token', accessToken);
  }
}
```

#### 3. Client Credentials Flow

**Use Case**: Server-to-server authentication

```javascript
class ClientCredentialsAuth {
  constructor(clientId, clientSecret, tokenUrl) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tokenUrl = tokenUrl;
    this.accessToken = null;
    this.tokenExpiry = null;
  }
  
  async getAccessToken() {
    // Check if current token is still valid
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }
    
    try {
      const response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'api:read api:write'
        })
      });
      
      const data = await response.json();
      
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      throw new Error('Failed to obtain access token');
    }
  }
  
  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getAccessToken();
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

// Usage
const auth = new ClientCredentialsAuth(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://auth-server.com/oauth/token'
);

const response = await auth.makeAuthenticatedRequest('https://api.example.com/data');
```

#### 4. Authorization Code with PKCE (Recommended for SPAs)

**Use Case**: Single-page applications and mobile apps

```javascript
class PKCEAuth {
  constructor(clientId, authUrl, tokenUrl, redirectUri) {
    this.clientId = clientId;
    this.authUrl = authUrl;
    this.tokenUrl = tokenUrl;
    this.redirectUri = redirectUri;
  }
  
  // Generate code verifier and challenge
  generatePKCE() {
    const codeVerifier = this.generateRandomString(128);
    const codeChallenge = this.base64URLEncode(
      this.sha256(codeVerifier)
    );
    
    return { codeVerifier, codeChallenge };
  }
  
  generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }
  
  sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest('SHA-256', data);
  }
  
  base64URLEncode(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
  
  // Initiate PKCE flow
  async initiateAuth() {
    const { codeVerifier, codeChallenge } = this.generatePKCE();
    const state = this.generateRandomString(32);
    
    // Store for later use
    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);
    
    const authUrl = new URL(this.authUrl);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', this.clientId);
    authUrl.searchParams.set('redirect_uri', this.redirectUri);
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');
    
    window.location.href = authUrl.toString();
  }
  
  // Handle callback
  async handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    // Verify state
    const storedState = sessionStorage.getItem('oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }
    
    const codeVerifier = sessionStorage.getItem('code_verifier');
    
    try {
      const response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.clientId,
          code: code,
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier
        })
      });
      
      const tokens = await response.json();
      
      // Clean up
      sessionStorage.removeItem('code_verifier');
      sessionStorage.removeItem('oauth_state');
      
      return tokens;
    } catch (error) {
      throw new Error('Token exchange failed');
    }
  }
}

// Usage
const pkceAuth = new PKCEAuth(
  'your-client-id',
  'https://auth-server.com/oauth/authorize',
  'https://auth-server.com/oauth/token',
  'https://your-app.com/callback'
);

// Initiate authentication
await pkceAuth.initiateAuth();

// In callback page
const tokens = await pkceAuth.handleCallback();
```

### Token Management

#### Access Token Usage
```javascript
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
  }
  
  setTokens(accessToken, refreshToken, expiresIn) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenExpiry = Date.now() + (expiresIn * 1000);
  }
  
  isTokenExpired() {
    return !this.tokenExpiry || Date.now() >= this.tokenExpiry;
  }
  
  async getValidToken() {
    if (!this.isTokenExpired()) {
      return this.accessToken;
    }
    
    if (this.refreshToken) {
      return await this.refreshAccessToken();
    }
    
    throw new Error('No valid token available');
  }
  
  async refreshAccessToken() {
    try {
      const response = await fetch('/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
          client_id: 'your-client-id'
        })
      });
      
      const data = await response.json();
      
      this.setTokens(
        data.access_token,
        data.refresh_token || this.refreshToken,
        data.expires_in
      );
      
      return this.accessToken;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }
  
  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getValidToken();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      // Token might be invalid, try refresh
      const newToken = await this.refreshAccessToken();
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        }
      });
    }
    
    return response;
  }
}
```

### OAuth 2.0 Security Best Practices

#### 1. Always Use HTTPS
```javascript
// Ensure all OAuth endpoints use HTTPS
const authUrl = 'https://auth-server.com/oauth/authorize'; // ✅ Secure
const authUrl = 'http://auth-server.com/oauth/authorize';  // ❌ Insecure
```

#### 2. Validate State Parameter
```javascript
function generateState() {
  return crypto.randomBytes(32).toString('hex');
}

function validateState(receivedState, storedState) {
  return receivedState === storedState;
}
```

#### 3. Use Short-Lived Access Tokens
```javascript
// Good: Short-lived access tokens
const tokenConfig = {
  access_token_lifetime: 900,  // 15 minutes
  refresh_token_lifetime: 604800  // 7 days
};
```

#### 4. Implement Proper Scope Validation
```javascript
function validateScopes(requestedScopes, allowedScopes) {
  return requestedScopes.every(scope => allowedScopes.includes(scope));
}

// Example middleware
function requireScope(requiredScope) {
  return (req, res, next) => {
    const tokenScopes = req.token.scope.split(' ');
    if (!tokenScopes.includes(requiredScope)) {
      return res.status(403).json({ error: 'Insufficient scope' });
    }
    next();
  };
}

// Usage
app.get('/api/admin', requireScope('admin'), (req, res) => {
  // Admin-only endpoint
});
```

### Common OAuth 2.0 Vulnerabilities

#### 1. Authorization Code Interception
```javascript
// Vulnerable: Using custom URL schemes
const redirectUri = 'myapp://callback';

// Secure: Use HTTPS with PKCE
const redirectUri = 'https://myapp.com/callback';
```

#### 2. CSRF Attacks
```javascript
// Always use and validate state parameter
function initiateOAuth() {
  const state = generateRandomState();
  sessionStorage.setItem('oauth_state', state);
  
  const authUrl = new URL(authServer);
  authUrl.searchParams.set('state', state);
  // ... other parameters
}
```

#### 3. Token Leakage
```javascript
// Bad: Storing tokens in localStorage
localStorage.setItem('access_token', token);

// Good: Using secure, httpOnly cookies
res.cookie('access_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 900000 // 15 minutes
});
```

### OAuth 2.1 Updates

OAuth 2.1 consolidates best practices:

- **PKCE required** for all public clients
- **Implicit flow removed** (use Authorization Code + PKCE)
- **Refresh token rotation** recommended
- **Redirect URI exact matching** required

```javascript
// OAuth 2.1 compliant implementation
class OAuth21Client {
  constructor(config) {
    this.config = {
      ...config,
      usePKCE: true,  // Always required
      exactRedirectMatch: true
    };
  }
  
  async refreshToken(refreshToken) {
    const response = await this.tokenRequest({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    
    // OAuth 2.1: Rotate refresh tokens
    if (response.refresh_token) {
      this.invalidateOldRefreshToken(refreshToken);
    }
    
    return response;
  }
}
```
