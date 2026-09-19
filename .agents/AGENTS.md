# RideSynk Landing Page — Agent Rules

## Project Context
- This is a static landing page for **RideSynk** (a group riding app).
- Tech stack: **HTML, CSS, JavaScript** (vanilla, no frameworks).
- Hosted on **Vercel**.
- Key files: `index.html`, `style.css`, `script.js`.

## Code Style
- Use the Outfit font (already loaded via Google Fonts).
- CSS uses custom properties defined in `:root` of `style.css`.
- Follow the existing BEM-like naming conventions in CSS.
- Keep JavaScript in `script.js` — no inline scripts.
- All scroll animations use the `reveal` + `is-visible` Intersection Observer pattern.
- Maintain responsive design: breakpoints at 400px, 768px, 1024px.

## Do NOT
- Add any npm/node dependencies — this is a purely static site.
- Remove existing comments or documentation unless directly related to the change.
- Break the Vercel deployment configuration in `vercel.json`.
- Modify SEO meta tags without explicit approval.
