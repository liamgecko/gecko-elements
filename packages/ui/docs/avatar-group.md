# Avatar group

Import: `@gecko/ui/components/avatar-group`  
Status: Stable  
Source: `src/components/avatar-group.tsx`  
Human documentation: `apps/docs/src/pages/avatar-group/index.tsx`

## Purpose

Avatar group represents several people or accounts as an overlapping identity cluster. Use it where collective involvement matters, such as conversation assignees, collaborators, or participants.

Use Avatar for one person. Render nothing when there are no people. Use another component for collections of logos, icons, files, or other non-person entities.

Gecko Avatar group is a data-driven module. It owns Avatar composition, meaningful fallbacks, overlap, accessible identity, optional name tooltips, and overflow disclosure. Callers provide people rather than assembling Shadcn Avatar Group primitives.

## Import

```tsx
import { AvatarGroup } from "@gecko/ui/components/avatar-group";
```

Import `AvatarGroupItem` only when application data needs the exported type.

## Canonical usage

Pass people in their intended display order. Every person requires a stable `id` and `name`.

```tsx
<AvatarGroup
  items={[
    { id: "liam-young", name: "Liam Young", src: liamPhoto },
    { id: "alice-brown", name: "Alice Brown", src: alicePhoto },
    { id: "charlie-davis", name: "Charlie Davis" },
  ]}
/>
```

Omit `size` for standard use. Omit `maxVisible` when every person should remain visible.

## Person data

| Field  | Requirement | Meaning                                             |
| ------ | ----------- | --------------------------------------------------- |
| `id`   | Required    | Stable identity used when people reorder            |
| `name` | Required    | Full person or account name and accessible identity |
| `src`  | Optional    | Profile-image URL                                   |

Avatar group inherits Avatar’s automatic initials. It uses the first-name initial at `xs` and `sm`, then the first and last name initials from `md` upward. For example, “Alice Brown” renders `A` at `sm` and `AB` at `md`.

The `id` must identify the same person between renders. Use an application or database identifier rather than the person’s array position.

## Overflow

Set `maxVisible` to the maximum number of visible people. When the item count exceeds it, Avatar group automatically adds a `+N` control.

```tsx
<AvatarGroup items={assignees} maxVisible={3} />
```

The control opens a Popover containing a semantic list of the remaining people. Callers do not compose a count, button, Popover, or hidden-person list themselves.

`maxVisible` should be a positive whole number. The implementation floors fractional values and constrains finite values to at least one. Omit it to show everyone.

## Tooltips

Set `tooltips` when visible names are not written nearby and sighted users benefit from identifying each face on hover or keyboard focus.

```tsx
<AvatarGroup items={assignees} tooltips />
```

Tooltips are supplementary. Avatar group exposes every visible person’s name independently, and overflow people are named in the Popover. Application correctness must not depend on tooltip content.

## Sizes

Avatar group uses the exact Avatar size names and diameters. `default` maps to `xl`.

| Size  | Diameter | Canonical context                                    |
| ----- | -------- | ---------------------------------------------------- |
| `xs`  | 16 px    | Exceptional space constraints and passive indicators |
| `sm`  | 20 px    | Very compact supporting identity                     |
| `md`  | 24 px    | Dense lists, data tables, and messages               |
| `lg`  | 28 px    | Compact identity rows                                |
| `xl`  | 32 px    | Standard usage; the default                          |
| `2xl` | 36 px    | Prominent summaries                                  |
| `3xl` | 48 px    | Large participant or profile displays                |

Choose size from the surrounding layout or another component’s canonical recipe. Agents must not add a separate Avatar Group size scale.

## Ordering

Avatar group preserves the supplied item order. Put the most relevant or primary people first. `maxVisible` keeps that leading subset visible and places the remainder in the Popover.

Sorting and prioritisation belong to the application because Avatar group cannot infer the domain’s preferred person order.

## Interaction

Visible avatars are passive identities. Enabling `tooltips` makes each visible identity keyboard-focusable so its supplementary name can appear, but it does not turn the person into an action.

The overflow count is the only action owned by Avatar group. It opens and closes the hidden-person Popover.

Use a purpose-built people picker, list, or navigation pattern when individual people must be selected or opened. Agents must obtain explicit consent before adding person actions to Avatar group.

## Accessibility

- The group and each visible entry expose list semantics.
- Every visible identity exposes the required `name`; its internal photograph and initials are decorative to prevent duplicate announcements.
- Tooltip triggers expose the same person name and have a visible keyboard focus indicator.
- The overflow control names the number of additional people and has a minimum 24 px interaction target, even when its visible count matches a smaller avatar.
- The overflow Popover has an accessible title and presents hidden people as a list rather than command menu items.
- Logical start margins preserve overlap direction in right-to-left interfaces.

## Interface

### AvatarGroup

| Property                | Type                                                       | Default     | Meaning                                          |
| ----------------------- | ---------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `items`                 | `readonly AvatarGroupItem[]`                               | —           | Required people in display order                 |
| `size`                  | `AvatarSize`                                               | `"default"` | Shared Avatar diameter; `default` maps to `xl`   |
| `maxVisible`            | `number`                                                   | none        | Maximum visible people before automatic overflow |
| `tooltips`              | `boolean`                                                  | `false`     | Supplementary visible names on hover and focus   |
| Native `div` properties | `React.ComponentProps<"div">` except `children` and `role` | —           | Group labeling and layout integration            |

### AvatarGroupItem

```ts
type AvatarGroupItem = {
  id: string;
  name: string;
  src?: string;
};
```

## Styling contract

The library owns Avatar composition, diameter, overlap, stacking, rings, overflow-count appearance, interaction target, Popover structure, fallback generation, and identity semantics.

Use `className` only for positioning the complete group within its parent layout. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing fields, props, sizes, overflow behaviour, tooltip behaviour, or visual variants.

## Relationship to Shadcn

Shadcn’s Avatar Group is a low-level layout composition made from `AvatarGroup`, repeated Avatars, and `AvatarGroupCount`. Gecko intentionally provides a deeper data-driven interface so applications receive consistent identity, overflow, tooltip, and accessibility behaviour without rebuilding it at every call site.
