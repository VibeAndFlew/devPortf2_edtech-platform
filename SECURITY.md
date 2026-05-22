# 🔒 EDUVERSE — Security Policy

> **Version:** 1.0.0 | **Last Updated:** 2025-05

---

## Table of Contents

- [Our Security Commitment](#our-security-commitment)
- [Supported Versions](#supported-versions)
- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [Security Measures](#security-measures)
- [Data Protection](#data-protection)
- [Authentication & Authorization](#authentication--authorization)
- [API Security](#api-security)
- [Infrastructure Security](#infrastructure-security)
- [Compliance](#compliance)
- [Security Checklist](#security-checklist)

---

## Our Security Commitment

EDUVERSE handles sensitive educational data including student records, grades, personal information, and assessment content. We take security seriously and follow industry best practices to protect our users' data.

### What We Protect

- **Student Data** — Names, emails, academic records, progress data
- **Assessment Data** — Quiz answers, assignments, grades, evaluations
- **Content** — Course materials, videos, documents, certificates
- **Authentication** — Passwords (hashed), session tokens, OAuth tokens
- **Payment Data** — Handled entirely by Stripe; we never store card details

---

## Supported Versions

| Version | Supported | Security Updates |
|---------|-----------|-----------------|
| 1.0.x | ✅ Yes | Critical & high CVEs patched within 48h |
| < 1.0 | ❌ No | Upgrade to latest version |

---

## Reporting a Vulnerability

We encourage responsible disclosure. **Do not** report security issues in public GitHub issues.

### Disclosure Process

1. **Email** security@eduverse.com with full details
2. **Encrypt** sensitive findings using our PGP key (available on our website)
3. **Response** within 24 hours acknowledging receipt
4. **Assessment** within 72 hours (severity, impact, affected versions)
5. **Patch** timeline communicated based on severity:
   - **Critical**: 24-48 hours
   - **High**: 3-5 days
   - **Medium**: 7-14 days
   - **Low**: Next release cycle

### What to Include

- Type of vulnerability (XSS, SQLi, RCE, etc.)
- Steps to reproduce (proof of concept preferred)
- Affected versions and components
- Your contact information (optional for anonymous disclosure)

### Our Promise

- We will respond within 24 hours
- We will keep you informed throughout the process
- We will credit you in security advisories (with your permission)
- We will **not** pursue legal action for good-faith research

---

## Security Measures

### Application Security

| Measure | Implementation | Verification |
|---------|---------------|--------------|
| **Input Validation** | Zod schemas on all API routes | Automated tests |
| **Output Encoding** | React's built-in XSS protection | Regular audits |
| **SQL Injection** | Prisma ORM (parameterized queries) | Automated scanning |
| **CSRF Protection** | Double-submit cookie pattern | Penetration testing |
| **CSP Headers** | Strict Content Security Policy | Browser enforcement |
| **HSTS** | Strict-Transport-Security preload | SSL Labs test |
| **Rate Limiting** | Upstash Redis sliding window | Load testing |
| **Dependency Scanning** | Dependabot + Renovate | Daily automated scans |

### Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline'
  https://*.vercel-analytics.com
  https://va.vercel-scripts.com;
style-src 'self' 'unsafe-inline'
  https://fonts.googleapis.com;
img-src 'self' blob: data:
  https://images.unsplash.com
  https://*.cloudinary.com
  https://*.supabase.co;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self'
  https://*.supabase.co
  https://vitals.vercel-insights.com;
frame-src 'self'
  https://*.youtube.com
  https://*.vimeo.com;
media-src 'self' blob: https://*.supabase.co;
object-src 'none';
base-uri 'self';
form-action 'self';
```

---

## Data Protection

### Classification

| Level | Examples | Protection Required |
|-------|----------|-------------------|
| **Public** | Course descriptions, tutor profiles | Standard checks |
| **Internal** | Course content, analytics | Authentication |
| **Confidential** | Student grades, assessment data | Encryption + RBAC |
| **Restricted** | PII, authentication secrets | Encryption + MFA + Audit |

### Encryption

| State | Algorithm | Implementation |
|-------|-----------|----------------|
| **In Transit** | TLS 1.3 | All traffic, no exceptions |
| **At Rest** | AES-256-GCM | Database encryption |
| **Secrets** | Environment variables | Vercel encrypted storage |
| **Passwords** | bcrypt (cost 12) | Never stored in plaintext |

### Data Retention

| Data Type | Retention Period | Deletion Process |
|-----------|-----------------|------------------|
| Active student records | Duration of enrollment + 1 year | Automated purge |
| Course content | Indefinite (content owner) | Manual request |
| Analytics (anonymized) | 3 years | Automated rollup |
| Session logs | 90 days | Automated rotation |
| Error logs | 30 days | Automated rotation |

---

## Authentication & Authorization

### Authentication Methods

| Method | Security Level | Implementation |
|--------|---------------|----------------|
| Email + Password | Standard | bcrypt hashed, rate-limited |
| OAuth (GitHub, Google, Microsoft) | High | PKCE flow, state validation |
| SSO/SAML | Enterprise | SAML 2.0, SCIM provisioning |
| MFA (TOTP) | High | Time-based one-time passwords |
| Magic Link | Medium | Expiring tokens (15min) |

### Authorization Model (RBAC)

```
┌─────────────────────────────────────────────────┐
│                 Authorization                     │
├────────────┬────────────┬──────────┬──────────────┤
│  Student   │ Instructor │  Admin   │ Super Admin  │
├────────────┼────────────┼──────────┼──────────────┤
│ View courses│ Create courses│ Manage users│ Full access │
│ Submit work │ Grade work  │ View analytics│ System config│
│ Chat       │ Host live   │ Manage content│ Audit logs   │
│ View certs │ Issue certs │ Config system│ Billing      │
└────────────┴────────────┴──────────┴──────────────┘
```

### Session Management

- **Token Type**: HTTP-only, Secure, SameSite=Strict cookies
- **Lifetime**: 7 days (rolling), 24 hours for sensitive actions
- **Rotation**: On privilege escalation, password change
- **Revocation**: Immediate on logout, password reset, admin action
- **Storage**: Server-side sessions in Redis with automatic expiry

---

## API Security

### API Authentication

- **Internal Routes**: Session cookie authentication
- **External API keys**: Bearer tokens with scoped permissions
- **Webhook signatures**: HMAC-SHA256 verification

### Rate Limiting

| Endpoint Type | Limit | Window | Scope |
|---------------|-------|--------|-------|
| Authentication | 5 requests | 15 minutes | Per IP |
| General API | 100 requests | 1 minute | Per user |
| File upload | 10 requests | 1 hour | Per user |
| AI tutor | 50 requests | 1 hour | Per user |

### API Request Validation

Every API request passes through:

1. **CORS** — Origin whitelist
2. **Rate Limiting** — Redis sliding window
3. **Authentication** — Session or API key
4. **Authorization** — RBAC check
5. **Input Validation** — Zod schema
6. **Sanitization** — Strip dangerous content
7. **Audit Logging** — Log request metadata

---

## Infrastructure Security

### Vercel Security

| Feature | Configuration |
|---------|---------------|
| DDoS Protection | Automatic (Vercel Edge Network) |
| WAF | Managed ruleset |
| TLS | Automatic (Let's Encrypt) |
| Secret Management | Vercel Environment Variables |
| Deployment Protection | Password-protected previews |
| Access Logs | Vercel Audit Logs |

### Database Security

- Network isolation (private networking)
- Connection pooling with PgBouncer
- Automated backups (point-in-time recovery)
- Read replicas for analytics queries
- No direct database access from browser

### CI/CD Security

- Secrets scanned in commits (git-secrets)
- Dependency vulnerability scanning (Dependabot)
- Container image scanning (Trivy)
- SBOM generation for each release
- Signed commits (GPG)

---

## Compliance

| Standard | Status | Notes |
|----------|--------|-------|
| SOC 2 Type II | In progress | Target: Q4 2025 |
| GDPR | ✅ Compliant | Data processing agreement, right to deletion |
| COPPA | ✅ Compliant | Parental consent for under-13 users |
| FERPA (US) | ✅ Compliant | Education records protection |
| WCAG 2.1 AA | ✅ Compliant | Accessibility standards |
| ISO 27001 | Planned | Target: Q2 2026 |

---

## Security Checklist

### Pre-Deployment

- [ ] All secrets removed from code
- [ ] CSP headers verified
- [ ] No exposed API keys or tokens
- [ ] Dependencies up to date (no known CVEs)
- [ ] Rate limiting configured
- [ ] Audit logging enabled
- [ ] CORS configured for production origin
- [ ] Database backups configured

### Incident Response

1. **Detection** — Automated monitoring alerts
2. **Containment** — Revoke compromised credentials / isolate affected systems
3. **Analysis** — Audit logs, affected data, root cause
4. **Remediation** — Patch vulnerability, rotate secrets
5. **Notification** — Affected users informed within 72 hours
6. **Post-Mortem** — Engineering review within 7 days

### Contact

| Role | Contact |
|------|---------|
| Security Team | security@eduverse.com |
| PGP Key | `https://eduverse.com/pgp-key.asc` |
| Bug Bounty | `https://hackerone.com/eduverse` |
| Emergency | security-urgent@eduverse.com |

---

<div align="center">
  <sub>Copyright © 2025 EDUVERSE. All rights reserved.</sub>
</div>
