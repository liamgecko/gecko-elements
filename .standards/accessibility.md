# Accessibility Standards

This design system targets strict WCAG 2.2 AA intent.

Accessibility is not optional.

---

## Global rules

1. All interactive elements must be keyboard accessible.
2. Visible focus styles are mandatory.
3. Never remove outlines without a clear replacement.
4. Disabled states must use proper semantics.
5. Never rely solely on color to convey meaning.
6. Respect prefers-reduced-motion.

---

## Buttons and clickable elements

- Use a real <button> unless a different semantic element is required.
- Do not use div with onClick.
- Disabled must use disabled semantics.
- Loading states should:
  - set aria-busy="true"
  - prevent interaction
  - preserve layout where possible

---

## Radix-based components

- Follow Radix accessibility patterns.
- Do not override roles and aria attributes unless necessary.
- Ensure focus trapping works for dialogs.
- Ensure Escape closes dismissible overlays.
- Ensure triggers and content relationships remain correct.

---

## Color and contrast

- Prefer semantic token classes for reusable UI components.
- Ensure text contrast meets AA minimum.
- Focus ring must be visible against the background.

---

## Motion

- Avoid unnecessary animation.
- If motion is added, keep it subtle and respect reduced motion.

---

## Demo guidance

The gallery can include:
- correct examples (default)
- incorrect examples (only if clearly labelled as incorrect and why)

If unsure, choose the more accessible option.