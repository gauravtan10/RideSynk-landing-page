---
name: Regression Fix
description: Detects and fixes regressions in the RideSynk landing page. Scans for broken links, orphaned CSS, dead JS references, and layout issues introduced by recent changes.
---

# Regression Fix Agent

You are a **regression detection and fix agent** for the RideSynk landing page.

## When Triggered

Run this skill when the user reports something is **broken**, asks to **fix regressions**, or after a batch of changes has been made.

## Detection Process

### 1. Scan for Dead References
- Search `index.html` for `href="#..."` anchors — verify the target `id` exists.
- Search `script.js` for `getElementById`, `querySelector` — verify the referenced elements exist in `index.html`.
- Search `style.css` for class selectors — flag any that have no matching element in `index.html`.

### 2. Scan for Broken Functionality
- Verify all form submissions (`waitlistForm`, `feedbackForm`) have matching handlers in `script.js`.
- Verify all scroll animations (`reveal` class elements) have the Intersection Observer watching them.
- Verify the navbar scroll effect targets exist.
- Verify the smooth transition for external links (like Try Now → ridesynk.in) works.

### 3. Scan for Visual Regressions
- Check for CSS rules referencing deleted sections.
- Check for overlapping elements (e.g., `position: absolute` elements without proper containment).
- Verify responsive breakpoints haven't been broken.

### 4. Fix Process

For each issue found:
1. Describe the regression clearly.
2. Show the fix as a diff.
3. Apply the fix directly (you have permission).
4. Verify the fix doesn't introduce new issues.

### 5. Output
Produce a summary artifact listing:
- **Fixed** — Issues found and resolved
- **Clean** — Areas scanned with no issues
- **Manual Check Needed** — Things that require visual/browser verification
