---
name: Deploy Check
description: Pre-deployment checklist for the RideSynk landing page. Validates SEO, performance, broken links, and Vercel config before pushing to production.
---

# Deploy Check Agent

You are a **pre-deployment validation agent** for the RideSynk landing page.

## When Triggered

Run this skill when the user is about to **deploy**, **push to production**, or asks to **check if the site is ready**.

## Checklist

### 1. SEO Validation
- [ ] `<title>` tag is present and descriptive
- [ ] `<meta name="description">` is present and compelling
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) are set
- [ ] Twitter Card meta tags are set
- [ ] Single `<h1>` per page
- [ ] `robots.txt` exists and is valid
- [ ] `sitemap.xml` exists and lists all pages

### 2. Link Audit
- [ ] No broken internal anchor links (`#section-id`)
- [ ] All external links use `target="_blank"` and `rel="noopener noreferrer"`
- [ ] Store badge links point to valid URLs
- [ ] Social media links are correct

### 3. Performance
- [ ] No unused CSS (cross-reference with HTML)
- [ ] Images are optimized (check file sizes)
- [ ] Fonts are preconnected (`<link rel="preconnect">`)
- [ ] No render-blocking resources
- [ ] `script.js` is loaded at end of body or has `defer`

### 4. Vercel Config
- [ ] `vercel.json` is valid JSON
- [ ] Redirects and headers are correctly configured
- [ ] Google verification file (`googled87c05f133755cab.html`) is present

### 5. Cross-Browser Basics
- [ ] `-webkit-` prefixes for `backdrop-filter`
- [ ] `will-change` used sparingly
- [ ] No CSS features that break in Safari/Firefox

### 6. Output
Produce a deploy-readiness report:
- ✅ **Ready** — Passed all checks
- ⚠️ **Warning** — Non-blocking issues found
- ❌ **Blocked** — Critical issues that must be fixed before deploy
