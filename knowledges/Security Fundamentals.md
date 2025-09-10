# Security Fundamentals

## Overview

- Introduction to security concepts
- Key principles of information security
- Common security threats and vulnerabilities

## OWASP Top 20

- Introduction to the OWASP Top 20
- Rankings and categories
- Common vulnerabilities and exploits

### A1: Injection

#### What is it?

Untrusted user input is interpreted by server and executed

#### What is the impact?

Data can be stolen, modified or deleted

#### How to prevent it?

- Reject untrusted input data
- Use latest framework and libraries
- Validate and Sanitize input data
- Typically found by penetration testers / security code review

#### Example

- Hackers inject malicious code into input fields to steal data or modify database.
- Hackers inject malicious code into URLs to redirect users to malicious sites.
- Hackers inject malicious code into headers to steal session cookies.

### A2: Broken Authentication and Session Management

#### What is it?

Weak authentication mechanisms allow attackers to compromise passwords, keys, or session tokens

#### What is the impact?

Attackers can assume other users' identities and access sensitive data or functionality

#### How to prevent it?

- Implement multi-factor authentication
- Use secure session management practices
- Enforce strong password policies and account lockout mechanisms

#### Example

- Attackers use brute force attacks on weak passwords to gain unauthorized access
- Session tokens are not properly invalidated after logout, allowing session hijacking
- Credentials are transmitted over unencrypted connections and intercepted

### A3: Cross-Site Scripting (XSS)

#### What is it?

Malicious scripts are injected into trusted websites and executed in users' browsers

**Types of XSS:**
- **Stored XSS**: Malicious script stored on server (e.g., in database)
  - Example: Comment section storing `<script>alert('XSS')</script>` in database
- **Reflected XSS**: Script reflected from user input in response
  - Example: Search page with URL `?q=<script>alert('XSS')</script>` reflected in results
- **DOM-based XSS**: Script executes via client-side DOM manipulation
  - Example: `document.getElementById('output').innerHTML = location.hash` with `#<script>alert('XSS')</script>`

#### What is the impact?

Attackers can steal session cookies, redirect users, or perform actions on behalf of victims

#### How to prevent it?

- Validate and sanitize all user input
- Use Content Security Policy (CSP) headers

**Content Security Policy (CSP):**
CSP headers help prevent XSS attacks by controlling resource loading policies.

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```
- Encode output data before rendering in HTML

#### Example

- Attackers inject JavaScript into comment fields that steals user cookies when viewed
- Malicious scripts in search results redirect users to phishing sites
- Stored XSS in user profiles executes when other users view the profile

### A4: Broken Access Control

#### What is it?

Restrictions on authenticated users are not properly enforced, allowing unauthorized access

#### What is the impact?

Users can access unauthorized functionality or data, leading to data breaches or privilege escalation

#### How to prevent it?

- Implement proper authorization checks at every access point
- Use principle of least privilege
- Regularly audit and test access controls

#### Example

- Users can access other users' accounts by modifying URL parameters
- Administrative functions are accessible to regular users through direct URL access
- API endpoints lack proper authorization checks allowing data access

### A5: Security Misconfiguration

#### What is it?

Insecure default configurations, incomplete setups, or misconfigured security settings

#### What is the impact?

Attackers can gain unauthorized access to systems, data, or application functionality

#### How to prevent it?

- Use secure configuration baselines and hardening guides
- Regularly review and update security configurations
- Implement automated configuration management and monitoring

#### Example

- Default passwords are left unchanged on database servers or admin accounts
- Unnecessary services and features are enabled, expanding the attack surface
- Error messages reveal sensitive system information to attackers

### A6: Sensitive Data Exposure

#### What is it?

Sensitive data is not properly protected through encryption, access controls, or secure transmission

#### What is the impact?

Confidential information like personal data, financial records, or credentials can be stolen

#### How to prevent it?

- Encrypt sensitive data both at rest and in transit
- Implement proper access controls and data classification
- Use secure protocols (HTTPS, TLS) for data transmission

**HTTPS/TLS Security:**
- TLS 1.2+ for secure data transmission
- Strong cipher suites and certificate validation
- HTTP Strict Transport Security (HSTS) headers
- Perfect Forward Secrecy (PFS) support

#### Example

- Credit card numbers are stored in plain text in databases
- Personal information is transmitted over unencrypted HTTP connections
- Backup files containing sensitive data are left unprotected on servers

### A7: Insufficient Attack Protection

#### What is it?

Applications lack proper detection, monitoring, and response mechanisms for attacks

#### What is the impact?

Attacks go undetected, allowing prolonged unauthorized access and data compromise

#### How to prevent it?

- Implement comprehensive logging and monitoring systems
- Deploy intrusion detection and prevention systems
- Establish incident response procedures and automated alerting

#### Example

- Brute force attacks continue undetected due to lack of failed login monitoring
- SQL injection attempts are not logged or blocked by security controls
- Suspicious user behavior patterns are not identified or investigated

### A8: Cross-Site Request Forgery (CSRF)

#### What is it?

Malicious websites trick users into performing unwanted actions on trusted sites where they're authenticated

#### What is the impact?

Attackers can perform unauthorized actions using the victim's credentials and session

#### How to prevent it?

- Use anti-CSRF tokens in forms and state-changing requests
- Implement SameSite cookie attributes
- Verify the origin and referrer headers for sensitive operations

**CSRF Protection Technologies:**
- Anti-CSRF tokens (synchronizer token pattern)
- SameSite cookie attributes (Strict/Lax/None)
- Double Submit Cookie pattern
- CORS (Cross-Origin Resource Sharing) policies

#### Example

- Malicious email links cause users to unknowingly transfer money from their bank accounts
- Hidden forms on compromised websites change user passwords or email addresses
- Social media posts are automatically created without user knowledge or consent

### A9: Using Components with Known Vulnerabilities

#### What is it?

Applications use libraries, frameworks, or components with known security vulnerabilities

#### What is the impact?

Attackers can exploit known vulnerabilities to compromise the entire application or system

#### How to prevent it?

- Regularly update and patch all components and dependencies
- Use vulnerability scanning tools to identify outdated components
- Monitor security advisories and maintain an inventory of components

#### Example

- Outdated web frameworks contain remote code execution vulnerabilities
- Third-party libraries with SQL injection flaws compromise database security
- Unpatched operating system components allow privilege escalation attacks

### A10: Underprotected APIs

#### What is it?

APIs lack proper authentication, authorization, or input validation mechanisms

#### What is the impact?

Sensitive data can be accessed, modified, or deleted through unsecured API endpoints

#### How to prevent it?

- Implement strong authentication and authorization for all API endpoints
- Use rate limiting and input validation
- Apply the principle of least privilege for API access

#### Example

- Public APIs expose sensitive user data without proper authentication
- API endpoints allow unlimited requests leading to denial of service attacks
- Administrative API functions are accessible without proper authorization checks

### A11: XML External Entities (XXE)

#### What is it?

XML processors parse external entity references, allowing attackers to access internal files or systems

#### What is the impact?

Attackers can read sensitive files, perform server-side request forgery, or cause denial of service

#### How to prevent it?

- Disable XML external entity processing in XML parsers
- Use less complex data formats like JSON when possible
- Implement input validation and sanitization for XML data

#### Example

- Malicious XML files read sensitive system files like /etc/passwd
- XXE attacks access internal network resources through SSRF
- Large external entity references cause denial of service through resource exhaustion

### A12: Insecure Deserialization

#### What is it?

Untrusted data is deserialized without proper validation, allowing object injection attacks

#### What is the impact?

Attackers can execute arbitrary code, perform privilege escalation, or manipulate application logic

#### How to prevent it?

- Avoid deserializing untrusted data when possible
- Implement integrity checks and encryption for serialized data
- Use safe serialization formats and restrict deserialization permissions

#### Example

- Malicious serialized objects execute system commands when deserialized
- Tampered session cookies containing serialized data compromise user accounts
- Crafted payloads in serialized data bypass authentication mechanisms

### A13: Insufficient Logging and Monitoring

#### What is it?

Applications lack adequate logging, monitoring, and alerting for security events

#### What is the impact?

Security breaches go undetected, allowing attackers prolonged access and preventing incident response

#### How to prevent it?

- Implement comprehensive logging for all security-relevant events
- Deploy real-time monitoring and alerting systems
- Establish incident response procedures and regular log analysis

#### Example

- Failed login attempts are not logged, hiding brute force attacks
- Successful privilege escalations go unnoticed due to lack of monitoring
- Data exfiltration activities are not detected or alerted upon

### A14: Cryptographic Failures

#### What is it?

Weak or improperly implemented cryptographic controls fail to protect sensitive data

#### What is the impact?

Sensitive data can be exposed, modified, or accessed by unauthorized parties

#### How to prevent it?

- Use strong, up-to-date cryptographic algorithms and protocols
- Implement proper key management and rotation practices
- Avoid custom cryptographic implementations and use proven libraries

#### Example

- Weak encryption algorithms like MD5 or DES are easily broken by attackers
- Hardcoded encryption keys in source code compromise all encrypted data
- Improper certificate validation allows man-in-the-middle attacks

### A15: Insecure Design

#### What is it?

Applications are designed without adequate security controls and threat modeling

#### What is the impact?

Fundamental security flaws cannot be fixed through implementation changes alone

#### How to prevent it?

- Conduct threat modeling during the design phase
- Implement security by design principles and secure development lifecycle
- Perform security architecture reviews and design validation

#### Example

- Password recovery systems allow account takeover through predictable tokens
- Business logic flaws enable users to bypass payment processes
- Insufficient rate limiting allows automated attacks on critical functions

### A16: Software and Data Integrity Failures

#### What is it?

Applications rely on software, plugins, or libraries from untrusted sources without integrity verification

#### What is the impact?

Malicious code can be executed, leading to system compromise or data manipulation

#### How to prevent it?

- Verify digital signatures and checksums for all software components
- Use trusted repositories and implement software composition analysis
- Implement CI/CD pipeline security and code signing practices

#### Example

- Compromised software updates install malware on user systems
- Malicious packages in public repositories are included in applications
- Unsigned or tampered libraries execute unauthorized code in production

### A17: Server-Side Request Forgery (SSRF)

#### What is it?

Applications fetch remote resources without validating user-supplied URLs, allowing internal system access

#### What is the impact?

Attackers can access internal services, read sensitive files, or perform actions on behalf of the server

#### How to prevent it?

- Validate and sanitize all user-supplied URLs and input
- Implement network segmentation and firewall rules
- Use allowlists for permitted domains and IP addresses

#### Example

- Malicious URLs cause servers to access internal admin panels or databases
- Attackers read cloud metadata services to steal credentials and configuration
- Internal network scanning is performed through vulnerable web applications

### A18: Defense in Depth

#### What is it?

Lack of multiple layered security controls leaves systems vulnerable when single defenses fail

#### What is the impact?

Single point of failure can lead to complete system compromise and data breach

#### How to prevent it?

- Implement multiple layers of security controls and redundancy
- Use network segmentation, access controls, and monitoring at different levels
- Apply security controls at application, network, and infrastructure layers

#### Example

- Perimeter firewall bypass leads to immediate internal network access
- Single authentication factor failure grants complete system access
- Lack of internal monitoring allows lateral movement after initial breach

### A19: STRIDE

#### What is it?

Failure to systematically identify and address security threats using the STRIDE methodology

#### What is the impact?

Critical security threats remain unidentified and unmitigated in system design

#### How to prevent it?

- Apply STRIDE threat modeling to identify Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege threats
- Conduct regular threat modeling sessions during development
- Implement specific controls for each identified threat category

#### Example

- Identity spoofing attacks succeed due to weak authentication mechanisms
- Data tampering goes undetected without integrity controls
- Users deny actions due to insufficient audit logging and non-repudiation controls

### A20: Secure Development Processes

#### What is it?

Development processes lack integrated security practices and secure coding standards

#### What is the impact?

Security vulnerabilities are introduced throughout the development lifecycle

#### How to prevent it?

- Implement secure development lifecycle (SDLC) with security gates
- Conduct regular security training for development teams
- Integrate security testing and code review into CI/CD pipelines

#### Example

- Developers introduce SQL injection due to lack of secure coding training
- Security vulnerabilities reach production without proper testing
- Code reviews miss security issues due to inadequate security knowledge

## FAQs

### How can you test whether you website uses the latest security protocols?

- Use tools like SSL Labs or Qualys SSL Server Test to check for supported protocols and cipher suites

### What are the common tools used for security testing?

- gruyere: A tool for testing web applications for security vulnerabilities

### What are insecure direct object references (IDOR)?

- IDOR occurs when an application exposes direct access to resources using user-supplied input
- Attackers can manipulate the input to access unauthorized resources

### How can you identify and fix vulnerabilities in your website?

- Use tools like gruyere to scan your website for common security vulnerabilities
- Review the scan results and fix any identified vulnerabilities via using SCA and SAST tools like SonarQube, Checkmarx, Snyk, etc.
