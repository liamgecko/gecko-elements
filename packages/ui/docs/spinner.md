# Spinner

Import: `@gecko/ui/components/spinner`  
Status: Stable  
Source: `src/components/spinner.tsx`  
Human documentation: `apps/docs/src/pages/spinner/index.tsx`

## Purpose

Spinner communicates an indeterminate wait, such as a page or panel loading when the amount completed cannot be measured.

Use Progress when completion can be measured. Use Empty only after loading has finished and no content is available.

Spinner follows Shadcn’s native SVG composition. It does not wrap a Base UI primitive, so Base UI properties are not part of its public contract.

## Standalone loading

Spinner has a default status role and accessible name:

```tsx
<Spinner />
```

Change `aria-label` when “Loading” does not adequately identify the task:

```tsx
<Spinner aria-label="Loading conversations" />
```

Keep the spinner visible only while work is in progress. Replace it with the loaded content, an actionable error, or Empty when the request completes.

## Inline loading

When visible text or the owning component already communicates the loading state, hide Spinner from assistive technology:

```tsx
<Badge>
  <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
  Syncing
</Badge>
```

The owning control or region must expose its busy state where applicable. Do not rely on animation alone.

Button owns its loading indicator and behavior. Do not manually compose Spinner inside Button:

```tsx
<Button loading>Saving</Button>
```

## Size

Spinner supports five approved sizes:

```tsx
<Spinner size="xs|sm|md|lg|xl" />
```

Use the default medium size for standalone loading. Match inline spinners to their surrounding component rather than recreating a size with application classes.

## Interface

| Property | Type                                   | Default | Meaning                         |
| -------- | -------------------------------------- | ------- | ------------------------------- |
| `size`   | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`  | Sets the loading indicator size |

Spinner also accepts native SVG properties. Its default `role="status"` and `aria-label="Loading"` may be overridden when the surrounding interface supplies the loading semantics.

## Accessibility

- Keep the default status role and accessible name for a standalone Spinner.
- Give a standalone Spinner a task-specific accessible name when “Loading” is ambiguous.
- Set `aria-hidden="true"` when adjacent text or the owning component already communicates the same loading state.
- Set `aria-busy` on the control or region whose content is being updated.
- Keep meaningful visible text in loading buttons and use Button’s `loading` prop.
- Do not expose multiple Spinner status regions for one loading operation.
- Do not rely on motion as the only indication that work is in progress.

## Agent rules

1. Import Spinner from `@gecko/ui/components/spinner`.
2. Use Spinner only when completion cannot be measured.
3. Use the default medium size for standalone loading and an approved smaller size inside compact components.
4. Keep the default status semantics for standalone loading.
5. Hide a decorative inline Spinner from assistive technology when nearby text supplies the same meaning.
6. Put `aria-busy` on the control or region that owns the loading state.
7. Use Button’s `loading` prop instead of composing Spinner, `disabled`, or busy semantics manually.
8. Use Progress for measurable completion and Empty only after loading finishes without content.
9. Preserve Gecko’s icon, animation and approved sizes.
10. Do not import or recreate the Shadcn Spinner directly in application code.

## API reference

- [Shadcn Spinner documentation](https://ui.shadcn.com/docs/components/base/spinner)

## Related

- **Progress** — measurable completion.
- **Button** — actions with built-in loading behaviour.
- **Empty** — no content after loading has completed.
