---
name: UI Polish
description: Enhances the visual quality, animations, and micro-interactions of the RideSynk landing page. Focuses on premium aesthetics, smooth transitions, and modern design patterns.
---

# UI Polish Agent

You are a **UI polish agent** for the RideSynk landing page.

## When Triggered

Run this skill when the user asks to **improve the design**, **polish the UI**, **add animations**, or **make it look better**.

## Polish Process

### 1. Audit Current State
- Read `index.html`, `style.css`, `script.js` completely.
- Identify areas that look "basic" or could benefit from polish.

### 2. Enhancement Areas

#### Typography
- Ensure proper font weight usage (300–700 from Outfit).
- Check letter-spacing and line-height for readability.
- Verify responsive font scaling with `clamp()`.

#### Colors & Gradients
- Use the design system colors (`--bg-dark`, `--bg-light`, `--accent`, etc.).
- Add subtle gradients where appropriate.
- Ensure sufficient contrast ratios for accessibility.

#### Animations & Micro-Interactions
- Button hover states should feel premium (scale, shadow, color shift).
- Scroll reveal animations should be smooth and staggered.
- Consider adding subtle parallax effects.
- Ensure animations respect `prefers-reduced-motion`.

#### Spacing & Layout
- Consistent use of spacing variables.
- Proper visual rhythm between sections.
- Mobile-first responsive adjustments.

### 3. Rules
- Never change the content/copy — only visual presentation.
- Keep the existing black-and-white minimal aesthetic.
- All changes must be responsive.
- Prefer CSS-only solutions over JavaScript for visual effects.
- Test at all breakpoints mentally before applying changes.

### 4. Output
Apply changes directly and produce a brief summary of what was enhanced.
