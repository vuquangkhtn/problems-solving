# Network & Security

[[toc]]

### CORS vs CSRF?

- **CORS:** A browser policy controlling whether frontend JavaScript may read responses from another origin; configured with response headers.
- **CSRF:** Tricks a browser into sending an authenticated request that the user did not intend.
- **Mitigate CORS issues:** Use explicit origin allowlists and restrict methods, headers, and credentials.
- **Mitigate CSRF:** Use `SameSite` cookies, anti-CSRF tokens, and server-side origin checks where appropriate.

### How should passwords be stored?

- Hash passwords with a slow, salted password-hashing function such as Argon2id or bcrypt; never encrypt or store plaintext passwords.
- Consider a server-side pepper stored separately from the database.
- Enforce rate limits, MFA where appropriate, and a safe password-reset flow.

### How to secure JWTs?

- Use short-lived access tokens and validate `iss`, `aud`, signature, algorithm, and expiration.
- Rotate signing keys and support key identification/rollover.
- Avoid storing sensitive tokens in `localStorage`; prefer an `HttpOnly`, `Secure`, appropriately configured `SameSite` cookie when suitable.

### Prevent XSS succinctly?

- Treat all external data as untrusted.
- Encode output for its context (HTML, attribute, JavaScript, CSS, or URL).
- Avoid dangerous sinks such as `innerHTML`; prefer safe DOM APIs and trusted templating.
- Use a restrictive Content Security Policy as defense in depth.

### Prevent SQL Injection succinctly?

Use parameterized queries/ORMs, avoid string concatenation, apply input validation and least privilege DB accounts.

### OAuth 2.0 vs OpenID Connect?

OAuth 2.0 handles authorization (access to resources); OIDC adds identity layer on top of OAuth 2.0 for authentication.

### What is HSTS?

Forces browsers to use HTTPS for the domain, preventing protocol downgrades and SSL stripping.

### What is clickjacking and how to prevent?

UI redress attacks via iframes; mitigate with `X-Frame-Options` or CSP `frame-ancestors`.

### Secure cookie flags?

`Secure`, `HttpOnly`, `SameSite` (Lax/Strict/None) to limit transport, JS access, and cross-site behavior.

### Why rate limiting?

Throttles abuse (brute force, scraping), protects availability, and reduces impact of automated attacks.

### Same-Origin Policy?

Browser security model restricting document/script interactions between different origins; foundation for CORS.

### Mitigate IDOR?

Enforce server-side authorization checks on resource access; never trust client-provided identifiers.

```
# Useful security headers
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
```

### What is Injection and how to prevent it?

Injection occurs when untrusted input is interpreted and executed by a server or database. Prevent with parameterized queries, strict input validation/sanitization, context-aware escaping, and least-privilege service accounts.

### What are Broken Authentication and Session Management risks and mitigations?

Weak auth/session handling enables credential theft and hijacking. Mitigate with MFA, strong password policies, account lockout, secure cookies (`Secure`, `HttpOnly`, `SameSite`), short-lived tokens, and rotation/invalidation on logout and privilege changes.

### What is Cross-Site Scripting (XSS) and how to prevent?

Malicious scripts execute in a user’s browser via untrusted input. Types include Stored, Reflected, and DOM-based. Prevent by validating input, encoding output by context, avoiding dangerous sinks (e.g., `innerHTML`), and enforcing CSP.

### What is Broken Access Control (including IDOR) and how to prevent?

Missing or weak authorization checks allow unauthorized resource access. Enforce server-side authz on every request, deny by default, apply object/row-level checks, and avoid trusting client-provided identifiers.

### What is Security Misconfiguration and how to prevent?

Insecure defaults, verbose errors, exposed admin endpoints, and open ports create easy footholds. Harden configs, remove default credentials, disable unused services, minimize error detail in production, and automate configuration management.

### What is Sensitive Data Exposure and how to prevent?

Data is not properly protected at rest or in transit. Enforce TLS 1.2+, strong ciphers, HSTS, and PFS; encrypt at rest; manage keys securely (rotation, KMS); restrict access and avoid logging secrets.

### What is CSRF and how to prevent?

Cross-site request forgery leverages a victim’s authenticated browser to perform unwanted actions. Use anti-CSRF tokens, `SameSite` cookies, verify `Origin`/`Referer`, adopt double-submit cookies, and require re-auth for critical operations.

### Why are components with known vulnerabilities risky and how to manage them?

Outdated libraries/frameworks have public CVEs that attackers exploit. Keep dependencies updated, use SCA tools (e.g., Snyk), monitor advisories, and patch promptly.

### What are Underprotected APIs and how to secure them?

APIs lacking authN/authZ, validation, or rate limiting enable abuse and data exposure. Require authentication and granular scopes, validate input, apply throttling and quotas, and use least privilege for service accounts.

### What are XML External Entities (XXE) and how to prevent?

XML parsers resolving external entities can access internal files/services. Disable external entity resolution, prefer JSON where possible, validate/sanitize XML, and restrict network/file access from parsers.

### What is Insecure Deserialization and how to prevent?

Deserializing untrusted data enables object injection and code execution. Avoid deserializing untrusted data, implement integrity checks, restrict to allowlisted types, and use safe formats.

### What is Insufficient Logging and Monitoring and how to improve it?

Missing telemetry obscures attacks and delays response. Log auth, access, admin actions, and errors with context; centralize logs; configure real-time alerting; maintain incident response runbooks.

### What are Cryptographic Failures and how to avoid them?

Weak algorithms, poor key handling, and bad randomness expose data. Use modern primitives (AES-GCM, Argon2, TLS 1.2+), proper key management (rotation, storage, access control), and avoid custom crypto in favor of vetted libraries.

### What is SSRF and how to prevent it?

Server-Side Request Forgery makes servers fetch attacker-controlled URLs accessing internal resources. Validate/allowlist outbound destinations, enforce egress filtering and network segmentation, and protect cloud metadata services.

### What is Defense in Depth?

Layered controls reduce reliance on any single mechanism. Combine app validation/authz, network segmentation, WAF, IDS/IPS, endpoint protection, backups, and monitoring.

### What is STRIDE and how is it used?

Threat modeling framework covering Spoofing, Tampering, Repudiation, Information Disclosure, DoS, and Elevation of Privilege. Use it during design to identify threats and drive mitigations.

### What are Secure Development Processes (SDLC) practices?

Integrate security across the lifecycle: security gates in CI/CD, code review with security focus, developer training, SAST/DAST, dependency scanning, and secret detection.

### How can you test whether your site uses the latest security protocols?

Use SSL Labs or Qualys SSL Server Test to check TLS versions, ciphers, certificate chain, HSTS, and general configuration hardening.

### What are common tools used for security testing?

OWASP ZAP, Burp Suite, Snyk, SonarQube, Checkmarx, and Google Gruyere for hands-on learning.

### What are insecure direct object references (IDOR)?

Direct resource access via user-supplied identifiers without proper authorization. Prevent by enforcing server-side authorization on object access and avoiding trust in client-provided IDs.

### How can you identify and fix vulnerabilities in your website?

Run SCA and SAST in CI, prioritize by CVSS/CVE impact, patch/update dependencies, add tests for regressions, and monitor for new advisories.
