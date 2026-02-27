# Design System App Architecture (App-first)

This repository is a design system showcase app (a sandbox) built with:
- Vite + React
- TypeScript (strict)
- Tailwind
- shadcn/ui (Radix-based)

Primary goal:
- Rapidly style, evaluate, and iterate on components in a real UI context.

Secondary goal (later):
- Extract a reusable component library package once patterns stabilise.

---

## Scope

Rules are grouped by scope:

1) App-wide rules (always apply)
2) Component authoring rules (apply when creating new components or modifying shadcn components)
3) Later extraction rules (only apply when we turn this into a library)
4) Routing

---

## 1) App-wide rules (always apply)

### This is a design system app
- App code is allowed (routing, layouts, pages).
- Avoid product-specific business logic. Keep it focused on showcasing UI patterns.
- Keep pages simple and consistent (gallery + component detail pages).

### TypeScript strict
- TypeScript strict mode must remain enabled.
- Avoid `any`. If absolutely necessary, contain it and explain why in a comment.

### Project structure conventions
- shadcn-style components live in: `src/components/ui/`
- App pages live in: `src/pages/` (or `src/routes/` if routing framework requires it)
- Shared utilities live in: `src/lib/`
- App layout components live in: `src/components/`

### Dependencies (keep it lean)
- Prefer shadcn + Radix recommended dependencies.
- Avoid adding new runtime dependencies without a clear reason.
- Do not introduce CSS-in-JS libraries.

### Styling approach
- Tailwind is the primary styling method.
- Use shadcn conventions (cn helper, cva where variants exist).
- Light mode only.

---

## 2) Component authoring rules
(Apply when creating a new component OR modifying a shadcn component.)

### shadcn-first
- Prefer installing shadcn components rather than building from scratch.
- If you modify a shadcn component, keep changes minimal and aligned with shadcn patterns.

### Accessibility is non-negotiable
- Interactive components should be Radix-based where possible.
- Do not remove focus styles without replacing them.
- Ensure keyboard navigation, correct semantics, and appropriate aria attributes.

### Styling conventions for reusable components
- Prefer shadcn semantic classes (bg-background, text-foreground, border-border, ring-ring).
- Avoid hardcoding palette values (bg-slate-900, text-zinc-500) in reusable components.
- Raw palette classes are acceptable for one-off gallery demo layouts, not for components intended for extraction later.

### Variants and APIs
- If a component has variants, use class-variance-authority (cva).
- Variants should represent semantic intent, not raw colors (destructive, secondary, outline).

---

## 3) Later extraction rules (library phase, not now)

When we extract a library:
- No app code in the library package.
- Stable public exports from a single index entry.
- Peer dependencies for react, react-dom, radix packages.
- Build and type emission pipeline.

Do not optimise for this phase at the expense of speed today.

---

## 4) Routing

- Use BrowserRouter (history API), not HashRouter.
- URLs should not contain `#`.
- The app should behave like a real SPA.