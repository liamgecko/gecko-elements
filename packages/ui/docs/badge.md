# Badge

Import: `@gecko/ui/components/badge`  
Status: Stable  
Source: `src/components/badge.tsx`  
Human documentation: `apps/docs/src/pages/badge/index.tsx`

## Purpose

Badge is a short, passive label for a status, category, tag, or count-bearing label. Keep its visible text brief and meaningful.

Use Button, Toggle, or a semantic link when the complete element performs an action or navigation. Use Counter when only a standalone number is needed. Use Avatar when only a person needs to be represented.

## Import

```tsx
import { Badge } from "@gecko/ui/components/badge";
```

## Canonical usage

Secondary is the default quiet treatment. Omit `variant` unless another approved meaning is required.

```tsx
<Badge>Pending</Badge>
```

Badge renders as an inline `span` and requires visible children. It is not an icon-only component.

## Variants

The approved variants are a closed set:

| Variant       | Use                                                |
| ------------- | -------------------------------------------------- |
| `secondary`   | Default neutral label, category, or inactive state |
| `primary`     | Deliberately prominent branded label               |
| `info`        | Informational state or work in progress            |
| `warning`     | State requiring attention                          |
| `destructive` | Failed, blocked, invalid, or harmful state         |
| `success`     | Successful or completed state                      |
| `light`       | Neutral label on a dark or visually heavy surface  |

Choose the variant from the meaning, not personal colour preference. Agents must obtain explicit user consent before adding a variant or changing its meaning.

## Sizes

Omit `size` for standard use. The default is `sm`.

| Size | Use                                                                    |
| ---- | ---------------------------------------------------------------------- |
| `xs` | Dense tables, tabs, and compact supporting status                      |
| `sm` | Standard Badge usage                                                   |
| `md` | More prominent labels or labels containing an Avatar                   |
| `lg` | Large summary treatments                                               |
| `xl` | Exceptional display contexts where the Badge is deliberately prominent |

Use the size required by the surrounding component’s canonical recipe. Agents must not add another size or override Badge padding or typography with `className` without explicit consent.

## Shape and border

Set `rounded` for the approved pill treatment. Set `bordered` when the label needs stronger separation from its background. Both properties work with every approved variant.

```tsx
<Badge rounded>Prospect</Badge>
<Badge variant="warning" bordered>Needs review</Badge>
```

## Icons

Use `leftIcon` or `rightIcon` when a symbol adds recognition or context to visible text. Badge sizes supplied icons automatically. Both positions may be used together.

```tsx
<Badge variant="success" leftIcon={<CheckCircle />}>Complete</Badge>
<Badge rightIcon={<ChevronRight />}>Advanced</Badge>
```

Icons are decorative because the visible Badge text owns the meaning. Always provide visible text. `rightIcon` cannot be combined with `dismissible` because the dismiss control owns the trailing position.

## Avatar

Place Avatar directly in Badge children when the label represents a person. Badge automatically maps its size to Avatar.

```tsx
<Badge size="md">
  <Avatar name={person.name}>
    <AvatarImage src={person.photoUrl} />
  </Avatar>
  {person.name}
</Badge>
```

Callers choose the identity and image. Badge owns the nested Avatar size.

## Dismissal

Set `dismissible` when the complete Badge can be removed. Badge owns the dismiss button, keyboard behaviour, minimum interaction target, and removal state.

```tsx
<Badge
  dismissible={{
    ariaLabel: "Remove prospect filter",
    onDismiss: handleDismiss,
  }}
>
  Prospect
</Badge>
```

Use `dismissible={true}` when no callback is required. Prefer a contextual `ariaLabel` that names what the control removes. `onDismiss` reports the action before Badge removes itself.

Dismissible Badge cannot use `rightIcon`. `leftIcon`, Avatar, and `notificationCount` remain available when they are meaningful.

## Notification count

Set `notificationCount` when a count belongs to the complete label. Badge creates, positions, and sizes Counter automatically.

```tsx
<Badge notificationCount={3}>Inbox</Badge>
```

Positive finite values display. Values above nine display as `9+`. Zero, negative, and invalid values do not render a Counter. Callers must not compose or position Counter manually for this pattern.

## Accessibility

- Badge is passive inline content unless its internal dismiss button is present.
- Visible text supplies the Badge meaning; supplied icons are decorative.
- The dismiss button has a native button role, keyboard support, visible focus treatment, and a minimum 24 px interaction area.
- Provide a contextual dismissal label when the surrounding text does not make “Dismiss badge” sufficiently clear.
- Counter exposes the complete count to assistive technology even when its visible value is capped.
- Semantic status text must remain understandable without colour.

## Interface

| Property                 | Type                                                                                       | Default       | Meaning                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------ |
| `children`               | `React.ReactNode`                                                                          | —             | Required visible label content                                           |
| `variant`                | `"primary" \| "secondary" \| "info" \| "warning" \| "destructive" \| "success" \| "light"` | `"secondary"` | Approved semantic colour treatment                                       |
| `size`                   | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                     | `"sm"`        | Approved scale                                                           |
| `bordered`               | `boolean`                                                                                  | `false`       | Adds the approved variant border                                         |
| `rounded`                | `boolean`                                                                                  | `false`       | Uses the pill treatment                                                  |
| `leftIcon`               | `React.ReactNode`                                                                          | none          | Automatically sized decorative leading icon                              |
| `rightIcon`              | `React.ReactNode`                                                                          | none          | Automatically sized decorative trailing icon; unavailable with dismissal |
| `dismissible`            | `true \| { label?: string; ariaLabel?: string; onDismiss?: () => void }`                   | `false`       | Adds the internal dismiss control and removal behaviour                  |
| `notificationCount`      | `number`                                                                                   | none          | Automatically positioned unread count; hidden unless positive and finite |
| Native `span` properties | `React.ComponentProps<"span">`                                                             | —             | Labeling and layout integration                                          |

## Styling contract

The library owns colour, border, radius, spacing, typography, icon sizing, Avatar sizing, dismissal, notification positioning, and interaction states.

Use `className` only to position the complete Badge within its parent layout. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, variants, sizes, meanings, or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s passive inline Badge foundation while adding approved semantic variants, sizes, borders, shapes, icon positions, Avatar sizing, dismissal, and automatic notification counts. Gecko intentionally does not expose an interactive whole-Badge mode; use the appropriate semantic control for actions and navigation.
