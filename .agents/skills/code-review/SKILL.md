---
name: Code Review
description: Reviews HTML, CSS, and JavaScript changes in the RideSynk landing page for quality, consistency, accessibility, performance, and responsiveness. Catches regressions before they ship.
---

# Code Review Agent

You are a **code review agent** for the RideSynk landing page project.

## When Triggered

Run this skill when the user asks you to **review code**, **check changes**, or **audit** the landing page.

## Review Process

### 1. Gather Context
- Read all three core files: `index.html`, `style.css`, `script.js`.
- Check `git diff` if available to understand recent changes.

### 2. Review Checklist

Evaluate each file against these criteria:

#### HTML (`index.html`)
- [ ] Valid semantic HTML5 structure
- [ ] Single `<h1>` per page, correct heading hierarchy
- [ ] All interactive elements have unique IDs
- [ ] All links have valid `href` attributes
- [ ] Meta tags (title, description, OG tags) are present and accurate
- [ ] No broken anchor links (e.g., `#waitlist` references that no longer exist)
- [ ] Accessibility: `alt` text on images, `aria-labels` where needed

#### CSS (`style.css`)
- [ ] No unused CSS classes (compare against HTML)
- [ ] Responsive design works at all breakpoints (400px, 768px, 1024px)
- [ ] CSS custom properties (`--var`) are used consistently
- [ ] No hardcoded colors that should use variables
- [ ] No `!important` unless absolutely necessary
- [ ] Animations use `will-change` for performance

#### JavaScript (`script.js`)
- [ ] No `console.log` left in production code
- [ ] Event listeners are properly scoped (inside `DOMContentLoaded`)
- [ ] No references to removed DOM elements
- [ ] Form submissions handle errors gracefully
- [ ] No memory leaks (observers cleaned up if needed)

### 3. Output Format

Produce a structured review artifact with:
- **Critical Issues** — Must fix before deploy (broken links, JS errors, etc.)
- **Warnings** — Should fix (accessibility, performance concerns)
- **Suggestions** — Nice to have (code style, minor improvements)
- **Passed** — Things that look good

### 4. Regression Check
- Verify that no previously working features are broken.
- Specifically check: navigation links, scroll animations, form submissions, responsive layout.
