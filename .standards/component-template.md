# Component Authoring Template (Design System App)

This project is shadcn-first.
Most UI components should be installed from shadcn and then optionally customised.

---

## Where things go

### shadcn UI components
- Location: `src/components/ui/`
- Examples:
  - `button.tsx`
  - `dialog.tsx`
  - `tooltip.tsx`

### App components (layout, navigation, demo wrappers)
- Location: `src/components/`

### Pages
- Location: `src/pages/`
- The home page is the Component Gallery index.

### Shared utilities
- Location: `src/lib/`
- Example: `utils.ts` contains `cn()`

---

## File naming
- Use kebab-case filenames: `button.tsx`
- Component displayName should be PascalCase.

---

## Rules for shadcn-installed components

When installing a shadcn component into `src/components/ui/`:
- Keep the file structure and patterns consistent with shadcn.
- Preserve accessibility behavior and Radix usage.
- Avoid rewriting shadcn patterns unless necessary.

Allowed adjustments:
- Styling tweaks aligned with the design system direction
- Small API refinements if they improve consistency (avoid prop explosion)
- Internal refactors for readability, keeping behavior identical

Avoid:
- Removing semantic token classes and replacing with raw palette classes
- Removing focus styles
- Converting Radix primitives to custom div-based interactions

---

## Rules for custom components

If you create a custom component (usually app-level wrappers or demo components):
- Always support `className` when it affects styling
- Use `cn()` to merge classes
- Use `forwardRef` for interactive primitives (buttons, inputs, triggers)
- Use cva when variants exist

---

## Standard import patterns

- Use the cn helper via: `import { cn } from "@/lib/utils"`
- Keep imports tidy and consistent.

---

## Accessibility checklist (before finalising any component change)

- Keyboard interaction works
- Focus is visible
- Correct semantic elements are used
- aria attributes are correct
- No color-only meaning
- Reduced motion is respected where relevant