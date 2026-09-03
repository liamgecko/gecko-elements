# Counter

Import: `@gecko/ui/components/counter`  
Status: Stable  
Source: `src/components/counter.tsx`  
Human documentation: `apps/docs/src/pages/counter/index.tsx`

## Purpose

Counter presents a compact numeric quantity. Use it for notification totals, selected-item totals and other small counts that belong beside another label or control.

Use Badge for a text label or status. Use a numeric form control when someone must enter or change a number. Counter is passive output, not an action or input.

## Canonical ownership

Prefer the owning component’s count interface instead of composing and positioning Counter manually.

```tsx
<Badge notificationCount={unreadCount}>Inbox</Badge>
```

Badge owns the Counter’s position, size, destructive notification treatment and `9+` cap. Condensed Filter similarly owns its selected-item Counter. Use those parent interfaces whenever the count belongs to those components.

Use Counter directly only when no owning component provides an approved count interface:

```tsx
<Counter
  value={selectedCount}
  max={99}
  aria-label={`${selectedCount} selected applications`}
/>
```

The parent layout determines where a standalone Counter sits. Application code does not restyle its chrome.

## Value and overflow

Counter normalises `value` before display:

- finite values are rounded down to a whole number;
- negative values become `0`;
- non-finite values become `0`.

Set `max` to a positive finite number when the visible count needs a compact upper limit. Counter rounds the limit down to a whole number. Zero, negative and non-finite limits are ignored.

When the normalised value exceeds the limit, Counter appends a plus sign:

```tsx
<Counter value={112} max={9} />
```

This displays `9+` while its default accessible name reports the complete normalised value as “Count: 112”. The pill expands to fit supported limits such as `99+`; callers do not set its width.

## Variants

Secondary is the default quiet treatment. Omit `variant` for ordinary counts.

| Variant       | Use                                                                       |
| ------------- | ------------------------------------------------------------------------- |
| `secondary`   | Default neutral count                                                     |
| `primary`     | Deliberately prominent branded count                                      |
| `info`        | Informational or in-progress count                                        |
| `warning`     | Count requiring attention                                                 |
| `destructive` | Errors, failures or unread notifications using the approved parent recipe |
| `success`     | Successful or selected-item count using the approved parent recipe        |
| `light`       | Neutral count on a dark or visually heavy surface                         |

Choose the variant from the count’s meaning, not colour preference. The surrounding label or control must make that meaning understandable without colour.

The variants are a closed set. Agents must obtain explicit user consent before adding a variant or changing its meaning.

## Sizes

Omit `size` for standard standalone use. The default is `md`.

| Size | Use                                                                    |
| ---- | ---------------------------------------------------------------------- |
| `sm` | Compact controls and library-owned notification or filter integrations |
| `md` | Standard standalone Counter                                            |
| `lg` | An approved larger surrounding control                                 |

Parent components choose Counter size for their integrations. Callers do not override that internal size.

## Accessibility

Counter defaults to an accessible name containing the complete normalised value. Visual overflow never hides the exact count from assistive technology.

Use a contextual `aria-label` when “Count” does not communicate what the number represents:

```tsx
<Counter value={3} aria-label="3 unread conversations" />
```

Counter does not announce updates automatically. If a count change is an important result of an interaction, the product supplies an appropriate status message outside Counter rather than turning every count into a live region.

Counter is a passive `span`. Do not add click handlers, button semantics or focusability. Put Counter inside or beside the semantic control it describes.

## Interface

| Property                 | Type                                                                                       | Default                       | Meaning                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------ |
| `value`                  | `number`                                                                                   | required                      | Quantity, rounded down and clamped to zero             |
| `max`                    | `number`                                                                                   | none                          | Positive whole-number visible limit before a plus sign |
| `variant`                | `"primary" \| "secondary" \| "info" \| "warning" \| "destructive" \| "success" \| "light"` | `"secondary"`                 | Approved semantic colour treatment                     |
| `size`                   | `"sm" \| "md" \| "lg"`                                                                     | `"md"`                        | Approved height, padding and typography scale          |
| `aria-label`             | `string`                                                                                   | `"Count: {normalised value}"` | Contextual accessible name; uncapped by `max`          |
| Native `span` properties | `React.HTMLAttributes<HTMLSpanElement>`                                                    | —                             | Labeling and parent-layout integration                 |

## Styling contract

The library owns colour, height, minimum width, horizontal padding, typography, radius and overflow presentation.

Use `className` only to position a standalone Counter within its parent layout. Prefer an owning component’s count interface whenever one exists. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, variants, sizes, meanings, normalisation, accessibility behaviour or visual treatments.

## Agent rules

- Prefer Badge `notificationCount` and other library-owned count interfaces.
- Omit `variant` for an ordinary neutral count.
- Use `max` instead of manually formatting overflow.
- Provide a contextual accessible name when the surrounding content does not explain the quantity.
- Keep important count changes in a product-owned status message when they require announcement.
- Keep Counter passive and numeric.
- Use the trusted docs application only for examples; prototype projects are not component guidance.

## Relationship to Badge and Filter

Counter is a Gecko primitive rather than a Shadcn component. Badge and condensed Filter use it internally to keep count sizing, positioning, overflow and semantic treatment consistent. Those deeper parent interfaces prevent application code from rebuilding the same composition.

## Related components

- **Badge** — a text label or status, with an automatic notification Counter when required.
- **Filter** — owns the selected-item Counter in its condensed configuration.
- **Number field** — numeric value entry and adjustment.
